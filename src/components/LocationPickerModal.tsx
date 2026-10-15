import React, { useState } from 'react';
import { X, MapPin, Crosshair, Check } from 'lucide-react';
import { SINGAPORE_HOTSPOTS } from '../utils/geo';
import { UserLocation } from '../types/transit';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: UserLocation;
  onSelectHotspot: (lat: number, lng: number, name: string) => void;
  onDetectRealGps: () => void;
  isDetectingGps: boolean;
  gpsError: string | null;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectHotspot,
  onDetectRealGps,
  isDetectingGps,
  gpsError,
}) => {
  const [customLat, setCustomLat] = useState<string>(currentLocation.lat.toString());
  const [customLng, setCustomLng] = useState<string>(currentLocation.lng.toString());
  const [showCustom, setShowCustom] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      onSelectHotspot(lat, lng, `Custom (${lat.toFixed(3)}, ${lng.toFixed(3)})`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">Select Transit Location</h2>
              <p className="text-xs text-slate-300">Choose your Singapore starting point for GPS arrivals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real GPS Button */}
        <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40">
          <button
            onClick={() => {
              onDetectRealGps();
            }}
            disabled={isDetectingGps}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors min-h-[44px]"
          >
            <Crosshair className={`w-4 h-4 ${isDetectingGps ? 'animate-spin' : ''}`} />
            <span>
              {isDetectingGps ? 'Querying Browser Geolocation...' : 'Use My Current Device GPS Location'}
            </span>
          </button>

          {gpsError && (
            <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-2 text-center">
              {gpsError}
            </p>
          )}
        </div>

        {/* Hotspots List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Popular Singapore Transit Hubs</span>
            <span>1-Tap Sim</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {SINGAPORE_HOTSPOTS.map((hotspot) => {
              const isSelected =
                Math.abs(currentLocation.lat - hotspot.lat) < 0.001 &&
                Math.abs(currentLocation.lng - hotspot.lng) < 0.001;

              return (
                <button
                  key={hotspot.id}
                  onClick={() => {
                    onSelectHotspot(hotspot.lat, hotspot.lng, hotspot.name);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all min-h-[52px] ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {hotspot.name}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.2 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {hotspot.description}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
                      {hotspot.lat.toFixed(3)}, {hotspot.lng.toFixed(3)}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Coordinate Dropdown Toggle */}
          <div className="pt-2">
            <button
              onClick={() => setShowCustom(!showCustom)}
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
            >
              <span>{showCustom ? 'Hide custom coordinate input' : '+ Enter custom GPS coordinates'}</span>
            </button>

            {showCustom && (
              <form onSubmit={handleApplyCustom} className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1">Latitude</label>
                    <input
                      type="text"
                      value={customLat}
                      onChange={(e) => setCustomLat(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Longitude</label>
                    <input
                      type="text"
                      value={customLng}
                      onChange={(e) => setCustomLng(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border rounded font-mono"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Set Custom Position
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          Arrival times and distances dynamically re-compute relative to this point.
        </div>

      </div>
    </div>
  );
};
