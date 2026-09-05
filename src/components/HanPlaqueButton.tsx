import React from 'react';

export interface HanPlaqueButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  decorations?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * HanPlaqueButton
 * 遵循用户要求：“所有视频和按钮去边框，只要四角暗金细线。”
 * 移除四周实线边框，四角配精致暗金细线（0.5px-1.5px hairline brackets）
 */
export const HanPlaqueButton: React.FC<HanPlaqueButtonProps> = ({
  variant = 'primary',
  size = 'md',
  decorations = true,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  // Height & padding based on size
  const sizeClasses =
    size === 'lg'
      ? 'h-[50px] min-h-[50px] px-5 text-sm sm:text-base'
      : size === 'sm'
      ? 'h-[38px] min-h-[38px] px-3 text-xs'
      : 'h-[44px] min-h-[44px] px-4 text-xs sm:text-sm';

  // Variant classes conforming strictly to Han Inscription Plaque design (去边框)
  let variantClasses = '';
  if (disabled) {
    variantClasses =
      'bg-gradient-to-b from-[#301B12] to-[#1F100A] text-[#7A6452] opacity-50 cursor-not-allowed shadow-none';
  } else if (variant === 'primary') {
    variantClasses =
      'han-plaque-primary bg-gradient-to-b from-[#692A1D] to-[#421A12] text-[#F1D98D] shadow-[0_6px_20px_rgba(0,0,0,0.45)] hover:from-[#7C3324] hover:to-[#4F2017] hover:text-[#FFF0BD] active:scale-[0.985]';
  } else if (variant === 'secondary') {
    variantClasses =
      'han-plaque-secondary bg-gradient-to-b from-[#2F1C12] to-[#1C0F0A] text-[#E6D3AA] shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:from-[#3E2417] hover:to-[#26140D] hover:text-[#F1D98D] active:scale-[0.985]';
  } else if (variant === 'gold') {
    variantClasses =
      'han-plaque-gold bg-gradient-to-b from-[#B88636] to-[#825515] text-[#1A0E08] font-black shadow-[0_6px_20px_rgba(184,134,54,0.35)] hover:brightness-110 active:scale-[0.985]';
  } else {
    variantClasses =
      'bg-[#1A100B]/80 text-[#E6D3AA] hover:bg-[#2C1910] active:scale-[0.985]';
  }

  return (
    <button
      disabled={disabled}
      className={`relative rounded-[8px] border-0 font-serif font-black tracking-wider transition-all duration-200 flex items-center justify-center gap-2 select-none overflow-visible group ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* =========================================================================
          左右边弧形包裹暗金设计细纹，上下纯细线，无四角边，保留纯粹简约感
          ========================================================================= */}
      <span className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8F6A30]/50 to-transparent pointer-events-none" />
      <span className="absolute inset-x-4 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#6E4D20]/55 to-transparent pointer-events-none" />

      {/* 左侧弧形包裹细纹 */}
      <span className="absolute left-1.5 inset-y-1 w-2 flex items-center justify-center pointer-events-none opacity-45 group-hover:opacity-80 transition-opacity">
        <svg viewBox="0 0 10 32" className="w-full h-full stroke-[#A88040] fill-none" strokeWidth="1.2">
          <path d="M7 2 C2 8, 2 24, 7 30 M4 8 C1 12, 1 20, 4 24" strokeLinecap="round" />
        </svg>
      </span>

      {/* 右侧弧形包裹细纹 */}
      <span className="absolute right-1.5 inset-y-1 w-2 flex items-center justify-center pointer-events-none opacity-45 group-hover:opacity-80 transition-opacity scale-x-[-1]">
        <svg viewBox="0 0 10 32" className="w-full h-full stroke-[#A88040] fill-none" strokeWidth="1.2">
          <path d="M7 2 C2 8, 2 24, 7 30 M4 8 C1 12, 1 20, 4 24" strokeLinecap="round" />
        </svg>
      </span>

      {/* Optional Left Han Cloud Motif Decoration */}
      {decorations && !disabled && (
        <span className="shrink-0 text-[#D6A84B]/70 group-hover:text-[#F1D98D] transition-colors pointer-events-none">
          <svg viewBox="0 0 24 14" className="w-3 h-2 fill-current">
            <path d="M12 2 C7 2, 4 5, 4 8 C2 8, 1 9.5, 1 11 C1 12.5, 2.5 13.5, 4 13.5 L20 13.5 C22 13.5, 23 12.5, 23 11 C23 9.5, 21.5 8, 19.5 8 C19.5 5, 16.5 2, 12 2 Z" opacity="0.85" />
          </svg>
        </span>
      )}

      {leftIcon && <span className="shrink-0">{leftIcon}</span>}

      <span className="relative z-10 flex items-center gap-1.5 truncate">
        {children}
      </span>

      {rightIcon && <span className="shrink-0">{rightIcon}</span>}

      {/* Optional Right Han Cloud Motif Decoration */}
      {decorations && !disabled && (
        <span className="shrink-0 text-[#D6A84B]/70 group-hover:text-[#F1D98D] transition-colors pointer-events-none scale-x-[-1]">
          <svg viewBox="0 0 24 14" className="w-3 h-2 fill-current">
            <path d="M12 2 C7 2, 4 5, 4 8 C2 8, 1 9.5, 1 11 C1 12.5, 2.5 13.5, 4 13.5 L20 13.5 C22 13.5, 23 12.5, 23 11 C23 9.5, 21.5 8, 19.5 8 C19.5 5, 16.5 2, 12 2 Z" opacity="0.85" />
          </svg>
        </span>
      )}
    </button>
  );
};
