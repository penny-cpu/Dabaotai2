import React, { useEffect } from 'react';
import { Compass, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface HallTransitionPageProps {
  targetHallName: string;
  subtitle?: string;
  themeColor?: 'gold' | 'red' | 'silver' | 'wood' | 'blue' | 'jade';
  onContinue: () => void;
  autoForwardMs?: number;
}

export const HallTransitionPage: React.FC<HallTransitionPageProps> = ({
  targetHallName,
  subtitle = '两千年汉代时空移步换景',
  themeColor = 'gold',
  onContinue,
  autoForwardMs = 3200,
}) => {
  useEffect(() => {
    soundFX.playStoneDrum();
    const timer = setTimeout(() => {
      onContinue();
    }, autoForwardMs);
    return () => clearTimeout(timer);
  }, [autoForwardMs, onContinue]);

  const getThemeStyles = () => {
    switch (themeColor) {
      case 'red':
        return 'from-[#2b0808] via-[#1a0505] to-[#0a0202] border-red-500/70 text-red-300';
      case 'silver':
        return 'from-[#1a1c24] via-[#0d0e14] to-[#05060a] border-slate-400/70 text-slate-200';
      case 'wood':
        return 'from-[#2d1b0e] via-[#1a0e06] to-[#0d0703] border-amber-600/70 text-amber-200';
      case 'blue':
        return 'from-[#081226] via-[#040914] to-[#02040a] border-blue-400/70 text-blue-200';
      case 'jade':
        return 'from-[#0b2416] via-[#06140c] to-[#020804] border-emerald-400/70 text-emerald-200';
      case 'gold':
      default:
        return 'from-[#2d1f0c] via-[#1c1205] to-[#0a0602] border-amber-400/70 text-amber-200';
    }
  };

  return (
    <div className={`relative w-full h-full bg-gradient-to-b ${getThemeStyles()} flex flex-col items-center justify-between p-6 overflow-hidden select-none font-serif animate-fade-in`}>
      {/* Background Ripple & Light Trails */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-current animate-ping opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-current animate-spin-slow opacity-15" />
      </div>

      {/* Top Badge */}
      <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-current/40 shadow-md">
        <Compass className="w-3.5 h-3.5 animate-spin-slow" />
        <span className="text-[10px] font-mono tracking-widest uppercase">
          展厅时空流转 · 过场导览
        </span>
      </div>

      {/* Center Destination Title */}
      <div className="relative z-10 text-center space-y-4 max-w-xs my-auto">
        <div className="w-16 h-16 mx-auto rounded-full bg-black/50 border-2 border-current flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-bounce">
          <MapPin className="w-8 h-8 text-current" />
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-mono tracking-widest text-amber-400/80">
            FORWARD TO NEXT EXHIBIT
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#ffe89c] tracking-widest">
            {targetHallName}
          </h2>
          <p className="text-[11px] text-[#c2a385] leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Continue Button */}
      <div className="relative z-10 w-full max-w-xs">
        <button
          onClick={() => {
            soundFX.playStoneDrum();
            onContinue();
          }}
          className="w-full py-3 bg-black/70 hover:bg-black/90 text-[#ffe89c] rounded-2xl border border-amber-500/80 text-xs font-serif font-black shadow-lg flex items-center justify-center gap-2 group active:scale-95 transition-all"
        >
          <span>立即前往</span>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
