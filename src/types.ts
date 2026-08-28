export type SectionKey =
  | 'prologue_sand'    // 场景 0A：卡牌与拨沙首页
  | 'prologue_glitch'  // 场景 0B：信号故障与七片坠落
  | 'prologue_gate'    // 场景 0C：残门守卫与七关地图展开
  | 'weapon'           // 第一关 · 戈影 (半圆兵器盘与武舞记忆)
  | 'banquet'          // 第二关 · 宴乐 (现场拍照取景与宴乐记忆)
  | 'gallery'          // 第三关 · 浮游 (五列上浮文物与文物舞记忆)
  | 'baixi'            // 第四关 · 百戏 (灯笼照三景与六博残局)
  | 'funerary'         // 第五关 · 袖舞 (送行长袖与礼仪画面抉择)
  | 'huangchang'       // 第六关 · 木阵 (协作舞蹈与 1-5-5-8-0 黄肠重构)
  | 'ascension'        // 第七关 · 星路 (四象星图与四段舞姿连接归途)
  | 'epilogue_gate'    // 终章 E1 · 残门送别
  | 'epilogue_bow'     // 终章 E2 · 玉舞人揖礼归位
  | 'epilogue_card'    // 终章 E3 · 双面纪念明信片与结尾
  | 'epilogue_dance'
  | 'home'
  | 'pendant'
  | 'epilogue';

export type SpeakerRole = 'dancer' | 'pushou' | 'player' | 'narrator';

export interface DialogueLine {
  speaker: SpeakerRole;
  speakerName: string;
  avatar?: string;
  text: string;
}

export type JadeFragmentId =
  | 'frag_right_sleeve'   // 1. 戈影——右袖 (第一关)
  | 'frag_chest_pendant'  // 2. 宴乐——胸前佩饰 (第二关)
  | 'frag_left_sleeve'    // 3. 浮游——左袖 (第三关)
  | 'frag_robe_skirt'     // 4. 百戏——衣摆 (第四关)
  | 'frag_waist'          // 5. 袖舞——腰身 (第五关)
  | 'frag_body_core'      // 6. 木阵——身体主体 (第六关)
  | 'frag_head_halo';     // 7. 星路——头部与星宿光环 (第七关)

export interface JadeFragmentInfo {
  id: JadeFragmentId;
  name: string;
  chapterIndex: number;
  chapterTitle: string;
  storySummary: string;
  isUnlocked: boolean;
}

export interface Relic {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  era: string;
  description: string;
  imageUrl: string;
  depth?: string;
  story?: string;
  culturalSignificance?: string;
  unlockedByDefault?: boolean;
  xPercent?: number;
  yPercent?: number;
  exposedPartName?: string;
  historicalValue?: string;
  relationToJadeDancer?: string;
  audioPath?: string;
  audioDuration?: string;
  layerIndex?: number;
  isUncovered?: boolean;
}

export interface TombLayer {
  depth?: string;
  depthMeters?: number;
  layerName?: string;
  name?: string;
  subtitle?: string;
  depthRange?: string;
  soilTexture?: string;
  color?: string;
  description: string;
  relics?: string[];
  artifactsFound?: string[];
}

export interface UserInteractionTrackPoint {
  x: number;
  y: number;
  chapter: SectionKey;
  timestamp: number;
  action: 'tap' | 'scratch' | 'solve' | 'photo' | 'drag';
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

