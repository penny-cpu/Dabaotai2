import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';

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
    <div className="relative w-full h-full overflow-hidden select-none flex flex-col justify-end bg-[#110907]">
      {/* =========================================================================
          🏛️【首页背景底图：百分百真实展现，零遮罩、零遮挡】🏛️
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={dabaotaiMuseumPhoto}
          alt="北京大葆台西汉墓遗址博物馆"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* =========================================================================
          【首页 唯一按键】：仅保留底部的进入按键（保持半遮罩不透明度20%，无文字无边框）
          ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-8 sm:pb-10">
        <button
          onClick={handleOpenTombGate}
          disabled={isGateOpening}
          className="relative w-56 sm:w-64 h-10 sm:h-11 bg-gradient-to-r from-[#2A160E] via-[#3E2114] to-[#2A160E] shadow-[0_0_20px_rgba(200,148,61,0.2)] active:scale-95 transition-all cursor-pointer flex items-center justify-center rounded-md border-0 border-none outline-none opacity-20 hover:opacity-25"
          style={{ opacity: 0.2 }}
          aria-label="进入大葆台探秘"
          title="进入大葆台探秘"
        />
      </div>
    </div>
  );
};

