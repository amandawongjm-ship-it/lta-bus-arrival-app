import React, { useState } from 'react';
import { Star, Navigation, Radio, Search } from 'lucide-react';
import { BusStop, BusServiceArrival, BusAlert } from '../types/transit';
import { formatDistance } from '../utils/geo';
import { BusServiceRow } from './BusServiceRow';

interface BusStopCardProps {
  stop: BusStop;
  arrivals: BusServiceArrival[];
  isFavorite: boolean;
  onToggleFavorite: (stopCode: string) => void;
  onSetAlert: (serviceNo: string, stopCode: string, stopName: string, destination: string) => void;
  activeAlerts: BusAlert[];
  onSelectRoute: (serviceNo: string) => void;
  onFocusOnRadar: (stopCode: string) => void;
}

export const BusStopCard: React.FC<BusStopCardProps> = ({
  stop,
  arrivals,
  isFavorite,
  onToggleFavorite,
  onSetAlert,
  activeAlerts,
  onSelectRoute,
  onFocusOnRadar,
}) => {
  const [serviceSearch, setServiceSearch] = useState('');

  const filteredArrivals = arrivals.filter((arr) => {
    if (!serviceSearch.trim()) return true;
    const query = serviceSearch.trim().toLowerCase();
    return (
      arr.serviceNo.toLowerCase().includes(query) ||
      arr.destinationName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* Bus Stop Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-800/40 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="min-w-0">
            {/* Top metadata line: 5-digit code and road */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
                {stop.code}
              </span>
              <span>·</span>
              <span className="truncate">{stop.road}</span>
              {stop.bearing && (
                <>
                  <span>·</span>
                  <span className="font-mono text-[11px] text-slate-400">{stop.bearing}</span>
                </>
              )}
            </div>

            {/* Stop Main Name */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 truncate">
              {stop.name}
            </h2>

            {/* Distance & Walking Time */}
            {stop.distanceMeters !== undefined && (
              <div className="flex items-center gap-2 mt-1 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <Navigation className="w-3.5 h-3.5" />
                <span>{formatDistance(stop.distanceMeters)} away</span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-slate-600 dark:text-slate-300">
                  ~{stop.walkTimeMinutes} min walk
                </span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-slate-500">
                  {arrivals.length} {arrivals.length === 1 ? 'service' : 'services'}
                </span>
              </div>
            )}
          </div>

          {/* Quick Header Actions: Favorite and Focus on Radar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onFocusOnRadar(stop.code)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 min-h-[40px]"
              title="Show on Radar Map"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              <span>View Radar</span>
            </button>

            <button
              onClick={() => onToggleFavorite(stop.code)}
              className={`p-2.5 rounded-xl border transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                isFavorite
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-500 border-slate-200 dark:border-slate-700'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save bus stop to favorites'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>

        {/* Filter input for stops with many bus lines */}
        {arrivals.length > 3 && (
          <div className="mt-3 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Filter ${arrivals.length} bus services (e.g. 190)...`}
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Bus Services List */}
      <div className="p-3 sm:p-4 space-y-2.5">
        {filteredArrivals.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            No bus service matching "{serviceSearch}" at this stop.
          </div>
        ) : (
          filteredArrivals.map((arr) => {
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
          })
        )}
      </div>

    </div>
  );
};
