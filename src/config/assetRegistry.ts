/**
 * =========================================================================================
 * 大葆台汉墓小程序 · 核心数字资产注册中心 (ASSET REGISTRY)
 * =========================================================================================
 * 
 * 【说明】：
 * 本文件统一管理小程序内所有章节背景底图、竹简资产、文物切图、视频、音频与3D模型路径。
 * 每一个资产均配有清晰的代码注释与替换说明。若您需要替换为自己的高清图片或音视频，
 * 只需在本文件中修改对应变量的路径，即可全局生效！
 * 
 * 详细操作指南请参阅项目根目录下的【ASSETS_README.md】。
 */

// ==========================================
// 1. 章节背景底图 (Chapter Backgrounds)
// ==========================================

// 【序章/开篇】汉白玉舞人苏醒背景图
import bgPrologue from '../assets/images/tomb_jade_dancer_dark_1788598149842.jpg';

// 【第一章 · 戈舞出征】汉代画像砖武舞背景底图
import bgStage1Warrior from '../assets/images/han_warrior_brick_1788598169002.jpg';

// 【第二章 · 宴乐与组玉佩】汉代宴乐画像砖局部 (参考图2: 一 宴乐百戏图)
import bgStage2Banquet from '../assets/images/han_banquet_mural_1788600231146.jpg';

// 【第二章 · 玉佩缺失页】汉代王后腰部及下半身特写 (虚线勾勒玉舞人空位，参考图3)
import bgStage2QueenSkirt from '../assets/images/han_queen_skirt_1788600270485.jpg';

// 【第三章 · 翘袖折腰】汉代乐舞殿堂底图
import bgStage3Dance from '../assets/images/han_wu_dance_1786614702286.jpg';

// 【第三章 · 记忆恢复页】左下角玉舞人舞姿虚影 (占1/3画面，60%遮罩)
import silStage3JadeDancer from '../assets/images/dance_sil_qiaoxiu.png';

// 【第四章 · 百戏跳丸】汉代百戏与杂耍背景底图 (参考图1/图2: 汉代悱忧向空中抛接跳丸壁画风格)
import bgStage4Baixi from '../assets/images/han_paiyou_tiaowan_bg_1788620031860.jpg';

// 【第四章 · 蹴丸资产】七颗真实质感汉代皮缝蹴丸 PNG
import imgStage4CujuBall from '../assets/images/han_cuju_ball_1788600288945.jpg';

// 【第五章 · 送葬长袖与长乐】对白页背景底图 (送葬长袖相送盛大队列画像砖壁画)
import bgStage5IntroNarrative from '../assets/images/han_funerary_intro_bg_1788620053598.jpg';

// 【第五章 · 寻找送葬礼乐文物】散落6大文物的画像石生活情态壁画底图 (观众手电筒探照)
import bgStage5MuralArtifacts from '../assets/images/han_funerary_mural_artifacts_1788620075399.jpg';

// 【第五章 · 彩绘陶壶】极暗墓室随葬品陈列空间
import bgStage5Funerary from '../assets/images/dabaotai_under_layer_1786614680248.jpg';

// 【第六章 · 黄肠题凑引导页】黄肠题凑木椁墓室复原空间 (站在墓道入口视角，前方层层木椁)
import bgStage6Huangchang from '../assets/images/huangchang_wood_hall_1788600307638.jpg';

// 【第六章 · 柏木数量任务页】黄肠题凑木料结构背景底图 (从上至下实图减淡融入背景)
import bgStage6TimberStructure from '../assets/images/huangchang_wood_hall_1788600307638.jpg';

// 【第七章 · 璀璨星汉】汉代墓顶星宿图
import bgStage7Cosmos from '../assets/images/dabaotai_under_layer_1786614680248.jpg';

// 【终章前 · 现代展厅】大葆台博物馆现代展厅实景大图 (占屏65%，玉舞人玻璃展柜为主体)
import bgModernExhibitionHall from '../assets/images/dabaotai_modern_hall_1788600329249.jpg';

