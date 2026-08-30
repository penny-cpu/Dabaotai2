import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, Play, ArrowRight, Video, Move, Volume2, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HallTransitionPage } from './HallTransitionPage';

interface Stage3GalleryProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

interface DanceVideoOption {
  id: 'A' | 'B' | 'C';
  title: string;
  poseName: string;
  shortDesc: string;
  videoNarration: string;
  isCorrect: boolean;
  angle: number; // Fan blade angle
}

const DANCE_OPTIONS: DanceVideoOption[] = [
  {
    id: 'A',
    title: '视频 A · 盘鼓踏步',
    poseName: '盘鼓舞',
    shortDesc: '一足踏鼓，长袖击磬',
    videoNarration: '【盘鼓舞】舞者轻舒长袖，步法刚健，一足踏于七枚盘鼓之上。鼓声铿锵作响，节奏如骤雨，展现汉代燕乐刚健雄浑之风。',
    isCorrect: false,
    angle: -28,
  },
  {
    id: 'B',
    title: '视频 B · 长袖舒展',
    poseName: '长袖舞',
    shortDesc: '罗衣从风，长袖流云',
    videoNarration: '【长袖舞】双袖扬起如行云流水，身姿轻盈回旋。长袖善舞，多钱善贾，宽袍舒展间尽显大汉盛世浪漫飞扬的宫廷气象。',
    isCorrect: false,
    angle: 0,
  },
  {
    id: 'C',
    title: '视频 C · 翘袖折腰',
    poseName: '翘袖折腰 (玉舞人)',
    shortDesc: '右臂翘霄，左臂探水，深折如月',
    videoNarration: '【翘袖折腰】右臂高翘上扬冲霄，左臂下垂拂地，纤细腰肢反折达到极致弧度。这正是大葆台出土白玉舞人凝固两千年的传世身姿。',
    isCorrect: true,
    angle: 28,
  },
];

const DIALOGUES_STAGE3_INTRO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这些玉器让我想起了自己的身体。汉代舞蹈重长袖、细腰，也讲究刚柔相济。我最熟悉的动作，是“翘袖折腰”。可哪一个视频，才是我的姿态？',
  },
];

const DIALOGUES_STAGE3_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '对，就是这个姿态。翘袖、折腰——这就是我留下来的舞蹈瞬间。玉把动作凝固了，却把两千年前的礼乐保存下来。',
  },
];

