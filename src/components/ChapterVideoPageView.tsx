import React from 'react';
import { MuseumTombBackdrop, TombPaletteType } from './MuseumTombBackdrop';
import { HanMuseumTopBar } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';
import { ArrowRight } from 'lucide-react';
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
}) => {
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
        画面中央是视频，全幅舞蹈视频作为中景，人物从黑暗中出现，视频上下渐隐到背景，无边框版
      */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-0 my-auto w-full mx-auto overflow-hidden">
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

        {/* 舞姿切换按键: 视频下方左右两个小按键 "上一式"、"下一式"，无边框小暗金字 */}
        {(onPrevPose || onNextPose) && (
          <div className="w-full max-w-sm flex items-center justify-between px-3 mt-2 mb-0.5 z-20">
            {onPrevPose ? (
              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  onPrevPose();
                }}
                className="text-xs font-serif text-[#C8943D] hover:text-[#F1D98D] active:scale-95 transition-colors border-0 bg-transparent py-1 px-2 cursor-pointer tracking-wider flex items-center gap-1 select-none"
              >
                <span>‹ 上一式</span>
              </button>
            ) : <div />}

            {currentPoseLabel && (
              <span className="text-[10px] font-serif text-[#A89078] tracking-widest select-none">
                {currentPoseLabel}
              </span>
            )}

            {onNextPose ? (
              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  onNextPose();
                }}
                className="text-xs font-serif text-[#C8943D] hover:text-[#F1D98D] active:scale-95 transition-colors border-0 bg-transparent py-1 px-2 cursor-pointer tracking-wider flex items-center gap-1 select-none"
              >
                <span>下一式 ›</span>
              </button>
            ) : <div />}
          </div>
        )}
      </div>

      {/* Bottom Action Button (无高亮渐变/无冗余边框) */}
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
    </div>
  );
};
