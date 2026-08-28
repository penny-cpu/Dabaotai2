import React from 'react';
import { JadeFragmentId } from '../types';
import { Sparkles, Map } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface JadeProgressSilhouetteProps {
  unlockedFragments: JadeFragmentId[];
  onOpenMap: () => void;
  isCorrupted?: boolean;
}

const ALL_FRAGMENTS: { id: JadeFragmentId; name: string; stage: string }[] = [
  { id: 'frag_right_sleeve', name: '右袖', stage: '戈影' },
  { id: 'frag_chest_pendant', name: '胸佩', stage: '宴乐' },
  { id: 'frag_left_sleeve', name: '左袖', stage: '浮游' },
  { id: 'frag_robe_skirt', name: '衣摆', stage: '百戏' },
  { id: 'frag_waist', name: '腰身', stage: '袖舞' },
  { id: 'frag_body_core', name: '主体', stage: '木阵' },
  { id: 'frag_head_halo', name: '首光', stage: '星路' },
];

export const JadeProgressSilhouette: React.FC<JadeProgressSilhouetteProps> = ({
  unlockedFragments,
  onOpenMap,
  isCorrupted = false,
}) => {
  const count = unlockedFragments.length;
  const isFull = count === 7;

  return (
    <div className="w-full bg-[#120d09]/95 border-b border-[#3d2b1f] px-3 py-2 flex items-center justify-between z-30 shadow-lg backdrop-blur-md">
      {/* Mini Jade Silhouette Preview */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-9 flex items-center justify-center bg-[#1c130d] border border-[#5c4033] rounded-lg p-0.5 shadow-inner">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            {/* Base faint outline */}
            <path
              d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
              fill="none"
              stroke={isCorrupted ? '#552222' : '#3d2b1f'}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Restored glowing jade path */}
            <path
              d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
              fill="none"
              stroke={isCorrupted ? '#e53e3e' : '#a7f3d0'}
              strokeWidth="4.5"
              strokeDasharray="280"
              strokeDashoffset={280 - (280 * count) / 7}
              strokeLinecap="round"
              className="transition-all duration-700 filter drop-shadow-[0_0_4px_rgba(167,243,208,0.8)]"
            />
            {count >= 7 && <circle cx="50" cy="14" r="6" fill="#e6fffa" />}
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black text-[#e6d5b8] font-serif tracking-wide">
              玉舞人记忆修复
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${
                isFull
                  ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                  : 'bg-[#241a13] border-[#5c4033] text-[#ffe89c]'
              }`}
            >
              {count}/7
            </span>
          </div>
          {/* Fragment dot bar */}
          <div className="flex items-center gap-1 mt-0.5">
            {ALL_FRAGMENTS.map((frag, idx) => {
              const active = unlockedFragments.includes(frag.id);
              return (
                <div
                  key={frag.id}
                  title={`${frag.stage}: ${frag.name}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    active
                      ? 'bg-[#88b598] shadow-[0_0_6px_#88b598] scale-110'
                      : 'bg-[#291b12] border border-[#4a3424]'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Button */}
      <button
        onClick={() => {
          soundFX.playStoneDrum();
          onOpenMap();
        }}
        className="px-2.5 py-1 bg-[#241a13] hover:bg-[#3d2b1f] text-[#d2b48c] border border-[#5c4033] rounded-xl text-[10px] font-serif flex items-center gap-1 transition-all active:scale-95 shadow-md"
      >
        <Map className="w-3 h-3 text-[#ffe89c]" />
        <span>地图目录</span>
      </button>
    </div>
  );
};
