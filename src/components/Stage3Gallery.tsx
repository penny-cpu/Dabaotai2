import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';

interface Stage3GalleryProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

interface FloatingArtifact {
  id: string;
  name: string;
  category: string;
  isCorrect: boolean;
  desc: string;
  era: string;
}

const FIVE_COLUMNS: FloatingArtifact[][] = [
  // Column 1 (Leftmost)
  [
    { id: 'c1_1', name: '唐三彩骆驼俑', category: '陶俑', isCorrect: false, desc: '盛唐丝绸之路三彩陶器', era: '唐代' },
    { id: 'c1_2', name: '宋代汝窑天青洗', category: '瓷器', isCorrect: false, desc: '宋代五大名窑御用青瓷', era: '宋代' },
  ],
  // Column 2 (Left Mid)
  [
    { id: 'c2_1', name: '大葆台朱漆耳杯', category: '漆器', isCorrect: true, desc: '大葆台汉墓出土朱黑双色双耳饮酒器', era: '西汉' },
    { id: 'c2_2', name: '元代青花凤纹瓷罐', category: '瓷器', isCorrect: false, desc: '元代景德镇钴蓝料彩瓷', era: '元代' },
  ],
  // Column 3 (Center - Focus)
  [
    { id: 'c3_1', name: '大葆台鎏金铜钫', category: '青铜重器', isCorrect: true, desc: '大葆台汉墓出土四棱盛酒礼器，通体鎏金', era: '西汉' },
    { id: 'c3_2', name: '大葆台星云纹铜镜', category: '铜镜', isCorrect: true, desc: '大葆台汉墓出土汉代星云乳钉纹铜镜', era: '西汉' },
    { id: 'c3_3', name: '清代乾隆珐琅彩瓶', category: '珐琅', isCorrect: false, desc: '清代宫廷掐丝珐琅彩绘', era: '清代' },
  ],
  // Column 4 (Right Mid)
  [
    { id: 'c4_1', name: '商代司母戊青铜鼎', category: '青铜器', isCorrect: false, desc: '商代晚期祭祀青铜重器', era: '商代' },
    { id: 'c4_2', name: '西汉青铜博山炉', category: '青铜香薰', isCorrect: true, desc: '西汉仙山神兽云气熏香器', era: '西汉' },
  ],
  // Column 5 (Rightmost)
  [
    { id: 'c5_1', name: '明代青花海水龙纹盘', category: '瓷器', isCorrect: false, desc: '明代永宣官窑瓷器', era: '明代' },
    { id: 'c5_2', name: '战国曾侯乙编钟', category: '青铜乐器', isCorrect: false, desc: '战国早期曾国诸侯乐器', era: '战国' },
  ],
];

const DIALOGUES_3: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '它们都在说自己属于这里。你还记得刚才真正看见了什么吗？',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '形状会伪装，现场的记忆不会。',
  },
];

