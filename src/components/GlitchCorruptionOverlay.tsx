import React from 'react';
import { AlertTriangle, Bug, Sparkles, XCircle } from 'lucide-react';

interface GlitchCorruptionOverlayProps {
  isVisible: boolean;
  message?: string;
  confusionCount?: number;
}

export const GlitchCorruptionOverlay: React.FC<GlitchCorruptionOverlayProps> = ({
  isVisible,
  message,
  confusionCount,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex flex-col items-center justify-center bg-black/75 backdrop-blur-[2px] animate-fade-in select-none">
      {/* Glitch TV Noise scanlines */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none animate-pulse"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255,50,50,0.2) 0px, rgba(255,50,50,0.2) 1px, transparent 1px, transparent 4px)`,
          backgroundSize: '100% 4px',
        }}
      />

      {/* Black & Red Organic Corrosion Splatters */}
      <svg className="absolute inset-0 w-full h-full opacity-75 pointer-events-none">
        <defs>
          <radialGradient id="corruptGradRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#1a0a0a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="20%" cy="25%" r="90" fill="url(#corruptGradRed)" />
        <circle cx="85%" cy="35%" r="110" fill="url(#corruptGradRed)" />
        <circle cx="30%" cy="75%" r="100" fill="url(#corruptGradRed)" />
        <circle cx="75%" cy="80%" r="120" fill="url(#corruptGradRed)" />
      </svg>

      {/* Central Consequence Modal / Alert Popup */}
      <div className="relative z-10 bg-gradient-to-b from-[#2d0505] to-[#170202] border-2 border-red-500/90 p-4 rounded-3xl shadow-[0_0_30px_rgba(239,68,68,0.7)] flex flex-col items-center gap-2.5 max-w-[88%] text-center backdrop-blur-md animate-bounce pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-red-950/80 border border-red-500 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-spin-slow">
            <XCircle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-left">
            <div className="text-[13px] font-black text-red-100 tracking-wider font-serif">
              记忆错乱＋1，玉舞人的记忆在丢失...
            </div>
            <div className="text-[9px] text-red-400 font-mono flex items-center gap-1">
              <Bug className="w-3 h-3 text-red-400 animate-pulse" />
              <span>蚀墓虫侵蚀规则 · 记忆回溯受阻</span>
            </div>
          </div>
        </div>

        {message && (
          <div className="text-[10px] text-red-200/90 font-serif bg-red-950/60 px-3 py-1.5 rounded-xl border border-red-800/60 w-full text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

