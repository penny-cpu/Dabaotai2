import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Camera,
  Edit3,
  X,
  Disc,
  Search,
  Scan,
  Zap,
  Flashlight,
  Move,
} from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar, HanCloudTitle } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { STAGE_VIDEOS } from '../data/videoAssets';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import { MuseumAccessionRecord } from './MuseumAccessionRecord';
import { CHAPTER_BACKGROUNDS, CHAPTER_PAGE_BACKGROUNDS } from '../config/assetRegistry';
import { BambooSlipCollector } from './BambooSlipCollector';
import { ChapterVideoPageView } from './ChapterVideoPageView';

// =========================================================================
// 🚨【第五章各页面背景底图路径配置中心 (方便一键查找与替换)】🚨
// =========================================================================
const STAGE5_BACKGROUNDS = CHAPTER_PAGE_BACKGROUNDS.stage5;

interface Stage5FuneraryProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

export interface FuneraryArtifact {
  id: string;
  name: string;
  material: string;
  motif: string;
  isCorrect: boolean;
  desc: string;
  tag: string;
  // 画像石生活情态壁画中的相对位置 (百分比)
  muralX: number;
  muralY: number;
  sceneRole: string;
}

const FUNERARY_ARTIFACTS: FuneraryArtifact[] = [
  {
    id: 'cai_hui_pot',
    name: '彩绘云气陶壶',
    material: '泥质灰陶 · 朱墨彩绘',
    motif: '壶腹彩绘灵动飞禽与流转云气纹',
    isCorrect: true,
    tag: '核心随葬礼器 (正解)',
    desc: '大葆台汉墓出土代表性陶制随葬礼器，通体以朱墨彩绘翻卷回旋之流云与仙禽神兽。生前用于宴饮盛酒，身后随葬以期通达仙境，完美凝固了大汉生死长乐的云气祈愿。',
    muralX: 52,
    muralY: 48,
    sceneRole: '侍臣恭捧朱墨流云礼酒壶',
  },
  {
    id: 'xing_yun_mirror',
    name: '星云纹铜镜',
    material: '青铜铸造 · 镜背乳丁',
    motif: '镜背铸造云气纹与规整星乳',
    isCorrect: false,
    tag: '随葬铜镜',
    desc: '铜铸随葬照人铜镜，镜背虽铸有星云纹，但非泥质朱墨彩绘之盛酒礼器。',
    muralX: 24,
    muralY: 34,
    sceneRole: '贵妇对镜梳妆照容颜',
  },
  {
    id: 'gui_feng_bi',
    name: '透雕规矩玉璧',
    material: '白玉质地 · 镂空透雕',
    motif: '博局纹与方折龙凤透雕纹',
    isCorrect: false,
    tag: '祭天礼玉',
    desc: '诸侯王侯祭天礼玉与佩饰，质地温润，但非翻卷朱墨云气的陶制随葬礼壶。',
    muralX: 78,
    muralY: 32,
    sceneRole: '宗庙祭台悬挂礼玉璧',
  },
  {
    id: 'lacquer_yushang',
    name: '朱雀纹漆羽觞',
    material: '木胎红黑大漆 · 描金彩绘',
    motif: '朱漆描金灵禽双耳羽觞',
    isCorrect: false,
    tag: '宴饮漆器',
    desc: '宴饮所用双耳羽觞漆杯，造型轻巧，但非大葆台送葬礼乐核心陶制容礼器。',
    muralX: 36,
    muralY: 65,
    sceneRole: '乐人筵席双手进爵酒',
  },
  {
    id: 'pottery_dancer',
    name: '彩绘陶舞俑',
    material: '泥质红陶 · 广袖翻飞',
    motif: '长袖折腰随葬陶塑舞人',
    isCorrect: false,
    tag: '随葬陶俑',
    desc: '随葬乐舞人偶，塑长袖翻卷之态，陪伴墓主灵魂升天，但非容酒承礼之云纹陶壶。',
    muralX: 82,
    muralY: 66,
    sceneRole: '袖舞侍女翩跹翘袖折腰',
  },
  {
    id: 'bronze_bell',
    name: '蟠螭纹编钟',
    material: '青铜铸造 · 错金银纹',
    motif: '宗庙燕乐重器 · 蟠螭流云',
    isCorrect: false,
    tag: '宗庙乐悬',
    desc: '诸侯王送葬金石乐悬，音律宏亮庄严肃穆，非彩绘泥质陶器。',
    muralX: 18,
    muralY: 72,
    sceneRole: '乐师悬挂击奏金石钟',
  },
];

