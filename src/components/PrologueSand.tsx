import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, QrCode, ArrowRight, Layers } from 'lucide-react';
import { ASSETS } from '../data/museumData';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';

interface PrologueSandProps {
  onStartGlitch: () => void;
  onTrackAction?: (x: number, y: number, act: 'scratch' | 'tap') => void;
}

const DIALOGUES_0A: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '欢迎来到大葆台。我是玉舞人。若你愿意，我带你看看两千年前的人间。',
  },
  {
    speaker: 'player',
    speakerName: '见证者',
    text: '好，我们出发。',
  },
];

export const PrologueSand: React.FC<PrologueSandProps> = ({
  onStartGlitch,
  onTrackAction,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clearedPercent, setClearedPercent] = useState<number>(0);
  const [showDialogue, setShowDialogue] = useState<boolean>(false);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const isScratching = useRef<boolean>(false);

  // Initialize Scratch Sand Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 560);

    // Draw Sand Soil Layer with Granular Texture
    ctx.fillStyle = '#b8946e';
    ctx.fillRect(0, 0, width, height);

    // Sand grains
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = Math.random() > 0.5 ? '#96744f' : '#d8b68e';
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Calligraphic text hint on sand
    ctx.fillStyle = '#6e4f32';
    ctx.font = 'bold 15px "Songti SC", "Noto Serif SC", serif';
    ctx.textAlign = 'center';
    ctx.fillText('—— 拭开千年尘沙 · 唤醒大葆台 ——', width / 2, height / 2 + 130);
    ctx.font = '10px monospace';
    ctx.fillStyle = '#8f6a45';
    ctx.fillText('SCRATCH TO REVEAL HAN JADE DANCER', width / 2, height / 2 + 150);
  }, []);

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

    // Approximate percent check
    setClearedPercent((prev) => {
      const next = Math.min(prev + 3, 100);
      if (next >= 30 && !showDialogue) {
        setShowDialogue(true);
      }
      return next;
    });
  };

  const handleDialogueNext = () => {
    if (dialogueIdx < DIALOGUES_0A.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      // Trigger Scene 0B
      onStartGlitch();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1c130d] text-[#e6d5b8] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Banner with Physical Card Guide */}
      <div className="p-2.5 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-1.5">
          <QrCode className="w-3.5 h-3.5 text-[#ffe89c]" />
          <span className="text-[9px] font-mono tracking-widest text-[#a3805d]">
            EXHIBITION CARD · 序章 0A
          </span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#3d2b1f] text-[#ffe89c] border border-[#5c4033]">
          沙土覆盖 {100 - clearedPercent}%
        </span>
      </div>

      {/* Main Interactive Scratch & Image Brick Stage */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-3">
        {/* Underlying Han Image Brick & Title Content */}
        <div className="relative w-full h-full rounded-3xl bg-[#291b12] border-2 border-[#5c4033] flex flex-col items-center justify-center p-4 overflow-hidden shadow-2xl">
          {/* Subtle Han Wave Pattern Texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#d2b48c 1px, transparent 0)',
              backgroundSize: '14px 14px',
            }}
          />

          {/* Main Title Typography (逐渐显现) */}
          <div className="text-center z-10 space-y-1 mb-4">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#d4a373] uppercase">
              DABAOTAI WESTERN HAN TOMB
            </span>
            <h1 className="text-lg sm:text-xl font-black text-[#ffe89c] tracking-widest leading-tight title-drop-shadow">
              规则怪谈降临大葆台
            </h1>
            <div className="text-xs font-bold text-[#e6d5b8] tracking-widest flex items-center justify-center gap-1.5">
              <span>—— 我有玉舞人通三代 ——</span>
            </div>
            <div className="text-[9px] text-[#a3805d] font-serif pt-1">
              古代记忆 · 现代见证 · 未来守护
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
              className="w-full h-full filter drop-shadow-[0_0_12px_rgba(167,243,208,0.7)] group-hover:scale-105 transition-transform"
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

            <div className="absolute bottom-0 text-[9px] font-mono text-[#a7f3d0] bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
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

      {/* Bottom Guidance or Dialogue System */}
      {showDialogue ? (
        <DialogueSystem
          dialogues={DIALOGUES_0A}
          currentIndex={dialogueIdx}
          onNext={handleDialogueNext}
          restorationLevel={1}
        />
      ) : (
        <div className="p-3 bg-[#18100a] border-t border-[#3d2b1f] text-center z-10 flex items-center justify-between">
          <span className="text-[10px] text-[#a3805d] font-serif">
            用手指在屏幕上擦拭沙土，露出画像砖与玉舞人
          </span>
          <button
            onClick={() => {
              setClearedPercent(100);
              setShowDialogue(true);
            }}
            className="text-[10px] text-[#ffe89c] underline font-mono"
          >
            直接显现
          </button>
        </div>
      )}
    </div>
  );
};