// 【现代展厅 · 白玉舞人特展展示图片】(融入展厅不突兀真实特展展柜摄影)
import imgJadeDancerModernDisplay from '../assets/images/jade_dancer_modern_museum_1788620096191.jpg';

// 【通用 · 记忆恢复竹简】汉代深色雕刻竹简 (参考图1)
import imgHanBambooSlipTexture from '../assets/images/han_bamboo_slip_1788600249113.jpg';

// 🚨【参考图1各章节深色木纹雕刻竹简大图 - 对应各章节记忆归位页】🚨
import bgSlipStage1 from '../assets/images/bamboo_slip_stage1_1788609253798.jpg';
import bgSlipStage2 from '../assets/images/bamboo_slip_stage2_1788609265234.jpg';
import bgSlipStage3 from '../assets/images/bamboo_slip_stage3_1788609275150.jpg';
import bgSlipStage4 from '../assets/images/bamboo_slip_stage4_1788609286234.jpg';
import bgSlipStage5 from '../assets/images/bamboo_slip_stage5_1788609300199.jpg';
import bgSlipStage6 from '../assets/images/bamboo_slip_stage6_1788609311850.jpg';
import bgSlipStage7 from '../assets/images/bamboo_slip_stage7_1788609323369.jpg';

// 舞姿卡图片引用
import imgDancePangu from '../assets/images/dance_sil_pangu.png';
import imgDanceLuoyi from '../assets/images/dance_sil_luoyi.png';
import imgDanceQiaoxiu from '../assets/images/dance_sil_qiaoxiu.png';

export const CHAPTER_BACKGROUNDS = {
  // 序章
  prologue: bgPrologue,
  
  // 第一章: 戈舞出征
  stage1_weapon: bgStage1Warrior,
  
  // 第二章: 宴乐与组玉佩
  stage2_banquet_guide: bgStage2Banquet,        // 引导页背景 (图2宴乐百戏图)
  stage2_queen_skirt: bgStage2QueenSkirt,       // 玉佩缺失页背景 (王后服饰特写)
  
  // 第三章: 翘袖折腰
  stage3_gallery: bgStage3Dance,
  stage3_dancer_shadow: silStage3JadeDancer,    // 记忆恢复左下角玉舞人剪影
  
  // 第四章: 百戏跳丸 (参考图1/图2 汉代悱忧抛接跳丸壁画风格，全章通用底图)
  stage4_baixi_guide: bgStage4Baixi,
  stage4_paiyou_mural: bgStage4Baixi,           // 汉代悱忧抛接跳丸壁画风格底图
  stage4_cuju_ball: imgStage4CujuBall,          // 7颗真实质感蹴丸图片
  
  // 第五章: 送葬与彩绘陶壶
  stage5_funerary_guide: bgStage5Funerary,
  stage5_intro_narrative: bgStage5IntroNarrative, // 送葬长袖相送盛大队列画像砖壁画
  stage5_mural_artifacts: bgStage5MuralArtifacts, // 散落六文物的画像石生活情态壁画
  stage5_pottery_guide: bgStage5MuralArtifacts,
  
  // 第六章: 黄肠题凑
  stage6_huangchang_guide: bgStage6Huangchang,  // 引导页: 墓道入口望向层层木椁
  stage6_chariot_guide: bgStage6Huangchang,     // 汉代车马画像砖局部
  stage6_timber_task: bgStage6TimberStructure,  // 数量任务页: 柏木结构渐变底图
  
  // 第七章: 星宿连缀
  stage7_cosmos_guide: bgStage7Cosmos,
  
  // 现代展厅
  modern_hall_exhibition: bgModernExhibitionHall, // 占屏65%的现代展厅大图
  modern_hall_jade_dancer: imgJadeDancerModernDisplay, // 现代展柜中陈列的白玉舞人真实图片
  
  // 竹简纹理
  bamboo_slip_texture: imgHanBambooSlipTexture,
};

