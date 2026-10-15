import React from 'react';
import { Accessibility, Bell, BellRing, ChevronRight } from 'lucide-react';
import { BusServiceArrival, BusArrivalInfo, BusLoad } from '../types/transit';

interface BusServiceRowProps {
  arrival: BusServiceArrival;
  stopCode: string;
  stopName: string;
  onSetAlert: (serviceNo: string, stopCode: string, stopName: string, destination: string) => void;
  hasActiveAlert: boolean;
  onSelectRoute: (serviceNo: string) => void;
}

export const BusServiceRow: React.FC<BusServiceRowProps> = ({
  arrival,
  stopCode,
  stopName,
  onSetAlert,
  hasActiveAlert,
  onSelectRoute,
}) => {
  const getLoadBadgeConfig = (load: BusLoad) => {
    switch (load) {
      case 'SEA':
        return {
          label: 'Seats Avail',
          bg: 'bg-emerald-50 dark:bg-emerald-950/50',
          text: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-800',
          dot: 'bg-emerald-500',
        };
      case 'SDA':
        return {
          label: 'Standing Avail',
          bg: 'bg-amber-50 dark:bg-amber-950/50',
          text: 'text-amber-800 dark:text-amber-400',
          border: 'border-amber-200 dark:border-amber-800',
          dot: 'bg-amber-500',
        };
      case 'LSD':
        return {
          label: 'Limited Standing',
          bg: 'bg-rose-50 dark:bg-rose-950/50',
          text: 'text-rose-800 dark:text-rose-400',
          border: 'border-rose-200 dark:border-rose-800',
          dot: 'bg-rose-500',
        };
    }
  };

  const renderBusArrivalChip = (bus: BusArrivalInfo | null, isPrimary: boolean = false) => {
    if (!bus) {
      return (
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 min-w-[76px] text-center">
          <span className="text-xs text-slate-400 font-mono">--</span>
          <span className="text-[10px] text-slate-400">No data</span>
        </div>
      );
    }

    const loadConfig = getLoadBadgeConfig(bus.load);
    const isArriving = bus.secondsRemaining <= 50;

    if (isPrimary) {
      return (
        <div
          className={`flex flex-col p-2.5 rounded-xl border transition-all ${
            isArriving
              ? 'bg-emerald-500/10 border-emerald-300 dark:border-emerald-700 ring-2 ring-emerald-500/20'
              : `${loadConfig.bg} ${loadConfig.border}`
          } min-w-[94px] sm:min-w-[105px]`}
        >
          {/* Top row: Timing & Pulse */}
          <div className="flex items-center justify-between gap-1">
            <span
              className={`text-lg sm:text-xl font-extrabold font-mono tabular-nums leading-none ${
                isArriving ? 'text-emerald-700 dark:text-emerald-400 animate-pulse' : 'text-slate-900 dark:text-white'
              }`}
            >
              {bus.formattedTime}
            </span>

            {/* Accessibility and Deck indicators */}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              {bus.type === 'DD' && (
                <span title="Double Deck bus" className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">
                  DD
                </span>
              )}
              {bus.type === 'BD' && (
                <span title="Bendy bus" className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">
                  BD
                </span>
              )}
              {bus.feature === 'WAB' && (
                <span title="Wheelchair Accessible" className="inline-flex items-center">
                  <Accessibility className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </span>
              )}
            </div>
          </div>

          {/* Bottom row: Load status label */}
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${loadConfig.dot}`} />
            <span className={`truncate text-[10px] ${loadConfig.text}`}>{loadConfig.label}</span>
          </div>
        </div>
      );
    }

    // Secondary / Tertiary Bus Preview
    return (
      <div className="flex flex-col p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 min-w-[74px] sm:min-w-[80px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
            {bus.formattedTime}
          </span>
          {bus.type === 'DD' && (
            <span className="text-[9px] font-mono font-medium text-slate-500">DD</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1 text-[10px]">
          <span className={`w-1.5 h-1.5 rounded-full ${loadConfig.dot}`} />
          <span className="text-slate-500 dark:text-slate-400 text-[10px] truncate">{bus.load}</span>
        </div>
      </div>
    );
  };

  const getOperatorBadge = (operator: string) => {
    switch (operator) {
      case 'SBST':
        return 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';
      case 'SMRT':
        return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800';
      case 'TTS':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
      case 'GAS':
        return 'text-yellow-800 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Left: Bus Service Number and Destination */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          
          {/* Prominent Service Number Box */}
          <button
            onClick={() => onSelectRoute(arrival.serviceNo)}
            className="w-14 sm:w-16 h-12 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex flex-col items-center justify-center font-mono font-black text-lg sm:text-xl tracking-tight hover:bg-emerald-700 transition-colors shrink-0 shadow-xs group"
            title="Click to view full bus route sequence"
          >
            <span>{arrival.serviceNo}</span>
            <span className="text-[9px] font-sans font-medium text-slate-300 group-hover:text-white">Route</span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border font-mono ${getOperatorBadge(arrival.operator)}`}>
                {arrival.operator}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {arrival.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5 text-sm font-semibold text-slate-900 dark:text-white truncate">
              <span className="text-slate-400 text-xs font-normal">To</span>
              <span className="truncate">{arrival.destinationName}</span>
            </div>

            {arrival.nextBus?.plateNumber && (
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Next vehicle: <span className="text-slate-600 dark:text-slate-300 font-medium">{arrival.nextBus.plateNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Arrival times and Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80">
          
          {/* Upcoming bus times: 1st, 2nd, 3rd */}
          <div className="flex items-center gap-1.5">
            {renderBusArrivalChip(arrival.nextBus, true)}
            {renderBusArrivalChip(arrival.nextBus2, false)}
            {renderBusArrivalChip(arrival.nextBus3, false)}
          </div>

          {/* Action buttons: Set Alert & View Route */}
          <div className="flex flex-col gap-1 shrink-0">
            <button
              onClick={() => onSetAlert(arrival.serviceNo, stopCode, stopName, arrival.destinationName)}
              title={hasActiveAlert ? 'Alarm active for this bus' : 'Set alarm when bus is 2m away'}
              className={`p-2 rounded-lg border transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                hasActiveAlert
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {hasActiveAlert ? <BellRing className="w-4 h-4 animate-bounce" /> : <Bell className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onSelectRoute(arrival.serviceNo)}
              title="View full route sequence"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
