import React from 'react';
import { Info, Accessibility, Users, Bus } from 'lucide-react';

export const TransitLegend: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        <Info className="w-4 h-4 text-emerald-600" />
        <span>Singapore LTA Transit Indicator Guide</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Passenger Load */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Passenger Crowding (Load)</span>
          </div>
          <div className="space-y-1 pt-1 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">SEA:</span>
              <span className="text-slate-600 dark:text-slate-300">Seats Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="font-semibold text-amber-700 dark:text-amber-400">SDA:</span>
              <span className="text-slate-600 dark:text-slate-300">Standing Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="font-semibold text-rose-700 dark:text-rose-400">LSD:</span>
              <span className="text-slate-600 dark:text-slate-300">Limited Standing</span>
            </div>
          </div>
        </div>

        {/* Bus Capacities / Types */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Bus className="w-3.5 h-3.5 text-slate-500" />
            <span>Bus Fleet Types</span>
          </div>
          <div className="space-y-1 pt-1 text-[11px] text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold bg-slate-200 dark:bg-slate-700 px-1 rounded text-[10px]">SD</span>
              <span>Single Decker (~85 pax)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold bg-slate-200 dark:bg-slate-700 px-1 rounded text-[10px]">DD</span>
              <span>Double Decker (~130 pax)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold bg-slate-200 dark:bg-slate-700 px-1 rounded text-[10px]">BD</span>
              <span>Bendy / Articulated bus</span>
            </div>
          </div>
        </div>

        {/* Accessibility & GPS Arrival */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Accessibility className="w-3.5 h-3.5 text-blue-500" />
            <span>Accessibility & Live Timers</span>
          </div>
          <div className="space-y-1 pt-1 text-[11px] text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Accessibility className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>WAB: Wheelchair Accessible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-emerald-600">Arr</span>
              <span>Bus is currently pulling in / &lt; 45s</span>
            </div>
            <div className="text-slate-500 text-[10px]">
              Timings count down in real-time every second.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
