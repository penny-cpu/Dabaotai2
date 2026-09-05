import React from 'react';
import { Sparkles, User, Bookmark, ChevronRight, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/museumData';

/**
 * Han Dynasty Cloud Wing Line Flourish (Left)
 */
export const HanCloudWingLeft: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-10 h-4',
  color = '#C8943D',
}) => (
  <svg viewBox="0 0 54 16" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 8H26C30 8 34 3 39 5C43 7 42 14 36 14C30 14 29 9 34 6C37 4 43 6 43 10C43 12 40 13 38 12"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="49" cy="8" r="1.5" fill={color} />
  </svg>
);

/**
 * Han Dynasty Cloud Wing Line Flourish (Right)
 */
export const HanCloudWingRight: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-10 h-4',
  color = '#C8943D',
}) => (
  <svg viewBox="0 0 54 16" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M54 8H28C24 8 20 3 15 5C11 7 12 14 18 14C24 14 25 9 20 6C17 4 11 6 11 10C11 12 14 13 16 12"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="5" cy="8" r="1.5" fill={color} />
  </svg>
);

/**
 * Han Cloud Header Title (—{云纹}— 标题文字 —{云纹}—)
 */
export interface HanCloudTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  color?: string;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const HanCloudTitle: React.FC<HanCloudTitleProps> = ({
  title,
  subtitle,
  className = '',
  color = '#C8943D',
  textColor = '#E6D3AA',
  size = 'md',
}) => {
  const textSizeClass =
    size === 'lg' ? 'text-lg font-black tracking-widest' : size === 'sm' ? 'text-xs tracking-wider' : 'text-sm font-bold tracking-widest';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center justify-center gap-2.5">
        <HanCloudWingLeft color={color} className="w-8 sm:w-10 h-3.5 opacity-85 shrink-0" />
        <span className={`font-serif ${textSizeClass}`} style={{ color: textColor }}>
          {title}
        </span>
        <HanCloudWingRight color={color} className="w-8 sm:w-10 h-3.5 opacity-85 shrink-0" />
      </div>
      {subtitle && (
        <span className="text-[10px] text-[#A89078] tracking-widest uppercase mt-0.5 font-sans">
          {subtitle}
        </span>
      )}
    </div>
  );
};

/**
 * Standard Museum Top Bar (大葆台博物馆 / DABAOTAI MUSEUM + Right Actions)
 */
export interface HanMuseumTopBarProps {
  onOpenGuide?: () => void;
  onOpenSeal?: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
  skipLabel?: string;
  titleOverride?: string;
  className?: string;
}

