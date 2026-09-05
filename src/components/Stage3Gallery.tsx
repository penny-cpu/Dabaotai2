import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar, HanCloudTitle } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { DANCE_SILHOUETTE_IMAGES } from '../data/danceSilhouettes';
import { STAGE_VIDEOS } from '../data/videoAssets';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import { BambooSlipCollector } from './BambooSlipCollector';
import { CHAPTER_PAGE_BACKGROUNDS, STAGE3_QUIZ_OPTION_IMAGES } from '../config/assetRegistry';
import { ChapterVideoPageView } from './ChapterVideoPageView';

interface Stage3GalleryProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

// =========================================================================
// 🚨【第三章各页面背景底图路径配置中心 (方便一键查找与替换)】🚨
// =========================================================================
const STAGE3_BACKGROUNDS = CHAPTER_PAGE_BACKGROUNDS.stage3;

// =========================================================================
// 🚨【第三章答题选项舞姿卡图片路径 (方便一键直接替换)】🚨
// =========================================================================
export const STAGE3_QUIZ_IMG_OPTION_A = STAGE3_QUIZ_OPTION_IMAGES.optionA; // 选项 A 舞姿图: 盘鼓踏步
export const STAGE3_QUIZ_IMG_OPTION_B = STAGE3_QUIZ_OPTION_IMAGES.optionB; // 选项 B 舞姿图: 罗衣飘摇
export const STAGE3_QUIZ_IMG_OPTION_C = STAGE3_QUIZ_OPTION_IMAGES.optionC; // 选项 C 舞姿图: 翘袖折腰 (正确答案)

export interface DancePoseCard {
  id: string;
  code: 'A' | 'B' | 'C';
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  isCorrect: boolean;
  silhouetteType: 'luoyi' | 'pangu' | 'qiaoxiu';
  imageSrc: string;
}

const DANCE_POSES: DancePoseCard[] = [
  {
    id: 'pose_luoyi',
    code: 'A',
    tag: '舞姿卡 A · 罗衣从风',
    title: '罗衣从风',
    subtitle: '长袖善舞 · 翩跹若云',
    desc: '两袖翻卷回旋，如行云流水、回风舞雪，长袖舒展之间，韶乐与节律交相呼应。',
    isCorrect: false,
    silhouetteType: 'luoyi',
    imageSrc: STAGE3_QUIZ_IMG_OPTION_B, // 罗衣飘摇
  },
  {
    id: 'pose_pangu',
    code: 'B',
    tag: '舞姿卡 B · 盘鼓回旋',
    title: '盘鼓回旋',
    subtitle: '顾盼生辉 · 步履生莲',
    desc: '足踏七盘回转起舞，轻盈灵动如惊鸿照影，展现大汉盘鼓乐舞之美。',
    isCorrect: false,
    silhouetteType: 'pangu',
    imageSrc: STAGE3_QUIZ_IMG_OPTION_A, // 盘鼓踏步
  },
  {
    id: 'pose_qiaoxiu',
    code: 'C',
    tag: '舞姿卡 C · 翘袖折腰',
    title: '翘袖折腰',
    subtitle: '刚柔相济 · 凌霄拂地',
    desc: '舞者纤腰反折如弯月，右臂冲霄扬长袖，左臂垂下探秋水，此正为大葆台玉舞人之真容舞姿。',
    isCorrect: true,
    silhouetteType: 'qiaoxiu',
    imageSrc: STAGE3_QUIZ_IMG_OPTION_C, // 翘袖折腰
  },
];

// 舞姿视频模式下支持左右切换的三种式子
const VIDEO_DANCE_STYLES = [
  { id: 'qiaoxiu', name: '翘袖折腰式', subtitle: '右臂扬袖凌霄 · 纤腰反折如月' },
  { id: 'pangu', name: '盘鼓踏步式', subtitle: '七盘回旋转踏 · 步履如飞' },
  { id: 'luoyi', name: '罗衣飘摇式', subtitle: '双袖回风翻卷 · 翩跹若云' },
];

