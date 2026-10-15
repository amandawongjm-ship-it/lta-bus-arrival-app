import React from 'react';
import { Navigation, Radio, Star, Bus } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'nearby' | 'radar' | 'favorites' | 'routes';
  setActiveTab: (tab: 'nearby' | 'radar' | 'favorites' | 'routes') => void;
  favoritesCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden">
      <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-2">
        
        <button
          onClick={() => setActiveTab('nearby')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
            activeTab === 'nearby'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[11px] tracking-tight mt-1">Nearby</span>
        </button>

        <button
          onClick={() => setActiveTab('radar')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
            activeTab === 'radar'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Radio className="w-5 h-5" />
          <span className="text-[11px] tracking-tight mt-1">Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
            activeTab === 'favorites'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Star className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] flex items-center justify-center font-mono font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-1">Saved</span>
        </button>

        <button
          onClick={() => setActiveTab('routes')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
            activeTab === 'routes'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          <Bus className="w-5 h-5" />
          <span className="text-[11px] tracking-tight mt-1">Routes</span>
        </button>

      </div>
    </div>
  );
};
