import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar, HanCloudTitle } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { JADE_IMAGES } from '../data/jadeImages';
import { STAGE_VIDEOS } from '../data/videoAssets';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import { MuseumAccessionRecord } from './MuseumAccessionRecord';
import { BambooSlipCollector } from './BambooSlipCollector';
import { CHAPTER_BACKGROUNDS, CHAPTER_PAGE_BACKGROUNDS } from '../config/assetRegistry';
import { ChapterVideoPageView } from './ChapterVideoPageView';

// =========================================================================
// 🚨【第二章各页面背景底图路径配置中心 (方便一键查找与替换)】🚨
// =========================================================================
const STAGE2_BACKGROUNDS = CHAPTER_PAGE_BACKGROUNDS.stage2;

interface Stage2BanquetProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

interface JadeCandidate {
  id: string;
  name: string;
  material: string;
  shape: string;
  motif: string;
  isCorrect: boolean;
  desc: string;
  imageUrl: string;
}

const JADE_CANDIDATES: JadeCandidate[] = [
  {
    id: 'jade_01_dragon_beast',
    name: '龙凤纹神兽白玉佩',
    material: '白玉质 · 镂空透雕',
    shape: '圆形双面回旋透雕',
    motif: '透雕龙凤游丝 · 内有翼兽',
    isCorrect: true,
    desc: '大葆台王后墓核心组玉佩，雕工极尽精巧，龙凤与翼兽腾跃回环。',
    imageUrl: JADE_IMAGES.jade_01_dragon_beast,
  },
  {
    id: 'jade_02_plain_huang',
    name: '素面青玉璜',
    material: '青玉质 · 深绿微斑',
    shape: '弧形半璧状',
    motif: '素面无纹 · 两端穿孔',
    isCorrect: false,
    desc: '常见礼玉璜，非王后墓主佩饰核心。',
    imageUrl: JADE_IMAGES.jade_02_plain_huang,
  },
  {
    id: 'jade_03_zhuque_bi',
    name: '朱雀纹青玉璧',
    material: '青白玉 · 祭天礼器',
    shape: '正圆有孔平雕',
    motif: '单体朱雀展翼浮雕',
    isCorrect: false,
    desc: '祭天礼玉，非随身佩戴之组玉佩。',
    imageUrl: JADE_IMAGES.jade_03_zhuque_bi,
  },
  {
    id: 'jade_04_cuo_jin_pei',
    name: '错金兽面玉勒',
    material: '黄玉质 · 错金工艺',
    shape: '圆柱管状玉勒',
    motif: '错金兽面卷云纹',
    isCorrect: false,
    desc: '圆柱形玉勒，佩饰点缀，非核心镂雕大件。',
    imageUrl: JADE_IMAGES.jade_04_cuo_jin_pei,
  },
];

const DIALOGUES_STAGE2_KING: DialogueLine[] = [
  {
    speaker: 'king',
    speakerName: '广阳顷王',
    text: '孤承大汉天威，治西汉广阳国。宴享四方宾客，当奏九韶之乐、列钟鼎之馔。诸卿请入席！',
  },
];

const DIALOGUES_STAGE2_AFTER_VIDEO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我记得宴席上有一件重要的组玉佩，是王后的心爱之物，也是大汉礼乐的核心标志。你能帮我在这些出土玉器中找到它吗？',
  },
];

const DIALOGUES_STAGE2_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '正是这件龙凤纹神兽白玉佩！镂空雕琢，龙凤盘旋，佩戴在身上步履铿锵。汉代的礼乐记忆又苏醒了一块！',
  },
];

