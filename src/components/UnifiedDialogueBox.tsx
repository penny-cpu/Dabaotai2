import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, HelpCircle, X, ChevronUp, ChevronDown } from 'lucide-react';
import { DialogueLine, SpeakerRole } from '../types';
import { soundFX } from '../utils/soundEngine';

// =========================================================================
// 🚨【聊天框左上角人物头像图片配置位置 (方便一键查找与替换)】🚨
// 提示：可以在此替换玉舞人、广阳王等角色头像图片路径，支持本地图片或网络图片
// =========================================================================
import imgJadeDancerAvatar from '../assets/images/jade_dancer_real_photo_cutout.png';
import imgPushouAvatar from '../assets/images/dabaotai_hall_entrance_bg.jpg';
import imgWarriorAvatar from '../assets/images/han_warrior_brick_1788598169002.jpg';
import imgBaixiAvatar from '../assets/images/han_paiyou_tiaowan_bg_1788620031860.jpg';

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
        hintText || '细察形制纹样，答案藏于礼乐中。',
        '多留心器物结构与出土位置。',
        '依汉家仪轨，选契合之物。',
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
          className="relative w-full rounded-none border-t border-[#8F6A30]/35 bg-[#3A2116]/95 px-4 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col justify-between min-h-[114px] sm:min-h-[120px] cursor-pointer transition-all"
        >
          {/* Avatar positioned overlapping the top-left border */}
          <div className="absolute -top-4 left-3.5 z-10 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#160D09] border border-[#D6A84B] p-0.5 flex items-center justify-center shadow-md backdrop-blur-sm overflow-hidden">
              <img
                src={imgJadeDancerAvatar}
                alt="玉舞人"
                className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] scale-110"
              />
            </div>
            <div className="px-2 py-0.5 rounded-full border border-[#D6A84B]/60 bg-[#160D09] text-[#79B9A1] text-[9px] font-serif font-black shadow-md tracking-wider mt-1 flex items-center gap-1">
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
            <div className="mt-3 flex-1 flex flex-col items-center justify-center text-center px-2">
              <button
                onClick={handleEnterNormalHints}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#6E3024] via-[#8C4334] to-[#6E3024] border border-[#D6A84B] text-[#F1D98D] text-xs sm:text-sm font-serif font-black tracking-wider shadow-[0_0_18px_rgba(214,168,75,0.45)] animate-pulse flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F1D98D]" />
                <span>玉舞人可以帮助提示</span>
              </button>
              {errorTip && (
                <p className="text-[11px] text-[#E6D3AA]/90 font-serif mt-1 line-clamp-1">
                  {errorTip}
                </p>
              )}
            </div>
          ) : (
            /* NORMAL DETAILED HINT TEXT - 古风宋体，字间距略宽，排版优雅简洁 */
            <div className="mt-2.5 flex-1 flex flex-col justify-center px-1 overflow-hidden">
              <p className="text-sm sm:text-[15px] text-[#F3E7CE] font-ancient-songti font-medium leading-relaxed tracking-[0.09em] sm:tracking-[0.1em] line-clamp-2 drop-shadow">
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
          avatarElement: (
            <img
              src={imgJadeDancerAvatar}
              alt="玉舞人"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] scale-110"
            />
          ),
        };
      case 'pushou':
        return {
          title: name || '鎏金铜铺首',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#A9782B]/60',
          boxBg: 'bg-[#3A2116]/95 border-[#A9782B]/60',
          avatarElement: (
            <img
              src={imgPushouAvatar}
              alt="鎏金铜铺首"
              className="w-full h-full object-cover rounded-full filter contrast-110 brightness-90"
            />
          ),
        };
      case 'player':
        return {
          title: name || '广阳王刘建',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#C8943D]/60',
          boxBg: 'bg-[#3A2116]/95 border-[#A9782B]/60',
          avatarElement: (
            <img
              src={imgWarriorAvatar}
              alt="广阳王刘建"
              className="w-full h-full object-cover rounded-full filter contrast-115"
            />
          ),
        };
      case 'corruptor':
        return {
          title: name || '俳优 / 文物自述',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#9B3D2E]/60',
          boxBg: 'bg-[#3A2116]/95 border-[#9B3D2E]/60',
          avatarElement: (
            <img
              src={imgBaixiAvatar}
              alt="俳优"
              className="w-full h-full object-cover rounded-full filter contrast-115"
            />
          ),
        };
      case 'narrator':
      default:
        return {
          title: name || '汉代时空印记 · 考工记',
          badgeColor: 'bg-[#160D09] text-[#E6D3AA] border-[#A9782B]/50',
          boxBg: 'bg-[#3A2116]/95 border-[#A9782B]/50',
          avatarElement: (
            <img
              src={imgJadeDancerAvatar}
              alt="汉代时空印记"
              className="w-full h-full object-contain filter drop-shadow scale-110"
            />
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
        className={`relative w-full rounded-none border-t border-[#8F6A30]/35 ${details.boxBg} px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[112px] sm:min-h-[118px]`}
      >
        {/* Avatar positioned overlapping the top-left border */}
        <div className="absolute -top-4 left-3.5 z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#160D09] border border-[#A9782B] p-0.5 flex items-center justify-center shadow-md backdrop-blur-sm overflow-hidden">
            {details.avatarElement}
          </div>
          <div className="px-2 py-0.5 rounded-full border text-[9.5px] font-serif font-bold shadow-md tracking-wider mt-1">
            <span className={`px-2 py-0.5 rounded-full border ${details.badgeColor}`}>
              {details.title}
            </span>
          </div>
        </div>

        {/* Text Content Area - 采用古风宋体，字间距略宽，字号维持标题适中大小 */}
        <div className="mt-2 flex-1 flex flex-col justify-center px-1 overflow-hidden">
          <p className="text-sm sm:text-[15px] text-[#F3E7CE] font-ancient-songti font-normal sm:font-medium leading-relaxed tracking-[0.09em] sm:tracking-[0.1em] line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
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


