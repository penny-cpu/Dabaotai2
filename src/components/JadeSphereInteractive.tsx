import React, { useState, useRef } from 'react';
import { Sparkles, Move, Eye, ChevronRight } from 'lucide-react';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { DialogueLine } from '../types';
import { soundFX } from '../utils/soundEngine';

interface JadeSphereInteractiveProps {
  onComplete: () => void;
}

interface SphereRelic {
  id: string;
  name: string;
  angle: number;
  dialogue: DialogueLine[];
  tag: string;
  muralDesc: string;
}

const SPHERE_RELICS: SphereRelic[] = [
  {
    id: 'chihu_pendant',
    name: '螭虎纹玉佩',
    angle: 0,
    tag: '文物自述 01',
    muralDesc: '大葆台西汉王后墓出土 · 螭虎回首，身躯盘旋流转',
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '螭虎纹玉佩',
        text: '终于等到你了。两千年过去，我还在这里。跟我来吧——大汉的记忆，还没有沉睡。',
      },
    ],
  },
  {
    id: 'she_pendant',
    name: '龙凤纹韘形佩',
    angle: 90,
    tag: '文物自述 02',
    muralDesc: '大葆台西汉王后墓出土 · 韘形如决，龙凤腾跃回环',
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '龙凤纹韘形佩',
        text: '我们同墓出土，也同属王后组玉佩。我的形制融合了璧与韘。这类佩玉也寄托着身份与情感。继续向前，你会看到更多记忆。',
      },
    ],
  },
  {
    id: 'dragon_huang',
    name: '龙纹玉璜',
    angle: 180,
    tag: '文物自述 03',
    muralDesc: '大葆台西汉王后墓出土 · 方折回转，承继秦风汉韵',
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '龙纹玉璜',
        text: '我身上刻着方折回转的秦式龙纹。前朝的纹样，被西汉人继续佩戴与珍藏。我也曾是王后组玉佩的一部分。',
      },
    ],
  },
  {
    id: 'jade_dancer_core',
    name: '白玉舞人',
    angle: 270,
    tag: '记忆聚焦终点',
    muralDesc: '大葆台西汉王后墓出土 · 翘袖折腰，定格两千载汉舞风姿',
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '玉舞人',
        text: '这些玉器让我想起了自己的身体。汉代舞蹈重长袖、细腰，也讲究刚柔相济。我最熟悉的动作，是“翘袖折腰”。',
      },
    ],
  },
];

