import React, { useState, useEffect } from 'react';
import { ASSET_REGISTRY } from '../data/assetRegistry';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, ArrowDown, Shield, Eye, Lock, Volume2 } from 'lucide-react';

interface Page6HuangchangBoundaryProps {
  onNextPage: () => void;
}

export const Page6HuangchangBoundary: React.FC<Page6HuangchangBoundaryProps> = ({ onNextPage }) => {
  const [scrollStage, setScrollStage] = useState<number>(1); // 1: 整体全景, 2: 靠近木墙, 3: 局部结构, 4: 内部梓宫, 5: 事死如事生转场
  const [showQuote, setShowQuote] = useState(false);
  const [showGoldLight, setShowGoldLight] = useState(false);

  const handleAdvanceStage = () => {
    soundFX.playTimberDrop();
    if (scrollStage < 4) {
      setScrollStage((prev) => prev + 1);
    } else if (scrollStage === 4) {
      setScrollStage(5);
      // Trigger "事死如事生" transition sequence
      setTimeout(() => {
        setShowQuote(true);
      }, 300);
      setTimeout(() => {
        setShowGoldLight(true);
      }, 2500);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#0a0705] text-[#d2b48c] flex flex-col justify-between overflow-hidden select-none font-serif">
      {/* Header Info */}
      <div className="p-3 bg-[#17100b]/90 border-b border-[#3d2b1f] backdrop-blur-md z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d2b48c] animate-ping" />
          <span className="text-xs font-black text-[#e6d5b8] tracking-wider">
            第六页 · 黄肠题凑 (死亡的边界)
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2c1d12] text-[#d2b48c] border border-[#5c4033]">
          阶段 {scrollStage}/5
        </span>
      </div>

      {/* Main Visual Arena - Dark Wooden Fortress & Transition */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
        {/* Stage 1-4: Wooden Fortress Exploration */}
        {scrollStage <= 4 && (
          <div className="relative w-full h-full flex flex-col items-center justify-between transition-all duration-700">
            {/* Background Timber Texture Grid */}
            <div
              className={`absolute inset-0 transition-transform duration-700 ${
                scrollStage === 1
                  ? 'scale-100 opacity-60'
                  : scrollStage === 2
                  ? 'scale-125 opacity-75'
                  : scrollStage === 3
                  ? 'scale-150 opacity-90'
                  : 'scale-200 opacity-100 filter brightness-50'
              }`}
              style={{
                backgroundImage: `radial-gradient(#d2b48c 1px, transparent 0), linear-gradient(to bottom, #17100b, #0d0906)`,
                backgroundSize: '12px 12px, 100% 100%',
              }}
            >
              {/* Reserved Timber PNG Asset Placeholder */}
              <div className="hidden" data-asset-path={ASSET_REGISTRY['05_huangchang'].items.timberFullStructure.path} />
            </div>

            {/* Archaeological Data Annotations */}
            <div className="z-10 w-full flex justify-between text-[10px] font-mono text-[#a3805d] px-2 pt-2">
              <span className="bg-black/60 px-2 py-1 rounded border border-[#3d2b1f]">
                柏木数量: <strong className="text-[#e6d5b8]">15,880 根</strong>
              </span>
              <span className="bg-black/60 px-2 py-1 rounded border border-[#3d2b1f]">
                规格: <strong className="text-[#e6d5b8]">90×10×10 cm</strong>
              </span>
              <span className="bg-black/60 px-2 py-1 rounded border border-[#3d2b1f]">
                墙体: <strong className="text-[#e6d5b8]">高3M · 厚0.9M</strong>
              </span>
            </div>

            {/* Central Ticou Timber Alignment Visualizer */}
            <div className="z-20 my-auto text-center space-y-3 max-w-xs">
              <div className="relative mx-auto w-48 h-48 rounded-2xl border-2 border-[#5c4033] bg-[#1a120b]/90 p-3 shadow-2xl flex flex-col items-center justify-center overflow-hidden ring-1 ring-[#d2b48c]/30">
                {/* Concentric Ticou Layers Animation */}
                <div className="absolute inset-2 border-4 border-[#3d2b1f] rounded-xl flex items-center justify-center">
                  <div className="absolute inset-3 border-2 border-dashed border-[#8c6b4b]/60 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#3d2b1f] rounded border border-[#d2b48c] flex items-center justify-center shadow-inner">
                      <span className="text-[11px] font-bold text-[#e6d5b8]">
                        {scrollStage === 4 ? '梓宫 · 漆棺' : '便房 · 墓室中心'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Wood End-Grain Tags */}
                <div className="absolute top-1 text-[8px] text-[#c2a385] font-mono tracking-widest">
                  「题」木头向内
                </div>
                <div className="absolute bottom-1 text-[8px] text-[#c2a385] font-mono tracking-widest">
                  「凑」层层紧扣
                </div>
              </div>

              {/* Stage Specific Description */}
              <div className="bg-[#17100b]/90 p-3 rounded-2xl border border-[#3d2b1f] text-xs text-[#c2a385] backdrop-blur-md shadow-xl">
                {scrollStage === 1 && (
                  <p className="text-[#e6d5b8] font-black">
                    【阶段 1 · 远观黄肠】地下深处，由 15,880 根柏木枋砌筑的巨大木质堡垒完整现身。
                  </p>
                )}
                {scrollStage === 2 && (
                  <p className="text-[#e6d5b8] font-black">
                    【阶段 2 · 逼近木墙】镜头靠近厚达 0.9 米的柏木防线，每一块柏木均为黄心切面。
                  </p>
                )}
                {scrollStage === 3 && (
                  <p className="text-[#e6d5b8] font-black">
                    【阶段 3 · 榫卯细节】柏木紧密相拼，不见一丝缝隙，岁月的年轮与金石凿痕清晰可见。
                  </p>
                )}
                {scrollStage === 4 && (
                  <p className="text-[#e6d5b8] font-black">
                    【阶段 4 · 深入梓宫】穿透厚重木墙，进入王陵最核心的梓宫与便房，触及人间与死亡的终点。
                  </p>
                )}
              </div>
            </div>

            {/* Advance Control Button */}
            <div className="z-30 pb-4">
              <button
                onClick={handleAdvanceStage}
                className="px-6 py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] rounded-2xl border-2 border-[#d2b48c] text-xs font-black shadow-2xl flex items-center gap-2 active:scale-95 transition-all"
              >
                <ArrowDown className="w-4 h-4 text-[#d2b48c] animate-bounce" />
                {scrollStage < 4 ? `向深处探索 (下一阶段)` : `穿越黄肠题凑 (进入世界转场)`}
              </button>
            </div>
          </div>
        )}

        {/* Stage 5: Core Transition ("事死如事生" -> Gold Light & New World) */}
        {scrollStage === 5 && (
          <div className="absolute inset-0 bg-[#050302] flex flex-col items-center justify-center p-6 text-center z-40 animate-fade-in">
            {/* Falling Cypress Chips Particles */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#d2b48c_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />

            {!showGoldLight ? (
              <div className="space-y-6 max-w-xs transition-all duration-1000">
                {showQuote && (
                  <div className="space-y-3 animate-fade-in">
                    <span className="text-3xl font-black font-serif text-[#e6d5b8] tracking-[0.3em] title-drop-shadow block border-y-2 border-[#d2b48c]/40 py-4 my-4">
                      事死如事生
                    </span>
                    <p className="text-xs text-[#a3805d] font-mono">
                      —— 汉代王陵墓室石壁刻文
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6 max-w-xs animate-fade-in">
                {/* Emerging Golden Light from Darkness */}
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#ffe89c] via-[#d2b48c] to-[#a3805d] p-1 shadow-[0_0_50px_rgba(255,232,156,0.8)] animate-pulse flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '6s' }} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#e6d5b8] tracking-widest font-serif">
                    死亡不是终点
                  </h3>
                  <p className="text-xs text-[#d2b48c] leading-relaxed font-serif">
                    越过黄肠题凑，即从历史现实切入汉代人的精神宇宙。
                  </p>
                </div>

                <button
                  onClick={onNextPage}
                  className="mt-4 px-6 py-2.5 bg-[#5c4033] hover:bg-[#7a5644] text-[#e6d5b8] font-serif font-black rounded-2xl border-2 border-[#ffe89c] text-xs shadow-2xl flex items-center gap-2 mx-auto active:scale-95 transition-transform"
                >
                  进入下一章：送葬舞 <ArrowDown className="w-4 h-4 text-[#ffe89c]" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
