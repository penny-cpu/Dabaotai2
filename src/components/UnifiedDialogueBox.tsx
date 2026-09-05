import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, HelpCircle, X, ChevronUp, ChevronDown } from 'lucide-react';
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
  // Collapsed state for interactive mode: initially collapsed downwards (向下缩隐藏)
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // Center prompt mode: when error triggers, shows "玉舞人可以帮助提示" centered in box
  const [showCenterHelpPrompt, setShowCenterHelpPrompt] = useState<boolean>(false);
  // 3-Level Progressive Hint State: 1 = Level 1, 2 = Level 2, 3 = Level 3
  const [hintLevel, setHintLevel] = useState<number>(1);

  // Normalize hints array to 3 items
  const resolvedHints: string[] = hints && hints.length > 0
    ? hints
    : [
        hintText || '仔细观察文物的形制与纹样，答案就藏在汉代礼乐之中……',
        '多留心器物的特殊结构、出土位置与历史记载。',
        '根据汉代宗庙与列侯仪轨，选出最契合之物。',
      ];

  // Auto-expand and show center help button when an error occurs
  useEffect(() => {
    if (isInteractiveMode && errorTip) {
      soundFX.playStoneDrum();
      setIsExpanded(true);
      setShowCenterHelpPrompt(true);
    }
  }, [errorTip, isInteractiveMode]);

  const handleAdvanceHint = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playStoneDrum();
    soundFX.playBronzeChime();
    setHintLevel((prev) => (prev < 3 ? prev + 1 : 1));
  };

  const handleEnterNormalHints = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playBronzeChime();
    setShowCenterHelpPrompt(false);
    if (onClearError) onClearError();
  };

  // If in interactive mode: render Jade Dancer companion box
  if (isInteractiveMode) {
    // If collapsed: show compact bottom peek pill
    if (!isExpanded) {
      return (
        <div className="absolute inset-x-0 bottom-0 z-40 p-2.5 pb-3 flex justify-center pointer-events-auto select-none animate-fade-in">
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setIsExpanded(true);
              setShowCenterHelpPrompt(false);
            }}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A170F]/95 hover:bg-[#3D2319] border border-[#D6A84B]/70 shadow-[0_4px_15px_rgba(0,0,0,0.6)] text-[#F1D98D] text-xs font-serif font-black tracking-wider transition-all active:scale-95"
          >
            <div className="w-5 h-5 rounded-full bg-[#160D09] border border-[#D6A84B] p-0.5 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#D6A84B]" />
            </div>
            <span>玉舞人线索提示</span>
            <ChevronUp className="w-3.5 h-3.5 text-[#D6A84B] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      );
    }

    // Expanded Interactive Dialogue Box
    const hintIdx = Math.min(hintLevel - 1, resolvedHints.length - 1);
    const currentHint = resolvedHints[hintIdx] || resolvedHints[0];

    return (
      <div className="absolute inset-x-0 bottom-0 z-40 p-0 pointer-events-auto flex flex-col justify-end select-none animate-slide-up">
        {/* Dialogue Box Container (Standardized h-[134px] Full-Width Edge-to-Edge with Han Tomb Archival Aesthetic) */}
        <div
          onClick={() => {
            if (showCenterHelpPrompt) {
              handleEnterNormalHints();
            } else {
              handleAdvanceHint();
            }
          }}
          className="relative w-full rounded-none border-t border-[#8F6A30]/35 bg-[#3A2116]/95 px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col justify-between h-[134px] cursor-pointer transition-all"
        >
          {/* Avatar positioned overlapping the top-left border */}
          <div className="absolute -top-5 left-3.5 z-10 flex items-center gap-2">
            <div className="w-11 h-11 rounded-full bg-[#160D09] border border-[#D6A84B] p-1 flex items-center justify-center shadow-md backdrop-blur-sm">
              <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                <path
                  d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                  fill="none"
                  stroke="#79B9A1"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="18" r="5.5" fill="#E6D3AA" />
              </svg>
            </div>
            <div className="px-2.5 py-0.5 rounded-full border border-[#D6A84B]/60 bg-[#160D09] text-[#79B9A1] text-[9px] font-serif font-black shadow-md tracking-wider mt-2 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#D6A84B]" />
              <span>{showCenterHelpPrompt ? '玉舞人轻语' : `考工线索 (${hintLevel}/3)`}</span>
            </div>
          </div>

          {/* Minimize / Collapse Button (Top-Right) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playStoneDrum();
              setIsExpanded(false);
            }}
            className="absolute top-2 right-2.5 p-1 rounded-full text-[#A89078] hover:text-[#F1D98D] hover:bg-white/10 transition-colors z-20"
            title="向下收起"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Main Content Area */}
          {showCenterHelpPrompt ? (
            /* CENTER HELP BUTTON ON WRONG SELECTION / ERROR TRIGGER */
            <div className="mt-4 flex-1 flex flex-col items-center justify-center text-center px-2">
              <button
                onClick={handleEnterNormalHints}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#6E3024] via-[#8C4334] to-[#6E3024] border border-[#D6A84B] text-[#F1D98D] text-xs sm:text-sm font-serif font-black tracking-wider shadow-[0_0_18px_rgba(214,168,75,0.45)] animate-pulse flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F1D98D]" />
                <span>玉舞人可以帮助提示</span>
              </button>
              {errorTip && (
                <p className="text-[10px] text-[#E6D3AA]/90 font-serif mt-1 line-clamp-1">
                  {errorTip}
                </p>
              )}
            </div>
          ) : (
            /* NORMAL DETAILED HINT TEXT */
            <div className="mt-3.5 flex-1 flex flex-col justify-center px-0.5 overflow-hidden">
              <p className="text-[12px] sm:text-[12.5px] text-[#E6D3AA] font-serif leading-relaxed tracking-wide line-clamp-3">
                {currentHint}
              </p>
            </div>
          )}

          {/* Bottom Companion Status & 3-Level Hint Interactive Trigger */}
          <div className="flex items-center justify-between border-t border-[#6E3024]/40 pt-1 mt-0.5 text-[8.5px] font-mono">
            {showCenterHelpPrompt ? (
              <span className="text-[#C8943D] text-[9px] font-serif">点击按钮查看考工线索</span>
            ) : (
              <div className="flex items-center gap-1.5 text-[#A9782B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8943D] opacity-80" />
                <span>
                  {hintLevel === 3
                    ? '已揭示全部考工线索'
                    : `已显示第 ${hintLevel} 级考工线索`}
                </span>
              </div>
            )}

            {/* Hint Level Progress Dots / Button */}
            {!showCenterHelpPrompt && (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 mr-1">
                  {[1, 2, 3].map((lvl) => (
                    <div
                      key={lvl}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        hintLevel >= lvl
                          ? 'bg-[#C8943D] shadow-[0_0_4px_#C8943D]'
                          : 'bg-[#160D09] border border-[#6E3024]'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleAdvanceHint}
                  className="px-2 py-0.5 rounded-full bg-[#160D09] hover:bg-[#6E3024]/60 text-[#E6D3AA] border border-[#A9782B]/60 text-[8px] font-serif font-black flex items-center gap-1 shadow transition-all active:scale-95"
                >
                  <Sparkles className="w-2 h-2 text-[#C8943D]" />
                  <span>
                    {hintLevel === 1
                      ? '下一级线索 (1/3)'
                      : hintLevel === 2
                      ? '终极线索 (2/3)'
                      : '重览线索 (3/3)'}
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

  // Helper avatar and title renderer with Han Dynasty museum design system
  const getSpeakerDetails = (speaker: SpeakerRole = 'dancer', name: string = '') => {
    switch (speaker) {
      case 'dancer':
        return {
          title: name || '玉舞人',
          badgeColor: 'bg-[#160D09] text-[#79B9A1] border-[#A9782B]/60',
          boxBg: 'bg-[#3A2116]/95 border-[#A9782B]/60',
          avatarSvg: (
            <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <path
                d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                fill="none"
                stroke="#79B9A1"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="50" cy="18" r="5.5" fill="#E6D3AA" />
            </svg>
          ),
        };
      case 'pushou':
        return {
          title: name || '鎏金铜铺首',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#A9782B]/60',
          boxBg: 'bg-[#3A2116]/95 border-[#A9782B]/60',
          avatarSvg: (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#C8943D] stroke-[#6E3024]">
              <circle cx="50" cy="50" r="42" fill="#3A2116" stroke="#A9782B" strokeWidth="2.5" />
              <path d="M25 35 Q50 15 75 35 Q50 30 25 35" fill="#A9782B" />
              <circle cx="38" cy="45" r="5.5" fill="#E6D3AA" />
              <circle cx="62" cy="45" r="5.5" fill="#E6D3AA" />
              <circle cx="38" cy="45" r="2" fill="#160D09" />
              <circle cx="62" cy="45" r="2" fill="#160D09" />
              <path d="M44 55 Q50 50 56 55 Q50 65 44 55" fill="#6E3024" />
              <circle cx="50" cy="72" r="14" fill="none" stroke="#C8943D" strokeWidth="3.5" />
            </svg>
          ),
        };
      case 'player':
        return {
          title: name || '广阳王刘建',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#C8943D]/60',
          boxBg: 'bg-[#3A2116]/95 border-[#A9782B]/60',
          avatarSvg: (
            <div className="w-full h-full rounded-full bg-[#6E3024]/80 border border-[#A9782B] flex items-center justify-center text-[#E6D3AA] text-xs font-serif font-black shadow-inner">
              王
            </div>
          ),
        };
      case 'corruptor':
        return {
          title: name || '俳优 / 文物自述',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#9B3D2E]/60',
          boxBg: 'bg-[#3A2116]/95 border-[#9B3D2E]/60',
          avatarSvg: (
            <div className="w-full h-full rounded-full bg-[#6E3024] border border-[#9B3D2E] flex items-center justify-center text-[#E6D3AA] text-xs font-serif font-bold">
              戏
            </div>
          ),
        };
      case 'narrator':
      default:
        return {
          title: name || '汉代时空印记 · 考工记',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#A9782B]/50',
          boxBg: 'bg-[#3A2116]/95 border-[#A9782B]/50',
          avatarSvg: (
            <div className="w-full h-full rounded-full bg-[#160D09] border border-[#A9782B]/60 flex items-center justify-center text-[#E6D3AA] text-xs font-serif font-black">
              汉
            </div>
          ),
        };
    }
  };

  const details = getSpeakerDetails(currentLine?.speaker, currentLine?.speakerName);

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 p-0 pointer-events-auto flex flex-col justify-end select-none animate-slide-up">
      {/* Dialogue Box Container (Standardized h-[132px] Full-Width Edge-to-Edge) */}
      <div
        onClick={() => {
          soundFX.playStoneDrum();
          onNext();
        }}
        className={`relative w-full rounded-none border-t border-[#8F6A30]/35 ${details.boxBg} px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer transition-all duration-300 flex flex-col justify-between h-[132px]`}
      >
        {/* Avatar positioned overlapping the top-left border */}
        <div className="absolute -top-5 left-3.5 z-10 flex items-center gap-2">
          <div className="w-11 h-11 rounded-full bg-[#160D09] border border-[#A9782B] p-1 flex items-center justify-center shadow-md backdrop-blur-sm">
            {details.avatarSvg}
          </div>
          <div className="px-2.5 py-0.5 rounded-full border text-[9px] font-serif font-black shadow-md tracking-wider mt-2">
            <span className={`px-2 py-0.5 rounded-full border ${details.badgeColor}`}>
              {details.title}
            </span>
          </div>
        </div>

        {/* Text Content Area */}
        <div className="mt-3.5 flex-1 flex flex-col justify-center px-0.5 overflow-hidden">
          <p className="text-[12px] sm:text-[13px] text-[#E6D3AA] font-serif leading-relaxed tracking-wide line-clamp-3">
            {currentLine.text}
          </p>
        </div>

        {/* Bottom Pagination & Next Arrow */}
        <div className="flex items-center justify-between border-t border-[#6E3024]/40 pt-1 mt-0.5">
          <span className="text-[8px] font-mono text-[#A9782B]">
            {currentIndex + 1} / {safeDialogues.length}
          </span>
          <div className="flex items-center gap-1 text-[9px] font-serif text-[#E6D3AA] font-black">
            <span>点击继续</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8943D]" />
          </div>
        </div>
      </div>
    </div>
  );
};