export const Stage3Gallery: React.FC<Stage3GalleryProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [activeColIndex, setActiveColIndex] = useState<number>(2); // Start at center col 3
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const handleSelectArtifact = (art: FloatingArtifact) => {
    soundFX.playStoneDrum();

    if (art.isCorrect) {
      if (!selectedArtifacts.includes(art.id)) {
        const next = [...selectedArtifacts, art.id];
        setSelectedArtifacts(next);
        soundFX.playBronzeChime();

        if (next.length >= 3) {
          soundFX.playMemoryRestore();
          setIsSuccess(true);
          onUnlockFragment();
          setShowMemoryVideo(true);
        }
      }
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => setShowCorruption(false), 1400);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#080c14] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="文物名称瞬间乱码 · 玉舞人：“记忆不对，它不属于这段时间。”"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#101726] border-b border-[#1f2d45] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#7a9bb8] font-mono">
            CHAPTER 3 · FLOATING RELICS
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#e6f1ff] tracking-widest title-drop-shadow">
            第三关 · 浮游 (五列上浮文物)
          </h2>
        </div>

        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#1b2a47] text-[#88b598] border border-[#3b5585] font-bold">
          已确认 {selectedArtifacts.length}/3
        </span>
      </div>

      {/* Main 5-Column Floating Relics Space */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Navigation Indicator */}
        <div className="flex items-center justify-between w-full px-2 text-[9px] text-[#7a9bb8] font-mono">
          <button
            onClick={() => setActiveColIndex(Math.max(0, activeColIndex - 1))}
            className="flex items-center gap-0.5 bg-[#142138] px-2 py-0.5 rounded-full border border-[#23385d]"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>左列</span>
          </button>
          <span>第 {activeColIndex + 1} 列 (共 5 列上浮队列)</span>
          <button
            onClick={() => setActiveColIndex(Math.min(4, activeColIndex + 1))}
            className="flex items-center gap-0.5 bg-[#142138] px-2 py-0.5 rounded-full border border-[#23385d]"
          >
            <span>右列</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* 5-Column Perspective Canvas */}
        <div className="relative w-full flex-1 rounded-3xl bg-[#04070e] border-2 border-[#1f2d45] overflow-hidden flex items-center justify-center shadow-2xl p-2 my-2">
          {/* Subtle Starlight / Water Floating Background Particles */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#63b3ed 1px, transparent 0)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* 5 Column Items View */}
          <div className="flex items-center justify-center gap-2 w-full h-full">
            {FIVE_COLUMNS.map((col, colIdx) => {
              const dist = Math.abs(colIdx - activeColIndex);
              const scale = dist === 0 ? 1 : dist === 1 ? 0.78 : 0.6;
              const opacity = dist === 0 ? 1 : dist === 1 ? 0.5 : 0.25;

              return (
                <div
                  key={colIdx}
                  onClick={() => setActiveColIndex(colIdx)}
                  style={{ transform: `scale(${scale})`, opacity }}
                  className={`flex-1 h-full flex flex-col justify-around transition-all duration-500 cursor-pointer ${
                    dist === 0 ? 'z-20' : 'z-10'
                  }`}
                >
                  {col.map((art) => {
                    const isSelected = selectedArtifacts.includes(art.id);
                    return (
                      <div
                        key={art.id}
                        onClick={(e) => {
                          if (dist === 0) {
                            e.stopPropagation();
                            handleSelectArtifact(art);
                          }
                        }}
                        className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center shadow-xl ${
                          isSelected
                            ? 'bg-[#0f2e24] border-[#88b598] shadow-[0_0_15px_#88b598]'
                            : dist === 0
                            ? 'bg-[#101b2e] border-[#3b5585] hover:border-[#ffe89c]'
                            : 'bg-[#0b1220] border-[#18263e]'
                        }`}
                      >
                        <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-[#7a9bb8]">
                          {art.era} · {art.category}
                        </span>
                        <div className="text-[11px] font-black text-[#e6f1ff] mt-1 font-serif">
                          {art.name}
                        </div>
                        <p className="text-[8px] text-[#8fa8c6] mt-0.5 line-clamp-2">
                          {art.desc}
                        </p>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[8px] text-[#88b598] mt-1 font-mono">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>玉光已连线</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prompt */}
        <div className="text-[9px] text-[#7a9bb8] text-center font-mono">
          左右滑动切换队列，在正中列点击选择 3 件大葆台现场汉代随葬真品
        </div>
      </div>

      {/* Memory Video Modal (文物记忆) */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in">
          <div className="text-center mt-4">
            <span className="text-[9px] font-mono text-[#88b598] tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY RESTORED · 第三块碎片归位
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2 font-serif">
              文物记忆 · 浮游玉光，三器连线
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#3b5585] shadow-2xl bg-[#090d16] flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <div className="flex justify-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#1b2a47] border-2 border-[#88b598] flex items-center justify-center text-[9px] text-emerald-200 font-bold p-1">
                  鎏金铜钫
                </div>
                <div className="w-16 h-16 rounded-full bg-[#1b2a47] border-2 border-[#88b598] flex items-center justify-center text-[9px] text-emerald-200 font-bold p-1">
                  朱漆耳杯
                </div>
                <div className="w-16 h-16 rounded-full bg-[#1b2a47] border-2 border-[#88b598] flex items-center justify-center text-[9px] text-emerald-200 font-bold p-1">
                  星云铜镜
                </div>
              </div>
              <p className="text-[11px] text-[#e8f8ec] font-serif leading-relaxed">
                “三件器物连成一道玉色光线！舞人伙伴以三件器物的形制和用途为动作线索，完成了一支优美的短舞。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
              onNextPage();
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>进入第四关 · 百戏</span>
          </button>
        </div>
      )}

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={DIALOGUES_3}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < DIALOGUES_3.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={3}
        />
      )}
    </div>
  );
};
