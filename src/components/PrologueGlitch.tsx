import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';
import { Scroll, Sparkles, ChevronRight, AlertTriangle } from 'lucide-react';

interface PrologueGlitchProps {
  onComplete: () => void;
}

const WORLD_RULE_LINES = [
  '欢迎来到3026年，',
  '这里是规则怪谈降临地球后的第一千年，',
  '一种名为“蚀墓虫”的虫族怪物在规则诡异力量下变异，',
  '开始以吞食墓葬、画像砖石、玉器木构等文物为生。',
  '最初，人们只以为遗址遭损害，',
  '后来才发现：当文物、墓穴、祭祀品等物质证据被完全吃掉，',
  '与它们相关的名称、动作和故事也会从文明历史的记忆中消失。',
  '这里是未来的大葆台，',
  '但它已被规则诡异力量给侵蚀得坑坑洼洼。',
  '鎏金铜铺首仍在残门上苦苦支撑，',
  '等待一个站在真实展馆里、能够辨认文物的现代见证者。',
];

const DIALOGUES_PHASE1: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '嘶——摔得我好疼……',
  },
  {
    speaker: 'player',
    speakerName: '见证者 (我)',
    text: '我们这是来到了哪里？',
  },
];

const DIALOGUES_PHASE2: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我身躯碎成了七片……我们为何会来到这里？',
  },
  {
    speaker: 'player',
    speakerName: '见证者 (我)',
    text: '时空动荡，我们意外跌落到了大葆台废墟。',
  },
];

const SHATTER_FRAGMENTS = [
  { id: 1, name: '右袖 (戈影)', x: '-translate-x-24 -translate-y-12', rot: 'rotate-45' },
  { id: 2, name: '胸佩 (宴乐)', x: 'translate-x-20 -translate-y-10', rot: '-rotate-30' },
  { id: 3, name: '左袖 (浮游)', x: '-translate-x-28 translate-y-6', rot: 'rotate-90' },
  { id: 4, name: '衣摆 (百戏)', x: 'translate-x-28 translate-y-10', rot: '-rotate-60' },
  { id: 5, name: '腰身 (袖舞)', x: '-translate-x-12 translate-y-20', rot: 'rotate-12' },
  { id: 6, name: '主体 (题凑)', x: 'translate-x-14 translate-y-20', rot: '-rotate-45' },
  { id: 7, name: '首光 (星路)', x: 'translate-x-0 -translate-y-24', rot: 'rotate-180' },
];

