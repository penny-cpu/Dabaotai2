/**
 * 大葆台数字博物馆 - 资产配置文件 (Asset Registry)
 * 依照 PDF 要求分类管理 11 大类数字资产。
 * 此处代码已全面置换/预留相关资源路径 (Image / Audio / Video / Line Art)。
 */

export interface AssetCategory {
  id: string;
  name: string;
  pathPrefix: string;
  items: Record<string, {
    id: string;
    name: string;
    path: string;
    type: 'image' | 'audio' | 'video' | 'svg' | 'json';
    note: string;
  }>;
}

export const ASSET_REGISTRY: Record<string, AssetCategory> = {
  '01_ui': {
    id: '01_ui',
    name: '01_UI设计系统',
    pathPrefix: '/assets/01_ui/',
    items: {
      colorPalette: {
        id: 'colorPalette',
        name: '三界色彩系统',
        path: '/assets/01_ui/colors.json',
        type: 'json',
        note: '人间沙黄/赭石/深棕 -> 死亡边界暗赭/黑褐/柏木黄 -> 仙界米白/淡金/玉青/天青',
      },
      hanFont: {
        id: 'hanFont',
        name: '汉隶刻痕字体',
        path: '/assets/01_ui/han_script.woff2',
        type: 'json',
        note: '古朴刻字风汉隶书法与金石凿痕',
      },
    },
  },
  '02_surface': {
    id: '02_surface',
    name: '02_地表',
    pathPrefix: '/assets/02_surface/',
    items: {
      sandLand: {
        id: 'sandLand',
        name: '沙地背景',
        path: '/assets/02_surface/sand_ground.png',
        type: 'image',
        note: '北方乡野沙土地表全景',
      },
      trees: {
        id: 'trees',
        name: '古树依依',
        path: '/assets/02_surface/ancient_trees.png',
        type: 'image',
        note: '汉代郊野古树剪影',
      },
    },
  },
  '03_soil': {
    id: '03_soil',
    name: '03_土层',
    pathPrefix: '/assets/03_soil/',
    items: {
      strataSection: {
        id: 'strataSection',
        name: '墓葬剖面土层图',
        path: '/assets/03_soil/strata_section.png',
        type: 'image',
        note: '表层土、黄褐色夯土、墓葬填土层',
      },
    },
  },
  '04_relics': {
    id: '04_relics',
    name: '04_文物',
    pathPrefix: '/assets/04_relics/',
    items: {
      relic01: { id: 'relic01', name: '朱漆弩', path: '/assets/04_relics/relic_01_crossbow.png', type: 'image', note: '漆红弩臂与青铜机郭' },
      relic02: { id: 'relic02', name: '鎏金青铜钫', path: '/assets/04_relics/relic_02_bronze_fang.png', type: 'image', note: '沙土闪烁金光与青绿铜锈' },
      relic03: { id: 'relic03', name: '错金银玉佩', path: '/assets/04_relics/relic_03_jade_pendant.png', type: 'image', note: '温润羊脂白玉角与金丝勾勒' },
      relic04: { id: 'relic04', name: '汉代凤鸟纹漆碗', path: '/assets/04_relics/relic_04_lacquer_bowl.png', type: 'image', note: '黑红相间漆光与风鸟卷云纹' },
      relic05: { id: 'relic05', name: '黄肠题凑木构件', path: '/assets/04_relics/relic_05_timber_block.png', type: 'image', note: '柏木黄心断面与榫卯结构' },
    },
  },
  '05_huangchang': {
    id: '05_huangchang',
    name: '05_黄肠题凑',
    pathPrefix: '/assets/05_huangchang/',
    items: {
      timberFullStructure: { id: 'timberFullStructure', name: '黄肠题凑正视结构图', path: '/assets/05_huangchang/structure_full.png', type: 'image', note: '15880根柏木枋四向聚拢' },
      timberSection: { id: 'timberSection', name: '黄肠题凑剖面图', path: '/assets/05_huangchang/structure_section.png', type: 'image', note: '便房与梓宫内部剖面' },
      woodTexture: { id: 'woodTexture', name: '柏木年轮粗糙纹理', path: '/assets/05_huangchang/wood_texture.png', type: 'image', note: '干噪裂纹与木纤维尘土' },
    },
  },
  '06_funerary': {
    id: '06_funerary',
    name: '06_送葬舞',
    pathPrefix: '/assets/06_funerary/',
    items: {
      jiangu: { id: 'jiangu', name: '建鼓', path: '/assets/06_funerary/jiangu_drum.svg', type: 'svg', note: '汉代仪式建鼓' },
      procession: { id: 'procession', name: '送葬队伍剪影', path: '/assets/06_funerary/procession_silhouette.png', type: 'image', note: '画像石双向仪仗、车马与扬袖舞者' },
    },
  },
  '07_celestial': {
    id: '07_celestial',
    name: '07_神仙世界',
    pathPrefix: '/assets/07_celestial/',
    items: {
      starDisk: { id: 'starDisk', name: '汉代星盘纹路', path: '/assets/07_celestial/star_disk.png', type: 'image', note: '天圆地方与北斗七星轨迹' },
      fourBeasts: { id: 'fourBeasts', name: '青龙白虎朱雀玄武', path: '/assets/07_celestial/four_divine_beasts.png', type: 'image', note: '汉代画像石粗线与飞白神兽' },
      goldThread: { id: 'goldThread', name: '升仙金线流光', path: '/assets/07_celestial/gold_threads.png', type: 'image', note: '呼吸明暗变化的流金细线' },
    },
  },
  '08_ascension': {
    id: '08_ascension',
    name: '08_升仙舞',
    pathPrefix: '/assets/08_ascension/',
    items: {
      ascension4States: { id: 'ascension4States', name: '人-羽人-仙化-金线四状态', path: '/assets/08_ascension/ascension_states.png', type: 'image', note: '舞者身体羽化为神仙金线' },
      ascensionVideo: { id: 'ascensionVideo', name: '升仙舞 16:9 视频', path: '/assets/08_ascension/ascension_dance_169.mp4', type: 'video', note: '16:9 横屏汉代升仙舞蹈' },
    },
  },
  '09_pangu': {
    id: '09_pangu',
    name: '09_盘鼓舞',
    pathPrefix: '/assets/09_pangu/',
    items: {
      panguLayout: { id: 'panguLayout', name: '七盘一鼓北斗阵列', path: '/assets/09_pangu/pangu_drums.png', type: 'image', note: '七盘一鼓地面布局' },
      modernGallery: { id: 'modernGallery', name: '现代白色展厅空间', path: '/assets/09_pangu/modern_gallery.png', type: 'image', note: '穿越至两千年后的当代展厅' },
      panguVideo: { id: 'panguVideo', name: '盘鼓舞《相和歌》《铜雀伎》视频', path: '/assets/09_pangu/pangu_dance_169.mp4', type: 'video', note: '孙颖先生复原盘鼓舞视频' },
    },
  },
  '10_video': {
    id: '10_video',
    name: '10_视频集',
    pathPrefix: '/assets/10_video/',
    items: {
      wudance: { id: 'wudance', name: '汉代武舞视频', path: '/assets/10_video/wu_dance.mp4', type: 'video', note: '干戈武舞演练 16:9' },
      banquet: { id: 'banquet', name: '广阳王宴乐视频', path: '/assets/10_video/banquet_dance.mp4', type: 'video', note: '礼乐治国宴乐 16:9' },
      baixi: { id: 'baixi', name: '民间百戏视频', path: '/assets/10_video/folk_baixi.mp4', type: 'video', note: '角抵与百戏 16:9' },
    },
  },
  '11_audio': {
    id: '11_audio',
    name: '11_声音集',
    pathPrefix: '/assets/11_audio/',
    items: {
      windSand: { id: 'windSand', name: '风沙呼啸', path: '/assets/11_audio/wind_sand.mp3', type: 'audio', note: '地表风沙环境声' },
      stoneDrum: { id: 'stoneDrum', name: '金石重音', path: '/assets/11_audio/stone_drum.mp3', type: 'audio', note: '汉代编钟与盘鼓击打声' },
      timberDrop: { id: 'timberDrop', name: '柏木沉降震动', path: '/assets/11_audio/timber_drop.mp3', type: 'audio', note: '题凑搭建重量落木声' },
    },
  },
};
