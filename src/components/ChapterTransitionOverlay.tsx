import React, { useEffect } from 'react';
import { SectionKey, JadeFragmentId } from '../types';
import { soundFX } from '../utils/soundEngine';
import { Sparkles } from 'lucide-react';

interface ChapterTransitionOverlayProps {
  targetSection: SectionKey;
  unlockedFragments: JadeFragmentId[];
  onComplete: () => void;
  title: string;
}

export const ChapterTransitionOverlay: React.FC<ChapterTransitionOverlayProps> = ({
  targetSection,
  unlockedFragments,
  onComplete,
  title,
}) => {
  useEffect(() => {
    soundFX.playBronzeChime();
    const timer = setTimeout(() => {
      onComplete();
    }, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Stage 1-7 fragment count
  const fragmentCount = unlockedFragments.length;

  return (
    <div className="absolute inset-0 z-50 bg-[#140e0a]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden font-serif animate-fade-in">
      {/* Background Artifact Particle Overlay per chapter */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden flex items-center justify-center">
        {targetSection === 'weapon' && (
          <div className="relative w-full h-full flex items-center justify-center animate-pulse">
            <svg viewBox="0 0 100 100" className="w-64 h-64 text-[#d2b48c] stroke-current stroke-1 fill-none">
              <line x1="20" y1="80" x2="80" y2="20" strokeWidth="2" />
              <polygon points="80,20 90,15 85,30" fill="#ffe89c" />
              <line x1="60" y1="40" x2="75" y2="55" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" strokeDasharray="4,4" className="animate-spin" />
            </svg>
          </div>
        )}

        {targetSection === 'pendant' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border-4 border-dashed border-[#ffe89c] animate-spin opacity-50" />
            <div className="absolute w-40 h-40 rounded-full bg-[#88b598]/20 blur-xl animate-pulse" />
          </div>
        )}

        {targetSection === 'gallery' && (
          <div className="relative w-full h-full flex items-center justify-around opacity-40">
            <div className="w-16 h-32 border border-[#d2b48c] rounded-t-full animate-bounce" />
            <div className="w-20 h-28 border border-[#e6d5b8] rounded-2xl animate-pulse" />
            <div className="w-16 h-32 border border-[#d2b48c] rounded-t-full animate-bounce" />
          </div>
        )}

        {targetSection === 'baixi' && (
          <div className="relative w-56 h-56 flex items-center justify-center">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-[#ffe89c] shadow-lg animate-ping"
                style={{
                  transform: `rotate(${i * 51.4}deg) translateY(-80px)`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}

        {targetSection === 'funerary' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-72 h-72 fill-none stroke-[#88b598] stroke-1 opacity-60">
              <path d="M10,50 Q30,20 50,50 T90,50" className="animate-pulse" />
              <path d="M10,60 Q40,90 70,50 T100,60" className="animate-pulse" />
              <circle cx="50" cy="50" r="35" stroke="#ffe89c" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {targetSection === 'huangchang' && (
          <div className="relative w-56 h-56 grid grid-cols-4 gap-1 opacity-50">
            {Array.from({ length: 16 }).map((_, idx) => (
              <div
                key={idx}
                className="h-10 bg-[#5c4033] border border-[#d2b48c] animate-pulse"
                style={{ animationDelay: `${idx * 0.05}s` }}
              />
            ))}
          </div>
        )}

        {targetSection === 'ascension' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#2e7d32]/20 to-[#0288d1]/30 blur-2xl" />
            <svg viewBox="0 0 100 100" className="w-64 h-64 text-[#ffe89c]">
              <circle cx="50" cy="50" r="40" stroke="#ffe89c" strokeWidth="0.8" strokeDasharray="2,4" fill="none" />
              <polygon points="50,10 53,20 63,20 55,26 58,36 50,30 42,36 45,26 37,20 47,20" fill="#ffe89c" />
            </svg>
          </div>
        )}
      </div>

      {/* Central 7-Stage Jade Dancer Assembling Model */}
      <div className="relative w-44 h-56 flex flex-col items-center justify-center my-4">
        {/* Soft jade glow */}
        <div className="absolute inset-0 bg-[#88b598]/25 rounded-full blur-2xl animate-pulse" />

        {/* Jade Outline Visual SVG with 7 Fragment Assembly Highlights */}
        <svg viewBox="0 0 100 130" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(200,240,210,0.8)]">
          {/* Base Form / Head */}
          <circle cx="50" cy="18" r="8" fill="#e8f8ec" />
          <path
            d="M48 26 L52 26 L52 36 L48 36 Z"
            fill={unlockedFragments.includes('frag_body_core') ? '#e8f8ec' : '#5c4033'}
          />

          {/* Right Sleeve (Stage 1) */}
          <path
            d="M48 32 C38 24, 25 22, 18 35 C14 42, 22 52, 32 46 C40 42, 46 36, 48 32 Z"
            fill={unlockedFragments.includes('frag_right_sleeve') ? '#cdeacd' : '#3d2b1f'}
            stroke="#e8f8ec"
            strokeWidth="1.5"
            className="transition-colors duration-500"
          />

          {/* Chest Pendant (Stage 2) */}
          <path
            d="M45 36 C45 36, 50 42, 55 36 C55 45, 45 45, 45 36 Z"
            fill={unlockedFragments.includes('frag_chest_pendant') ? '#ffe89c' : '#3d2b1f'}
            stroke="#e6d5b8"
            strokeWidth="1.5"
          />

          {/* Left Sleeve (Stage 3) */}
          <path
            d="M52 32 C62 24, 76 22, 84 34 C88 42, 80 52, 70 46 C62 42, 54 36, 52 32 Z"
            fill={unlockedFragments.includes('frag_left_sleeve') ? '#cdeacd' : '#3d2b1f'}
            stroke="#e8f8ec"
            strokeWidth="1.5"
          />

          {/* Robe Skirt (Stage 4) */}
          <path
            d="M44 58 C38 72, 32 90, 28 115 C42 120, 60 120, 74 115 C70 90, 64 72, 58 58 Z"
            fill={unlockedFragments.includes('frag_robe_skirt') ? '#b8dec0' : '#3d2b1f'}
            stroke="#e8f8ec"
            strokeWidth="1.5"
          />

          {/* Waist (Stage 5) */}
          <path
            d="M46 48 L56 48 L58 58 L44 58 Z"
            fill={unlockedFragments.includes('frag_waist') ? '#cdeacd' : '#3d2b1f'}
            stroke="#e8f8ec"
            strokeWidth="1.5"
          />

          {/* Body Core (Stage 6) */}
          <path
            d="M46 36 L56 36 L56 48 L46 48 Z"
            fill={unlockedFragments.includes('frag_body_core') ? '#e8f8ec' : '#3d2b1f'}
            stroke="#e8f8ec"
            strokeWidth="1.5"
          />

          {/* Head Halo / Crown (Stage 7) */}
          <circle
            cx="50"
            cy="18"
            r="14"
            fill="none"
            stroke={unlockedFragments.includes('frag_head_halo') ? '#ffe89c' : 'rgba(255,232,156,0.3)'}
            strokeWidth="1.5"
            strokeDasharray="4,3"
            className="animate-spin"
          />
        </svg>

        {/* Dynamic Progress Badge */}
        <div className="absolute -bottom-2 bg-[#241a13] border border-[#d2b48c] text-[#ffe89c] text-[10px] px-3 py-0.5 rounded-full shadow-lg font-mono flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#ffe89c]" />
          <span>玉佩合体进度: {Math.min(7, fragmentCount)}/7</span>
        </div>
      </div>

      {/* Transition Title and Atmospheric Text */}
      <div className="max-w-xs space-y-1.5 z-10 mt-2">
        <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-[#d2b48c]/80">
          MEMORY RESONANCE · 历史流转
        </span>
        <h2 className="text-base sm:text-lg font-black text-[#ffe89c] tracking-widest title-drop-shadow">
          {title}
        </h2>
        <p className="text-xs text-[#c2a385] leading-relaxed italic">
          “玉佩光晕流转，唤醒一段沉睡的汉代礼乐记忆……”
        </p>
      </div>
    </div>
  );
};
