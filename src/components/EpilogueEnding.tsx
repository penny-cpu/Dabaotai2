import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, Rotate3d, Share2, RotateCcw, ChevronDown, Award, Compass, Heart, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/museumData';
import { DialogueLine, UserInteractionTrackPoint } from '../types';
import { DialogueSystem } from './DialogueSystem';

interface EpilogueEndingProps {
  onRestart: () => void;
  trackPoints?: UserInteractionTrackPoint[];
}

const EPILOGUE_DIALOGUES: DialogueLine[] = [
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '感谢你和玉舞人成功走完全部记忆旅程，让如今大葆台恢复了许多抵抗记忆侵蚀的力量。我会继续守在这里，只要记忆清晰，大葆台汉墓博物馆就会一直延续，文明也才会永续传承。你们的记忆、你们选择走进大葆台的旅程，于我、于此处墓葬而言都非常重要。谢谢你们。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '两千年的长袖，因你的到来而重新有了温度。大葆台的岁月，请代我们一直看下去。',
  },
  {
    speaker: 'player',
    speakerName: '见证者 (我)',
    text: '我们会永远守护这段属于大葆台的千古汉韵。',
  },
];

const SEVEN_STAGES = [
  { id: 'weapon', name: '戈影', depth: '1.2m', x: 18, y: 15 },
  { id: 'banquet', name: '宴乐', depth: '2.2m', x: 50, y: 24 },
  { id: 'gallery', name: '浮游', depth: '3.1m', x: 80, y: 36 },
  { id: 'baixi', name: '百戏', depth: '3.8m', x: 30, y: 48 },
  { id: 'funerary', name: '袖舞', depth: '4.5m', x: 72, y: 60 },
  { id: 'huangchang', name: '题凑', depth: '5.2m', x: 25, y: 74 },
  { id: 'ascension', name: '星路', depth: '深处', x: 65, y: 88 },
];

