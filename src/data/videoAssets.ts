/* =========================================================================
   🚨【各关卡开头弹窗舞蹈视频文件配置与替换位置】🚨
   =========================================================================
   尊敬的开发者：
   系统已为您打通全流程真实 HTML5 <video> 视频播放流水线。
   
   【本地视频上传存放路径】：
   请将您的 7 个关卡开头舞蹈真实视频 (.mp4 格式) 放置在以下目录：
   👉 📁 存放路径：public/assets/videos/
   
   【7 个关卡视频的标准文件名如下，放进目录后即可立即跑通生效】：
   1. 第一关 · 戈舞出征 (干戚武舞):     public/assets/videos/wu_dance.mp4
   2. 第二关 · 宴乐舞动 (广阳宴乐雅乐): public/assets/videos/banquet_dance.mp4
   3. 第三关 · 袖舞品鉴 (汉代长袖舞):   public/assets/videos/sleeve_dance.mp4
   4. 第四关 · 百戏角抵 (俳优乐舞百戏): public/assets/videos/baixi_dance.mp4
   5. 第五关 · 送葬礼仪 (送行扬袖舞):   public/assets/videos/funerary_dance.mp4
   6. 第六关 · 黄肠题凑 (地宫梓木考工): public/assets/videos/huangchang_video.mp4
   7. 第七关 · 升仙星路 (羽化升仙之舞): public/assets/videos/ascension_dance.mp4
   
   【代码替换说明】：
   如果您使用的是外部 CDN 或云存储视频，直接修改下方 STAGE_VIDEOS 字典中的 url 字段即可！
   ========================================================================= */

export interface StageVideoConfig {
  id: string;
  stageName: string;
  title: string;
  subtitle: string;
  // 🚨 视频文件路径（支持本地 public 绝对路径或 http/https 远程直链）
  url: string;
  durationSec: number;
  description: string;
}

export const STAGE_VIDEOS: Record<string, StageVideoConfig> = {
  // 1. 第一关 · 戈舞出征 (武舞)
  stage1_weapon: {
    id: 'stage1_weapon',
    stageName: '第一关 · 戈影',
    title: '广阳王出征祈福 · 干戚武舞',
    subtitle: '鼓角齐鸣 · 威仪赫赫',
    url: '/assets/videos/wu_dance.mp4',
    durationSec: 15,
    description: '大军出征在即，王侯秉干戚列阵而舞，鼓角齐鸣，威仪赫赫。',
  },

  // 2. 第二关 · 宴乐舞动 (广阳宴乐)
  stage2_banquet: {
    id: 'stage2_banquet',
    stageName: '第二关 · 宴乐',
    title: '大汉广阳王府 · 宫廷宴乐舞',
    subtitle: '编钟喤喤 · 笙磬同音',
    url: '/assets/videos/banquet_dance.mp4',
    durationSec: 18,
    description: '青铜编钟与漆木建鼓交响，宫廷舞姬执羽而舞，宴享四方宾朋。',
  },

  // 3. 第三关 · 袖舞品鉴 (长袖舞)
  stage3_gallery: {
    id: 'stage3_gallery',
    stageName: '第三关 · 袖舞品鉴',
    title: '大葆台玉舞人 · 翘袖折腰长袖舞',
    subtitle: '罗衣从风 · 长袖善舞',
    url: '/assets/videos/sleeve_dance.mp4',
    durationSec: 20,
    description: '舞者纤腰反折如弯月，长袖凌霄回旋如回风舞雪，刚柔相济。',
  },

  // 4. 第四关 · 百戏角抵 (俳优百戏)
  stage4_baixi: {
    id: 'stage4_baixi',
    stageName: '第四关 · 百戏',
    title: '汉代民间绝艺 · 俳优乐舞百戏',
    subtitle: '幻戏角抵 · 击鼓欢歌',
    url: '/assets/videos/baixi_dance.mp4',
    durationSec: 16,
    description: '俳优滑稽击鼓，吐火弄丸，角抵拔河，盛世民风喧阗热烈。',
  },

  // 5. 第五关 · 送葬礼仪 (送葬长袖舞)
  stage5_funerary: {
    id: 'stage5_funerary',
    stageName: '第五关 · 礼仪',
    title: '事死如生 · 汉代送葬礼乐仪仗',
    subtitle: '车马长队 · 扬袖安魂',
    url: '/assets/videos/funerary_dance.mp4',
    durationSec: 22,
    description: '长袖舞者领衔仪仗车队，照亮通向幽冥神仙境域的安宁归途。',
  },

  // 6. 第六关 · 黄肠题凑 (地宫考工)
  stage6_huangchang: {
    id: 'stage6_huangchang',
    stageName: '第六关 · 木阵',
    title: '天子之制 · 大葆台黄肠题凑考工纪录',
    subtitle: '柏木题凑 · 榫卯千秋',
    url: '/assets/videos/huangchang_video.mp4',
    durationSec: 25,
    description: '一万五千八百八十块百年黄心柏木层层垒叠，见证汉代考工绝艺。',
  },

  // 7. 第七关 · 升仙星路 (神仙幻想)
  stage7_ascension: {
    id: 'stage7_ascension',
    stageName: '第七关 · 星路',
    title: '神仙幻想 · 汉代升仙乐舞',
    subtitle: '云车风马 · 乘龙登遐',
    url: '/assets/videos/ascension_dance.mp4',
    durationSec: 24,
    description: '舞者身姿与星宿天象交相呼应，引渡大汉乐舞灵魂升入璀璨星汉。',
  },
};
