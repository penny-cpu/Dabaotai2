import React, { useRef, useEffect, useState, useCallback } from 'react';
import { soundFX } from '../utils/soundEngine';
import { ASSETS } from '../data/museumData';
import { Sparkles, RefreshCw, ArrowDown, Hand } from 'lucide-react';

interface Page1Props {
  onNextPage: () => void;
}

export const Page1HomeSand: React.FC<Page1Props> = ({ onNextPage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clearedPercent, setClearedPercent] = useState<number>(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);

  // Initialize Canvas for Sand Scratch Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw Sand Mask Texture
    ctx.fillStyle = '#D6B88D'; // Fine sand base
    ctx.fillRect(0, 0, width, height);

    // Add noise grains to sand
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const grain = (Math.random() - 0.5) * 40;
      data[i] = Math.min(255, Math.max(0, data[i] + grain));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain * 0.9));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain * 0.7));
    }
    ctx.putImageData(imgData, 0, 0);

    // Add initial subtle wind blow effect at top right
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Fine Sand Particle Wind Animation Loop
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0.3 + Math.random() * 0.8,
        vy: -0.1 + Math.random() * 0.3,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#E8D4B5';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0 || p.y > canvas.height) p.y = Math.random() * canvas.height;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Calculate Cleared Percentage
  const updateClearedPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let alphaZero = 0;
      const step = 32; // Sample every 32 pixels for performance
      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 128) {
          alphaZero++;
        }
      }
      const totalSampled = data.length / (4 * step);
      const percent = Math.min(100, Math.round((alphaZero / totalSampled) * 100));
      setClearedPercent(percent);

      if (percent > 45 && !isFullyRevealed) {
        setIsFullyRevealed(true);
        soundFX.playBronzeChime();
      }
    } catch {
      // Ignore
    }
  }, [isFullyRevealed]);

  // Dig Sand Handler
  const handleScratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 38, 0, Math.PI * 2);
    ctx.fill();

    soundFX.playSandScratch();
    if (showHint) setShowHint(false);
    updateClearedPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    handleScratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    handleScratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsScratching(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScratching(true);
    if (e.touches[0]) {
      handleScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching) return;
    if (e.touches[0]) {
      handleScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleClearAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setClearedPercent(100);
    setIsFullyRevealed(true);
    soundFX.playBronzeChime();
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] overflow-hidden flex flex-col justify-between select-none font-serif">
      {/* UNDER LAYER: Revealed Picture + Han Calligraphy Title */}
      <div className="absolute inset-0 z-0 flex flex-col justify-between">
        {/* Under-layer portrait brick relief graphic */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={ASSETS.underLayer}
            alt="大葆台乡野画像石"
            className="w-full h-full object-cover opacity-90 filter sepia-[0.2] contrast-[1.15]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b]/60 via-transparent to-[#1a120b]/95" />

          {/* Slanted "大葆台" Corner Text (Revealed first) */}
          <div className="absolute top-8 right-6 text-right rotate-[-6deg] opacity-90 pointer-events-none">
            <span className="text-2xl font-black text-[#e6d5b8] border-b-2 border-[#d2b48c] pb-0.5 tracking-widest title-drop-shadow">
              大葆台
            </span>
            <p className="text-[10px] text-[#d2b48c] mt-1 font-mono tracking-widest uppercase opacity-70">DIGITAL ARCHAEOLOGY</p>
          </div>

          {/* Main Title Calligraphy "大葆台博物馆" (Revealed when sand is dug) */}
          <div className="absolute inset-x-0 top-1/3 flex flex-col items-center justify-center p-4 text-center z-10 pointer-events-none">
            <div
              className={`transition-all duration-700 transform ${
                isFullyRevealed ? 'scale-100 opacity-100' : 'scale-90 opacity-40'
              }`}
            >
              {/* Bold Typography Theme Box */}
              <div className="border-4 border-[#3d2b1f] bg-[#241a13]/90 p-6 rounded-3xl border-double shadow-2xl backdrop-blur-md max-w-xs ring-1 ring-[#d2b48c]/30">
                <p className="text-[10px] tracking-[0.4em] text-[#d2b48c] uppercase opacity-70 mb-2 font-mono">
                  DIGITAL ARCHAEOLOGY
                </p>
                <h1 className="text-4xl sm:text-5xl font-black text-[#e6d5b8] tracking-[0.2em] leading-none mb-3 title-drop-shadow border-y border-[#3d2b1f] py-3">
                  大葆台
                </h1>
                <div className="h-0.5 w-12 bg-[#d2b48c] mx-auto my-3 opacity-40" />
                <h2 className="text-lg tracking-[0.3em] font-black text-[#d2b48c]">
                  博物馆
                </h2>
                <p className="text-xs text-[#c2a385] mt-2 tracking-wider opacity-80">
                  西汉广阳王陵 · 汉代石刻遗风
                </p>
              </div>

              {/* Calligraphy Seal */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#d2b48c]">
                <div className="w-5 h-5 bg-[#3d2b1f] text-[#e6d5b8] text-[10px] font-serif font-black flex items-center justify-center rounded border border-[#d2b48c]/50">
                  印
                </div>
                <span className="font-serif tracking-widest text-[11px]">西汉金石摹刻</span>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* TOP LAYER: Canvas Scratch Sand Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-pointer touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      />

      {/* Animated Archaeological Site Grainy Noise Texture Filter Layer */}
      <div className="sand-grain-noise z-15 pointer-events-none" />

      {/* Wind Particles Canvas */}
      <canvas ref={particleCanvasRef} className="absolute inset-0 z-20 pointer-events-none opacity-70" />

      {/* Touch Interaction Prompt / Progress Overlay */}
      <div className="relative z-30 p-4 flex items-center justify-between pointer-events-none">
        <div className="bg-[#241a13]/90 border border-[#3d2b1f] px-3 py-1.5 rounded-full text-xs text-[#e6d5b8] flex items-center gap-2 backdrop-blur-md shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#d2b48c] animate-spin" />
          <span className="font-mono text-[11px]">CLEARED: <strong className="text-[#d2b48c]">{clearedPercent}%</strong></span>
        </div>

        <button
          onClick={handleClearAll}
          className="pointer-events-auto bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] text-xs px-3.5 py-1.5 rounded-full border border-[#d2b48c]/50 flex items-center gap-1.5 transition-all active:scale-95 shadow-md font-mono"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#d2b48c]" />
          <span>全刨开</span>
        </button>
      </div>

      {/* Scratch Finger Hint */}
      {showHint && clearedPercent < 15 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce">
          <div className="w-12 h-12 rounded-full bg-[#3d2b1f]/90 text-[#e6d5b8] border-2 border-[#d2b48c] flex items-center justify-center shadow-2xl">
            <Hand className="w-6 h-6 text-[#d2b48c]" />
          </div>
          <span className="mt-2 bg-[#241a13]/95 border border-[#3d2b1f] text-[#e6d5b8] text-xs px-3 py-1 rounded-full font-serif shadow-lg tracking-wider">
            手指/鼠标滑动刨开沙石
          </span>
        </div>
      )}

      {/* Bottom Floating Navigation Action */}
      <div className="relative z-30 p-4 flex justify-center">
        <button
          onClick={onNextPage}
          className={`w-full py-3 px-6 rounded-2xl text-xs font-serif font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border shadow-2xl ${
            isFullyRevealed
              ? 'bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] border-[#d2b48c] animate-pulse cursor-pointer'
              : 'bg-[#241a13]/90 text-[#c2a385] border-[#3d2b1f] hover:bg-[#2c1d12]'
          }`}
        >
          <span>滑动进入第二页：墓葬剖面</span>
          <ArrowDown className="w-4 h-4 text-[#d2b48c]" />
        </button>
      </div>
    </div>
  );
};
