import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, Play, ArrowRight, RotateCcw, Star, Compass } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { RightTopActions } from './RightTopActions';

interface Stage7AscensionProps {
  onUnlockFragment: () => void;
  onRestart: () => void;
  isUnlocked: boolean;
}

interface ConstellationStar {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number;
  sequence: number; // 0, 1, 2, 3, 4
}

const STARS: ConstellationStar[] = [
  { id: 'dou', name: '斗宿', x: 22, y: 32, sequence: 0 },
  { id: 'nv', name: '女宿', x: 40, y: 22, sequence: 1 },
  { id: 'xu', name: '虚宿', x: 62, y: 32, sequence: 2 },
  { id: 'wei', name: '危宿', x: 78, y: 50, sequence: 3 },
  { id: 'jiao', name: '角宿', x: 50, y: 72, sequence: 4 },
];

const DIALOGUES_STAGE7_INTRO: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '在汉代人的宇宙里，生命并未在墓中终结。他们相信人死后，灵魂会进入更广阔的世界，甚至升入星宿与仙境。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我好像想起来了……我们被放入墓室，不是为了被遗忘，而是为了在另一个世界继续起舞、继续陪伴。可最后这一步，还需要把星辰连起来。',
  },
];

const DIALOGUES_STAGE7_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '星宿连成了路。我想起了一切——我属于王后组玉佩，曾在广阳国的宴乐中起舞，也曾伴随他们走过送葬与永恒。原来汉代人对待死亡，并不只有悲伤，还有对生命延续的浪漫想象。',
  },
];

const DIALOGUES_STAGE7_EPILOGUE: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '谢谢你，陪我找回了所有的记忆。我是大葆台汉墓的玉舞人。两千年前的广阳国已经远去，但只要还有人记得这些舞蹈与器物，大汉的生命就不会真正沉睡。',
  },
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '大葆台西汉墓以黄肠题凑与千余件文物，为后世留下了汉代王陵的完整样本。生前的礼乐、身后的秩序，以及对星宿与永恒的想象，共同构成了汉代人独特的生命观。',
  },
];

