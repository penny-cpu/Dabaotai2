import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, Star } from 'lucide-react';

interface Page8AscensionStarPuzzleProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const FOUR_SYMBOLS = [
  { id: 'qinglong', name: '东方青龙', color: '#68d391', dance: '龙腾舞云', pos: 'left-6 top-10' },
  { id: 'baihu', name: '西方白虎', color: '#f6ad55', dance: '虎跃生风', pos: 'right-6 top-10' },
  { id: 'zhuque', name: '南方朱雀', color: '#fc8181', dance: '凤舞九天', pos: 'left-6 bottom-10' },
  { id: 'xuanwu', name: '北方玄武', color: '#63b3ed', dance: '玄龟驭水', pos: 'right-6 bottom-10' },
];

const PHILOSOPHY_OPTIONS = [
  {
    id: 'opt_a',
    text: 'A. 星象图纯为装饰，盘鼓舞只是助兴娱神',
    isCorrect: false,
  },
  {
    id: 'opt_b',
    text: 'B. 穹顶星象指引升仙，盘鼓一足敬地一足通天，二者皆践行“事死如事生”',
    isCorrect: true,
  },
  {
    id: 'opt_c',
    text: 'C. 仅天子可踏七盘之舞，诸侯王不得僭越',
    isCorrect: false,
  },
];

export const Page8AscensionStarPuzzle: React.FC<Page8AscensionStarPuzzleProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [activatedSymbols, setActivatedSymbols] = useState<string[]>(['qinglong', 'baihu']);
  const [selectedPhilosophy, setSelectedPhilosophy] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const handleActivateSymbol = (id: string) => {
    soundFX.playStoneDrum();
    if (!activatedSymbols.includes(id)) {
      const next = [...activatedSymbols, id];
      setActivatedSymbols(next);
      if (next.length === 4) {
        soundFX.playBronzeChime();
      }
    }
  };

  const handleSelectPhilosophy = (id: string) => {
    soundFX.playStoneDrum();
    setSelectedPhilosophy(id);
    const opt = PHILOSOPHY_OPTIONS.find((o) => o.id === id);

    if (opt?.isCorrect) {
      soundFX.playBronzeChime();
      setIsSuccess(true);
      onUnlockFragment();
      // Auto transition to Epilogue after 1.8s
      setTimeout(() => {
        onNextPage();
      }, 1800);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#070b16] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Header */}
      <div className="p-2.5 bg-[#101828]/90 border-b border-[#1e293b] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#7a9bb8] font-mono">
            TICOU LICANG · PART 3
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#e6f1ff] tracking-widest title-drop-shadow">
            第七章 · 魂归 (星空极光与北斗星路)
          </h2>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-mono bg-[#1b2a47] px-2 py-0.5 rounded-full border border-[#3b5585] text-[#ffe89c]">
          <Star className="w-2.5 h-2.5 animate-spin" />
          <span>四象 {activatedSymbols.length}/4</span>
        </div>
      </div>

      {/* Main Celestial Aurora Stage (Requirement 9) */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-2">
        {/* Dynamic Starry Aurora Sky Canvas Container */}
        <div className="relative w-full h-52 rounded-2xl bg-[#040711] border-2 border-[#1e293b] overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Flowing Aurora Waves */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-emerald-800/20 to-teal-700/30 animate-pulse pointer-events-none" />
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#63b3ed 1.2px, transparent 0)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Central Dipper Constellation */}
          <svg viewBox="0 0 300 160" className="w-full h-full z-10">
            <polyline
              points="40,50 90,45 130,70 170,75 210,50 250,60 270,110 220,120 170,75"
              fill="none"
              stroke="#ffe89c"
              strokeWidth="2.5"
              strokeDasharray="4,4"
              className="animate-pulse opacity-90"
            />
            {[
              [40, 50],
              [90, 45],
              [130, 70],
              [170, 75],
              [210, 50],
              [250, 60],
              [270, 110],
              [220, 120],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#e8f8ec" stroke="#ffe89c" strokeWidth="2" />
            ))}
          </svg>

          {/* Four Beast Stars */}
          {FOUR_SYMBOLS.map((s) => {
            const isAct = activatedSymbols.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleActivateSymbol(s.id)}
                className={`absolute ${s.pos} z-20 px-2 py-0.5 rounded-full text-[9px] font-serif font-black border transition-all flex items-center gap-1 shadow-lg ${
                  isAct
                    ? 'bg-[#1b2a47] border-[#ffe89c] text-[#ffe89c] shadow-[0_0_10px_rgba(255,232,156,0.6)] scale-105'
                    : 'bg-[#0b101c]/80 border-[#233554] text-[#7a9bb8]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span>{s.name}</span>
              </button>
            );
          })}

          {/* Center Glowing Jade Dancer Figure */}
          <div className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 100 120" className="w-24 h-28 opacity-80 filter drop-shadow-[0_0_14px_rgba(200,250,220,0.8)]">
              <path
                d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                fill="none"
                stroke="#e8f8ec"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="14" r="7" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Philosophy Riddle Question */}
        <div className="w-full bg-[#101828] border-2 border-[#1e293b] rounded-2xl p-3 shadow-xl space-y-2 mt-2">
          <div className="border-b border-[#1e293b] pb-1">
            <h3 className="text-xs font-black text-[#e6f1ff] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ffe89c]" />
              终极解谜：汉代墓室穹顶星图与盘鼓舞共同的秘密？
            </h3>
          </div>

          <div className="space-y-1.5">
            {PHILOSOPHY_OPTIONS.map((opt) => {
              const isSelected = selectedPhilosophy === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectPhilosophy(opt.id)}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-[#1a382b] border-[#68d391] shadow-lg'
                        : 'bg-[#3b1d1d] border-[#fc8181]'
                      : 'bg-[#090d16] border-[#1e293b] hover:border-[#3b5585]'
                  }`}
                >
                  <span className="text-[11px] font-serif text-[#e6f1ff] leading-relaxed">
                    {opt.text}
                  </span>
                  {isSelected && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-[#68d391] shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

          {isSuccess && (
            <div className="p-2 bg-[#1a382b] border border-[#68d391] rounded-xl text-[10px] text-[#e8f8ec] italic font-serif">
              玉舞人：“天人合一，星路贯通。七块玉片全部圆满归一，即将进入尾声……”
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
