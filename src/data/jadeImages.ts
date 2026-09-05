/**
 * =========================================================================
 * 【图片配置区 - 宴乐组玉佩抽屉道具 PNG 图片 (共 4 张)】
 * 
 * 如需替换为自定义 PNG 图片，可直接将下方对应玉佩的链接替换为您自己的图片路径：
 * 例如：jade_01_dragon_beast: '/images/jades/dragon_beast.png',
 * =========================================================================
 */

// 1. 龙凤纹神兽白玉佩 PNG 图片 (大葆台王后墓核心组玉佩 · 镂空透雕真容)
export const PNG_DRAGON_BEAST = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="whiteJade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#F5EFE6"/>
      <stop offset="70%" stop-color="#EBE3D3"/>
      <stop offset="100%" stop-color="#DCD0BD"/>
    </linearGradient>
    <filter id="jadeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#FFF3C4" flood-opacity="0.9"/>
    </filter>
  </defs>
  <!-- Main Jade Ring Body -->
  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#whiteJade)" stroke-width="14" filter="url(#jadeGlow)"/>
  
  <!-- Central Pierced Hole -->
  <circle cx="60" cy="60" r="24" fill="none" stroke="url(#whiteJade)" stroke-width="4"/>

  <!-- Openwork Coiled Dragon & Phoenix (透雕龙凤游丝卷纹) -->
  <path d="M60 16 Q85 16 95 38 Q102 58 92 78 Q82 98 60 102" fill="none" stroke="url(#whiteJade)" stroke-width="6.5" stroke-linecap="round"/>
  <path d="M60 16 Q35 18 25 38 Q16 60 28 82 Q38 100 60 102" fill="none" stroke="url(#whiteJade)" stroke-width="6.5" stroke-linecap="round"/>

  <!-- Dragon Head & Horn (透雕龙首与鹿角状龙角) -->
  <path d="M54 20 Q60 12 68 18 Q74 24 64 28 Z" fill="url(#whiteJade)"/>
  <circle cx="62" cy="20" r="2.5" fill="#3D2B1F"/>
  <path d="M68 16 Q78 10 82 14" fill="none" stroke="url(#whiteJade)" stroke-width="2.5"/>

  <!-- Phoenix Tail Feathers (凤尾翎羽展翼卷纹) -->
  <path d="M88 44 Q98 48 102 62 Q100 74 88 80" fill="none" stroke="url(#whiteJade)" stroke-width="4" stroke-linecap="round"/>
  <path d="M92 56 Q106 64 100 82" fill="none" stroke="url(#whiteJade)" stroke-width="3" stroke-linecap="round"/>

  <!-- Winged Auspicious Beast in Center (内膛透雕飞翼神兽) -->
  <path d="M50 56 Q56 46 66 52 Q72 60 62 68 Q52 74 48 64 Z" fill="url(#whiteJade)"/>
  <path d="M60 52 Q68 44 74 48 Q70 56 64 56" fill="none" stroke="url(#whiteJade)" stroke-width="3"/>
  <circle cx="56" cy="52" r="1.8" fill="#3D2B1F"/>

  <!-- Fine Incised Cloud Scroll Details (汉代游丝毛雕卷云纹) -->
  <path d="M34 40 Q40 32 44 42" fill="none" stroke="#A89078" stroke-width="1.2"/>
  <path d="M28 66 Q36 60 38 72" fill="none" stroke="#A89078" stroke-width="1.2"/>
  <path d="M78 88 Q86 82 82 94" fill="none" stroke="#A89078" stroke-width="1.2"/>
  <path d="M42 94 Q48 100 56 96" fill="none" stroke="#A89078" stroke-width="1.2"/>
</svg>
`)}`;

// 2. 素面青玉璜 PNG 图片 (弧形半璧状青玉璜)
export const PNG_PLAIN_HUANG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="celadonJade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#557B69"/>
      <stop offset="40%" stop-color="#79A390"/>
      <stop offset="70%" stop-color="#9BC3B1"/>
      <stop offset="100%" stop-color="#416153"/>
    </linearGradient>
  </defs>
  <!-- Arc Huang Body (弧形半璧) -->
  <path d="M15 75 A48 48 0 0 1 105 75 L92 75 A35 35 0 0 0 28 75 Z" fill="url(#celadonJade)" stroke="#314B3F" stroke-width="2"/>
  
  <!-- Left Suspension Hole (左系带穿孔) -->
  <circle cx="22" cy="74" r="2.8" fill="#1C0F0A" stroke="#79A390" stroke-width="1.2"/>
  <!-- Right Suspension Hole (右系带穿孔) -->
  <circle cx="98" cy="74" r="2.8" fill="#1C0F0A" stroke="#79A390" stroke-width="1.2"/>
  <!-- Center Top Hole (顶端正中穿孔) -->
  <circle cx="60" cy="30" r="2.8" fill="#1C0F0A" stroke="#79A390" stroke-width="1.2"/>
  
  <!-- Polished smooth jade luster line -->
  <path d="M22 68 A42 42 0 0 1 98 68" fill="none" stroke="#BCE2D3" stroke-width="1.5" opacity="0.75"/>
