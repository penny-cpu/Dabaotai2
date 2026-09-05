import React from 'react';

export type TombPaletteType =
  | 'prologue'   // 序章: 玄黑＋玉青
  | 'weapon'     // 第一章 戈舞: 玄黑＋暗金
  | 'banquet'    // 第二章 宴乐: 深棕＋玉青＋金
  | 'sleeve'     // 第三章 翘袖折腰: 漆红棕＋玉青
  | 'baixi'      // 第四章 百戏: 暖赭＋暗金
  | 'funerary'   // 第五章 送葬云纹: 烟黑＋朱砂
  | 'huangchang' // 第六章 黄肠题凑: 木棕＋玄黑
  | 'celestial'  // 第七章 星路: 玄黑＋星金＋玉青
  | 'ascension'  // 第七章 星路同名别称
  | 'modern';    // 现代章节: 夕阳暖金

export type TombMotifType = 
  | 'cloud' 
  | 'jade_bi' 
  | 'lacquer' 
  | 'brick' 
  | 'funerary' 
  | 'cypress' 
  | 'celestial' 
  | 'star'
  | 'timber'
  | 'modern'
  | 'none';

interface MuseumTombBackdropProps {
  palette?: TombPaletteType | string;
  motif?: TombMotifType;
  pattern?: string; // backwards compatibility
  hasTopSpotlight?: boolean;
  spotlight?: boolean; // backwards compatibility
  intensity?: 'subtle' | 'normal' | 'vivid';
  spotlightAngle?: 'top' | '45deg';
  className?: string;
  children?: React.ReactNode;
}

/**
 * MuseumTombBackdrop
 * 依据用户设计指令重塑大葆台沉浸展陈空间色彩视觉系统：
 * - 序章：玄黑＋玉青
 * - 戈舞：玄黑＋暗金
 * - 宴乐：深棕＋玉青＋金
 * - 翘袖折腰：漆红棕＋玉青
 * - 百戏：暖赭＋暗金
 * - 送葬云纹：烟黑＋朱砂
 * - 黄肠题凑：木棕＋玄黑
 * - 星路：玄黑＋星金＋玉青
 * - 现代章节：夕阳暖金
 */
