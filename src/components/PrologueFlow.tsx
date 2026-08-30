import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock, Compass, Shield, BookOpen } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';
import { ASSETS } from '../data/museumData';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { DialogueLine } from '../types';

interface PrologueFlowProps {
  onStartChapter1: () => void;
}

type PrologueStep = 'cover' | 'museum_intro' | 'time_travel' | 'dancer_awakening';

export const PrologueFlow: React.FC<PrologueFlowProps> = ({ onStartChapter1 }) => {
  const [step, setStep] = useState<PrologueStep>('cover');
  const [introLineIdx, setIntroLineIdx] = useState<number>(0);

  const INTRO_LINES = [
    '欢迎来到北京大葆台西汉墓遗址博物馆。',
    '这里建在西汉广阳王刘建与王后的墓葬遗址之上。',
    '1974 年墓葬被发现，这里完整揭示了“黄肠题凑”等汉代王陵制度。',
    '今天，千余件汉代文物仍在这里保存着两千年前的生活与记忆。',
  ];

  const TIME_TRAVEL_LINES = [
    '现在，让时间倒流。',
    '当你再次睁开眼睛，你已来到两千年前的广阳国。',
    '一尊沉睡在墓中的玉舞人正在苏醒。',
    '她记得舞蹈，却忘记了自己从哪里来、属于谁。',
  ];

  const AWAKENING_DIALOGUES: DialogueLine[] = [
    {
      speaker: 'dancer',
      speakerName: '玉舞人',
      text: '我是谁……？我记得自己是一块玉，也记得曾经跳舞。',
    },
    {
      speaker: 'dancer',
      speakerName: '玉舞人',
      text: '我好像属于一组玉佩，可其他记忆全乱了。你愿意陪我把它们找回来吗？',
    },
    {
      speaker: 'narrator',
      speakerName: '旁白',
      text: '别发呆了，跟上脚步。前面的战鼓声，像是出了大事。',
    },
  ];
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);

  // Handle Cover Step -> Museum Intro
  const handleStartMuseum = () => {
    soundFX.playStoneDrum();
    setStep('museum_intro');
  };

  // Advance Intro lines
  useEffect(() => {
    if (step === 'museum_intro') {
      const interval = setInterval(() => {
        setIntroLineIdx((prev) => {
          if (prev < INTRO_LINES.length - 1) {
            soundFX.playStoneDrum();
            return prev + 1;
          }
          return prev;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [step, INTRO_LINES.length]);

  return (
    <div className="relative w-full h-full bg-[#0d0906] text-[#e6d5b8] font-serif overflow-hidden select-none flex flex-col justify-between">
      {/* PAGE 01: 封面：现代大葆台实景 */}
      {step === 'cover' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6 animate-fade-in">
          {/* Background Real Museum Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-50 contrast-110"
            style={{ backgroundImage: `url(${ASSETS.museumExterior})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-amber-500/60 shadow-md">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span className="text-[10px] font-mono text-amber-200">
                北京大葆台西汉墓遗址博物馆
              </span>
            </div>
          </div>

          {/* Center Main Title */}
          <div className="relative z-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-950/70 border-2 border-amber-400/90 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-pulse">
              <Sparkles className="w-8 h-8 text-amber-300" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#ffe89c] tracking-widest leading-tight">
                汉代生命观数字舞蹈体验
              </h1>
              <p className="text-xs text-amber-300/90 tracking-widest font-mono">
                只要记忆清晰，历史就不曾沉睡
              </p>
            </div>
          </div>

          {/* Bottom Enter Button */}
          <div className="relative z-10 w-full max-w-xs mx-auto">
            <button
              onClick={handleStartMuseum}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:brightness-110 text-black font-serif font-black text-sm shadow-[0_0_25px_rgba(245,158,11,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>进入大葆台</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* PAGE 02: 场馆介绍：逐行文字自然渐现（去除卡片边框，沉浸慢读） */}
      {step === 'museum_intro' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#140b06] via-[#090503] to-black animate-fade-in">
          {/* Top Title */}
          <div className="relative z-10 flex items-center gap-2 border-b border-[#3d2b1f]/60 pb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-black text-[#ffe89c] tracking-widest">
              场馆引言 · 大葆台西汉王陵
            </h2>
          </div>

          {/* Center Lines Fade-in without boxes (左侧对齐，慢读排版) */}
          <div className="relative z-10 my-auto space-y-6 max-w-xs mx-auto py-2 text-left pl-3 border-l border-amber-500/30">
            {INTRO_LINES.map((line, idx) => (
              <p
                key={idx}
                className={`text-[13px] sm:text-[14px] leading-relaxed tracking-wider font-serif transition-all duration-1000 ${
                  idx <= introLineIdx
                    ? 'opacity-100 translate-y-0 text-[#f7ecd7] filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)]'
                    : 'opacity-0 translate-y-3 text-transparent'
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Bottom Continue to Time Travel */}
          <div className="relative z-10 w-full max-w-xs mx-auto">
            <button
              onClick={() => {
                soundFX.playMemoryRestore();
                setStep('time_travel');
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 border border-amber-400/80 text-black text-xs font-serif font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            >
              <span>开启时间倒流 · 穿越广阳</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}

      {/* PAGE 03: 穿越页：时间倒流 + 睁眼第一视角（一开一合、模糊与微弱光源交替） */}
      {step === 'time_travel' && (
        <div className="relative w-full h-full flex flex-col justify-between p-6 bg-black text-[#ffe89c] animate-fade-in overflow-hidden">
          {/* First-person Eye Opening & Closing Eyelid Animation Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {/* Top Eyelid */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-black transition-all duration-1000 animate-[pulse_3s_ease-in-out_infinite] opacity-80" />
            {/* Bottom Eyelid */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black transition-all duration-1000 animate-[pulse_3s_ease-in-out_infinite] opacity-80" />
            {/* Blurry Vignette & Faint Light Leak */}
            <div className="absolute inset-0 bg-radial from-amber-400/20 via-black/60 to-black backdrop-blur-[2px] animate-pulse" />
          </div>

          {/* Black & Gold Time Vortex Background Effects */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-dashed border-amber-500 animate-[spin_12s_linear_infinite_reverse]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-amber-300 animate-ping opacity-30" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 shadow-md w-fit">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono text-amber-200">
              TIME REVERSAL · 逆流两千年
            </span>
          </div>

          {/* Center Lines & Counter-Clockwise Spinning Clock */}
          <div className="relative z-10 my-auto text-center space-y-4 max-w-xs mx-auto">
            {/* Counter-Clockwise Time-Reversal Animated Clock */}
            <div className="relative w-24 h-24 mx-auto rounded-full bg-amber-950/70 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.8)]">
              {/* Outer Counter-Clockwise Ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-amber-300 animate-[spin_4s_linear_infinite_reverse]" />
              
              {/* Clock Face SVG with Reverse Moving Hands */}
              <svg viewBox="0 0 100 100" className="w-14 h-14">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#f59e0b" strokeWidth="3" />
                {/* 12 Ticks */}
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="12"
                    x2="50"
                    y2="16"
                    stroke="#ffe89c"
                    strokeWidth="2"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
                {/* Hour Hand Rotating Reverse */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="28"
                  stroke="#ffe89c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="origin-[50px_50px] animate-[spin_6s_linear_infinite_reverse]"
                />
                {/* Minute Hand Rotating Faster Reverse */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="18"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="origin-[50px_50px] animate-[spin_2s_linear_infinite_reverse]"
                />
                <circle cx="50" cy="50" r="4" fill="#f59e0b" />
              </svg>
            </div>

            <div className="space-y-2">
              {TIME_TRAVEL_LINES.map((line, idx) => (
                <p key={idx} className="text-[12px] text-[#f2e6d0] leading-relaxed tracking-wider font-serif">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom Button */}
          <div className="relative z-10 w-full max-w-xs mx-auto">
            <button
              onClick={() => {
                soundFX.playBronzeChime();
                setStep('dancer_awakening');
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-black font-serif font-black text-xs shadow-[0_0_20px_rgba(52,211,153,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>睁开双眼 · 唤醒玉舞人</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PAGE 04: 序章：玉舞人苏醒 */}
      {step === 'dancer_awakening' && (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#091710] via-[#050e0a] to-[#020504] animate-fade-in pb-36">
          {/* Top Right Progress Indicator (首次出现 记忆 0/7) */}
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17100b] border border-emerald-500 text-emerald-300 text-[10px] font-mono shadow-md">
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>◇ 记忆 0/7</span>
          </div>

          {/* Center Stage: Jade Dancer Awakening Silhouette */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-4">
            <div className="relative w-44 h-56 flex items-center justify-center animate-pulse">
              <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_25px_rgba(52,211,153,0.8)]">
                <path
                  d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="18" r="6" fill="#ffffff" />
              </svg>
            </div>

            {/* "前往战场" button placed cleanly above the dialogue area */}
            {dialogueIdx >= AWAKENING_DIALOGUES.length - 1 && (
              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  onStartChapter1();
                }}
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-serif font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-bounce flex items-center gap-1.5 z-20"
              >
                <span>开始寻忆 · 前往战场</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom Unified Dialogue Box */}
          <UnifiedDialogueBox
            dialogues={AWAKENING_DIALOGUES}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < AWAKENING_DIALOGUES.length - 1) {
                setDialogueIdx((prev) => prev + 1);
              } else {
                onStartChapter1();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
