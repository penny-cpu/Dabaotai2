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
}

const FUNERARY_ARTIFACTS: FuneraryArtifact[] = [
  {
    id: 'cai_hui_pot',
    name: '彩绘云气陶壶',
    material: '泥质灰陶 · 朱墨彩绘',
    motif: '壶腹彩绘灵动飞禽与流转云气纹',
    isCorrect: true,
    tag: '核心随葬礼器',
    desc: '大葆台汉墓出土代表性陶制随葬礼器，通体以朱墨彩绘翻卷回旋之流云与仙禽神兽。生前用于宴饮盛酒，身后随葬以期通达仙境，完美凝固了大汉生死长乐的云气祈愿。',
  },
  {
    id: 'xing_yun_mirror',
    name: '星云纹铜镜',
    material: '青铜铸造 · 镜背乳丁',
    motif: '镜背铸造云气纹与规整星乳',
    isCorrect: false,
    tag: '随葬铜镜',
    desc: '铜铸随葬照人铜镜，镜背虽铸有星云纹，但非泥质朱墨彩绘之盛酒礼器。',
  },
  {
    id: 'gui_feng_bi',
    name: '透雕规矩玉璧',
    material: '白玉质地 · 镂空透雕',
    motif: '博局纹与方折龙凤透雕纹',
    isCorrect: false,
    tag: '祭天礼玉',
    desc: '诸侯王侯祭天礼玉与佩饰，质地温润，但非翻卷朱墨云气的陶制随葬礼壶。',
  },
  {
    id: 'lacquer_yushang',
    name: '朱雀纹漆羽觞',
    material: '木胎红黑大漆 · 描金彩绘',
    motif: '朱漆描金灵禽双耳羽觞',
    isCorrect: false,
    tag: '宴饮漆器',
    desc: '宴饮所用双耳羽觞漆杯，造型轻巧，但非大葆台送葬礼乐核心陶制容礼器。',
  },
  {
    id: 'pottery_dancer',
    name: '彩绘陶舞俑',
    material: '泥质红陶 · 广袖翻飞',
    motif: '长袖折腰随葬陶塑舞人',
    isCorrect: false,
    tag: '随葬陶俑',
    desc: '随葬乐舞人偶，塑长袖翻卷之态，陪伴墓主灵魂升天，但非容酒承礼之云纹陶壶。',
  },
  {
    id: 'bronze_bell',
    name: '蟠螭纹编钟',
    material: '青铜铸造 · 错金银纹',
    motif: '宗庙燕乐重器 · 蟠螭流云',
    isCorrect: false,
    tag: '宗庙乐悬',
    desc: '诸侯王送葬金石乐悬，音律宏亮庄严肃穆，非彩绘泥质陶器。',
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

      {/* STEP 1: 前置对白 */}
      {phase === 'intro' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第五章 · 送葬长袖与长乐" />
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2.5">
            <div className="w-18 h-18 rounded-full bg-[#2E1A11]/80 border-0 relative flex items-center justify-center shadow-[0_0_25px_rgba(214,168,75,0.4)] animate-pulse">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#C8943D]" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#C8943D]" />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#C8943D]" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#C8943D]" />
              <Disc className="w-9 h-9 text-[#F1D98D]" />
            </div>
            <div className="text-center space-y-0.5">
              <span className="text-[9.5px] font-mono text-[#C8943D]">大汉广阳国 · 送葬礼仪</span>
              <h3 className="text-sm font-black text-[#F1D98D]">长乐未央 · 礼乐相送</h3>
            </div>
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

      {/* STEP 3: 线索对白 */}
      {phase === 'dialogue_anomaly' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第五章 · 送葬长袖与长乐" />
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2.5">
            <div className="w-18 h-18 rounded-full bg-[#2E1A11]/80 border-0 relative flex items-center justify-center shadow-[0_0_25px_rgba(214,168,75,0.4)] animate-pulse">
              <Sparkles className="w-9 h-9 text-[#F1D98D]" />
            </div>
            <div className="text-center space-y-0.5">
              <span className="text-[9.5px] font-mono text-[#C8943D]">大汉送葬礼仪 · 记忆线索</span>
              <h3 className="text-sm font-black text-[#F1D98D]">朱墨翻卷 · 云气陶壶</h3>
            </div>
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

      {/* STEP 4: 交互输入 (昏暗墓室手电筒考古探照，5-7件文物剪影显形，微透考古辨识框，照片/图录移至下方，平行上移防遮挡) */}
      {phase === 'interactive_input' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between animate-fade-in p-2 pb-1 overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="寻找送葬礼乐文物" />
          </div>

          {/* 昏暗墓室氛围 + 6件随葬文物剪影探照区 */}
          <div className="relative z-10 w-full max-w-sm mx-auto px-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[8.5px] font-mono text-[#C8943D] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#79B9A1] animate-ping" />
                墓室暗处考古探照 · 点击显形
              </span>
              <span className="text-[8px] font-serif text-[#A89078]">
                {selectedArtifact ? '已锁定文物' : '请开启手电光束'}
              </span>
            </div>

            {/* 6件文物剪影排布 (昏暗墓室氛围，点击打出一束青白色手电高光) */}
            <div className="grid grid-cols-3 gap-1.5">
              {FUNERARY_ARTIFACTS.map((art) => {
                const isSelected = selectedArtifact?.id === art.id;
                return (
                  <button
                    key={art.id}
                    onClick={() => {
                      soundFX.playStoneDrum();
                      setSelectedArtifact(art);
                      setErrorTip('');
                    }}
                    className={`relative p-2 rounded-xl transition-all duration-300 flex flex-col items-center justify-between min-h-[64px] sm:min-h-[70px] overflow-hidden ${
                      isSelected
                        ? 'bg-[radial-gradient(circle_at_50%_30%,rgba(200,245,255,0.45)_0%,rgba(100,200,230,0.18)_60%,rgba(20,12,8,0.95)_100%)] border border-[#79B9A1] shadow-[0_0_20px_rgba(121,185,161,0.5)] scale-102'
                        : 'bg-[#140C08]/90 hover:bg-[#1C110B] border border-[#3E2316]/50'
                    }`}
                  >
                    {/* 考古手电筒青白色聚光顶标 */}
                    {isSelected && (
                      <div className="absolute top-1 right-1 flex items-center gap-0.5 bg-[#E0F7FA]/90 text-black px-1 py-0.2 rounded text-[6.5px] font-bold shadow">
                        <Zap className="w-2 h-2 text-[#00838F]" />
                        <span>探照</span>
                      </div>
                    )}

                    {/* 文物剪影显形 / 幽暗隐形 */}
                    <div className="my-auto flex items-center justify-center relative w-full h-8 sm:h-9">
                      {art.id === 'cai_hui_pot' ? (
                        <div className={`transition-all duration-500 ${isSelected ? 'brightness-125 filter drop-shadow-[0_0_8px_rgba(241,217,141,0.9)]' : 'opacity-35 brightness-40 contrast-150'}`}>
                          <Disc className="w-7 h-7 sm:w-8 sm:h-8 text-[#D6A84B]" />
                        </div>
                      ) : art.id === 'xing_yun_mirror' ? (
                        <div className={`transition-all duration-500 ${isSelected ? 'brightness-125 filter drop-shadow-[0_0_8px_rgba(121,185,161,0.9)]' : 'opacity-35 brightness-40 contrast-150'}`}>
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-current text-[#79B9A1] flex items-center justify-center font-bold text-[8px]">
                            镜
                          </div>
                        </div>
                      ) : art.id === 'gui_feng_bi' ? (
                        <div className={`transition-all duration-500 ${isSelected ? 'brightness-125 filter drop-shadow-[0_0_8px_rgba(241,217,141,0.9)]' : 'opacity-35 brightness-40 contrast-150'}`}>
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-dashed border-[#F1D98D] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full border border-[#F1D98D]" />
                          </div>
                        </div>
                      ) : art.id === 'lacquer_yushang' ? (
                        <div className={`transition-all duration-500 ${isSelected ? 'brightness-125 filter drop-shadow-[0_0_8px_rgba(185,58,43,0.9)]' : 'opacity-35 brightness-40 contrast-150'}`}>
                          <div className="w-7 h-4 rounded-[6px] border border-[#B93A2B] bg-[#B93A2B]/40 flex items-center justify-center text-[7px] text-[#F1D98D]">
                            羽觞
                          </div>
                        </div>
                      ) : art.id === 'pottery_dancer' ? (
                        <div className={`transition-all duration-500 ${isSelected ? 'brightness-125 filter drop-shadow-[0_0_8px_rgba(241,217,141,0.9)]' : 'opacity-35 brightness-40 contrast-150'}`}>
                          <div className="w-6 h-7 border border-[#C8943D] rounded-t-full flex items-center justify-center text-[7px] text-[#F1D98D]">
                            舞俑
                          </div>
                        </div>
                      ) : (
                        <div className={`transition-all duration-500 ${isSelected ? 'brightness-125 filter drop-shadow-[0_0_8px_rgba(121,185,161,0.9)]' : 'opacity-35 brightness-40 contrast-150'}`}>
                          <div className="w-6 h-6 border-b-2 border-x border-[#79B9A1] rounded-t-sm flex items-center justify-center text-[7px] text-[#79B9A1]">
                            钟
                          </div>
                        </div>
                      )}
                    </div>

                    <span className={`text-[8.5px] sm:text-[9px] font-serif tracking-wider text-center line-clamp-1 ${isSelected ? 'text-[#F1D98D] font-bold' : 'text-[#8C6D46]'}`}>
                      {art.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 中间“考古辨识”框 (微透质感) */}
          <div className="relative z-10 px-2 w-full max-w-sm mx-auto my-0.5">
            <div className="w-full rounded-xl bg-[#160D09]/65 backdrop-blur-md border border-[#D6A84B]/20 p-2 sm:p-2.5 shadow-lg min-h-[64px] flex flex-col justify-center text-center">
              {selectedArtifact ? (
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[7.5px] font-mono text-[#F1D98D] bg-black/60 px-2 py-0.2 rounded-full border border-[#D6A84B]/20">
                      {selectedArtifact.tag}
                    </span>
                    <h4 className="text-xs font-serif font-black text-[#F1D98D]">
                      {selectedArtifact.name}
                    </h4>
                    <span className="text-[8.5px] text-[#79B9A1] font-medium">
                      {selectedArtifact.material}
                    </span>
                  </div>
                  <p className="text-[8px] text-[#E6D3AA]/90 line-clamp-2 leading-relaxed px-1">
                    {selectedArtifact.desc}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-0.5 text-[#8C6D46]">
                  <span className="text-[11px] font-serif text-[#F1D98D] font-bold">
                    考古手电筒待探照
                  </span>
                  <span className="text-[8px] text-[#A89078]">
                    点击上方墓室暗处剪影打出手电高光，或使用下方拍照/图录挑选
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* “照片 / 图录” 两个按键挪到“考古辨识”框的下面 */}
          <div className="relative z-10 flex items-center justify-center gap-2 w-full max-w-sm mx-auto px-1 my-0.5">
            <button
              onClick={handleStartPhotoScan}
              className="relative flex-1 py-1.5 px-2 rounded-lg bg-[#26150E] hover:bg-[#381F15] border border-[#522D18]/70 text-[#E6D3AA] font-serif text-[10.5px] font-semibold tracking-wider shadow active:scale-98 transition-all flex items-center justify-center gap-1"
            >
              <Camera className="w-3 h-3 text-[#C8943D]" />
              <span>拍照比对</span>
            </button>

            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setShowManualModal(true);
              }}
              className="relative flex-1 py-1.5 px-2 rounded-lg bg-[#26150E] hover:bg-[#381F15] border border-[#522D18]/70 text-[#E6D3AA] font-serif text-[10.5px] font-semibold tracking-wider shadow active:scale-98 transition-all flex items-center justify-center gap-1"
            >
              <Edit3 className="w-3 h-3 text-[#C8943D]" />
              <span>图录甄别</span>
            </button>
          </div>

          {/* 确认按钮 (平行上移，完全不被玉舞人线索聊天框遮挡) */}
          <div className="relative z-10 py-0.5 w-full max-w-sm mx-auto px-1">
            <HanPlaqueButton
              onClick={handleConfirmArtifact}
              disabled={!selectedArtifact}
              size="sm"
              className="w-full"
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-[#D6A84B]" />}
            >
              确认随葬文物 · 唤醒礼乐记忆
            </HanPlaqueButton>
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
