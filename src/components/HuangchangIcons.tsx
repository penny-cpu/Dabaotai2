import React from 'react';

interface IconProps {
  className?: string;
  isActive?: boolean;
  size?: number;
}

/**
 * 图标 1：黄色柏木芯 (Yellow Cypress Wood Core/Log)
 * 汉代画像砖石线条风格：单体十厘米见方黄心柏木条，带年轮与金石雕凿线条
 */
export const CypressWoodCoreIcon: React.FC<IconProps> = ({
  className = '',
  isActive = false,
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
    >
      {/* Background Medallion Frame */}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="10"
        fill={isActive ? '#3d2b1f' : '#1a120b'}
        stroke={isActive ? '#d2b48c' : '#5c4033'}
        strokeWidth="2"
      />
      {/* Decorative Han Stone Carving Corners */}
      <path d="M 8 14 L 8 8 L 14 8" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 50 8 L 56 8 L 56 14" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 8 50 L 8 56 L 14 56" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 50 56 L 56 56 L 56 50" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />

      {/* 3D Isometric Yellow Cypress Wood Log (黄色柏木芯) */}
      {/* Log Body Top Surface */}
      <polygon
        points="18,26 42,16 52,21 28,31"
        fill={isActive ? '#d2b48c' : '#8c7561'}
        stroke={isActive ? '#e6d5b8' : '#c2a385'}
        strokeWidth="1.5"
      />
      {/* Log Body Side Surface */}
      <polygon
        points="28,31 52,21 52,38 28,48"
        fill={isActive ? '#c2a385' : '#5c4033'}
        stroke={isActive ? '#d2b48c' : '#8c7561'}
        strokeWidth="1.5"
      />
      {/* Log Front Cross-Section (Yellow Core / 柏木黄芯) */}
      <polygon
        points="18,26 28,31 28,48 18,43"
        fill={isActive ? '#e6d5b8' : '#a88054'}
        stroke={isActive ? '#ffffff' : '#d2b48c'}
        strokeWidth="2"
      />

      {/* Concentric Annual Rings on Log Front ("黄心") */}
      <ellipse
        cx="23"
        cy="37"
        rx="3.5"
        ry="6"
        fill={isActive ? '#d2b48c' : '#5c4033'}
        stroke={isActive ? '#3d2b1f' : '#241a13'}
        strokeWidth="1"
      />
      <ellipse
        cx="23"
        cy="37"
        rx="1.5"
        ry="2.5"
        fill={isActive ? '#e6d5b8' : '#d2b48c'}
      />

      {/* Chisel Texture Lines (Han Relief Line-art) */}
      <line x1="33" y1="26" x2="47" y2="20" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="33" y1="34" x2="47" y2="28" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="33" y1="42" x2="47" y2="36" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
};

/**
 * 图标 2：黄色柏木芯放置在方形墓坑里 (Cypress Wood Cores Placed in Square Tomb Pit)
 * 汉代画像砖石线条风格：方形墓坑基底 + 柏木芯单侧排布入位
 */
export const TombPitWithLogIcon: React.FC<IconProps> = ({
  className = '',
  isActive = false,
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
    >
      {/* Background Medallion Frame */}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="10"
        fill={isActive ? '#3d2b1f' : '#1a120b'}
        stroke={isActive ? '#d2b48c' : '#5c4033'}
        strokeWidth="2"
      />
      {/* Decorative Han Stone Carving Corners */}
      <path d="M 8 14 L 8 8 L 14 8" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 50 8 L 56 8 L 56 14" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 8 50 L 8 56 L 14 56" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 50 56 L 56 56 L 56 50" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />

      {/* Square Tomb Pit Outline (方形墓坑) */}
      <polygon
        points="32,12 52,24 32,36 12,24"
        fill={isActive ? '#241a13' : '#120c07'}
        stroke={isActive ? '#d2b48c' : '#8c7561'}
        strokeWidth="1.5"
      />
      <polygon
        points="12,24 32,36 32,52 12,40"
        fill={isActive ? '#1a120b' : '#0d0804'}
        stroke={isActive ? '#8c7561' : '#5c4033'}
        strokeWidth="1.5"
      />
      <polygon
        points="32,36 52,24 52,40 32,52"
        fill={isActive ? '#2c1d12' : '#181009'}
        stroke={isActive ? '#8c7561' : '#5c4033'}
        strokeWidth="1.5"
      />

      {/* Yellow Cypress Logs stacked inside left/back pit wall */}
      {/* Log 1 */}
      <polygon
        points="18,27 24,30 24,36 18,33"
        fill={isActive ? '#e6d5b8' : '#a88054'}
        stroke={isActive ? '#ffffff' : '#d2b48c'}
        strokeWidth="1"
      />
      <polygon
        points="24,30 38,22 38,28 24,36"
        fill={isActive ? '#d2b48c' : '#8c7561'}
        stroke={isActive ? '#e6d5b8' : '#5c4033'}
        strokeWidth="1"
      />

      {/* Log 2 */}
      <polygon
        points="22,29 28,32 28,38 22,35"
        fill={isActive ? '#e6d5b8' : '#a88054'}
        stroke={isActive ? '#ffffff' : '#d2b48c'}
        strokeWidth="1"
      />
      <polygon
        points="28,32 42,24 42,30 28,38"
        fill={isActive ? '#c2a385' : '#8c7561'}
        stroke={isActive ? '#d2b48c' : '#5c4033'}
        strokeWidth="1"
      />

      {/* Placement Indicator Arrow / Guide line */}
      <path
        d="M 44,14 L 34,22"
        stroke={isActive ? '#e6d5b8' : '#d2b48c'}
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <polygon
        points="34,22 38,19 37,23"
        fill={isActive ? '#e6d5b8' : '#d2b48c'}
      />
    </svg>
  );
};

/**
 * 图标 3：黄色柏木芯放置在方形墓坑里合围成方形的样式 (Yellow Cypress Wood Cores Form Complete Square Enclosure)
 * 汉代画像砖石线条风格：四向合围的黄肠题凑方形木墙 + 棺室核心
 */
export const SquareEnclosureIcon: React.FC<IconProps> = ({
  className = '',
  isActive = false,
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
    >
      {/* Background Medallion Frame */}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="10"
        fill={isActive ? '#3d2b1f' : '#1a120b'}
        stroke={isActive ? '#d2b48c' : '#5c4033'}
        strokeWidth="2"
      />
      {/* Decorative Han Stone Carving Corners */}
      <path d="M 8 14 L 8 8 L 14 8" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 50 8 L 56 8 L 56 14" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 8 50 L 8 56 L 14 56" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />
      <path d="M 50 56 L 56 56 L 56 50" stroke={isActive ? '#e6d5b8' : '#8c7561'} strokeWidth="1.5" />

      {/* Square Tomb Pit Outer Boundary Line (方形墓坑) */}
      <rect
        x="12"
        y="12"
        width="40"
        height="40"
        rx="2"
        fill={isActive ? '#241a13' : '#120c07'}
        stroke={isActive ? '#d2b48c' : '#8c7561'}
        strokeWidth="1.5"
      />

      {/* 4-Sided Huangchang Ticou Square Timber Wall (黄色柏木芯合围方形) */}
      {/* Top Wall */}
      <rect x="15" y="15" width="34" height="6" fill={isActive ? '#d2b48c' : '#8c7561'} stroke={isActive ? '#e6d5b8' : '#5c4033'} strokeWidth="1" />
      {/* Bottom Wall */}
      <rect x="15" y="43" width="34" height="6" fill={isActive ? '#d2b48c' : '#8c7561'} stroke={isActive ? '#e6d5b8' : '#5c4033'} strokeWidth="1" />
      {/* Left Wall */}
      <rect x="15" y="21" width="6" height="22" fill={isActive ? '#c2a385' : '#8c7561'} stroke={isActive ? '#e6d5b8' : '#5c4033'} strokeWidth="1" />
      {/* Right Wall */}
      <rect x="43" y="21" width="6" height="22" fill={isActive ? '#c2a385' : '#8c7561'} stroke={isActive ? '#e6d5b8' : '#5c4033'} strokeWidth="1" />

      {/* Vertical Timber Joint Lines on Wall Blocks (题凑向内截面刻痕) */}
      <line x1="21" y1="15" x2="21" y2="21" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />
      <line x1="27" y1="15" x2="27" y2="21" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />
      <line x1="33" y1="15" x2="33" y2="21" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />
      <line x1="39" y1="15" x2="39" y2="21" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />

      <line x1="21" y1="43" x2="21" y2="49" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />
      <line x1="27" y1="43" x2="27" y2="49" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />
      <line x1="33" y1="43" x2="33" y2="49" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />
      <line x1="39" y1="43" x2="39" y2="49" stroke={isActive ? '#3d2b1f' : '#241a13'} strokeWidth="1" />

      {/* Center Royal Coffin Chamber (梓宫棺室) */}
      <rect
        x="24"
        y="24"
        width="16"
        height="16"
        rx="1"
        fill={isActive ? '#e6d5b8' : '#a88054'}
        stroke={isActive ? '#ffffff' : '#d2b48c'}
        strokeWidth="1.5"
      />
      <rect
        x="27"
        y="27"
        width="10"
        height="10"
        fill={isActive ? '#3d2b1f' : '#1a120b'}
        stroke={isActive ? '#d2b48c' : '#8c7561'}
        strokeWidth="1"
      />

      {/* Radiating Square Aura Effect */}
      {isActive && (
        <rect
          x="10"
          y="10"
          width="44"
          height="44"
          rx="4"
          stroke="#d2b48c"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="animate-pulse"
        />
      )}
    </svg>
  );
};
