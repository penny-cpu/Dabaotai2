import React from 'react';
import { SectionKey, JadeFragmentId } from '../types';
import { Sparkles, X, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface VerticalSevenMapModalProps {
  activeSection: SectionKey;
  unlockedFragments: JadeFragmentId[];
  onSelectSection: (key: SectionKey) => void;
  onClose: () => void;
}

const STAGES: {
  key: SectionKey;
  fragmentId: JadeFragmentId;
  index: number;
  name: string;
  depth: string;
  theme: string;
  desc: string;
  color: string;
}[] = [
  {
    key: 'weapon',
    fragmentId: 'frag_right_sleeve',
    index: 1,
    name: '第一关 · 戈影',
    depth: '地表下 1.2m · 武库遗址',
    theme: '武舞之器与朱干玉戚',
    desc: '在八件兵器中找出大葆台展陈对应的两件，唤醒武舞记忆。',
    color: '#e2a03f',
  },
  {
    key: 'banquet',
    fragmentId: 'frag_chest_pendant',
    index: 2,
    name: '第二关 · 宴乐',
    depth: '地表下 2.2m · 宴饮乐庭',
    theme: '现场拍照与乐声重现',
    desc: '用相机取景对齐宴乐展陈，让玉舞人重新认出共舞的朋友。',
    color: '#e57373',
  },
  {
    key: 'gallery',
    fragmentId: 'frag_left_sleeve',
    index: 3,
    name: '第三关 · 浮游',
    depth: '地表下 3.1m · 随葬器室',
    theme: '五列纵向浮游文物',
    desc: '从混入错误时代的浮动文物中选出三件大葆台真品。',
    color: '#4db6ac',
  },
  {
    key: 'baixi',
    fragmentId: 'frag_robe_skirt',
    index: 4,
    name: '第四关 · 百戏',
    depth: '地表下 3.8m · 百戏壁画',
    theme: '烛光照壁画与六博残局',
    desc: '照亮三处百戏图景，看视频后走完六步六博残局。',
    color: '#ffb74d',
  },
  {
    key: 'funerary',
    fragmentId: 'frag_waist',
    index: 5,
    name: '第五关 · 袖舞',
    depth: '地表下 4.5m · 幽暗墓道',
    theme: '送行长袖与礼仪画面',
    desc: '观看长袖送葬仪式，辨认符合汉代秩序的礼仪画面。',
    color: '#9575cd',
  },
  {
    key: 'huangchang',
    fragmentId: 'frag_body_core',
    index: 6,
    name: '第六关 · 木阵',
    depth: '地表下 5.2m · 梓宫木构',
    theme: '黄肠题凑 1-5-5-8-0',
    desc: '从舞人姿态中读出密码，重新搭起一万五千八百八十根黄心柏木。',
    color: '#81c784',
  },
  {
    key: 'ascension',
    fragmentId: 'frag_head_halo',
    index: 7,
    name: '第七关 · 星路',
    depth: '地底深处 · 银汉星海',
    theme: '四象聚合与归途开启',
    desc: '聚合青龙白虎朱雀玄武四象星图，连接四段舞姿打开时空归途。',
    color: '#64b5f6',
  },
];

export const VerticalSevenMapModal: React.FC<VerticalSevenMapModalProps> = ({
  activeSection,
  unlockedFragments,
  onSelectSection,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-3 select-none animate-fade-in font-serif">
      {/* Header */}
      <div className="bg-[#1c130d] border-2 border-[#5c4033] rounded-2xl p-3 flex items-center justify-between shadow-2xl">
        <div>
          <div className="flex items-center gap-1 text-[9px] font-mono text-[#a3805d] uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#ffe89c]" />
            <span>SEVEN-LAYER VERTICAL TOMB MAP</span>
          </div>
          <h3 className="text-sm font-black text-[#e6d5b8] tracking-wider">
            大葆台七层时空地脉图
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0e241b] border border-emerald-500 text-emerald-300 font-bold">
            已修复 {unlockedFragments.length}/7
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-[#291b12] text-[#d2b48c] hover:text-white border border-[#4a3424]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vertical Map Scrolling Area */}
      <div className="flex-1 overflow-y-auto my-2 px-1 space-y-2.5 relative scrollbar-none">
        {/* Continuous depth vertical guide line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-600 via-[#88b598] to-blue-500 opacity-40" />

        {STAGES.map((stg) => {
          const isDone = unlockedFragments.includes(stg.fragmentId);
          const isCurrent = activeSection === stg.key;

          return (
            <div
              key={stg.key}
              onClick={() => {
                soundFX.playStoneDrum();
                onSelectSection(stg.key);
                onClose();
              }}
              className={`relative ml-4 pl-6 pr-3 py-2.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#291b12] border-[#ffe89c] scale-[1.02] shadow-[0_0_15px_rgba(255,232,156,0.3)]'
                  : isDone
                  ? 'bg-[#0f1d18]/90 border-[#3b664d]'
                  : 'bg-[#140e0a]/80 border-[#2b1b12] opacity-85'
              }`}
            >
              {/* Left Node Dot on the vertical line */}
              <div
                className={`absolute -left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? 'bg-[#1a382b] border-[#68d391] text-[#68d391] shadow-[0_0_8px_#68d391]'
                    : isCurrent
                    ? 'bg-[#ffe89c] border-amber-600 text-black font-black font-mono animate-bounce'
                    : 'bg-[#1c130d] border-[#4a3424] text-[#7a5a3a]'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-[10px]">{stg.index}</span>
                )}
              </div>

              {/* Stage Info */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#e6d5b8] font-serif">
                      {stg.name}
                    </span>
                    <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-[#a3805d]">
                      {stg.depth}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#ffe89c] mt-0.5">
                    {stg.theme}
                  </div>
                  <p className="text-[9px] text-[#a3805d] leading-tight mt-0.5 line-clamp-2">
                    {stg.desc}
                  </p>
                </div>

                <div className="flex items-center self-center shrink-0 ml-1">
                  {isDone ? (
                    <span className="text-[9px] text-[#68d391] font-mono font-bold">
                      玉化已复
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#a3805d]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Return Button */}
      <button
        onClick={onClose}
        className="w-full py-2.5 bg-[#241a13] hover:bg-[#3d2b1f] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#5c4033] text-xs shadow-xl active:scale-98 transition-all flex items-center justify-center gap-1"
      >
        <span>返回当前关卡</span>
      </button>
    </div>
  );
};
