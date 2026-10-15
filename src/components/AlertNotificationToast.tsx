import React from 'react';
import { BellRing, X, ArrowRight } from 'lucide-react';
import { BusAlert } from '../types/transit';

interface AlertNotificationToastProps {
  alerts: BusAlert[];
  onDismiss: (alertId: string) => void;
  onViewStop: (stopCode: string) => void;
}

export const AlertNotificationToast: React.FC<AlertNotificationToastProps> = ({
  alerts,
  onDismiss,
  onViewStop,
}) => {
  const triggeredAlerts = alerts.filter((a) => a.triggered);
  if (triggeredAlerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full space-y-2 pointer-events-none">
      {triggeredAlerts.map((alert) => (
        <div
          key={alert.id}
          className="pointer-events-auto bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border-2 border-emerald-500 flex items-start justify-between gap-3 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm animate-bounce">
              <BellRing className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-black text-sm bg-white text-slate-900 px-1.5 py-0.2 rounded">
                  {alert.serviceNo}
                </span>
                <span className="text-xs font-bold text-emerald-400">Arriving Soon!</span>
              </div>

              <div className="text-xs font-medium text-slate-200 mt-1">
                {alert.stopName} ({alert.stopCode})
              </div>

              <div className="text-[11px] text-slate-400 mt-0.5">
                To {alert.destinationName} · Prepare to board!
              </div>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => onViewStop(alert.stopCode)}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-semibold text-white flex items-center gap-1 transition-colors"
                >
                  <span>View Stop</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDismiss(alert.id)}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