export const Stage2Banquet: React.FC<Stage2BanquetProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<
    | 'king_welcome'
    | 'banquet_video'
    | 'knowledge_archive'
    | 'dialogue_preshow'
    | 'interactive'
    | 'success_dialogue'
    | 'knowledge_flipbook'
    | 'shooting_star'
  >('king_welcome');

  const [selectedJadeId, setSelectedJadeId] = useState<string | null>(null);
  const [hoveredJadeId, setHoveredJadeId] = useState<string | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const [revealedSlips, setRevealedSlips] = useState<number>(1);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleSelectJade = (id: string) => {
    soundFX.playStoneDrum();
    setSelectedJadeId(id);
    setErrorTip('');
  };

  const handleConfirmJade = () => {
    if (!selectedJadeId) return;

    const candidate = JADE_CANDIDATES.find((c) => c.id === selectedJadeId);
    if (candidate && candidate.isCorrect) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('success_dialogue');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('此玉虽美，但非大葆台王后墓规格最高的透雕龙凤主佩，再观察一番……');
    }
  };

  const handleNextSlip = () => {
    soundFX.playStoneDrum();
    if (revealedSlips === 1) {
      setRevealedSlips(2);
    } else {
      soundFX.playBronzeChime();
      setPhase('shooting_star');
      setTimeout(() => {
        onNextPage();
      }, 1600);
    }
  };

  return (
    <div className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806]">
      {/* Visual Background: 宴乐深棕＋玉青＋金 */}
      <MuseumTombBackdrop palette="banquet" pattern="weave" spotlight={true} intensity="subtle" />

      {/* STEP 1: PAGE 09 广阳王致意对白 (引导页：底图汉代宴乐画像砖局部，遮罩25%，取消发光icon) */}
      {phase === 'king_welcome' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-0 animate-fade-in overflow-hidden">
          {/* 汉代宴乐画像砖局部底图 (遮罩统一25%) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={CHAPTER_BACKGROUNDS.stage2_banquet_guide}
              alt="汉代宴乐画像砖"
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806] via-transparent to-[#0B0806]/60" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第二章 · 宴乐与组玉佩" />
          </div>

          <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-1 text-center">
            <span className="text-[11px] font-mono tracking-widest text-[#C8943D] uppercase">
              文舞敬天 · 广阳盛宴
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#F1D98D] tracking-[0.2em] drop-shadow-md">
              宴乐与组玉佩
            </h3>
            <p className="text-[10px] text-[#E6D3AA]/80 max-w-xs leading-relaxed mt-1">
              大汉宗室广阳国，钟鸣鼎食，王后佩鸣。
            </p>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE2_KING}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('banquet_video');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 2: 宴乐视频 (全屏无边框舞蹈页面) */}
      {phase === 'banquet_video' && (
        <ChapterVideoPageView
          chapterNumber="02"
          englishTitle="COURT BANQUET & JADE"
          chineseTitle="宴 乐 汉 仪"
          subtitle="大汉宴飨 · 佩鸣舞起"
          videoSrc={STAGE_VIDEOS.stage2_banquet.url}
          videoAssetPathHint="public/assets/videos/banquet_dance.mp4"
          // 🚨【PAGE 1: 宴乐视频播放页背景底图 - 80% 遮罩 (可直接替换)】🚨
          bgImage={STAGE2_BACKGROUNDS.page1_video}
          palette="banquet"
          completeButtonText="完成观看 · 步入知识典藏"
          onSkip={() => {
            setPhase('knowledge_archive');
          }}
          onComplete={() => {
            setPhase('knowledge_archive');
          }}
        />
      )}

      {/* STEP 2.5: 知识典藏 (宴乐 / 组玉佩名词解释页面，玄棕底色，左侧金线/玉青线展签风格) */}
      {phase === 'knowledge_archive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden font-serif select-none">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="知识典藏" />
            <p className="text-center text-[10px] text-[#A89078] tracking-[0.2em] mt-0.5">
              汉代礼乐制度 · 宴饮组佩展签释义
            </p>
          </div>

          <div className="relative my-auto flex flex-col space-y-3 px-2 max-w-sm mx-auto w-full">
            {/* 卡片 1: 宴乐 (玄棕背景，左侧金线) */}
            <div className="relative p-3.5 rounded-xl bg-[#160E0A] border-0 border-l-4 border-[#D6A84B] shadow-lg flex flex-col space-y-1.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-serif font-black text-[#F1D98D] tracking-widest flex items-center gap-1.5">
                  <span className="text-[#D6A84B] text-[10px]">❖</span>
                  宴乐之礼
                </span>
                <span className="text-[8.5px] font-mono text-[#D6A84B]/80 tracking-wider">
                  COURT BANQUET
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#E6D3AA]/90 font-serif">
                汉代诸侯王以宴乐招待宾客、彰显宗室威仪。席间钟鸣鼎食，设雅乐九奏、列武舞与杂技，既是宗法礼制的核心表达，亦是汉代贵族生活繁华的集大成者。
              </p>
              <div className="pt-1 flex items-center justify-between text-[8px] text-[#8C6D46] font-mono border-t border-[#D6A84B]/15">
                <span>展签藏号 · EX-HAN-02-A</span>
                <span>大葆台西汉王陵遗址</span>
              </div>
            </div>

            {/* 卡片 2: 组玉佩 (玄棕背景，左侧玉青线) */}
            <div className="relative p-3.5 rounded-xl bg-[#160E0A] border-0 border-l-4 border-[#79B9A1] shadow-lg flex flex-col space-y-1.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-serif font-black text-[#79B9A1] tracking-widest flex items-center gap-1.5">
                  <span className="text-[#79B9A1] text-[10px]">❖</span>
                  王后组玉佩
                </span>
                <span className="text-[8.5px] font-mono text-[#79B9A1]/80 tracking-wider">
                  ROYAL SUITE OF JADES
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#E6D3AA]/90 font-serif">
                西汉诸侯王与王后最高等级随身礼玉，由珩、璜、琚、瑀、冲牙与神兽佩等数十件精美玉件以丝组贯穿连缀。佩者行步舒缓，环佩相撞发出清脆节律，非盛典仪轨不可轻易佩挂。
              </p>
              <div className="pt-1 flex items-center justify-between text-[8px] text-[#558071] font-mono border-t border-[#79B9A1]/15">
                <span>展签藏号 · EX-HAN-02-B</span>
                <span>大葆台王后墓出土</span>
              </div>
            </div>
          </div>

          <div className="relative z-30 w-full max-w-xs mx-auto pb-1">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('dialogue_preshow');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              继续前行 · 寻访遗失组玉佩
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* STEP 3: PAGE 10 玉佩缺失页面 (底图：王后腰部服饰特写，虚线空位，无中央圆圈icon) */}
      {phase === 'dialogue_preshow' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-0 animate-fade-in overflow-hidden">
          {/* 王后腰部特写底图 */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={CHAPTER_BACKGROUNDS.stage2_queen_skirt}
              alt="王后下半身服饰特写"
              className="w-full h-full object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806] via-transparent to-[#0B0806]/70" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-1 text-center">
            <span className="text-[9.5px] font-mono tracking-widest text-[#F1D98D] bg-black/50 px-2.5 py-0.5 rounded-full border-0">
              ❖ 王后组玉佩 · 虚位以待
            </span>
            <p className="text-[10px] text-[#E6D3AA]/90 drop-shadow-md">
              腰间佩玉空悬，惟余虚线佩影与幽幽环佩遗响
            </p>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE2_AFTER_VIDEO}
              currentIndex={0}
              onNext={() => {
                setPhase('interactive');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 4: PAGE 11 交互：四选一玉佩 (抽屉形式，去除 pb-36，内容完整呈现在屏幕内) */}
      {phase === 'interactive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="寻找王后组玉佩" />
          </div>

          {/* 4 Jade Options - 紧凑高度 h-28 sm:h-30, 留足空间给确认按键与提示框 */}
          <div className="grid grid-cols-2 gap-1.5 my-1 px-1">
            {JADE_CANDIDATES.map((jade) => {
              const isSelected = selectedJadeId === jade.id;
              const isHovered = hoveredJadeId === jade.id;
              const isDrawerOpen = isSelected || isHovered;

              return (
                <div
                  key={jade.id}
                  onClick={() => {
                    handleSelectJade(jade.id);
                    setHoveredJadeId(jade.id);
                  }}
                  onMouseEnter={() => setHoveredJadeId(jade.id)}
                  onMouseLeave={() => setHoveredJadeId(null)}
                  onTouchStart={() => setHoveredJadeId(jade.id)}
                  className={`relative h-28 sm:h-30 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-md select-none group ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#351E13] to-[#1F1008] border-[#D6A84B] shadow-[0_0_16px_rgba(214,168,75,0.4)]'
                      : isHovered
                      ? 'bg-gradient-to-b from-[#2B170E] to-[#180C07] border-[#D6A84B]/80 shadow-[0_0_12px_rgba(214,168,75,0.25)]'
                      : 'bg-[#160D09]/95 border-[#6E3024]/70 hover:border-[#D6A84B]/60'
                  }`}
                >
                  {/* Top Text Info */}
                  <div className="p-1.5 pb-0 z-10 relative">
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[9.5px] sm:text-[10px] font-serif font-black text-[#F1D98D] leading-tight truncate">
                        {jade.name}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-3 h-3 text-[#79B9A1] shrink-0 animate-bounce" />
                      ) : (
                        <span className="text-[7.5px] font-mono text-[#A89078] shrink-0 opacity-60">
                          抽屉
                        </span>
                      )}
                    </div>
                    <div className="space-y-0 text-[7.5px] text-[#A89078] mt-0.5">
                      <p className="truncate">❖ {jade.material}</p>
                      <p className="truncate">❖ {jade.motif}</p>
                    </div>
                  </div>

                  {/* Bottom Drawer Chamber */}
                  <div className="relative w-full h-14 sm:h-16 overflow-hidden flex flex-col justify-end items-center">
                    <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0D0704] via-[#1E110A] to-transparent z-20 pointer-events-none flex flex-col items-center justify-end pb-0.5">
                      <div className="w-6 h-0.5 rounded-full bg-[#D6A84B]/40 group-hover:bg-[#D6A84B]/80 transition-colors shadow-sm" />
                    </div>

                    <div
                      className={`absolute bottom-0.5 z-10 flex flex-col items-center justify-center transition-all duration-400 ease-out transform ${
                        isDrawerOpen
                          ? 'translate-y-0 opacity-100 scale-100'
                          : 'translate-y-8 opacity-30 scale-75'
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        {isDrawerOpen && (
                          <div className="absolute inset-0 bg-radial from-[#F1D98D]/30 via-[#79B9A1]/20 to-transparent blur-md pointer-events-none animate-pulse" />
                        )}
                        <img
                          src={jade.imageUrl}
                          alt={jade.name}
                          className="w-11 h-11 sm:w-12 sm:h-12 object-contain filter drop-shadow-[0_0_8px_rgba(241,217,141,0.6)]"
                        />
                      </div>
                      <span
                        className={`text-[6.5px] font-mono tracking-wider transition-opacity duration-300 ${
                          isDrawerOpen ? 'text-[#F1D98D] opacity-100' : 'opacity-0'
                        }`}
                      >
                        {isSelected ? '已选定此玉' : '抽屉已展开'}
                      </span>
                    </div>

                    {!isDrawerOpen && (
                      <div className="z-10 pb-1 text-[6.5px] text-[#8C6D46] font-mono flex items-center gap-0.5 animate-pulse pointer-events-none">
                        <span>↑ 触碰抽屉</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standardized Confirm Button - 上移到选项正下方，去除边框四角 */}
          <div className="w-full z-10 my-1 max-w-xs mx-auto px-1">
            <HanPlaqueButton
              onClick={handleConfirmJade}
              disabled={!selectedJadeId}
              size="md"
              className="w-full"
              leftIcon={<CheckCircle2 className="w-4 h-4 text-[#D6A84B]" />}
            >
              确认选择 · 找回王后组玉佩
            </HanPlaqueButton>
          </div>

          <div className="relative z-40 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '王后墓出土的组玉佩核心在于形制高贵，图案兼备龙与凤之祥瑞神兽。',
                '该玉佩质地为温润白玉，器身采用镂空透雕技法雕琢龙凤纠结、神兽回首。',
                '正确选项为「龙凤纹神兽白玉佩」，是王后墓中规格最高的佩玉精粹。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* STEP 5: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2.5">
            <div className="w-18 h-18 rounded-full bg-[#1E2E20] border-0 flex items-center justify-center shadow-[0_0_20px_rgba(121,185,161,0.6)] animate-pulse">
              <Sparkles className="w-9 h-9 text-[#79B9A1]" />
            </div>
            <div className="text-center">
              <span className="text-[9.5px] font-mono text-[#79B9A1] bg-[#121E14] px-3 py-0.5 rounded-full border-0">
                新记忆已收录 · 记忆竹简 02
              </span>
              <h3 className="text-sm font-black text-[#F1D98D] mt-1.5">
                记忆竹简 02「王后组玉佩」已收录
              </h3>
            </div>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE2_SUCCESS}
              currentIndex={0}
              onNext={() => {
                setPhase('knowledge_flipbook');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 6: 记忆恢复 · 竹简收集 */}
      {phase === 'knowledge_flipbook' && (
        <div className="fixed inset-0 z-50 bg-[#0B0806]/95 backdrop-blur-md flex flex-col items-center justify-center p-2 animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={2}
            customBgType="dancer_shadow"
            onProceed={() => {
              onUnlockFragment();
              setPhase('shooting_star');
              setTimeout(() => {
                onNextPage();
              }, 1200);
            }}
          />
        </div>
      )}

      {/* STEP 7: 流星划过夜空动画 */}
      {phase === 'shooting_star' && (
        <div className="fixed inset-0 z-50 bg-[#080503] flex flex-col items-center justify-center animate-fade-in">
          <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-1/4 left-0 w-48 h-0.5 bg-gradient-to-r from-transparent via-[#F1D98D] to-transparent transform -rotate-12 animate-pulse" />
            <div className="text-center space-y-2 z-10">
              <Sparkles className="w-8 h-8 text-[#F1D98D] mx-auto animate-spin" />
              <h3 className="text-base font-serif font-black text-[#F1D98D]">
                组玉佩声清鸣 · 汉室星图流转
              </h3>
              <p className="text-xs text-[#A89078]">
                正步入第三展厅……
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
