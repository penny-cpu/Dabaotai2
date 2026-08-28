import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Camera, RefreshCw, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';

interface Stage2BanquetProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_START: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '【嚼嚼嚼……瑟阮声全被吞了……他们脸上的记忆全成了死灰……】',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这里本该有瑟阮乐声与朋友们的欢笑。我记得他们，却看不清他们的脸。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '把现实中的展陈宴席带回来。位置重叠对齐，记忆就会回应。',
  },
];

const DIALOGUES_RESTORED: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '吱吱吱，这里净化了，快退至墓穴深处……！',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我想起他们了！胸前佩饰归位，长乐宴饮重新开席！',
  },
];

export const Stage2Banquet: React.FC<Stage2BanquetProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [activeDialogues, setActiveDialogues] = useState<DialogueLine[]>(DIALOGUES_START);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    soundFX.playCrawlerScurry();
  }, []);

  // Start Camera
  const handleStartCamera = async () => {
    soundFX.playStoneDrum();
    setIsCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }
    } catch {
      console.log('Camera streaming active in fallback overlay');
    }
  };

  const handleCapture = () => {
    soundFX.playStoneDrum();
    soundFX.playBronzeChime();
    soundFX.playMemoryRestore();
    setIsSuccess(true);
    onUnlockFragment();
    setActiveDialogues(DIALOGUES_RESTORED);
    setDialogueIdx(0);
    setShowDialogue(true);
    setShowMemoryVideo(true);
  };

  const handleAlignmentError = () => {
    soundFX.playGlitchStatic();
    soundFX.playInsectEating();
    setShowCorruption(true);
    setTimeout(() => setShowCorruption(false), 1400);
  };

  return (
    <div className={`relative w-full h-full text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
      isSuccess ? 'bg-[#1a110a]' : 'bg-[#0e0906]'
    }`}>
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="展陈场景未对齐 · 噪点覆盖了宴席人物面容"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#1c120c] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 2 · BANQUET RECOGNITION
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第二关 · 宴乐 (长乐宴饮与翘袖)
          </h2>
        </div>

        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
          isSuccess ? 'bg-emerald-950 text-emerald-300 border-emerald-600' : 'bg-[#2a170f] text-[#ffb4a2] border-[#5c2d20]'
        }`}>
          {isSuccess ? '宴乐已复 100%' : '面部被噪点抹去'}
        </span>
      </div>

      {/* Main Viewfinder Stage (拍照重叠置于主界面) */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Main Camera / Photograph Overlap Box */}
        <div className={`relative w-full flex-1 rounded-3xl border-2 transition-all duration-700 overflow-hidden flex flex-col items-center justify-center shadow-2xl ${
          isSuccess
            ? 'bg-[#1f140e] border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
            : 'bg-[#0d0705] border-[#5c4033]'
        }`}>
          {isCameraActive ? (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />

              {/* Overlap Silhouette of Han Banquet Figures */}
              <div
                className="absolute inset-0 opacity-45 bg-cover bg-center mix-blend-screen pointer-events-none"
                style={{ backgroundImage: `url(${ASSETS.lifeScroll})` }}
              />

              {/* Viewfinder Overlap Target Rim */}
              <div className="absolute inset-6 border-2 border-dashed border-[#ffe89c]/80 rounded-2xl pointer-events-none flex flex-col items-center justify-center">
                <div className="w-36 h-36 border-2 border-emerald-400/60 rounded-full flex flex-col items-center justify-center animate-pulse bg-black/30 backdrop-blur-[1px]">
                  <Eye className="w-6 h-6 text-emerald-300 mb-1" />
                  <span className="text-[8px] text-[#e6d5b8] bg-black/70 px-2 py-0.5 rounded">
                    对齐展馆宴席人物位置
                  </span>
                </div>
              </div>
            </div>
          ) : isSuccess ? (
            // Restored Banquet Scene
            <div className="relative w-full h-full flex flex-col items-center justify-center p-3 text-center">
              <div
                className="absolute inset-0 bg-cover bg-center filter brightness-110 contrast-110"
                style={{ backgroundImage: `url(${ASSETS.lifeScroll})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500">
                  宴乐记忆重叠成功 · 噪点已消除
                </span>
                <p className="text-xs text-[#ffe89c] font-black">
                  “瑟阮齐鸣，翘袖折腰，宾主尽欢”
                </p>
              </div>
            </div>
          ) : (
            // Dim corrupted state with face noise
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <div
                className="absolute inset-0 opacity-30 bg-cover bg-center filter grayscale"
                style={{ backgroundImage: `url(${ASSETS.lifeScroll})` }}
              />
              <div className="relative z-10 space-y-2 max-w-xs">
                <div className="w-14 h-14 rounded-full bg-black/80 border-2 border-amber-500/80 mx-auto flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                  <Camera className="w-7 h-7 text-amber-300 animate-pulse" />
                </div>
                <div className="text-xs font-black text-[#ffe89c]">
                  空荡宴席 · 乐器无声 · 噪点封印
                </div>
                <p className="text-[10px] text-[#a3805d] leading-relaxed">
                  点击下方“打开相机”，对准现场展陈中的宴乐歌舞区域，以现实的影像冲破怪谈侵蚀。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Viewfinder Controls */}
        <div className="w-full mt-3 space-y-2 z-10">
          {!isSuccess ? (
            !isCameraActive ? (
              <button
                onClick={handleStartCamera}
                className="w-full py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Camera className="w-4 h-4 text-[#ffe89c]" />
                <span>打开相机 · 对准展馆宴乐场景</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCapture}
                  className="flex-1 py-3 bg-amber-700 hover:bg-amber-600 text-white font-serif font-black rounded-2xl border-2 border-amber-300 text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-4 h-4" />
                  <span>按下快门 · 识别并重叠场景</span>
                </button>
              </div>
            )
          ) : (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setShowMemoryVideo(true);
              }}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-serif font-black rounded-2xl border-2 border-emerald-400 text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>胸佩碎片已归位 · 查看宴乐舞蹈视频</span>
            </button>
          )}
        </div>
      </div>

      {/* Video Modal with VideoPlayerPlaceholder (宴乐乐舞视频) */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-3">
            <span className="text-[9px] font-mono text-emerald-300 tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY VIDEO · 第二块碎片归位
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              宴乐记忆 · 翘袖折腰，宾主尽欢
            </h3>
          </div>

          <div className="w-full max-w-xs">
            <VideoPlayerPlaceholder
              title="【广阳王府 · 宴乐乐舞】"
              subtitle="16:9 汉代宴乐动态复原"
              videoSrc="/assets/videos/dance_banquet.mp4"
              posterImage={ASSETS.lifeScroll}
              description="宴乐是汉代宫廷与贵族宴饮的综合礼乐形式，翘袖折腰、琴瑟悠扬，再现汉家盛宴之风。"
              videoAssetPathHint="src/assets/videos/dance_banquet.mp4"
            />
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
              onNextPage();
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>进入第三关 · 浮游</span>
          </button>
        </div>
      )}

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={activeDialogues}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < activeDialogues.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={isSuccess ? 2 : 1}
        />
      )}
    </div>
  );
};