export const Stage7Ascension: React.FC<Stage7AscensionProps> = ({
  onUnlockFragment,
  onRestart,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<'intro_dialogue' | 'interactive' | 'success_dialogue' | 'grand_epilogue'>('intro_dialogue');
  const [connectedStarIds, setConnectedStarIds] = useState<string[]>([]);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleStarClick = (star: ConstellationStar) => {
    soundFX.playStoneDrum();
    const nextExpectedSeq = connectedStarIds.length;
    if (star.sequence === nextExpectedSeq) {
      soundFX.playBronzeChime();
      const updated = [...connectedStarIds, star.id];
      setConnectedStarIds(updated);
      setErrorTip('');

      if (updated.length === STARS.length) {
        soundFX.playMemoryRestore();
        setIsSuccess(true);
        onUnlockFragment();
        setTimeout(() => {
          setPhase('success_dialogue');
          setDialogueIdx(0);
        }, 600);
      }
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……星宿连线须循序顺应天象：斗宿 → 女宿 → 虚宿 → 危宿 → 角宿。');
      setConnectedStarIds([]);
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
    }
  };

  return (
    <div
      className="relative w-full h-full text-[#d6e4ff] flex flex-col justify-between overflow-hidden font-serif select-none"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #0d1a33 0%, #050a14 55%, #020408 100%)',
      }}
    >
      {/* Background Starry Sky & 28 Lunar Mansions Twinkling Shimmer (Point 10) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Softly pulsating celestial gold/silver starlight gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-indigo-950/20 to-transparent animate-pulse" />

        {/* Dynamic Twinkling Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${(i % 3) * 1.2 + 1}px`,
              height: `${(i % 3) * 1.2 + 1}px`,
              left: `${(i * 19) % 100}%`,
              top: `${(i * 23) % 100}%`,
              opacity: (i % 5) * 0.18 + 0.25,
              animationDuration: `${(i % 4) + 1.8}s`,
              backgroundColor: i % 2 === 0 ? '#fef08a' : '#e0e7ff',
              boxShadow: i % 4 === 0 ? '0 0 6px #fde047' : '0 0 4px #c7d2fe',
            }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <div className="p-2.5 bg-[#0b1324]/90 border-b border-indigo-950 flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-indigo-400 font-mono">
            CHAPTER 07 · 星宿 · 升仙
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第七章｜星宿 · 升仙
          </h2>
        </div>
      </div>

      {/* STEP 1: PAGE 23 汉代生死观阐释 */}
      {phase === 'intro_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in z-10">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-indigo-950 border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.7)] animate-pulse">
              <Compass className="w-10 h-10 text-indigo-300" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-indigo-300">西汉天人观念 · 星宿与仙境</span>
              <h3 className="text-base font-black text-[#ffe89c]">魂归星宿 · 千载不朽</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE7_INTRO}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < DIALOGUES_STAGE7_INTRO.length - 1) {
                setDialogueIdx(dialogueIdx + 1);
              } else {
                soundFX.playStoneDrum();
                setPhase('interactive');
              }
            }}
          />
        </div>
      )}

      {/* STEP 2: PAGE 24 交互：连线二十八宿星图 (Point 10 & Point 12) */}
      {phase === 'interactive' && (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-start space-y-2 p-3 animate-fade-in pb-36 z-10">
          {/* Top Prompt */}
          <div className="text-center py-1">
            <span className="text-[10.5px] font-black text-[#ffe89c] bg-[#0c162e]/90 px-3.5 py-1 rounded-full border border-indigo-500/70 shadow">
              依序点亮二十八宿星辰（斗宿 → 女宿 → 虚宿 → 危宿 → 角宿）
            </span>
          </div>

          {/* Interactive Constellation Canvas Map */}
          <div className="relative w-full aspect-[4/4.2] my-auto rounded-3xl bg-[#080f1e]/80 border-2 border-indigo-500/70 shadow-[0_0_30px_rgba(99,102,241,0.3)] overflow-hidden">
            {/* SVG Connecting Lines between connected stars */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {connectedStarIds.map((starId, index) => {
                if (index === 0) return null;
                const prevStar = STARS.find((s) => s.id === connectedStarIds[index - 1]);
                const curStar = STARS.find((s) => s.id === starId);
                if (!prevStar || !curStar) return null;
                return (
                  <line
                    key={starId}
                    x1={`${prevStar.x}%`}
                    y1={`${prevStar.y}%`}
                    x2={`${curStar.x}%`}
                    y2={`${curStar.y}%`}
                    stroke="#fde047"
                    strokeWidth="3"
                    strokeDasharray="3 3"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>

            {/* 5 Constellation Star Nodes */}
            {STARS.map((star) => {
              const isConnected = connectedStarIds.includes(star.id);
              const isNextTarget = connectedStarIds.length === star.sequence;
              return (
                <div
                  key={star.id}
                  onClick={() => handleStarClick(star)}
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                      isConnected
                        ? 'bg-amber-400 border-2 border-white text-black shadow-[0_0_15px_#fde047] scale-110'
                        : isNextTarget
                        ? 'bg-indigo-700 border-2 border-amber-300 text-amber-200 animate-bounce shadow-[0_0_12px_rgba(245,158,11,0.7)]'
                        : 'bg-[#152342] border border-indigo-700 text-indigo-300 hover:border-indigo-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isConnected ? 'fill-black' : 'fill-none'}`} />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#ffe89c] bg-black/70 px-1.5 py-0.5 rounded mt-1 shadow">
                    {star.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interactive Mode: Jade dancer with 3-level progressive hints */}
          <UnifiedDialogueBox
            isInteractiveMode={true}
            hints={[
              '汉代墓顶星宿图记录着汉代人对星空的敬畏与升仙天界之遐想。',
              '需自北方玄武宿度顺天而行，连及东方苍龙主星角宿。',
              '正确连线顺序为：斗宿 ➔ 女宿 ➔ 虚宿 ➔ 危宿 ➔ 角宿，依次点亮即可完成星图归位。',
            ]}
            errorTip={errorTip}
            onClearError={() => setErrorTip('')}
          />
        </div>
      )}

      {/* STEP 3: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in z-10">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-pulse">
              <Sparkles className="w-10 h-10 text-emerald-300" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                新记忆已收录 · 记忆卡 07
              </span>
              <h3 className="text-base font-black text-[#ffe89c] mt-2">
                卡片 07「升仙之路」已点亮
              </h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE7_SUCCESS}
            currentIndex={0}
            onNext={() => {
              setPhase('grand_epilogue');
            }}
          />
        </div>
      )}

      {/* STEP 4: 终章结语与升华 */}
      {phase === 'grand_epilogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in z-10">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-24 h-24 rounded-full bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.8)] animate-pulse">
              <Sparkles className="w-12 h-12 text-amber-300" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-300">大葆台西汉墓 · 千古汉韵</span>
              <h3 className="text-base font-black text-[#ffe89c]">记忆完全复原 · 七章圆满</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE7_EPILOGUE}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < DIALOGUES_STAGE7_EPILOGUE.length - 1) {
                setDialogueIdx(dialogueIdx + 1);
              } else {
                onRestart();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
