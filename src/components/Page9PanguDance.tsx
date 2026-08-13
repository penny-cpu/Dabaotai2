import React, { useState } from 'react';
import { ASSET_REGISTRY } from '../data/assetRegistry';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, Play, Pause, ArrowRight, RefreshCw, Layers } from 'lucide-react';

interface Page9PanguDanceProps {
  onNextPage: () => void;
}

export const Page9PanguDance: React.FC<Page9PanguDanceProps> = ({ onNextPage }) => {
  const [isCrossedToModern, setIsCrossedToModern] = useState(false); // false: 汉代神仙背景, true: 现代展厅白色空间
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleToggleCross = () => {
    soundFX.playStoneDrum();
    setIsCrossedToModern(!isCrossedToModern);
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden select-none font-serif transition-colors duration-1000 ${
        isCrossedToModern
          ? 'bg-[#f8f9fa] text-[#212529]'
          : 'bg-gradient-to-b from-[#f5f2e9] via-[#e8e0cc] to-[#d9cfb8] text-[#3d2b1f]'
      }`}
    >
      {/* Top Header */}
      <div
        className={`p-3 border-b backdrop-blur-md z-30 flex items-center justify-between transition-colors duration-500 ${
          isCrossedToModern
            ? 'bg-white/90 border-slate-200 shadow-sm'
            : 'bg-white/80 border-[#d2b48c]/40'
        }`}
      >
        <div className="flex items-center gap-2">
          <RefreshCw
            className={`w-4 h-4 ${isCrossedToModern ? 'text-blue-600' : 'text-[#b8860b]'} animate-spin`}
            style={{ animationDuration: '8s' }}
          />
          <span className="text-xs font-black tracking-wider">
            第九页 · 盘鼓舞 (古今穿越回环)
          </span>
        </div>
        <button
          onClick={handleToggleCross}
          className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
            isCrossedToModern
              ? 'bg-slate-800 text-white border-slate-700'
              : 'bg-[#5c4033] text-[#ffe89c] border-[#b8860b]'
          }`}
        >
          {isCrossedToModern ? '空间: 现代展厅 (2000年后)' : '空间: 汉代仙界 (七盘一鼓)'}
        </button>
      </div>

      {/* Main Arena */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-4">
        {/* Title Header */}
        <div className="z-10 w-full text-center space-y-1 pt-1">
          <h3 className="text-base font-black tracking-widest title-drop-shadow">
            {isCrossedToModern ? '历史遗产 · 当代复现' : '七盘一鼓 · 北斗星象阵列'}
          </h3>
          <p className="text-[10px] opacity-80">
            {isCrossedToModern
              ? '两千年前的画像石形象与今天的舞蹈家在屏幕中重叠共舞'
              : '舞者在七盘一鼓间跳跃、旋转、跨越与腾挪'}
          </p>
        </div>

        {/* Central Display Canvas */}
        <div className="z-20 my-auto w-full max-w-sm space-y-3">
          {/* 7-Disks + 1-Drum Layout Visualizer */}
          <div
            className={`relative w-full h-36 rounded-2xl border-2 transition-all duration-700 p-3 flex items-center justify-center shadow-xl ${
              isCrossedToModern
                ? 'bg-white border-slate-300'
                : 'bg-[#2c1d12] border-[#b8860b]'
            }`}
          >
            {/* 7 Plates */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div
                  key={num}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold border ${
                    isCrossedToModern
                      ? 'bg-slate-100 border-slate-400 text-slate-700'
                      : 'bg-[#3d2b1f] border-[#ffe89c] text-[#ffe89c]'
                  }`}
                >
                  盘0{num}
                </div>
              ))}
              {/* 1 Central Drum */}
              <div className="w-10 h-10 rounded-full bg-[#c25135] text-white border-2 border-[#ffe89c] flex items-center justify-center text-[10px] font-black shadow-lg animate-pulse">
                🥁 鼓
              </div>
            </div>

            {/* Thought Bubble when Crossed */}
            {isCrossedToModern && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-xl shadow-lg animate-bounce">
                “欸，这是哪里？这是两千年后的展厅？”
              </div>
            )}
          </div>

          {/* 16:9 Modern Video Revival Area */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-slate-400 bg-black shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80"
              alt="盘鼓舞相和歌"
              className={`w-full h-full object-cover transition-all duration-500 ${
                isVideoPlaying ? 'scale-105 filter brightness-110' : 'filter brightness-75'
              }`}
            />

            <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-3">
              <div className="flex items-center justify-between text-[10px] text-white font-mono bg-black/60 px-2 py-0.5 rounded border border-white/20 self-start">
                <span>16:9 《铜雀伎》《相和歌》复原舞</span>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="w-12 h-12 rounded-full bg-slate-900/90 text-white border-2 border-white flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
                >
                  {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
              </div>

              <div className="w-full space-y-1">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white transition-all ${
                      isVideoPlaying ? 'w-2/3 animate-pulse' : 'w-1/4'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sun Ying Academic Revival Description Box */}
          <div
            className={`p-3 rounded-2xl border text-xs leading-relaxed shadow-sm ${
              isCrossedToModern
                ? 'bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-[#3d2b1f] border-[#b8860b] text-[#ffe89c]'
            }`}
          >
            <p className="font-bold mb-1">【孙颖先生复原学术解说】</p>
            盘鼓舞虽在汉代极为盛行，但舞蹈本身早已失传。孙颖先生通过研读史学文献以及汉画像砖石中的舞蹈形象，使失传的汉代盘鼓舞重新回到当代舞台！
          </div>
        </div>

        {/* Action Controls */}
        <div className="z-30 pb-2 flex gap-2">
          <button
            onClick={handleToggleCross}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl border border-slate-700 text-xs font-bold shadow-lg flex items-center gap-1 active:scale-95 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            {isCrossedToModern ? '返回汉代仙界' : '切至当代展厅'}
          </button>

          <button
            onClick={onNextPage}
            className="px-5 py-2 bg-[#5c4033] hover:bg-[#7a5644] text-[#ffe89c] rounded-2xl border-2 border-[#b8860b] text-xs font-black shadow-xl flex items-center gap-1 active:scale-95 transition-transform"
          >
            进入沉浸结语 <ArrowRight className="w-4 h-4 text-[#ffe89c]" />
          </button>
        </div>
      </div>
    </div>
  );
};
