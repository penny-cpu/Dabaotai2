import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Flame, Sparkles, CheckCircle2, AlertTriangle, Eye, HelpCircle } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';

interface Stage4BaixiProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

interface BaixiScene {
  id: string;
  name: string;
  category: string;
  desc: string;
  isLit: boolean;
  pos: { x: number; y: number };
}

const INITIAL_SCENES: BaixiScene[] = [
  {
    id: 'b1',
    name: '盘鼓舞 (七盘舞)',
    category: '汉代乐舞',
    desc: '舞者罗袜蹑盘，足踏七盘如流星飞掷，汉代绝美打击乐舞。',
    isLit: false,
    pos: { x: 22, y: 35 },
  },
  {
    id: 'b2',
    name: '寻橦与倒立',
    category: '百戏杂技',
    desc: '长杆倒立、飞剑跳丸，汉代百戏之勇烈神技。',
    isLit: false,
    pos: { x: 74, y: 30 },
  },
  {
    id: 'b3',
    name: '六博对弈',
    category: '汉代博戏',
    desc: '投箸行棋、争道进击，汉代王公贵族最钟爱之智戏。',
    isLit: false,
    pos: { x: 50, y: 72 },
  },
];

const DIALOGUES_START: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '【嚼嚼嚼……黑夜里连烛火都不会再有了……六博残局永远死在这里吧……】',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '好黑。我只记得百戏很热闹，有鼓，有长索，还有……六博的棋子声。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '提灯照亮三处壁画，看清动作，再按舞人的步法走完六博残局。',
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
    text: '盘鼓乐动，六博局开！第四块衣摆碎片重聚了！',
  },
];

