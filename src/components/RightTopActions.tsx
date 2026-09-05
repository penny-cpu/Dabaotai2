import React, { useState } from 'react';
import { BookOpen, Compass, X, Sparkles, Rotate3d, CheckCircle2, ChevronRight } from 'lucide-react';
import { MEMORY_CARDS_DATA, MemoryCardItem } from '../data/memoryCardsData';
import { soundFX } from '../utils/soundEngine';
import { HanPlaqueButton } from './HanPlaqueButton';

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
          className="w-10 h-10 rounded-full bg-[#3A2116]/95 hover:bg-[#6E3024] border border-[#A9782B] text-[#E6D3AA] flex flex-col items-center justify-center shadow-md active:scale-95 transition-all group backdrop-blur-md"
          title="打开地图目录"
        >
          <Compass className="w-4 h-4 text-[#C8943D] group-hover:scale-110 transition-transform" />
          <span className="text-[7.5px] font-serif tracking-tighter text-[#E6D3AA] font-black scale-90">
            地图目录
          </span>
        </button>

        {/* 2. Circle Memory Bamboo Slip Button (记忆竹简) */}
        <button
          id="btn_top_memory"
          onClick={handleOpenMemoryBook}
          className={`relative w-10 h-10 rounded-full bg-[#3A2116]/95 hover:bg-[#6E3024] border flex flex-col items-center justify-center shadow-md active:scale-95 transition-all group backdrop-blur-md ${
            unlockedCount > 0
              ? 'border-[#A9782B] text-[#E6D3AA]'
              : 'border-[#6E3024] text-[#A89078]'
          }`}
          title="打开记忆竹简"
        >
          {/* +1 Floating Sparkle Animation */}
          {showPlusOneAnimation && (
            <div className="absolute -top-3 -left-3 px-1.5 py-0.5 rounded-full bg-[#C8943D] text-[#160D09] font-mono font-black text-[9px] shadow-lg animate-bounce z-50">
              +1
            </div>
          )}

          <BookOpen className="w-3.5 h-3.5 text-[#C8943D] group-hover:scale-110 transition-transform" />
          <span className="text-[7px] font-serif tracking-tighter text-[#E6D3AA] font-black scale-90">
            记忆竹简
          </span>
        </button>
      </div>

      {/* Slide-in Memory Book (7张记忆卡册) */}
      {showMemoryBook && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end animate-fade-in select-none overflow-hidden">
          <div className="relative w-full max-w-sm h-full bg-[#160D09] border-l border-[#A9782B] p-4 flex flex-col justify-between shadow-2xl text-[#E6D3AA] font-serif overflow-y-auto han-cloud-bg">
            <div className="han-mural-texture" />
            {/* Memory Card Detail Modal when tapped */}
            {selectedCard ? (
              <div className="flex-1 flex flex-col justify-between animate-fade-in z-10">
                <div>
                  {/* Top Bar of Card Detail */}
                  <div className="flex items-center justify-between border-b border-[#6E3024] pb-2 mb-3">
                    <button
                      onClick={() => {
                        soundFX.playStoneDrum();
                        setSelectedCard(null);
                      }}
                      className="text-[10px] font-mono text-[#C8943D] flex items-center gap-1 hover:underline"
                    >
                      <span>← 返回考工列表</span>
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playStoneDrum();
                        setIsCardFlipped(!isCardFlipped);
                      }}
                      className="flex items-center gap-1 text-[9px] font-mono bg-[#3A2116] text-[#E6D3AA] px-2 py-0.5 rounded-full border border-[#A9782B]"
                    >
                      <Rotate3d className="w-3 h-3 text-[#C8943D]" />
                      <span>{isCardFlipped ? '看正面' : '翻面看详情'}</span>
                    </button>
                  </div>

                  {/* 3D Flip Card Container */}
                  <div
                    onClick={() => {
                      soundFX.playStoneDrum();
                      setIsCardFlipped(!isCardFlipped);
                    }}
                    className="relative w-full aspect-[3/4] max-h-[360px] rounded-xl cursor-pointer perspective-1000 shadow-2xl group my-2"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className="relative w-full h-full rounded-xl transition-transform duration-700 transform-style-3d border border-[#A9782B] overflow-hidden"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* Front: Relic Art & Memory Name */}
                      <div
                        className="absolute inset-0 w-full h-full bg-[#3A2116] flex flex-col justify-between p-4 backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-[#E6D3AA] bg-[#160D09] px-2 py-0.5 rounded-full border border-[#6E3024]">
                            {selectedCard.code} · {selectedCard.epoch}
                          </span>
                          <span className="text-[8px] font-mono text-[#79B9A1]">
                            ✓ 考工归位
                          </span>
                        </div>

                        <div className="my-auto flex flex-col items-center justify-center text-center space-y-2">
                          <div className="w-20 h-20 rounded-xl bg-[#160D09] border border-[#A9782B] flex items-center justify-center shadow-lg p-2">
                            <Sparkles className="w-8 h-8 text-[#C8943D]" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-sm font-black text-[#E6D3AA]">
                              {selectedCard.title}
                            </h3>
                            <p className="text-[10px] text-[#A89078]">
                              {selectedCard.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <span className="text-[9px] font-mono text-[#C8943D]">
                            点击卡片翻转查看考工实录 ➔
                          </span>
                        </div>
                      </div>

                      {/* Back: Academic & Historical Fact */}
                      <div
                        className="absolute inset-0 w-full h-full bg-[#160D09] flex flex-col justify-between p-4 backface-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="flex items-center justify-between border-b border-[#6E3024] pb-1.5">
                          <span className="text-[9px] font-mono text-[#E6D3AA] font-bold">
                            大葆台考工释义
                          </span>
                          <span className="text-[8px] font-mono text-[#A9782B]">
                            {selectedCard.code}
                          </span>
                        </div>

                        <div className="my-auto space-y-2 overflow-y-auto py-2">
                          <div className="space-y-1 text-left">
                            <h4 className="text-[11px] font-black text-[#E6D3AA]">
                              【核心意蕴】
                            </h4>
                            <p className="text-[10px] text-[#A89078] leading-relaxed">
                              {selectedCard.story}
                            </p>
                          </div>

                          <div className="space-y-1 text-left pt-1 border-t border-[#3A2116]">
                            <h4 className="text-[10px] font-black text-[#C8943D]">
                              【考古印证】
                            </h4>
                            <p className="text-[9.5px] text-[#A89078] leading-relaxed">
                              {selectedCard.historicalFact}
                            </p>
                          </div>
                        </div>

                        <div className="text-center pt-1 border-t border-[#6E3024]">
                          <span className="text-[8px] font-mono text-[#79B9A1]">
                            北京大葆台西汉墓博物馆 · 认证记录
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <HanPlaqueButton
                  onClick={() => setSelectedCard(null)}
                  size="sm"
                  className="w-full mt-2"
                >
                  返回记忆考工列表
                </HanPlaqueButton>
              </div>
            ) : (
              // 7 Cards List View
              <div className="flex-1 flex flex-col justify-between z-10">
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-[#6E3024] pb-2.5 mb-3">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#C8943D]" />
                      <h3 className="text-xs font-black text-[#E6D3AA] tracking-widest font-serif">
                        大葆台记忆竹简 ({unlockedCount}/{totalChapters})
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowMemoryBook(false)}
                      className="w-6 h-6 rounded-full bg-[#3A2116] hover:bg-[#6E3024] border border-[#A9782B] flex items-center justify-center text-[#E6D3AA]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[9.5px] text-[#A89078] mb-3 leading-relaxed">
                    每通关一处时空，将收集一根汉代记忆竹简，铭刻大汉王侯礼乐与考工规制。
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
                          className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                            isUnlocked
                              ? 'bg-[#3A2116] border-[#A9782B] hover:border-[#C8943D] cursor-pointer shadow-md'
                              : 'bg-[#160D09] border-[#3A2116] opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-black ${
                                isUnlocked
                                  ? 'bg-[#160D09] text-[#E6D3AA] border-[#A9782B]'
                                  : 'bg-[#160D09] text-[#6E3024] border-[#3A2116]'
                              }`}
                            >
                              {card.code}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-black text-[#E6D3AA]">
                                  《{card.title}》
                                </span>
                                {isUnlocked && (
                                  <span className="inline-flex items-center gap-0.5 px-1 py-0.2 text-[8px] bg-[#160D09] text-[#79B9A1] rounded border border-[#79B9A1]/50 font-serif">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-[#79B9A1]" />
                                    <span>竹简已录</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-[9px] text-[#A89078] line-clamp-1">
                                {isUnlocked ? card.subtitle : '尚未收集此卷竹简'}
                              </p>
                            </div>
                          </div>

                          {isUnlocked && (
                            <ChevronRight className="w-4 h-4 text-[#C8943D] shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <HanPlaqueButton
                    onClick={() => setShowMemoryBook(false)}
                    size="md"
                    className="w-full"
                  >
                    关闭卡册 · 回到探秘
                  </HanPlaqueButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

