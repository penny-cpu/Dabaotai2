import React, { useEffect } from 'react';
import { DialogueLine } from '../types';
import { ShieldAlert, Sparkles, ChevronRight, User, Bug } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

// =========================================================================
// 🚨【对话框左上角人物头像图片配置位置】🚨
// =========================================================================
import imgJadeDancerAvatar from '../assets/images/jade_dancer_real_photo_cutout.png';
import imgWarriorAvatar from '../assets/images/han_warrior_brick_1788598169002.jpg';
import imgPushouAvatar from '../assets/images/dabaotai_hall_entrance_bg.jpg';

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

  // Auto trigger insect / character sounds when speaker changes
  useEffect(() => {
    if (current.speaker === 'corruptor') {
      soundFX.playCrawlerScurry();
      soundFX.playInsectEating();
    }
  }, [currentIndex, current.speaker]);

  const handleAdvance = () => {
    soundFX.playStoneDrum();
    onNext();
  };

  const getSpeakerStyle = () => {
    switch (current.speaker) {
      case 'pushou':
        return {
          title: current.speakerName || '鎏金铜铺首',
          border: 'border-amber-600',
          boxBorder: 'border-amber-700/80',
          bg: 'bg-[#2a1a0f]/95',
          tagBg: 'bg-[#3d2414]',
          text: 'text-amber-300',
          shadow: 'shadow-[0_0_15px_rgba(217,119,6,0.35)]',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />,
        };
      case 'dancer':
        return {
          title: current.speakerName || '玉舞人',
          border: 'border-emerald-500',
          boxBorder: 'border-emerald-700/80',
          bg: 'bg-[#0b1f16]/95',
          tagBg: 'bg-[#0f2e21]',
          text: 'text-emerald-300',
          shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.3)]',
          icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
        };
      case 'player':
        return {
          title: current.speakerName || '见证者 (我)',
          border: 'border-sky-500',
          boxBorder: 'border-sky-700/80',
          bg: 'bg-[#0c1929]/95',
          tagBg: 'bg-[#132840]',
          text: 'text-sky-300',
          shadow: 'shadow-[0_0_15px_rgba(56,189,248,0.25)]',
          icon: <User className="w-3.5 h-3.5 text-sky-400" />,
        };
      case 'corruptor':
        return {
          title: current.speakerName || '蚀墓虫',
          border: 'border-red-600 animate-pulse',
          boxBorder: 'border-red-700/90',
          bg: 'bg-[#260a0a]/95',
          tagBg: 'bg-[#3d0f0f]',
          text: 'text-red-400',
          shadow: 'shadow-[0_0_18px_rgba(239,68,68,0.5)]',
          icon: <Bug className="w-3.5 h-3.5 text-red-500 animate-bounce" />,
        };
      default:
        return {
          title: current.speakerName || '大葆台志',
          border: 'border-[#5c4033]',
          boxBorder: 'border-[#5c4033]',
          bg: 'bg-[#1c130d]/95',
          tagBg: 'bg-[#291b12]',
          text: 'text-[#ffe89c]',
          shadow: 'shadow-md',
          icon: <Sparkles className="w-3.5 h-3.5 text-[#ffe89c]" />,
        };
    }
  };

  const style = getSpeakerStyle();

  const renderAvatar = () => {
    if (current.speaker === 'dancer') {
      return (
        <img
          src={imgJadeDancerAvatar}
          alt="玉舞人"
          className="w-full h-full object-contain p-0.5 filter drop-shadow scale-110"
        />
      );
    }

    if (current.speaker === 'player') {
      return (
        <img
          src={imgWarriorAvatar}
          alt="见证者"
          className="w-full h-full object-cover rounded-full filter contrast-110"
        />
      );
    }

    if (current.speaker === 'pushou') {
      return (
        <img
          src={imgPushouAvatar}
          alt="鎏金铜铺首"
          className="w-full h-full object-cover rounded-full filter contrast-115"
        />
      );
    }

    if (current.speaker === 'corruptor') {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-1">
          {/* Glitch mutant insect avatar */}
          <div className="w-10 h-10 rounded-full bg-red-950/80 border-2 border-red-600 flex items-center justify-center animate-bounce shadow-[0_0_12px_#ef4444]">
            <Bug className="w-6 h-6 text-red-400 animate-pulse" />
          </div>
          <div className="flex gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          </div>
        </div>
      );
    }

    return <Sparkles className="w-8 h-8 text-[#ffe89c]" />;
  };

  return (
    <div className="absolute bottom-2 inset-x-2 z-40 flex items-end gap-2 animate-fade-in pointer-events-auto select-none">
      {/* Left Bottom Character Portrait Box */}
      <div
        onClick={onToggleMinimize}
        className={`relative shrink-0 cursor-pointer transition-all duration-300 ${
          isMinimized ? 'w-9 h-9' : 'w-16 h-20'
        } rounded-2xl bg-[#140e0a]/95 border-2 ${
          style.border
        } flex flex-col items-center justify-center ${style.shadow} overflow-hidden backdrop-blur-md`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {renderAvatar()}
        </div>

        {/* Small character label banner */}
        {!isMinimized && (
          <div className="absolute bottom-0.5 inset-x-1 text-[8px] font-serif text-[#f2e6d6] font-black bg-black/80 text-center py-0.5 rounded truncate">
            {style.title}
          </div>
        )}
      </div>

      {/* Right Bottom Dialogue Bubble Box */}
      <div
        onClick={handleAdvance}
        className={`flex-1 ${style.bg} border-2 ${style.boxBorder} rounded-2xl p-2.5 shadow-2xl backdrop-blur-md cursor-pointer transition-all active:scale-[0.99] flex flex-col justify-between min-h-[70px]`}
      >
        {/* Speaker Info & Step Count */}
        <div className="flex items-center justify-between border-b border-[#3d2b1f]/60 pb-1 mb-1">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black font-serif flex items-center gap-1 ${style.tagBg} ${style.text} border ${style.border}`}>
              {style.icon}
              <span>{style.title}</span>
            </span>
          </div>

          <span className="text-[9px] font-mono text-[#a3805d]">
            {currentIndex + 1}/{dialogues.length} · 点击推进
          </span>
        </div>

        {/* Dialogue Text - 采用古风宋体，字间距略宽，排版优美简洁 */}
        <p className={`text-sm sm:text-[15px] font-ancient-songti font-normal sm:font-medium leading-relaxed tracking-[0.09em] sm:tracking-[0.1em] select-text ${
          current.speaker === 'corruptor' ? 'text-red-300 font-mono font-medium tracking-tight' : 'text-[#fbf2e6]'
        }`}>
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
