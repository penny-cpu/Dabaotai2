import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, RotateCcw, AlertTriangle, Play, Delete } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';

interface Stage6HuangchangProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const TARGET_CODE = ['1', '5', '5', '8', '0'];

const DIALOGUES_6: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '一根木头守不住墓室。让我请他们回来，一起告诉你答案。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '记住动作出现的先后，不要把同一个姿态拆成两个数字。',
  },
];

export const Stage6Huangchang: React.FC<Stage6HuangchangProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [inputDigits, setInputDigits] = useState<string[]>([]);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showDanceVideo, setShowDanceVideo] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const handleDigitClick = (digit: string) => {
    soundFX.playStoneDrum();
    soundFX.playTimberDrop();

    if (inputDigits.length < 5) {
      const nextInput = [...inputDigits, digit];
      setInputDigits(nextInput);

      // If full 5 digits entered, check code
      if (nextInput.length === 5) {
        const isMatch = nextInput.every((d, idx) => d === TARGET_CODE[idx]);
        if (isMatch) {
          soundFX.playBronzeChime();
          soundFX.playMemoryRestore();
          setIsSuccess(true);
          onUnlockFragment();
        } else {
          soundFX.playGlitchStatic();
          soundFX.playInsectEating();
          setShowCorruption(true);
          setTimeout(() => {
            setShowCorruption(false);
            // Clear current erroneous slot
            setInputDigits([]);
          }, 1400);
        }
      }
    }
  };

  const handleBackspace = () => {
    soundFX.playStoneDrum();
    setInputDigits(inputDigits.slice(0, -1));
  };

  return (
    <div className="relative w-full h-full bg-[#140e0a] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="数字槽出现黑色裂纹并清空 · 蚀墓虫侵蚀木构密码"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#20150e] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 6 · HUANGCHANG TIMBER ARRAY
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第六关 · 木阵 (黄肠题凑 15880 考工)
          </h2>
        </div>

        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#2a1a0f] text-[#88b598] border border-[#5c4033]">
          {isSuccess ? '木构已合拢 100%' : '密码输入中'}
        </span>
      </div>

      {/* Main Timber Array Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Collapsing Huangchang Timbers & Rebuilding Visual Box */}
        <div className="relative w-full h-44 rounded-3xl bg-[#1c130d] border-2 border-[#5c4033] overflow-hidden flex flex-col items-center justify-center p-3 shadow-2xl">
          {/* Timber Cross Section Graphic Grid */}
          <div className="grid grid-cols-8 gap-1.5 opacity-80">
            {Array.from({ length: 24 }).map((_, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-md border flex items-center justify-center text-[7px] font-mono transition-all duration-500 ${
                  isSuccess
                    ? 'bg-amber-900/90 border-amber-500 text-amber-200 shadow-md'
                    : 'bg-[#291a10] border-[#5c4033] text-[#7a5538]'
                }`}
              >
                ◎
              </div>
            ))}
          </div>

          <div className="mt-2 text-center">
            <span className="text-[10px] text-[#ffe89c] font-black">
              {isSuccess
                ? '一万五千八百八十根黄心柏木重新合拢！'
                : '蚀墓虫沿木缝扩散，输入舞姿密码重构黄肠题凑'}
            </span>
          </div>

          {/* Dance Video Hint Trigger Button */}
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowDanceVideo(true);
            }}
            className="mt-1.5 px-3 py-1 bg-[#291b12] hover:bg-[#3d2b1f] rounded-full border border-amber-600 text-[9px] text-[#ffe89c] flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5" />
            <span>观看舞人协作舞蹈提示 (数字密码)</span>
          </button>
        </div>

        {/* 5 Digit Input Slots (1 - 5 - 5 - 8 - 0) */}
        <div className="flex items-center justify-center gap-2 my-2">
          {[0, 1, 2, 3, 4].map((idx) => {
            const val = inputDigits[idx];
            return (
              <div
                key={idx}
                className={`w-11 h-12 rounded-xl border-2 flex items-center justify-center text-base font-mono font-black transition-all ${
                  val
                    ? 'bg-[#291a10] border-[#ffe89c] text-[#ffe89c] shadow-lg scale-105'
                    : 'bg-[#140e0a] border-dashed border-[#5c4033] text-[#554030]'
                }`}
              >
                {val || '-'}
              </div>
            );
          })}
        </div>

        {/* 0-9 Number Keypad Wheel */}
        <div className="w-full bg-[#1c130d] border-2 border-[#3d2b1f] p-2 rounded-2xl shadow-xl z-10">
          <div className="grid grid-cols-6 gap-1.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
              <button
                key={num}
                onClick={() => handleDigitClick(num)}
                className="py-2 bg-[#291b12] hover:bg-[#3d2b1f] text-[#ffe89c] font-mono font-bold text-xs rounded-xl border border-[#5c4033] shadow active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              className="py-2 col-span-2 bg-[#2d1414] hover:bg-[#4a1f1f] text-red-300 font-serif font-bold text-[10px] rounded-xl border border-red-800 shadow active:scale-95 flex items-center justify-center gap-0.5"
            >
              <Delete className="w-3.5 h-3.5" />
              <span>回退</span>
            </button>
          </div>
        </div>

        {/* Next Chapter Button if Solved */}
        {isSuccess && (
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              onNextPage();
            }}
            className="w-full mt-2 py-2.5 bg-[#1b2a1e] hover:bg-[#253d2b] text-[#88b598] font-serif font-black rounded-2xl border-2 border-[#88b598] text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5 z-20"
          >
            <span>第六块碎片归位 · 前往第七关星路</span>
          </button>
        )}
      </div>

      {/* Dance Video Modal */}
      {showDanceVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in">
          <div className="text-center mt-4">
            <span className="text-[9px] font-mono text-[#88b598] tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              DANCE VIDEO HINT · 舞人协作密码
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2 font-serif">
              五组舞姿依次代表：1 — 5 — 5 — 8 — 0
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <div className="text-xl font-mono font-black text-amber-300 tracking-widest bg-black/70 py-2 rounded-xl border border-amber-500/50">
                1 · 5 · 5 · 8 · 0
              </div>
              <p className="text-[11px] text-[#e8f8ec] font-serif leading-relaxed">
                “舞人站成矩阵，手势先后比出 1, 5, 5, 8, 0，代表着大葆台一号墓 15880 根坚不可摧的黄肠柏木题凑！”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowDanceVideo(false);
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>记住了 · 返回输入数字</span>
          </button>
        </div>
      )}

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={DIALOGUES_6}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < DIALOGUES_6.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={6}
        />
      )}
    </div>
  );
};
