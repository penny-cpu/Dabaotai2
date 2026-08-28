import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, Award, RotateCcw, Share2, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { ASSETS } from '../data/museumData';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';

interface EpilogueEndingProps {
  onRestart: () => void;
}

const EPILOGUE_DIALOGUES: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人 (完全体)',
    text: '谢谢你。两千年的舞，不会在今天停下。大葆台的名字，我们一起守住了。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '时空隧道已经稳定。带着大葆台的记忆，回到你的时代去吧。',
  },
  {
    speaker: 'player',
    speakerName: '见证者 (你)',
    text: '我们会永远记得这里。',
  },
];

export const EpilogueEnding: React.FC<EpilogueEndingProps> = ({ onRestart }) => {
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleNextDialogue = () => {
    if (dialogueIdx < EPILOGUE_DIALOGUES.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      soundFX.playBronzeChime();
      setShowCertificate(true);
    }
  };

  const handleShare = () => {
    soundFX.playStoneDrum();
    navigator.clipboard?.writeText?.(
      '【规则怪谈降临大葆台——我有玉舞人通三代】我已找回全部 7 块记忆碎片，成功守护西汉大葆台博物馆！'
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-full bg-[#120e0a] text-[#e6d5b8] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Banner */}
      <div className="p-2.5 bg-[#1f150e] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-mono tracking-widest text-[#88b598]">
            EPILOGUE · 终章 8A & 8B
          </span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500 font-bold">
          大葆台记忆修复 7/7 达成
        </span>
      </div>

      {/* Main Center Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
        {!showCertificate ? (
          // 8A: Complete Restored Jade Dancer Animation & Ascending Light
          <div className="relative w-full max-w-sm rounded-3xl bg-[#1c130d] border-2 border-emerald-600/60 p-6 flex flex-col items-center justify-center text-center shadow-2xl space-y-4">
            {/* Glowing Jade Dancer Aura */}
            <div className="relative w-36 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" />
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full filter drop-shadow-[0_0_15px_rgba(167,243,208,0.9)]"
              >
                <path
                  d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="14" r="7" fill="#ffffff" />
              </svg>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-black text-[#ffe89c] tracking-widest">
                玉舞人完全体回归 · 汉韵长存
              </h2>
              <p className="text-[10px] text-[#c2a385] leading-relaxed">
                玉光反冲七层空间，黄肠木构、幽暗墓道、百戏画像、随葬铜钫全面复原，现代大葆台博物馆安然永驻！
              </p>
            </div>
          </div>
        ) : (
          // 8B: Witness Certificate Card (见证者卡片)
          <div className="w-full max-w-sm rounded-3xl bg-[#1c130d] border-2 border-amber-600/80 p-5 shadow-2xl flex flex-col items-center text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_15px_#f59e0b]">
              <Award className="w-6 h-6 text-amber-300" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[8px] font-mono tracking-widest text-[#a3805d]">
                DABAOTAI TIME-WITNESS CERTIFICATE
              </span>
              <h3 className="text-sm font-black text-[#ffe89c] tracking-wider">
                大葆台时空见证者纪念卡
              </h3>
            </div>

            {/* Certificate Details */}
            <div className="w-full bg-[#120b08] border border-[#3d2b1f] rounded-2xl p-3 text-left space-y-1 text-[9px] font-mono text-[#c2a385]">
              <div className="flex justify-between">
                <span>见证者身份：</span>
                <span className="text-[#ffe89c] font-bold">大葆台三代守护者</span>
              </div>
              <div className="flex justify-between">
                <span>记忆修复度：</span>
                <span className="text-emerald-400 font-bold">100% (7/7 碎片)</span>
              </div>
              <div className="flex justify-between">
                <span>时空锚定点：</span>
                <span className="text-[#ffe89c]">北京大葆台西汉墓博物馆</span>
              </div>
              <div className="flex justify-between">
                <span>守护铭文：</span>
                <span className="text-[#d2b48c] italic font-serif">“我有玉舞人，通照汉古今”</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex items-center gap-2 pt-1">
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 bg-[#291b12] hover:bg-[#3d2b1f] text-[#ffe89c] font-serif font-black rounded-xl border border-amber-600 text-[10px] shadow flex items-center justify-center gap-1 active:scale-95"
              >
                <Share2 className="w-3 h-3 text-[#ffe89c]" />
                <span>{isCopied ? '已复制见证辞' : '分享见证荣耀'}</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  onRestart();
                }}
                className="flex-1 py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-white font-serif font-black rounded-xl border border-[#d2b48c] text-[10px] shadow flex items-center justify-center gap-1 active:scale-95"
              >
                <RotateCcw className="w-3 h-3 text-amber-300" />
                <span>再走一次七关</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogue System in 8A */}
      {!showCertificate && (
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
