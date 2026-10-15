import React, { useState } from 'react';
import { Radio, ZoomIn, ZoomOut, Navigation, ChevronRight, X, Clock } from 'lucide-react';
import { BusStop, UserLocation, BusServiceArrival } from '../types/transit';
import { calculateBearing, formatDistance } from '../utils/geo';

interface RadarMapProps {
  userLocation: UserLocation;
  busStops: BusStop[];
  onSelectStop: (stopCode: string) => void;
  getArrivalsForStop: (stopCode: string) => BusServiceArrival[];
  onSetLocation: (lat: number, lng: number, name: string) => void;
}

export const RadarMap: React.FC<RadarMapProps> = ({
  userLocation,
  busStops,
  onSelectStop,
  getArrivalsForStop,
  onSetLocation,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(600); // meters radius for the radar canvas
  const [selectedRadarStop, setSelectedRadarStop] = useState<BusStop | null>(null);
  const [enableSweep, setEnableSweep] = useState<boolean>(true);

  // SVG dimensions
  const size = 560;
  const center = size / 2;

  // Zoom options: 300m, 600m, 1200m
  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setZoomLevel((prev) => Math.max(250, prev - 150));
    } else {
      setZoomLevel((prev) => Math.min(1800, prev + 250));
    }
  };

  // Convert lat/lng to Radar X/Y coordinates relative to user location
  const getRadarCoordinates = (stop: BusStop) => {
    const distance = stop.distanceMeters ?? 0;
    if (distance === 0) return { x: center, y: center };

    const { degrees } = calculateBearing(
      userLocation.lat,
      userLocation.lng,
      stop.lat,
      stop.lng
    );

    // Convert bearing to standard math angle (0 deg North is -90 in screen coords)
    const angleRad = ((degrees - 90) * Math.PI) / 180;
    
    // Scale distance to radius (at distance = zoomLevel, point sits at (size/2) - 30)
    const maxRadius = center - 35;
    const pixelDistance = (distance / zoomLevel) * maxRadius;

    const x = center + pixelDistance * Math.cos(angleRad);
    const y = center + pixelDistance * Math.sin(angleRad);

    return { x, y, distance, degrees, isOutOfRange: distance > zoomLevel * 1.05 };
  };

  const selectedArrivals = selectedRadarStop ? getArrivalsForStop(selectedRadarStop.code) : [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col lg:flex-row">
      
      {/* Left/Main: Visual Radar Display */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center relative bg-slate-950 text-slate-100 min-h-[460px] sm:min-h-[580px] overflow-hidden select-none">
        
        {/* Radar Map Controls Header Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-white">Live Transit Radar</span>
            <span className="text-slate-500">·</span>
            <span className="font-mono text-emerald-400">Radius: {formatDistance(zoomLevel)}</span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setEnableSweep(!enableSweep)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                enableSweep
                  ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Sweep {enableSweep ? 'On' : 'Off'}
            </button>
            <button
              onClick={() => handleZoom('in')}
              className="p-1.5 bg-slate-900/90 text-slate-300 hover:text-white rounded-lg border border-slate-800"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-1.5 bg-slate-900/90 text-slate-300 hover:text-white rounded-lg border border-slate-800"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SVG Radar Display */}
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-[480px] aspect-square relative z-0"
        >
          <defs>
            {/* Green sweep gradient */}
            <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background grid */}
          <circle cx={center} cy={center} r={center - 35} fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

          {/* Concentric distance circles */}
          {[0.25, 0.5, 0.75, 1.0].map((ratio) => {
            const r = (center - 35) * ratio;
            const distLabel = formatDistance(Math.round(zoomLevel * ratio));
            return (
              <g key={ratio}>
                <circle
                  cx={center}
                  cy={center}
                  r={r}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray={ratio < 1 ? '4 4' : 'none'}
                />
                <text
                  x={center + 6}
                  y={center - r + 14}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {distLabel}
                </text>
              </g>
            );
          })}

          {/* Crosshair axes */}
          <line x1={center} y1={30} x2={center} y2={size - 30} stroke="#1e293b" strokeWidth="1" />
          <line x1={30} y1={center} x2={size - 30} y2={center} stroke="#1e293b" strokeWidth="1" />

          {/* Cardinal direction labels */}
          <text x={center} y={22} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">N</text>
          <text x={center} y={size - 10} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">S</text>
          <text x={size - 14} y={center + 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">E</text>
          <text x={16} y={center + 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">W</text>

          {/* Animated radar sweep */}
          {enableSweep && (
            <g className="animate-radar-sweep">
              <path
                d={`M ${center} ${center} L ${center} ${35} A ${center - 35} ${center - 35} 0 0 1 ${center + (center - 35) * Math.sin(Math.PI / 4)} ${center - (center - 35) * Math.cos(Math.PI / 4)} Z`}
                fill="url(#sweepGradient)"
              />
              <line
                x1={center}
                y1={center}
                x2={center}
                y2={35}
                stroke="#34d399"
                strokeWidth="1.5"
                filter="url(#glow)"
              />
            </g>
          )}

          {/* Center: User GPS Location Pin */}
          <g>
            <circle cx={center} cy={center} r={18} fill="#3b82f6" fillOpacity="0.2" className="animate-transit-pulse" />
            <circle cx={center} cy={center} r={8} fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
            <circle cx={center} cy={center} r={3} fill="#ffffff" />
          </g>

          {/* Nearby Bus Stop Nodes */}
          {busStops.map((stop) => {
            const { x, y, distance, isOutOfRange } = getRadarCoordinates(stop);
            if (isOutOfRange) return null;

            const isSelected = selectedRadarStop?.code === stop.code;

            return (
              <g
                key={stop.code}
                className="cursor-pointer group"
                onClick={() => setSelectedRadarStop(stop)}
              >
                {/* Connecting dotted line to center if selected */}
                {isSelected && (
                  <line
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Node Outer Ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 14 : 9}
                  fill={isSelected ? '#10b981' : '#047857'}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter="url(#glow)"
                  className="transition-all duration-200 group-hover:scale-125 origin-center"
                />

                {/* Stop Code Pin Label */}
                <text
                  x={x}
                  y={y - (isSelected ? 16 : 12)}
                  textAnchor="middle"
                  fill={isSelected ? '#34d399' : '#cbd5e1'}
                  fontSize={isSelected ? '11' : '9'}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {stop.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Bottom Legend on Radar */}
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-white" />
            <span>You (GPS)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
            <span>Bus Stop Node</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Tap node for arrivals
          </div>
        </div>

      </div>

      {/* Right: Selected Bus Stop Quick Arrival Panel */}
      <div className="w-full lg:w-96 p-4 sm:p-5 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/60 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
        {selectedRadarStop ? (
          <div>
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-900 dark:text-white">
                    {selectedRadarStop.code}
                  </span>
                  <span className="text-xs text-slate-500">{selectedRadarStop.road}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {selectedRadarStop.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{formatDistance(selectedRadarStop.distanceMeters ?? 0)} away</span>
                  <span className="text-slate-400">·</span>
                  <span>~{selectedRadarStop.walkTimeMinutes}m walk</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRadarStop(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Arrivals List */}
            <div className="mt-3 space-y-2 max-h-[360px] overflow-y-auto pr-1">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Next Bus Arrivals</span>
              </div>

              {selectedArrivals.map((arr) => (
                <div
                  key={arr.serviceNo}
                  className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-10 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                      {arr.serviceNo}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 truncate">
                      {arr.destinationName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 font-mono">
                    <span className="text-xs font-bold text-slate-900 dark:text-white px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {arr.nextBus?.formattedTime || '--'}
                    </span>
                    {arr.nextBus2 && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {arr.nextBus2.formattedTime}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => onSelectStop(selectedRadarStop.code)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-xs font-semibold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
              >
                <span>View Full Stop Schedule</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <Radio className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Interactive Bus Radar
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[220px]">
              Tap any green stop pin on the radar to see live arrival times and walking distance.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
