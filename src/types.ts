export type SectionKey =
  | 'home'         // 01. 首页 · 风吹沙 (现代外景与地下沙土考古唤醒)
  | 'weapon'       // 02. 第一章 · 戈影 (北土汉邦 / 武库兵器半圆盘选兵)
  | 'pendant'      // 03. 第二章 · 宴乐 (长乐未央 / 组玉佩与翘袖折腰)
  | 'gallery'      // 04. 第三章 · 浮游 (长乐未央 / 五列上升文物博览与漫游)
  | 'baixi'        // 05. 第四章 · 百戏 (长乐未央 / 蜡烛照壁画与跳丸算术)
  | 'funerary'     // 06. 第五章 · 袖舞 (题凑礼藏 / 送葬长袖与星云铜镜)
  | 'huangchang'   // 07. 第六章 · 题凑 (题凑礼藏 / 15880黄肠题凑考工)
  | 'ascension'    // 08. 第七章 · 星路 (题凑礼藏 / 极光星空与七盘一鼓升仙)
  | 'epilogue'     // 09. 终章 · 揖礼 (玉舞人合体揖礼致谢)
  | 'conclusion'   // 10. 结语长文 (优雅逐行阅读)
  | 'postcard'     // 11. 双面翻转明信片
  | 'sunset';      // 12. 飞鸟与橘光夕阳博物馆回溯

export type HallKey = 'beituhanbang' | 'changleweiyang' | 'ticoulicang';

export interface ExhibitionHall {
  id: HallKey;
  name: string;
  pinyin: string;
  desc: string;
  chapters: { key: SectionKey; title: string; subtitle: string; fragmentName: string }[];
  color: string;
  bgColor: string;
  borderColor: string;
}

export type JadeFragmentId =
  | 'frag_right_sleeve'   // 1. 戈影——右袖
  | 'frag_chest_pendant'  // 2. 宴乐——胸前佩饰
  | 'frag_left_sleeve'    // 3. 浮游——左袖
  | 'frag_robe_skirt'     // 4. 百戏——衣摆
  | 'frag_waist'          // 5. 袖舞——腰身
  | 'frag_body_core'      // 6. 题凑——身体主体
  | 'frag_head_halo';     // 7. 星路——头部与最终光环

export interface JadeFragmentInfo {
  id: JadeFragmentId;
  name: string;
  partName: string;
  chapterIndex: number;
  chapterTitle: string;
  description: string;
  isUnlocked: boolean;
}

export interface UserInteractionTrackPoint {
  x: number;
  y: number;
  chapter: SectionKey;
  timestamp: number;
  action: 'tap' | 'scratch' | 'solve';
}

export interface Relic {
  id: string;
  name: string;
  subtitle: string;
  era: string;
  category: string;
  xPercent?: number;
  yPercent?: number;
  exposedPartName?: string;
  description: string;
  historicalValue: string;
  audioPath?: string;
  audioDuration?: string;
  imageUrl: string;
  isUncovered?: boolean;
  relationToJadeDancer?: string;
  layerIndex?: 1 | 2 | 3;
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
