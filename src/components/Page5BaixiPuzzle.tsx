import React, { useState, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Flame, Sparkles, CheckCircle2, Play, ChevronRight } from 'lucide-react';

interface Page5BaixiPuzzleProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const OPTIONS = [
  { id: 'opt_a', text: '“五千四百”更大', isCorrect: false },
  { id: 'opt_b', text: '“五千又四百”更大', isCorrect: false },
  { id: 'opt_c', text: '“两个数一样” (汉代算筹记数中“又”表示“加”)', isCorrect: true },
];

export const Page5BaixiPuzzle: React.FC<Page5BaixiPuzzleProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [candlePos, setCandlePos] = useState<{ x: number; y: number }>({ x: 180, y: 160 });
  const [isExaminingJuggler, setIsExaminingJuggler] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const muralContainerRef = useRef<HTMLDivElement | null>(null);

  // Drag Candle Light
  const updateCandlePos = (clientX: number, clientY: number) => {
    if (!muralContainerRef.current) return;
    const rect = muralContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setCandlePos({
      x: Math.max(20, Math.min(rect.width - 20, x)),
      y: Math.max(20, Math.min(rect.height - 20, y)),
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updateCandlePos(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateCandlePos(e.clientX, e.clientY);
  };

  // Check if candle is near the Juggler spot (center-right area: x ~ 150-250, y ~ 120-220)
  const isNearJuggler =
    Math.abs(candlePos.x - 200) < 90 && Math.abs(candlePos.y - 170) < 80;

  const handleSelectOption = (id: string) => {
    soundFX.playStoneDrum();
    setSelectedOption(id);
    const opt = OPTIONS.find((o) => o.id === id);

    if (opt?.isCorrect) {
      soundFX.playBronzeChime();
      setIsSuccess(true);
      onUnlockFragment();
      // Auto transition to Chapter 5
      setTimeout(() => {
        onNextPage();
      }, 1600);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#140b07] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Header */}
      <div className="p-2.5 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
              CHANGLE WEIYANG · PART 2
            </span>
            <h2 className="text-xs sm:text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              第四章 · 百戏 (烛光壁画与跳丸算术)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9px] text-[#ffe89c] bg-[#3d2b1f] px-2 py-0.5 rounded-full border border-[#5c4033] font-mono">
          <Sparkles className="w-2.5 h-2.5" />
          <span>执烛探幽</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-2">
        {/* Interactive Candle Mural Viewport */}
        <div
          ref={muralContainerRef}
          onTouchMove={handleTouchMove}
          onMouseMove={handleMouseMove}
          className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-[#3d2b1f] shadow-2xl bg-[#080402] cursor-crosshair touch-none"
        >
          {/* Mural Background Content (Han Dynasty Baixi Juggling, Stilts, Feast) */}
          <div className="absolute inset-0 bg-[#29170e]">
            {/* Ancient Brick Wall Texture & Drawings */}
            <svg viewBox="0 0 400 240" className="w-full h-full opacity-90">
              {/* Banquet Tent & Columns */}
              <rect x="20" y="20" width="360" height="200" fill="none" stroke="#73472c" strokeWidth="2" />
              <line x1="20" y1="60" x2="380" y2="60" stroke="#73472c" strokeWidth="1" />

              {/* Juggler with 7 Balls (俳优跳丸) at (200, 160) */}
              <g transform="translate(190, 120)">
                <ellipse cx="20" cy="18" rx="8" ry="10" fill="#a86d48" />
                <path d="M12 28 L28 28 L32 65 L8 65 Z" fill="#8f5734" />
                <line x1="8" y1="35" x2="-6" y2="25" stroke="#a86d48" strokeWidth="3" />
                <line x1="32" y1="35" x2="46" y2="25" stroke="#a86d48" strokeWidth="3" />
                {/* 7 Juggling Balls */}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                  const angle = (i * Math.PI * 2) / 7;
                  const bx = 20 + Math.cos(angle) * 35;
                  const by = -5 + Math.sin(angle) * 20;
                  return (
                    <circle
                      key={i}
                      cx={bx}
                      cy={by}
                      r="4"
                      fill="#ffe89c"
                      stroke="#8c3d23"
                      strokeWidth="1"
                    />
                  );
                })}
              </g>

              {/* Stilt Walker on Left (40, 130) */}
              <g transform="translate(45, 110)">
                <circle cx="15" cy="15" r="7" fill="#7d4e33" />
                <line x1="15" y1="22" x2="15" y2="60" stroke="#7d4e33" strokeWidth="3" />
                <line x1="10" y1="50" x2="10" y2="100" stroke="#a86d48" strokeWidth="3" />
                <line x1="20" y1="50" x2="20" y2="100" stroke="#a86d48" strokeWidth="3" />
              </g>

              {/* Platter Dancer on Right (310, 130) */}
              <g transform="translate(300, 115)">
                <circle cx="20" cy="16" r="7" fill="#7d4e33" />
                <path d="M10 24 Q20 35 30 24" stroke="#c2a385" strokeWidth="3" fill="none" />
                <ellipse cx="20" cy="80" rx="18" ry="4" fill="#a86d48" />
              </g>
            </svg>
          </div>

          {/* Dark Shadow Mask with Candle Light Hole (Requirement 7) */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-75"
            style={{
              background: `radial-gradient(circle 80px at ${candlePos.x}px ${candlePos.y}px, rgba(255, 230, 160, 0.15) 0%, rgba(20, 10, 5, 0.75) 65%, rgba(10, 5, 2, 0.96) 100%)`,
            }}
          />

          {/* Candle Flame Cursor Icon */}
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: candlePos.x, top: candlePos.y }}
          >
            <div className="w-5 h-5 rounded-full bg-amber-400/40 blur-sm animate-ping" />
            <Flame className="w-6 h-6 text-amber-300 -mt-5 filter drop-shadow-[0_0_8px_rgba(255,200,80,0.9)] animate-pulse" />
          </div>

          {/* Discovered Juggler Interactive Tooltip Button */}
          {isNearJuggler && (
            <div
              onClick={() => {
                soundFX.playStoneDrum();
                setIsExaminingJuggler(true);
              }}
              className="absolute top-12 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer bg-[#241a13]/95 border-2 border-[#ffe89c] text-[#ffe89c] text-[10px] px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-1.5 animate-bounce font-serif"
            >
              <Play className="w-3 h-3 text-[#ffe89c]" />
              <span>照见俳优跳丸 · 双击观看并解谜</span>
            </div>
          )}
        </div>

        {/* Juggling Arithmetic Puzzle Area */}
        <div className="w-full bg-[#241a13] border-2 border-[#3d2b1f] rounded-2xl p-3 shadow-xl space-y-2 mt-2">
          <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1">
            <span className="text-xs font-black text-[#e6d5b8] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ffe89c]" />
              俳优算术：“五千四百”与“五千又四百”谁大？
            </span>
          </div>

          <div className="space-y-1.5">
            {OPTIONS.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-[#1f2d24] border-[#88b598] shadow-lg'
                        : 'bg-[#2d1b1b] border-[#a34a4a]'
                      : 'bg-[#1a120b] border-[#3d2b1f] hover:border-[#5c4033]'
                  }`}
                >
                  <span className="text-[11px] font-black text-[#e6d5b8]">{opt.text}</span>
                  {isSelected && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-[#88b598]" />
                  )}
                </div>
              );
            })}
          </div>

          {isSuccess && (
            <div className="p-2 bg-[#1f2d24] border border-[#88b598] rounded-xl text-[10px] text-[#e8f8ec] italic font-serif">
              玉舞人：“算筹之妙，以‘又’为加。七丸飞旋，百戏娱民。即将进入第五章……”
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
