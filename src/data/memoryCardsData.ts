export interface MemoryCardItem {
  id: string;
  chapterIndex: number;
  code: string;
  title: string;
  subtitle: string;
  mainKnowledge: string;
  detailedKnowledge: string;
  glossary?: { term: string; explanation: string }[];
  tags: string[];
  era: string;
  imageHint: string;
}

export const MEMORY_CARDS_DATA: MemoryCardItem[] = [
  {
    id: 'card_01',
    chapterIndex: 1,
    code: '01',
    title: '武舞之器',
    subtitle: '王侯护身与军阵兵器 · 武舞与礼制',
    mainKnowledge: '错金银八棱棁、铁戟；王侯护身与军阵兵器；武舞与礼制。',
    detailedKnowledge:
      '大葆台一号墓出土了错金银八棱棁与铁戟。棁为铜铸八棱、饰错金银、无尖无刃，可藏于袖中作为王侯护身之兵；铁戟横刃长柄，为汉军阵前格斗利器。古代武舞执干戈以象军威，兵器入葬象征着以舞演武、以乐彰德的礼乐传统永续守护。',
    tags: ['错金银八棱棁', '铁戟', '武舞', '干戈礼制'],
    era: '西汉 · 广阳顷王时期',
    imageHint: '错金银八棱棁与汉代军阵铁戟光影',
  },
  {
    id: 'card_02',
    chapterIndex: 2,
    code: '02',
    title: '王后组玉佩',
    subtitle: '玉舞人与王后墓玉器体系 · 佩玉与身份',
    mainKnowledge: '玉舞人与王后墓玉器体系；佩玉、身份与随葬记忆。',
    detailedKnowledge:
      '大葆台二号墓（王后墓）出土了精美绝伦的龙凤纹神兽白玉佩等组玉佩构件。汉代贵族讲求“君子比德于玉”，组玉佩不仅是身份地位与等级秩序的象征，更在步履之间撞击成韵，与宫廷宴乐形成礼乐呼应。',
    glossary: [
      {
        term: '宴乐',
        explanation: '汉代宫廷与贵族宴饮中的综合性礼乐活动，融合音乐、歌舞与礼仪，不只为了热闹，也体现秩序与等级。',
      },
      {
        term: '组玉佩',
        explanation: '由多件玉器组合而成的佩饰体系，既用于装饰，也体现身份、礼制与佩戴者之间的关系。',
      },
    ],
    tags: ['王后组玉佩', '白玉神兽', '宴乐礼仪', '以玉比德'],
    era: '西汉 · 广阳王后墓',
    imageHint: '白玉透雕龙凤神兽纹佩与温润玉石光泽',
  },
  {
    id: 'card_03',
    chapterIndex: 3,
    code: '03',
    title: '翘袖折腰',
    subtitle: '长袖折腰典型舞姿 · 汉代舞蹈审美',
    mainKnowledge: '玉舞人的典型舞姿；长袖、细腰与汉代舞蹈审美。',
    detailedKnowledge:
      '大葆台出土的白玉舞人，定格了汉代最著名的“翘袖折腰”瞬间：舞人右臂高扬、左臂下探回折，长袖随势翻卷，腰肢极度柔韧回折。玉雕工匠将瞬间的动势凝固在千年的美玉中，使汉代长袖轻盈曼妙的礼乐生命力代代相传。',
    tags: ['翘袖折腰', '玉舞人', '汉代长袖舞', '刚柔相济'],
    era: '西汉 · 广阳王陵',
    imageHint: '圆雕玉舞人翘袖回眸折腰身姿',
  },
  {
    id: 'card_04',
    chapterIndex: 4,
    code: '04',
    title: '百戏娱民',
    subtitle: '跳丸角抵综合演艺 · 宫廷民间盛景',
    mainKnowledge: '跳丸、角抵、杂技、幻术、乐舞；宫廷与民间的综合表演。',
    detailedKnowledge:
      '百戏是汉代极为繁荣的综合性表演艺术，包括跳丸抛球、角抵竞技、幻术驯兽与滑稽杂耍。俳优一人可同时腾抛七丸，“五千四百回”展示了汉代民间艺人精湛的技艺，百戏与宴乐共同构成了汉代张弛有度的社会生活图景。',
    tags: ['百戏跳丸', '俳优乐舞', '角抵杂技', '市井生机'],
    era: '西汉 · 盛世风俗',
    imageHint: '俳优腾掷七彩丸球与百戏欢腾图',
  },
  {
    id: 'card_05',
    chapterIndex: 5,
    code: '05',
    title: '云气之路',
    subtitle: '送葬长袖与星云铜镜 · 通天升仙想象',
    mainKnowledge: '送葬袖舞、云气纹、星云纹铜镜与升仙想象。',
    detailedKnowledge:
      '汉人重视丧葬礼乐，送葬舞者挥动长袖在空中划出 S 形回旋光痕。工匠将翻卷流动的云气纹铸于星云纹铜镜背面，镜可照形通明，云气可引魂升仙。送葬的长袖与镜背的云气，共同铺就了通往天界的永恒之路。',
    tags: ['星云纹铜镜', '云气纹', '送葬长袖', '升仙之路'],
    era: '西汉 · 广阳国丧葬礼制',
    imageHint: '星云纹铜镜流光与 S 型长袖云气光带',
  },
  {
    id: 'card_06',
    chapterIndex: 6,
    code: '06',
    title: '黄肠题凑',
    subtitle: '黄心柏木 15880 · 汉代帝陵王制堡垒',
    mainKnowledge: '黄心柏木、题凑结构、15880 根木枋与高等级墓制。',
    detailedKnowledge:
      '大葆台一号墓完整揭示了西汉顶级王陵制度——“黄肠题凑”。采用 15880 根规格严密的黄心柏木枋（90×10×10厘米），木枋端头统一朝向墓室中心（题凑），经 30 层严密榫卯咬合，筑起高约 3 米、总长 42 米的地下木质堡垒，守护棺椁与汉代生死秩序。',
    tags: ['黄肠题凑', '15880 考工', '梓宫便房', '帝陵葬制'],
    era: '西汉 · 大葆台一号墓',
    imageHint: '万根黄心柏木榫卯层层咬合的木构城垣',
  },
  {
    id: 'card_07',
    chapterIndex: 7,
    code: '07',
    title: '天地星路',
    subtitle: '七盘二鼓盘鼓舞 · 天地星路事死如生',
    mainKnowledge: '盘鼓舞、七盘二鼓、星象、天圆地方与事死如生。',
    detailedKnowledge:
      '盘鼓舞在七盘二鼓间踏击起舞，盘象征大地，鼓象征天空；舞者一足踏鼓、一足踩盘，以身体沟通天地。地上的七盘对应天上北斗与四象星宿，墓室星象与盘鼓乐舞共同见证汉人“事死如生，死非终点”的宏大宇宙观。',
    tags: ['盘鼓舞', '七盘二鼓', '四象星图', '事死如生'],
    era: '西汉 · 宇宙星路',
    imageHint: '七盘二鼓金光星轨与天地四象星宿',
  },
];