const DIALOGUES_STAGE5_INTRO: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '汉代重视丧葬礼仪，诸侯王送葬同样离不开礼乐。送葬队伍启行，舞者以长袖相送。生前的礼乐，也被延续到身后。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这应该是广阳王的送葬队伍。他们手中捧着一件件随葬礼器，似乎要在幽宫中继续诉说生前的长乐未央。',
  },
];

const DIALOGUES_STAGE5_ANOMALY: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '队伍前列那件器物通体朱墨云气翻卷，与送葬长袖交织在一起！快帮我在展柜中通过拍照或手动输入，找到这件【彩绘云气陶壶】！',
  },
];

const DIALOGUES_STAGE5_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '就是它！朱墨流云在陶壶上翻卷，与我们的长袖遥相呼应。生前的宴飨，死后的长乐，大汉的生死观全凝结在这一笔一墨之中了。',
  },
];

export const Stage5Funerary: React.FC<Stage5FuneraryProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<
    | 'guide'
    | 'intro'
    | 'funerary_video'
    | 'dialogue_anomaly'
    | 'interactive_input'
    | 'success_dialogue'
    | 'bamboo_slip'
  >('guide');

  const [selectedArtifact, setSelectedArtifact] = useState<FuneraryArtifact | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  // 🔦 考古暖光手电筒状态 (默认开启或点击开关，滑动/移动照亮壁画，点击辨识)
  const [isTorchOn, setIsTorchOn] = useState<boolean>(true);
  const [torchPos, setTorchPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const muralContainerRef = useRef<HTMLDivElement | null>(null);

  // Photo / Camera Recognition Modal State
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [scanState, setScanState] = useState<'idle' | 'analyzing' | 'matched'>('idle');
  const [matchPercentage, setMatchPercentage] = useState<number>(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Manual Search Modal State
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualSearchQuery, setManualSearchQuery] = useState<string>('');

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleStartPhotoScan = async () => {
    soundFX.playStoneDrum();
    setShowPhotoModal(true);
    setScanState('idle');
    setMatchPercentage(0);
    setCameraError(null);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } else {
        setCameraError('未检测到摄像头设备，将使用大葆台 AR 特征拟真分析');
      }
    } catch {
      setCameraError('摄像头权限未开启或不可用，将使用 AR 智能特征拟真分析');
    }
  };

  const handleClosePhotoModal = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
    setShowPhotoModal(false);
  };

  const handlePerformAnalysis = () => {
    soundFX.playStoneDrum();
    setScanState('analyzing');
    setMatchPercentage(25);

    setTimeout(() => {
      setMatchPercentage(65);
      soundFX.playStoneDrum();
    }, 600);

    setTimeout(() => {
      setMatchPercentage(98.6);
      setScanState('matched');
      soundFX.playBronzeChime();
    }, 1400);
  };

  const handleApplyPhotoArtifact = () => {
    const targetPottery = FUNERARY_ARTIFACTS.find((a) => a.id === 'cai_hui_pot');
    if (targetPottery) {
      setSelectedArtifact(targetPottery);
      handleClosePhotoModal();
      soundFX.playBronzeChime();
    }
  };

  const handleSelectManualArtifact = (artifact: FuneraryArtifact) => {
    soundFX.playStoneDrum();
    setSelectedArtifact(artifact);
    setShowManualModal(false);
  };

  const handleConfirmArtifact = () => {
    if (!selectedArtifact) {
      setErrorTip('请先通过拍照识别或手动输入选定文物！');
      return;
    }

    if (selectedArtifact.id === 'cai_hui_pot') {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('success_dialogue');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('所选文物非以朱墨彩绘云气飞禽的陶制礼器，再推敲一番……');
    }
  };

  const filteredArtifacts = FUNERARY_ARTIFACTS.filter(
    (a) =>
      a.name.includes(manualSearchQuery.trim()) ||
      a.material.includes(manualSearchQuery.trim()) ||
      a.motif.includes(manualSearchQuery.trim()) ||
      a.desc.includes(manualSearchQuery.trim())
  );

  return (
    <div className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806]">
      {/* Visual Background: 送葬云纹烟黑＋朱砂 */}
      <MuseumTombBackdrop palette="funerary" pattern="cloud" spotlight={true} intensity="subtle" />

      {/* STEP 0: 引导页 - 送葬袖舞·云纹 (大标题加回一行小字说明，背景底图：墓室云气雷纹、极淡幽光，玉舞人面朝右，衣袂空中弧线发着幽光云纹) */}
      {phase === 'guide' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-4 animate-fade-in overflow-hidden">
          {/* 背景底图：墓室云气雷纹、极淡幽光氛围，玉舞人面部朝右，衣袂云纹弧线 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={CHAPTER_BACKGROUNDS.stage5_pottery_guide}
              alt="汉代彩绘陶器画像砖"
              className="w-full h-full object-cover filter brightness-[0.45] contrast-125 saturate-90 scale-105"
            />
            {/* 幽光云纹与衣袂弧线 SVG Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806] via-[#0B0806]/70 to-[#0B0806]/50" />
            <svg viewBox="0 0 400 600" className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen">
              {/* 玉舞人朝向右侧的舞动衣袂幽光流线 */}
              <path
                d="M 60 480 C 140 430, 200 360, 270 290 C 330 230, 370 200, 390 150"
                fill="none"
                stroke="#79B9A1"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <path
                d="M 90 500 C 160 460, 220 390, 290 320 C 340 270, 380 230, 395 190"
                fill="none"
                stroke="#D6A84B"
                strokeWidth="2"
                opacity="0.6"
              />
              {/* 云气雷纹符号 */}
              <circle cx="280" cy="300" r="12" fill="none" stroke="#79B9A1" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="340" cy="240" r="16" fill="none" stroke="#D6A84B" strokeWidth="1" strokeDasharray="3 2" />
            </svg>
          </div>

          <HanMuseumTopBar />

          {/* 标题 & 小字说明加回 */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-2 px-4 max-w-sm mx-auto">
            <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              送葬袖舞·云纹
            </h2>
            <p className="text-xs sm:text-sm font-serif text-[#E6D3AA] tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              墓室幽光 · 云气长乐 · 长袖相送
            </p>
            <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
          </div>

          {/* 底部按钮 */}
          <div className="relative z-10 w-full max-w-xs mx-auto pb-2">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('intro');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              探入冥都幽宫 · 寻礼乐陶器
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* STEP 1: 前置对白 (送葬队伍启行·生前盛宴长乐，底图80%遮罩，与对白文字精准匹配) */}
      {phase === 'intro' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          {/* 🚨【第五章送葬袖舞与长乐前置对白背景底图：送葬队伍启行·汉代车马送葬画像，80% 遮罩】🚨 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE5_BACKGROUNDS.page0_guide}
              alt="送葬队伍长乐未央画像壁画"
              className="w-full h-full object-cover filter brightness-70 contrast-110 saturate-85"
            />
            {/* 80% 遮罩 */}
            <div className="absolute inset-0 bg-[#0B0806]/80 backdrop-blur-[0.5px]" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第五章 · 送葬长袖与长乐" />
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center text-center px-4 py-2 space-y-2.5">
            {/* 第一排：长 */}
            <p className="text-[11px] sm:text-xs font-serif text-[#C8943D] tracking-[0.18em] leading-relaxed max-w-xs">
              大汉广阳国 · 西汉诸侯王盛大送葬礼仪
            </p>
            {/* 第二排：短 */}
            <h2 className="text-base sm:text-lg font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              长乐未央
            </h2>
            {/* 第三排：长 */}
            <p className="text-[10.5px] sm:text-xs font-serif text-[#E6D3AA]/90 tracking-[0.14em] leading-relaxed max-w-xs">
              生前万千盛宴欢歌 · 身后长袖翻卷礼乐相送
            </p>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE5_INTRO}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('funerary_video');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 2: 送葬礼仪视频 (统一戈舞全屏无边框页面规格，底图80%遮罩) */}
      {phase === 'funerary_video' && (
        <ChapterVideoPageView
          chapterNumber="05"
          englishTitle="FUNERARY SLEEVES & CLOUD MOTIFS"
          chineseTitle="送葬袖舞·云纹"
          subtitle="生前盛宴 · 身后长乐 · 魂兮归来长袖相招"
          videoSrc={STAGE_VIDEOS.stage5_funerary.url}
          videoAssetPathHint="public/assets/videos/funerary_dance.mp4"
          // 🚨【PAGE 1: 送葬袖舞视频播放页背景底图 - 80% 遮罩 (可直接替换)】🚨
          bgImage={STAGE5_BACKGROUNDS.page1_video}
          palette="funerary"
          completeButtonText="完成观看 · 寻觅随葬陶壶"
          onSkip={() => {
            setPhase('dialogue_anomaly');
          }}
          onComplete={() => {
            setPhase('dialogue_anomaly');
          }}
        />
      )}

      {/* STEP 3: 线索对白 (底图引用: STAGE5_BACKGROUNDS.page3_dialogue，80%遮罩，与玉舞人朱墨云气对白匹配) */}
      {phase === 'dialogue_anomaly' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          {/* 🚨【对白背景底图：送葬队伍朱墨长袖云气画像石，80%遮罩】🚨 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE5_BACKGROUNDS.page3_dialogue}
              alt="送葬队伍长袖与长乐背景"
              className="w-full h-full object-cover filter brightness-70 contrast-110 saturate-85"
            />
            {/* 80% 遮罩 */}
            <div className="absolute inset-0 bg-[#0B0806]/80 backdrop-blur-[0.5px]" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第五章 · 送葬长袖与长乐" />
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center text-center px-4 py-2 space-y-2.5">
            {/* 第一排：长 */}
            <p className="text-[11px] sm:text-xs font-serif text-[#C8943D] tracking-[0.18em] leading-relaxed max-w-xs">
              大汉送葬礼制 · 寻觅外藏椁长乐未央线索
            </p>
            {/* 第二排：短 */}
            <h2 className="text-base sm:text-lg font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              朱墨云气
            </h2>
            {/* 第三排：长 */}
            <p className="text-[10.5px] sm:text-xs font-serif text-[#E6D3AA]/90 tracking-[0.14em] leading-relaxed max-w-xs">
              彩绘陶壶飞禽流云 · 探照寻觅随葬礼乐之器
            </p>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE5_ANOMALY}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('interactive_input');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 4: 交互输入：画像石生活情态壁画 + 考古暖光手电筒移动探照甄别 (整体向上移位，避免偏下) */}
      {phase === 'interactive_input' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between animate-fade-in p-2 pb-1 overflow-hidden select-none">
          {/* 上半部：顶部导航、云纹标题、手电与探照壁画、操作按钮组 (统一置顶上移，紧凑优雅) */}
          <div className="w-full flex flex-col">
            <HanMuseumTopBar />

            <div className="relative z-10 pt-0 pb-0.5">
              <HanCloudTitle title="寻找送葬礼乐文物" />
            </div>

            {/* 🌟 核心区域：画像石生活情态壁画探照台 (包含星云铜镜照面、朱墨陶壶、羽觞宴饮等汉代生活情态) */}
            <div className="relative z-10 w-full max-w-sm mx-auto px-1 flex flex-col justify-start min-h-0 pt-0.5">
            {/* 手电筒控制栏 & 探照提示 */}
            <div className="flex flex-col gap-1 px-1 pb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      soundFX.playStoneDrum();
                      setIsTorchOn((prev) => !prev);
                    }}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-serif border transition-all cursor-pointer ${
                      isTorchOn
                        ? 'bg-[#F1D98D] text-[#1A0E06] border-[#F1D98D] font-bold shadow-[0_0_10px_rgba(241,217,141,0.6)]'
                        : 'bg-[#1C100A] text-[#8C6D46] border-[#4A2612]'
                    }`}
                  >
                    <Flashlight className="w-3 h-3" />
                    <span>{isTorchOn ? '暖光手电已开' : '点击开启手电'}</span>
                  </button>
                  <span className="text-[8px] font-mono text-[#79B9A1] flex items-center gap-0.5">
                    <Move className="w-2.5 h-2.5" />
                    滑动探照画像石
                  </span>
                </div>
                <span className="text-[8px] font-serif text-[#C4A98B]">
                  {selectedArtifact ? `已照见：${selectedArtifact.name}` : '探照人物手中之物'}
                </span>
              </div>

              {/* 🌟 用户明确要求：“将这一页的“移动手电筒光束探照壁画人物、点击锁定朱墨彩绘云气陶壶”这一栏文字放在“暖光手电已开”的按钮下方一行，去掉这一行的边框、只保留文字” */}
              <div className="flex items-center gap-1 text-[8.5px] font-serif text-[#F1D98D] pt-0.5">
                <Flashlight className="w-2.5 h-2.5 text-[#D6A84B] shrink-0" />
                <span className="leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {selectedArtifact
                    ? `已锁定：${selectedArtifact.name}（${selectedArtifact.tag}）· ${selectedArtifact.desc}`
                    : '移动手电筒光束探照壁画人物、点击锁定朱墨彩绘云气陶壶'}
                </span>
              </div>
            </div>

            {/* 🚨 画像石壁画探照视口容器 (黑框：向下拉长一倍，呈现广阔汉代生活画像石全景) 🚨 */}
            <div
              ref={muralContainerRef}
              onMouseMove={(e) => {
                if (!muralContainerRef.current) return;
                const rect = muralContainerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setTorchPos({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
              }}
              onTouchMove={(e) => {
                if (!muralContainerRef.current || e.touches.length === 0) return;
                const rect = muralContainerRef.current.getBoundingClientRect();
                const touch = e.touches[0];
                const x = ((touch.clientX - rect.left) / rect.width) * 100;
                const y = ((touch.clientY - rect.top) / rect.height) * 100;
                setTorchPos({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
              }}
              className="relative w-full h-[275px] sm:h-[300px] rounded-xl overflow-hidden border border-[#522D18] shadow-[inset_0_0_30px_rgba(0,0,0,0.95)] cursor-crosshair bg-[#060403]"
            >
              {/* 底图：容纳六个文物的画像石壁画 (生活情态：照镜、执壶、进酒、舞袖、击钟、设祭) */}
              <img
                src={STAGE5_BACKGROUNDS.page2_pottery_torch}
                alt="大汉送葬礼乐画像石生活壁画"
                className="w-full h-full object-cover filter contrast-115 select-none pointer-events-none"
              />

              {/* 沉浸暗光层 (手电未开启时全暗，开启时透过暖黄色聚光光束圈) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: isTorchOn
                    ? `radial-gradient(circle 105px at ${torchPos.x}% ${torchPos.y}%, rgba(255, 235, 175, 0.16) 0%, rgba(241, 217, 141, 0.09) 45%, rgba(6, 4, 3, 0.88) 75%, rgba(6, 4, 3, 0.96) 100%)`
                    : 'rgba(6, 4, 3, 0.94)',
                }}
              />

              {/* 暖光手电筒光晕圈 (随坐标移动) */}
              {isTorchOn && (
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-[#F1D98D]/30 shadow-[0_0_45px_rgba(241,217,141,0.35)] mix-blend-screen transition-transform duration-75 ease-out"
                  style={{ left: `${torchPos.x}%`, top: `${torchPos.y}%` }}
                >
                  <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,248,220,0.35)_0%,rgba(214,168,75,0.15)_50%,transparent_70%)]" />
                </div>
              )}

              {/* 6 个文物在画像石生活情态中的互动触发点 (照镜、端壶、舞袖、敲钟等) */}
              {FUNERARY_ARTIFACTS.map((art) => {
                const isSelected = selectedArtifact?.id === art.id;
                // 计算手电光束中心与文物位置的距离
                const dx = torchPos.x - art.muralX;
                const dy = torchPos.y - art.muralY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const isIlluminated = isTorchOn && dist < 22;

                return (
                  <button
                    key={art.id}
                    onClick={() => {
                      soundFX.playStoneDrum();
                      setSelectedArtifact(art);
                      setErrorTip('');
                      // 将手电筒光束吸附移动到选中的文物上
                      setTorchPos({ x: art.muralX, y: art.muralY });
                    }}
                    style={{ left: `${art.muralX}%`, top: `${art.muralY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group p-1 rounded-full transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'scale-125 z-30'
                        : isIlluminated
                        ? 'scale-110 z-20'
                        : 'scale-90 z-10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* 环形光标 & 角标提示 */}
                    <div
                      className={`relative px-1.5 py-0.5 rounded-full flex items-center gap-1 text-[7.5px] font-serif border backdrop-blur-xs transition-all ${
                        isSelected
                          ? 'bg-[#F1D98D] text-black border-[#F1D98D] font-black shadow-[0_0_12px_rgba(241,217,141,0.9)]'
                          : isIlluminated
                          ? 'bg-[#2E1A11]/90 text-[#F1D98D] border-[#D6A84B] shadow-[0_0_8px_rgba(214,168,75,0.7)]'
                          : 'bg-black/80 text-[#A89078] border-[#4A2612]/60'
                      }`}
                    >
                      {art.id === 'cai_hui_pot' && <Disc className="w-2.5 h-2.5 text-current animate-spin" style={{ animationDuration: '6s' }} />}
                      <span>{art.name}</span>
                    </div>

                    {/* 生活情态浮层标签 (在手电照射或选中时展现生活情态，如：贵妇照镜、侍臣捧壶) */}
                    {(isSelected || isIlluminated) && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 whitespace-nowrap bg-black/90 text-[#E6D3AA] text-[7px] font-serif px-1.5 py-0.2 rounded border border-[#D6A84B]/40 shadow pointer-events-none">
                        {art.sceneRole}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 🌟 用户明确要求：“将“拍照对比”和“图录甄别”这两个按键移动到黑框最底边的正下方，紧挨着黑框底边” */}
            <div className="relative z-10 flex items-center justify-center gap-2 w-full px-0.5 mt-1.5">
              <button
                onClick={handleStartPhotoScan}
                className="relative flex-1 py-1.5 px-2 rounded-md bg-[#26150E] hover:bg-[#381F15] border border-[#522D18] text-[#E6D3AA] font-serif text-[9.5px] font-semibold shadow active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#C8943D]" />
                <span>拍照对比</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  setShowManualModal(true);
                }}
                className="relative flex-1 py-1.5 px-2 rounded-md bg-[#26150E] hover:bg-[#381F15] border border-[#522D18] text-[#E6D3AA] font-serif text-[9.5px] font-semibold shadow active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C8943D]" />
                <span>图录甄别</span>
              </button>
            </div>

            {/* 🌟 用户明确要求：“将确认按钮移动到“拍照对比”这一行的正下方，紧挨着“拍照对比”按键的底边，两者之间紧留一点空隙。” */}
            <div className="relative z-20 w-full px-0.5 mt-1">
              <HanPlaqueButton
                onClick={handleConfirmArtifact}
                disabled={!selectedArtifact}
                size="sm"
                className="w-full shadow-lg"
                leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-[#D6A84B]" />}
              >
                确认随葬文物 · 唤醒礼乐记忆
              </HanPlaqueButton>
            </div>
          </div>
          </div>

          <div className="relative z-40 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '此文物通体施以朱墨彩绘，腹部绘有流转翻飞的云气纹与仙禽神兽。',
                '它是一件泥质灰陶制成的随葬重器，既见证了生前的宴饮礼乐，也伴随诸侯王升仙通天。',
                '考工记密录：此器正是【彩绘云气陶壶】！通体朱墨云纹翻卷，乃大葆台汉墓送葬礼仪中连接人间与仙界的瑰宝。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* Camera Modal (去边框，四角暗金细线) */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 animate-fade-in font-serif select-none">
          <div className="w-full flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-1.5">
              <Scan className="w-4 h-4 text-[#79B9A1]" />
              <span className="text-xs font-serif font-bold text-[#E6D3AA]">
                大葆台智能 AR 特征比对
              </span>
            </div>
            <button
              onClick={handleClosePhotoModal}
              className="w-7 h-7 rounded-full bg-black/50 border-0 relative flex items-center justify-center text-[#E6D3AA]"
            >
              <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#C8943D]" />
              <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#C8943D]" />
              <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#C8943D]" />
              <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#C8943D]" />
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden bg-[#1E110A] border-0 flex flex-col items-center justify-between my-auto shadow-2xl p-2.5">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D6A84B]" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D6A84B]" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C8943D]" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C8943D]" />

            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-[#2E1408] via-[#1A0A04] to-[#0D0502] flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full bg-[#3D1E10]/50 border-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-85">
                    <path
                      d="M38 20 L62 20 L60 30 C75 40 82 60 76 80 L24 80 C18 60 25 40 40 30 Z"
                      fill="#2A1409"
                      stroke="#F1D98D"
                      strokeWidth="3"
                    />
                    <path
                      d="M32 55 Q45 42 55 58 Q68 70 50 72 Q35 72 38 60"
                      fill="none"
                      stroke="#9B3D2E"
                      strokeWidth="2.5"
                    />
                    <circle cx="50" cy="18" r="4" fill="#D6A84B" />
                  </svg>
                </div>
              </div>
            )}

            <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-none">
              <div
                className={`w-28 h-32 rounded-xl border border-dashed flex flex-col items-center justify-center transition-all ${
                  scanState === 'matched'
                    ? 'border-[#79B9A1] bg-[#121E14]/60'
                    : 'border-[#D6A84B]/60 bg-black/25'
                }`}
              >
                <span className="text-[8.5px] font-mono text-[#F1D98D] bg-black/70 px-2 py-0.5 rounded-full">
                  {scanState === 'matched' ? '特征高度契合' : '对准展柜陶壶'}
                </span>
              </div>
            </div>

            <div className="relative z-10 w-full flex items-center justify-between px-2 bg-black/70 rounded-full py-1 border-0 backdrop-blur-sm">
              <span className="text-[8.5px] font-mono text-[#E6D3AA]">
                {scanState === 'matched'
                  ? '匹配结果：彩绘云气陶壶'
                  : scanState === 'analyzing'
                  ? '正在提取朱墨云纹特征……'
                  : '请将镜头对准双耳陶壶'}
              </span>
              <span className="text-[8.5px] font-mono text-[#79B9A1] font-bold">
                {matchPercentage.toFixed(1)}% 匹配度
              </span>
            </div>
          </div>

          <div className="w-full max-w-xs space-y-1.5 pb-2">
            {scanState === 'matched' ? (
              <button
                onClick={handleApplyPhotoArtifact}
                className="relative w-full py-2 rounded-lg bg-[#1E2E20] hover:bg-[#283D2B] border-0 text-[#79B9A1] text-xs font-serif font-bold shadow active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#79B9A1]" />
                <span>匹配成功！选入【彩绘云气陶壶】➔</span>
              </button>
            ) : (
              <button
                onClick={handlePerformAnalysis}
                disabled={scanState === 'analyzing'}
                className="relative w-full py-2 rounded-lg bg-[#2E1A11] hover:bg-[#3D2319] border-0 text-[#F1D98D] text-xs font-serif font-bold shadow active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-[#F1D98D]" />
                <span>{scanState === 'analyzing' ? '正在提取纹饰与壶形特征……' : '拍照比对 / 识别文物'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Manual Search Modal (去边框，无角线) */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-3 animate-fade-in font-serif select-none">
          <div className="w-full flex items-center justify-between px-2 pt-1">
            <span className="text-xs font-serif font-bold text-[#E6D3AA]">
              手动输入与检索送葬礼乐文物
            </span>
            <button
              onClick={() => setShowManualModal(false)}
              className="w-7 h-7 rounded-full bg-black/40 border-0 relative flex items-center justify-center text-[#E6D3AA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full max-w-sm mt-2 px-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-3.5 h-3.5 text-[#C8943D]" />
              <input
                type="text"
                value={manualSearchQuery}
                onChange={(e) => setManualSearchQuery(e.target.value)}
                placeholder="输入文物名称或特征（如：彩绘、云气、陶壶）"
                className="w-full py-1.5 pl-8 pr-3 rounded-lg bg-[#1A0E09] border-0 text-xs text-[#F1D98D] placeholder-[#8C6D46] focus:outline-none"
              />
            </div>
          </div>

          <div className="w-full max-w-sm flex-1 overflow-y-auto space-y-2 my-2 px-2 py-1">
            {filteredArtifacts.map((artifact) => (
              <div
                key={artifact.id}
                onClick={() => handleSelectManualArtifact(artifact)}
                className={`relative p-3 rounded-xl border-0 transition-all cursor-pointer flex flex-col space-y-1 ${
                  selectedArtifact?.id === artifact.id
                    ? 'bg-[#2E1A11] shadow-[0_0_15px_rgba(214,168,75,0.3)]'
                    : 'bg-[#1E110A]/85'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-[#F1D98D]">{artifact.name}</h5>
                  <span className="text-[8px] font-mono text-[#79B9A1] bg-[#121E14] px-2 py-0.5 rounded-full border-0">
                    {artifact.tag}
                  </span>
                </div>
                <span className="text-[9px] text-[#C8943D]">{artifact.material}</span>
                <p className="text-[8.5px] text-[#E6D3AA]/85 line-clamp-2 leading-relaxed">
                  {artifact.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full max-w-sm text-center pb-1">
            <span className="text-[9.5px] text-[#A89078]">
              点击任一文物即可选入送葬文物卡槽
            </span>
          </div>
        </div>
      )}

      {/* STEP 5: 成功对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative my-auto flex flex-col items-center justify-center">
            <MuseumAccessionRecord
              memoryIndex={5}
              title="彩绘陶壶"
              subtitle="大葆台一号汉墓出土 · 彩绘云气飞禽纹陶壶"
              accessionCode="DBT-M1-05"
              material="陶质 / 朱墨彩绘飞禽流云"
              excavationSite="大葆台一号汉墓外藏椁"
              era="西汉 · 昭宣时期"
              category="大汉礼乐 · 送葬长乐"
            />
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE5_SUCCESS}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('bamboo_slip');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 6: 记忆恢复·竹简收集 (黑漆漆墓室背景，彩绘陶壶轮廓与红色云气纹) */}
      {phase === 'bamboo_slip' && (
        <BambooSlipCollector
          stageNumber={5}
          customBgType="pottery_clouds"
          onProceed={() => {
            onUnlockFragment();
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
