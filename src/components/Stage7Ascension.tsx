import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, RotateCw, AlertTriangle, ArrowRight } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';

interface Stage7AscensionProps {
  onUnlockFragment: () => void;
  onGoToEpilogue: () => void;
  isUnlocked: boolean;
}

const FOUR_SYMBOLS = [
  { id: 'dragon', name: '青龙 (东)', dir: '东', correctOrder: 1, color: '#38bdf8' },
  { id: 'bird', name: '朱雀 (南)', dir: '南', correctOrder: 2, color: '#f87171' },
  { id: 'tiger', name: '白虎 (西)', dir: '西', correctOrder: 3, color: '#facc15' },
  { id: 'tortoise', name: '玄武 (北)', dir: '北', correctOrder: 4, color: '#4ade80' },
];

const DIALOGUES_START: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '【嚼嚼嚼……四象星图马上要被黑暗遮蔽了……你们再也回不去了……】',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我全部想起来了。我来自西汉广阳国，在这里跳过两千年的舞。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '星路已开。顺应东苍龙、南朱鸟、西白虎、北玄武，连通四象开启时空归途。',
  },
];

const DIALOGUES_RESTORED: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '吱吱吱，全境净化了！墓穴深处已无容身之所，蚀墓之障溃散……！',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '七块记忆碎片全部合一！天地星轨连通，我们战胜了规则怪谈！',
  },
];

export const Stage7Ascension: React.FC<Stage7AscensionProps> = ({
  onUnlockFragment,
  onGoToEpilogue,
  isUnlocked,
}) => {
  const [clickedSymbols, setClickedSymbols] = useState<string[]>([]);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [activeDialogues, setActiveDialogues] = useState<DialogueLine[]>(DIALOGUES_START);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const handleSymbolClick = (sym: (typeof FOUR_SYMBOLS)[0]) => {
    soundFX.playStoneDrum();

    const expectedNextOrder = clickedSymbols.length + 1;

    if (sym.correctOrder === expectedNextOrder) {
      soundFX.playBronzeChime();
      const next = [...clickedSymbols, sym.id];
      setClickedSymbols(next);

      if (next.length === 4) {
        soundFX.playMemoryRestore();
        setIsSuccess(true);
        onUnlockFragment();
        setActiveDialogues(DIALOGUES_RESTORED);
        setDialogueIdx(0);
        setShowDialogue(true);
      }
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => {
        setShowCorruption(false);
        setClickedSymbols([]);
      }, 1400);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#050814] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="星宿方位错位 · 四象星图应顺应：东苍龙、南朱雀、西白虎、北玄武"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#091124] border-b border-[#1b2b4a] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#7a9bb8] font-mono">
            CHAPTER 7 · ASTRONOMICAL ASCENSION
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#e6f1ff] tracking-widest title-drop-shadow">
            第七关 · 星路 (四象聚合与归途开启)
          </h2>
        </div>

        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#14233f] text-[#88b598] border border-[#2b4470] font-bold">
          四象对齐 {clickedSymbols.length}/4
        </span>
      </div>

      {/* Main Celestial Map Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Star Sea Background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#a5b4fc 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Central Four Symbols Cosmic Disc */}
        <div className="relative w-full flex-1 rounded-3xl bg-[#040817]/90 border-2 border-[#1f3358] overflow-hidden flex flex-col items-center justify-center p-3 shadow-2xl">
          {/* Central Rotating Wheel */}
          <div
            className="relative w-56 h-56 rounded-full border-2 border-dashed border-[#38bdf8]/40 flex items-center justify-center transition-transform duration-500 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          >
            {/* Center Jade Head Light Spark */}
            <div className="w-16 h-16 rounded-full bg-[#0a182e] border-2 border-[#88b598] flex flex-col items-center justify-center shadow-[0_0_15px_#88b598] z-20">
              <Sparkles className="w-6 h-6 text-[#a7f3d0] animate-pulse" />
              <span className="text-[7px] font-mono text-emerald-200">
                {isSuccess ? '完全体' : '首光'}
              </span>
            </div>

            {/* 4 Constellation quadrant nodes */}
            {FOUR_SYMBOLS.map((sym, idx) => {
              const angles = [0, 90, 180, 270]; // East, South, West, North
              const angle = angles[idx];
              const isDone = clickedSymbols.includes(sym.id);

              return (
                <div
                  key={sym.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSymbolClick(sym);
                  }}
                  className="absolute cursor-pointer flex flex-col items-center justify-center"
                  style={{
                    transform: `rotate(${angle}deg) translate(0, -84px) rotate(${-angle - rotationAngle}deg)`,
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg transition-all active:scale-95 ${
                      isDone
                        ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-[0_0_15px_#34d399]'
                        : 'bg-[#0e1e36] border-[#38bdf8]/60 text-[#c7d2fe] hover:border-[#ffe89c]'
                    }`}
                  >
                    <span className="text-[10px] font-black font-serif">
                      {sym.name}
                    </span>
                    <span className="text-[7px] font-mono text-[#94a3b8]">
                      {isDone ? '已归位' : `次序 ${sym.correctOrder}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint text */}
          <div className="mt-4 text-center text-[10px] text-[#93c5fd] font-serif">
            顺应汉代天象星律：依次点击 东苍龙 → 南朱鸟 → 西白虎 → 北玄武
          </div>
        </div>

        {/* Action / Next Page Button */}
        <div className="w-full mt-2.5 z-10 space-y-1.5">
          {isSuccess ? (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                onGoToEpilogue();
              }}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-black rounded-2xl border-2 border-emerald-300 text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>七片玉化合一 · 开启终章回归</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center justify-between px-2">
              <button
                onClick={() => setRotationAngle((prev) => prev - 45)}
                className="px-3 py-1 bg-[#101d36] text-[#93c5fd] rounded-xl border border-[#233b66] text-[9px] flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                <span>逆转星轨</span>
              </button>
              <span className="text-[8px] font-mono text-[#64748b]">
                四象归位将开启时空隧道
              </span>
              <button
                onClick={() => setRotationAngle((prev) => prev + 45)}
                className="px-3 py-1 bg-[#101d36] text-[#93c5fd] rounded-xl border border-[#233b66] text-[9px] flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                <span>顺转星轨</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={activeDialogues}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < activeDialogues.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={7}
        />
      )}
    </div>
  );
};