export const JadeSphereInteractive: React.FC<JadeSphereInteractiveProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);

  const activeRelic = SPHERE_RELICS[currentIdx];

  const handleTouchStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleTouchMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -40) {
      soundFX.playSandScratch();
      soundFX.playBronzeChime();
      setCurrentIdx((prev) => (prev + 1) % SPHERE_RELICS.length);
    } else if (dragOffset > 40) {
      soundFX.playSandScratch();
      soundFX.playBronzeChime();
      setCurrentIdx((prev) => (prev - 1 + SPHERE_RELICS.length) % SPHERE_RELICS.length);
    }
    setDragOffset(0);
  };

  const handleSelectRelic = (idx: number) => {
    if (idx === currentIdx) return;
    soundFX.playBronzeChime();
    soundFX.playStoneDrum();
    setCurrentIdx(idx);
  };

  const handleConfirmAndTransition = () => {
    soundFX.playMemoryRestore();
    onComplete();
  };

  return (
    <div
      onMouseDown={(e) => handleTouchStart(e.clientX)}
      onMouseMove={(e) => handleTouchMove(e.clientX)}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleTouchMove(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full bg-[#120a06] text-[#e6d5b8] flex flex-col justify-between overflow-hidden font-serif select-none cursor-grab active:cursor-grabbing touch-none"
      style={{
        backgroundImage: 'radial-gradient(#26150b 1px, transparent 0)',
        backgroundSize: '16px 16px',
      }}
    >
      {/* Museum Tomb / Underground Palace Stone & Mural Aesthetic Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Focused Spotlight Beam illuminating down onto the center relic */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-96 pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.4) 0%, rgba(180, 83, 9, 0.15) 50%, transparent 80%)',
          }}
        />
        {/* Underground solemn vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-transparent to-black/80" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24170d]/90 border border-amber-500/70 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[10px] font-mono text-amber-200">
            地宫秘境 · 重点玉器纵深展柜
          </span>
        </div>

        <div className="text-[10px] font-mono text-amber-400 bg-black/70 px-2.5 py-0.5 rounded-full border border-amber-900">
          文物 {currentIdx + 1} / {SPHERE_RELICS.length}
        </div>
      </div>

      {/* 3D Longitudinal Depth Spherical Carousel with Real-Time Finger Drag Physics */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-3 py-1">
        {/* 3D Orbit Perspective Stage */}
        <div
          className="relative w-full max-w-xs h-60 flex items-center justify-center"
          style={{ perspective: '900px' }}
        >
          {/* Floor Ring Glow */}
          <div className="absolute bottom-2 w-52 h-14 rounded-full border border-amber-500/30 bg-amber-500/5 blur-[1px] transform rotate-x-60 pointer-events-none" />

          {/* 4 Spherical Relic Nodes Rotating in 3D Depth Space */}
          {SPHERE_RELICS.map((relic, idx) => {
            // Calculate relative angular offset (-1, 0, 1, 2) from active index
            let offset = idx - currentIdx;
            if (offset > SPHERE_RELICS.length / 2) offset -= SPHERE_RELICS.length;
            if (offset < -SPHERE_RELICS.length / 2) offset += SPHERE_RELICS.length;

            // Compute dynamic angle with real-time drag offset
            const baseAngle = offset * 90;
            const dragAngle = (dragOffset / 180) * 90;
            const finalAngle = baseAngle + dragAngle;
            const rad = (finalAngle * Math.PI) / 180;

            const radiusX = 110;
            const radiusZ = 90;
            const x = Math.sin(rad) * radiusX;
            const z = Math.cos(rad) * radiusZ;
            const scale = Math.max(0.65, (z + radiusZ) / (2 * radiusZ) * 0.45 + 0.65);
            const opacity = Math.max(0.35, (z + radiusZ) / (2 * radiusZ) * 0.65 + 0.35);
            const isCenter = Math.abs(offset) === 0;

            return (
              <div
                key={relic.id}
                onClick={() => handleSelectRelic(idx)}
                className={`absolute rounded-full flex flex-col items-center justify-center text-center p-3 transition-all cursor-pointer ${
                  isCenter
                    ? 'w-48 h-48 bg-gradient-to-b from-[#3d2414] via-[#26150b] to-[#120a06] border-3 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.7)] z-30'
                    : 'w-36 h-36 bg-gradient-to-b from-[#22150d] to-[#0d0704] border-2 border-amber-700/60 shadow-lg z-10'
                }`}
                style={{
                  transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                  opacity,
                  transition: isDragging ? 'none' : 'transform 0.4s ease-out, opacity 0.4s ease-out',
                }}
              >
                {/* Relic Index Tag */}
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-[10px] font-black shadow mb-1 ${
                    isCenter
                      ? 'bg-amber-950 text-amber-300 border-amber-400'
                      : 'bg-black/80 text-amber-500/70 border-amber-900'
                  }`}
                >
                  0{idx + 1}
                </div>

                {/* Relic Title */}
                <h3
                  className={`font-black tracking-wider leading-tight font-serif ${
                    isCenter ? 'text-sm text-[#ffe89c]' : 'text-xs text-[#d2b48c]'
                  }`}
                >
                  {relic.name}
                </h3>

                {/* Tag & Description on Center Relic */}
                {isCenter && (
                  <>
                    <span className="text-[7.5px] font-mono text-amber-300/90 mt-1 bg-black/60 px-2 py-0.5 rounded-full border border-amber-800">
                      {relic.tag}
                    </span>
                    <p className="text-[7.5px] text-[#c2a385] mt-1 line-clamp-2 px-1 leading-tight">
                      {relic.muralDesc}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Swipe Prompt & Navigation Dots */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-[9.5px] text-amber-200/90 font-serif bg-black/70 px-4 py-1 rounded-full border border-amber-700/80 shadow">
            <Move className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>手指左右滑动 · 旋转纵深球体探索四件珍宝</span>
          </div>

          <div className="flex items-center gap-1.5 pt-0.5">
            {SPHERE_RELICS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelectRelic(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIdx
                    ? 'w-5 bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                    : 'w-1.5 bg-[#4a3321] hover:bg-[#6e4e34]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Transition button if reached Jade Dancer (Relic 4) */}
        {currentIdx === 3 && (
          <button
            onClick={handleConfirmAndTransition}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:brightness-110 text-black font-serif font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-bounce flex items-center gap-1.5"
          >
            <span>进入扇形舞姿记忆 ➔</span>
          </button>
        )}
      </div>

      {/* Bottom Spotlight Dialogue Box */}
      <UnifiedDialogueBox
        dialogues={activeRelic.dialogue}
        currentIndex={0}
        onNext={() => {
          if (currentIdx === 3) {
            handleConfirmAndTransition();
          } else {
            soundFX.playBronzeChime();
            setCurrentIdx((prev) => (prev + 1) % SPHERE_RELICS.length);
          }
        }}
      />
    </div>
  );
};
