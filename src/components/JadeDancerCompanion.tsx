import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { X, Sparkles, BookOpen, Key } from 'lucide-react';

interface JadeDancerCompanionProps {
  memoryText: string;
  clueText: string;
  speakerName?: string;
  hasNewHint?: boolean;
  onOpenHintModal?: () => void;
}

export const JadeDancerCompanion: React.FC<JadeDancerCompanionProps> = ({
  memoryText,
  clueText,
  speakerName = '玉舞人',
  hasNewHint = false,
}) => {
  const [isOpenBubble, setIsOpenBubble] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'memory' | 'clue'>('memory');

  const toggleDialogue = () => {
    soundFX.playStoneDrum();
    setIsOpenBubble(!isOpenBubble);
  };

  return (
    <div className="absolute bottom-2 left-2 z-40 flex items-end gap-1.5 pointer-events-auto select-none">
      {/* Jade Dancer Character Figure (Shrunk by 50%, approx 36x44px) */}
      <div
        onClick={toggleDialogue}
        className="relative cursor-pointer group flex flex-col items-center select-none active:scale-95 transition-transform"
        title="点击玉舞人获取记忆与关卡线索"
      >
        {/* Soft Jade Breathing Halo */}
        <div className="absolute inset-0 -m-0.5 rounded-full bg-[#88b598]/25 blur-sm animate-pulse pointer-events-none" />

        {/* Scaled-down 50% S-curve Han Jade Dancer */}
        <div className="relative w-8 h-10 flex items-center justify-center">
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full filter drop-shadow-[0_0_6px_rgba(180,240,200,0.85)] group-hover:scale-105 transition-transform"
          >
            <defs>
              <linearGradient id="miniJadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8f8ec" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#a8d4b5" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#5c8a6b" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            <path
              d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
              fill="none"
              stroke="url(#miniJadeGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="14" r="9" fill="#e8f8ec" />
            <circle cx="50" cy="14" r="14" fill="none" stroke="#ffe89c" strokeWidth="1.5" strokeDasharray="3,3" className="animate-spin" />
            <circle cx="20" cy="40" r="4" fill="#ffe89c" className="animate-ping" />
          </svg>

          {/* New Hint Sleeves Pulse Indicator */}
          {hasNewHint && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffe89c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d2b48c] text-[7px] font-black text-[#1a120b] items-center justify-center">
                !
              </span>
            </span>
          )}
        </div>

        {/* Miniature Bottom Tag */}
        <span className="mt-0.5 px-1 py-0.2 bg-[#241a13]/90 border border-[#5c4033] rounded-full text-[8px] font-serif font-bold text-[#ffe89c] shadow leading-none tracking-tighter">
          {speakerName}
        </span>
      </div>

      {/* Concise One-Sentence Chat Bubble Modal with Two Tabs */}
      {isOpenBubble && (
        <div className="w-52 p-2.5 bg-[#241a13]/95 border border-[#d2b48c]/60 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-serif text-[#e6d5b8] space-y-1.5 animate-fade-in relative ring-1 ring-[#ffe89c]/20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenBubble(false);
            }}
            className="absolute top-1.5 right-1.5 text-[#a3805d] hover:text-[#e6d5b8]"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Two Option Tabs: 玉舞人记忆 vs 关卡线索 */}
          <div className="flex items-center gap-1 border-b border-[#3d2b1f] pb-1 pr-4">
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setActiveTab('memory');
              }}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold flex items-center gap-0.5 transition-all ${
                activeTab === 'memory'
                  ? 'bg-[#3d2b1f] text-[#ffe89c] border border-[#d2b48c]/40'
                  : 'text-[#8c7561] hover:text-[#c2a385]'
              }`}
            >
              <BookOpen className="w-2.5 h-2.5" />
              <span>玉舞人记忆</span>
            </button>

            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setActiveTab('clue');
              }}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold flex items-center gap-0.5 transition-all ${
                activeTab === 'clue'
                  ? 'bg-[#3d2b1f] text-[#ffe89c] border border-[#d2b48c]/40'
                  : 'text-[#8c7561] hover:text-[#c2a385]'
              }`}
            >
              <Key className="w-2.5 h-2.5" />
              <span>关卡线索</span>
            </button>
          </div>

          {/* Display Exactly ONE Sentence Response */}
          <div className="min-h-[32px] flex items-center">
            <p className="text-[10px] text-[#e6d5b8] font-ancient-songti leading-relaxed tracking-[0.09em]">
              {activeTab === 'memory' ? `“${memoryText}”` : `“${clueText}”`}
            </p>
          </div>

          <div className="flex items-center justify-between pt-0.5 text-[8px] text-[#a3805d] font-mono border-t border-[#3d2b1f]/60">
            <span className="flex items-center gap-0.5 text-[#ffe89c]">
              <Sparkles className="w-2 h-2 text-[#ffe89c]" /> 提炼线索
            </span>
            <span>点击收起</span>
          </div>
        </div>
      )}
    </div>
  );
};
