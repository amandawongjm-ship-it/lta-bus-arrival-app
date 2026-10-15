import React, { useState } from 'react';
import { Star, Trash2, Plus, Navigation } from 'lucide-react';
import { FavoriteItem, BusStop, BusServiceArrival, BusAlert } from '../types/transit';
import { BusServiceRow } from './BusServiceRow';

interface FavoritesViewProps {
  favorites: FavoriteItem[];
  busStops: BusStop[];
  onRemoveFavorite: (stopCode: string) => void;
  onAddPresetFavorite: (stopCode: string, label: string, tag: 'Home' | 'Work' | 'Frequent') => void;
  getArrivalsForStop: (stopCode: string) => BusServiceArrival[];
  onSetAlert: (serviceNo: string, stopCode: string, stopName: string, destination: string) => void;
  activeAlerts: BusAlert[];
  onSelectRoute: (serviceNo: string) => void;
  onGoToNearby: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  busStops,
  onRemoveFavorite,
  onAddPresetFavorite,
  getArrivalsForStop,
  onSetAlert,
  activeAlerts,
  onSelectRoute,
  onGoToNearby,
}) => {
  const [filterTag, setFilterTag] = useState<'All' | 'Home' | 'Work' | 'Frequent'>('All');

  const filteredFavorites = favorites.filter((fav) => {
    if (filterTag === 'All') return true;
    return fav.tag === filterTag;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Filter Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <span>Saved Bus Stops & Routes</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Quick access to your regular commute stops with live arrival tracking.
          </p>
        </div>

        {/* Filter tags (segmented control buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['All', 'Home', 'Work', 'Frequent'] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[34px] ${
                filterTag === tag
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Stops List */}
      {filteredFavorites.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Star className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No saved bus stops in this category
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
            Pin bus stops from the Nearby Stops tab or tap any of the popular Singapore hubs below to add them to your daily commute board.
          </p>

          {/* Quick Add Suggestions */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => onAddPresetFavorite('01012', 'Bugis Stn Exit A', 'Work')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold rounded-xl text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              <span>+ Bugis Stn (Work)</span>
            </button>
            <button
              onClick={() => onAddPresetFavorite('08138', 'Somerset Stn', 'Home')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold rounded-xl text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              <span>+ Somerset Stn (Home)</span>
            </button>
            <button
              onClick={() => onAddPresetFavorite('14141', 'VivoCity', 'Frequent')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold rounded-xl text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              <span>+ VivoCity (Frequent)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredFavorites.map((fav) => {
            const stop = busStops.find((s) => s.code === fav.stopCode);
            if (!stop) return null;
            const arrivals = getArrivalsForStop(stop.code);

            return (
              <div
                key={fav.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
              >
                {/* Header with Tag & Remove Button */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-800 dark:text-white">
                      {stop.code}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {fav.customLabel || stop.name}
                    </h3>
                    {fav.tag && (
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {fav.tag}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(stop.code)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Arrivals */}
                <div className="p-3 sm:p-4 space-y-2.5">
                  {arrivals.slice(0, 4).map((arr) => {
                    const hasAlert = activeAlerts.some(
                      (a) => a.stopCode === stop.code && a.serviceNo === arr.serviceNo && !a.triggered
                    );
                    return (
                      <BusServiceRow
                        key={arr.serviceNo}
                        arrival={arr}
                        stopCode={stop.code}
                        stopName={stop.name}
                        onSetAlert={onSetAlert}
                        hasActiveAlert={hasAlert}
                        onSelectRoute={onSelectRoute}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
