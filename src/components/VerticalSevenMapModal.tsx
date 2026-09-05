import React from 'react';
import { SectionKey, JadeFragmentId } from '../types';
import { Sparkles, X, CheckCircle2, ChevronRight, Compass, Shield, Gem, Eye, Activity, Wind, Hammer, Star } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';
import { HanPlaqueButton } from './HanPlaqueButton';

interface VerticalSevenMapModalProps {
  activeSection: SectionKey;
  unlockedFragments: JadeFragmentId[];
  onSelectSection: (key: SectionKey) => void;
  onClose: () => void;
}

interface ChapterItem {
  key: SectionKey;
  fragmentId: JadeFragmentId;
  index: number;
  name: string;
  depth: string;
  theme: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

interface HallGroup {
  id: string;
  hallName: string;
  hallSub: string;
  watermark: string;
  chapters: ChapterItem[];
}

const HALL_SECTIONS: HallGroup[] = [
  {
    id: 'hall_1',
    hallName: '第一部分 · 北土汉邦',
    hallSub: '大葆台汉代封国历史与武仪',
    watermark: '北土汉邦',
    chapters: [
      {
        key: 'weapon',
        fragmentId: 'frag_right_sleeve',
        index: 1,
        name: '第一关 · 戈影',
        depth: '地表下 1.2m · 武库遗存',
        theme: '武舞之器与朱干玉戚',
        desc: '在八件兵器中选出大葆台真正汉代仪仗兵器，重聚武舞记忆。',
        icon: <Shield className="w-3.5 h-3.5" />,
        color: '#e2a03f',
      },
    ],
  },
  {
    id: 'hall_2',
    hallName: '第二部分 · 长乐宴饮',
    hallSub: '汉代王府生活、宴乐与百戏艺术',
    watermark: '长乐宴饮',
    chapters: [
      {
        key: 'banquet',
        fragmentId: 'frag_chest_pendant',
        index: 2,
        name: '第二关 · 宴乐',
        depth: '地表下 2.2m · 宴饮乐庭',
        theme: '相机取景与乐声重现',
        desc: '用相机对齐现场宴饮展陈，驱散人物面部噪点，唤醒玉舞人挚友。',
        icon: <Gem className="w-3.5 h-3.5" />,
        color: '#e57373',
      },
      {
        key: 'gallery',
        fragmentId: 'frag_left_sleeve',
        index: 3,
        name: '第三关 · 浮游',
        depth: '地表下 3.1m · 随葬器室',
        theme: '五列纵向浮游文物',
        desc: '在时空错乱的浮动文物中，找回属于大葆台的三件真品器物。',
        icon: <Eye className="w-3.5 h-3.5" />,
        color: '#4db6ac',
      },
      {
        key: 'baixi',
        fragmentId: 'frag_robe_skirt',
        index: 4,
        name: '第四关 · 百戏',
        depth: '地表下 3.8m · 百戏画像',
        theme: '烛光照壁画与六博残局',
        desc: '点亮灯笼照亮三处百戏图景，按舞人步法走通六步六博残局。',
        icon: <Activity className="w-3.5 h-3.5" />,
        color: '#ffb74d',
      },
    ],
  },
  {
    id: 'hall_3',
    hallName: '第三部分 · 题凑礼藏',
    hallSub: '汉代地下王陵礼乐、黄肠木构与天文星象',
    watermark: '题凑礼藏',
    chapters: [
      {
        key: 'funerary',
        fragmentId: 'frag_waist',
        index: 5,
        name: '第五关 · 袖舞',
        depth: '地表下 4.5m · 幽暗墓道',
        theme: '送灵长袖与汉家礼仪',
        desc: '体味肃穆内敛的长袖云气仪式，辨识汉代秩序礼仪画面。',
        icon: <Wind className="w-3.5 h-3.5" />,
        color: '#9575cd',
      },
      {
        key: 'huangchang',
        fragmentId: 'frag_body_core',
        index: 6,
        name: '第六关 · 题凑',
        depth: '地表下 5.2m · 梓宫木构',
        theme: '黄肠题凑 1-5-5-8-0',
        desc: '从五组舞姿中破译 15880 考工密码，严密合拢柏木黄心。',
        icon: <Hammer className="w-3.5 h-3.5" />,
        color: '#81c784',
      },
      {
        key: 'ascension',
        fragmentId: 'frag_head_halo',
        index: 7,
        name: '第七关 · 星路',
        depth: '地底深处 · 银汉星轨',
        theme: '四象聚合与归途开启',
        desc: '顺应东苍龙、南朱鸟、西白虎、北玄武，连通四象开启时空归途。',
        icon: <Star className="w-3.5 h-3.5" />,
        color: '#64b5f6',
      },
    ],
  },
];

export const VerticalSevenMapModal: React.FC<VerticalSevenMapModalProps> = ({
  activeSection,
  unlockedFragments,
  onSelectSection,
  onClose,
}) => {
  return (
    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-3 select-none animate-fade-in font-serif overflow-hidden">
      {/* Header */}
      <div className="bg-[#2A1710] border border-[#B28A4A] rounded-xl p-3 flex items-center justify-between shadow-xl shrink-0">
        <div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#B28A4A] uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#D6A84B]" />
            <span>EXHIBITION HALL DIRECTORY</span>
          </div>
          <h3 className="text-sm font-black text-[#E6C875] tracking-wider flex items-center gap-2">
            <span>地图目录</span>
            <span className="text-[10px] text-[#D9C6A2]/70 font-normal">（三大展厅与七关时空）</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#170E09] border border-[#719783] text-[#719783] font-bold">
            已修复 {unlockedFragments.length}/7
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-[#170E09] text-[#D9C6A2] hover:text-[#E6C875] border border-[#B28A4A]/50 active:scale-95"
            title="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hall Groups Scrolling Area */}
      <div className="flex-1 overflow-y-auto my-2.5 px-0.5 space-y-3 scrollbar-none">
        {HALL_SECTIONS.map((hall) => (
          <div
            key={hall.id}
            className="relative rounded-xl bg-[#2A1710]/95 border border-[#B28A4A]/60 p-3 shadow-xl overflow-hidden group"
          >
            {/* Translucent Watermark in top-right */}
            <div
              className="absolute top-0 right-0 pointer-events-none select-none font-serif font-black text-right text-[42px] sm:text-[50px] leading-none tracking-widest text-[#B28A4A]/10 pr-2 pt-1 uppercase z-0"
              style={{
                fontFamily: '"Songti SC", "Noto Serif SC", serif',
                writingMode: 'horizontal-tb',
                transform: 'rotate(-2deg)',
                filter: 'blur(0.4px)',
              }}
            >
              {hall.watermark}
            </div>

            {/* Hall Header */}
            <div className="relative z-10 border-b border-[#6B3025]/50 pb-1.5 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-[#D6A84B] rounded-full" />
                <h4 className="text-xs font-black text-[#E6C875] tracking-wider">
                  {hall.hallName}
                </h4>
              </div>
              <span className="text-[8px] font-mono text-[#B28A4A]">
                {hall.hallSub}
              </span>
            </div>

            {/* Chapters list inside this hall */}
            <div className="relative z-10 space-y-1.5">
              {hall.chapters.map((ch) => {
                const isDone = unlockedFragments.includes(ch.fragmentId);
                const isCurrent = activeSection === ch.key;

                return (
                  <div
                    key={ch.key}
                    onClick={() => {
                      soundFX.playStoneDrum();
                      onSelectSection(ch.key);
                      onClose();
                    }}
                    className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#6B3025]/50 border-[#D6A84B] shadow-md ring-1 ring-[#D6A84B]/40'
                        : isDone
                        ? 'bg-[#170E09]/90 border-[#719783]/60 hover:border-[#719783]'
                        : 'bg-[#170E09]/80 border-[#6B3025]/40 hover:border-[#B28A4A]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Chapter Badge Icon */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                          isDone
                            ? 'bg-[#170E09] border-[#719783] text-[#719783]'
                            : isCurrent
                            ? 'bg-[#6B3025] border-[#D6A84B] text-[#E6C875]'
                            : 'bg-[#170E09] border-[#6B3025] text-[#B28A4A]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 text-[#719783]" /> : ch.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-black text-[#E6C875] font-serif">
                            {ch.name}
                          </span>
                          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#170E09] text-[#B28A4A] border border-[#6B3025]/40">
                            {ch.depth}
                          </span>
                        </div>
                        <p className="text-[9px] text-[#D9C6A2]/80 leading-tight mt-0.5 line-clamp-1">
                          {ch.desc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-1.5 flex items-center">
                      {isDone ? (
                        <span className="text-[9px] text-[#719783] font-mono font-bold">
                          已通关
                        </span>
                      ) : isCurrent ? (
                        <span className="text-[9px] text-[#E6C875] font-mono font-bold">
                          进行中
                        </span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[#6B3025] group-hover:text-[#D6A84B]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Return Button */}
      <HanPlaqueButton
        onClick={onClose}
        size="md"
        className="w-full shrink-0"
      >
        返回当前展厅
      </HanPlaqueButton>
    </div>
  );
};