const DIALOGUES_STAGE3_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我想起来了……翘袖折腰！右臂扬袖凌霄，左臂拂腰探水，这正是我在大葆台汉墓沉睡千年的模样！',
  },
];

export const Stage3Gallery: React.FC<Stage3GalleryProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<'guide' | 'fan_cards' | 'dance_video' | 'select_quiz' | 'success_dialogue' | 'bamboo_slip'>('guide');
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [activeVideoPoseIndex, setActiveVideoPoseIndex] = useState<number>(0);
  const [selectedPoseCode, setSelectedPoseCode] = useState<'A' | 'B' | 'C' | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        soundFX.playStoneDrum();
        setActiveCardIndex((prev) => (prev + 1) % DANCE_POSES.length);
      } else {
        soundFX.playStoneDrum();
        setActiveCardIndex((prev) => (prev - 1 + DANCE_POSES.length) % DANCE_POSES.length);
      }
    }
  };

  const handleSelectQuizOption = (code: 'A' | 'B' | 'C') => {
    soundFX.playStoneDrum();
    setSelectedPoseCode(code);
    setErrorTip('');

    if (code === 'C') {
      setIsAnswerCorrect(true);
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      onUnlockFragment();
      setTimeout(() => {
        setPhase('success_dialogue');
      }, 500);
    } else {
      setIsAnswerCorrect(false);
      soundFX.playGlitchStatic();
      setErrorTip('此舞姿翩跹，但非大葆台玉舞人右臂凌霄、纤腰反折的“翘袖折腰”之姿，再端详一番……');
    }
  };

  return (
    <div className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806] han-app-sandbox-grain">
      {/* Visual Background: 翘袖折腰漆红棕＋玉青 */}
      <MuseumTombBackdrop palette="sleeve" pattern="cloud" spotlight={true} intensity="subtle" />

      {/* =========================================================================
          STEP 0: 引导页 - 汉代乐舞殿堂底图
          ========================================================================= */}
      {phase === 'guide' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-4 animate-fade-in overflow-hidden">
          {/* 🚨【PAGE 0: 引导页背景底图 - 可一键替换】🚨 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE3_BACKGROUNDS.page0_guide}
              alt="汉代乐舞殿堂"
              className="w-full h-full object-cover filter brightness-[0.55] contrast-110 saturate-90 scale-105 transition-transform duration-1000 ease-out"
            />
            {/* 80% 遮罩效果 */}
            <div className="absolute inset-0 bg-[#0B0806]/80" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          {/* 标题 & 小字 */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-3 px-4 max-w-sm mx-auto">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              翘袖折腰
            </h2>
            <p className="text-xs sm:text-sm font-serif text-[#E6D3AA] tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              长袖翩跹 · 汉舞风华
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
          </div>

          {/* 底部按钮 */}
          <div className="relative z-10 w-full max-w-xs mx-auto space-y-2 pb-2">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('fan_cards');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              步入汉宫乐府 · 辨析舞姿
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 1: 舞姿胶片卡片展示区 (三张舞姿卡从卡片底端打光，呈现胶片质感与深色背景区分)
          ========================================================================= */}
      {phase === 'fan_cards' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          {/* 🚨【PAGE 1: 舞姿卡片页背景底图 - 可一键替换】🚨 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE3_BACKGROUNDS.page1_fan_cards}
              alt="舞姿卡背景"
              className="w-full h-full object-cover filter brightness-[0.45] saturate-85"
            />
            {/* 80% 遮罩效果 */}
            <div className="absolute inset-0 bg-[#0B0806]/80" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="第三章 · 翘袖折腰舞姿" />
          </div>

          {/* Center 3 Vertical Film Strips (三张竖向影像胶片，卡片底端打光，带胶片齿孔与暖金投光) */}
          <div
            className="relative flex-1 flex items-center justify-center my-auto w-full max-h-[350px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {DANCE_POSES.map((pose, idx) => {
              const offset = idx - activeCardIndex;
              const isActive = idx === activeCardIndex;

              let transformStyle = '';
              let zIndexClass = 'z-10';
              let opacityClass = 'opacity-35 scale-85';

              if (isActive) {
                transformStyle = 'translateX(0px) rotate(0deg) scale(1)';
                zIndexClass = 'z-30';
                opacityClass = 'opacity-100';
              } else if (offset === 1 || offset === -2) {
                transformStyle = 'translateX(80px) rotate(5deg) scale(0.9)';
                zIndexClass = 'z-20';
                opacityClass = 'opacity-65';
              } else if (offset === -1 || offset === 2) {
                transformStyle = 'translateX(-80px) rotate(-5deg) scale(0.9)';
                zIndexClass = 'z-20';
                opacityClass = 'opacity-65';
              }

              return (
                <div
                  key={pose.id}
                  onClick={() => {
                    soundFX.playStoneDrum();
                    setActiveCardIndex(idx);
                  }}
                  style={{
                    transform: transformStyle,
                    transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  className={`absolute w-[195px] sm:w-[220px] h-[290px] sm:h-[320px] rounded-2xl bg-[#120A07] overflow-hidden cursor-pointer flex flex-col justify-between transition-shadow duration-300 ${zIndexClass} ${opacityClass} ${
                    isActive
                      ? 'shadow-[0_20px_45px_rgba(214,168,75,0.25),0_10px_30px_rgba(0,0,0,0.95)] border border-[#C8943D]/50'
                      : 'shadow-[0_10px_30px_rgba(0,0,0,0.9)] border border-[#4A3222]/40'
                  }`}
                >
                  {/* 顶部胶片齿孔 (Top Film Sprockets) */}
                  <div className="w-full h-3.5 bg-[#080402] flex items-center justify-around px-2 pointer-events-none shrink-0 border-b border-[#2A1810]">
                    {[1, 2, 3, 4, 5, 6].map((k) => (
                      <span key={k} className="w-1.5 h-1.5 rounded-[1px] bg-[#3B2216]/80" />
                    ))}
                  </div>

                  {/* 舞姿人物主体 (顶格卡片展示) */}
                  <div className="relative w-full flex-1 overflow-hidden flex items-center justify-center p-0 bg-[#0E0705]">
                    <img
                      src={pose.imageSrc}
                      alt={pose.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(241,217,141,0.5)] scale-105"
                    />

                    {/* =========================================================================
                        💡【卡片底端打光 · 胶片质感高光层】
                        从卡片底部向上投射微暖琥珀投影光束，增强电影胶片质感并与深色背景清晰区分
                        ========================================================================= */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-28 pointer-events-none mix-blend-screen"
                      style={{
                        background: 'linear-gradient(to top, rgba(255,225,130,0.45) 0%, rgba(214,168,75,0.18) 45%, transparent 100%)',
                      }}
                    />

                    {/* 胶片微粒磨砂质感覆层 */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 han-mural-texture" />

                    {/* 激活卡片底部高亮发光边缘线 */}
                    {isActive && (
                      <div className="absolute inset-x-2 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFE898] to-transparent shadow-[0_0_12px_#FFE898] pointer-events-none" />
                    )}
                  </div>

                  {/* 底部胶片齿孔 (Bottom Film Sprockets) */}
                  <div className="w-full h-3.5 bg-[#080402] flex items-center justify-around px-2 pointer-events-none shrink-0 border-t border-[#2A1810]">
                    {[1, 2, 3, 4, 5, 6].map((k) => (
                      <span key={k} className="w-1.5 h-1.5 rounded-[1px] bg-[#3B2216]/80" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 轮播指示点 */}
          <div className="relative z-10 flex items-center justify-center gap-2 mb-1">
            {DANCE_POSES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFX.playStoneDrum();
                  setActiveCardIndex(idx);
                }}
                className={`transition-all rounded-full ${
                  activeCardIndex === idx
                    ? 'w-5 h-1.5 bg-[#D6A84B] shadow-[0_0_8px_#F1D98D]'
                    : 'w-1.5 h-1.5 bg-[#8C6D46]/60 hover:bg-[#D6A84B]/60'
                }`}
              />
            ))}
          </div>

          {/* 底部按钮 */}
          <div className="relative z-10 w-full max-w-xs mx-auto pb-2">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('dance_video');
              }}
              size="md"
              className="w-full"
              leftIcon={<Play className="w-3.5 h-3.5 fill-current text-[#D6A84B]" />}
            >
              观看舞姿视频
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: 舞姿视频播放页面 (无边框版，背景底图80%遮罩，视频下方左右出现无边框小暗金字“上一式”“下一式”按键)
          ========================================================================= */}
      {phase === 'dance_video' && (
        <ChapterVideoPageView
          chapterNumber="03"
          englishTitle="FOLDING WAIST & SLEEVES"
          chineseTitle="翘 袖 折 腰"
          subtitle={VIDEO_DANCE_STYLES[activeVideoPoseIndex].subtitle}
          videoSrc={STAGE_VIDEOS.stage3_gallery.url}
          videoAssetPathHint="public/assets/videos/sleeve_dance.mp4"
          // 🚨【PAGE 2: 翘袖折腰视频页背景底图 - 80% 遮罩】🚨
          bgImage={STAGE3_BACKGROUNDS.page2_video}
          palette="sleeve"
          completeButtonText="完成观看 · 步入舞姿辨析"
          onSkip={() => {
            setPhase('select_quiz');
          }}
          onComplete={() => {
            setPhase('select_quiz');
          }}
          // 舞姿视频左右切换按键: 无边框小暗金字
          onPrevPose={() => {
            setActiveVideoPoseIndex((prev) => (prev - 1 + VIDEO_DANCE_STYLES.length) % VIDEO_DANCE_STYLES.length);
          }}
          onNextPose={() => {
            setActiveVideoPoseIndex((prev) => (prev + 1) % VIDEO_DANCE_STYLES.length);
          }}
          currentPoseLabel={`【${VIDEO_DANCE_STYLES[activeVideoPoseIndex].name}】`}
        />
      )}

      {/* =========================================================================
          STEP 3: 辨识玉舞人真容舞姿答题页面
          要求：
          1. 选项方条整体放大到左右能接近手机屏幕 (w-[95%] max-w-md mx-auto)
          2. 选项方条左侧方形黑框替换成舞姿卡上的舞姿图片 (在代码中明确标出位置，方便一键替换)
          ========================================================================= */}
      {phase === 'select_quiz' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden font-serif">
          {/* 🚨【PAGE 3: 辨析答题页背景底图 - 可一键替换】🚨 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE3_BACKGROUNDS.page3_select_quiz}
              alt="答题背景底图"
              className="w-full h-full object-cover filter brightness-[0.45] saturate-85"
            />
            {/* 80% 遮罩效果 */}
            <div className="absolute inset-0 bg-[#0B0806]/80" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="辨识玉舞人真容舞姿" />
          </div>

          <div className="relative z-10 text-center px-2 my-0.5">
            <h4 className="text-xs sm:text-sm font-black text-[#F1D98D] tracking-wider">
              选哪一个舞姿是大葆台博物馆玉舞人的舞姿？
            </h4>
            <p className="text-[8.5px] sm:text-[9.5px] text-[#A89078] mt-0.5">
              点击下方选项方条辨析，正确答案将唤醒大葆台玉舞人沉睡记忆
            </p>
          </div>

          {/* 
            =====================================================================
            🚨【放大选项整体宽度接近手机屏幕 (w-[95%] max-w-md mx-auto)】🚨
            每个选项方条左侧呈现舞姿卡对应图片，右侧显示标题与说明
            =====================================================================
          */}
          <div className="relative z-10 flex flex-col gap-2.5 my-auto px-1 w-[95%] sm:w-[94%] max-w-md mx-auto">
            {DANCE_POSES.map((pose) => {
              const isSelected = selectedPoseCode === pose.code;
              const isCorrectCard = pose.code === 'C';

              return (
                <button
                  key={pose.id}
                  onClick={() => handleSelectQuizOption(pose.code)}
                  className={`relative w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all duration-300 shadow-lg active:scale-98 cursor-pointer ${
                    isSelected
                      ? isCorrectCard
                        ? 'bg-gradient-to-r from-[#203627] to-[#142218] border border-[#79B9A1]/80 shadow-[0_0_18px_rgba(121,185,161,0.45)]'
                        : 'bg-gradient-to-r from-[#3B1510] to-[#250E0A] border border-[#C84B31]/70 shadow-[0_0_15px_rgba(200,75,49,0.4)]'
                      : 'bg-[#180E0A]/95 hover:bg-[#20130E] border border-[#4A3222]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* 
                      ===========================================================
                      🚨【选项方条左侧舞姿图片 (替换原先方形黑框，显眼代码方便一键替换)】🚨
                      =========================================================== 
                    */}
                    <div className="relative w-12 h-14 sm:w-14 sm:h-16 rounded-lg bg-[#0C0604] border border-[#8C6D46]/40 flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-inner">
                      <img
                        src={pose.imageSrc}
                        alt={pose.title}
                        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(241,217,141,0.35)]"
                      />
                      {/* 选项角标 */}
                      <span className="absolute bottom-0 right-0 px-1 rounded-tl-sm bg-[#3B2216]/90 text-[7.5px] font-mono font-bold text-[#F1D98D]">
                        {pose.code}
                      </span>
                    </div>

                    {/* 选项文字信息 */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-[#D6A84B]">
                          【{pose.code}】
                        </span>
                        <span className="text-xs sm:text-sm font-serif font-black text-[#F1D98D] tracking-wide">
                          {pose.title}
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-[#C4B298] line-clamp-1 mt-0.5">
                        {pose.subtitle}
                      </span>
                    </div>
                  </div>

                  {isSelected && isCorrectCard && (
                    <CheckCircle2 className="w-5 h-5 text-[#79B9A1] shrink-0 animate-bounce mr-1.5" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative z-40 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '大葆台玉舞人雕琢精美，特点是身姿反折如月、长袖凌空起伏。',
                '右臂扬袖拂云、左臂折腰下垂探水，刚柔并济，尽展大汉神韵。',
                '正确答案为【C · 翘袖折腰】舞姿。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 4: 成功反馈对白
          ========================================================================= */}
      {phase === 'success_dialogue' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          {/* 🚨【PAGE 4: 苏醒对白页背景底图 - 可一键替换】🚨 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE3_BACKGROUNDS.page4_success}
              alt="苏醒背景底图"
              className="w-full h-full object-cover filter brightness-[0.4] saturate-85"
            />
            {/* 80% 遮罩效果 */}
            <div className="absolute inset-0 bg-[#0B0806]/80" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2">
            <div className="w-20 h-20 rounded-full bg-[#1A2E26] border border-[#79B9A1]/50 flex items-center justify-center shadow-[0_0_25px_rgba(121,185,161,0.5)]">
              <CheckCircle2 className="w-10 h-10 text-[#79B9A1]" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-black text-[#79B9A1] tracking-wider">
                舞姿合律 · 器灵苏醒
              </h3>
              <p className="text-[10px] text-[#E6D3AA]/80 mt-0.5">
                翘袖折腰，刚柔相济，大葆台汉墓深处乐音重现
              </p>
            </div>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE3_SUCCESS}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('bamboo_slip');
              }}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 5: 记忆归位 · 深色木纹竹简页面 (无弹窗，完整呈现实图1竹简筒)
          ========================================================================= */}
      {phase === 'bamboo_slip' && (
        <div className="fixed inset-0 z-50 bg-[#0B0806] flex flex-col items-center justify-center animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={3}
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
