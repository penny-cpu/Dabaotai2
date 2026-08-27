import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { WU_DANCE_VIDEO } from '../data/museumData';
import { SemiCircleWheel, WheelItem } from './SemiCircleWheel';
import { Shield, Sparkles, Play, Pause, CheckCircle2 } from 'lucide-react';

interface Page2WeaponPuzzleProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const WEAPONS_DATA: WheelItem[] = [
  {
    id: 'cuojin_zhui',
    name: '错金银八棱棁',
    pinyin: 'Zhui',
    isCorrect: true,
    hint: '八棱铜铸，错金银纹，顶端包银，汉代袖中近身兵器',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <path d="M12 2 L14 8 L13 22 L11 22 L10 8 Z" />
        <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'tie_jian',
    name: '铁剑',
    pinyin: 'Jian',
    isCorrect: true,
    hint: '汉代铁官作坊打造，前室出土，阵前杀伐之器',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <path d="M12 2 L13.5 16 L12 22 L10.5 16 Z" />
        <line x1="8" y1="16" x2="16" y2="16" />
      </svg>
    ),
  },
  {
    id: 'huan_shou_dao',
    name: '环首铁刃',
    pinyin: 'Dao',
    isCorrect: false,
    hint: '汉代常见环首单刃刀，主要用于骑兵劈砍',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <circle cx="12" cy="20" r="2.5" />
        <path d="M12 17.5 L12 4 C12 4, 14 3, 15 2" />
      </svg>
    ),
  },
  {
    id: 'tong_mao',
    name: '青铜长矛',
    pinyin: 'Mao',
    isCorrect: false,
    hint: '长杆直刺兵器，先秦至西汉步兵使用',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <polygon points="12,2 14,7 12,8 10,7" />
        <line x1="12" y1="8" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    id: 'tie_qiao',
    name: '铁锹',
    pinyin: 'Qiao',
    isCorrect: false,
    hint: '汉代农耕与掘土工具，非出征武舞兵器',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <rect x="9" y="14" width="6" height="7" rx="1" />
        <line x1="12" y1="3" x2="12" y2="14" />
      </svg>
    ),
  },
  {
    id: 'jian_tou',
    name: '剑头',
    pinyin: 'Tou',
    isCorrect: false,
    hint: '残损兵器刃头，未具备完整干戚形制',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <polygon points="12,4 16,16 8,16" />
      </svg>
    ),
  },
  {
    id: 'da_kan_dao',
    name: '大砍刀',
    pinyin: 'Kandao',
    isCorrect: false,
    hint: '厚重宽刃刀具，非广阳王府礼仪武舞之选',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <path d="M10 20 L10 5 C10 5, 16 7, 16 14 L10 18" />
      </svg>
    ),
  },
  {
    id: 'bi_shou',
    name: '匕首',
    pinyin: 'Bishou',
    isCorrect: false,
    hint: '短小刺击暗器，非汉制“朱干玉戚”之器',
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <polygon points="12,5 14,14 10,14" />
        <line x1="12" y1="14" x2="12" y2="20" />
      </svg>
    ),
  },
];

export const Page2WeaponPuzzle: React.FC<Page2WeaponPuzzleProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const handleToggleSelect = (item: WheelItem) => {
    let next: string[];
    if (selectedIds.includes(item.id)) {
      next = selectedIds.filter((id) => id !== item.id);
    } else {
      if (selectedIds.length < 2) {
        next = [...selectedIds, item.id];
      } else {
        next = [selectedIds[1], item.id];
      }
    }
    setSelectedIds(next);

    // Auto verification when 2 weapons selected
    if (next.length === 2) {
      const correct = next.includes('cuojin_zhui') && next.includes('tie_jian');
      if (correct) {
        soundFX.playBronzeChime();
        setIsSuccess(true);
        onUnlockFragment();
        // Automatic transition to Next Chapter after 1.6s
        setTimeout(() => {
          onNextPage();
        }, 1600);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Chapter Top Title Bar */}
      <div className="p-2.5 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#d2b48c]" />
          <div>
            <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
              NORTHERN HAN · PART 1
            </span>
            <h2 className="text-xs sm:text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              第一章 · 戈影 (武舞之器)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] text-[#ffe89c] bg-[#3d2b1f] px-2 py-0.5 rounded-full border border-[#5c4033] font-mono">
          <Sparkles className="w-2.5 h-2.5" />
          <span>选择2件兵器</span>
        </div>
      </div>

      {/* Main Visual Stage: Wu Dance Visual Scroll */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-2">
        <div className="relative w-full h-full max-h-[220px] rounded-2xl overflow-hidden border-2 border-[#3d2b1f] shadow-2xl bg-[#000]">
          <img
            src={WU_DANCE_VIDEO.posterUrl}
            alt="汉代武舞"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isPlayingVideo ? 'brightness-110 scale-105' : 'brightness-85'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Success Overlay when solved */}
          {isSuccess && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center animate-fade-in p-4 text-center">
              <div className="bg-[#241a13]/95 border-2 border-[#88b598] px-4 py-2.5 rounded-2xl shadow-2xl space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-[#e8f8ec]">
                  <CheckCircle2 className="w-4 h-4 text-[#88b598]" />
                  <span>朱干玉戚 · 武舞记忆唤醒</span>
                </div>
                <p className="text-[10px] text-[#cdeacd] leading-tight font-serif italic">
                  “错金银八棱棁藏于袖中，铁剑杀伐阵前。即将进入第二章……”
                </p>
              </div>
            </div>
          )}

          {/* Video Toggle Button */}
          <button
            onClick={() => setIsPlayingVideo(!isPlayingVideo)}
            className="absolute bottom-2 right-2 p-1.5 rounded-full bg-[#241a13]/90 text-[#e6d5b8] border border-[#d2b48c] text-[10px] shadow-lg flex items-center gap-1 active:scale-95"
          >
            {isPlayingVideo ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#ffe89c]" />}
            <span className="font-mono">{isPlayingVideo ? '暂停' : '观看武舞'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Semi-Circular Rotary Wheel for 8 Weapons (Requirement 6) */}
      <div className="bg-[#241a13] border-t border-[#3d2b1f] shadow-2xl z-20">
        <SemiCircleWheel
          items={WEAPONS_DATA}
          selectedIds={selectedIds}
          maxSelect={2}
          onToggleSelect={handleToggleSelect}
          title="广阳王武库兵器盘"
          promptText="左右滑动半圆盘，找出【错金银八棱棁】与【铁剑】"
        />
      </div>
    </div>
  );
};