export interface ChapterHintData {
  chapter: number;
  title: string;
  hints: { level: string; text: string }[];
}

export const CHAPTER_HINTS: Record<string, ChapterHintData> = {
  weapon: {
    chapter: 1,
    title: '找回武舞之器',
    hints: [
      { level: '提示 01', text: '第一件铜铸八棱，饰错金银，无尖无刃，可藏于袖中。' },
      { level: '提示 02', text: '第二件铁铸，横刃长柄，是汉代常见格斗兵器。' },
      { level: '提示 03', text: '前者名为“棁”，后者出土于一号墓前室。' },
    ],
  },
  banquet: {
    chapter: 2,
    title: '辨识王后玉佩',
    hints: [
      { level: '提示 01', text: '白玉质，质地温润纯净。' },
      { level: '提示 02', text: '整体近圆形，边缘弧度优美。' },
      { level: '提示 03', text: '纹饰镂空回旋，透雕龙凤游丝。' },
      { level: '提示 04', text: '内部雕有一只有角有翼的神兽。' },
    ],
  },
  gallery: {
    chapter: 3,
    title: '确认翘袖折腰姿态',
    hints: [
      { level: '提示 01', text: '汉代舞蹈讲究长袖与细腰，刚柔相济。' },
      { level: '提示 02', text: '玉舞人留下的瞬间是“翘袖折腰”。' },
      { level: '提示 03', text: '观察手臂：右臂上扬，左臂下探，折腰动势最明显（视频 C）。' },
    ],
  },
  baixi: {
    chapter: 4,
    title: '跳丸数字谜题',
    hints: [
      { level: '提示 01', text: '俳优一天能抛“五千四百”回。' },
      { level: '提示 02', text: '古汉语中，“又”常用来连接整数与零数，表示“加”。' },
      { level: '提示 03', text: '“五千又四百”即 5000 + 400 = 5400，与“五千四百”相同。' },
    ],
  },
  funerary: {
    chapter: 5,
    title: '云气纹与随葬铜镜',
    hints: [
      { level: '提示 01', text: '纹样翻卷回旋，汉人相信它通向天界。' },
      { level: '提示 02', text: '它不是玉也不是陶，而是铜铸，并且能照见人影。' },
      { level: '提示 03', text: '镜背没有铭文，只有持续翻卷的云气纹（星云纹铜镜）。' },
    ],
  },
  huangchang: {
    chapter: 6,
    title: '黄肠题凑考工密码',
    hints: [
      { level: '提示 01', text: '舞者动作节奏与站位依次报出五个数字。' },
      { level: '提示 02', text: '大葆台一号墓使用柏木总数量为 15880 根。' },
      { level: '提示 03', text: '依次输入：1 — 5 — 5 — 8 — 0。' },
    ],
  },
  ascension: {
    chapter: 7,
    title: '七盘星路与生死观',
    hints: [
      { level: '提示 01', text: '盘像大地，鼓像天空；七盘对应天上北斗与星路。' },
      { level: '提示 02', text: '按顺序点击连接七个星点，点亮天地星轨。' },
      { level: '提示 03', text: '汉代观念：星象指引升仙，盘鼓舞象征通天，二者指向“事死如生”。' },
    ],
  },
};
