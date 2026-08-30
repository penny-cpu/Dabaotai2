import React, { useState } from 'react';
import { BookOpen, Compass, X, Sparkles, Rotate3d, CheckCircle2, ChevronRight } from 'lucide-react';
import { MEMORY_CARDS_DATA, MemoryCardItem } from '../data/memoryCardsData';
import { soundFX } from '../utils/soundEngine';

interface RightTopActionsProps {
  currentChapterKey: string;
  unlockedCount: number;
  totalChapters?: number;
  unlockedCardIds?: string[];
  showPlusOneAnimation?: boolean;
  onOpenMapModal?: () => void;
}

export const RightTopActions: React.FC<RightTopActionsProps> = ({
  currentChapterKey,
  unlockedCount,
  totalChapters = 7,
  unlockedCardIds = [],
  showPlusOneAnimation = false,
  onOpenMapModal,
}) => {
  const [showMemoryBook, setShowMemoryBook] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<MemoryCardItem | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  const handleOpenMemoryBook = () => {
    soundFX.playBronzeChime();
    setShowMemoryBook(true);
    setSelectedCard(null);
  };

  const handleCardClick = (card: MemoryCardItem) => {
    soundFX.playStoneDrum();
    setSelectedCard(card);
    setIsCardFlipped(false);
  };

  return (
    <>
      {/* Pinned Top-Right Vertical Circular UI Buttons: 1. 地图目录, 2. 记忆碎片 */}
      <div className="absolute top-2.5 right-2.5 z-40 flex flex-col items-center gap-2 select-none pointer-events-auto">
        {/* 1. Circle Map Directory Button (地图目录) */}
        <button
          id="btn_top_map_dir"
          onClick={() => {
            soundFX.playStoneDrum();
            if (onOpenMapModal) {
              onOpenMapModal();
            }
          }}
          className="w-10 h-10 rounded-full bg-[#1c130d]/95 hover:bg-[#2e1d13] border-2 border-amber-500/80 text-[#ffe89c] flex flex-col items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.35)] active:scale-95 transition-all group backdrop-blur-md"
          title="打开地图目录"
        >
          <Compass className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="text-[7.5px] font-serif tracking-tighter text-amber-200/95 font-black scale-90">
            地图目录
          </span>
        </button>

        {/* 2. Circle Memory Book Button (记忆碎片) */}
        <button
          id="btn_top_memory"
          onClick={handleOpenMemoryBook}
          className={`relative w-10 h-10 rounded-full bg-[#17100b]/95 hover:bg-[#291b12] border-2 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)] active:scale-95 transition-all group backdrop-blur-md ${
            unlockedCount > 0
              ? 'border-emerald-500 text-emerald-300'
              : 'border-[#5c4033] text-[#a3805d]'
          }`}
          title="打开记忆碎片卡册"
        >
          {/* +1 Floating Sparkle Animation */}
          {showPlusOneAnimation && (
            <div className="absolute -top-3 -left-3 px-1.5 py-0.5 rounded-full bg-emerald-500 text-black font-mono font-black text-[9px] shadow-lg animate-bounce z-50">
              +1
            </div>
          )}

          <BookOpen className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-[7.5px] font-mono tracking-tighter text-emerald-200 font-black scale-90">
            {unlockedCount}/{totalChapters}
          </span>
        </button>
      </div>

      {/* Slide-in Memory Book (7张记忆卡册) */}
      {showMemoryBook && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end animate-fade-in select-none overflow-hidden">
          <div className="relative w-full max-w-sm h-full bg-[#120c08] border-l-2 border-emerald-500/80 p-4 flex flex-col justify-between shadow-2xl text-[#e6d5b8] font-serif overflow-y-auto">
            {/* Memory Card Detail Modal when tapped */}
            {selectedCard ? (
              <div className="flex-1 flex flex-col justify-between animate-fade-in">
                <div>
                  {/* Top Bar of Card Detail */}
                  <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-2 mb-3">
                    <button
                      onClick={() => {
                        soundFX.playStoneDrum();
                        setSelectedCard(null);
                      }}
                      className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 hover:underline"
                    >
                      <span>← 返回记忆列表</span>
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playStoneDrum();
                        setIsCardFlipped(!isCardFlipped);
                      }}
                      className="flex items-center gap-1 text-[9px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500"
                    >
                      <Rotate3d className="w-3 h-3" />
                      <span>{isCardFlipped ? '看正面' : '翻面看详情'}</span>
                    </button>
                  </div>

                  {/* 3D Flip Card Container */}
                  <div
                    onClick={() => {
                      soundFX.playStoneDrum();
                      setIsCardFlipped(!isCardFlipped);
                    }}
                    className="relative w-full aspect-[3/4] max-h-[360px] rounded-2xl cursor-pointer perspective-1000 shadow-2xl group my-2"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className="relative w-full h-full rounded-2xl transition-transform duration-700 transform-style-3d border-2 border-amber-600/80 overflow-hidden"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* Front: Relic Art & Memory Name */}
                      <div
                        className="absolute inset-0 w-full h-full bg-[#1c130d] flex flex-col justify-between p-4 backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-amber-400 bg-black/60 px-2 py-0.5 rounded-full border border-amber-600/50">
                            {selectedCard.code} · {selectedCard.epoch}
                          </span>
                          <span className="text-[8px] font-mono text-emerald-400">
                            ✓ 记忆归位
                          </span>
                        </div>

                        <div className="my-auto flex flex-col items-center justify-center text-center space-y-2">
                          <div className="w-20 h-20 rounded-2xl bg-[#2a170d] border border-amber-500/80 flex items-center justify-center shadow-lg p-2">
                            <Sparkles className="w-10 h-10 text-amber-300 animate-pulse" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-sm font-black text-[#ffe89c]">
                              {selectedCard.title}
                            </h3>
                            <p className="text-[10px] text-[#c2a385]">
                              {selectedCard.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <span className="text-[9px] font-mono text-amber-300/80">
                            点击卡片翻转查看考工实录 ➔
                          </span>
                        </div>
                      </div>

                      {/* Back: Academic & Historical Fact */}
                      <div
                        className="absolute inset-0 w-full h-full bg-[#140e0a] flex flex-col justify-between p-4 backface-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1.5">
                          <span className="text-[9px] font-mono text-amber-400 font-bold">
                            大葆台考工释义
                          </span>
                          <span className="text-[8px] font-mono text-[#a3805d]">
                            {selectedCard.code}
                          </span>
                        </div>

                        <div className="my-auto space-y-2 overflow-y-auto py-2">
                          <div className="space-y-1 text-left">
                            <h4 className="text-[11px] font-black text-[#ffe89c]">
                              【核心意蕴】
                            </h4>
                            <p className="text-[10px] text-[#e6d5b8] leading-relaxed">
                              {selectedCard.story}
                            </p>
                          </div>

                          <div className="space-y-1 text-left pt-1 border-t border-[#291a10]">
                            <h4 className="text-[10px] font-black text-amber-300">
                              【考古印证】
                            </h4>
                            <p className="text-[9.5px] text-[#a3805d] leading-relaxed">
                              {selectedCard.historicalFact}
                            </p>
                          </div>
                        </div>

                        <div className="text-center pt-1 border-t border-[#3d2b1f]">
                          <span className="text-[8px] font-mono text-emerald-400">
                            北京大葆台西汉墓博物馆 · 认证记录
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCard(null)}
                  className="w-full py-2 bg-[#291b12] hover:bg-[#3d2b1f] text-[#ffe89c] rounded-xl border border-amber-600/70 text-xs font-serif font-black shadow-md mt-2"
                >
                  返回记忆碎片列表
                </button>
              </div>
            ) : (
              // 7 Cards List View
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-2.5 mb-3">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-xs font-black text-[#ffe89c] tracking-widest font-serif">
                        大葆台记忆碎片 ({unlockedCount}/{totalChapters})
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowMemoryBook(false)}
                      className="w-6 h-6 rounded-full bg-[#24170e] hover:bg-[#3d281a] border border-[#5c4033] flex items-center justify-center text-amber-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[9.5px] text-[#a3805d] mb-3">
                    每通关一处时空，将唤醒一枚珍贵的汉代记忆碎片，点击查看详情与考工释义。
                  </p>

                  {/* Cards List */}
                  <div className="space-y-2">
                    {MEMORY_CARDS_DATA.map((card) => {
                      const isUnlocked =
                        card.chapterIndex <= unlockedCount ||
                        unlockedCardIds.includes(card.id);
                      return (
                        <div
                          key={card.id}
                          onClick={() => {
                            if (isUnlocked) {
                              handleCardClick(card);
                            }
                          }}
                          className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between ${
                            isUnlocked
                              ? 'bg-[#22170f] border-amber-500/70 hover:border-amber-400 cursor-pointer shadow-md'
                              : 'bg-[#120a06]/60 border-[#332217] opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-black ${
                                isUnlocked
                                  ? 'bg-amber-950 text-amber-300 border-amber-500 shadow'
                                  : 'bg-[#1c120a] text-[#554030] border-[#3d2b1f]'
                              }`}
                            >
                              {card.code}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-black text-[#ffe89c]">
                                  {card.title}
                                </span>
                                {isUnlocked && (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                )}
                              </div>
                              <p className="text-[9px] text-[#a3805d] line-clamp-1">
                                {isUnlocked ? card.subtitle : '尚未唤醒此段记忆'}
                              </p>
                            </div>
                          </div>

                          {isUnlocked && (
                            <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setShowMemoryBook(false)}
                  className="w-full mt-4 py-2.5 bg-[#291b12] hover:bg-[#3d2b1f] text-[#ffe89c] rounded-xl border border-emerald-600/70 text-xs font-serif font-black shadow-md"
                >
                  关闭卡册 · 回到探秘
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
