import React, { useRef, useState } from 'react';
import { MuseumTombBackdrop, TombPaletteType } from './MuseumTombBackdrop';
import { HanMuseumTopBar } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { DialogueLine } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface ChapterVideoPageViewProps {
  chapterNumber: string; // e.g. "01", "02", "03", "04", "05", "06", "07"
  englishTitle: string; // e.g. "DANCE OF WAR"
  chineseTitle: string; // e.g. "戈 舞 出 征"
  subtitle: string; // e.g. "广阳王出征祈福 · 干戚武舞"
  videoSrc?: string;
  videoAssetPathHint?: string;
  bgImage?: string; // 🚨【章节视频背景底图路径 (80% 遮罩)】🚨
  palette?: TombPaletteType | string;
  onSkip: () => void;
  onComplete: () => void;
  completeButtonText?: string;
  // 舞姿视频页左右切换小按键 (无边框小暗金字)
  onPrevPose?: () => void;
  onNextPose?: () => void;
  currentPoseLabel?: string;
  dialogues?: DialogueLine[];
}

/**
 * =========================================================================
 * ChapterVideoPageView (统一各章节无边框舞蹈视频播放全屏页面)
 * =========================================================================
 * 
 * 布局规范：
 * - 顶部小字：01 / （标题英文）
 * - 标题：(对应章节的中文标题）
 * - 一行小字说明
 * - 画面中央是视频，全幅舞蹈视频作为中景，人物从黑暗中出现，视频上下渐隐到背景，无大矩形边框
 * - 插入与视频内容一致的背景底图，代码中明确标出显眼位置方便替换，遮罩效果 80%
 * - “跳过视频”按键只做右上角小文字，同样无边框
 */
export const ChapterVideoPageView: React.FC<ChapterVideoPageViewProps> = ({
  chapterNumber,
  englishTitle,
  chineseTitle,
  subtitle,
  videoSrc,
  videoAssetPathHint,
  bgImage,
  palette = 'weapon',
  onSkip,
  onComplete,
  completeButtonText = '完成观看 · 步入下一节',
  onPrevPose,
  onNextPose,
  currentPoseLabel,
  dialogues,
}) => {
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && onNextPose) {
        soundFX.playStoneDrum();
        onNextPose();
      } else if (diff < 0 && onPrevPose) {
        soundFX.playStoneDrum();
        onPrevPose();
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between animate-fade-in p-3 pb-2 overflow-hidden bg-[#0B0806] text-[#E6D3AA] font-serif select-none han-app-sandbox-grain">
      {/* Visual Ambient Backdrop */}
      <MuseumTombBackdrop palette={palette as TombPaletteType} pattern="cloud" spotlight={true} intensity="subtle" />

      {/* =========================================================================
          🚨【CHAPTER VIDEO BACKGROUND IMAGE 视频播放页背景底图 - 80% 遮罩效果】🚨
          代码显眼标记：下方 img 标签加载对应章节底图，覆盖 80% 深黑玄底遮罩
          ========================================================================= */}
      {bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img
            src={bgImage}
            alt="视频背景底图"
            className="w-full h-full object-cover object-center filter saturate-90 brightness-[0.7]"
          />
          {/* 80% 遮罩效果 */}
          <div className="absolute inset-0 bg-[#0B0806]/80 backdrop-blur-[0.5px]" />
          {/* 粗粝砂石磨砂壁画质感 */}
          <div className="han-mural-texture opacity-75" />
        </div>
      )}

      {/* Top Bar with Skip Video Small Text Button (右上角小文字，无边框) */}
      <div className="relative z-20 flex items-center justify-between px-1">
        <HanMuseumTopBar showSkip={false} />
        <button
          onClick={() => {
            soundFX.playStoneDrum();
            onSkip();
          }}
          className="text-[10px] text-[#A89078] hover:text-[#F1D98D] tracking-widest active:scale-95 transition-colors cursor-pointer py-1 px-1.5 border-0 bg-transparent"
        >
          <span>跳过视频 ➔</span>
        </button>
      </div>

      {/* 
        页面布局要求：
        顶部小字：01 / （标题英文）
        然后是标题：(对应章节的中文标题）
        然后是一行小字说明
      */}
      <div className="relative z-10 text-center pt-1 pb-1">
        <span className="text-[9px] text-[#A89078] font-mono tracking-[0.3em] uppercase block">
          {chapterNumber} / {englishTitle}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-[#F1D98D] tracking-[0.38em] font-serif pl-[0.38em] drop-shadow mt-0.5">
          {chineseTitle}
        </h2>
        <p className="text-xs text-[#E6D3AA]/85 tracking-[0.2em] font-serif mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* 
        画面中央是视频/人物图画，上下居中，左右滑动选择按键位于人物两侧上下居中
      */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-0 my-auto w-full mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full flex items-center justify-center">
          {/* 视频/人物画面容器 (上下居中) */}
          <div
            className="relative w-full aspect-[16/10] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
            }}
          >
            <VideoPlayerPlaceholder
              title=""
              hideTitle={true}
              videoSrc={videoSrc}
              videoAssetPathHint={videoAssetPathHint}
              autoPlay={true}
              hideBorder={true}
            />
          </div>

          {/* 
            =====================================================================
            【左右滑动选择控件：上移至中间人物图画的两侧，上下居中对齐】
            =====================================================================
          */}
          {onPrevPose && (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                onPrevPose();
              }}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-[#180E0A]/85 hover:bg-[#25150F] border border-[#8C6D46]/60 text-[#F1D98D] hover:text-white text-[11px] font-serif shadow-[0_4px_12px_rgba(0,0,0,0.8)] backdrop-blur-xs cursor-pointer active:scale-95 transition-all"
              title="切换上一式"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#D6A84B]" />
              <span className="hidden xs:inline">上一式</span>
            </button>
          )}

          {onNextPose && (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                onNextPose();
              }}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-[#180E0A]/85 hover:bg-[#25150F] border border-[#8C6D46]/60 text-[#F1D98D] hover:text-white text-[11px] font-serif shadow-[0_4px_12px_rgba(0,0,0,0.8)] backdrop-blur-xs cursor-pointer active:scale-95 transition-all"
              title="切换下一式"
            >
              <span className="hidden xs:inline">下一式</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D6A84B]" />
            </button>
          )}
        </div>

        {/* 当前舞姿标签 (若存在) */}
        {currentPoseLabel && (
          <div className="mt-2 z-20">
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-[#8C6D46]/40 text-[10px] font-serif text-[#F1D98D] tracking-widest shadow-sm backdrop-blur-xs">
              {currentPoseLabel}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Action Area: Unified Dialogue Box or Complete Button */}
      {dialogues && dialogues.length > 0 ? (
        <div className="relative z-30 w-full shrink-0">
          <UnifiedDialogueBox
            dialogues={dialogues}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < dialogues.length - 1) {
                setDialogueIdx((prev) => prev + 1);
              } else {
                soundFX.playStoneDrum();
                onComplete();
              }
            }}
          />
        </div>
      ) : (
        <div className="relative z-20 p-2 pb-3 flex justify-center">
          <HanPlaqueButton
            onClick={() => {
              soundFX.playStoneDrum();
              onComplete();
            }}
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
          >
            {completeButtonText}
          </HanPlaqueButton>
        </div>
      )}
    </div>
  );
};