export const Stage3Gallery: React.FC<Stage3GalleryProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<'intro_dialogue' | 'fan_stage' | 'success_dialogue' | 'transition'>('intro_dialogue');
  const [selectedVideoId, setSelectedVideoId] = useState<'A' | 'B' | 'C'>('C');
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [activeVideoModalId, setActiveVideoModalId] = useState<'A' | 'B' | 'C'>('C');
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const startXRef = useRef<number>(0);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged sufficiently, switch selection
    const ids: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];
    const currentIdx = ids.indexOf(selectedVideoId);

    if (dragOffset < -30 && currentIdx < 2) {
      soundFX.playSandScratch();
      soundFX.playStoneDrum();
      setSelectedVideoId(ids[currentIdx + 1]);
    } else if (dragOffset > 30 && currentIdx > 0) {
      soundFX.playSandScratch();
      soundFX.playStoneDrum();
      setSelectedVideoId(ids[currentIdx - 1]);
    }
    setDragOffset(0);
  };

  const handleOpenVideo = (id: 'A' | 'B' | 'C', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playBronzeChime();
    setActiveVideoModalId(id);
    setSelectedVideoId(id);
    setShowVideoModal(true);
  };

  const handleNextVideo = () => {
    soundFX.playStoneDrum();
    const ids: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];
    const nextIdx = (ids.indexOf(activeVideoModalId) + 1) % ids.length;
    setActiveVideoModalId(ids[nextIdx]);
    setSelectedVideoId(ids[nextIdx]);
  };

  const handlePrevVideo = () => {
    soundFX.playStoneDrum();
    const ids: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];
    const prevIdx = (ids.indexOf(activeVideoModalId) - 1 + ids.length) % ids.length;
    setActiveVideoModalId(ids[prevIdx]);
    setSelectedVideoId(ids[prevIdx]);
  };

  const handleConfirmAction = () => {
    if (selectedVideoId === 'C') {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('success_dialogue');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……此段舞姿未体现“右臂上扬、左臂下探、细腰反折”之典型特征。');
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
    }
  };

  const activeOption = DANCE_OPTIONS.find((o) => o.id === selectedVideoId) || DANCE_OPTIONS[2];
  const modalOption = DANCE_OPTIONS.find((o) => o.id === activeVideoModalId) || DANCE_OPTIONS[2];

  return (
    <div
      className={`relative w-full h-full text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
        isSuccess ? 'bg-[#18110b]' : 'bg-[#0e0805]'
      }`}
      style={{
        backgroundImage: 'radial-gradient(#26150b 1px, transparent 0)',
        backgroundSize: '16px 16px',
      }}
    >
      {/* Top Bar */}
      <div className="p-2.5 bg-[#1f130b] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-amber-400 font-mono">
            CHAPTER 03 · 玉舞 · 翘袖折腰
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第三章｜玉舞 · 翘袖折腰
          </h2>
        </div>
      </div>

      {/* STEP 1: 玉舞人说明舞姿记忆对白 */}
      {phase === 'intro_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-24 h-24 rounded-full bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-pulse">
              <svg viewBox="0 0 100 120" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]">
                <path
                  d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                  fill="none"
                  stroke="#ffe89c"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="18" r="6" fill="#ffffff" />
              </svg>
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-300">汉代舞蹈精粹 · 长袖细腰</span>
              <h3 className="text-base font-black text-[#ffe89c]">刚柔相济 · 翘袖折腰</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE3_INTRO}
            currentIndex={0}
            onNext={() => {
              soundFX.playStoneDrum();
              setPhase('fan_stage');
            }}
          />
        </div>
      )}

      {/* STEP 2: 扇形卡片左右占满屏幕 + 手指刨动 + 点击卡片弹窗剪影舞蹈播放器 */}
      {phase === 'fan_stage' && (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-3 animate-fade-in pb-36 sm:pb-40">
          {/* Top Instruction Banner */}
          <div className="text-center py-0.5 shrink-0">
            <span className="text-[10px] font-serif text-[#ffe89c] font-bold bg-[#24150b] px-3.5 py-1 rounded-full border border-amber-600/70 shadow inline-flex items-center gap-1.5">
              <Move className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>左右刨动扇面 · 点击卡片观看对应舞姿剪影视频</span>
            </span>
          </div>

          {/* Large Interactive Fan Arc Stage (Three Enlarged Edge-to-Edge Cards) */}
          <div
            onMouseDown={(e) => handlePointerDown(e.clientX)}
            onMouseMove={(e) => handlePointerMove(e.clientX)}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
            onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
            onTouchEnd={handlePointerUp}
            className="relative w-full h-64 flex flex-col items-center justify-end touch-none cursor-grab active:cursor-grabbing overflow-hidden my-auto px-1"
          >
            {/* Fan Background Arc Line */}
            <div className="absolute bottom-2 w-80 h-40 rounded-t-full bg-gradient-to-t from-amber-950/30 via-amber-900/10 to-transparent border-t-2 border-amber-600/30 pointer-events-none" />

            {/* Fan Card Blades Container */}
            <div
              className="relative w-full h-full flex items-end justify-center"
              style={{
                transform: `rotate(${dragOffset * 0.12}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                transformOrigin: 'bottom center',
              }}
            >
              {/* 3 Enlarged Cards Placed Across Width (Left-to-Right Edge Occupied) */}
              {DANCE_OPTIONS.map((opt) => {
                const isSelected = selectedVideoId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleOpenVideo(opt.id)}
                    className={`absolute bottom-6 w-28 sm:w-32 h-52 rounded-t-3xl border-2 transition-all cursor-pointer flex flex-col justify-between p-2.5 shadow-2xl ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#4d2f1a] via-[#331c0e] to-[#1a0f07] border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.7)] z-20 scale-105 ring-2 ring-amber-400/50'
                        : 'bg-gradient-to-b from-[#24160d] via-[#170e08] to-[#0c0603] border-amber-800/70 shadow-lg z-10 opacity-85 hover:opacity-100 hover:scale-102'
                    }`}
                    style={{
                      transform: `rotate(${opt.angle}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Card Top Pill Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-amber-500 text-black border-amber-300 shadow'
                            : 'bg-black/70 text-amber-300 border-amber-900'
                        }`}
                      >
                        {opt.id}
                      </span>
                      {isSelected ? (
                        <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>当前</span>
                        </span>
                      ) : (
                        <span className="text-[7.5px] font-mono text-amber-400/80">点击播放</span>
                      )}
                    </div>

                    {/* Animated Silhouette Dance Figure */}
                    <div className="my-auto flex flex-col items-center justify-center space-y-1.5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-inner ${
                          isSelected
                            ? 'bg-[#1e1109] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                            : 'bg-black/60 border-amber-800/80'
                        }`}
                      >
                        {opt.id === 'A' ? (
                          // Plate Drum Dancer Silhouette
                          <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow">
                            <ellipse cx="50" cy="82" rx="30" ry="8" fill="#b45309" />
                            <circle cx="50" cy="22" r="7" fill="#ffe89c" />
                            <path d="M50 29 L50 55 L40 80 M50 55 L65 70 M45 40 Q25 35 20 20 M55 40 Q75 35 85 25" stroke="#ffe89c" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                          </svg>
                        ) : opt.id === 'B' ? (
                          // Long Sleeve Flowing Silhouette
                          <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow">
                            <circle cx="50" cy="20" r="7" fill="#ffe89c" />
                            <path d="M50 27 L50 60 L45 85 L55 85 M50 38 Q20 30 15 50 Q10 70 30 65 M50 38 Q80 30 85 50 Q90 70 70 65" stroke="#ffe89c" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                          </svg>
                        ) : (
                          // Sleeve High Waist Bent (玉舞人) Silhouette
                          <svg viewBox="0 0 100 100" className="w-10 h-10 filter drop-shadow animate-pulse">
                            <circle cx="48" cy="18" r="6.5" fill="#34d399" />
                            <path d="M48 24 Q35 45 42 62 Q50 75 46 88 M42 35 Q65 15 75 10 M38 42 Q15 60 12 75" stroke="#34d399" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>

                      <div className="text-center">
                        <h4 className="text-[11px] font-black text-[#ffe89c] leading-tight">
                          {opt.poseName}
                        </h4>
                        <p className="text-[7.5px] text-[#c2a385] mt-0.5 line-clamp-1">
                          {opt.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Card Bottom Video Play Trigger Pill */}
                    <div className="w-full">
                      <div
                        className={`w-full py-1 rounded-xl text-[8.5px] font-serif font-black flex items-center justify-center gap-1 border transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-black border-amber-300 shadow'
                            : 'bg-[#29170d] text-amber-300 border-amber-800/80'
                        }`}
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>观看视频</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Fan Bottom Pivot Axis (扇轴) */}
              <div className="absolute -bottom-3 w-11 h-11 rounded-full bg-amber-950 border-3 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.8)] z-30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Active Dance Posture Summary Bar */}
          <div className="p-2 rounded-2xl bg-black/80 border border-amber-600/70 space-y-1 shadow-md shrink-0">
            <div className="flex items-center justify-between text-[9px] font-mono text-amber-300">
              <span className="font-bold flex items-center gap-1">
                <Video className="w-3 h-3 text-amber-400" />
                <span>已选中：{activeOption.title}</span>
              </span>
              <button
                onClick={() => handleOpenVideo(selectedVideoId)}
                className="text-[8.5px] text-amber-300 underline font-serif flex items-center gap-0.5 hover:text-white"
              >
                <span>全屏播放器</span>
                <Play className="w-2 h-2" />
              </button>
            </div>
            <p className="text-[9.5px] text-[#e6d5b8] leading-tight line-clamp-1">
              {activeOption.shortDesc}
            </p>
          </div>

          {/* Standardized Confirm Button - firmly placed ABOVE UnifiedDialogueBox */}
          <div className="w-full z-10 pt-1 mb-1 shrink-0">
            <button
              onClick={handleConfirmAction}
              className="w-full py-2.5 sm:py-3 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 text-black border-amber-400 active:scale-98 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>确认选择 {selectedVideoId} · 唤醒翘袖折腰记忆</span>
            </button>
          </div>

          {/* Interactive Mode: Jade dancer 3-level hints */}
          <UnifiedDialogueBox
            isInteractiveMode={true}
            hints={[
              '玉舞人的经典动作在于衣袖的挥洒与身姿的扭转，展现西汉‘长袖善舞’的独特风采。',
              '注意观察舞者的手臂一扬一探，以及腰部反折的深邃曲度，并非单纯平扬双袖。',
              '正确选项为「翘袖折腰」——右臂高扬、左臂下探、细腰深折，定格汉代玉舞人千古身姿。',
            ]}
            errorTip={errorTip}
            onClearError={() => setErrorTip('')}
          />

          {/* Dance Silhouette Video Player Modal (with Prev / Next Switches) */}
          {showVideoModal && (
            <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3.5 select-none animate-fade-in font-serif overflow-hidden">
              {/* Modal Header */}
              <div className="bg-[#1c130d] border-2 border-amber-600/70 rounded-2xl p-2.5 flex items-center justify-between shadow-2xl shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-amber-400 uppercase tracking-widest">
                      DANCE SILHOUETTE VIDEO
                    </span>
                    <h3 className="text-xs font-black text-[#ffe89c]">
                      {modalOption.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-1 rounded-full bg-[#291b12] text-[#d2b48c] hover:text-white border border-[#4a3424] active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player Main Canvas Theater */}
              <div className="relative w-full aspect-[4/4.5] max-h-[300px] my-auto rounded-3xl bg-gradient-to-b from-[#22130b] via-[#140b06] to-[#0a0503] border-2 border-amber-500/80 p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Background Theater Spotlight & Particles */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none blur-sm" />
                <div className="absolute inset-0 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                {/* Video Top Indicators */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[8.5px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>正在放映 · 汉代剪影舞韵</span>
                  </span>
                  <span className="text-[8.5px] font-mono text-amber-300">
                    {modalOption.id} / 3
                  </span>
                </div>

                {/* Animated Silhouette Dancer in Center Stage */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Glowing circular backdrop */}
                    <div className="absolute w-24 h-24 rounded-full bg-amber-600/20 blur-md animate-pulse" />

                    {modalOption.id === 'A' ? (
                      // Plate Drum Dance Animation
                      <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                        <ellipse cx="60" cy="98" rx="42" ry="10" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                        <ellipse cx="60" cy="94" rx="36" ry="8" fill="#451a03" />
                        <circle cx="60" cy="25" r="9" fill="#ffe89c" />
                        <path d="M60 34 L60 65 L48 94 M60 65 L78 85 M55 46 Q28 40 20 25 M65 46 Q92 40 102 28" stroke="#ffe89c" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      </svg>
                    ) : modalOption.id === 'B' ? (
                      // Flowing Long Sleeve Dance Animation
                      <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                        <circle cx="60" cy="24" r="9" fill="#ffe89c" />
                        <path d="M60 33 L60 70 L54 96 L66 96 M60 46 Q22 35 15 60 Q10 85 35 78 M60 46 Q98 35 105 60 Q110 85 85 78" stroke="#ffe89c" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      </svg>
                    ) : (
                      // Sleeve High Waist Bent (玉舞人) Animation
                      <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_0_16px_rgba(52,211,153,0.9)] animate-pulse">
                        <circle cx="56" cy="20" r="8.5" fill="#a7f3d0" />
                        <path d="M56 28 Q40 54 48 74 Q58 88 54 102 M48 42 Q78 18 90 12 M44 50 Q16 72 12 90" stroke="#a7f3d0" strokeWidth="6" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Video Narration Bar */}
                <div className="relative z-10 p-2.5 rounded-2xl bg-black/80 border border-amber-600/60 shadow-lg">
                  <p className="text-[10px] text-[#f2e6d0] leading-relaxed">
                    {modalOption.videoNarration}
                  </p>
                </div>
              </div>

              {/* Prev / Next Video Switchers + Select Action */}
              <div className="space-y-2 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handlePrevVideo}
                    className="flex-1 py-2 rounded-xl bg-[#24170d] hover:bg-[#382314] border border-amber-600/70 text-[#ffe89c] text-xs font-serif font-bold flex items-center justify-center gap-1 active:scale-95 shadow transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>上一个视频</span>
                  </button>
                  <button
                    onClick={handleNextVideo}
                    className="flex-1 py-2 rounded-xl bg-[#24170d] hover:bg-[#382314] border border-amber-600/70 text-[#ffe89c] text-xs font-serif font-bold flex items-center justify-center gap-1 active:scale-95 shadow transition-all"
                  >
                    <span>下一个视频</span>
                    <ChevronRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    soundFX.playStoneDrum();
                    setSelectedVideoId(modalOption.id);
                    setShowVideoModal(false);
                  }}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:brightness-110 text-black font-serif font-black text-xs border border-amber-300 shadow-xl flex items-center justify-center gap-1.5 active:scale-98 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>确定选择 {modalOption.id} · {modalOption.poseName}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-pulse">
              <Sparkles className="w-10 h-10 text-emerald-300" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                新记忆已收录 · 记忆卡 03
              </span>
              <h3 className="text-base font-black text-[#ffe89c] mt-2">
                卡片 03「翘袖折腰」已点亮
              </h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE3_SUCCESS}
            currentIndex={0}
            onNext={() => {
              setPhase('transition');
            }}
          />
        </div>
      )}

      {/* STEP 4: 过场 PAGE｜前往宴乐百戏图区域 */}
      {phase === 'transition' && (
        <HallTransitionPage
          targetHallName="前方：宴乐百戏图"
          subtitle="玉器们：“别愣着了，前面更热闹。一起去看看汉代百戏吧。”"
          themeColor="red"
          onContinue={() => {
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
