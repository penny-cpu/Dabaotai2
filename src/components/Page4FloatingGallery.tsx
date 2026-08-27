import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, Eye, X, CheckCircle2 } from 'lucide-react';

interface RelicLineArtItem {
  id: string;
  name: string;
  category: string;
  era: string;
  description: string;
  memorySnippet: string;
  colIndex: 1 | 2 | 3 | 4 | 5;
  rowIndex: number;
  iconSvg: React.ReactNode;
}

const FIVE_COLUMN_RELICS: RelicLineArtItem[] = [
  // Column 1 (Far Left - Smallest & Dimmest)
  {
    id: 'col1_item1',
    name: '灰陶罐',
    category: '陶器',
    era: '西汉',
    description: '大葆台墓道填土层出土，盛放粮谷的生活用具，朴拙粗糙。',
    memorySnippet: '这是墓道旁随葬的灰陶罐，装着两千年前人间的烟火粗粮。',
    colIndex: 1,
    rowIndex: 0,
    iconSvg: (
      <svg viewBox="0 0 40 50" className="w-full h-full fill-none stroke-current stroke-1.5">
        <path d="M12 8 L28 8 L32 20 L30 42 L10 42 L8 20 Z" />
        <ellipse cx="20" cy="8" rx="8" ry="3" />
      </svg>
    ),
  },
  {
    id: 'col1_item2',
    name: '青铜带钩',
    category: '铜器',
    era: '西汉',
    description: '汉代男子束带之佩，龙首形状，做工精巧。',
    memorySnippet: '龙首青铜带钩，当年广阳王袍服上的束腰佩具。',
    colIndex: 1,
    rowIndex: 1,
    iconSvg: (
      <svg viewBox="0 0 40 50" className="w-full h-full fill-none stroke-current stroke-1.5">
        <path d="M15 10 C15 5, 25 5, 25 10 C25 20, 18 35, 20 44" />
        <circle cx="20" cy="44" r="3" />
      </svg>
    ),
  },
  {
    id: 'col1_item3',
    name: '陶纺轮',
    category: '陶器',
    era: '西汉',
    description: '西汉民间纺织工具，质地致密。',
    memorySnippet: '小小陶纺轮，织出汉代长袖舞者的轻柔罗衣。',
    colIndex: 1,
    rowIndex: 2,
    iconSvg: (
      <svg viewBox="0 0 40 50" className="w-full h-full fill-none stroke-current stroke-1.5">
        <circle cx="20" cy="25" r="14" />
        <circle cx="20" cy="25" r="4" />
      </svg>
    ),
  },

  // Column 2 (Left Mid - Medium Size & Medium Brightness)
  {
    id: 'col2_item1',
    name: '朱漆耳杯',
    category: '漆器',
    era: '西汉 (广阳王陵)',
    description: '木胎黑红漆器，双耳呈新月形，宴飨盛酒之雅器。',
    memorySnippet: '双耳漆杯中盛满桂浆玉液，夜宴时王侯宾客举杯相和。',
    colIndex: 2,
    rowIndex: 0,
    iconSvg: (
      <svg viewBox="0 0 50 40" className="w-full h-full fill-none stroke-current stroke-2">
        <ellipse cx="25" cy="20" rx="16" ry="10" />
        <path d="M9 16 C3 16, 3 24, 9 24" />
        <path d="M41 16 C47 16, 47 24, 41 24" />
      </svg>
    ),
  },
  {
    id: 'col2_item2',
    name: '龙纹玉璧',
    category: '玉礼器',
    era: '西汉',
    description: '青白玉琢制，通体饰蒲纹与螭龙纹，用于礼天。',
    memorySnippet: '肉倍好谓之璧，苍璧礼天，通达神明。',
    colIndex: 2,
    rowIndex: 1,
    iconSvg: (
      <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-2">
        <circle cx="25" cy="25" r="18" />
        <circle cx="25" cy="25" r="6" />
        <circle cx="25" cy="25" r="12" strokeDasharray="3,3" />
      </svg>
    ),
  },
  {
    id: 'col2_item3',
    name: '汉代五铢钱',
    category: '货币',
    era: '西汉 (汉武帝至宣帝)',
    description: '汉代法定铜钱，外圆内方，铸造规整。',
    memorySnippet: '千百枚五铢钱穿绳成串，见证大汉盛世富足。',
    colIndex: 2,
    rowIndex: 2,
    iconSvg: (
      <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-2">
        <circle cx="25" cy="25" r="18" />
        <rect x="19" y="19" width="12" height="12" />
      </svg>
    ),
  },

  // Column 3 (Center - Largest & Most Vivid/Realistic)
  {
    id: 'col3_item1',
    name: '鎏金铜钫 (王府重器)',
    category: '青铜盛酒礼器',
    era: '西汉 (公元前1世纪)',
    description: '四棱方体，通体鎏金，饰铺首衔环。广阳王府举行宗庙与宫廷盛宴时盛放美酒的核心礼器。',
    memorySnippet: '鎏金四棱铜钫在灯烛下闪耀辉光，那是我站在王座前起舞的辉煌岁月！',
    colIndex: 3,
    rowIndex: 0,
    iconSvg: (
      <svg viewBox="0 0 60 70" className="w-full h-full fill-none stroke-current stroke-2.5">
        <rect x="15" y="8" width="30" height="8" rx="2" />
        <path d="M18 16 L12 56 L48 56 L42 16 Z" />
        <circle cx="30" cy="36" r="6" />
        <circle cx="30" cy="36" r="2" fill="currentColor" />
        <line x1="20" y1="56" x2="40" y2="56" />
      </svg>
    ),
  },
  {
    id: 'col3_item2',
    name: '凤鸟纹漆案 (宫廷长卷)',
    category: '漆器家具',
    era: '西汉 (广阳王陵)',
    description: '朱黑两色漆绘灵动飞翔的凤鸟与卷云纹，汉代贵族席地而坐宴饮之承案。',
    memorySnippet: '朱漆案前，丝竹管弦齐鸣，乐师抚琴，歌者咏怀。',
    colIndex: 3,
    rowIndex: 1,
    iconSvg: (
      <svg viewBox="0 0 70 50" className="w-full h-full fill-none stroke-current stroke-2.5">
        <rect x="5" y="14" width="60" height="10" rx="3" />
        <path d="M12 24 L10 40 M58 24 L60 40" />
        <path d="M20 18 Q35 12 50 18" strokeDasharray="4,2" />
      </svg>
    ),
  },
  {
    id: 'col3_item3',
    name: '朱漆弩机与铜郭',
    category: '兵器',
    era: '西汉',
    description: '大漆弩臂与精密青铜望山机郭，汉军克敌制胜之大国重器。',
    memorySnippet: '精密弩机扣发之间，千军辟易，守卫北疆安宁。',
    colIndex: 3,
    rowIndex: 2,
    iconSvg: (
      <svg viewBox="0 0 60 60" className="w-full h-full fill-none stroke-current stroke-2.5">
        <line x1="8" y1="30" x2="52" y2="30" />
        <path d="M14 10 L46 50" />
        <rect x="26" y="24" width="8" height="12" rx="1" />
      </svg>
    ),
  },

  // Column 4 (Right Mid - Medium Size & Medium Brightness)
  {
    id: 'col4_item1',
    name: '青铜博山炉',
    category: '礼仪香器',
    era: '西汉',
    description: '通体透雕仙山云气，焚香时烟气从山峦空隙袅袅升起，宛如海外仙山。',
    memorySnippet: '博山炉中香烟如云，那是汉代人对蓬莱仙境的美好向往。',
    colIndex: 4,
    rowIndex: 0,
    iconSvg: (
      <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-2">
        <path d="M15 32 C15 20, 35 20, 35 32 Z" />
        <path d="M15 32 Q25 10 35 32" strokeDasharray="3,2" />
        <line x1="25" y1="32" x2="25" y2="44" />
        <line x1="16" y1="44" x2="34" y2="44" />
      </svg>
    ),
  },
  {
    id: 'col4_item2',
    name: '星云纹铜镜',
    category: '青铜礼器',
    era: '西汉 (昭宣时期)',
    description: '纽外饰星云纹乳丁，寓意天地星宿运转，可照容貌亦可照见幽冥。',
    memorySnippet: '星云铜镜照亮通往天界的幽冥之路，纤尘不染。',
    colIndex: 4,
    rowIndex: 1,
    iconSvg: (
      <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-2">
        <circle cx="25" cy="25" r="18" />
        <circle cx="25" cy="25" r="4" fill="currentColor" />
        <circle cx="16" cy="18" r="2" />
        <circle cx="34" cy="18" r="2" />
        <circle cx="25" cy="35" r="2" />
      </svg>
    ),
  },
  {
    id: 'col4_item3',
    name: '青铜车马泡钉',
    category: '车马器',
    era: '西汉',
    description: '朱漆车舆外侧铜饰，错金银花纹。',
    memorySnippet: '大葆台车马坑中驷马安车，威仪赫赫。',
    colIndex: 4,
    rowIndex: 2,
    iconSvg: (
      <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-current stroke-2">
        <polygon points="25,12 36,36 14,36" />
        <circle cx="25" cy="26" r="4" />
      </svg>
    ),
  },

  // Column 5 (Far Right - Smallest & Dimmest)
  {
    id: 'col5_item1',
    name: '瓦当残片',
    category: '建筑构件',
    era: '西汉',
    description: '汉代宫殿檐头瓦当，刻有吉祥吉语。',
    memorySnippet: '千秋万岁，长乐未央。王府宫殿檐下的祝祷铭文。',
    colIndex: 5,
    rowIndex: 0,
    iconSvg: (
      <svg viewBox="0 0 40 50" className="w-full h-full fill-none stroke-current stroke-1.5">
        <circle cx="20" cy="25" r="15" />
        <line x1="20" y1="10" x2="20" y2="40" />
        <line x1="5" y1="25" x2="35" y2="25" />
      </svg>
    ),
  },
  {
    id: 'col5_item2',
    name: '骨笄 (发簪)',
    category: '生活装饰',
    era: '西汉',
    description: '兽骨磨制发簪，用于固定贵族女子高耸发髻。',
    memorySnippet: '一支骨笄挽起青丝，舞动时步摇晃动，仪态万千。',
    colIndex: 5,
    rowIndex: 1,
    iconSvg: (
      <svg viewBox="0 0 40 50" className="w-full h-full fill-none stroke-current stroke-1.5">
        <line x1="20" y1="6" x2="20" y2="44" />
        <polygon points="16,6 24,6 20,12" />
      </svg>
    ),
  },
  {
    id: 'col5_item3',
    name: '陶灶模型',
    category: '随葬陶器',
    era: '西汉',
    description: '微缩明器，汉代“事死如事生”之写照。',
    memorySnippet: '事死如事生，幽冥深处依然备齐了人间炊烟。',
    colIndex: 5,
    rowIndex: 2,
    iconSvg: (
      <svg viewBox="0 0 40 50" className="w-full h-full fill-none stroke-current stroke-1.5">
        <rect x="8" y="16" width="24" height="22" rx="2" />
        <circle cx="16" cy="24" r="3" />
        <circle cx="24" cy="24" r="3" />
      </svg>
    ),
  },
];

