import React, { useState } from 'react';
import { Bus, Search, ChevronRight } from 'lucide-react';
import { SERVICE_METADATA } from '../data/singaporeBuses';

interface BusRoutesViewProps {
  onSelectRoute: (serviceNo: string) => void;
}

export const BusRoutesView: React.FC<BusRoutesViewProps> = ({ onSelectRoute }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Trunk' | 'Express'>('All');

  const services = Object.entries(SERVICE_METADATA).filter(([num, meta]) => {
    const matchesSearch =
      num.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meta.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || meta.category === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bus className="w-5 h-5 text-emerald-600" />
            <span>Singapore Bus Services Directory</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Explore routes, operating hours, frequencies, and scheduled interchanges.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['All', 'Trunk', 'Express'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors min-h-[34px] ${
                filterType === type
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search bus number (e.g. 190, 65) or destination (e.g. Changi, Jurong)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map(([serviceNo, meta]) => (
          <button
            key={serviceNo}
            onClick={() => onSelectRoute(serviceNo)}
            className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 text-left transition-all group shadow-xs flex items-center justify-between gap-3 min-h-[72px]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-12 h-11 rounded-xl bg-slate-900 text-white font-mono font-black text-base flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                {serviceNo}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{meta.operator}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{meta.category}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                  To {meta.destination}
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 shrink-0" />
          </button>
        ))}
      </div>

    </div>
  );
};
