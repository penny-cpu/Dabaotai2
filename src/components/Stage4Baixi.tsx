import React, { useState, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Flame, Sparkles, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';

interface Stage4BaixiProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_4: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这里的人还在，只是动作被封住了。先让他们重新见光。',
  },
];

// 3 Highlight Scenes
const THREE_SCENES = [
  { id: 'liubo', name: '六博对弈', x: 50, y: 25, hint: '六博棋局·博弈胜负' },
  { id: 'tiaowan', name: '跳丸绝技', x: 28, y: 65, hint: '七彩飞丸·飞跃空中' },
  { id: 'qipan', name: '七盘舞姿', x: 75, y: 70, hint: '七盘一鼓·足踏星云' },
];

export const Stage4Baixi: React.FC<Stage4BaixiProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [isLanternLit, setIsLanternLit] = useState<boolean>(false);
  const [lanternPos, setLanternPos] = useState<{ x: number; y: number }>({ x: 50, y: 85 });
  const [revealedScenes, setRevealedScenes] = useState<string[]>([]);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);
  const [boardStep, setBoardStep] = useState<number>(0); // 0 to 6 steps
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleLightLantern = () => {
    soundFX.playStoneDrum();
    setIsLanternLit(true);
    soundFX.playWindLeaves();
  };

  const handleMoveLantern = (clientX: number, clientY: number) => {
    if (!isLanternLit || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setLanternPos({ x: xPct, y: yPct });

    // Check proximity to 3 scenes
    THREE_SCENES.forEach((sc) => {
      const dist = Math.hypot(sc.x - xPct, sc.y - yPct);
      if (dist < 18 && !revealedScenes.includes(sc.id)) {
        soundFX.playBronzeChime();
        const next = [...revealedScenes, sc.id];
        setRevealedScenes(next);

        if (next.length === 3) {
          // Trigger Video after revealing all 3 scenes
          setTimeout(() => {
            setShowMemoryVideo(true);
          }, 800);
        }
      }
    });
  };

  // Six-step Liubo board click solver (1 -> 2 -> 3 -> 4 -> 5 -> 6)
  const handleBoardClick = (stepIndex: number) => {
    soundFX.playStoneDrum();

    if (stepIndex === boardStep + 1) {
      const nextStep = boardStep + 1;
      setBoardStep(nextStep);
      soundFX.playBronzeChime();

      if (nextStep === 6) {
        soundFX.playMemoryRestore();
        setIsSuccess(true);
        onUnlockFragment();
      }
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => setShowCorruption(false), 1400);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#140e0a] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="棋子退回 · 玉舞人：“再看一次，他们每人走了三步。”"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#20150e] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 4 · BAIXI LANTERN PUZZLE
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第四关 · 百戏 (烛光照壁画与六博)
          </h2>
        </div>

        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#2a1a0f] text-[#ffe89c] border border-[#5c4033]">
          图景已照亮 {revealedScenes.length}/3 · 六博 {boardStep}/6
        </span>
      </div>

      {/* Main Image Brick Stage with Dark Mask */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        <div
          ref={containerRef}
          onMouseMove={(e) => isLanternLit && handleMoveLantern(e.clientX, e.clientY)}
          onTouchMove={(e) => {
            if (isLanternLit && e.touches[0]) {
              handleMoveLantern(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          className="relative w-full flex-1 rounded-3xl bg-[#0a0705] border-2 border-[#5c4033] overflow-hidden flex items-center justify-center shadow-2xl touch-none"
        >
          {/* Base Han Image Brick Artwork */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85 filter contrast-125"
            style={{ backgroundImage: `url(${ASSETS.lifeScroll})` }}
          />

          {/* Dark Overlay with Dynamic Radial Lantern Cutout */}
          <div
            className="absolute inset-0 pointer-events-none transition-all"
            style={{
              background: isLanternLit
                ? `radial-gradient(circle 90px at ${lanternPos.x}% ${lanternPos.y}%, transparent 0%, rgba(5,3,2,0.92) 80%)`
                : 'rgba(5,3,2,0.95)',
            }}
          />

          {/* 3 Hotspot Scene Markers */}
          {THREE_SCENES.map((sc) => {
            const isRev = revealedScenes.includes(sc.id);
            return (
              <div
                key={sc.id}
                style={{ left: `${sc.x}%`, top: `${sc.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl border-2 transition-all flex flex-col items-center z-20 ${
                  isRev
                    ? 'bg-[#1b2a1e]/90 border-[#88b598] shadow-[0_0_15px_#88b598] scale-105'
                    : 'bg-black/70 border-[#5c4033] opacity-40'
                }`}
              >
                <div className="text-[10px] font-black text-[#ffe89c] font-serif">
                  {sc.name}
                </div>
                <div className="text-[8px] text-[#cdeacd] font-mono">{sc.hint}</div>
                {isRev && <CheckCircle2 className="w-3 h-3 text-[#88b598] mt-0.5" />}
              </div>
            );
          })}

          {/* Floating Lantern Cursor icon */}
          {isLanternLit && (
            <div
              style={{ left: `${lanternPos.x}%`, top: `${lanternPos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-300 flex items-center justify-center shadow-[0_0_20px_#f59e0b]">
                <Flame className="w-6 h-6 text-amber-300" />
              </div>
              <span className="text-[8px] font-mono text-amber-200 bg-black/70 px-1.5 rounded mt-0.5">
                拖动照亮壁画
              </span>
            </div>
          )}
        </div>

        {/* Bottom Six-step Liubo Board or Lantern Lighter */}
        <div className="w-full mt-2.5 z-10 space-y-2">
          {!isLanternLit ? (
            <button
              onClick={handleLightLantern}
              className="w-full py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>点击灯笼点火 · 拖动光圈照亮三处百戏残景</span>
            </button>
          ) : revealedScenes.length >= 3 ? (
            // 6-step Liubo Game Steps
            <div className="bg-[#1c130d] border-2 border-[#5c4033] p-2.5 rounded-2xl shadow-xl space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[#ffe89c] font-serif">
                <span>根据视频提示完成六博残局：一对舞人各走三步 (共六步)</span>
                <span className="font-mono text-[#88b598]">已完成 {boardStep}/6</span>
              </div>

              {/* 6 Step Buttons */}
              <div className="grid grid-cols-6 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isDone = boardStep >= num;
                  const isNext = boardStep + 1 === num;

                  return (
                    <button
                      key={num}
                      onClick={() => handleBoardClick(num)}
                      className={`py-2 rounded-xl border font-serif font-black text-xs transition-all ${
                        isDone
                          ? 'bg-[#1a382b] border-[#68d391] text-[#e8f8ec] shadow-md'
                          : isNext
                          ? 'bg-amber-700/80 border-[#ffe89c] text-white animate-pulse'
                          : 'bg-[#140e0a] border-[#3d2b1f] text-[#a3805d]'
                      }`}
                    >
                      第{num}步
                    </button>
                  );
                })}
              </div>

              {isSuccess && (
                <button
                  onClick={() => {
                    soundFX.playStoneDrum();
                    onNextPage();
                  }}
                  className="w-full py-2 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-xl border border-[#d2b48c] text-xs shadow-md mt-1"
                >
                  百戏画像已全面复活 · 进入第五关
                </button>
              )}
            </div>
          ) : (
            <div className="p-2 text-center text-[10px] text-[#a3805d] bg-[#140e0a] rounded-xl border border-[#3d2b1f]">
              滑动手指拖动烛光光圈，依次寻找并照亮：六博棋、跳丸表演、七盘舞
            </div>
          )}
        </div>
      </div>

      {/* Memory Video Modal (百戏记忆) */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in">
          <div className="text-center mt-4">
            <span className="text-[9px] font-mono text-[#88b598] tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY VIDEO · 百戏六博记忆
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2 font-serif">
              一对玉舞人各走三步 · 共六步破残局
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center p-4">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-[#2a1a0f] border-4 border-amber-500 mx-auto flex items-center justify-center text-xl font-black text-amber-300">
                1 → 6
              </div>
              <p className="text-[11px] text-[#e8f8ec] font-serif leading-relaxed">
                “舞者扬袖翻飞，在六博棋盘上依次踏出六步玄妙步法（舞人甲走 1, 2, 3；舞人乙走 4, 5, 6）。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>返回画像砖 · 按顺序走出六步残局</span>
          </button>
        </div>
      )}

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={DIALOGUES_4}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < DIALOGUES_4.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={4}
        />
      )}
    </div>
  );
};
