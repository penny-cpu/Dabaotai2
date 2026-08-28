import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, AlertTriangle, Eye, ZoomIn } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';

interface Stage5FuneraryProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const CEREMONY_CARDS = [
  {
    id: 'c_han_ritual',
    title: 'A. 汉代长袖祭舞与送灵入墓',
    isCorrect: true,
    tag: '大葆台汉代仪礼',
    desc: '舞者扬袖翻卷、抱袖回环，勾勒通往天界的云气纹，队伍肃穆庄严，严格遵循汉家墓葬礼乐秩序。',
  },
  {
    id: 'c_tang_costume',
    title: 'B. 盛唐霓裳羽衣奢华腾跃',
    isCorrect: false,
    tag: '唐代宫廷乐舞',
    desc: '大袖翩跹、高髻金钗、动作欢腾飞跃，为唐代宫廷庆典娱乐之舞，非汉代肃穆送葬。',
  },
  {
    id: 'c_nuo_mask',
    title: 'C. 先秦傩祭夸张面具跳跃',
    isCorrect: false,
    tag: '原始傩戏驱疫',
    desc: '面戴兽面獠牙木雕面具，手持戈矛狂热呐喊跳跃，为先秦民间驱鬼仪式，时代与礼节不符。',
  },
];

const DIALOGUES_5: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我记得这支舞不是为了热闹，而是为了送一个人走完人间的路。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '看动作的秩序。真正的礼，不会只剩夸张的表面。',
  },
];

export const Stage5Funerary: React.FC<Stage5FuneraryProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const handleSelectCard = (id: string) => {
    soundFX.playStoneDrum();
    setSelectedCard(id);
  };

  const handleConfirm = () => {
    if (!selectedCard) return;

    const card = CEREMONY_CARDS.find((c) => c.id === selectedCard);
    if (card?.isCorrect) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setIsSuccess(true);
      onUnlockFragment();
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => setShowCorruption(false), 1400);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#100b08] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="卡片被雪花覆盖 · 玉舞人：“这不是我记得的礼。再看动作之间的关系。”"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#1b120c] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 5 · SLEEVE FUNERARY DANCE
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第五关 · 袖舞 (送灵长袖与礼仪抉择)
          </h2>
        </div>

        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#2a1a0f] text-[#d2b48c] border border-[#5c4033]">
          {isSuccess ? '送行路径已接通' : '幽暗墓道'}
        </span>
      </div>

      {/* Main Grave Path Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Tomb Path Background with Long Sleeve Trail */}
        <div className="relative w-full h-40 rounded-3xl bg-[#140e0a] border-2 border-[#3d2b1f] overflow-hidden flex flex-col items-center justify-center p-3 shadow-xl">
          {/* Animated S-Curve Flowing Sleeve Path */}
          <svg viewBox="0 0 300 120" className="w-full h-full">
            <defs>
              <linearGradient id="sleeveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a7f3d0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3d2b1f" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M20 90 Q80 20 150 70 T280 40"
              fill="none"
              stroke="url(#sleeveGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              className={isSuccess ? 'animate-pulse' : 'opacity-40'}
            />
            {isSuccess && (
              <circle cx="280" cy="40" r="6" fill="#ffe89c" className="animate-ping" />
            )}
          </svg>

          <div className="absolute bottom-2 text-center text-[9px] text-[#a3805d]">
            “长袖舒展，勾勒云气纹，指引往生通仙之道”
          </div>
        </div>

        {/* 3 Ritual Ceremony Cards Selection */}
        <div className="w-full space-y-2 my-2">
          {CEREMONY_CARDS.map((card) => {
            const isSelected = selectedCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => handleSelectCard(card.id)}
                className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#291b12] border-[#ffe89c] shadow-[0_0_15px_rgba(255,232,156,0.3)] scale-[1.01]'
                    : 'bg-[#140e0a] border-[#3d2b1f] hover:border-[#5c4033]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#e6d5b8] font-serif">
                    {card.title}
                  </span>
                  <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-[#a3805d]">
                    {card.tag}
                  </span>
                </div>
                <p className="text-[9px] text-[#a3805d] mt-1 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Confirm / Next Button */}
        <div className="w-full space-y-1.5 z-10">
          {!isSuccess ? (
            <button
              onClick={handleConfirm}
              disabled={!selectedCard}
              className={`w-full py-2.5 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 ${
                selectedCard
                  ? 'bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] border-[#d2b48c] active:scale-98'
                  : 'bg-[#1a120b] text-[#554030] border-[#291b12] cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#ffe89c]" />
              <span>确认仪式画面 · 接通送行路径</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                onNextPage();
              }}
              className="w-full py-2.5 bg-[#1b2a1e] hover:bg-[#253d2b] text-[#88b598] font-serif font-black rounded-2xl border-2 border-[#88b598] text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>第五块碎片归位 · 前往第六关木阵</span>
            </button>
          )}
        </div>
      </div>

      {/* Memory Video Modal (送行袖舞记忆) */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in">
          <div className="text-center mt-4">
            <span className="text-[9px] font-mono text-[#88b598] tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY RECALL · 送葬袖舞长卷
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2 font-serif">
              长袖送灵 · 礼仪秩然
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center p-4">
            <p className="text-[11px] text-[#e8f8ec] font-serif leading-relaxed text-center">
              “送葬队伍手执长袖，回环缭绕。真正的汉代礼制，内敛克制而尊崇天地，不似狂热傩戏，亦非奢靡盛唐。”
            </p>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>辨认仪式画面</span>
          </button>
        </div>
      )}

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={DIALOGUES_5}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < DIALOGUES_5.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={5}
        />
      )}
    </div>
  );
};
