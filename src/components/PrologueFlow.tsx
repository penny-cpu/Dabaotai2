import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { HanMuseumTopBar } from './HanLinearDecorations';

// =========================================================================
// 🏛️【首页/第一页 博物馆背景底图配置位置 (方便一键查找与替换)】🏛️
// 提示：您可以直接替换下方 dabaotaiMuseumPhoto 的路径（支持本地文件或外部网络图片 URL）
// 当前底图：大葆台西汉墓遗址博物馆实景展厅摄影
// =========================================================================
import dabaotaiMuseumPhoto from '../assets/images/dabaotai_museum_photo.jpg';

interface PrologueFlowProps {
  onStartChapter1: () => void;
}

export const PrologueFlow: React.FC<PrologueFlowProps> = ({ onStartChapter1 }) => {
  const [isGateOpening, setIsGateOpening] = useState<boolean>(false);

  // Step 1: Open Gate Animation & transition directly to Chapter 1
  const handleOpenTombGate = () => {
    if (isGateOpening) return;
    setIsGateOpening(true);
    soundFX.playStoneDrum();
    soundFX.playBronzeChime();

    setTimeout(() => {
      onStartChapter1();
      setIsGateOpening(false);
    }, 500);
  };

  return (
    <div className="relative w-full h-full text-[#E6D3AA] font-serif overflow-hidden select-none flex flex-col justify-between bg-[#110907]">
      {/* =========================================================================
          PAGE 01: 封面页 · 大葆台博物馆实景底图与典雅古风开篇
          ========================================================================= */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between animate-fade-in p-3 pb-2 overflow-hidden">
        {/* =========================================================================
            🏛️【代码标注位置：第一页博物馆专属背景底图 - 大葆台博物馆】🏛️
            下方 img 标签为第一页正中背景底图，叠加适度暗调与聚光暗角，确保博物馆主体清晰可见
            ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src={dabaotaiMuseumPhoto}
            alt="北京大葆台西汉墓遗址博物馆"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] saturate-95 scale-105 transition-transform duration-1000 ease-out"
          />
          {/* 汉代黑金双向柔和渐变与中心通透暗角：既展现博物馆真实风貌，又保证金色书法文字清晰 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#110907]/75 via-[#110907]/35 to-[#110907]/85 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(17,9,7,0.75)_100%)] pointer-events-none" />
          <div className="han-mural-texture opacity-40 pointer-events-none" />
        </div>

        {/* Top Museum Header */}
        <div className="relative z-10">
          <HanMuseumTopBar />
        </div>

        {/* Center Main Calligraphy & Title Block */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 my-auto">
          {/* Grand Ancient Calligraphy: 大 葆 台 */}
          <h1 className="text-[34px] sm:text-[42px] font-black text-[#F1D98D] tracking-[0.42em] font-serif pl-[0.42em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] filter">
            大 葆 台
          </h1>

          {/* Subtitle: 北京大葆台西汉墓遗址博物馆 */}
          <p className="text-xs sm:text-sm text-[#E6D3AA]/95 font-serif tracking-[0.24em] mt-3 pl-[0.24em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            北京大葆台西汉墓遗址博物馆
          </p>

          {/* English Translation */}
          <p className="text-[8.5px] text-[#C2A385] tracking-[0.3em] uppercase font-sans mt-2 opacity-85 pl-[0.3em] drop-shadow-sm">
            BEIJING DABAOTAI WESTERN HAN TOMB SITE MUSEUM
          </p>
        </div>

        {/* 
          ===================================================================
          【首页 开启按键】：纯净典雅按键，不带中间横线光标
          ===================================================================
        */}
        <div className="relative z-10 flex flex-col items-center justify-center pb-2">
          <div className="flex items-center justify-center relative mb-3">
            <button
              onClick={handleOpenTombGate}
              disabled={isGateOpening}
              className="relative px-8 py-2.5 bg-gradient-to-r from-[#2A160E] via-[#3E2114] to-[#2A160E] text-[#F1D98D] border border-[#D6A84B]/60 shadow-[0_0_24px_rgba(200,148,61,0.35)] hover:shadow-[0_0_30px_rgba(200,148,61,0.6)] active:scale-95 transition-all cursor-pointer flex items-center justify-center rounded-md"
              aria-label="开启"
              title="开启大葆台探秘之旅"
            >
              {/* 纯净文字显示，无中间横线光标 */}
              <span className="font-serif tracking-[0.28em] pl-[0.28em] text-[#F1D98D] text-sm sm:text-base font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                开启
              </span>
            </button>
          </div>

          {/* Bottom Footer Note (小字) */}
          <div className="text-center">
            <span className="text-[9px] text-[#A89078] tracking-widest font-mono drop-shadow">
              ◇ 西汉广阳顷王刘建遗址 沉浸式探秘体验 ◇
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
