export type SectionKey =
  | 'home'         // 01. 地表 · 风吹沙开
  | 'strata'       // 02. 表层土 · 墓葬土层
  | 'dance'        // 03. 汉代武舞 · 礼乐兵器
  | 'relics'       // 04. 古物发掘 · 五件遗珍
  | 'scroll'       // 05. 照见汉代 · 宴乐百戏
  | 'huangchang'   // 06. 黄肠题凑 · 死亡的边界 (核心转场节点)
  | 'funerary'     // 07. 送葬舞 · 送亡者入墓
  | 'immortal'     // 08. 升仙舞 · 神仙幻想世界
  | 'pangu'        // 09. 盘鼓舞 · 两千年后当代复现
  | 'epilogue';    // 10. 沉浸结语 · 历史重沉地下/首尾循环

export interface Relic {
  id: string;
  name: string;
  subtitle: string;
  era: string;
  category: string;
  xPercent: number; // Zigzag x position percentage (0-100)
  yPercent: number; // Zigzag y position percentage (0-100)
  exposedPartName: string; // What exposed part looks like
  description: string;
  historicalValue: string;
  audioPath: string; // Reserved code asset path e.g. "assets/audio/relic_01.mp3"
  audioDuration: string;
  imageUrl: string;
  isUncovered: boolean;
}

export interface TombLayer {
  depthRange: string;
  depthMeters: number;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  soilTexture: string;
  artifactsFound: string[];
}

export interface VideoInfo {
  id: string;
  title: string;
  badgeText: string;
  subtitle: string;
  videoUrl?: string;
  posterUrl: string;
  duration: string;
  description: string;
}
