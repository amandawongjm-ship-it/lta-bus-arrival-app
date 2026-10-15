import React from 'react';
import { MapPin, Crosshair, Compass, SlidersHorizontal, Info } from 'lucide-react';
import { UserLocation } from '../types/transit';
import { formatDistance } from '../utils/geo';

interface LocationBarProps {
  userLocation: UserLocation;
  radiusMeters: number;
  setRadiusMeters: (radius: number) => void;
  onOpenLocationModal: () => void;
  onDetectRealGps: () => void;
  isDetectingGps: boolean;
  gpsError: string | null;
  totalNearbyStops: number;
}

export const LocationBar: React.FC<LocationBarProps> = ({
  userLocation,
  radiusMeters,
  setRadiusMeters,
  onOpenLocationModal,
  onDetectRealGps,
  isDetectingGps,
  gpsError,
  totalNearbyStops,
}) => {
  const radiusOptions = [
    { label: '300m', value: 300 },
    { label: '600m', value: 600 },
    { label: '1.2km', value: 1200 },
    { label: 'All SG', value: 50000 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Location Summary and Status */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Compass className="w-4 h-4" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {userLocation.locationName}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-mono tabular-nums text-[11px]">
                  {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span className="hidden sm:inline">·</span>
                <span>
                  {userLocation.isSimulated ? 'Simulated Location' : 'Live Device GPS'}
                </span>
                <span>·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {totalNearbyStops} {totalNearbyStops === 1 ? 'stop' : 'stops'} within {radiusMeters >= 50000 ? 'Singapore' : formatDistance(radiusMeters)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons & Radius segmented filter */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Radius Segmented Filter Bar */}
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700">
              <span className="pl-2 pr-1 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span className="hidden sm:inline">Range:</span>
              </span>
              {radiusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRadiusMeters(opt.value)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap min-h-[32px] ${
                    radiusMeters === opt.value
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Quick GPS Action */}
            <button
              onClick={onDetectRealGps}
              disabled={isDetectingGps}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 min-h-[36px]"
              title="Use my device GPS location"
            >
              <Crosshair className={`w-3.5 h-3.5 text-emerald-600 ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span className="whitespace-nowrap">
                {isDetectingGps ? 'Locating...' : 'Use My GPS'}
              </span>
            </button>

            {/* Change Location Modal Trigger */}
            <button
              onClick={onOpenLocationModal}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors flex items-center gap-1.5 min-h-[36px]"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">Change Location</span>
            </button>
          </div>

        </div>

        {/* GPS Error or info hint if any */}
        {gpsError && (
          <div className="mt-2.5 px-3 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <div className="flex-1">
              <span>{gpsError}</span>
              <span className="ml-1 text-slate-600 dark:text-slate-400">
                You can still pick any of the Singapore transit hubs below to see real-time arrivals.
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