export const HanMuseumTopBar: React.FC<HanMuseumTopBarProps> = ({
  onOpenGuide,
  onOpenSeal,
  onSkip,
  showSkip = false,
  skipLabel = '跳过',
  titleOverride,
  className = '',
}) => {
  return (
    <div className={`w-full flex items-center justify-between px-4 py-3 z-30 ${className}`}>
      {/* Museum Title & Subtitle */}
      <div className="flex flex-col text-left">
        <span className="text-xs font-serif font-bold text-[#E6D3AA] tracking-wider drop-shadow-sm">
          {titleOverride || '大葆台博物馆'}
        </span>
        <span className="text-[8px] text-[#A89078] tracking-widest font-sans font-medium uppercase scale-90 origin-left">
          DABAOTAI MUSEUM
        </span>
      </div>

      {/* Right Side Icons / Skip */}
      <div className="flex items-center gap-2">
        {showSkip && onSkip && (
          <button
            onClick={onSkip}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-black/40 border border-[#A9782B]/60 text-[#E6D3AA] text-[11px] font-serif hover:bg-black/60 active:scale-95 transition-all"
          >
            <span>{skipLabel}</span>
            <ChevronRight className="w-3 h-3 text-[#C8943D]" />
          </button>
        )}

        {onOpenGuide && (
          <button
            onClick={onOpenGuide}
            title="玉舞人向导"
            className="w-7 h-7 rounded-full border border-[#A9782B]/60 bg-black/40 flex items-center justify-center text-[#E6D3AA] hover:border-[#D6A84B] hover:bg-black/60 transition-all active:scale-95 shadow-sm"
          >
            <User className="w-3.5 h-3.5 text-[#C8943D]" />
          </button>
        )}

        {onOpenSeal && (
          <button
            onClick={onOpenSeal}
            title="展厅印鉴卡册"
            className="w-7 h-7 rounded-full border border-[#A9782B]/60 bg-black/40 flex items-center justify-center text-[#E6D3AA] hover:border-[#D6A84B] hover:bg-black/60 transition-all active:scale-95 shadow-sm"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C8943D]" />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Linear Han Button (as in Page 01 (入墓) and Page 05 (拍照识别 / 手动输入))
 */
export interface HanLinearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cloud-wing' | 'linear-box' | 'primary';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const HanLinearButton: React.FC<HanLinearButtonProps> = ({
  variant = 'linear-box',
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}) => {
  if (variant === 'cloud-wing') {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <HanCloudWingLeft className="w-9 h-4 opacity-80 shrink-0 text-[#C8943D]" />
        <button
          {...props}
          className="px-6 py-2 rounded-full bg-[#2A160E]/80 hover:bg-[#3D2115] border border-[#D6A84B] text-[#F1D98D] font-serif font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(200,148,61,0.2)] active:scale-95 transition-all flex items-center gap-1.5"
        >
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </button>
        <HanCloudWingRight className="w-9 h-4 opacity-80 shrink-0 text-[#C8943D]" />
      </div>
    );
  }

  return (
    <button
      {...props}
      className={`px-4 py-2.5 rounded-xl bg-gradient-to-b from-[#2D1A12]/90 to-[#1B0F0A]/95 hover:from-[#3D2319] hover:to-[#26150F] border border-[#A9782B]/80 text-[#E6D3AA] font-serif text-xs font-semibold tracking-wider shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 ${className}`}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
};

/**
 * Exquisite Han Dynasty Nebula Cloud Corner Line Texture Decoration
 * (极细汉代星云云纹壁画纹理线，只出现在视频框的四个角上)
 */
export const HanVideoCornerClouds: React.FC<{
  color?: string;
  size?: number;
  className?: string;
}> = ({ color = '#D6A84B', size = 36, className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none z-20 ${className}`}>
    {/* Top-Left Corner Nebula Cloud */}
    <div className="absolute top-1.5 left-1.5" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-[0_0_4px_rgba(214,168,75,0.3)]">
        {/* Corner L-bracket line */}
        <path d="M1 28 V7 C1 3.7 3.7 1 7 1 H28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        {/* Han nebula cloud swirl (星云/卷云纹) */}
        <path
          d="M5 16 C5 10 9 6 15 6 C20 6 23 9 23 13 C23 16.5 20 18.5 17 18.5 C14.5 18.5 13 17 13 15 C13 13.5 14 12.5 15.5 12.5 C16.5 12.5 17 13 17 13.8"
          stroke={color}
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="17" cy="13.8" r="0.8" fill={color} />
        {/* Secondary subtle cloud tail */}
        <path d="M9 22 C7 20 6 18 6 16" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
        <path d="M22 9 C20 7 18 6 16 6" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>

    {/* Top-Right Corner Nebula Cloud */}
    <div className="absolute top-1.5 right-1.5" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-[0_0_4px_rgba(214,168,75,0.3)]">
        <path d="M35 28 V7 C35 3.7 32.3 1 29 1 H8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        <path
          d="M31 16 C31 10 27 6 21 6 C16 6 13 9 13 13 C13 16.5 16 18.5 19 18.5 C21.5 18.5 23 17 23 15 C23 13.5 22 12.5 20.5 12.5 C19.5 12.5 19 13 19 13.8"
          stroke={color}
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="19" cy="13.8" r="0.8" fill={color} />
        <path d="M27 22 C29 20 30 18 30 16" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
        <path d="M14 9 C16 7 18 6 20 6" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>

    {/* Bottom-Left Corner Nebula Cloud */}
    <div className="absolute bottom-1.5 left-1.5" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-[0_0_4px_rgba(214,168,75,0.3)]">
        <path d="M1 8 V29 C1 32.3 3.7 35 7 35 H28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        <path
          d="M5 20 C5 26 9 30 15 30 C20 30 23 27 23 23 C23 19.5 20 17.5 17 17.5 C14.5 17.5 13 19 13 21 C13 22.5 14 23.5 15.5 23.5 C16.5 23.5 17 23 17 22.2"
          stroke={color}
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="17" cy="22.2" r="0.8" fill={color} />
        <path d="M9 14 C7 16 6 18 6 20" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
        <path d="M22 27 C20 29 18 30 16 30" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>

    {/* Bottom-Right Corner Nebula Cloud */}
    <div className="absolute bottom-1.5 right-1.5" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-[0_0_4px_rgba(214,168,75,0.3)]">
        <path d="M35 8 V29 C35 32.3 32.3 35 29 35 H8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        <path
          d="M31 20 C31 26 27 30 21 30 C16 30 13 27 13 23 C13 19.5 16 17.5 19 17.5 C21.5 17.5 23 19 23 21 C23 22.5 22 23.5 20.5 23.5 C19.5 23.5 19 23 19 22.2"
          stroke={color}
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="19" cy="22.2" r="0.8" fill={color} />
        <path d="M27 14 C29 16 30 18 30 20" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
        <path d="M14 27 C16 29 18 30 20 30" stroke={color} strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  </div>
);
