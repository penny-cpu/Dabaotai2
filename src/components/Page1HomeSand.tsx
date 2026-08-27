import React, { useRef, useEffect, useState, useCallback } from 'react';
import { soundFX } from '../utils/soundEngine';
import { ASSETS } from '../data/museumData';
import { Sparkles, RefreshCw, Hand, Compass, ChevronDown, Sun } from 'lucide-react';

interface Page1Props {
  onNextPage: () => void;
  onOpenMap?: () => void;
  onTrackAction?: (x: number, y: number, action: 'tap' | 'scratch') => void;
}

export const Page1HomeSand: React.FC<Page1Props> = ({ onNextPage, onOpenMap, onTrackAction }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clearedPercent, setClearedPercent] = useState<number>(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [viewState, setViewState] = useState<'above_ground' | 'under_ground'>('above_ground');
  const [birdChirpPlayed, setBirdChirpPlayed] = useState<boolean>(false);

  // Play gentle ambient nature sounds on above ground view
  useEffect(() => {
    if (viewState === 'above_ground') {
      soundFX.playWindLeaves();
      const birdTimer = setTimeout(() => {
        soundFX.playBirdChirp();
        setBirdChirpPlayed(true);
      }, 800);
      return () => clearTimeout(birdTimer);
    }
  }, [viewState]);

  // Initialize Canvas for Sand Mask when entering underground
  useEffect(() => {
    if (viewState !== 'under_ground') return;
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

    // Ancient Sand Texture Mask
    ctx.fillStyle = '#D6B88D';
    ctx.fillRect(0, 0, width, height);

    // Grain Noise
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const grain = (Math.random() - 0.5) * 35;
      data[i] = Math.min(255, Math.max(0, data[i] + grain));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain * 0.9));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain * 0.7));
    }
    ctx.putImageData(imgData, 0, 0);

    // Slit blow on top right
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, [viewState]);

  // Sand Particles Wind Animation
  useEffect(() => {
    if (viewState !== 'under_ground') return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0.4 + Math.random() * 0.6,
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
  }, [viewState]);

  // Auto dispersion when user clears >38%
  const autoDisperseSand = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsFullyRevealed(true);
    soundFX.playBronzeChime();

    let currentAlpha = 1.0;
    const fadeTimer = setInterval(() => {
      currentAlpha -= 0.1;
      if (currentAlpha <= 0) {
        clearInterval(fadeTimer);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setClearedPercent(100);
        // Automatically open Map Directory or next page after 1.2s delay
        setTimeout(() => {
          if (onOpenMap) {
            onOpenMap();
          } else {
            onNextPage();
          }
        }, 1200);
      } else {
        ctx.globalAlpha = currentAlpha;
      }
    }, 40);
  }, [onNextPage, onOpenMap]);

  // Update cleared percentage
  const updateClearedPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let alphaZero = 0;
      const step = 32;
      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 128) {
          alphaZero++;
        }
      }
      const totalSampled = data.length / (4 * step);
      const percent = Math.min(100, Math.round((alphaZero / totalSampled) * 100));
      setClearedPercent(percent);

      if (percent >= 38 && !isFullyRevealed) {
        autoDisperseSand();
      }
    } catch {
      // Ignore
    }
  }, [isFullyRevealed, autoDisperseSand]);

  // Scratch Action
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
    ctx.arc(x, y, 42, 0, Math.PI * 2);
    ctx.fill();

    soundFX.playSandScratch();
    if (showHint) setShowHint(false);
    if (onTrackAction) onTrackAction(x, y, 'scratch');
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
    autoDisperseSand();
  };

  // Switch to underground sand mode
  const handleDescendUnderground = () => {
    soundFX.playStoneDrum();
    setViewState('under_ground');
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] overflow-hidden flex flex-col justify-between select-none font-serif">
      {/* Top-Left "回首页 / 地图目录" icon (Requirement 1 & 2) */}
      <div className="absolute top-2 left-2 z-40 flex items-center gap-1.5">
        <button
          onClick={() => {
            soundFX.playStoneDrum();
            if (viewState === 'under_ground') {
              setViewState('above_ground');
            } else if (onOpenMap) {
              onOpenMap();
            }
          }}
          className="bg-[#241a13]/90 hover:bg-[#3d2b1f] text-[#e6d5b8] text-[10px] px-2.5 py-1 rounded-full border border-[#d2b48c]/60 flex items-center gap-1 shadow-lg backdrop-blur-md font-serif active:scale-95 transition-all"
        >
          <Compass className="w-3 h-3 text-[#ffe89c]" />
          <span>{viewState === 'under_ground' ? '回首页' : '地图目录'}</span>
        </button>
      </div>

      {/* ================= VIEW 1: ABOVE GROUND MODERN MUSEUM EXTERIOR ================= */}
      {viewState === 'above_ground' && (
        <div
          onClick={handleDescendUnderground}
          className="absolute inset-0 z-10 flex flex-col justify-between cursor-pointer animate-fade-in overflow-hidden"
        >
          {/* Museum Outdoor Real Photograph */}
          <div className="absolute inset-0 z-0">
            <img
              src={ASSETS.museumExterior}
              alt="北京大葆台西汉墓博物馆外景"
              className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.02]"
              referrerPolicy="no-referrer"
            />
            {/* Warm sunlight gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-[#1a120b]/85" />
          </div>

          {/* Flying Bird SVGs gliding across sky */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            <div className="absolute top-12 -left-10 animate-[flyAcross_12s_linear_infinite] flex items-center gap-4 opacity-80">
              <svg viewBox="0 0 24 16" className="w-6 h-4 fill-[#3d2b1f]">
                <path d="M0,8 Q6,0 12,8 Q18,0 24,8 Q18,12 12,6 Q6,12 0,8 Z" />
              </svg>
              <svg viewBox="0 0 24 16" className="w-4 h-3 fill-[#4a3525] translate-y-2">
                <path d="M0,8 Q6,0 12,8 Q18,0 24,8 Q18,12 12,6 Q6,12 0,8 Z" />
              </svg>
            </div>
          </div>

          {/* Falling / Rustling Leaves Particle Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute text-emerald-700/60 animate-bounce"
                style={{
                  top: `${15 + i * 12}%`,
                  left: `${10 + i * 16}%`,
                  animationDuration: `${3 + i * 0.8}s`,
                  transform: `rotate(${i * 45}deg)`,
                }}
              >
                🍃
              </div>
            ))}
          </div>

          {/* Top Sunshine Header Title */}
          <div className="relative z-20 pt-10 px-4 text-center">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#d2b48c]/40 text-[#ffe89c] text-[10px] mb-2 shadow-lg">
              <Sun className="w-3 h-3 text-amber-300 animate-spin" />
              <span>阳光祥和 · 北京大葆台西汉墓博物馆</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#ffffff] tracking-[0.2em] title-drop-shadow font-serif">
              大葆台遗址
            </h1>
            <p className="text-[10px] text-[#f5ebd7] mt-0.5 tracking-wider font-mono drop-shadow">
              BEIJING DABAOTAI WESTERN HAN TOMB
            </p>
          </div>

          {/* Bottom Swipe-down Prompt to descend into tomb */}
          <div className="relative z-20 pb-8 px-4 flex flex-col items-center gap-2">
            <div className="p-3 rounded-2xl bg-[#241a13]/90 border border-[#d2b48c] shadow-2xl backdrop-blur-md text-center max-w-xs animate-bounce">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#ffe89c] font-black font-serif">
                <span>往下滑动 / 点击 · 进入大葆台地下</span>
                <ChevronDown className="w-4 h-4 text-[#ffe89c]" />
              </div>
              <p className="text-[9px] text-[#c2a385] mt-1 font-serif">
                穿过现代晨光，揭开两千年前西汉广阳王陵墓深处
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: UNDERGROUND SAND EXCAVATION ================= */}
      {viewState === 'under_ground' && (
        <div className="absolute inset-0 z-0 flex flex-col justify-between animate-fade-in">
          {/* UNDER LAYER: Han Relief Portrait Brick + Title */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={ASSETS.underLayer}
              alt="大葆台乡野画像石"
              className="w-full h-full object-cover opacity-90 filter sepia-[0.2] contrast-[1.15]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b]/70 via-transparent to-[#1a120b]/95" />

            {/* Slanted "大葆台" Top Corner Seal */}
            <div className="absolute top-3 right-3 text-right rotate-[-4deg] opacity-90 pointer-events-none z-10">
              <span className="text-lg font-black text-[#e6d5b8] border-b-2 border-[#d2b48c] pb-0.5 tracking-widest title-drop-shadow font-serif">
                大葆台
              </span>
              <p className="text-[8px] text-[#d2b48c] mt-0.5 font-mono tracking-widest uppercase opacity-70">
                西汉广阳王陵
              </p>
            </div>

            {/* Main Title Calligraphy */}
            <div className="absolute inset-x-0 top-12 flex flex-col items-center justify-center p-3 text-center z-10 pointer-events-none">
              <div
                className={`transition-all duration-700 transform ${
                  clearedPercent > 25 || isFullyRevealed
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-90 opacity-20 -translate-y-2'
                }`}
              >
                <div className="border border-[#5c4033] bg-[#241a13]/90 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs text-center ring-1 ring-[#d2b48c]/30">
                  <p className="text-[8px] tracking-[0.3em] text-[#d2b48c] uppercase opacity-75 font-mono">
                    ARCHAEOLOGICAL DISCOVERY
                  </p>
                  <h1 className="text-xl sm:text-2xl font-black text-[#e6d5b8] tracking-[0.2em] leading-tight font-serif title-drop-shadow">
                    走进大葆台
                  </h1>
                  <h2 className="text-[10px] tracking-[0.2em] font-bold text-[#ffe89c] mt-0.5 border-t border-[#3d2b1f] pt-0.5">
                    汉代生命观数字舞蹈体验
                  </h2>
                </div>
              </div>
            </div>

            {/* Central Awakening Jade Dancer Graphic */}
            <div
              onClick={() => {
                soundFX.playBronzeChime();
                if (onOpenMap) onOpenMap();
                else onNextPage();
              }}
              className={`absolute inset-x-0 bottom-16 flex flex-col items-center justify-center pointer-events-auto cursor-pointer transition-all duration-700 ${
                isFullyRevealed ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
              }`}
            >
              <div className="relative w-32 h-40 flex items-center justify-center group">
                <div className="absolute inset-0 bg-[#88b598]/20 rounded-full blur-xl animate-pulse" />
                <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(180,240,200,0.8)]">
                  <path
                    d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                    fill="none"
                    stroke="#e8f8ec"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulse"
                  />
                  <circle cx="50" cy="14" r="7" fill="#e8f8ec" />
                  <circle cx="50" cy="14" r="11" fill="none" stroke="#ffe89c" strokeWidth="1" strokeDasharray="3,3" className="animate-spin" />
                </svg>

                {isFullyRevealed && (
                  <div className="absolute -bottom-2 bg-[#241a13]/95 border border-[#ffe89c] text-[#ffe89c] text-[10px] px-3 py-1 rounded-full shadow-lg font-serif animate-bounce flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#ffe89c]" />
                    <span>玉舞人已苏醒 · 正在开启七章探索</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TOP LAYER: Sand Scratch Canvas */}
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

          {/* Wind Particles */}
          <canvas ref={particleCanvasRef} className="absolute inset-0 z-20 pointer-events-none opacity-60" />

          {/* Top Controls Overlay */}
          <div className="relative z-30 pt-10 px-3 flex items-center justify-between pointer-events-none">
            <div className="bg-[#241a13]/90 border border-[#3d2b1f] px-2.5 py-0.5 rounded-full text-[10px] text-[#e6d5b8] flex items-center gap-1 backdrop-blur-md shadow-md">
              <Sparkles className="w-2.5 h-2.5 text-[#d2b48c] animate-spin" />
              <span className="font-mono">
                沙土刨除: <strong className="text-[#ffe89c]">{clearedPercent}%</strong> (达38%自动开启)
              </span>
            </div>

            <button
              onClick={handleClearAll}
              className="pointer-events-auto bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] text-[10px] px-2.5 py-0.5 rounded-full border border-[#d2b48c]/50 flex items-center gap-1 active:scale-95 shadow-md font-mono"
            >
              <RefreshCw className="w-2.5 h-2.5 text-[#d2b48c]" />
              <span>全刨开</span>
            </button>
          </div>

          {/* Scratch Finger Hint */}
          {showHint && clearedPercent < 15 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce">
              <div className="w-10 h-10 rounded-full bg-[#3d2b1f]/90 text-[#e6d5b8] border-2 border-[#d2b48c] flex items-center justify-center shadow-2xl">
                <Hand className="w-5 h-5 text-[#d2b48c]" />
              </div>
              <span className="mt-2 bg-[#241a13]/95 border border-[#3d2b1f] text-[#e6d5b8] text-[10px] px-2.5 py-0.5 rounded-full font-serif shadow-lg tracking-wider">
                滑动手指 · 刨开千年风沙
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
