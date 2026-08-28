import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, AlertOctagon } from 'lucide-react';

interface PrologueGlitchProps {
  onComplete: () => void;
}

export const PrologueGlitch: React.FC<PrologueGlitchProps> = ({ onComplete }) => {
  const [glitchPhase, setGlitchPhase] = useState<'loading' | 'glitch' | 'shatter' | 'blackout'>('loading');

  useEffect(() => {
    // Sequence timing
    const t1 = setTimeout(() => {
      setGlitchPhase('glitch');
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
    }, 1200);

    const t2 = setTimeout(() => {
      setGlitchPhase('shatter');
      soundFX.playStoneDrum();
    }, 2800);

    const t3 = setTimeout(() => {
      setGlitchPhase('blackout');
    }, 4500);

    const t4 = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="relative w-full h-full bg-[#0d0906] text-[#e6d5b8] flex flex-col items-center justify-center overflow-hidden font-serif select-none">
      {/* Normal Simulated Guide Header */}
      {glitchPhase === 'loading' && (
        <div className="absolute top-10 inset-x-6 bg-[#241a13] border border-[#5c4033] p-4 rounded-2xl text-center space-y-2 animate-fade-in shadow-2xl">
          <div className="text-[10px] font-mono text-[#a3805d]">DABAOTAI OFFICIAL GUIDE</div>
          <div className="text-sm font-black text-[#ffe89c]">北京大葆台西汉墓数字导览正在载入...</div>
          <div className="w-full bg-[#140e0a] h-1.5 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-[#88b598] animate-pulse" />
          </div>
        </div>
      )}

      {/* Glitch TV Noise / Garbled text phase */}
      {(glitchPhase === 'glitch' || glitchPhase === 'shatter') && (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center">
          {/* TV Snow Lines */}
          <div
            className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none animate-pulse"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 4px)`,
              backgroundSize: '100% 4px',
            }}
          />

          {/* Garbled Bug Corruption Characters */}
          <div className="text-red-500 font-mono text-xs opacity-80 select-none space-y-1 text-center font-black">
            <div>█▓▒░ CORRUPTION_INSECT_DETECTED ░▒▓█</div>
            <div>[ERR_MEMORY_EATEN: 0x7A_9F_DABAOTAI_TOMB]</div>
            <div>墓 葬 结 构 被 啃 噬 · 时 空 轴 偏 转 1 0 0 0 年</div>
            <div className="text-amber-400">████ 记忆丢失 7/7 ████</div>
          </div>
        </div>
      )}

      {/* Central Jade Dancer Falling and Shattering */}
      <div className="relative w-48 h-64 flex items-center justify-center">
        {glitchPhase === 'shatter' ? (
          // 7 Shattered flying fragments
          <div className="relative w-full h-full">
            {[
              { x: '-translate-x-16 -translate-y-20', label: '右袖', rot: 'rotate-45' },
              { x: 'translate-x-16 -translate-y-16', label: '胸佩', rot: '-rotate-30' },
              { x: '-translate-x-20 translate-y-4', label: '左袖', rot: 'rotate-90' },
              { x: 'translate-x-20 translate-y-8', label: '衣摆', rot: '-rotate-60' },
              { x: '-translate-x-10 translate-y-24', label: '腰身', rot: 'rotate-12' },
              { x: 'translate-x-12 translate-y-24', label: '主体', rot: '-rotate-45' },
              { x: 'translate-x-0 -translate-y-28', label: '首光', rot: 'rotate-180' },
            ].map((f, i) => (
              <div
                key={i}
                className={`absolute left-1/2 top-1/2 -ml-4 -mt-4 w-8 h-8 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-[8px] text-emerald-200 font-mono font-bold shadow-[0_0_12px_#34d399] transition-all duration-1000 ${f.x} ${f.rot}`}
              >
                {f.label}
              </div>
            ))}
          </div>
        ) : (
          <svg
            viewBox="0 0 100 120"
            className={`w-full h-full transition-all duration-700 ${
              glitchPhase === 'glitch'
                ? 'filter drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] scale-110 translate-y-4'
                : 'filter drop-shadow-[0_0_10px_rgba(167,243,208,0.7)]'
            }`}
          >
            <path
              d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
              fill="none"
              stroke={glitchPhase === 'glitch' ? '#ef4444' : '#a7f3d0'}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <circle cx="50" cy="14" r="7" fill={glitchPhase === 'glitch' ? '#ef4444' : '#ffffff'} />
          </svg>
        )}
      </div>

      {/* Subtitle Line */}
      <div className="absolute bottom-12 inset-x-6 text-center z-40">
        <div className="bg-black/90 border border-red-500/60 p-3 rounded-2xl shadow-2xl backdrop-blur-md">
          <p className="text-xs text-red-200 font-serif italic tracking-wider animate-pulse">
            玉舞人：“等等……这不是我记得的路。”
          </p>
        </div>
      </div>
    </div>
  );
};
