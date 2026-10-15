import React from 'react';
import { X, Bus, ArrowRight } from 'lucide-react';
import { BusRoute } from '../types/transit';
import { BUS_ROUTES, SERVICE_METADATA } from '../data/singaporeBuses';

interface RouteViewerModalProps {
  serviceNo: string | null;
  onClose: () => void;
  onSelectStop: (stopCode: string) => void;
}

export const RouteViewerModal: React.FC<RouteViewerModalProps> = ({
  serviceNo,
  onClose,
  onSelectStop,
}) => {
  if (!serviceNo) return null;

  const route: BusRoute | undefined = BUS_ROUTES[serviceNo] || {
    serviceNo,
    direction: 1,
    origin: 'Singapore Central Terminal',
    destination: SERVICE_METADATA[serviceNo]?.destination || 'Regional Interchange',
    operatingHours: {
      firstBus: '05:30',
      lastBus: '23:45',
      freqPeak: '4 - 7 mins',
      freqOffPeak: '8 - 12 mins',
    },
    stops: [
      { seq: 1, stopCode: '01012', stopName: 'Bugis Stn Exit A', roadName: 'Victoria St', distanceKm: 0.0, hasActiveBus: true },
      { seq: 2, stopCode: '04121', stopName: 'Bras Basah Cplx', roadName: 'Victoria St', distanceKm: 1.1 },
      { seq: 3, stopCode: '08057', stopName: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', distanceKm: 2.4, isCurrentStop: true },
      { seq: 4, stopCode: '08138', stopName: 'Somerset Stn', roadName: 'Somerset Rd', distanceKm: 3.5, hasActiveBus: true },
      { seq: 5, stopCode: '09048', stopName: 'Orchard Stn / Tangs', roadName: 'Orchard Rd', distanceKm: 4.8 },
      { seq: 6, stopCode: '14141', stopName: 'VivoCity', roadName: 'Telok Blangah Rd', distanceKm: 9.6 },
    ],
  };

  const meta = SERVICE_METADATA[serviceNo];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center font-mono font-black text-2xl tracking-tight shadow-md">
              {route.serviceNo}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-emerald-400">{meta?.operator || 'LTA Transit'}</span>
                <span>·</span>
                <span>{meta?.category || 'Trunk Route'}</span>
                <span>·</span>
                <span>Direction {route.direction}</span>
              </div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                <span>{route.origin}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">{route.destination}</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Operating Hours and Frequency Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:px-6 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 text-[11px] block">First Bus</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {route.operatingHours.firstBus}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Last Bus</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {route.operatingHours.lastBus}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Peak Frequency</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {route.operatingHours.freqPeak}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Off-Peak Freq</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              {route.operatingHours.freqOffPeak}
            </span>
          </div>
        </div>

        {/* Stops Sequence / Route Line */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Route Stops Sequence</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Bus on Route</span>
              </span>
            </div>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-700">
            {route.stops.map((stop, index) => (
              <div
                key={stop.stopCode}
                className="relative flex items-start justify-between gap-3 group"
              >
                {/* Node icon along the line */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    stop.hasActiveBus
                      ? 'bg-emerald-500 border-white text-white shadow-xs ring-4 ring-emerald-500/20'
                      : stop.isCurrentStop
                      ? 'bg-blue-600 border-white text-white'
                      : 'bg-white dark:bg-slate-800 border-slate-400 text-slate-500'
                  }`}
                >
                  {stop.hasActiveBus ? (
                    <Bus className="w-2.5 h-2.5" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                </div>

                {/* Stop info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {stop.stopCode}
                    </span>
                    <button
                      onClick={() => {
                        onSelectStop(stop.stopCode);
                        onClose();
                      }}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 text-left transition-colors truncate"
                    >
                      {stop.stopName}
                    </button>
                    {stop.isCurrentStop && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                        Your Stop
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {stop.roadName} · {stop.distanceKm.toFixed(1)} km from start
                  </div>
                </div>

                {/* Action to jump to this stop */}
                <button
                  onClick={() => {
                    onSelectStop(stop.stopCode);
                    onClose();
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 rounded-lg shrink-0 transition-colors"
                >
                  Arrivals
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {route.stops.length} scheduled stops
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 rounded-xl transition-colors min-h-[40px]"
          >
            Close Route View
          </button>
        </div>

      </div>
    </div>
  );
};
