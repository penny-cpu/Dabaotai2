import React, { useState } from 'react';
import { ASSET_REGISTRY } from '../data/assetRegistry';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, Play, Pause, ArrowDown, Eye, Sun, Star } from 'lucide-react';

interface Page8ImmortalAscensionProps {
  onNextPage: () => void;
}

export const Page8ImmortalAscension: React.FC<Page8ImmortalAscensionProps> = ({ onNextPage }) => {
  const [ascensionStage, setAscensionStage] = useState<number>(1); // 1: 凡人舞者, 2: 翼生羽人, 3: 驭龙仙化, 4: 天人合一星盘
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleAdvanceStage = () => {
    soundFX.playStoneDrum();
    if (ascensionStage < 4) {
      setAscensionStage((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f5f2e9] via-[#e8e0cc] to-[#cbe0d7] text-[#3d2b1f] flex flex-col justify-between overflow-hidden select-none font-serif">
      {/* Header Bar - Light Celestial Aesthetic */}
      <div className="p-3 bg-white/80 border-b border-[#d2b48c]/40 backdrop-blur-md z-30 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-[#b8860b] animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-xs font-black text-[#3d2b1f] tracking-wider">
            第八页 · 升仙舞 (神仙幻想世界)
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#e6d5b8] text-[#5c4033] font-bold">
          羽化阶段 {ascensionStage}/4
        </span>
      </div>

      {/* Main Celestial Arena */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-4">
        {/* Celestial Star Disk & Clouds SVG Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <svg className="w-[320px] h-[320px] stroke-[#b8860b]" fill="none" strokeWidth="1">
            <circle cx="160" cy="160" r="150" strokeDasharray="4 4" />
            <circle cx="160" cy="160" r="100" strokeDasharray="2 2" />
            <circle cx="160" cy="160" r="50" />
            {/* Big Dipper 7 Stars */}
            <path d="M 60 80 L 90 90 L 120 110 L 150 140 L 190 140 L 220 120 L 250 130" stroke="#b8860b" strokeWidth="2" />
          </svg>
        </div>

        {/* Inscription Header Box */}
        <div className="z-10 w-full text-center space-y-1 pt-1">
          <span className="text-xl font-black text-[#5c4033] tracking-[0.2em] title-drop-shadow block">
            死不是终点 · 而是另一场飞升
          </span>
          <p className="text-[10px] text-[#7a5644] font-medium">
            《总会仙倡》与《鱼龙曼延》“兽入水为鱼、鱼出水化龙”升仙寓意
          </p>
        </div>

        {/* Central Stage 16:9 Video / Animated State Canvas */}
        <div className="z-20 my-auto w-full max-w-sm space-y-3">
          {/* 16:9 Landscape Video Area */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#b8860b]/60 bg-black shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
              alt="升仙舞视频"
              className={`w-full h-full object-cover transition-all duration-500 ${
                isVideoPlaying ? 'scale-105 filter brightness-110 contrast-125' : 'filter brightness-75'
              }`}
            />

            {/* Video Controls overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-3">
              <div className="flex items-center justify-between text-[10px] text-[#ffe89c] font-mono bg-black/50 px-2 py-0.5 rounded border border-[#b8860b]/40 backdrop-blur-sm self-start">
                <span>16:9 LANDSCAPE CELESTIAL DANCE</span>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    soundFX.playStoneDrum();
                    setIsVideoPlaying(!isVideoPlaying);
                  }}
                  className="w-12 h-12 rounded-full bg-[#3d2b1f]/95 text-[#ffe89c] border-2 border-[#ffe89c] flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
                >
                  {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full space-y-1">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-[#ffe89c] transition-all ${
                      isVideoPlaying ? 'w-4/5 animate-pulse' : 'w-1/3'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Evolution State Card */}
          <div className="bg-white/90 p-3 rounded-2xl border border-[#d2b48c] text-xs text-[#5c4033] shadow-md space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#e6d5b8] pb-1">
              <span className="font-black text-[#3d2b1f]">
                {ascensionStage === 1 && '1. 凡人舞者：旋身跃起'}
                {ascensionStage === 2 && '2. 翼生羽人：线条轻盈'}
                {ascensionStage === 3 && '3. 仙兽共舞：龙虎驭风'}
                {ascensionStage === 4 && '4. 天人合一：融入星盘'}
              </span>
              <span className="text-[10px] text-[#b8860b] font-mono">
                {ascensionStage === 4 ? '飞升完成 ✓' : '演化中'}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {ascensionStage === 1 && '舞者在天圆地方星盘间旋转跳跃，伸展身体，脚逐渐离开地面。'}
              {ascensionStage === 2 && '身体线条与汉画像石羽人融合，两臂生羽，云气腾升。'}
              {ascensionStage === 3 && '青龙、白虎、朱雀与伏羲女娲神兽图像从金线云气中化现共舞。'}
              {ascensionStage === 4 && '舞者化为无数金线散入北斗星盘，天地合一，万物通灵。'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="z-30 pb-2">
          {ascensionStage < 4 ? (
            <button
              onClick={handleAdvanceStage}
              className="px-6 py-2.5 bg-[#5c4033] hover:bg-[#7a5644] text-[#ffe89c] rounded-2xl border-2 border-[#b8860b] text-xs font-black shadow-xl flex items-center gap-2 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#ffe89c]" />
              催化羽化飞升 ({ascensionStage}/4)
            </button>
          ) : (
            <button
              onClick={onNextPage}
              className="px-6 py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#ffe89c] text-xs shadow-2xl flex items-center gap-2 active:scale-95 transition-transform"
            >
              星点沉降 · 凝聚盘鼓 <ArrowDown className="w-4 h-4 text-[#ffe89c]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
