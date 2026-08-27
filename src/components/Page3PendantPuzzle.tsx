import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { SemiCircleWheel, WheelItem } from './SemiCircleWheel';
import { Gem, Sparkles, CheckCircle2 } from 'lucide-react';

interface Page3PendantPuzzleProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const JADE_WHEEL_ITEMS: WheelItem[] = [
  {
    id: 'chihu_pendant',
    name: '螭虎纹玉佩',
    pinyin: 'Chihu',
    isCorrect: true,
    hint: '白玉质，镂雕螭虎神兽，有角有翼，广阳王后墓随葬组玉佩核心',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7 C15 7, 16 11, 13 14 C10 17, 8 13, 11 10" />
      </svg>
    ),
  },
  {
    id: 'longfeng_she',
    name: '龙凤纹韘形佩',
    pinyin: 'She',
    isCorrect: false,
    hint: '青白玉韘形钩弦佩，饰有游龙翔凤，非圆形神兽佩',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <path d="M7 6 C7 3, 17 3, 17 6 L19 18 C19 21, 5 21, 5 18 Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'long_huang',
    name: '龙纹玉璜',
    pinyin: 'Huang',
    isCorrect: false,
    hint: '弧形扇面璜，秦式方折龙纹，组玉佩顶部构件',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <path d="M4 16 C6 8, 18 8, 20 16 C16 12, 8 12, 4 16 Z" />
      </svg>
    ),
  },
  {
    id: 'yu_xi',
    name: '镂雕龙纹玉觽',
    pinyin: 'Xi',
    isCorrect: false,
    hint: '长11.7厘米角形解结玉器，尖锐弯曲',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <path d="M8 4 C14 4, 18 10, 16 20 C14 14, 10 10, 8 4 Z" />
      </svg>
    ),
  },
  {
    id: 'yu_chan',
    name: '玉蝉',
    pinyin: 'Chan',
    isCorrect: false,
    hint: '汉代口含玉蝉，象征脱胎蜕变升仙，非随身佩件',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <ellipse cx="12" cy="12" rx="5" ry="8" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    id: 'yu_tun',
    name: '玉豚',
    pinyin: 'Tun',
    isCorrect: false,
    hint: '西汉汉八刀玉猪握，放置于逝者掌中，象征财富充盈',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <rect x="5" y="8" width="14" height="8" rx="3" />
        <circle cx="8" cy="12" r="1.5" />
      </svg>
    ),
  },
];

export const Page3PendantPuzzle: React.FC<Page3PendantPuzzleProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const handleToggleSelect = (item: WheelItem) => {
    const next = [item.id];
    setSelectedIds(next);

    if (item.id === 'chihu_pendant') {
      soundFX.playBronzeChime();
      setIsSuccess(true);
      onUnlockFragment();
      // Auto advance after 1.6s
      setTimeout(() => {
        onNextPage();
      }, 1600);
    } else {
      soundFX.playStoneDrum();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Header */}
      <div className="p-2.5 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Gem className="w-4 h-4 text-[#ffe89c]" />
          <div>
            <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
              CHANGLE WEIYANG · PART 2
            </span>
            <h2 className="text-xs sm:text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              第二章 · 宴乐 (长乐组玉佩)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] text-[#ffe89c] bg-[#3d2b1f] px-2 py-0.5 rounded-full border border-[#5c4033] font-mono">
          <Sparkles className="w-2.5 h-2.5" />
          <span>寻螭虎玉佩</span>
        </div>
      </div>

      {/* Main Visual Stage: Jade Pendant Glowing and Sleeve Dancing Silhouette */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-3">
        {/* Ambient Jade Ring Glow */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#88b598]/15 rounded-full blur-xl animate-pulse" />
          <div className="w-40 h-40 rounded-full border border-dashed border-[#ffe89c]/40 animate-spin" />

          {/* S-curve dancer posture illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 120" className="w-32 h-36 filter drop-shadow-[0_0_12px_rgba(200,240,210,0.7)]">
              <path
                d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                fill="none"
                stroke={isSuccess ? '#ffe89c' : '#cdeacd'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isSuccess ? 'animate-bounce' : ''}
              />
              <circle cx="50" cy="14" r="7" fill="#e8f8ec" />
              {/* Chest Jade Resonance Glow */}
              <circle
                cx="50"
                cy="38"
                r={isSuccess ? 9 : 4}
                fill={isSuccess ? '#ffe89c' : '#88b598'}
                className={isSuccess ? 'animate-ping' : ''}
              />
            </svg>
          </div>

          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs rounded-full flex flex-col items-center justify-center animate-fade-in p-2 text-center z-20">
              <div className="bg-[#241a13]/95 border-2 border-[#88b598] p-3 rounded-2xl shadow-2xl">
                <CheckCircle2 className="w-5 h-5 text-[#88b598] mx-auto mb-1" />
                <h4 className="text-xs font-black text-[#e8f8ec]">螭虎玉佩 · 翘袖折腰</h4>
                <p className="text-[9px] text-[#cdeacd] mt-0.5 font-serif italic">
                  “胸前佩鸣，礼乐相和。正在前往第三章……”
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Semi-Circular Rotary Wheel for 6 Jades (Requirement 6) */}
      <div className="bg-[#241a13] border-t border-[#3d2b1f] shadow-2xl z-20">
        <SemiCircleWheel
          items={JADE_WHEEL_ITEMS}
          selectedIds={selectedIds}
          maxSelect={1}
          onToggleSelect={handleToggleSelect}
          title="广阳组玉佩轮盘"
          promptText="滑动半圆盘，找出【螭虎纹玉佩】(圆形镂雕神兽)"
        />
      </div>
    </div>
  );
};
