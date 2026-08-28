import React from 'react';
import { DialogueLine } from '../types';
import { ShieldAlert, Sparkles, ChevronRight, User } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface DialogueSystemProps {
  dialogues: DialogueLine[];
  currentIndex: number;
  onNext: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  restorationLevel?: number; // 0 to 7
  isCorrupted?: boolean;
}

export const DialogueSystem: React.FC<DialogueSystemProps> = ({
  dialogues,
  currentIndex,
  onNext,
  isMinimized = false,
  onToggleMinimize,
  restorationLevel = 1,
  isCorrupted = false,
}) => {
  if (currentIndex >= dialogues.length) return null;

  const current = dialogues[currentIndex];
  const isLast = currentIndex === dialogues.length - 1;

  const handleAdvance = () => {
    soundFX.playStoneDrum();
    onNext();
  };

  const getSpeakerBadge = () => {
    switch (current.speaker) {
      case 'pushou':
        return {
          title: '鎏金铜铺首',
          border: 'border-amber-600',
          bg: 'bg-[#2a1a0f]',
          text: 'text-amber-300',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />,
        };
      case 'dancer':
        return {
          title: '玉舞人',
          border: 'border-emerald-600',
          bg: 'bg-[#0e241b]',
          text: 'text-emerald-300',
          icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
        };
      case 'player':
        return {
          title: '见证者 (你)',
          border: 'border-blue-600',
          bg: 'bg-[#0f1d2e]',
          text: 'text-blue-300',
          icon: <User className="w-3.5 h-3.5 text-blue-400" />,
        };
      default:
        return {
          title: '大葆台志',
          border: 'border-[#5c4033]',
          bg: 'bg-[#1c130d]',
          text: 'text-[#ffe89c]',
          icon: <Sparkles className="w-3.5 h-3.5 text-[#ffe89c]" />,
        };
    }
  };

  const badge = getSpeakerBadge();

  return (
    <div className="absolute bottom-2 inset-x-2 z-40 flex items-end gap-2 animate-fade-in pointer-events-auto select-none">
      {/* Left Bottom Jade Dancer Sprite / Portrait */}
      <div
        onClick={onToggleMinimize}
        className={`relative shrink-0 cursor-pointer transition-all duration-300 ${
          isMinimized ? 'w-9 h-9' : 'w-16 h-20'
        } rounded-2xl bg-[#140e0a]/95 border-2 ${
          isCorrupted ? 'border-red-600 animate-pulse' : badge.border
        } flex flex-col items-center justify-center shadow-2xl overflow-hidden backdrop-blur-md`}
      >
        {/* Jade Dancer SVG representation */}
        <div className="relative w-full h-full p-1 flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <path
              d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
              fill="none"
              stroke={
                isCorrupted
                  ? '#ef4444'
                  : restorationLevel >= 6
                  ? '#a7f3d0'
                  : '#d2b48c'
              }
              strokeWidth="5"
              strokeLinecap="round"
              className={restorationLevel >= 4 ? 'animate-pulse' : ''}
            />
            <circle
              cx="50"
              cy="14"
              r="7"
              fill={restorationLevel >= 7 ? '#ffffff' : '#a7f3d0'}
            />
          </svg>
        </div>

        {/* Small label */}
        {!isMinimized && (
          <div className="absolute bottom-0.5 text-[8px] font-serif text-[#d2b48c] font-black bg-black/60 px-1 rounded">
            玉舞人
          </div>
        )}
      </div>

      {/* Right Bottom Dialogue Bubble */}
      <div
        onClick={handleAdvance}
        className="flex-1 bg-[#18110b]/95 border-2 border-[#5c4033] hover:border-[#8b5a2b] rounded-2xl p-2.5 shadow-2xl backdrop-blur-md cursor-pointer transition-all active:scale-[0.99] flex flex-col justify-between min-h-[72px]"
      >
        {/* Speaker Info & Step */}
        <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1 mb-1">
          <div className="flex items-center gap-1.5">
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black font-serif flex items-center gap-1 ${badge.bg} ${badge.text} border ${badge.border}`}>
              {badge.icon}
              <span>{badge.title}</span>
            </span>
          </div>

          <span className="text-[9px] font-mono text-[#a3805d]">
            {currentIndex + 1}/{dialogues.length} · 点击推进
          </span>
        </div>

        {/* Dialogue Text Content */}
        <p className="text-[11px] sm:text-xs font-serif text-[#f2e6d6] leading-relaxed select-text">
          {current.text}
        </p>

        {/* Next indicator */}
        <div className="flex justify-end items-center mt-1">
          <span className="text-[9px] text-[#ffe89c] flex items-center font-mono">
            {isLast ? '进入行动' : '继续'}
            <ChevronRight className="w-3 h-3 animate-pulse" />
          </span>
        </div>
      </div>
    </div>
  );
};