// =========================================================================
// 🚨【所有章节视频播放页背景底图路径 (80% 遮罩 - 方便一键替换)】🚨
// =========================================================================
export const CHAPTER_VIDEO_BACKGROUNDS = {
  stage1: bgStage1Warrior,       // 第一章戈舞出征视频背景底图
  stage2: bgStage2Banquet,       // 第二章宴乐盛宴视频背景底图
  stage3: bgStage3Dance,         // 第三章翘袖折腰视频背景底图
  stage4: bgStage4Baixi,         // 第四章百戏跳丸视频背景底图
  stage5: bgStage5Funerary,      // 第五章送葬袖舞视频背景底图
  stage6: bgStage6Huangchang,    // 第六章黄肠题凑视频背景底图
  stage7: bgStage7Cosmos,        // 第七章璀璨星汉视频背景底图
};

// =========================================================================
// 🚨【每一章节每一个页面背景底图统一注册中心 (逐一生成位置，方便一键查找与替换)】🚨
// 说明：目前未特别说明背景图的子页面，默认引用各章节开头视频页背景底图；
// 每一个页面的引用路径均已逐一明确写出，您可以针对特定页面独立指定替换！
// =========================================================================
export const CHAPTER_PAGE_BACKGROUNDS = {
  // --- 第一章: 戈舞出征 ---
  stage1: {
    page0_guide: bgStage1Warrior,           // 引导开篇页背景图
    page1_video: bgStage1Warrior,           // 视频播放页背景图 (80% 遮罩)
    page2_puzzle: bgStage1Warrior,          // 兵器解密互动页背景图
    page3_dialogue: bgStage1Warrior,        // 战阵对白页背景图
    page4_accession: bgStage1Warrior,       // 考工入馆展签页背景图
    page5_memory_return: bgSlipStage1,      // 记忆归位页深色竹简背景图 (参考图1)
  },
  // --- 第二章: 宴乐与组玉佩 ---
  stage2: {
    page0_guide: bgStage2Banquet,           // 宴乐百戏图引导页
    page1_video: bgStage2Banquet,           // 宴乐舞蹈视频播放页 (80% 遮罩)
    page2_queen_skirt: bgStage2QueenSkirt,  // 王后组玉佩缺失交互页
    page3_dialogue: bgStage2Banquet,        // 盛宴剧情对白页
    page4_accession: bgStage2Banquet,       // 组玉佩入馆展陈页
    page5_memory_return: bgSlipStage2,      // 记忆归位页深色竹简背景图 (参考图1)
  },
  // --- 第三章: 翘袖折腰 ---
  stage3: {
    page0_guide: bgStage3Dance,             // 汉代乐舞殿堂引导页
    page1_fan_cards: bgStage3Dance,         // 舞姿胶片卡片页 (卡片底端打光)
    page2_video: bgStage3Dance,             // 翘袖折腰视频播放页 (80% 遮罩)
    page3_select_quiz: bgStage3Dance,       // 辨识真容舞姿答题页
    page4_success: bgStage3Dance,           // 器灵苏醒对白页
    page5_memory_return: bgSlipStage3,      // 记忆归位页深色竹简背景图 (参考图1)
  },
  // --- 第四章: 百戏跳丸 (全章通用悱忧向空中抛接跳丸底图，遮罩效果90%) ---
  stage4: {
    page0_guide: bgStage4Baixi,             // 市井百戏长卷引导页 (90% 遮罩)
    page1_video: bgStage4Baixi,             // 百戏杂耍视频播放页 (80% 遮罩)
    page2_cuju_game: bgStage4Baixi,         // 七丸抛接互动游戏页 (90% 遮罩)
    page3_dialogue: bgStage4Baixi,          // 市井欢腾对白页 (90% 遮罩，参考图1)
    page4_accession: bgStage4Baixi,         // 百戏陶俑入馆展陈页 (90% 遮罩)
    page5_memory_return: bgSlipStage4,      // 记忆归位页深色竹简背景图 (参考图1)
  },
  // --- 第五章: 送葬与彩绘陶壶 ---
  stage5: {
    page0_guide: bgStage5IntroNarrative,    // 幽暗墓室引导页
    page1_video: bgStage5Funerary,          // 送葬袖舞视频播放页 (80% 遮罩)
    page2_pottery_torch: bgStage5MuralArtifacts, // 考古手电筒探照画像石壁画解密页 (容纳6个文物画像石生活情态壁画)
    page3_dialogue: bgStage5IntroNarrative, // 送葬长袖与长乐对白页背景底图 (匹配旁白长袖相送，80% 遮罩)
    page4_accession: bgStage5Funerary,      // 彩绘云气陶壶展陈页
    page5_memory_return: bgSlipStage5,      // 记忆归位页深色竹简背景图 (参考图1)
  },
  // --- 第六章: 黄肠题凑 ---
  stage6: {
    page0_guide: bgStage6Huangchang,        // 墓道望向木椁引导页
    page1_video: bgStage6Huangchang,        // 营造题凑视频播放页 (80% 遮罩)
    page2_timber_task: bgStage6TimberStructure, // 柏木枋数量推演任务页
    page3_dialogue: bgStage6Huangchang,     // 以木为宫对白页
    page4_accession: bgStage6Huangchang,    // 题凑木枋入馆展陈页
    page5_memory_return: bgSlipStage6,      // 记忆归位页深色竹简背景图 (参考图1)
  },
  // --- 第七章: 璀璨星汉 ---
  stage7: {
    page0_guide: bgStage7Cosmos,            // 墓顶星宿图引导页
    page1_video: bgStage7Cosmos,            // 魂归霄汉视频播放页 (80% 遮罩)
    page2_star_connect: bgStage7Cosmos,     // 北斗七星连缀互动页
    page3_dialogue: bgStage7Cosmos,         // 汉家威仪对白页
    page4_accession: bgStage7Cosmos,        // 广阳王星象图展陈页
    page5_memory_return: bgSlipStage7,      // 记忆归位页深色竹简背景图 (参考图1)
  },
};

