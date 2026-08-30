import React, { useState } from 'react';
import { ChevronRight, Sparkles, HelpCircle, X } from 'lucide-react';
import { DialogueLine, SpeakerRole } from '../types';
import { soundFX } from '../utils/soundEngine';

interface UnifiedDialogueBoxProps {
  dialogues?: DialogueLine[];
  currentIndex?: number;
  onNext?: () => void;
  isInteractiveMode?: boolean; // When true, displays Jade Dancer's companion prompt in the same standardized dialogue box
  hints?: string[];           // Array of 3-level progressive hints
  hintText?: string;          // Fallback single hint
  errorTip?: string;          // When user makes a wrong selection, gentle prompt e.g. "再想想……"
  onClearError?: () => void;
  onSkip?: () => void;
}

export const UnifiedDialogueBox: React.FC<UnifiedDialogueBoxProps> = ({
  dialogues = [],
  currentIndex = 0,
  onNext = () => {},
  isInteractiveMode = false,
  hints,
  hintText,
  errorTip,
  onClearError,
}) => {
  // 3-Level Progressive Hint State: 0 = not revealed ("玉舞人可以提示，帮助选出正确答案"), 1 = Level 1, 2 = Level 2, 3 = Level 3
  const [hintLevel, setHintLevel] = useState<number>(0);

  // Normalize hints array to 3 items
  const resolvedHints: string[] = hints && hints.length > 0
    ? hints
    : [
        hintText || '仔细观察文物的形制与纹样，答案就藏在汉代礼乐之中……',
        '多留心器物的特殊结构、出土位置与历史记载。',
        '根据汉代宗庙与列侯仪轨，选出最契合之物。',
      ];

  const handleAdvanceHint = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playStoneDrum();
    soundFX.playBronzeChime();
    setHintLevel((prev) => (prev < 3 ? prev + 1 : 1));
  };

  // If in interactive mode: render Jade Dancer with identical standardized layout (h-[132px])
  if (isInteractiveMode) {
    let activeText = '';
    let badgeText = '玉舞人指引';

    if (errorTip) {
      activeText = errorTip;
      badgeText = '玉舞人轻语';
    } else if (hintLevel === 0) {
      activeText = '玉舞人可以提示，帮助选出正确答案。';
      badgeText = '玉舞人助手';
    } else {
      const idx = Math.min(hintLevel - 1, resolvedHints.length - 1);
      activeText = resolvedHints[idx] || resolvedHints[0];
      badgeText = `玉舞人提示 (${hintLevel}/3)`;
    }

    return (
      <div className="absolute inset-x-0 bottom-0 z-40 p-3 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-auto flex flex-col justify-end select-none animate-slide-up">
        {/* Dialogue Box Container (Standardized h-[132px]) */}
        <div
          onClick={() => {
            if (!errorTip) {
              handleAdvanceHint();
            }
          }}
          className={`relative w-full rounded-3xl bg-gradient-to-br from-[#192b20] to-[#0f1a14] border-2 border-emerald-500/80 p-3.5 pt-3 shadow-2xl backdrop-blur-md flex flex-col justify-between h-[132px] cursor-pointer transition-all hover:border-emerald-400`}
        >
          {/* Avatar positioned overlapping the top-left border */}
          <div className="absolute -top-6 left-4 z-10 flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#120a06] border-2 border-emerald-400 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.7)] backdrop-blur-sm">
              <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse">
                <path
                  d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="18" r="6" fill="#ffffff" />
              </svg>
            </div>
            <div className="px-2.5 py-0.5 rounded-full border border-emerald-500 bg-emerald-950/90 text-emerald-300 text-[9px] font-serif font-black shadow-md tracking-wider mt-3 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
              <span>{badgeText}</span>
            </div>
          </div>

          {/* Text Content Area */}
          <div className="mt-4 flex-1 flex flex-col justify-center px-1 overflow-hidden">
            <p className={`text-[12px] sm:text-[13px] font-serif leading-relaxed tracking-wide line-clamp-3 ${
              errorTip ? 'text-amber-200 font-bold' : hintLevel === 0 ? 'text-[#c2e4d0]' : 'text-[#f2e6d0]'
            }`}>
              {activeText}
            </p>
          </div>

          {/* Bottom Companion Status & 3-Level Hint Interactive Trigger */}
          <div className="flex items-center justify-between border-t border-emerald-800/50 pt-1 mt-1 text-[8.5px] font-mono">
            {errorTip ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClearError) onClearError();
                }}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-0.5 text-[8px] font-sans"
              >
                <span>清除错误提示</span>
                <X className="w-2.5 h-2.5" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {hintLevel === 0
                    ? '点击对话框获取提示'
                    : hintLevel === 3
                    ? '已出全部三级提示'
                    : `已显示第 ${hintLevel} 级提示`}
                </span>
              </div>
            )}

            {/* Hint Level Progress Dots / Button */}
            {!errorTip && (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 mr-1">
                  {[1, 2, 3].map((lvl) => (
                    <div
                      key={lvl}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        hintLevel >= lvl
                          ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                          : 'bg-emerald-950 border border-emerald-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleAdvanceHint}
                  className="px-2 py-0.5 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/70 text-[8px] font-serif font-black flex items-center gap-1 shadow transition-all active:scale-95"
                >
                  <Sparkles className="w-2 h-2 text-emerald-400" />
                  <span>
                    {hintLevel === 0
                      ? '获取提示'
                      : hintLevel === 1
                      ? '下一级提示 (1/3)'
                      : hintLevel === 2
                      ? '终极线索 (2/3)'
                      : '重新查看 (3/3)'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const safeDialogues = dialogues && dialogues.length > 0
    ? dialogues
    : [{ speaker: 'dancer' as SpeakerRole, text: '', speakerName: '玉舞人' }];
  const safeIndex = Math.min(Math.max(0, currentIndex || 0), safeDialogues.length - 1);
  const currentLine = safeDialogues[safeIndex] || safeDialogues[0];

  // Helper avatar and title renderer
  const getSpeakerDetails = (speaker: SpeakerRole = 'dancer', name: string = '') => {
    switch (speaker) {
      case 'dancer':
        return {
          title: name || '玉舞人',
          badgeColor: 'bg-emerald-950/90 text-emerald-300 border-emerald-500',
          boxBg: 'from-[#192b20] to-[#0f1a14] border-emerald-500/80',
          avatarSvg: (
            <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse">
              <path
                d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                fill="none"
                stroke="#a7f3d0"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <circle cx="50" cy="18" r="6" fill="#ffffff" />
            </svg>
          ),
        };
      case 'pushou':
        return {
          title: name || '鎏金铜铺首',
          badgeColor: 'bg-amber-950/90 text-amber-300 border-amber-500',
          boxBg: 'from-[#2e1d13] to-[#1a0f0a] border-amber-500/80',
          avatarSvg: (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-amber-400 stroke-amber-700">
              <circle cx="50" cy="50" r="42" fill="#3a2211" stroke="#b45309" strokeWidth="3" />
              <path d="M25 35 Q50 15 75 35 Q50 30 25 35" fill="#d97706" />
              <circle cx="38" cy="45" r="5.5" fill="#fef3c7" />
              <circle cx="62" cy="45" r="5.5" fill="#fef3c7" />
              <circle cx="38" cy="45" r="2" fill="#78350f" />
              <circle cx="62" cy="45" r="2" fill="#78350f" />
              <path d="M44 55 Q50 50 56 55 Q50 65 44 55" fill="#b45309" />
              <circle cx="50" cy="72" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" />
            </svg>
          ),
        };
      case 'player':
        return {
          title: name || '广阳王刘建',
          badgeColor: 'bg-amber-950/90 text-amber-200 border-amber-600',
          boxBg: 'from-[#331c0e] to-[#1c0f07] border-amber-600/90',
          avatarSvg: (
            <div className="w-full h-full rounded-full bg-amber-900/60 border border-amber-400 flex items-center justify-center text-amber-200 text-xs font-serif font-black shadow-inner">
              王
            </div>
          ),
        };
      case 'corruptor':
        return {
          title: name || '俳优 / 文物自述',
          badgeColor: 'bg-red-950/90 text-red-300 border-red-500',
          boxBg: 'from-[#2e0e0e] to-[#170505] border-red-500/80',
          avatarSvg: (
            <div className="w-full h-full rounded-full bg-red-950 border border-red-500 flex items-center justify-center text-red-300 text-xs font-mono font-bold">
              戏
            </div>
          ),
        };
      case 'narrator':
      default:
        return {
          title: name || '汉代时空印记 · 旁白',
          badgeColor: 'bg-stone-900/90 text-stone-300 border-stone-600',
          boxBg: 'from-[#1f1a17] to-[#120f0d] border-stone-600/80',
          avatarSvg: (
            <div className="w-full h-full rounded-full bg-stone-800 border border-stone-500 flex items-center justify-center text-amber-200 text-xs font-serif font-black">
              汉
            </div>
          ),
        };
    }
  };

  const details = getSpeakerDetails(currentLine?.speaker, currentLine?.speakerName);

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 p-3 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-auto flex flex-col justify-end select-none animate-slide-up">
      {/* Dialogue Box Container (统一度量高度约 130px) */}
      <div
        onClick={() => {
          soundFX.playStoneDrum();
          onNext();
        }}
        className={`relative w-full rounded-3xl bg-gradient-to-br ${details.boxBg} border-2 p-3.5 pt-3 shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 flex flex-col justify-between h-[132px]`}
      >
        {/* Avatar positioned overlapping the top-left border */}
        <div className="absolute -top-6 left-4 z-10 flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-[#120a06] border-2 border-emerald-400 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.7)] backdrop-blur-sm">
            {details.avatarSvg}
          </div>
          <div className="px-2.5 py-0.5 rounded-full border text-[9px] font-serif font-black shadow-md tracking-wider mt-3">
            <span className={`px-2 py-0.5 rounded-full border ${details.badgeColor}`}>
              {details.title}
            </span>
          </div>
        </div>

        {/* Text Content Area */}
        <div className="mt-4 flex-1 flex flex-col justify-center px-1 overflow-hidden">
          <p className="text-[12px] sm:text-[13px] text-[#f2e6d0] font-serif leading-relaxed tracking-wide line-clamp-3">
            {currentLine.text}
          </p>
        </div>

        {/* Bottom Pagination & Next Arrow */}
        <div className="flex items-center justify-between border-t border-[#3d2b1f]/60 pt-1 mt-1">
          <span className="text-[8px] font-mono text-[#8c6b4e]">
            {currentIndex + 1} / {safeDialogues.length}
          </span>
          <div className="flex items-center gap-1 text-[9px] font-serif text-[#ffe89c] font-black animate-pulse">
            <span>点击继续</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