export const Stage4Baixi: React.FC<Stage4BaixiProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [scenes, setScenes] = useState<BaixiScene[]>(INITIAL_SCENES);
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to 6 for liubo
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [activeDialogues, setActiveDialogues] = useState<DialogueLine[]>(DIALOGUES_START);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playCrawlerScurry();
  }, []);

  const litCount = scenes.filter((s) => s.isLit).length;

  const handleLightScene = (id: string) => {
    soundFX.playStoneDrum();
    soundFX.playBronzeChime();
    setScenes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isLit: true } : s))
    );
  };

  const handleLiuboStep = (stepIdx: number) => {
    if (litCount < 3) {
      soundFX.playGlitchStatic();
      setShowCorruption(true);
      setTimeout(() => setShowCorruption(false), 1200);
      return;
    }

    if (stepIdx === currentStep + 1) {
      soundFX.playStoneDrum();
      setCurrentStep(stepIdx);

      if (stepIdx === 6) {
        soundFX.playBronzeChime();
        soundFX.playMemoryRestore();
        setIsSuccess(true);
        onUnlockFragment();
        setActiveDialogues(DIALOGUES_RESTORED);
        setDialogueIdx(0);
        setShowDialogue(true);
      }
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => setShowCorruption(false), 1200);
    }
  };

  return (
    <div className={`relative w-full h-full text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
      isSuccess ? 'bg-[#18110a]' : 'bg-[#0a0705]'
    }`}>
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="六博步法走乱 · 需先点亮三处百戏再按 1-6 顺序踏出步法"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#17100b] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 4 · BAIXI ACROBATICS
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第四关 · 百戏 (灯照三景与六博)
          </h2>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-mono bg-[#24170d] px-2 py-0.5 rounded-full border border-amber-800 text-amber-300">
          <span>点亮 {litCount}/3 · 六博 {currentStep}/6</span>
        </div>
      </div>

      {/* Main Lantern & Liubo Interactive Canvas */}
      <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-3">
        {/* Upper Canvas: Darkened Tomb Wall with 3 Lantern Spotlights */}
        <div className={`relative w-full flex-1 rounded-3xl border-2 transition-all duration-700 overflow-hidden flex flex-col items-center justify-center shadow-2xl p-2 ${
          isSuccess
            ? 'bg-[#1e130a] border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
            : 'bg-[#0c0805] border-[#3d2b1f]'
        }`}>
          {/* Faint Baixi Mural Background */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
              litCount === 3 ? 'opacity-80 brightness-110 contrast-110' : 'opacity-20 grayscale'
            }`}
            style={{ backgroundImage: `url(${ASSETS.lifeScroll})` }}
          />

          {/* 3 Clickable Lantern Spotlights */}
          {scenes.map((scene) => (
            <div
              key={scene.id}
              onClick={() => handleLightScene(scene.id)}
              style={{ left: `${scene.pos.x}%`, top: `${scene.pos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            >
              <div
                className={`p-2 rounded-2xl border-2 transition-all flex flex-col items-center shadow-xl ${
                  scene.isLit
                    ? 'bg-amber-950/90 border-[#ffe89c] text-[#ffe89c] shadow-[0_0_20px_rgba(255,232,156,0.5)] scale-105'
                    : 'bg-black/80 border-[#5c4033] text-[#8c7561] hover:border-amber-500 animate-pulse'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Flame
                    className={`w-4 h-4 ${
                      scene.isLit ? 'text-amber-400 fill-amber-400 animate-bounce' : 'text-[#8c7561]'
                    }`}
                  />
                  <span className="text-[10px] font-black">{scene.name}</span>
                </div>
                {scene.isLit && (
                  <p className="text-[8px] text-emerald-300 mt-1 max-w-[130px] leading-tight text-center">
                    {scene.desc}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Instruction */}
          <div className="absolute bottom-2 inset-x-2 text-center text-[9px] text-[#a3805d] bg-black/60 py-0.5 rounded-full border border-[#3d2b1f]/50">
            {litCount < 3
              ? '点击提灯逐一照亮 3 处百戏场景（盘鼓舞、倒立走索、六博对弈）'
              : '三景已照亮！点击下方按 1-6 步法走通六博残局'}
          </div>
        </div>

        {/* Lower Liubo 6-Step Track */}
        <div className="w-full mt-2 bg-[#17100b] border-2 border-[#3d2b1f] rounded-2xl p-2.5 shadow-xl space-y-1.5 z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#ffe89c] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>六博残局 · 舞步六进</span>
            </span>
            <span className="text-[8px] font-mono text-[#a3805d]">
              依次点击 1 至 6 号步位
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((step) => {
              const isFinished = step <= currentStep;
              const isNext = step === currentStep + 1;

              return (
                <button
                  key={step}
                  onClick={() => handleLiuboStep(step)}
                  disabled={isSuccess || litCount < 3}
                  className={`h-10 rounded-xl border-2 font-serif font-black text-xs transition-all flex flex-col items-center justify-center ${
                    isFinished
                      ? 'bg-emerald-900 border-emerald-400 text-white shadow-[0_0_10px_#34d399]'
                      : isNext && litCount === 3
                      ? 'bg-amber-600 border-[#ffe89c] text-white animate-bounce'
                      : 'bg-[#0f0a07] border-[#2b1b12] text-[#6b4c35]'
                  }`}
                >
                  <span>{step}</span>
                  <span className="text-[7px] font-mono opacity-80">步</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        {isSuccess && (
          <div className="w-full mt-2 z-10">
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setShowMemoryVideo(true);
              }}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-serif font-black rounded-2xl border-2 border-emerald-400 text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>衣摆碎片已归位 · 查看百戏乐舞视频</span>
            </button>
          </div>
        )}
      </div>

      {/* Video Modal with VideoPlayerPlaceholder (百戏乐舞视频) */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-3">
            <span className="text-[9px] font-mono text-emerald-300 tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY VIDEO · 第四块碎片归位
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              百戏记忆 · 盘鼓踏歌，六博定局
            </h3>
          </div>

          <div className="w-full max-w-xs">
            <VideoPlayerPlaceholder
              title="【汉代百戏 · 盘鼓与杂技】"
              subtitle="16:9 汉代百戏复原演艺"
              videoSrc="/assets/videos/dance_baixi.mp4"
              posterImage={ASSETS.lifeScroll}
              description="舞者踏盘而歌，杂技倒立寻橦，伴随六博行子，展现汉代盛大生动的百戏艺术。"
              videoAssetPathHint="src/assets/videos/dance_baixi.mp4"
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
            <span>进入第五关 · 袖舞</span>
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
          restorationLevel={isSuccess ? 4 : 3}
        />
      )}
    </div>
  );
};