export const EpilogueEnding: React.FC<EpilogueEndingProps> = ({ onRestart, trackPoints = [] }) => {
  const [step, setStep] = useState<'pushou_thanks' | 'dancer_bow' | 'postcard_flip'>('pushou_thanks');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showSunsetUnlocked, setShowSunsetUnlocked] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleNextDialogue = () => {
    if (dialogueIdx < EPILOGUE_DIALOGUES.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      soundFX.playBronzeChime();
      setStep('dancer_bow');
      setTimeout(() => {
        setStep('postcard_flip');
      }, 2500);
    }
  };

  const handleFlipCard = () => {
    soundFX.playStoneDrum();
    soundFX.playSandScratch();
    setIsFlipped(!isFlipped);
  };

  const handleShare = () => {
    soundFX.playStoneDrum();
    navigator.clipboard?.writeText?.(
      '【大葆台汉墓博物馆 · 时空守护明信片】我已走完戈影、宴乐、浮游、百戏、袖舞、题凑、星路七关，玉舞人完全体重聚，大葆台千古汉风永续传承！'
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const currentScroll = target.scrollTop;
    setScrollY(currentScroll);
    if (currentScroll > 140 && !showSunsetUnlocked) {
      soundFX.playMemoryRestore();
      setShowSunsetUnlocked(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative w-full h-full bg-[#0d0906] text-[#e6d5b8] flex flex-col justify-between overflow-y-auto font-serif select-none scrollbar-none"
    >
      {/* Top Banner */}
      <div className="p-2.5 bg-[#17100b] border-b border-[#3d2b1f] flex items-center justify-between z-20 shadow-md sticky top-0">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-mono tracking-widest text-[#88b598]">
            EPILOGUE · 终章 守护结语
          </span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500 font-bold">
          全七关记忆修复达成
        </span>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-3">
        {step === 'pushou_thanks' && (
          // 1. Pushou & Broken Gate Thanks Stage
          <div className="relative w-full max-w-sm rounded-3xl bg-[#1c130d] border-2 border-amber-600/80 p-5 flex flex-col items-center justify-center text-center shadow-2xl space-y-4 animate-fade-in my-auto">
            <div className="w-20 h-20 rounded-full bg-[#2a170d] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.6)]">
              <svg viewBox="0 0 100 100" className="w-14 h-14 fill-amber-400 stroke-amber-700">
                <circle cx="50" cy="50" r="42" fill="#3a2211" stroke="#b45309" strokeWidth="3" />
                <path d="M25 35 Q50 15 75 35 Q50 30 25 35" fill="#d97706" />
                <circle cx="38" cy="45" r="6" fill="#fef3c7" />
                <circle cx="62" cy="45" r="6" fill="#fef3c7" />
                <circle cx="38" cy="45" r="2.5" fill="#78350f" />
                <circle cx="62" cy="45" r="2.5" fill="#78350f" />
                <path d="M44 55 Q50 50 56 55 Q50 65 44 55" fill="#b45309" />
                <circle cx="50" cy="72" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-[#ffe89c] tracking-widest">
                守门者 · 鎏金铜铺首致谢
              </h3>
              <p className="text-[10px] text-[#c2a385]">
                记忆之光抵御了怪谈侵蚀，大葆台的名字将永续长青
              </p>
            </div>
          </div>
        )}

        {step === 'dancer_bow' && (
          // 2. Jade Dancer Deep Bow (揖礼)
          <div className="relative w-full max-w-sm rounded-3xl bg-[#14231b] border-2 border-emerald-500/80 p-6 flex flex-col items-center justify-center text-center shadow-2xl space-y-4 animate-fade-in my-auto">
            <div className="relative w-36 h-44 flex items-center justify-center">
              {/* Jade Dancer Bowing Silhouette */}
              <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(52,211,153,0.9)] animate-pulse">
                {/* Bowing posture curved spine and folded sleeves */}
                <path
                  d="M60 25 C55 30, 50 35, 45 42 C38 52, 25 58, 15 50 C10 45, 18 35, 28 38 C35 42, 40 48, 44 55 C46 68, 40 82, 38 95 C35 105, 50 112, 60 110 C70 108, 62 92, 56 80 C65 75, 78 62, 80 45 C82 30, 68 25, 60 32"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="62" cy="22" r="7" fill="#ffffff" />
                {/* Bowing hands joined in front */}
                <path d="M35 55 Q45 60 55 55" stroke="#ffffff" strokeWidth="4" fill="none" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-emerald-300 tracking-widest">
                玉舞人 · 躬身汉家揖礼致谢
              </h3>
              <p className="text-[10px] text-[#a7f3d0]">
                “两千载汉韵长存，幸得与君共此行。”
              </p>
            </div>
          </div>
        )}

        {step === 'postcard_flip' && (
          // 3. Postcard 3D Flipping Card Stage
          <div className="w-full max-w-sm flex flex-col items-center space-y-3 animate-fade-in my-1">
            <div className="flex items-center justify-between w-full px-1">
              <span className="text-[9px] font-mono text-[#a3805d]">
                点击明信片任意处 3D 翻转切换正反面
              </span>
              <button
                onClick={handleFlipCard}
                className="flex items-center gap-1 text-[9px] font-mono text-[#ffe89c] bg-[#24170d] px-2 py-0.5 rounded-full border border-[#5c4033] hover:border-amber-500"
              >
                <Rotate3d className="w-3 h-3" />
                <span>{isFlipped ? '看正面 (实景)' : '看反面 (轨迹)'}</span>
              </button>
            </div>

            {/* 3D Flip Card Box */}
            <div
              onClick={handleFlipCard}
              className="relative w-full aspect-[4/3] rounded-3xl cursor-pointer perspective-1000 shadow-2xl group"
              style={{ perspective: '1200px' }}
            >
              <div
                className={`relative w-full h-full rounded-3xl transition-transform duration-700 transform-style-3d border-2 border-amber-600/80 overflow-hidden ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front Side: Modern Dabaotai Museum Exterior Scene */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#1c130d] flex flex-col justify-between p-3 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center filter brightness-105"
                    style={{ backgroundImage: `url(${ASSETS.museumExterior})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                  {/* Stamp & Seal at top right */}
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-amber-300 border border-amber-600/50">
                      3026 见证者守护达成
                    </span>
                    <div className="w-13 h-13 rounded-lg border-2 border-red-600/80 bg-red-950/40 text-red-400 flex flex-col items-center justify-center p-1 text-[7px] font-serif font-black shadow transform rotate-6">
                      <span>大葆台</span>
                      <span>博物馆印</span>
                    </div>
                  </div>

                  {/* Bottom Text & Seal */}
                  <div className="relative z-10 space-y-0.5">
                    <h4 className="text-xs font-black text-[#ffe89c] font-serif">
                      北京大葆台西汉墓博物馆 · 纪念明信片
                    </h4>
                    <p className="text-[9px] text-[#e6d5b8] line-clamp-1">
                      “两千年前的西汉王陵，一千年后的未来归途，在此刻相会。”
                    </p>
                  </div>
                </div>

                {/* Back Side: 7-Chapter Trajectory Map & User Path */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#140e0a] flex flex-col justify-between p-3 backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Grid background */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'radial-gradient(#ffe89c 1px, transparent 0)',
                      backgroundSize: '14px 14px',
                    }}
                  />

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between border-b border-[#3d2b1f] pb-1">
                    <span className="text-[9px] font-black text-[#ffe89c] flex items-center gap-1">
                      <Compass className="w-3 h-3 text-amber-400" />
                      <span>七关见证轨迹图 (1-7章连线)</span>
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400">
                      7/7 全通关
                    </span>
                  </div>

                  {/* 7 Chapter S-Curve Node Map */}
                  <div className="relative flex-1 w-full my-1">
                    {/* Golden Path Line connecting nodes */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <polyline
                        points={SEVEN_STAGES.map((s) => `${s.x}%,${s.y}%`).join(' ')}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        strokeDasharray="4,3"
                        className="animate-pulse"
                      />
                    </svg>

                    {/* Stage Pins */}
                    {SEVEN_STAGES.map((stage, idx) => (
                      <div
                        key={stage.id}
                        style={{ left: `${stage.x}%`, top: `${stage.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 group"
                      >
                        <div className="w-4 h-4 rounded-full bg-amber-600 border border-[#ffe89c] text-white flex items-center justify-center text-[7px] font-mono font-bold shadow-[0_0_8px_#f59e0b]">
                          {idx + 1}
                        </div>
                        <span className="text-[8px] font-serif text-[#ffe89c] bg-black/80 px-1 rounded truncate">
                          {stage.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer on Card */}
                  <div className="relative z-10 text-[8px] font-mono text-[#a3805d] flex justify-between">
                    <span>守护者坐标：大葆台</span>
                    <span>记忆连线率：100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Jade Dancer Logo at Bottom Left */}
            <div className="w-full flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 bg-[#17100b] px-3 py-1.5 rounded-2xl border border-emerald-600/60 shadow-md">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                    <path
                      d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                      fill="none"
                      stroke="#a7f3d0"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-emerald-300 font-serif">
                    我有玉舞人
                  </span>
                  <span className="text-[7px] text-[#88b598] font-mono">
                    通照汉古今
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 bg-[#291b12] hover:bg-[#3d2b1f] text-[#ffe89c] rounded-xl border border-amber-600 text-[9px] font-serif flex items-center gap-1 shadow active:scale-95"
                >
                  <Share2 className="w-3 h-3 text-[#ffe89c]" />
                  <span>{isCopied ? '已复制' : '分享明信片'}</span>
                </button>
              </div>
            </div>

            {/* Scroll Down Prompt */}
            <div className="w-full text-center pt-2 pb-1 text-[9px] text-[#a3805d] flex flex-col items-center gap-1 animate-bounce">
              <span>往下滑动查看终章归宿 · 大葆台夕阳</span>
              <ChevronDown className="w-4 h-4 text-amber-400" />
            </div>

            {/* 4. Sunset Ending Scene Revealed on Scroll Down */}
            <div className="w-full rounded-3xl bg-[#1a110a] border-2 border-amber-500/80 p-4 shadow-2xl space-y-3 mt-4">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-amber-600/70 shadow-lg">
                <img
                  src={ASSETS.museumSunset}
                  alt="大葆台现代实景夕阳"
                  className="w-full h-full object-cover filter brightness-105 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-3 text-center">
                  <span className="text-[8px] font-mono text-amber-200 bg-black/70 px-2 py-0.5 rounded-full border border-amber-500/50">
                    现代实景 · 夕阳之下的大葆台
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-center px-1">
                <h3 className="text-xs font-black text-[#ffe89c] tracking-widest font-serif">
                  终章余韵 · 文明火种，生生不息
                </h3>
                <p className="text-[10px] text-[#e6d5b8] leading-relaxed">
                  玉舞人回到大葆台恒温展柜中，静静安守两千载汉家礼乐；
                  而你带着这段跨越三千年的记忆重归现实，
                  只要记忆未被遗忘，大葆台便永远活在每一个踏入此地的人心中。
                </p>
              </div>

              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  onRestart();
                }}
                className="w-full py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-xl border border-[#d2b48c] text-[10px] shadow-2xl flex items-center justify-center gap-1 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重新体验完整七关时空</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogue System in Pushou Thanks phase */}
      {step === 'pushou_thanks' && (
        <DialogueSystem
          dialogues={EPILOGUE_DIALOGUES}
          currentIndex={dialogueIdx}
          onNext={handleNextDialogue}
          restorationLevel={7}
        />
      )}
    </div>
  );
};
