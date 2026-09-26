import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, ChevronDown, ChevronUp, Sun, Wind, Volume2, Compass, ArrowDown } from 'lucide-react';
import { ASSETS } from '../data/museumData';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';

interface PrologueSandProps {
  onStartGlitch: () => void;
  onOpenMap?: () => void;
  onTrackAction?: (x: number, y: number, act: 'scratch' | 'tap') => void;
}

const DIALOGUES_0A: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我是玉舞人。随我一同探访两千年前的人间。',
  },
  {
    speaker: 'player',
    speakerName: '见证者 (你)',
    text: '好，我们出发。',
  },
];

export const PrologueSand: React.FC<PrologueSandProps> = ({
  onStartGlitch,
  onOpenMap,
  onTrackAction,
}) => {
  const [currentLayer, setCurrentLayer] = useState<'surface' | 'underground'>('surface');
  const [clearedPercent, setClearedPercent] = useState<number>(0);
  const [showDialogue, setShowDialogue] = useState<boolean>(false);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [isPlayingAmbience, setIsPlayingAmbience] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScratching = useRef<boolean>(false);
  const touchStartY = useRef<number>(0);

  // Play peaceful surface nature sound
  const handleTriggerNatureSound = () => {
    soundFX.playBirdChirp();
    setTimeout(() => soundFX.playWindLeaves(), 300);
    setIsPlayingAmbience(true);
  };

  // Transition to underground sand layer
  const handleGoToUnderground = () => {
    soundFX.playWindLeaves();
    soundFX.playStoneDrum();
    setCurrentLayer('underground');
  };

  // Transition back to surface museum
  const handleGoToSurface = () => {
    soundFX.playStoneDrum();
    setCurrentLayer('surface');
  };

  // Touch gesture handling for smooth vertical swiping between surface and underground
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0]) {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (deltaY < -45 && currentLayer === 'surface') {
        // Swiped up -> go underground
        handleGoToUnderground();
      } else if (deltaY > 60 && currentLayer === 'underground' && clearedPercent < 20) {
        // Swiped down while at top of underground -> go back to surface
        handleGoToSurface();
      }
    }
  };

  // Initialize Scratch Sand Canvas when entering underground layer
  useEffect(() => {
    if (currentLayer !== 'underground') return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = (canvas.width = canvas.parentElement?.clientWidth || 360);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 560);

      // Draw Sand Soil Layer with Granular Texture
      ctx.fillStyle = '#b8946e';
      ctx.fillRect(0, 0, width, height);

      // Sand grains texture
      for (let i = 0; i < 3500; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillStyle = Math.random() > 0.5 ? '#96744f' : '#d8b68e';
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      // Calligraphic text hint on sand
      ctx.fillStyle = '#5c3e23';
      ctx.font = 'bold 15px "Songti SC", "Noto Serif SC", serif';
      ctx.textAlign = 'center';
      ctx.fillText('—— 拭开千年尘沙 · 唤醒大葆台 ——', width / 2, height / 2 + 130);
      ctx.font = '10px monospace';
      ctx.fillStyle = '#7a5538';
      ctx.fillText('SCRATCH TO REVEAL HAN JADE DANCER', width / 2, height / 2 + 150);
    }, 50);

    return () => clearTimeout(timer);
  }, [currentLayer]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 42, 0, Math.PI * 2);
    ctx.fill();

    soundFX.playSandScratch();
    if (onTrackAction) onTrackAction(clientX, clientY, 'scratch');

    setClearedPercent((prev) => {
      const next = Math.min(prev + 4, 100);
      if (next >= 28 && !showDialogue) {
        setShowDialogue(true);
      }
      return next;
    });
  };

  const handleDialogueNext = () => {
    if (dialogueIdx < DIALOGUES_0A.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      onStartGlitch();
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full bg-[#0d0906] text-[#e6d5b8] flex flex-col justify-between overflow-hidden font-serif select-none"
    >
      {/* ===================== VIEW 1: MODERN SURFACE MUSEUM EXTERIOR ===================== */}
      {currentLayer === 'surface' && (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden animate-fade-in">
          {/* Background Real Museum Exterior Picture with Warm Sunlight */}
          <div className="absolute inset-0 z-0">
            <img
              src={ASSETS.museumExterior}
              alt="北京大葆台西汉墓博物馆现代外景"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-[1.03]"
              referrerPolicy="no-referrer"
            />
            {/* Warm Sunlight & Golden Morning Tone Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-transparent to-black/75 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/25 rounded-full blur-3xl animate-sunlight pointer-events-none" />
          </div>

          {/* Wind Effect: Floating & Fluttering Leaves */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {/* Leaf 1 */}
            <div className="absolute top-12 left-4 animate-leaf-1">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-600/80 drop-shadow-md">
                <path d="M17 8C8 10 5 16 3 21C8 20 14 17 17 8Z" />
                <path d="M7 17L17 8" stroke="#a7f3d0" strokeWidth="1" />
              </svg>
            </div>
            {/* Leaf 2 */}
            <div className="absolute top-24 left-10 animate-leaf-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-amber-500/85 drop-shadow-md">
                <path d="M19 6C10 8 7 14 4 19C9 18 16 15 19 6Z" />
                <path d="M8 15L19 6" stroke="#fef08a" strokeWidth="1" />
              </svg>
            </div>
            {/* Leaf 3 */}
            <div className="absolute top-4 right-16 animate-leaf-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-lime-600/75 drop-shadow-md">
                <path d="M21 5C11 7 8 13 5 18C10 17 18 14 21 5Z" />
                <path d="M9 14L21 5" stroke="#bbf7d0" strokeWidth="1" />
              </svg>
            </div>

            {/* Flying Birds Across the Sky Animation */}
            <div className="absolute top-10 left-0 animate-bird-1">
              <svg viewBox="0 0 40 20" className="w-8 h-4 fill-black/60 drop-shadow-sm">
                <path d="M0 10 Q10 0 20 10 Q30 0 40 10 Q30 6 20 12 Q10 6 0 10 Z" />
              </svg>
            </div>
            <div className="absolute top-20 left-0 animate-bird-2">
              <svg viewBox="0 0 40 20" className="w-6 h-3 fill-black/50 drop-shadow-sm">
                <path d="M0 10 Q10 0 20 10 Q30 0 40 10 Q30 6 20 12 Q10 6 0 10 Z" />
              </svg>
            </div>
          </div>

          {/* Top Floating Badge & Nature Audio Button */}
          <div className="relative z-20 p-3.5 flex items-center justify-between">
            <div className="bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/40 shadow-lg flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '20s' }} />
              <span className="text-[10px] font-mono tracking-wider text-amber-200">
                现代北京大葆台博物馆 · 外景
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleTriggerNatureSound}
                className="bg-black/60 hover:bg-black/80 backdrop-blur-md p-2 rounded-full border border-amber-400/50 text-amber-300 shadow-lg active:scale-95 transition-all flex items-center gap-1 text-[10px]"
                title="播放鸟鸣与风吹树叶声"
              >
                <Wind className="w-3.5 h-3.5" />
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-serif text-[10px]">听鸟鸣风声</span>
              </button>

              {onOpenMap && (
                <button
                  onClick={onOpenMap}
                  className="bg-[#291b12]/90 hover:bg-[#3d2b1f] backdrop-blur-md px-2.5 py-1.5 rounded-full border border-amber-500/60 text-[#ffe89c] shadow-lg active:scale-95 transition-all flex items-center gap-1 text-[10px] font-bold"
                  title="打开地图目录"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-300" />
                  <span>地图目录</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Ground Surface Title Card */}
          <div className="relative z-20 px-4 text-center space-y-2 mt-auto mb-2">
            <div className="bg-black/65 backdrop-blur-md p-4 rounded-3xl border border-amber-500/50 shadow-2xl space-y-1.5">
              <div className="text-[9px] font-mono tracking-[0.25em] text-amber-300 uppercase">
                BEIJING DABAOTAI WESTERN HAN DYNASTY TOMB
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#ffe89c] tracking-widest leading-tight title-drop-shadow">
                规则怪谈降临大葆台
              </h1>
              <div className="text-xs font-bold text-[#e6d5b8] tracking-widest">
                —— 我有玉舞人通三代 ——
              </div>
              <p className="text-[10px] text-amber-100/80 pt-1 leading-relaxed">
                暖阳微风，鸟鸣花香。两千年前的西汉王陵正沉睡于脚下。
              </p>
            </div>

            {/* Slide Down Prompt Button */}
            <button
              onClick={handleGoToUnderground}
              className="w-full py-3.5 bg-gradient-to-r from-amber-700 via-[#5c3e23] to-amber-800 hover:from-amber-600 hover:to-amber-700 text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-amber-400 text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-98 transition-all flex flex-col items-center justify-center gap-0.5 animate-pulse"
            >
              <div className="flex items-center gap-1.5 text-sm">
                <span>往下滑动 · 进入地下王陵【风吹沙】</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </div>
              <span className="text-[9px] font-mono text-amber-200/90 font-normal">
                SWIPE DOWN OR CLICK TO ENTER TOMB
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ===================== VIEW 2: UNDERGROUND TOMB "风吹沙" SCRATCH SCENE ===================== */}
      {currentLayer === 'underground' && (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden animate-fade-in">
          {/* Top Bar with Return to Surface Button & Map Directory Trigger */}
          <div className="p-2.5 bg-[#20150e] border-b border-[#3d2b1f] flex items-center justify-between z-30 shadow-md">
            <button
              onClick={handleGoToSurface}
              className="px-2.5 py-1 rounded-full bg-[#2c1d12] hover:bg-[#3d2b1f] text-[#ffe89c] text-[10px] border border-amber-700/60 shadow flex items-center gap-1 active:scale-95"
              title="返回现代博物馆地面外景"
            >
              <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
              <span>回到地面外景</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#3d2b1f] text-[#ffe89c] border border-[#5c4033]">
                沙土覆盖 {100 - clearedPercent}%
              </span>

              {onOpenMap && (
                <button
                  onClick={onOpenMap}
                  className="px-2.5 py-1 rounded-full bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] text-[10px] border border-amber-600 shadow flex items-center gap-1 active:scale-95 font-bold"
                >
                  <Compass className="w-3 h-3 text-amber-300" />
                  <span>地图目录</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Interactive Scratch & Image Brick Stage */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center p-3">
            {/* Underlying Han Image Brick & Title Content */}
            <div className="relative w-full h-full rounded-3xl bg-[#24170d] border-2 border-[#5c4033] flex flex-col items-center justify-center p-4 overflow-hidden shadow-2xl">
              {/* Subtle Han Wave Pattern Texture */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#d2b48c 1px, transparent 0)',
                  backgroundSize: '14px 14px',
                }}
              />

              {/* Title Header */}
              <div className="text-center z-10 space-y-1 mb-3">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#d4a373] uppercase">
                  DABAOTAI WESTERN HAN TOMB
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#ffe89c] tracking-widest leading-tight title-drop-shadow">
                  地下王陵 · 风吹沙
                </h2>
                <div className="text-[11px] font-bold text-[#e6d5b8] tracking-widest">
                  —— 汉韵玉舞人苏醒 ——
                </div>
              </div>

              {/* Central Glowing Jade Dancer Line Art */}
              <div
                onClick={() => {
                  soundFX.playBronzeChime();
                  setShowDialogue(true);
                }}
                className="relative w-36 h-48 cursor-pointer z-10 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-radial-gradient from-emerald-500/20 via-transparent to-transparent animate-pulse rounded-full" />
                <svg
                  viewBox="0 0 100 120"
                  className="w-full h-full filter drop-shadow-[0_0_12px_rgba(167,243,208,0.75)] group-hover:scale-105 transition-transform"
                >
                  <defs>
                    <linearGradient id="prologueJade" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#cdeacd" />
                      <stop offset="100%" stopColor="#88b598" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                    fill="none"
                    stroke="url(#prologueJade)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="50" cy="14" r="7" fill="#ffffff" />
                </svg>

                <div className="absolute bottom-0 text-[9px] font-mono text-[#a7f3d0] bg-black/70 px-2 py-0.5 rounded-full border border-emerald-500/50">
                  点触玉舞人线稿
                </div>
              </div>
            </div>

            {/* Scratchable Sand Canvas Overlay */}
            <canvas
              ref={canvasRef}
              onMouseDown={(e) => {
                isScratching.current = true;
                scratchAt(e.clientX, e.clientY);
              }}
              onMouseMove={(e) => {
                if (isScratching.current) scratchAt(e.clientX, e.clientY);
              }}
              onMouseUp={() => {
                isScratching.current = false;
              }}
              onTouchStart={(e) => {
                isScratching.current = true;
                if (e.touches[0]) scratchAt(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchMove={(e) => {
                if (isScratching.current && e.touches[0]) {
                  scratchAt(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchEnd={() => {
                isScratching.current = false;
              }}
              className={`absolute inset-3 rounded-3xl cursor-grab active:cursor-grabbing z-20 transition-opacity duration-700 ${
                clearedPercent >= 80 ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            />
          </div>

          {/* Bottom Guidance or Story Dialogue */}
          {showDialogue ? (
            <DialogueSystem
              dialogues={DIALOGUES_0A}
              currentIndex={dialogueIdx}
              onNext={handleDialogueNext}
              restorationLevel={1}
            />
          ) : (
            <div className="p-3 bg-[#18100a] border-t border-[#3d2b1f] text-center z-20 flex items-center justify-between">
              <span className="text-[10px] text-[#a3805d] font-serif">
                用手指在屏幕上擦拭沙土，拭出画像砖与玉舞人
              </span>
              <button
                onClick={() => {
                  setClearedPercent(100);
                  setShowDialogue(true);
                }}
                className="text-[10px] text-[#ffe89c] underline font-mono active:scale-95"
              >
                直接显现
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