export const MuseumTombBackdrop: React.FC<MuseumTombBackdropProps> = ({
  palette = 'weapon',
  motif,
  pattern,
  hasTopSpotlight = true,
  spotlight,
  intensity = 'subtle',
  spotlightAngle = '45deg',
  className = '',
  children,
}) => {
  // Map pattern backwards-compat
  const effectiveMotif: TombMotifType = (motif || (pattern as TombMotifType) || getDefaultMotif(palette as TombPaletteType));
  const showSpotlight = spotlight !== undefined ? spotlight : hasTopSpotlight;

  // Resolve Palette Backgrounds & Colors
  const paletteConfig = getPaletteConfig(palette as TombPaletteType);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none han-app-sandbox-grain ${className}`}
      style={{ backgroundColor: paletteConfig.baseBg }}
    >
      {/* =========================================================================
          第一层: 章节专属主题渐变底色
          ========================================================================= */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: paletteConfig.gradient,
        }}
      />

      {/* 专属章节双向/局部高阶光晕层 (玉青、暗金、漆红棕、朱砂、夕阳暖金) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: paletteConfig.ambientLayer,
          opacity: intensity === 'vivid' ? 0.95 : intensity === 'normal' ? 0.8 : 0.65,
        }}
      />

      {/* 汉代壁画砂石粗粝古朴磨砂质感层 */}
      <div className="han-mural-texture opacity-80" />

      {/* =========================================================================
          第二层: 极弱汉代经典纹样 (局部大尺度 3%—6% 透明度)
          ========================================================================= */}
      {effectiveMotif !== 'none' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* 1. 云气纹 (Cloud Scroll - 序章、戈舞) */}
          {(effectiveMotif === 'cloud' || palette === 'prologue' || palette === 'weapon') && (
            <svg
              className="absolute -right-16 -top-10 w-[380px] h-[380px] opacity-[0.05]"
              style={{ color: paletteConfig.motifColor }}
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path d="M10,100 C30,70 70,60 90,80 C110,60 150,60 170,90 C190,120 160,160 120,160 C80,160 50,140 30,150 C10,160 0,130 10,100 Z M60,95 C45,95 35,110 45,125 C55,140 85,135 95,120 C105,105 80,95 60,95 Z" />
              <path d="M120,40 C140,25 170,35 180,60 C190,85 160,110 140,100 C120,90 100,60 120,40 Z" />
            </svg>
          )}

          {/* 2. 玉璧双凤纹 (Jade Bi Disc - 宴乐深棕＋玉青＋金) */}
          {(effectiveMotif === 'jade_bi' || palette === 'banquet') && (
            <svg
              className="absolute -left-20 top-20 w-[400px] h-[400px] opacity-[0.06]"
              style={{ color: paletteConfig.motifColor }}
              viewBox="0 0 240 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="120" cy="120" r="100" />
              <circle cx="120" cy="120" r="70" strokeDasharray="3 4" />
              <circle cx="120" cy="120" r="38" />
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x = 120 + 85 * Math.cos(angle);
                const y = 120 + 85 * Math.sin(angle);
                return <circle key={`bi-${i}`} cx={x} cy={y} r="3" fill="currentColor" />;
              })}
            </svg>
          )}

          {/* 3. 漆器舞袖流云纹 (Lacquer Swirls - 翘袖折腰漆红棕＋玉青) */}
          {(effectiveMotif === 'lacquer' || palette === 'sleeve') && (
            <svg
              className="absolute right-0 bottom-10 w-[360px] h-[360px] opacity-[0.06]"
              style={{ color: paletteConfig.motifColor }}
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20,180 Q80,160 100,100 T180,40" strokeLinecap="round" />
              <path d="M40,190 Q90,140 120,90 Q150,40 190,20" strokeLinecap="round" />
              <path d="M90,110 A20,20 0 1,0 130,110 A20,20 0 1,0 90,110" />
            </svg>
          )}

          {/* 4. 画像砖几何菱纹 (Portrait Brick Lozenge - 百戏暖赭＋暗金) */}
          {(effectiveMotif === 'brick' || palette === 'baixi') && (
            <svg
              className="absolute -left-10 -bottom-10 w-[360px] h-[360px] opacity-[0.06]"
              style={{ color: paletteConfig.motifColor }}
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <pattern id="brickPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20,0 L40,20 L20,40 L0,20 Z" />
                <path d="M20,6 L34,20 L20,34 L6,20 Z" />
              </pattern>
              <rect width="200" height="200" fill="url(#brickPattern)" />
            </svg>
          )}

          {/* 5. 送葬云纹 (Funerary Ritual Clouds - 送葬云纹烟黑＋朱砂) */}
          {(effectiveMotif === 'funerary' || palette === 'funerary') && (
            <svg
              className="absolute right-0 top-12 w-[380px] h-[380px] opacity-[0.07]"
              style={{ color: '#BD3A2F' }}
              viewBox="0 0 220 220"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20,160 C50,120 100,130 120,90 C140,50 190,60 210,20" strokeLinecap="round" />
              <path d="M40,180 C70,140 120,150 140,110 C160,70 200,80 220,50" strokeLinecap="round" />
              <circle cx="120" cy="90" r="12" strokeDasharray="2 3" />
            </svg>
          )}

          {/* 6. 黄肠题凑年轮木纹 (Huangchang Cypress Timber Rings - 木棕＋玄黑) */}
          {(effectiveMotif === 'cypress' || palette === 'huangchang') && (
            <svg
              className="absolute -right-10 bottom-0 w-[420px] h-[420px] opacity-[0.07]"
              style={{ color: '#8E6738' }}
              viewBox="0 0 240 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="200" cy="220" r="40" />
              <circle cx="200" cy="220" r="75" />
              <circle cx="200" cy="220" r="115" />
              <circle cx="200" cy="220" r="160" />
              <circle cx="200" cy="220" r="210" />
            </svg>
          )}

          {/* 7. 四象星宿连线 (Constellations - 玄黑＋星金＋玉青) */}
          {(effectiveMotif === 'celestial' || palette === 'celestial') && (
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.08]"
              style={{ color: '#E6D3AA' }}
              viewBox="0 0 300 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="60" cy="80" r="2.5" fill="#E0BE6C" />
              <circle cx="110" cy="95" r="2" fill="#E0BE6C" />
              <circle cx="150" cy="70" r="3" fill="#E0BE6C" />
              <circle cx="190" cy="110" r="2" fill="#E0BE6C" />
              <circle cx="240" cy="85" r="2.5" fill="#E0BE6C" />
              <line x1="60" y1="80" x2="110" y2="95" strokeDasharray="2 3" />
              <line x1="110" y1="95" x2="150" y2="70" strokeDasharray="2 3" />
              <line x1="150" y1="70" x2="190" y2="110" strokeDasharray="2 3" />
              <line x1="190" y1="110" x2="240" y2="85" strokeDasharray="2 3" />
            </svg>
          )}

          {/* 8. 现代章节 (夕阳暖金展览馆建筑与天光) */}
          {palette === 'modern' && (
            <div className="absolute inset-0 pointer-events-none">
              {/* 夕阳地平线柔和光束 */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 90%, rgba(255, 178, 77, 0.28) 0%, rgba(214, 134, 45, 0.15) 45%, transparent 75%)',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          第三层: 展柜考古顶光束
          ========================================================================= */}
      {showSpotlight && (
        <div 
          className={`absolute inset-0 pointer-events-none ${
            spotlightAngle === '45deg' ? 'archaeology-spotlight-45deg' : 'archaeology-spotlight'
          }`}
          style={{
            opacity: palette === 'modern' ? 0.4 : 0.65,
          }}
        />
      )}

      {/* Children elements if used as wrapper */}
      {children && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      )}
    </div>
  );
};

function getDefaultMotif(palette: TombPaletteType): TombMotifType {
  switch (palette) {
    case 'prologue':
      return 'cloud';
    case 'weapon':
      return 'cloud';
    case 'banquet':
      return 'jade_bi';
    case 'sleeve':
      return 'lacquer';
    case 'baixi':
      return 'brick';
    case 'funerary':
      return 'funerary';
    case 'huangchang':
      return 'cypress';
    case 'celestial':
    case 'ascension':
      return 'celestial';
    case 'modern':
      return 'modern';
    default:
      return 'cloud';
  }
}

function getPaletteConfig(palette: TombPaletteType) {
  switch (palette) {
    case 'prologue':
      // 序章：红棕深黑色调 ＋ 极微弱玉青
      return {
        baseBg: '#110907',
        gradient: 'linear-gradient(180deg, #0C0605 0%, #1A0D09 50%, #100806 100%)',
        ambientLayer: 'radial-gradient(circle at 80% 20%, rgba(130, 42, 28, 0.35) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(78, 122, 104, 0.22) 0%, transparent 60%)',
        motifColor: '#C8943D',
      };

    case 'weapon':
      // 戈舞：红棕深黑色调 ＋ 暗金
      return {
        baseBg: '#120907',
        gradient: 'linear-gradient(180deg, #0D0705 0%, #1D0E0A 50%, #110806 100%)',
        ambientLayer: 'radial-gradient(circle at 75% 15%, rgba(145, 48, 30, 0.38) 0%, transparent 55%), radial-gradient(circle at 15% 75%, rgba(170, 125, 55, 0.25) 0%, transparent 60%)',
        motifColor: '#D6A84B',
      };

    case 'banquet':
      // 宴乐：红棕深黑色调 ＋ 组玉佩光泽
      return {
        baseBg: '#140A08',
        gradient: 'linear-gradient(180deg, #0E0705 0%, #20100B 50%, #130907 100%)',
        ambientLayer: 'radial-gradient(circle at 80% 20%, rgba(138, 44, 28, 0.38) 0%, transparent 55%), radial-gradient(circle at 20% 70%, rgba(85, 128, 110, 0.25) 0%, transparent 55%)',
        motifColor: '#C8943D',
      };

    case 'sleeve':
      // 翘袖折腰：漆红棕深黑
      return {
        baseBg: '#150A07',
        gradient: 'linear-gradient(180deg, #0F0705 0%, #220F0B 45%, #120806 100%)',
        ambientLayer: 'radial-gradient(circle at 75% 25%, rgba(150, 45, 30, 0.42) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(78, 122, 104, 0.25) 0%, transparent 55%)',
        motifColor: '#BD3A2B',
      };

    case 'baixi':
      // 百戏：红棕深黑 ＋ 暖赭
      return {
        baseBg: '#140B08',
        gradient: 'linear-gradient(180deg, #0E0705 0%, #21110C 50%, #130907 100%)',
        ambientLayer: 'radial-gradient(circle at 70% 20%, rgba(142, 52, 32, 0.38) 0%, transparent 55%), radial-gradient(circle at 25% 75%, rgba(185, 135, 55, 0.25) 0%, transparent 60%)',
        motifColor: '#C89842',
      };

    case 'funerary':
      // 送葬云纹：红棕深黑 ＋ 朱砂
      return {
        baseBg: '#120907',
        gradient: 'linear-gradient(180deg, #0D0705 0%, #1D0E0A 50%, #110806 100%)',
        ambientLayer: 'radial-gradient(circle at 75% 20%, rgba(155, 40, 32, 0.42) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(35, 24, 32, 0.4) 0%, transparent 60%)',
        motifColor: '#BD3A2F',
      };

    case 'huangchang':
      // 黄肠题凑：木棕红黑
      return {
        baseBg: '#130A07',
        gradient: 'linear-gradient(180deg, #0E0705 0%, #20100B 50%, #100806 100%)',
        ambientLayer: 'radial-gradient(circle at 60% 25%, rgba(135, 60, 35, 0.38) 0%, transparent 60%), radial-gradient(circle at 30% 80%, rgba(110, 75, 40, 0.25) 0%, transparent 60%)',
        motifColor: '#A88045',
      };

    case 'celestial':
    case 'ascension':
      // 星路：玄黑红棕 ＋ 星金
      return {
        baseBg: '#100807',
        gradient: 'linear-gradient(180deg, #0A0504 0%, #170C09 50%, #0E0705 100%)',
        ambientLayer: 'radial-gradient(circle at 80% 20%, rgba(195, 150, 75, 0.32) 0%, transparent 55%), radial-gradient(circle at 20% 75%, rgba(125, 45, 30, 0.28) 0%, transparent 55%)',
        motifColor: '#E0BE6C',
      };

    case 'modern':
      // 现代章节：红棕深黑暮光
      return {
        baseBg: '#190D09',
        gradient: 'linear-gradient(180deg, #100806 0%, #28130D 50%, #160B08 100%)',
        ambientLayer: 'radial-gradient(circle at 50% 15%, rgba(190, 80, 40, 0.38) 0%, transparent 70%), radial-gradient(circle at 80% 75%, rgba(210, 140, 55, 0.25) 0%, transparent 60%)',
        motifColor: '#FFD275',
      };

    default:
      return {
        baseBg: '#120907',
        gradient: 'linear-gradient(180deg, #0C0605 0%, #1A0D09 50%, #100806 100%)',
        ambientLayer: 'radial-gradient(circle at 75% 20%, rgba(142, 48, 30, 0.35) 0%, transparent 60%)',
        motifColor: '#C8943D',
      };
  }
}