// =========================================================================
// 🚨【第三章答题选项舞姿图片路径 (方便一键替换)】🚨
// =========================================================================
export const STAGE3_QUIZ_OPTION_IMAGES = {
  optionA: imgDancePangu,   // 【A · 盘鼓踏步】舞姿图片路径
  optionB: imgDanceLuoyi,   // 【B · 罗衣飘摇】舞姿图片路径
  optionC: imgDanceQiaoxiu, // 【C · 翘袖折腰】舞姿图片路径 (正确答案)
};

// ==========================================
// 2. 七大章节“记忆竹简”数据定义 (Bamboo Slips Data)
// ==========================================
export interface ChapterBambooSlip {
  stageNumber: number;
  chapterTitle: string;       // 如：黄肠题凑
  subTitle: string;           // 如：柏木垒筑 · 以木为宫
  relicName: string;          // 核心文物名称
  relicImage: string;         // 对应文物切图
  bambooSlipArtifactImage: string; // 对应参考图1雕刻有章节名称与关键道具的深色木纹竹简大图
  accessionCode: string;      // 馆藏编号
  desc: string;               // 简评
}

export const CHAPTER_BAMBOO_SLIPS: Record<number, ChapterBambooSlip> = {
  1: {
    stageNumber: 1,
    chapterTitle: '戈舞出征',
    subTitle: '执干戚而舞 · 军威震八荒',
    relicName: '青铜矛与环首铁刀',
    relicImage: '/src/assets/images/han_bronze_spear_1788506369662.jpg',
    bambooSlipArtifactImage: bgSlipStage1,
    accessionCode: 'DBT-M1-01',
    desc: '大葆台汉墓出土汉代兵器，佐证燕地汉初诸侯王戎马开疆之雄风。',
  },
  2: {
    stageNumber: 2,
    chapterTitle: '宴乐与组玉佩',
    subTitle: '文舞敬天 · 广阳盛宴',
    relicName: '龙凤纹神兽白玉佩',
    relicImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    bambooSlipArtifactImage: bgSlipStage2,
    accessionCode: 'DBT-M1-02',
    desc: '王后墓极品组玉佩，温润白玉镂雕飞龙引凤，汉代礼乐极则。',
  },
  3: {
    stageNumber: 3,
    chapterTitle: '翘袖折腰',
    subTitle: '长袖若素霓 · 折腰随清音',
    relicName: '白玉舞人佩',
    relicImage: '/src/assets/images/dance_sil_qiaoxiu.png',
    bambooSlipArtifactImage: bgSlipStage3,
    accessionCode: 'DBT-M1-03',
    desc: '大葆台镇馆之宝，生动定格西汉女子翘袖折腰翩跹之态。',
  },
  4: {
    stageNumber: 4,
    chapterTitle: '百戏跳丸',
    subTitle: '弄丸飞剑 · 谐谑娱民',
    relicName: '彩绘百戏陶俑',
    relicImage: imgStage4CujuBall,
    bambooSlipArtifactImage: bgSlipStage4,
    accessionCode: 'DBT-M1-04',
    desc: '汉代市井乐舞百戏，七丸抛接、倒立谐趣，展现市井繁盛生机。',
  },
  5: {
    stageNumber: 5,
    chapterTitle: '彩绘云气陶壶',
    subTitle: '朱墨翻卷 · 送葬仙境',
    relicName: '彩绘云气陶壶',
    relicImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&q=80',
    bambooSlipArtifactImage: bgSlipStage5,
    accessionCode: 'DBT-M1-05',
    desc: '黑漆底色上朱墨彩绘翻卷云气与飞禽，承载汉代升仙长乐祈愿。',
  },
  6: {
    stageNumber: 6,
    chapterTitle: '黄肠题凑',
    subTitle: '柏木垒筑 · 以木为宫',
    relicName: '黄肠题凑柏木枋',
    relicImage: bgStage6TimberStructure,
    bambooSlipArtifactImage: bgSlipStage6,
    accessionCode: 'DBT-M1-06',
    desc: '一万五千八百八十根柏木枋层层垒筑，汉代天子赐王侯最高等级葬制。',
  },
  7: {
    stageNumber: 7,
    chapterTitle: '璀璨星汉',
    subTitle: '五星出东方 · 魂归霄汉',
    relicName: '广阳顷王星象图',
    relicImage: bgStage7Cosmos,
    bambooSlipArtifactImage: bgSlipStage7,
    accessionCode: 'DBT-M1-07',
    desc: '两千年前燕地星汉璀璨，汉家威仪与古老文明代代相传。',
  },
};

