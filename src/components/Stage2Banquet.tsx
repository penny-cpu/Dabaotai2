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
import { useSmoothPhaseTransition } from '../utils/useSmoothPhaseTransition';

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
    text: '孤治广阳国，宴乐四方，奏韶乐、列钟鼎，诸卿入席！',
  },
];

const DIALOGUES_STAGE2_AFTER_VIDEO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '王后腰间尚缺一件核心组玉佩，请帮我从玉器中寻回它。',
  },
];

const DIALOGUES_STAGE2_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '正是龙凤神兽白玉佩！镂雕生辉，礼乐之忆再度苏醒。',
  },
];

export const Stage2Banquet: React.FC<Stage2BanquetProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  // 每一子页面转场统一控制在 0.5 秒左右（240ms 柔和淡出 -> 瞬时切换 -> 260ms 柔和淡入）
  const { phase, setPhase, transitionStyle } = useSmoothPhaseTransition<
    | 'guide'
    | 'banquet_video'
    | 'cards'
    | 'interactive'
    | 'knowledge_flipbook'
  >('guide');

  const [selectedJadeId, setSelectedJadeId] = useState<string | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const [revealedSlips, setRevealedSlips] = useState<number>(1);
  const [isVideoCompleted, setIsVideoCompleted] = useState<boolean>(false);

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
      setPhase('knowledge_flipbook');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('此玉非透雕龙凤主佩，请再细辨。');
    }
  };

  const handleNextSlip = () => {
    soundFX.playStoneDrum();
    if (revealedSlips === 1) {
      setRevealedSlips(2);
    } else {
      soundFX.playBronzeChime();
      onNextPage();
    }
  };

  return (
    <div
      className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806]"
      style={transitionStyle}
    >
      {/* Visual Background: 宴乐深棕＋玉青＋金 */}
      <MuseumTombBackdrop palette="banquet" pattern="weave" spotlight={true} intensity="subtle" />

      {/* =========================================================================
          STEP 0: 引导页 - 宴飨佩鸣 (与图1设计完全对齐：单纯标题与背景底图)
          ========================================================================= */}
      {phase === 'guide' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-4 animate-fade-in overflow-hidden">
          {/* 引导页背景底图 - 80% 遮罩与汉代壁画粗粝砂石纹 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE2_BACKGROUNDS.page0_guide}
              alt="汉代宴乐汉画"
              className="w-full h-full object-cover filter brightness-[0.55] contrast-110 saturate-90 scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-[#0B0806]/80" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          {/* 标题 & 小字 */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-3 px-4 max-w-sm mx-auto">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              宴飨佩鸣
            </h2>
            <p className="text-xs sm:text-sm font-serif text-[#E6D3AA] tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              王后组佩 · 钟鸣鼎食
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
          </div>

          {/* 底部按钮 */}
          <div className="relative z-10 w-full max-w-xs mx-auto space-y-2 pb-2">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('banquet_video');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              观摩宴乐雅舞 · 步入华宴
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 1: 宴乐舞蹈视频展示页 (全幅宴乐视频展示，80%遮罩背景底图，右上角跳过，底部完成按钮)
          ========================================================================= */}
      {phase === 'banquet_video' && (
        <ChapterVideoPageView
          chapterNumber="02"
          englishTitle="COURT BANQUET DANCE"
          chineseTitle="宴 乐 汉 仪"
          subtitle="大汉广阳宴乐 · 钟鸣鼎食"
          videoSrc={STAGE_VIDEOS.stage2_banquet.url}
          videoAssetPathHint="public/assets/videos/banquet_dance.mp4"
          bgImage={STAGE2_BACKGROUNDS.page1_video}
          palette="banquet"
          completeButtonText="完成观看 · 步入宴乐汉仪"
          onSkip={() => {
            soundFX.playStoneDrum();
            setPhase('cards');
          }}
          onComplete={() => {
            soundFX.playStoneDrum();
            setPhase('cards');
          }}
        />
      )}

      {/* =========================================================================
          STEP 2: 宴乐汉仪页面 (知识卡片：宴乐之礼、王后组玉佩，合并广阳王致意对白)
          ========================================================================= */}
      {phase === 'cards' && (
        <div className="relative w-full h-full flex flex-col justify-between animate-fade-in p-3 pb-2 overflow-hidden bg-[#0B0806] text-[#E6D3AA] font-serif select-none han-app-sandbox-grain">
          {/* 背景底图 (80% 遮罩) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <img
              src={STAGE2_BACKGROUNDS.page1_video}
              alt="宴乐视频背景底图"
              className="w-full h-full object-cover object-center filter saturate-90 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-[#0B0806]/80 backdrop-blur-[0.5px]" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          {/* 标题 */}
          <div className="relative z-10 text-center pt-0.5 pb-0.5">
            <span className="text-[9px] text-[#A89078] font-mono tracking-[0.3em] uppercase block">
              02 / COURT BANQUET & JADE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#F1D98D] tracking-[0.38em] font-serif pl-[0.38em] drop-shadow mt-0.5">
              宴 乐 汉 仪
            </h2>
            <p className="text-xs text-[#E6D3AA]/85 tracking-[0.2em] font-serif mt-0.5">
              大汉宴飨 · 佩鸣舞起
            </p>
          </div>

          {/* 页面内容区域：两个标签卡片在页面排版居中展示 */}
          <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 max-w-sm mx-auto w-full my-auto space-y-4">
            {/* 标签框 1: 宴乐之礼 */}
            <div className="w-full p-4 rounded-xl bg-[#160E0A]/95 border-l-4 border-[#D6A84B] border-t border-r border-b border-[#3E2114]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[#D6A84B] text-xs">❖</span>
                <h4 className="text-sm font-serif font-black text-[#F1D98D] tracking-wider">
                  宴乐之礼
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-[#E6D3AA]/90 font-serif">
                汉代诸侯王以宴飨盛礼款待宗亲四方，席间钟鸣鼎食、雅乐九奏。
              </p>
            </div>

            {/* 标签框 2: 王后组玉佩 */}
            <div className="w-full p-4 rounded-xl bg-[#160E0A]/95 border-l-4 border-[#79B9A1] border-t border-r border-b border-[#3E2114]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[#79B9A1] text-xs">❖</span>
                <h4 className="text-sm font-serif font-black text-[#79B9A1] tracking-wider">
                  王后组玉佩
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-[#E6D3AA]/90 font-serif">
                西汉诸侯王与王后最高随身礼玉，数十件精美玉件丝组贯穿，行步舒缓、环佩相鸣。
              </p>
            </div>
          </div>

          {/* 底部按键与玉舞人聊天框 (合并广阳王致意对白) */}
          <div className="relative z-30 w-full shrink-0">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE2_KING}
              currentIndex={0}
              onNext={() => {
                soundFX.playBronzeChime();
                setPhase('interactive');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 4: PAGE 11 交互：四选一玉佩 (图标先隐藏在选项框下方，手指点击方框再从下向上升起出现全貌) */}
      {phase === 'interactive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          {/* =========================================================================
              🚨【图2玉佩四选一页面专属背景底图 (彩绘陶壶图案，在代码中标注，方便查找替换)】🚨
              ========================================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE2_BACKGROUNDS.page2_interactive_pendant_pottery_bg}
              alt="彩绘陶壶背景底图"
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-110 saturate-90"
            />
            {/* 75% 暗色遮罩与汉代粗粝砂石质感 */}
            <div className="absolute inset-0 bg-[#0B0806]/75 backdrop-blur-[0.5px]" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="寻找王后组玉佩" />
          </div>

          {/* 
            =====================================================================
            【图4王后组玉佩页面】：四个选项里的图标先隐藏在选项框下方，
            手指点击方框再从下向上升起出现图标全貌。
            =====================================================================
          */}
          <div className="grid grid-cols-2 gap-2 my-1 px-1 relative z-10">
            {JADE_CANDIDATES.map((jade) => {
              const isSelected = selectedJadeId === jade.id;

              return (
                <div
                  key={jade.id}
                  onClick={() => handleSelectJade(jade.id)}
                  className={`relative h-28 sm:h-30 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg select-none group ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#381F13] to-[#180B06] border-[#D6A84B] shadow-[0_0_18px_rgba(214,168,75,0.45)]'
                      : 'bg-[#160D09]/92 backdrop-blur-xs border-[#6E3024]/70 hover:border-[#D6A84B]/60'
                  }`}
                >
                  {/* Top Text Info: 标题适当放大 */}
                  <div className="pt-2 px-2.5 pb-0.5 z-20 relative">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-[13px] font-serif font-black text-[#F1D98D] tracking-wide leading-snug">
                        {jade.name}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#79B9A1] shrink-0 animate-bounce" />
                      )}
                    </div>
                  </div>

                  {/* 
                    展匣主体：图标先隐藏在选项框下方 (translate-y-24 opacity-0)，
                    手指点击方框后 (isSelected) 从下向上升起 (translate-y-0 opacity-100) 出现图标全貌
                  */}
                  <div className="relative w-full flex-1 overflow-hidden flex flex-col justify-center items-center pb-2">
                    {/* 未点击时的提示占位 */}
                    {!isSelected && (
                      <div className="text-[9px] font-serif text-[#A89078]/80 flex flex-col items-center gap-1 animate-pulse">
                        <span className="w-8 h-1 rounded-full bg-[#522D18]/60" />
                        <span>点击升起玉佩</span>
                      </div>
                    )}

                    {/* 文物图片：点击后从下向上升起出现全貌 */}
                    <div
                      className={`relative z-10 transition-all duration-500 ease-out flex items-center justify-center ${
                        isSelected
                          ? 'translate-y-0 opacity-100 scale-105'
                          : 'translate-y-24 opacity-0 scale-75 pointer-events-none'
                      }`}
                    >
                      {/* 升起时的柔光辉映 */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-radial from-[#F1D98D]/35 via-[#79B9A1]/20 to-transparent blur-md pointer-events-none animate-pulse" />
                      )}
                      <img
                        src={jade.imageUrl}
                        alt={jade.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_10px_16px_rgba(241,217,141,0.7)]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standardized Confirm Button - 上移到选项正下方 */}
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
                '王后组玉佩核心件，兼备龙凤祥兽。',
                '温润白玉，镂空透雕龙凤纠结。',
                '选「龙凤纹神兽白玉佩」，为佩玉精粹。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* STEP 6: 记忆恢复 · 竹简收集 (说完话后直接启程下一章) */}
      {phase === 'knowledge_flipbook' && (
        <div className="absolute inset-0 z-50 bg-[#0B0806]/95 backdrop-blur-md flex flex-col items-center justify-center p-2 animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={2}
            customBgType="dancer_shadow"
            dialogues={DIALOGUES_STAGE2_SUCCESS}
            onProceed={() => {
              onUnlockFragment();
              onNextPage();
            }}
          />
        </div>
      )}
    </div>
  );
};
