import React from 'react';
import { SectionKey, JadeFragmentId } from '../types';
import { soundFX } from '../utils/soundEngine';
import { X, Sparkles, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

interface SevenChapterMapModalProps {
  activeSection: SectionKey;
  unlockedFragments: JadeFragmentId[];
  onSelectSection: (key: SectionKey) => void;
  onClose: () => void;
}

interface ChapterItem {
  key: SectionKey;
  num: string;
  name: string;
  subtitle: string;
  fragmentId: JadeFragmentId;
  fragmentPart: string;
}

interface HallSection {
  id: string;
  title: string;
  hallName: string;
  elevation: string;
  strataDesc: string;
  bgColor: string;
  borderColor: string;
  watermarkColor: string;
  chapters: ChapterItem[];
}

const HALL_SECTIONS: HallSection[] = [
  {
    id: 'hall_1',
    title: '第一部分 · 北土汉邦',
    hallName: '北土汉邦',
    elevation: '标高 -0.0m ~ -1.2m',
    strataDesc: '表层风沙与广阳武备 · 诸侯王武舞礼器',
    bgColor: 'bg-gradient-to-br from-[#3d2b1a] to-[#241a10]',
    borderColor: 'border-[#8c6239]',
    watermarkColor: 'text-[#8c6239]/15',
    chapters: [
      {
        key: 'weapon',
        num: '01',
        name: '第一章 · 戈影',
        subtitle: '武舞之器 · 错金银八棱棁与铁剑',
        fragmentId: 'frag_right_sleeve',
        fragmentPart: '右袖玉片',
      },
    ],
  },
  {
    id: 'hall_2',
    title: '第二部分 · 长乐未央',
    hallName: '长乐未央',
    elevation: '标高 -1.2m ~ -3.8m',
    strataDesc: '西汉宫廷宴飨与市井百戏 · 礼乐生活',
    bgColor: 'bg-gradient-to-br from-[#4a3220] to-[#2b1c12]',
    borderColor: 'border-[#a37042]',
    watermarkColor: 'text-[#a37042]/15',
    chapters: [
      {
        key: 'pendant',
        num: '02',
        name: '第二章 · 宴乐',
        subtitle: '组玉佩寻佩 · 翘袖折腰舞姿',
        fragmentId: 'frag_chest_pendant',
        fragmentPart: '胸前佩饰',
      },
      {
        key: 'gallery',
        num: '03',
        name: '第三章 · 浮游',
        subtitle: '五列文物上升 · 汉代珍宝漫游',
        fragmentId: 'frag_left_sleeve',
        fragmentPart: '左袖玉片',
      },
      {
        key: 'baixi',
        num: '04',
        name: '第四章 · 百戏',
        subtitle: '蜡烛照百戏图 · 俳优跳丸算术',
        fragmentId: 'frag_robe_skirt',
        fragmentPart: '衣摆玉片',
      },
    ],
  },
  {
    id: 'hall_3',
    title: '第三部分 · 题凑礼藏',
    hallName: '题凑礼藏',
    elevation: '标高 -3.8m ~ -5.5m+',
    strataDesc: '地下梓宫堡垒与星宿升仙 · 天人秩序',
    bgColor: 'bg-gradient-to-br from-[#2a2016] to-[#120f0a]',
    borderColor: 'border-[#5c4033]',
    watermarkColor: 'text-[#d2b48c]/10',
    chapters: [
      {
        key: 'funerary',
        num: '05',
        name: '第五章 · 袖舞',
        subtitle: '送灵入墓 · S形云气痕与星云纹铜镜',
        fragmentId: 'frag_waist',
        fragmentPart: '腰身玉片',
      },
      {
        key: 'huangchang',
        num: '06',
        name: '第六章 · 题凑',
        subtitle: '黄肠题凑 · 15880柏木堡垒考工',
        fragmentId: 'frag_body_core',
        fragmentPart: '身体主体',
      },
      {
        key: 'ascension',
        num: '07',
        name: '第七章 · 星路',
        subtitle: '极光星空 · 四象聚星与七盘一鼓升仙',
        fragmentId: 'frag_head_halo',
        fragmentPart: '头部星环',
      },
    ],
  },
];

export const SevenChapterMapModal: React.FC<SevenChapterMapModalProps> = ({
  activeSection,
  unlockedFragments,
  onSelectSection,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 select-none font-serif animate-fade-in">
      {/* Outer Archaeological Frame */}
      <div className="w-full max-w-md bg-[#1a120b] border-2 border-[#5c4033] rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[88vh] text-[#d2b48c] relative ring-1 ring-[#d2b48c]/30">
        {/* Top Header */}
        <div className="p-3 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#3d2b1f] border border-[#d2b48c]/50 flex items-center justify-center">
              <Compass className="w-4 h-4 text-[#ffe89c]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#e6d5b8] font-serif tracking-widest title-drop-shadow flex items-center gap-1.5">
                地图目录
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#3d2b1f] text-[#ffe89c] font-mono font-normal">
                  三大展厅
                </span>
              </h2>
              <p className="text-[9px] text-[#a3805d] font-mono">
                北京大葆台西汉墓博物馆 · 探索进度({unlockedFragments.length}/7)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1a120b] border border-[#3d2b1f] text-[#c2a385] hover:text-[#e6d5b8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Archaeological Surveying Lines & Crosshairs Header Indicator */}
        <div className="px-3 py-1 bg-[#1f150e] border-b border-[#3d2b1f] flex items-center justify-between text-[8px] font-mono text-[#8c6e54]">
          <span>+ GRID E116°18′ N39°48′</span>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-0.5 bg-[#8c6e54]" />
            <span>测绘基准标高 ±0.00m</span>
          </div>
        </div>

        {/* 3 Exhibition Hall Sections Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3.5 relative scrollbar-none">
          {/* Surveying Elevation Ruler on Left Edge */}
          <div className="absolute left-1 top-3 bottom-3 w-1.5 border-l border-dashed border-[#5c4033] flex flex-col justify-between text-[7px] font-mono text-[#735843] pl-0.5 pointer-events-none">
            <span>0.0m</span>
            <span>-1.2m</span>
            <span>-2.8m</span>
            <span>-4.2m</span>
            <span>-5.5m</span>
          </div>

          {HALL_SECTIONS.map((hall) => (
            <div
              key={hall.id}
              className={`relative ml-4 rounded-2xl border-2 ${hall.borderColor} ${hall.bgColor} p-3 overflow-hidden shadow-lg transition-all`}
            >
              {/* Semi-transparent Background Watermark Text in Top-Right (~2/3 Area, subtle color) */}
              <div
                className={`absolute -top-3 -right-2 font-serif font-black ${hall.watermarkColor} text-4xl sm:text-5xl tracking-widest select-none pointer-events-none uppercase leading-none opacity-80`}
                style={{
                  fontFamily: 'STKaiti, "Kaiti SC", "SimSun", serif',
                  transform: 'rotate(-4deg)',
                }}
              >
                {hall.hallName}
              </div>

              {/* Hall Section Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-[#e6d5b8] font-serif tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-[#d2b48c] rounded-full inline-block" />
                    {hall.title}
                  </h3>
                  <p className="text-[8px] text-[#c2a385] font-serif mt-0.5 opacity-90">
                    {hall.strataDesc}
                  </p>
                </div>
                <span className="text-[8px] font-mono text-[#ffe89c] bg-black/40 px-1.5 py-0.5 rounded border border-white/10 shrink-0">
                  {hall.elevation}
                </span>
              </div>

              {/* Chapter Entries inside this Hall */}
              <div className="relative z-10 space-y-1.5">
                {hall.chapters.map((chap) => {
                  const isCurrent = activeSection === chap.key;
                  const isUnlocked = unlockedFragments.includes(chap.fragmentId);

                  return (
                    <div
                      key={chap.key}
                      onClick={() => {
                        soundFX.playStoneDrum();
                        onSelectSection(chap.key);
                        onClose();
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#3d2b1f]/90 border-[#ffe89c] shadow-md scale-[1.01]'
                          : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/45'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Status Icon */}
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                            isUnlocked
                              ? 'bg-[#2e4d36] border-[#88b598] text-[#cdeacd]'
                              : isCurrent
                              ? 'bg-[#ffe89c] border-[#e6d5b8] text-[#1a120b] animate-pulse'
                              : 'bg-[#1a120b] border-[#5c4033] text-[#8c6e54]'
                          }`}
                        >
                          {isUnlocked ? <CheckCircle2 className="w-3.5 h-3.5 text-[#88b598]" /> : chap.num}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-black text-[#e6d5b8] font-serif tracking-wide">
                              {chap.name}
                            </h4>
                            {isUnlocked && (
                              <span className="text-[7px] px-1 py-0.2 rounded bg-[#2e4d36] text-[#cdeacd] font-mono">
                                已收集: {chap.fragmentPart}
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] text-[#c2a385] font-serif truncate max-w-[200px]">
                            {chap.subtitle}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-[#8c6e54] shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Epilogue Navigation Entry */}
          <div
            onClick={() => {
              soundFX.playStoneDrum();
              onSelectSection('epilogue');
              onClose();
            }}
            className="ml-4 p-2.5 rounded-2xl bg-[#241a13] border border-[#d2b48c]/40 hover:border-[#ffe89c] text-center cursor-pointer transition-all shadow-md"
          >
            <span className="text-xs font-black text-[#ffe89c] tracking-widest flex items-center justify-center gap-1.5 font-serif">
              <Sparkles className="w-3.5 h-3.5 text-[#ffe89c]" /> 终章 · 玉舞人揖礼与记忆长卷明信片
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
