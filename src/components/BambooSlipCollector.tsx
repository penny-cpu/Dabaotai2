import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CHAPTER_BAMBOO_SLIPS, CHAPTER_PAGE_BACKGROUNDS } from '../config/assetRegistry';
import { HanPlaqueButton } from './HanPlaqueButton';
import { soundFX } from '../utils/soundEngine';

interface BambooSlipCollectorProps {
  stageNumber: number;
  onProceed: () => void;
  customBgType?: string;
}

/**
 * BambooSlipCollector (各章节记忆归位 · 沉浸式深色竹简典藏页面)
 * 
 * 设计规范升级：
 * 1. 彻底删除原先弹窗出来的竹简放大/飞行动画以及收集卡片两个弹窗。
 * 2. 插入相应章节背景图作为底图，80% 暗色遮罩并覆盖壁画粗粝砂石磨砂质感。
 * 3. 画面中央直接端庄展示对应章节的深色木纹竹简（参考图1规格：顶部阴刻金字章节名，下方精细阴刻关键道具及云气纹）。
 * 4. 底部直接呈现文物品名及“继续前行 · 启程下一章”按键，自然流畅，无遮挡弹窗。
 */
export const BambooSlipCollector: React.FC<BambooSlipCollectorProps> = ({
  stageNumber,
  onProceed,
}) => {
  const slipData = CHAPTER_BAMBOO_SLIPS[stageNumber] || CHAPTER_BAMBOO_SLIPS[1];

  // 对应章节背景图 (80% 遮罩)
  const stageKey = `stage${stageNumber}` as keyof typeof CHAPTER_PAGE_BACKGROUNDS;
  const stageBgs = CHAPTER_PAGE_BACKGROUNDS[stageKey];
  const pageBg = stageBgs && 'page5_memory_return' in stageBgs ? stageBgs.page5_memory_return : slipData.bambooSlipArtifactImage;

  useEffect(() => {
    soundFX.playMemoryRestore();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 pb-3 select-none font-serif text-[#E6D3AA] overflow-hidden bg-[#0B0806] han-app-sandbox-grain animate-fade-in">
      {/* =========================================================================
          🚨【CHAPTER MEMORY RETURN BACKGROUND 记忆归位页章节背景底图 - 80% 遮罩】🚨
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={pageBg}
          alt="章节背景底图"
          className="w-full h-full object-cover object-center filter saturate-90 brightness-[0.6]"
        />
        {/* 80% 遮罩效果 */}
        <div className="absolute inset-0 bg-[#0B0806]/80 backdrop-blur-[0.5px]" />
        {/* 汉代壁画粗粝砂石磨砂暗层 */}
        <div className="han-mural-texture opacity-75" />
      </div>

      {/* 顶部标头 (无弹窗，沉静博物馆标牌) */}
      <div className="relative z-10 pt-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1F140D]/90 border border-[#8C6D46]/40 text-[#F1D98D] shadow-sm backdrop-blur-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#79B9A1]" />
          <span className="text-[11px] font-serif font-black tracking-widest">
            第 0{stageNumber} 章 · 记忆归位
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-black text-[#F1D98D] tracking-[0.25em] pl-[0.25em] mt-1 drop-shadow">
          《{slipData.chapterTitle}》
        </h2>
        <p className="text-[9.5px] text-[#A89078] tracking-widest mt-0.5">
          {slipData.subTitle}
        </p>
      </div>

      {/* =========================================================================
          中央深色竹简主体展示 (参考图1：深色红木木纹竹简筒，阴刻章节金字与关键道具)
          ========================================================================= */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center px-4 w-full">
        {/* 深色竹简容器 (带柔和微光束穿透) */}
        <div className="relative w-44 sm:w-52 h-[320px] sm:h-[350px] rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.95)] border border-[#4A3222]/50 group flex items-center justify-center bg-[#150B07]">
          {/* 竹简高清切图 (精准还原参考图1规格) */}
          <img
            src={slipData.bambooSlipArtifactImage}
            alt={slipData.chapterTitle}
            className="w-full h-full object-cover object-center filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] scale-102"
          />

          {/* 斜向柔光穿透层 (仿照图1左上射下的光束) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen"
            style={{
              background: 'linear-gradient(135deg, rgba(255,245,215,0.4) 0%, transparent 45%, transparent 100%)',
            }}
          />

          {/* 典雅金线暗框 */}
          <div className="absolute inset-1 rounded-xl border border-[#F1D98D]/15 pointer-events-none" />

          {/* 底部馆藏印戳 */}
          <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none">
            <span className="px-1.5 py-0.5 rounded-xs bg-[#7D2217]/85 border border-[#B93A2B]/60 text-[7.5px] font-serif text-[#F8E8C8] font-bold shadow">
              大葆台藏
            </span>
          </div>
        </div>

        {/* 关键文物出土名称标签 */}
        <div className="mt-2.5 px-3 py-1 rounded-full bg-[#1B100B]/85 border border-[#8C6D46]/40 flex items-center gap-2 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84B]" />
          <span className="text-[10px] font-serif text-[#F1D98D] tracking-wider font-bold">
            关键器物：{slipData.relicName}
          </span>
          <span className="text-[8px] font-mono text-[#A89078]">
            [{slipData.accessionCode}]
          </span>
        </div>
      </div>

      {/* =========================================================================
          底部继续前行按钮 (直接呈现，无多余二次弹窗)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-xs mx-auto pt-1 pb-1">
        <HanPlaqueButton
          onClick={() => {
            soundFX.playStoneDrum();
            onProceed();
          }}
          size="md"
          className="w-full"
          rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
        >
          继续前行 · 启程下一章
        </HanPlaqueButton>
      </div>
    </div>
  );
};
