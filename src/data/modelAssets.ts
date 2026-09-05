/* =========================================================================
   🚨【3D 模型资产配置与上传指引 - 重点玉器纵深展柜】🚨
   =========================================================================
   尊敬的开发者：
   本系统已配置完整的 3D 模型渲染流水线（支持 Web端 Three.js 与 微信小程序 Xr-frame）。
   
   【模型上传位置】：
   请将您的 4 个 .glb 格式 3D 模型文件直接上传到项目的以下目录：
   👉 📁 存放路径：public/assets/models/
   
   【4 个文物的标准文件名与代码映射如下】：
   1. 螭虎纹玉佩: public/assets/models/chihu_pendant.glb
   2. 龙凤纹韘形佩: public/assets/models/she_pendant.glb
   3. 龙纹玉璜:   public/assets/models/dragon_huang.glb
   4. 白玉舞人:   public/assets/models/jade_dancer.glb
   
   【替换说明】：
   只要您将同名 .glb 文件放置到 public/assets/models/ 文件夹内，系统会自动检测并加载真实模型；
   在模型上传前，系统将无缝调用内置的高精度汉代古玉 3D 仿真几何体与真实玉质材质球（支持指尖 3D 旋转与缩放）。
   ========================================================================= */

export interface Relic3DModelConfig {
  id: string;
  name: string;
  pinyin: string;
  tag: string;
  dynasty: string;
  excavation: string;
  // 🚨 3D 模型 .glb 文件路径配置（可修改为您自己的远程 CDN 或本地路径）
  glbPath: string;
  // 小程序 Xr-frame 中的资源注册 ID
  xrAssetId: string;
  // 默认缩放系数
  defaultScale: number;
  // 默认旋转角度 [x, y, z] (弧度)
  defaultRotation: [number, number, number];
  // 材质色泽倾向：羊脂白玉 / 青白玉 / 金铜沁色
  jadeColor: string;
  description: string;
}

export const RELIC_3D_MODELS: Record<string, Relic3DModelConfig> = {
  chihu_pendant: {
    id: 'chihu_pendant',
    name: '螭虎纹玉佩',
    pinyin: 'Chī Hǔ Wén Yù Pèi',
    tag: '重点玉器 · 01',
    dynasty: '西汉 (公元前202年 - 公元8年)',
    excavation: '北京大葆台一号汉墓 (广阳王后墓) 出土',
    // 🚨 模型 1 上传位置：public/assets/models/chihu_pendant.glb
    glbPath: '/assets/models/chihu_pendant.glb',
    xrAssetId: 'chihu_pendant',
    defaultScale: 1.0,
    defaultRotation: [0, 0, 0],
    jadeColor: '#E8E4D8', // 温润青白玉
    description: '器体呈扁平椭圆环形，透雕螭虎回首盘桓，身姿修长矫健，尾部回卷如云气流转。',
  },
  she_pendant: {
    id: 'she_pendant',
    name: '龙凤纹韘形佩',
    pinyin: 'Lóng Fèng Wén Shè Xíng Pèi',
    tag: '重点玉器 · 02',
    dynasty: '西汉 (广阳国宫廷珍宝)',
    excavation: '北京大葆台一号汉墓出土',
    // 🚨 模型 2 上传位置：public/assets/models/she_pendant.glb
    glbPath: '/assets/models/she_pendant.glb',
    xrAssetId: 'she_pendant',
    defaultScale: 1.0,
    defaultRotation: [0, 0, 0],
    jadeColor: '#F3EFE0', // 羊脂白玉带糖色
    description: '又称鸡心佩，中有一圆孔，两侧透雕游龙翔凤，刀法游丝入微，为汉代王侯贵族最高等级佩饰。',
  },
  dragon_huang: {
    id: 'dragon_huang',
    name: '龙纹玉璜',
    pinyin: 'Lóng Wén Yù Huáng',
    tag: '重点玉器 · 03',
    dynasty: '西汉 (承继秦汉礼制)',
    excavation: '北京大葆台一号汉墓出土',
    // 🚨 模型 3 上传位置：public/assets/models/dragon_huang.glb
    glbPath: '/assets/models/dragon_huang.glb',
    xrAssetId: 'dragon_huang',
    defaultScale: 1.1,
    defaultRotation: [0, 0, 0],
    jadeColor: '#DDD9C8', // 古青玉深沁
    description: '半璧为璜，两端雕饰龙首，身饰涡纹与蒲纹，体态沉稳庄严，为王后组玉佩中维系平衡的核心构件。',
  },
  jade_dancer_core: {
    id: 'jade_dancer_core',
    name: '白玉舞人',
    pinyin: 'Bái Yù Wǔ Rén',
    tag: '大葆台核心国宝 · 04',
    dynasty: '西汉广阳国宫廷',
    excavation: '北京大葆台一号汉墓王后棺内贴身佩戴',
    // 🚨 模型 4 上传位置：public/assets/models/jade_dancer.glb
    glbPath: '/assets/models/jade_dancer.glb',
    xrAssetId: 'jade_dancer',
    defaultScale: 1.2,
    defaultRotation: [0, 0, 0],
    jadeColor: '#F7F4EA', // 极品透光羊脂白玉
    description: '大葆台博物馆镇馆之宝，翘袖折腰造型，右手扬长袖拂过头顶，左手拂腰探水，定格汉代长袖舞绝代风华。',
  },
};