</svg>
`)}`;

// 3. 朱雀纹青玉璧 PNG 图片 (祭天礼玉 · 朱雀纹圆璧)
export const PNG_ZHUQUE_BI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="biJade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6F887C"/>
      <stop offset="50%" stop-color="#9CB3A7"/>
      <stop offset="100%" stop-color="#4E645A"/>
    </linearGradient>
  </defs>
  <!-- Outer Rim -->
  <circle cx="60" cy="60" r="48" fill="url(#biJade)" stroke="#394D44" stroke-width="2.5"/>
  <!-- Center Perforation Hole (璧孔) -->
  <circle cx="60" cy="60" r="16" fill="#1C0F0A" stroke="#394D44" stroke-width="2"/>

  <!-- Grain Pattern Band (蒲纹/谷纹内圈) -->
  <circle cx="60" cy="60" r="24" fill="none" stroke="#C2D5CC" stroke-width="1" stroke-dasharray="2 4"/>
  <circle cx="60" cy="60" r="38" fill="none" stroke="#C2D5CC" stroke-width="1" stroke-dasharray="2 4"/>

  <!-- Engraved Soaring Vermilion Bird (线刻朱雀回首展翼) -->
  <path d="M48 44 Q56 36 64 42 Q60 52 48 50" fill="none" stroke="#FFF" stroke-width="1.8"/>
  <path d="M64 42 Q78 34 84 46 Q76 50 66 48" fill="none" stroke="#FFF" stroke-width="1.8"/>
  <path d="M50 50 Q42 66 52 74 Q64 78 72 70 Q76 60 66 56" fill="none" stroke="#FFF" stroke-width="1.8"/>
  <circle cx="54" cy="40" r="1.5" fill="#FFF"/>
</svg>
`)}`;

// 4. 错金兽面玉勒 PNG 图片 (圆柱管状玉勒)
export const PNG_CUO_JIN_PEI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="yellowJade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#80622C"/>
      <stop offset="35%" stop-color="#CBB170"/>
      <stop offset="70%" stop-color="#EEDAA2"/>
      <stop offset="100%" stop-color="#6E4F1B"/>
    </linearGradient>
  </defs>
  <!-- Cylindrical Bead Body (管柱体) -->
  <rect x="42" y="20" width="36" height="80" rx="6" fill="url(#yellowJade)" stroke="#523910" stroke-width="2"/>
  
  <!-- Through Hole Apertures (通心穿孔) -->
  <ellipse cx="60" cy="22" rx="10" ry="3.5" fill="#1C0F0A" stroke="#EEDAA2" stroke-width="1"/>
  <ellipse cx="60" cy="98" rx="10" ry="3.5" fill="#1C0F0A" stroke="#523910" stroke-width="1"/>

  <!-- Gold Inlaid Taotie Mask Details (错金兽面卷云纹) -->
  <path d="M46 44 Q60 38 74 44" fill="none" stroke="#FFF3C4" stroke-width="2.5"/>
  <circle cx="52" cy="52" r="3" fill="#FFF3C4"/>
  <circle cx="68" cy="52" r="3" fill="#FFF3C4"/>
  <path d="M54 62 Q60 58 66 62 Q60 68 54 62" fill="none" stroke="#FFF3C4" stroke-width="2"/>
  <path d="M46 76 Q60 84 74 76" fill="none" stroke="#FFF3C4" stroke-width="2.5"/>
</svg>
`)}`;

/**
 * =========================================================================
 * 导出 4 个玉佩 PNG 图片映射字典
 * =========================================================================
 */
export const JADE_IMAGES: Record<string, string> = {
  jade_01_dragon_beast: PNG_DRAGON_BEAST,
  jade_02_plain_huang: PNG_PLAIN_HUANG,
  jade_03_zhuque_bi: PNG_ZHUQUE_BI,
  jade_04_cuo_jin_pei: PNG_CUO_JIN_PEI,
};
