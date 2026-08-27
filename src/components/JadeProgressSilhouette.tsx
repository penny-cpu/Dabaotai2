import React from 'react';
import { JadeFragmentId } from '../types';
import { JADE_FRAGMENTS_CONFIG } from '../data/scriptQuestData';
import { Sparkles } from 'lucide-react';

interface JadeProgressSilhouetteProps {
  unlockedFragments: JadeFragmentId[];
  onOpenMap?: () => void;
}

export const JadeProgressSilhouette: React.FC<JadeProgressSilhouetteProps> = ({
  unlockedFragments,
  onOpenMap,
}) => {
  const total = 7;
  const count = unlockedFragments.length;
  const percent = Math.round((count / total) * 100);

  // Check if a specific fragment is unlocked
  const isUnlocked = (id: JadeFragmentId) => unlockedFragments.includes(id);

  return (
    <div
      onClick={onOpenMap}
      className="w-full bg-[#241a13]/95 border-b border-[#3d2b1f] px-3 py-1.5 backdrop-blur-md z-30 flex items-center justify-between shadow-lg cursor-pointer select-none group hover:bg-[#2c1d12] transition-colors"
      title="点击查看七章纵向考古地图与记忆玉片"
    >
      {/* Left: Memory Tag */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="w-5 h-5 rounded-full bg-[#3d2b1f] border border-[#d2b48c]/60 flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-[#d2b48c] animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-[#a3805d] leading-none uppercase tracking-widest">
            JADE MEMORY
          </span>
          <span className="text-xs font-black text-[#e6d5b8] font-serif tracking-wider">
            记忆恢复 <strong className="text-[#ffe89c] font-mono">{count}/7</strong>
          </span>
        </div>
      </div>

      {/* Center: Slim Jade Dancer Silhouette with 7 distinct puzzle pieces */}
      <div className="flex-1 max-w-[170px] mx-2 flex items-center justify-center">
        <div className="relative w-full h-8 flex items-center justify-center px-1">
          {/* Stylized Silhouette Representation composed of 7 Jade Chips */}
          <div className="flex items-center gap-1 w-full justify-between">
            {/* 1. 右袖 */}
            <div
              className={`h-4 w-3 rounded-l-md border transition-all duration-500 relative ${
                isUnlocked('frag_right_sleeve')
                  ? 'bg-gradient-to-br from-[#cdeacd] to-[#88b598] border-[#e8f5e9] shadow-[0_0_8px_rgba(180,240,200,0.8)] scale-105'
                  : 'bg-[#1a120b] border-[#5c4033] opacity-40'
              }`}
              title="1. 戈影 · 右袖"
            />

            {/* 2. 胸前佩饰 */}
            <div
              className={`h-3 w-3 rounded-full border transition-all duration-500 ${
                isUnlocked('frag_chest_pendant')
                  ? 'bg-gradient-to-br from-[#d4f0d4] to-[#7aa88a] border-[#e8f5e9] shadow-[0_0_8px_rgba(180,240,200,0.8)] scale-110'
                  : 'bg-[#1a120b] border-[#5c4033] opacity-40'
              }`}
              title="2. 佩鸣 · 胸前佩饰"
            />

            {/* 3. 左袖 */}
            <div
              className={`h-4 w-3 rounded-r-md border transition-all duration-500 ${
                isUnlocked('frag_left_sleeve')
                  ? 'bg-gradient-to-br from-[#cdeacd] to-[#88b598] border-[#e8f5e9] shadow-[0_0_8px_rgba(180,240,200,0.8)] scale-105'
                  : 'bg-[#1a120b] border-[#5c4033] opacity-40'
              }`}
              title="3. 浮游 · 左袖"
            />

            {/* 4. 衣摆 */}
            <div
              className={`h-5 w-3.5 rounded-b-md border transition-all duration-500 ${
                isUnlocked('frag_robe_skirt')
                  ? 'bg-gradient-to-br from-[#cdeacd] to-[#88b598] border-[#e8f5e9] shadow-[0_0_8px_rgba(180,240,200,0.8)] scale-105'
                  : 'bg-[#1a120b] border-[#5c4033] opacity-40'
              }`}
              title="4. 百戏 · 衣摆"
            />

            {/* 5. 腰身 */}
            <div
              className={`h-4 w-3 rounded-sm border transition-all duration-500 ${
                isUnlocked('frag_waist')
                  ? 'bg-gradient-to-br from-[#cdeacd] to-[#88b598] border-[#e8f5e9] shadow-[0_0_8px_rgba(180,240,200,0.8)] scale-105'
                  : 'bg-[#1a120b] border-[#5c4033] opacity-40'
              }`}
              title="5. 云镜 · 腰身"
            />

            {/* 6. 身体主体 */}
            <div
              className={`h-6 w-4 rounded-sm border transition-all duration-500 ${
                isUnlocked('frag_body_core')
                  ? 'bg-gradient-to-br from-[#d4f0d4] to-[#6f9c80] border-[#e8f5e9] shadow-[0_0_8px_rgba(180,240,200,0.8)] scale-105'
                  : 'bg-[#1a120b] border-[#5c4033] opacity-40'
              }`}
              title="6. 木阵 · 身体主体"
            />

            {/* 7. 头部与最终光环 */}
            <div
              className={`h-4 w-4 rounded-full border-2 transition-all duration-500 relative ${
                isUnlocked('frag_head_halo')
                  ? 'bg-gradient-to-br from-[#fff7d6] to-[#a8d4b5] border-[#ffe89c] shadow-[0_0_12px_rgba(255,230,150,0.9)] animate-pulse scale-110'
                  : 'bg-[#1a120b] border-[#5c4033] opacity-40'
              }`}
              title="7. 星路 · 头部与光环"
            />
          </div>
        </div>
      </div>

      {/* Right: Map Entrance Button */}
      <div className="flex items-center gap-1 text-[10px] text-[#d2b48c] font-serif bg-[#3d2b1f] px-2 py-1 rounded-lg border border-[#5c4033] group-hover:border-[#d2b48c] transition-colors shrink-0">
        <span>七章地图</span>
        <span className="font-mono text-[9px] text-[#ffe89c]">▼</span>
      </div>
    </div>
  );
};
