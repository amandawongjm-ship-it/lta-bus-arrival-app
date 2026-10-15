import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DEFAULT_USER_LOCATION, 
  calculateDistance, 
  estimateWalkTime, 
  calculateBearing, 
  formatDistance, 
  isWithinSingapore 
} from './utils/geo';
import { SINGAPORE_BUS_STOPS, getSimulatedArrivals } from './data/singaporeBuses';
import { BusStop, UserLocation, FavoriteItem, BusAlert, BusServiceArrival } from './types/transit';
import { transitAudio } from './utils/audio';

import { HeaderNav } from './components/HeaderNav';
import { BottomNavBar } from './components/BottomNavBar';
import { LocationBar } from './components/LocationBar';
import { BusStopCard } from './components/BusStopCard';
import { RadarMap } from './components/RadarMap';
import { FavoritesView } from './components/FavoritesView';
import { BusRoutesView } from './components/BusRoutesView';
import { RouteViewerModal } from './components/RouteViewerModal';
import { LocationPickerModal } from './components/LocationPickerModal';
import { SearchModal } from './components/SearchModal';
import { AlertNotificationToast } from './components/AlertNotificationToast';
import { TransitLegend } from './components/TransitLegend';

export default function App() {
  // Navigation tab
  const [activeTab, setActiveTab] = useState<'nearby' | 'radar' | 'favorites' | 'routes'>('nearby');

  // User location (defaults to Bugis / Victoria St)
  const [userLocation, setUserLocation] = useState<UserLocation>(() => {
    try {
      const saved = localStorage.getItem('sg_bus_user_location');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_USER_LOCATION;
  });

  const [radiusMeters, setRadiusMeters] = useState<number>(600);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Modals state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedRouteService, setSelectedRouteService] = useState<string | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('sg_bus_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [
      {
        id: 'fav-01012',
        type: 'stop',
        stopCode: '01012',
        customLabel: 'Bugis Stn Exit A',
        tag: 'Work',
        addedAt: Date.now(),
      },
    ];
  });

  // Bus Alerts state
  const [alerts, setAlerts] = useState<BusAlert[]>([]);

  // Real-time ticking clock for arrivals
  const [clockTime, setClockTime] = useState<number>(Date.now());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Ticking effect: ticks every second to count down bus arrival times
  useEffect(() => {
    const interval = setInterval(() => {
      setClockTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sg_bus_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore
    }
  }, [favorites]);

  // Save location to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sg_bus_user_location', JSON.stringify(userLocation));
    } catch {
      // Ignore
    }
  }, [userLocation]);

  // Handle GPS detection using browser Geolocation API
  const handleDetectRealGps = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const inSG = isWithinSingapore(latitude, longitude);

        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy,
          isSimulated: false,
          locationName: inSG ? 'My Real GPS Location' : 'Current GPS (Outside SG)',
          timestamp: Date.now(),
        });
        setIsDetectingGps(false);
        transitAudio.playTickTone();

        if (!inSG) {
          setGpsError(
            'Your device appears to be outside Singapore. Nearby stops are shown using Singapore coordinates or you can pick a Singapore hub.'
          );
        }
      },
      (error) => {
        setIsDetectingGps(false);
        let msg = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. You can select any Singapore hotspot below.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        setGpsError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  // Refresh arrivals manually
  const handleRefreshArrivals = () => {
    setIsRefreshing(true);
    transitAudio.playTickTone();
    setTimeout(() => {
      setClockTime(Date.now());
      setIsRefreshing(false);
    }, 450);
  };

  // Compute nearby stops with distance and bearing from user location
  const sortedStopsWithDistances: BusStop[] = useMemo(() => {
    return SINGAPORE_BUS_STOPS.map((stop) => {
      const distanceMeters = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        stop.lat,
        stop.lng
      );
      const walkTimeMinutes = estimateWalkTime(distanceMeters);
      const { cardinal } = calculateBearing(
        userLocation.lat,
        userLocation.lng,
        stop.lat,
        stop.lng
      );

      return {
        ...stop,
        distanceMeters,
        walkTimeMinutes,
        bearing: cardinal,
      };
    }).sort((a, b) => (a.distanceMeters ?? 0) - (b.distanceMeters ?? 0));
  }, [userLocation.lat, userLocation.lng]);

  // Stops filtered by radius
  const nearbyStops = useMemo(() => {
    if (radiusMeters >= 50000) return sortedStopsWithDistances;
    return sortedStopsWithDistances.filter(
      (stop) => (stop.distanceMeters ?? 0) <= radiusMeters
    );
  }, [sortedStopsWithDistances, radiusMeters]);

  // Helper to fetch live simulated arrivals for a stop
  const getArrivalsForStop = useCallback(
    (stopCode: string): BusServiceArrival[] => {
      return getSimulatedArrivals(stopCode, clockTime);
    },
    [clockTime]
  );

  // Check active alerts against current arrival countdowns
  useEffect(() => {
    if (alerts.length === 0) return;

    setAlerts((prevAlerts) => {
      let hasTriggeredNew = false;
      const updated = prevAlerts.map((alert) => {
        if (alert.triggered) return alert;

        const arrivals = getArrivalsForStop(alert.stopCode);
        const match = arrivals.find((a) => a.serviceNo === alert.serviceNo);
        if (match && match.nextBus) {
          const waitMinutes = match.nextBus.secondsRemaining / 60;
          if (waitMinutes <= alert.targetMinutes) {
            hasTriggeredNew = true;
            return { ...alert, triggered: true };
          }
        }
        return alert;
      });

      if (hasTriggeredNew) {
        transitAudio.playArrivalChime();
      }

      return updated;
    });
  }, [clockTime, getArrivalsForStop, alerts.length]);

  // Toggle favorite stop
  const handleToggleFavorite = (stopCode: string) => {
    transitAudio.playTickTone();
    setFavorites((prev) => {
      const exists = prev.find((f) => f.stopCode === stopCode);
      if (exists) {
        return prev.filter((f) => f.stopCode !== stopCode);
      } else {
        const stop = SINGAPORE_BUS_STOPS.find((s) => s.code === stopCode);
        return [
          ...prev,
          {
            id: `fav-${stopCode}`,
            type: 'stop',
            stopCode,
            customLabel: stop?.name,
            tag: 'Frequent',
            addedAt: Date.now(),
          },
        ];
      }
    });
  };

  const handleAddPresetFavorite = (stopCode: string, label: string, tag: 'Home' | 'Work' | 'Frequent') => {
    transitAudio.playTickTone();
    setFavorites((prev) => {
      if (prev.some((f) => f.stopCode === stopCode)) return prev;
      return [
        ...prev,
        {
          id: `fav-${stopCode}-${Date.now()}`,
          type: 'stop',
          stopCode,
          customLabel: label,
          tag,
          addedAt: Date.now(),
        },
      ];
    });
  };

  const handleRemoveFavorite = (stopCode: string) => {
    transitAudio.playTickTone();
    setFavorites((prev) => prev.filter((f) => f.stopCode !== stopCode));
  };

  // Set bus arrival alert
  const handleSetAlert = (serviceNo: string, stopCode: string, stopName: string, destinationName: string) => {
    transitAudio.playTickTone();
    const existing = alerts.find(
      (a) => a.serviceNo === serviceNo && a.stopCode === stopCode && !a.triggered
    );

    if (existing) {
      // Remove alert
      setAlerts((prev) => prev.filter((a) => a.id !== existing.id));
    } else {
      // Add alert for 2 minutes
      const newAlert: BusAlert = {
        id: `alert-${stopCode}-${serviceNo}-${Date.now()}`,
        stopCode,
        stopName,
        serviceNo,
        destinationName,
        targetMinutes: 2,
        triggered: false,
        createdAt: Date.now(),
      };
      setAlerts((prev) => [...prev, newAlert]);
    }
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const handleSelectHotspot = (lat: number, lng: number, name: string) => {
    setUserLocation({
      lat,
      lng,
      accuracy: 10,
      isSimulated: true,
      locationName: name,
      timestamp: Date.now(),
    });
    setGpsError(null);
    transitAudio.playTickTone();
  };

  const handleFocusOnRadar = (stopCode: string) => {
    setActiveTab('radar');
  };

  const handleSelectStopFromSearch = (stopCode: string) => {
    const stop = SINGAPORE_BUS_STOPS.find((s) => s.code === stopCode);
    if (stop) {
      setUserLocation({
        lat: stop.lat,
        lng: stop.lng,
        accuracy: 15,
        isSimulated: true,
        locationName: stop.name,
        timestamp: Date.now(),
      });
      setActiveTab('nearby');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col pb-20 md:pb-10">
      
      {/* Top Bar Contract Navigation */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userLocation={userLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onRefreshArrivals={handleRefreshArrivals}
        isRefreshing={isRefreshing}
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Location Status & Distance Radius Filter Bar */}
      <LocationBar
        userLocation={userLocation}
        radiusMeters={radiusMeters}
        setRadiusMeters={setRadiusMeters}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onDetectRealGps={handleDetectRealGps}
        isDetectingGps={isDetectingGps}
        gpsError={gpsError}
        totalNearbyStops={nearbyStops.length}
      />

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Tab 1: Nearby Stops */}
        {activeTab === 'nearby' && (
          <div className="space-y-6">
            
            {/* Viewport Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Nearby Bus Stops & Real-Time Arrivals
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Live arrival countdowns, passenger crowding, and wheelchair access around {userLocation.locationName}.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Feed</span>
                <span>·</span>
                <span className="tabular-nums">Auto-ticks 1s</span>
              </div>
            </div>

            {/* List of Bus Stops */}
            {nearbyStops.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <span className="font-mono font-bold text-lg">0</span>
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No bus stops within {formatDistance(radiusMeters)}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Try expanding the search range or switch your location to one of Singapore's central interchanges.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setRadiusMeters(1200)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-500 transition-colors"
                  >
                    Expand Range to 1.2km
                  </button>
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Select SG Transit Hub
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {nearbyStops.map((stop) => {
                  const arrivals = getArrivalsForStop(stop.code);
                  const isFav = favorites.some((f) => f.stopCode === stop.code);

                  return (
                    <BusStopCard
                      key={stop.code}
                      stop={stop}
                      arrivals={arrivals}
                      isFavorite={isFav}
                      onToggleFavorite={handleToggleFavorite}
                      onSetAlert={handleSetAlert}
                      activeAlerts={alerts}
                      onSelectRoute={(srv) => setSelectedRouteService(srv)}
                      onFocusOnRadar={handleFocusOnRadar}
                    />
                  );
                })}
              </div>
            )}

            {/* Singapore LTA Indicator Reference Legend */}
            <TransitLegend />
          </div>
        )}

        {/* Tab 2: Radar Map */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Transit Radar & Stop Locator
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Geospatial compass radar with relative polar positions of nearby bus stops.
                </p>
              </div>
            </div>

            <RadarMap
              userLocation={userLocation}
              busStops={sortedStopsWithDistances.slice(0, 20)}
              onSelectStop={(code) => {
                handleSelectStopFromSearch(code);
                setActiveTab('nearby');
              }}
              getArrivalsForStop={getArrivalsForStop}
              onSetLocation={handleSelectHotspot}
            />

            <TransitLegend />
          </div>
        )}

        {/* Tab 3: Favorites / Saved Stops */}
        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            busStops={sortedStopsWithDistances}
            onRemoveFavorite={handleRemoveFavorite}
            onAddPresetFavorite={handleAddPresetFavorite}
            getArrivalsForStop={getArrivalsForStop}
            onSetAlert={handleSetAlert}
            activeAlerts={alerts}
            onSelectRoute={(srv) => setSelectedRouteService(srv)}
            onGoToNearby={() => setActiveTab('nearby')}
          />
        )}

        {/* Tab 4: Bus Routes Directory */}
        {activeTab === 'routes' && (
          <BusRoutesView
            onSelectRoute={(srv) => setSelectedRouteService(srv)}
          />
        )}

      </main>

      {/* Floating Active Alerts Toasts */}
      <AlertNotificationToast
        alerts={alerts}
        onDismiss={handleDismissAlert}
        onViewStop={(code) => {
          handleSelectStopFromSearch(code);
          setActiveTab('nearby');
        }}
      />

      {/* Modals & Overlays */}
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={userLocation}
        onSelectHotspot={handleSelectHotspot}
        onDetectRealGps={handleDetectRealGps}
        isDetectingGps={isDetectingGps}
        gpsError={gpsError}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        busStops={sortedStopsWithDistances}
        onSelectStop={(code) => {
          handleSelectStopFromSearch(code);
          setActiveTab('nearby');
        }}
        onSelectRoute={(srv) => {
          setSelectedRouteService(srv);
        }}
      />

      <RouteViewerModal
        serviceNo={selectedRouteService}
        onClose={() => setSelectedRouteService(null)}
        onSelectStop={(code) => {
          handleSelectStopFromSearch(code);
          setActiveTab('nearby');
        }}
      />

      {/* Ergonomic Mobile Bottom Tab Bar */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
      />

    </div>
  );
}