export const PrologueGlitch: React.FC<PrologueGlitchProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'glitch_screen' | 'dancer_fall' | 'world_rule_modal' | 'dialogue_after_rule'>('glitch_screen');
  const [dialogueIdx1, setDialogueIdx1] = useState<number>(0);
  const [dialogueIdx2, setDialogueIdx2] = useState<number>(0);
  const [visibleLineCount, setVisibleLineCount] = useState<number>(1);
  const [isDancerFallen, setIsDancerFallen] = useState<boolean>(false);

  // Initial glitch timing
  useEffect(() => {
    soundFX.playGlitchStatic();
    soundFX.playInsectEating();

    const t = setTimeout(() => {
      setStep('dancer_fall');
      soundFX.playStoneDrum();
      setTimeout(() => {
        setIsDancerFallen(true);
        soundFX.playGlitchStatic();
      }, 700);
    }, 1800);

    return () => clearTimeout(t);
  }, []);

  // Progressive text reveal in Rule Modal
  useEffect(() => {
    if (step === 'world_rule_modal') {
      soundFX.playCrawlerScurry();
      const interval = setInterval(() => {
        setVisibleLineCount((prev) => {
          if (prev < WORLD_RULE_LINES.length) {
            soundFX.playSandScratch();
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 700);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNextDialogue1 = () => {
    if (dialogueIdx1 < DIALOGUES_PHASE1.length - 1) {
      setDialogueIdx1(dialogueIdx1 + 1);
    } else {
      // Open World Rule Modal
      soundFX.playBronzeChime();
      setStep('world_rule_modal');
    }
  };

  const handleNextDialogue2 = () => {
    if (dialogueIdx2 < DIALOGUES_PHASE2.length - 1) {
      setDialogueIdx2(dialogueIdx2 + 1);
    } else {
      soundFX.playStoneDrum();
      onComplete();
    }
  };

  const handleCloseRuleModal = () => {
    soundFX.playStoneDrum();
    setStep('dialogue_after_rule');
  };

  return (
    <div className="relative w-full h-full bg-[#080503] text-[#e6d5b8] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* 1. TV Glitch Screen */}
      {step === 'glitch_screen' && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 animate-pulse">
          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-70 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 4px)`,
              backgroundSize: '100% 4px',
            }}
          />
          <div className="relative z-10 text-center space-y-3 font-mono">
            <div className="text-red-500 text-base font-black tracking-widest animate-bounce">
              ⚠️ WARNING: 规则怪谈侵蚀大葆台 ⚠️
            </div>
            <div className="text-xs text-amber-300">
              [TIME AXIS DISPLACEMENT DETECTED: +1000 YEARS]
            </div>
            <div className="text-[11px] text-zinc-400">
              正在剥离文物表层数据……
            </div>
          </div>
        </div>
      )}

      {/* 2. Dark/Withered Cover Background Scene */}
      <div className="absolute inset-0 bg-[#0d0906] overflow-hidden">
        {/* Dark desaturated tomb background */}
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-50 opacity-40"
          style={{ backgroundImage: `url(${ASSETS.underLayer})` }}
        />
        {/* Dim moody vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/95" />

        {/* Withered leaves drifting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-8 text-xs text-[#5c4033] opacity-60 animate-bounce">🍂</div>
          <div className="absolute top-28 right-12 text-sm text-[#4a3424] opacity-50">🥀</div>
          <div className="absolute bottom-32 left-16 text-xs text-[#5c4033] opacity-40">🍂</div>
        </div>
      </div>

      {/* Top Status */}
      <div className="relative z-10 p-2.5 bg-[#17100b]/90 border-b border-[#3d2b1f] flex items-center justify-between shadow-md">
        <span className="text-[8px] font-mono tracking-widest text-[#a3805d]">
          PROLOGUE · 3026 大葆台残破纪元
        </span>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-800">
          记忆已碎裂 7 块
        </span>
      </div>

      {/* Center Falling & Shattered Jade Dancer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-72 h-64 flex items-center justify-center">
          {!isDancerFallen ? (
            // Jade Dancer Falling down from top
            <div className="w-24 h-32 transition-all duration-700 ease-in transform -translate-y-24 scale-110 opacity-90 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path
                  d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="14" r="7" fill="#ef4444" />
              </svg>
            </div>
          ) : (
            // Shattered 7 Irregular Fragments fallen on the ground (above dialogue)
            <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
              <div className="absolute inset-0 bg-red-950/20 rounded-full blur-2xl pointer-events-none" />
              {SHATTER_FRAGMENTS.map((f) => (
                <div
                  key={f.id}
                  className={`absolute left-1/2 top-1/2 -ml-6 -mt-4 px-2 py-1 rounded-xl bg-[#14231b]/95 border-2 border-emerald-500/80 flex flex-col items-center justify-center text-[8px] text-emerald-200 font-serif font-black shadow-[0_0_12px_#34d399] transition-all duration-700 ${f.x} ${f.rot}`}
                >
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tip */}
        <div className="text-center text-[10px] text-[#a3805d] font-serif mt-1">
          玉舞人跌落于未来残破废墟，七块汉代记忆碎片散落四方
        </div>
      </div>

      {/* 3. Phase 1 Dialogue (嘶——摔得我好疼) */}
      {step === 'dancer_fall' && isDancerFallen && (
        <DialogueSystem
          dialogues={DIALOGUES_PHASE1}
          currentIndex={dialogueIdx1}
          onNext={handleNextDialogue1}
          restorationLevel={0}
          isCorrupted={true}
        />
      )}

      {/* 4. Worldview & Rule Modal (慢速渐显世界观规则弹窗) */}
      {step === 'world_rule_modal' && (
        <div
          onClick={handleCloseRuleModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none cursor-pointer"
        >
          {/* Top Banner */}
          <div className="w-full max-w-sm flex items-center justify-between border-b border-amber-800/80 pb-2 mt-2">
            <div className="flex items-center gap-1.5">
              <Scroll className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-[#ffe89c] tracking-widest">
                【大葆台 · 3026 规则怪谈世界观】
              </span>
            </div>
            <span className="text-[9px] font-mono text-zinc-400 bg-[#24170d] px-2 py-0.5 rounded-full border border-[#5c4033]">
              点击任意处跳过
            </span>
          </div>

          {/* Progressive Text Container */}
          <div className="w-full max-w-sm flex-1 my-3 bg-[#17100b] border-2 border-amber-700/70 rounded-2xl p-4 shadow-2xl overflow-y-auto space-y-2.5">
            {WORLD_RULE_LINES.slice(0, visibleLineCount).map((line, idx) => (
              <p
                key={idx}
                className={`text-xs leading-relaxed transition-all duration-500 animate-fade-in ${
                  idx === 0 || idx === 1
                    ? 'text-[#ffe89c] font-black text-sm'
                    : idx >= 7
                    ? 'text-emerald-300 font-bold'
                    : 'text-[#e6d5b8]'
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Dismiss Action */}
          <div className="w-full max-w-sm pb-2">
            <button
              onClick={handleCloseRuleModal}
              className="w-full py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
            >
              <span>了解世界规则 · 继续对话</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Phase 2 Dialogue (摔碎成了七块，为何到这里来着) */}
      {step === 'dialogue_after_rule' && (
        <DialogueSystem
          dialogues={DIALOGUES_PHASE2}
          currentIndex={dialogueIdx2}
          onNext={handleNextDialogue2}
          restorationLevel={0}
        />
      )}
    </div>
  );
};
