import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface GlitchCorruptionOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const GlitchCorruptionOverlay: React.FC<GlitchCorruptionOverlayProps> = ({
  isVisible,
  message = '记忆被侵蚀 · 蚀墓虫正在啃噬历史证据',
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex flex-col items-center justify-center bg-black/70 animate-pulse">
      {/* Glitch TV Noise lines */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 3px)`,
          backgroundSize: '100% 3px',
        }}
      />

      {/* Black Corruption Organic Splatters (黑色食痕) */}
      <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none">
        <defs>
          <radialGradient id="corruptGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#1a0a0a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3d0000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="20%" cy="30%" r="90" fill="url(#corruptGrad)" />
        <circle cx="85%" cy="40%" r="110" fill="url(#corruptGrad)" />
        <circle cx="35%" cy="80%" r="100" fill="url(#corruptGrad)" />
        <circle cx="75%" cy="85%" r="120" fill="url(#corruptGrad)" />
      </svg>

      {/* Central Glitch Banner */}
      <div className="relative z-10 bg-[#2d0000]/95 border-2 border-red-500/80 px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.6)] flex items-center gap-2 max-w-[85%] text-center backdrop-blur-md animate-bounce">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 animate-ping" />
        <div className="text-left">
          <div className="text-[11px] font-black text-red-200 tracking-wider font-serif">
            {message}
          </div>
          <div className="text-[9px] text-red-400 font-mono">
            EATING_RECORD_ERROR · 请重新观察后重试
          </div>
        </div>
      </div>
    </div>
  );
};
