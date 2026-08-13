import React, { useState } from 'react';
import { ASSET_REGISTRY } from '../data/assetRegistry';
import { soundFX } from '../utils/soundEngine';
import { ArrowDown, Flame, Shield, Sparkles } from 'lucide-react';

interface Page7FuneraryDanceProps {
  onNextPage: () => void;
}

export const Page7FuneraryDance: React.FC<Page7FuneraryDanceProps> = ({ onNextPage }) => {
  const [processionProgress, setProcessionProgress] = useState<number>(0); // 0% to 100%
  const [isFinished, setIsFinished] = useState(false);

  const handleAdvanceProcession = () => {
    soundFX.playStoneDrum();
    if (processionProgress < 100) {
      const nextProgress = Math.min(100, processionProgress + 25);
      setProcessionProgress(nextProgress);
      if (nextProgress === 100) {
        setIsFinished(true);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-[#140b07] text-[#d2b48c] flex flex-col justify-between overflow-hidden select-none font-serif">
      {/* Top Header */}
      <div className="p-3 bg-[#1f110a]/90 border-b border-[#3d2b1f] backdrop-blur-md z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c25135] animate-ping" />
          <span className="text-xs font-black text-[#e6d5b8] tracking-wider">
            第七页 · 送葬舞 (抚慰亡者)
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2c150b] text-[#d2b48c] border border-[#5c2d18]">
          仪式进度 {processionProgress}%
        </span>
      </div>

      {/* Main Stage Arena */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-4">
        {/* Background Dark Stone Texture & Gold Line Connection */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#c25135 1px, transparent 0)',
            backgroundSize: '10px 10px',
          }}
        />

        {/* Procession Direction Banner */}
        <div className="z-10 w-full text-center space-y-1 pt-2">
          <h3 className="text-base font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
            送亡者进入墓葬 · 魂归汉家陵阙
          </h3>
          <p className="text-[10px] text-[#a87c5d]">
            建鼓、羽葆、车马仪仗、扬袖与抱袖舞者组曲
          </p>
        </div>

        {/* Dynamic Procession Canvas (Han Relief Silhouettes) */}
        <div className="z-20 my-auto w-full max-w-sm relative">
          <div className="relative w-full h-52 rounded-2xl bg-[#1c0f08] border-2 border-[#422013] overflow-hidden p-3 shadow-2xl flex flex-col justify-between">
            {/* Huangchang Ticou Entrance Boundary on the Right */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-[#0a0503] border-l-2 border-dashed border-[#d2b48c]/40 flex flex-col items-center justify-center text-[10px] font-mono text-[#d2b48c] z-10">
              <span className="[writing-mode:vertical-rl] tracking-widest text-[#e6d5b8] font-bold">
                黄肠题凑 · 梓宫
              </span>
            </div>

            {/* Moving Funeral Procession Elements */}
            <div
              className="flex items-center gap-3 transition-all duration-700 h-full pl-2"
              style={{
                transform: `translateX(${processionProgress * 1.8}px)`,
                opacity: isFinished ? 0.2 : 1 - processionProgress * 0.007,
              }}
            >
              {/* 1. Jian Gu Drum */}
              <div className="flex flex-col items-center text-[9px] text-[#e6d5b8] font-black shrink-0">
                <div className="w-10 h-14 rounded bg-[#381a10] border border-[#d2b48c] flex items-center justify-center shadow-md">
                  🥁 建鼓
                </div>
                <span>仪轨鼓乐</span>
              </div>

              {/* 2. Sleeve-raising Dancers (扬袖舞者) */}
              <div className="flex flex-col items-center text-[9px] text-[#e6d5b8] font-black shrink-0">
                <div className="w-12 h-16 rounded bg-[#381a10] border border-[#d2b48c] flex items-center justify-center shadow-md">
                  💃 扬袖舞
                </div>
                <span>送灵长袖</span>
              </div>

              {/* 3. Carriage & Coffin (棺车/马车) */}
              <div className="flex flex-col items-center text-[9px] text-[#e6d5b8] font-black shrink-0">
                <div className="w-16 h-16 rounded bg-[#522212] border-2 border-[#d2b48c] flex items-center justify-center shadow-lg font-bold">
                  🐎 车马棺椁
                </div>
                <span>西汉王车</span>
              </div>

              {/* 4. Honor Guard & Yu Bao Feather (仪仗 & 羽葆) */}
              <div className="flex flex-col items-center text-[9px] text-[#e6d5b8] font-black shrink-0">
                <div className="w-10 h-14 rounded bg-[#381a10] border border-[#d2b48c] flex items-center justify-center shadow-md">
                  🪶 羽葆仪仗
                </div>
                <span>抚慰安息</span>
              </div>
            </div>

            {/* Gold Line Rising to Celestial Realm when finished */}
            {isFinished && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 animate-fade-in z-20">
                <div className="w-1 h-20 bg-gradient-to-t from-transparent via-[#ffe89c] to-white animate-pulse" />
                <span className="text-xl font-black font-serif text-[#ffe89c] tracking-[0.2em] title-drop-shadow">
                  送灵魂上苍穹
                </span>
                <span className="text-[10px] text-[#e6d5b8] font-mono">
                  汉隶金石刻字 · 队伍融入题凑
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Explanatory Caption */}
        <div className="z-20 bg-[#1f110a]/90 p-3 rounded-2xl border border-[#422013] text-xs text-[#c2a385] text-center max-w-xs shadow-xl">
          {isFinished ? (
            <p className="text-[#ffe89c] font-black">
              送葬队伍已归于地下墓室，一道纯金羽线向天际延伸，连接下一天界！
            </p>
          ) : (
            <p className="text-[#e6d5b8]">
              汉画像石剪影演练：推进送葬队伍，抚慰亡者入土为安。
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="z-30 pb-2">
          {!isFinished ? (
            <button
              onClick={handleAdvanceProcession}
              className="px-6 py-2.5 bg-[#422013] hover:bg-[#5c2d18] text-[#e6d5b8] rounded-2xl border-2 border-[#d2b48c] text-xs font-black shadow-2xl flex items-center gap-2 active:scale-95 transition-all"
            >
              <Flame className="w-4 h-4 text-[#ffe89c]" />
              推进送葬仪式 ({processionProgress}/100%)
            </button>
          ) : (
            <button
              onClick={onNextPage}
              className="px-6 py-2.5 bg-[#5c2d18] hover:bg-[#7a3c20] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#ffe89c] text-xs shadow-2xl flex items-center gap-2 active:scale-95 transition-transform"
            >
              顺金线升入神仙世界 <Sparkles className="w-4 h-4 text-[#ffe89c]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