interface Page4Props {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

export const Page4FloatingGallery: React.FC<Page4Props> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedRelic, setSelectedRelic] = useState<RelicLineArtItem | null>(null);
  const [inspectedIds, setInspectedIds] = useState<string[]>([]);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isRisingFinished, setIsRisingFinished] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);

  // Rising from bottom animation trigger
  useEffect(() => {
    soundFX.playWindLeaves();
    const timer = setTimeout(() => {
      setIsRisingFinished(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectRelic = (relic: RelicLineArtItem) => {
    soundFX.playStoneDrum();
    setSelectedRelic(relic);

    if (!inspectedIds.includes(relic.id)) {
      const next = [...inspectedIds, relic.id];
      setInspectedIds(next);

      if (next.length >= 3 && !isUnlocked) {
        soundFX.playBronzeChime();
        onUnlockFragment();
        // Auto advance after 2.0s delay
        setTimeout(() => {
          onNextPage();
        }, 2000);
      }
    }
  };

  // Pan / Drag Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.touches[0].clientX - panOffset.x,
      y: e.touches[0].clientY - panOffset.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    setPanOffset({
      x: Math.max(-80, Math.min(80, e.touches[0].clientX - dragStartRef.current.x)),
      y: Math.max(-100, Math.min(100, e.touches[0].clientY - dragStartRef.current.y)),
    });
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    setPanOffset({
      x: Math.max(-80, Math.min(80, e.clientX - dragStartRef.current.x)),
      y: Math.max(-100, Math.min(100, e.clientY - dragStartRef.current.y)),
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="relative w-full h-full bg-[#120b07] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Header Bar */}
      <div className="p-2.5 bg-[#241a13]/90 border-b border-[#3d2b1f] backdrop-blur-md z-30 flex items-center justify-between shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHANGLE WEIYANG · PART 2
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
            第三章 · 浮游 (五列文物博览)
          </h2>
        </div>

        <div className="flex items-center gap-1 text-[9px] text-[#ffe89c] bg-[#3d2b1f] px-2 py-0.5 rounded-full border border-[#5c4033] font-mono">
          <Eye className="w-2.5 h-2.5" />
          <span>研读 {inspectedIds.length}/3 件</span>
        </div>
      </div>

      {/* Main 5-Column Rising & Draggable Space */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-2 cursor-grab active:cursor-grabbing">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#d2b48c 1px, transparent 0)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* 5-Column Container */}
        <div
          className="relative w-full max-w-sm h-full flex items-center justify-around transition-all duration-200"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          {[1, 2, 3, 4, 5].map((colIdx) => {
            const colItems = FIVE_COLUMN_RELICS.filter((i) => i.colIndex === colIdx);

            // Styling per column according to Requirement 6:
            // Col 3 (Center): largest, most realistic/brightest
            // Col 2 & 4: medium size, slightly dimmer
            // Col 1 & 5: smallest, dimmest
            const isCenter = colIdx === 3;
            const isMid = colIdx === 2 || colIdx === 4;

            const scaleClass = isCenter ? 'scale-110 z-20' : isMid ? 'scale-95 z-10' : 'scale-80 z-0';
            const opacityClass = isCenter ? 'opacity-100 text-[#ffe89c]' : isMid ? 'opacity-75 text-[#d2b48c]' : 'opacity-45 text-[#8c6e54]';
            const cardBg = isCenter ? 'bg-[#3d2b1f]/90 border-[#ffe89c]/70 shadow-xl ring-1 ring-[#ffe89c]/40' : isMid ? 'bg-[#291e16]/80 border-[#5c4033]' : 'bg-[#1a120b]/60 border-white/5';

            return (
              <div
                key={colIdx}
                className={`flex flex-col items-center justify-around h-[82%] transition-all duration-1000 ${
                  isRisingFinished ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'
                } ${scaleClass}`}
                style={{
                  transitionDelay: `${colIdx * 120}ms`,
                }}
              >
                {colItems.map((item) => {
                  const isInspected = inspectedIds.includes(item.id);
                  const isSelected = selectedRelic?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRelic(item);
                      }}
                      className={`cursor-pointer transition-all duration-200 flex flex-col items-center group p-1 ${
                        isSelected ? 'scale-125 z-40' : 'hover:scale-105'
                      }`}
                    >
                      {/* PNG Line Art Silhouette Card */}
                      <div
                        className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl p-1.5 border flex flex-col items-center justify-center transition-all ${cardBg} ${opacityClass}`}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          {item.iconSvg}
                        </div>
                        <span className="text-[7px] font-serif leading-none mt-0.5 tracking-tighter truncate w-full text-center">
                          {item.name}
                        </span>

                        {isInspected && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#2e4d36] text-white rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-2.5 h-2.5 text-[#cdeacd]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Selected Relic Card Modal Pop-up */}
        {selectedRelic && (
          <div className="absolute inset-x-3 bottom-2 z-40 bg-[#241a13]/95 border-2 border-[#5c4033] rounded-2xl p-3 shadow-2xl backdrop-blur-md text-[#d2b48c] space-y-1.5 animate-fade-in ring-1 ring-[#ffe89c]/30">
            <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#88b598] animate-ping" />
                <h3 className="text-xs font-black text-[#e6d5b8] font-serif">
                  {selectedRelic.name}
                </h3>
                <span className="text-[8px] px-1 py-0.2 rounded bg-black/40 text-[#ffe89c] font-mono">
                  {selectedRelic.category} · {selectedRelic.era}
                </span>
              </div>
              <button
                onClick={() => setSelectedRelic(null)}
                className="text-[#a3805d] hover:text-[#e6d5b8]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-[#c2a385] leading-snug">
              {selectedRelic.description}
            </p>

            {/* Restored Jade Dancer Memory Snippet */}
            <div className="bg-[#1a120b] p-1.5 rounded-xl border border-[#3d2b1f] text-[9px] text-[#cdeacd] italic">
              <strong>玉舞人记忆恢复：</strong> “{selectedRelic.memorySnippet}”
            </div>
          </div>
        )}
      </div>

      {/* Bottom Hint Strip */}
      <div className="p-1.5 bg-[#241a13] border-t border-[#3d2b1f] text-center z-20">
        <span className="text-[9px] text-[#8c6e54] font-serif flex items-center justify-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#ffe89c]" />
          可上下左右拖拽漫游 · 点击文物唤醒玉舞人记忆
        </span>
      </div>
    </div>
  );
};