// ==========================================
// 3. 视频资产 (Video Assets)
// ==========================================
export const STAGE_VIDEO_PATHS = {
  stage1: 'public/assets/videos/prologue_tomb.mp4',
  stage2: 'public/assets/videos/banquet_dance.mp4',
  stage3: 'public/assets/videos/qiaoxiu_dance.mp4',
  stage4: 'public/assets/videos/baixi_video.mp4',
  stage5: 'public/assets/videos/funerary_video.mp4',
  stage6: 'public/assets/videos/huangchang_video.mp4',
  stage7: 'public/assets/videos/star_ascension.mp4',
};

// ==========================================
// 4. 音频资产 (Audio Assets)
// ==========================================
export const STAGE_AUDIO_PATHS = {
  bgm_tomb_mystery: 'public/assets/audio/tomb_ambient.mp3',
  bgm_han_court_feast: 'public/assets/audio/court_music.mp3',
  sfx_bronze_chime: 'public/assets/audio/bronze_chime.wav',
  sfx_stone_drum: 'public/assets/audio/stone_drum.wav',
  sfx_bamboo_slip: 'public/assets/audio/bamboo_slip.wav',
};

// ==========================================
// 5. 3D模型资产 (3D Models / GLTF)
// ==========================================
export const STAGE_3D_MODELS = {
  jadeDancer: 'public/assets/models/jade_dancer.glb',
  caihuiPot: 'public/assets/models/caihui_pot.glb',
  huangchangChamber: 'public/assets/models/huangchang_tomb.glb',
};
