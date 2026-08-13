import React, { useState, useRef, useEffect } from 'react';
import { HOTSPOT_VIDEOS, ASSETS } from '../data/museumData';
import { VideoInfo } from '../types';
import { soundFX } from '../utils/soundEngine';
import { Flashlight, Play, Pause, X, Sparkles, Eye, Film } from 'lucide-react';

interface Page5FlashlightScrollProps {
  onNextPage?: () => void;
}

export const Page5FlashlightScroll: React.FC<Page5FlashlightScrollProps> = ({ onNextPage }) => {
  const [isFlashlightOn, setIsFlashlightOn] = useState<boolean>(true);
  const [lightPos, setLightPos] = useState<{ x: number; y: number }>({ x: 180, y: 220 });
  const [activeHotspotPrompt, setActiveHotspotPrompt] = useState<'banquet' | 'baixi' | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoInfo | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track cursor / touch position for flashlight spotlight
  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setLightPos({ x, y });

    // Check if spotlight hits middle-lower hotspots
    const width = rect.width;
    const height = rect.height;

    // Hotspot 1: 广阳王宴乐 (Middle-Left, lower)
    const banquetX = width * 0.35;
    const banquetY = height * 0.65;
    const distBanquet = Math.hypot(x - banquetX, y - banquetY);

    // Hotspot 2: 民间百戏 (Middle-Right, lower)
    const baixiX = width * 0.70;
    const baixiY = height * 0.70;
    const distBaixi = Math.hypot(x - baixiX, y - baixiY);

    if (distBanquet < 75) {
      if (activeHotspotPrompt !== 'banquet') {
        soundFX.playBronzeChime();
        setActiveHotspotPrompt('banquet');
      }
    } else if (distBaixi < 75) {
      if (activeHotspotPrompt !== 'baixi') {
        soundFX.playBronzeChime();
        setActiveHotspotPrompt('baixi');
      }
    } else {
      setActiveHotspotPrompt(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFlashlightOn) {
      handlePointerMove(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isFlashlightOn && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const toggleFlashlight = () => {
    soundFX.playStoneDrum();
    setIsFlashlightOn(!isFlashlightOn);
  };

  const handleOpenHotspotVideo = (type: 'banquet' | 'baixi') => {
    soundFX.playStoneDrum();
    const info = HOTSPOT_VIDEOS[type];
    setActiveVideoModal(info);
    setIsVideoPlaying(true);
  };

  // Handle double click on flashlight illuminated position or canvas
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (activeHotspotPrompt) {
      handleOpenHotspotVideo(activeHotspotPrompt);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] text-[#d2b48c] flex flex-col justify-between overflow-hidden select-none font-serif">
      {/* Header Bar */}
      <div className="p-3 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Flashlight className="w-5 h-5 text-[#d2b48c]" />
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-70 text-[#c2a385] font-mono">
              ILLUMINATION
            </span>
            <h2 className="text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              第五页：照见汉代 · 手电筒长卷探秘
            </h2>
          </div>
        </div>
        <button
          onClick={toggleFlashlight}
          className={`px-3 py-1 rounded-xl text-xs font-serif font-black border flex items-center gap-1.5 transition-all shadow-md ${
            isFlashlightOn
              ? 'bg-[#3d2b1f] text-[#e6d5b8] border-[#d2b48c] shadow-[0_0_15px_rgba(210,180,140,0.4)]'
              : 'bg-[#1a120b] text-[#c2a385] border-[#3d2b1f]'
          }`}
        >
          <Flashlight className="w-3.5 h-3.5 text-[#d2b48c]" />
          {isFlashlightOn ? '手电开启' : '关闭手电'}
        </button>
      </div>

      {/* Main Flashlight Canvas Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onDoubleClick={handleDoubleClick}
        className="flex-1 relative overflow-hidden cursor-crosshair bg-[#050403]"
      >
        {/* Underneath Full Han Relief Scroll Image (Revealed by Spotlight) */}
        <div className="absolute inset-0">
          <img
            src={ASSETS.lifeScroll}
            alt="汉代百姓生活长卷"
            className="w-full h-full object-cover filter contrast-125 saturate-110"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Dim Twilight Darkness Overlay Mask (When Flashlight is ON, circular cutout spotlight) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: isFlashlightOn
              ? `radial-gradient(circle 90px at ${lightPos.x}px ${lightPos.y}px, transparent 0%, rgba(5, 4, 3, 0.94) 85%)`
              : 'rgba(5, 4, 3, 0.96)',
          }}
        />

        {/* Spotlight Beam Ring Light FX */}
        {isFlashlightOn && (
          <div
            onClick={() => {
              if (activeHotspotPrompt) handleOpenHotspotVideo(activeHotspotPrompt);
            }}
            onDoubleClick={() => {
              if (activeHotspotPrompt) handleOpenHotspotVideo(activeHotspotPrompt);
            }}
            className={`absolute rounded-full border-2 border-[#d2b48c]/80 shadow-[0_0_35px_rgba(210,180,140,0.6)] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ${
              activeHotspotPrompt ? 'cursor-pointer ring-4 ring-[#d2b48c]/50 animate-pulse' : 'pointer-events-none'
            }`}
            style={{
              left: `${lightPos.x}px`,
              top: `${lightPos.y}px`,
              width: '180px',
              height: '180px',
            }}
          >
            {/* Dust Particles inside Beam */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-40 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:12px_12px] animate-pulse" />
            
            {/* Hint overlay inside beam when hotspot is active */}
            {activeHotspotPrompt && (
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#e6d5b8] bg-black/40 rounded-full backdrop-blur-[1px] tracking-widest title-drop-shadow">
                点击/双击进入
              </div>
            )}
          </div>
        )}

        {/* Hotspot Markers on Canvas (Middle-Lower) */}
        <div
          onClick={() => handleOpenHotspotVideo('banquet')}
          onDoubleClick={() => handleOpenHotspotVideo('banquet')}
          className="absolute left-[35%] top-[65%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#d2b48c] animate-ping opacity-80" />
          <span className="absolute top-10 left-1/2 transform -translate-x-1/2 text-[9px] font-serif font-black text-[#e6d5b8] bg-[#241a13]/90 px-2 py-0.5 rounded-lg border border-[#3d2b1f] whitespace-nowrap shadow-lg">
            广阳王宴乐 (双击观看)
          </span>
        </div>

        <div
          onClick={() => handleOpenHotspotVideo('baixi')}
          onDoubleClick={() => handleOpenHotspotVideo('baixi')}
          className="absolute left-[70%] top-[70%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#d2b48c] animate-ping opacity-80" />
          <span className="absolute top-10 left-1/2 transform -translate-x-1/2 text-[9px] font-serif font-black text-[#e6d5b8] bg-[#241a13]/90 px-2 py-0.5 rounded-lg border border-[#3d2b1f] whitespace-nowrap shadow-lg">
            民间百戏 (双击观看)
          </span>
        </div>

        {/* Floating Instruction / Flashlight Icon at Bottom Right */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
          {/* Hand Flashlight Icon Trigger */}
          <button
            onClick={toggleFlashlight}
            className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center shadow-2xl transition-all ${
              isFlashlightOn
                ? 'bg-[#3d2b1f] text-[#e6d5b8] border-[#d2b48c] scale-105 ring-4 ring-[#d2b48c]/30'
                : 'bg-[#241a13] text-[#c2a385] border-[#3d2b1f]'
            }`}
          >
            <Flashlight className="w-6 h-6 mb-0.5 text-[#d2b48c]" />
            <span className="text-[9px] font-serif font-black">手电筒</span>
          </button>
        </div>

        {/* Hotspot Interactive Prompt Popup (When Spotlight hits hotspot) */}
        {activeHotspotPrompt && (
          <div className="absolute top-4 inset-x-4 z-30 bg-[#241a13]/95 border-2 border-[#3d2b1f] p-3.5 rounded-2xl shadow-2xl backdrop-blur-md animate-bounce ring-1 ring-[#d2b48c]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#d2b48c] animate-spin" />
                <div>
                  <h4 className="text-xs font-black font-serif text-[#e6d5b8] tracking-wider">
                    照见汉代画面：【{HOTSPOT_VIDEOS[activeHotspotPrompt].title}】
                  </h4>
                  <p className="text-[10px] text-[#c2a385]">
                    双击手电筒照着的位置或点击按钮即可跳转观看？
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenHotspotVideo(activeHotspotPrompt)}
                className="px-3.5 py-1.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] text-xs font-serif font-black rounded-xl border border-[#d2b48c] shadow-lg flex items-center gap-1 shrink-0 ml-2"
              >
                <Film className="w-3.5 h-3.5 text-[#d2b48c]" /> 观看视频
              </button>
            </div>
          </div>
        )}

        {/* Bottom Historical Context Bar & Next Page Button */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#241a13]/95 p-3 rounded-2xl border border-[#3d2b1f] backdrop-blur-md shadow-xl flex items-center justify-between gap-2 z-20">
          <div className="text-[10px] text-[#c2a385] font-serif leading-relaxed pr-2">
            <p className="text-[#e6d5b8] font-black mb-0.5 tracking-wider">📜 汉代广阳百姓图景：</p>
            朝堂议政，市井繁盛；乐工奏乐，舞者起舞。
          </div>
          {onNextPage && (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                onNextPage();
              }}
              className="px-3 py-2 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] rounded-xl border border-[#d2b48c] text-xs font-serif font-black shadow-lg flex items-center gap-1 shrink-0 active:scale-95 transition-transform"
            >
              黄肠题凑 ➔
            </button>
          )}
        </div>
      </div>

      {/* 16:9 LANDSCAPE VIDEO MODAL OVERLAY (For Banquet or Baixi) */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#241a13] border-2 border-[#3d2b1f] rounded-3xl max-w-sm w-full p-4.5 text-[#e6d5b8] relative shadow-2xl space-y-3.5 ring-1 ring-[#d2b48c]/30">
            <button
              onClick={() => {
                setActiveVideoModal(null);
                setIsVideoPlaying(false);
              }}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-xl bg-[#1a120b] text-[#c2a385] hover:text-[#e6d5b8] border border-[#3d2b1f] z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 border-b border-[#3d2b1f] pb-2.5 pr-8">
              <Eye className="w-5 h-5 text-[#d2b48c]" />
              <div>
                <h3 className="text-sm font-black font-serif text-[#e6d5b8] tracking-wider title-drop-shadow">
                  {activeVideoModal.title}
                </h3>
                <p className="text-[10px] text-[#c2a385] font-mono tracking-widest uppercase">{activeVideoModal.badgeText}</p>
              </div>
            </div>

            {/* 横屏的观看视频位置 (16:9 Landscape Video Area) */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#3d2b1f] bg-black shadow-2xl group">
              <img
                src={activeVideoModal.posterUrl}
                alt={activeVideoModal.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isVideoPlaying ? 'scale-105 filter brightness-110 contrast-125' : 'filter brightness-75'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Landscape 16:9 Video Controls overlay */}
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-3">
                <div className="flex items-center justify-between text-[10px] text-[#e6d5b8] font-mono bg-black/50 px-2 py-0.5 rounded border border-[#d2b48c]/30 backdrop-blur-sm self-start">
                  <span>16:9 HD LANDSCAPE VIDEO</span>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="w-12 h-12 rounded-full bg-[#3d2b1f]/95 text-[#e6d5b8] border-2 border-[#d2b48c] flex items-center justify-center shadow-2xl transition-transform active:scale-95"
                  >
                    {isVideoPlaying ? <Pause className="w-6 h-6 text-[#d2b48c]" /> : <Play className="w-6 h-6 ml-0.5 text-[#d2b48c]" />}
                  </button>
                </div>

                {/* Video progress bar */}
                <div className="w-full space-y-1">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#d2b48c] transition-all ${
                        isVideoPlaying ? 'w-3/4 animate-pulse' : 'w-1/4'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-[#c2a385]">
                    <span>{isVideoPlaying ? '00:12' : '00:00'}</span>
                    <span>{activeVideoModal.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 下方是分别对宴乐与百戏的文字介绍 */}
            <div className="bg-[#1a120b] p-3.5 rounded-2xl border border-[#3d2b1f] text-xs text-[#c2a385] font-serif leading-relaxed shadow-inner">
              <p className="text-[#e6d5b8] font-black mb-1.5 tracking-wider text-xs border-b border-[#3d2b1f] pb-1">
                📜 文字介绍
              </p>
              <p className="text-[#d2b48c] font-medium leading-relaxed">
                {activeVideoModal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
