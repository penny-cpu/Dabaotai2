import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Camera, RefreshCw, CheckCircle2, Sparkles, AlertTriangle, Eye } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';

interface Stage2BanquetProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_2: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这里本该有乐声。我记得他们，却看不清他们的脸。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '把现实中的宴席带回来。位置正确，记忆就会回应。',
  },
];

export const Stage2Banquet: React.FC<Stage2BanquetProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const [aimOffset, setAimOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      // Camera permission denied / in iframe fallback
      console.log('Camera streaming fallback active');
    }
  };

  const handleCapture = () => {
    soundFX.playStoneDrum();
    // Simulate alignment accuracy
    const isAligned = Math.abs(aimOffset.x) < 40 && Math.abs(aimOffset.y) < 40;

    if (isAligned) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setCapturedPhoto(ASSETS.lifeScroll);
      setIsSuccess(true);
      onUnlockFragment();
      setShowMemoryVideo(true);
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => setShowCorruption(false), 1400);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#120b08] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="取景框虚线断裂 · 场景未对齐，请调整展陈位置或角度"
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

        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#2a170f] text-[#ffb4a2] border border-[#5c2d20]">
          {isSuccess ? '宴乐已复 100%' : '面部被噪点抹去'}
        </span>
      </div>

      {/* Main Viewfinder Stage (相机取景框) */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Camera Viewfinder Box */}
        <div className="relative w-full flex-1 rounded-3xl bg-[#0d0705] border-2 border-[#5c4033] overflow-hidden flex flex-col items-center justify-center shadow-2xl">
          {isCameraActive ? (
            // Camera Stream / Fallback Simulation Scene
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />

              {/* Simulated Banquet Scene Background if camera is dark/blocked */}
              <div className="absolute inset-0 opacity-40 bg-cover bg-center"
                   style={{ backgroundImage: `url(${ASSETS.lifeScroll})` }} />

              {/* Four Viewfinder Corner Marks */}
              <div className="absolute inset-8 border border-dashed border-[#ffe89c]/60 rounded-2xl pointer-events-none flex items-center justify-center">
                {/* Pale Outline Hint of Banquet Figure */}
                <div className="w-40 h-40 border-2 border-emerald-400/40 rounded-full flex flex-col items-center justify-center animate-pulse">
                  <Eye className="w-6 h-6 text-emerald-300/80 mb-1" />
                  <span className="text-[9px] text-[#e6d5b8] bg-black/60 px-2 py-0.5 rounded">
                    对准展馆宴饮乐舞席位
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Empty Banquet Scene with Face Noise (人物面部被噪点抹去)
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <div
                className="absolute inset-0 opacity-30 bg-cover bg-center filter grayscale"
                style={{ backgroundImage: `url(${ASSETS.lifeScroll})` }}
              />

              {/* TV Noise overlay on faces */}
              <div className="relative z-10 space-y-2 max-w-xs">
                <div className="w-16 h-16 rounded-full bg-black/80 border-2 border-red-500/60 mx-auto flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <Camera className="w-8 h-8 text-amber-300 animate-pulse" />
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
          {!isCameraActive ? (
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

              <button
                onClick={() => setAimOffset({ x: 0, y: 0 })}
                className="p-3 bg-[#241a13] text-[#ffe89c] rounded-2xl border border-[#5c4033]"
                title="重新对焦"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Memory Video Modal (宴乐记忆) */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in">
          <div className="text-center mt-4">
            <span className="text-[9px] font-mono text-[#88b598] tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY RESTORED · 第二块碎片归位
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2 font-serif">
              宴乐记忆 · 翘袖折腰，宾主尽欢
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center">
            <img
              src={ASSETS.lifeScroll}
              alt="汉代宴乐"
              className="w-full h-full object-cover filter brightness-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 inset-x-4 text-center">
              <p className="text-[11px] text-[#e8f8ec] font-serif leading-relaxed">
                “照片与未来宴席重叠！瑟阮齐鸣，人物面部噪点消散，玉舞人与朋友们重新起舞。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
              onNextPage();
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>进入第三关 · 浮游</span>
          </button>
        </div>
      )}

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={DIALOGUES_2}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < DIALOGUES_2.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={2}
        />
      )}
    </div>
  );
};
