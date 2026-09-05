import React, { useEffect } from 'react';
import { ArrowRight, MoreHorizontal, Circle } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';
import bgImage from '../assets/images/dabaotai_hall_entrance_bg.jpg';

interface HallTransitionPageProps {
  targetHallName: string;
  subtitle?: string;
  buttonText?: string;
  themeColor?: 'gold' | 'red' | 'silver' | 'wood' | 'blue' | 'jade';
  onContinue: () => void;
  autoForwardMs?: number;
}

/* =========================================================================
   🚨【“进入XX展厅” 页面背景与 60% 遮罩配置 (参考图2)】🚨
   =========================================================================
   背景图片路径：src/assets/images/dabaotai_hall_entrance_bg.jpg
   遮罩标准：严格设定 60% 黑色/古铜暗调遮罩 (bg-black/60)
   顶部：大葆台博物馆中英文铭牌与小程序胶囊控制台
   中央：大葆台汉代古壁画与浮雕透光玉舞人，加持大葆台汉风书法排版
   底部：经典大汉祥云金边椭圆药丸按钮“进入XX展厅 / 进入记忆”
   ========================================================================= */

export const HallTransitionPage: React.FC<HallTransitionPageProps> = ({
  targetHallName,
  subtitle = '北京大葆台汉墓博物馆 · 两千年沉浸记忆',
  buttonText,
  onContinue,
  autoForwardMs,
}) => {
  useEffect(() => {
    soundFX.playStoneDrum();
    if (autoForwardMs && autoForwardMs > 0) {
      const timer = setTimeout(() => {
        onContinue();
      }, autoForwardMs);
      return () => clearTimeout(timer);
    }
  }, [autoForwardMs, onContinue]);

  const displayButtonText = buttonText || (targetHallName ? `进入${targetHallName}` : '进入记忆');

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none font-serif text-[#E6D3AA] animate-fade-in">
      {/* 
        =======================================================================
        【背景图与 60% 遮罩 (严格参考图2)】
        =======================================================================
      */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-95 contrast-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* 🚨 60% 遮罩层 (Mask 60%) */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      {/* 附加微量青铜暗调暗角，营造极具历史厚重感的博物馆地宫氛围 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140C07]/50 via-transparent to-[#0A0503]/80 pointer-events-none" />

      {/* 
        =======================================================================
        顶部栏：大葆台博物馆中英文 Logo 与微信小程序胶囊操作钮 (参考图2)
        =======================================================================
      */}
      <div className="relative z-10 w-full pt-3 px-4 flex items-center justify-between pointer-events-none">
        {/* 左侧：大葆台博物馆中英文铭章 */}
        <div className="flex items-center gap-2">
          {/* 古典座椅铜印 Logo */}
          <div className="w-7 h-7 rounded-sm border border-[#D6A84B]/80 bg-[#2A160E]/80 flex items-center justify-center p-0.5 shadow-md">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F1D98D] stroke-current fill-none" strokeWidth="1.5">
              <path d="M4 19h16M7 19v-4h10v4M6 10h12v5H6zM8 5h8v5H8z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-serif font-black tracking-widest text-[#F1D98D] drop-shadow">
              大葆台博物馆
            </span>
            <span className="text-[7.5px] font-mono tracking-wider text-[#A89078] uppercase scale-90 -ml-1">
              DABAOTAI MUSEUM
            </span>
          </div>
        </div>

        {/* 右侧：小程序胶囊操作条 (Capsule control) */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-[#D6A84B]/40 shadow-inner">
          <MoreHorizontal className="w-3.5 h-3.5 text-[#F1D98D]" />
          <div className="w-[1px] h-3 bg-[#D6A84B]/40" />
          <Circle className="w-3 h-3 text-[#F1D98D] fill-[#F1D98D]/40" />
        </div>
      </div>

      {/* 
        =======================================================================
        中央展厅主视觉与文字排版 (完全契合图2艺术构图)
        =======================================================================
      */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-6 space-y-4">
        {/* 透光温润玉舞人主图腾 (带金芒光晕) */}
        <div className="relative flex items-center justify-center mb-1">
          <div className="absolute w-36 h-36 rounded-full bg-[#D6A84B]/15 blur-2xl pointer-events-none animate-pulse" />
          <div className="w-24 h-24 rounded-full border border-[#D6A84B]/40 bg-[#1A0E08]/60 backdrop-blur-sm flex items-center justify-center shadow-[0_0_35px_rgba(214,168,75,0.3)]">
            {/* 翘袖折腰白玉舞人剪影徽章 */}
            <svg viewBox="0 0 100 120" className="w-20 h-20 filter drop-shadow-[0_0_12px_rgba(241,217,141,0.6)]">
              <path
                d="M50 22 Q32 46 42 70 Q52 88 45 106"
                stroke="#F1D98D"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M42 38 Q78 14 90 8 M38 48 Q15 68 10 90"
                stroke="#F1D98D"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="50" cy="15" r="6" fill="#F1D98D" />
            </svg>
          </div>
        </div>

        {/* 殿堂级大汉书法标题：大 葆 台 */}
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-[0.35em] text-[#F1D98D] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] ml-3">
            大葆台
          </h1>
          <p className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#D6A84B] font-bold mt-1">
            北京大葆台汉墓博物馆
          </p>
          <p className="text-[9px] font-mono tracking-[0.3em] text-[#A89078] uppercase pt-1">
            E N T E R &nbsp; T H E &nbsp; M E M O R Y
          </p>
        </div>

        {/* 当前进入的具体展厅副标题 */}
        {targetHallName && (
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#1C0E07]/80 border border-[#D6A84B]/60 shadow-lg mt-2">
            <span className="text-[11px] font-serif text-[#FFE89E] tracking-widest font-bold">
              ✦ 即将步入：{targetHallName} ✦
            </span>
          </div>
        )}
      </div>

      {/* 
        =======================================================================
        底部：经典大汉祥云纹金边椭圆药丸按钮 (完全对应图2的“进入记忆”按钮)
        =======================================================================
      */}
      <div className="relative z-10 w-full max-w-xs mx-auto pb-10 px-4 flex flex-col items-center">
        <button
          onClick={() => {
            soundFX.playBronzeChime();
            onContinue();
          }}
          className="group relative w-full py-3.5 px-8 rounded-full border-2 border-[#D6A84B] bg-gradient-to-r from-[#2E1A11]/90 via-[#3D2319]/95 to-[#2E1A11]/90 hover:from-[#3D2319] hover:to-[#4A2B1E] text-[#F1D98D] text-base font-serif font-bold tracking-[0.25em] shadow-[0_0_30px_rgba(214,168,75,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 overflow-hidden"
        >
          {/* 左侧祥云微卷装饰 */}
          <span className="text-xs text-[#D6A84B]/80 font-serif">《</span>

          <span>{displayButtonText}</span>

          {/* 右侧祥云微卷装饰 */}
          <span className="text-xs text-[#D6A84B]/80 font-serif">》</span>

          {/* 流光悬浮动效 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </button>

        <span className="text-[9px] font-mono text-[#A89078] tracking-widest mt-2 opacity-75">
          点击按钮开启两千年沉睡时空
        </span>
      </div>
    </div>
  );
};
