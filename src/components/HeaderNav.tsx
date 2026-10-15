import React from 'react';
import { Bus, MapPin, Navigation, Star, Search, RefreshCw, Radio } from 'lucide-react';
import { UserLocation } from '../types/transit';

interface HeaderNavProps {
  activeTab: 'nearby' | 'radar' | 'favorites' | 'routes';
  setActiveTab: (tab: 'nearby' | 'radar' | 'favorites' | 'routes') => void;
  userLocation: UserLocation;
  onOpenLocationModal: () => void;
  onRefreshArrivals: () => void;
  isRefreshing: boolean;
  favoritesCount: number;
  onOpenSearch: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  userLocation,
  onOpenLocationModal,
  onRefreshArrivals,
  isRefreshing,
  favoritesCount,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 md:gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20">
              <Bus className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                SG Bus Arrival
              </span>
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 -mt-1 hidden sm:inline">
                Real-Time Singapore Transit
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (single-line controls with subtle hover) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('nearby')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'nearby'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Navigation className="w-4 h-4" />
              Nearby Stops
            </button>

            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'radar'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Radio className="w-4 h-4" />
              Radar Map
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'favorites'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Star className="w-4 h-4" />
              Saved Stops
              {favoritesCount > 0 && (
                <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono px-1.5 py-0.2 rounded-full tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'routes'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Bus className="w-4 h-4" />
              Bus Routes
            </button>
          </nav>

          {/* Zone 3: Primary Action & Tools */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search bus stops or service numbers"
              className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 min-h-[40px] min-w-[40px] justify-center"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              onClick={onRefreshArrivals}
              disabled={isRefreshing}
              aria-label="Refresh bus arrival timings"
              className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 min-h-[40px] min-w-[40px] justify-center"
            >
              <RefreshCw className={`w-4 h-4 text-slate-600 dark:text-slate-300 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onOpenLocationModal}
              className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 min-h-[40px] shadow-sm whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 dark:text-white" />
              <span className="max-w-[110px] sm:max-w-[150px] truncate">
                {userLocation.locationName}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
