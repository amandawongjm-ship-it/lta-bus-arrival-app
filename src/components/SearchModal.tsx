import React, { useState, useMemo } from 'react';
import { X, Search, Bus, MapPin, ArrowRight } from 'lucide-react';
import { BusStop } from '../types/transit';
import { formatDistance } from '../utils/geo';
import { SERVICE_METADATA } from '../data/singaporeBuses';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  busStops: BusStop[];
  onSelectStop: (stopCode: string) => void;
  onSelectRoute: (serviceNo: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  busStops,
  onSelectStop,
  onSelectRoute,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { matchingStops: [], matchingServices: [] };

    const matchingStops = busStops
      .filter((s) => {
        return (
          s.code.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.road.toLowerCase().includes(q) ||
          s.services.some((srv) => srv.toLowerCase() === q)
        );
      })
      .slice(0, 10);

    const matchingServices = Object.keys(SERVICE_METADATA)
      .filter((srv) => srv.toLowerCase().startsWith(q) || srv.toLowerCase() === q)
      .slice(0, 6);

    return { matchingStops, matchingServices };
  }, [query, busStops]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-20 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by stop code (01012), name (Bugis), or bus (190)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          
          {/* Quick Services Matches */}
          {searchResults.matchingServices.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Bus Services
              </div>
              <div className="flex flex-wrap gap-2">
                {searchResults.matchingServices.map((srv) => (
                  <button
                    key={srv}
                    onClick={() => {
                      onSelectRoute(srv);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-600 transition-colors"
                  >
                    <Bus className="w-3.5 h-3.5" />
                    <span>Bus {srv}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stops Matches */}
          {searchResults.matchingStops.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Matching Bus Stops ({searchResults.matchingStops.length})
              </div>
              <div className="space-y-1.5">
                {searchResults.matchingStops.map((stop) => (
                  <button
                    key={stop.code}
                    onClick={() => {
                      onSelectStop(stop.code);
                      onClose();
                    }}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-800/60 text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-900 dark:text-white">
                          {stop.code}
                        </span>
                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          {stop.name}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {stop.road} · {stop.services.length} services ({stop.services.slice(0, 5).join(', ')}{stop.services.length > 5 ? '...' : ''})
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {stop.distanceMeters !== undefined && (
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                          {formatDistance(stop.distanceMeters)}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && searchResults.matchingStops.length === 0 && searchResults.matchingServices.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No bus stops or services found matching "{query}".
            </div>
          )}

          {!query && (
            <div className="py-6 text-center text-xs text-slate-400">
              Try searching for popular codes like <span className="font-mono font-bold text-slate-700 dark:text-slate-200">01012</span> (Bugis) or <span className="font-mono font-bold text-slate-700 dark:text-slate-200">09048</span> (Orchard) or bus <span className="font-mono font-bold text-slate-700 dark:text-slate-200">190</span>.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
