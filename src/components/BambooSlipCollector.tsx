import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CHAPTER_BAMBOO_SLIPS, CHAPTER_PAGE_BACKGROUNDS } from '../config/assetRegistry';
import { HanPlaqueButton } from './HanPlaqueButton';
import { soundFX } from '../utils/soundEngine';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';

interface BambooSlipCollectorProps {
  stageNumber: number;
  onProceed: () => void;
  customBgType?: string;
  dialogues?: DialogueLine[];
}

/**
 * BambooSlipCollector (各章节记忆归位 · 沉浸式深色竹简典藏页面)
 * 
 * 设计规范升级：
 * 1. 彻底删除原先反馈弹窗与单独过渡页，直接融合玉舞人聊天框。
 * 2. 插入相应章节背景图作为底图，80% 暗色遮罩并覆盖壁画粗粝砂石磨砂质感。
 * 3. 画面中央直接端庄展示对应章节的深色木纹竹简（顶部阴刻金字章节名，下方精细阴刻关键道具及云气纹）。
 * 4. 玉舞人聊天框融入竹简页面，玉舞人说完话后，出现“继续前行 · 启程下一章”按键。
 */
export const BambooSlipCollector: React.FC<BambooSlipCollectorProps> = ({
  stageNumber,
  onProceed,
  dialogues = [],
}) => {
  const slipData = CHAPTER_BAMBOO_SLIPS[stageNumber] || CHAPTER_BAMBOO_SLIPS[1];
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [dialogueFinished, setDialogueFinished] = useState<boolean>(dialogues.length === 0);

  // 对应章节背景图 (80% 遮罩)
  const stageKey = `stage${stageNumber}` as keyof typeof CHAPTER_PAGE_BACKGROUNDS;
  const stageBgs = CHAPTER_PAGE_BACKGROUNDS[stageKey];
  const pageBg = stageBgs && 'page5_memory_return' in stageBgs ? stageBgs.page5_memory_return : slipData.bambooSlipArtifactImage;

  useEffect(() => {
    soundFX.playMemoryRestore();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bamboo_slip_active', { detail: true }));
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('bamboo_slip_active', { detail: false }));
      }
    };
  }, []);

  const handleNextDialogue = () => {
    if (dialogues.length === 0) return;
    if (dialogueIdx < dialogues.length - 1) {
      setDialogueIdx((prev) => prev + 1);
    } else {
      soundFX.playBronzeChime();
      setDialogueFinished(true);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center p-2.5 sm:p-3 select-none font-serif text-[#E6D3AA] overflow-hidden bg-[#0B0806] han-app-sandbox-grain animate-fade-in">
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

      {/* 顶部标头 (缩小紧凑适配手机屏幕，无弹窗) */}
      <div className="relative z-10 pt-0.5 text-center shrink-0">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1F140D]/90 border border-[#8C6D46]/40 text-[#F1D98D] shadow-sm backdrop-blur-xs">
          <CheckCircle2 className="w-3 h-3 text-[#79B9A1]" />
          <span className="text-[10px] font-serif font-black tracking-widest">
            第 0{stageNumber} 章 · 记忆归位
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-[#F1D98D] tracking-[0.2em] pl-[0.2em] mt-0.5 drop-shadow">
          《{slipData.chapterTitle}》
        </h2>
        <p className="text-[8.5px] text-[#A89078] tracking-widest mt-0.5">
          {slipData.subTitle}
        </p>
      </div>

      {/* =========================================================================
          中央深色竹简主体展示 (缩小比例，精准完全容纳在手机显示器屏幕内)
          ========================================================================= */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center px-2 w-full shrink-0">
        {/* 深色竹简容器 (适度等比缩小，高约190px，端庄古朴深色木纹) */}
        <div className="relative w-30 sm:w-34 h-[180px] sm:h-[195px] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.95)] border border-[#4A3222]/50 group flex items-center justify-center bg-[#150B07]">
          {/* 竹简高清切图 */}
          <img
            src={slipData.bambooSlipArtifactImage}
            alt={slipData.chapterTitle}
            className="w-full h-full object-cover object-center filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] scale-102"
          />

          {/* 斜向柔光穿透层 (仿照图1左上射下的光束) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen"
            style={{
              background: 'linear-gradient(135deg, rgba(255,245,215,0.4) 0%, transparent 45%, transparent 100%)',
            }}
          />

          {/* 典雅金线暗框 */}
          <div className="absolute inset-1 rounded-lg border border-[#F1D98D]/15 pointer-events-none" />

          {/* 底部馆藏印戳 */}
          <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
            <span className="px-1.5 py-0.5 rounded-xs bg-[#7D2217]/85 border border-[#B93A2B]/60 text-[7px] font-serif text-[#F8E8C8] font-bold shadow">
              大葆台藏
            </span>
          </div>
        </div>

        {/* 关键文物出土名称标签 */}
        <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-[#1B100B]/90 border border-[#8C6D46]/40 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84B]" />
          <span className="text-[9px] font-serif text-[#F1D98D] tracking-wider font-bold">
            关键器物：{slipData.relicName}
          </span>
          <span className="text-[7.5px] font-mono text-[#A89078]">
            [{slipData.accessionCode}]
          </span>
        </div>
      </div>

      {/* =========================================================================
          底部区域：玉舞人对白框融合，说完话后启程下一章
          ========================================================================= */}
      {dialogues.length > 0 && !dialogueFinished ? (
        <div className="relative z-30 w-full shrink-0">
          <UnifiedDialogueBox
            dialogues={dialogues}
            currentIndex={dialogueIdx}
            onNext={handleNextDialogue}
          />
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-[240px] mx-auto pt-0.5 pb-1 shrink-0 animate-fade-in">
          <HanPlaqueButton
            onClick={() => {
              soundFX.playStoneDrum();
              onProceed();
            }}
            size="sm"
            className="w-full text-xs"
            rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#D6A84B]" />}
          >
            继续前行 · 启程下一章
          </HanPlaqueButton>
        </div>
      )}
    </div>
  );
};
