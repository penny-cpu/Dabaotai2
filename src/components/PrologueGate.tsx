import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { ShieldAlert, ArrowRight, Bug } from 'lucide-react';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';

interface PrologueGateProps {
  onStartChapter1: () => void;
}

const DIALOGUES_GATE: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '【滋滋滋……嚼嚼嚼……残存的汉代王陵，马上就要被我们吃光了……】',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '你们来迟了一千年。',
  },
  {
    speaker: 'player',
    speakerName: '见证者 (我)',
    text: '这里还是大葆台吗？',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '是。蚀墓虫吃掉遗址，也吃掉人们对它的记忆。七层全暗，大葆台就会像从未存在。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我的记忆也落在这里了。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '走过七关。你替她找回记忆，她替未来的大葆台留住名字。',
  },
  {
    speaker: 'player',
    speakerName: '见证者 (我)',
    text: '好，我们这就出发！',
  },
];

export const PrologueGate: React.FC<PrologueGateProps> = ({ onStartChapter1 }) => {
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [isReadyForChapter1, setIsReadyForChapter1] = useState<boolean>(false);

  useEffect(() => {
    soundFX.playCrawlerScurry();
  }, []);

  const handleNextDialogue = () => {
    if (dialogueIdx < DIALOGUES_GATE.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      soundFX.playBronzeChime();
      setIsReadyForChapter1(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#0a0705] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Banner */}
      <div className="p-2.5 bg-[#17100b] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[9px] font-mono tracking-widest text-[#a3805d]">
            FUTURE RESISTANCE · 序章 0C
          </span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#2a1a0f] text-amber-400 border border-amber-800">
          记忆侵蚀度 100%
        </span>
      </div>

      {/* Main Broken Gate & Gilded Bronze Door Pushou Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
        {/* Dilapidated Ruin Background with Gnawing Marks */}
        <div className="relative w-full h-72 rounded-3xl bg-[#140e0a] border-2 border-[#3d2b1f] flex flex-col items-center justify-center p-4 overflow-hidden shadow-2xl">
          {/* Corruption Organic Dark Spots */}
          <div className="absolute top-2 left-2 w-24 h-24 rounded-full bg-black/80 blur-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-black/90 blur-xl pointer-events-none" />

          {/* Central Gilded Bronze Pushou (鎏金铜铺首) Glowing */}
          <div className="relative z-10 flex flex-col items-center group">
            <div className="relative w-28 h-28 rounded-full bg-[#24170d] border-4 border-amber-600/80 flex items-center justify-center shadow-[0_0_24px_rgba(217,119,6,0.6)]">
              {/* Mythical Beast Face of Pushou with Ring */}
              <svg viewBox="0 0 100 100" className="w-20 h-20 fill-amber-400 stroke-amber-700">
                <circle cx="50" cy="50" r="42" fill="#3a2211" stroke="#b45309" strokeWidth="3" />
                <path d="M25 35 Q50 15 75 35 Q50 30 25 35" fill="#d97706" />
                <circle cx="38" cy="45" r="6" fill="#fef3c7" />
                <circle cx="62" cy="45" r="6" fill="#fef3c7" />
                <circle cx="38" cy="45" r="2.5" fill="#78350f" />
                <circle cx="62" cy="45" r="2.5" fill="#78350f" />
                <path d="M44 55 Q50 50 56 55 Q50 65 44 55" fill="#b45309" />
                <circle cx="50" cy="72" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" />
              </svg>
            </div>
            <span className="text-[11px] font-black text-amber-300 tracking-widest mt-2 bg-black/70 px-2.5 py-0.5 rounded-full border border-amber-600/50">
              守门者 · 鎏金铜铺首
            </span>
          </div>

          {/* Transparent Outline of Faint Jade Dancer */}
          <div className="absolute right-4 bottom-4 w-16 h-20 opacity-40 pointer-events-none">
            <svg viewBox="0 0 100 120" className="w-full h-full">
              <path
                d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                fill="none"
                stroke="#666666"
                strokeWidth="2.5"
                strokeDasharray="4,4"
              />
            </svg>
          </div>
        </div>

        {/* Action card after dialogue completes */}
        {isReadyForChapter1 && (
          <div className="w-full mt-3 bg-[#1e140d] border-2 border-amber-600/80 rounded-2xl p-3 shadow-2xl text-center space-y-2 animate-fade-in">
            <div className="text-xs font-black text-[#ffe89c] tracking-widest">
              ✦ 七关时空已连通 · 第一关【戈影】亮起 ✦
            </div>
            <p className="text-[10px] text-[#c2a385] leading-relaxed">
              辨认出属于大葆台的两件真正汉代兵器，找回玉舞人的第一块记忆碎片。
            </p>
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                onStartChapter1();
              }}
              className="w-full py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-xl border-2 border-[#d2b48c] text-xs shadow-xl active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>进入第一关 · 戈影</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Dialogue System */}
      {!isReadyForChapter1 && (
        <DialogueSystem
          dialogues={DIALOGUES_GATE}
          currentIndex={dialogueIdx}
          onNext={handleNextDialogue}
          restorationLevel={0}
        />
      )}
    </div>
  );
};
