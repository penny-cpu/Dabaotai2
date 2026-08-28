import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, AlertTriangle, Wind, Compass } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';

interface Stage5FuneraryProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

interface RitualCard {
  id: string;
  name: string;
  era: string;
  isCorrect: boolean;
  desc: string;
}

const RITUAL_CARDS: RitualCard[] = [
  {
    id: 'r1',
    name: '汉代深衣长袖送行舞',
    era: '西汉礼乐',
    isCorrect: true,
    desc: '长袖舒卷如云，庄严送行，事死如生之大汉礼乐。',
  },
  {
    id: 'r2',
    name: '唐代胡旋舞急转',
    era: '盛唐西域',
    isCorrect: false,
    desc: '立小圆毯旋转如风，热烈奔放，非汉代肃穆随葬长袖礼仪。',
  },
  {
    id: 'r3',
    name: '宋代杂剧滑稽演段',
    era: '宋代勾栏',
    isCorrect: false,
    desc: '市井杂剧滑稽取笑，与汉代地下王陵礼藏不符。',
  },
  {
    id: 'r4',
    name: '清代宫廷大阅乐舞',
    era: '清代八旗',
    isCorrect: false,
    desc: '清廷塞宴与武备阅兵，时代相差千载。',
  },
];

const DIALOGUES_START: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '【嚼嚼嚼……这里太肃穆了，快把送行礼仪的庄重都吃光……】',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这一段舞不是为了热闹，而是为了……送行。长袖挥动时，要像云一样轻，又要像山一样重。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '汉家礼乐，事死如生。辨认出正确的袖舞礼制。',
  },
];

const DIALOGUES_RESTORED: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '吱吱吱，这里净化了，快退至墓穴深处……！',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '长袖如云，送行礼成！第五块腰身碎片重聚了！',
  },
];

export const Stage5Funerary: React.FC<Stage5FuneraryProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [activeDialogues, setActiveDialogues] = useState<DialogueLine[]>(DIALOGUES_START);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playCrawlerScurry();
  }, []);

  const handleSelectCard = (card: RitualCard) => {
    soundFX.playStoneDrum();
    setSelectedCardId(card.id);

    if (card.isCorrect) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setIsSuccess(true);
      onUnlockFragment();
      setActiveDialogues(DIALOGUES_RESTORED);
      setDialogueIdx(0);
      setShowDialogue(true);
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => setShowCorruption(false), 1400);
    }
  };

  return (
    <div className={`relative w-full h-full text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
      isSuccess ? 'bg-[#150f1c]' : 'bg-[#0a070e]'
    }`}>
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="长袖礼仪动作辨识有误 · 汉代地下送灵需端庄沉稳、广袖回转"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#1a1224] border-b border-[#35254a] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a995c7] font-mono">
            CHAPTER 5 · FUNERARY SLEEVE RITUAL
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#e9dcff] tracking-widest title-drop-shadow">
            第五关 · 袖舞 (事死如生与汉仪)
          </h2>
        </div>

        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
          isSuccess ? 'bg-purple-950 text-purple-300 border-purple-500' : 'bg-[#221630] text-[#c9b4e6] border-[#4b3566]'
        }`}>
          {isSuccess ? '送灵礼仪已复 100%' : '礼仪辨识中'}
        </span>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-3">
        {/* Upper Video & Ritual Identification Area */}
        <div className={`relative w-full flex-1 rounded-3xl border-2 transition-all duration-700 overflow-hidden flex flex-col items-center justify-center p-3 shadow-2xl ${
          isSuccess
            ? 'bg-[#201530] border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
            : 'bg-[#0e0a14] border-[#35254a]'
        }`}>
          {/* Sleeve Dance Video Player Box */}
          <div className="w-full max-w-xs">
            <VideoPlayerPlaceholder
              title="【汉代长袖舞 · 送行之礼】"
              subtitle="16:9 汉代送行长袖仪式"
              videoSrc="/assets/videos/dance_funerary.mp4"
              posterImage={ASSETS.wuDance}
              description="舞者舒展深衣广袖，步履沉敛，以长袖回转划出云气之形，敬送逝者安息。"
              videoAssetPathHint="src/assets/videos/dance_funerary.mp4"
            />
          </div>
        </div>

        {/* Lower Ritual Choice Cards */}
        <div className="w-full mt-2 grid grid-cols-2 gap-2 z-10">
          {RITUAL_CARDS.map((card) => {
            const isSelected = selectedCardId === card.id;
            return (
              <button
                key={card.id}
                onClick={() => handleSelectCard(card)}
                className={`p-2.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between shadow-xl ${
                  isSelected && card.isCorrect
                    ? 'bg-purple-950/90 border-purple-400 text-white shadow-[0_0_15px_#a855f7]'
                    : 'bg-[#181124] border-[#35254a] text-[#d2b48c] hover:border-purple-500'
                }`}
              >
                <div>
                  <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-black/50 text-[#c9b4e6]">
                    {card.era}
                  </span>
                  <div className="text-[11px] font-black text-[#f3ebff] mt-1 font-serif leading-tight">
                    {card.name}
                  </div>
                </div>
                <p className="text-[8px] text-[#a995c7] mt-1 line-clamp-2 leading-tight">
                  {card.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        {isSuccess && (
          <div className="w-full mt-2 z-10">
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setShowMemoryVideo(true);
              }}
              className="w-full py-2.5 bg-purple-800 hover:bg-purple-700 text-white font-serif font-black rounded-2xl border-2 border-purple-400 text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>腰身碎片已归位 · 查看袖舞记忆</span>
            </button>
          </div>
        )}
      </div>

      {/* Memory Modal */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-3">
            <span className="text-[9px] font-mono text-purple-300 tracking-widest bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500">
              MEMORY RESTORED · 第五块碎片归位
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              袖舞记忆 · 广袖回风，礼序千秋
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-purple-600 shadow-2xl bg-[#140b20] flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <p className="text-[11px] text-[#f2e6ff] leading-relaxed">
                “长袖回风，汉礼肃然！舞人庄严合礼，第五块腰身碎片重聚，汉家事死如生之大义昭然。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
              onNextPage();
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>进入第六关 · 题凑</span>
          </button>
        </div>
      )}

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
          restorationLevel={isSuccess ? 5 : 4}
        />
      )}
    </div>
  );
};
