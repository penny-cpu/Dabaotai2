import React, { useState, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, Download, RotateCcw, Share2, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';
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

export const EpilogueEnding: React.FC<EpilogueEndingProps> = ({ onRestart }) => {
  const [step, setStep] = useState<'pushou_thanks' | 'dancer_bow' | 'postcard_view'>('pushou_thanks');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const postcardCardRef = useRef<HTMLDivElement | null>(null);

  const handleNextDialogue = () => {
    if (dialogueIdx < EPILOGUE_DIALOGUES.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      soundFX.playBronzeChime();
      setStep('dancer_bow');
      setTimeout(() => {
        setStep('postcard_view');
      }, 2400);
    }
  };

  const handleDownloadPostcard = () => {
    soundFX.playBronzeChime();
    setIsDownloading(true);

    try {
      // Create high-res offscreen canvas to export the full postcard long image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 750;
      canvas.height = 1200;

      if (ctx) {
        // Dark museum gold gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, 1200);
        grad.addColorStop(0, '#1c120a');
        grad.addColorStop(0.5, '#29180d');
        grad.addColorStop(1, '#0f0804');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 750, 1200);

        // Border
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, 710, 1160);

        // Inner Border
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, 690, 1140);

        // Header Title
        ctx.fillStyle = '#ffe89c';
        ctx.font = 'bold 36px serif';
        ctx.textAlign = 'center';
        ctx.fillText('大葆台汉墓博物馆 · 时空守护明信片', 375, 90);

        ctx.fillStyle = '#c2a385';
        ctx.font = '20px serif';
        ctx.fillText('Dabaotai Western Han Dynasty Relics · 见证者纪念', 375, 125);

        // Sunset Horizon Artwork Box
        ctx.fillStyle = '#170e08';
        ctx.fillRect(50, 160, 650, 360);
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 160, 650, 360);

        ctx.fillStyle = '#fef3c7';
        ctx.font = 'bold 28px serif';
        ctx.fillText('大葆台落日 · 千载汉韵永续长青', 375, 340);

        ctx.fillStyle = '#fbbf24';
        ctx.font = '18px monospace';
        ctx.fillText('【七关记忆已全部找回 · 100% 汉风复原达成】', 375, 380);

        // 7 Stages Track Line
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        SEVEN_STAGES.forEach((stage, idx) => {
          const px = 100 + (stage.x / 100) * 550;
          const py = 560 + (idx / 6) * 380;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // Stage Markers
        SEVEN_STAGES.forEach((stage, idx) => {
          const px = 100 + (stage.x / 100) * 550;
          const py = 560 + (idx / 6) * 380;

          ctx.fillStyle = '#d97706';
          ctx.beginPath();
          ctx.arc(px, py, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffe89c';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 16px monospace';
          ctx.fillText((idx + 1).toString(), px, py + 6);

          ctx.fillStyle = '#ffe89c';
          ctx.font = 'bold 18px serif';
          ctx.textAlign = 'left';
          ctx.fillText(`第0${idx + 1}章 · ${stage.name}`, px + 28, py + 6);
          ctx.textAlign = 'center';
        });

        // Seal at Bottom
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(80, 1020, 590, 110);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.strokeRect(80, 1020, 590, 110);

        ctx.fillStyle = '#a7f3d0';
        ctx.font = 'bold 24px serif';
        ctx.fillText('❖ 我有玉舞人 · 通照汉古今 ❖', 375, 1065);

        ctx.fillStyle = '#6ee7b7';
        ctx.font = '16px monospace';
        ctx.fillText('守护者认证码：DBT-2026-HAN-AUTHENTIC', 375, 1100);

        // Download trigger
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = '大葆台汉墓_时空守护长图明信片.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="relative w-full h-full text-[#e6d5b8] flex flex-col justify-between overflow-y-auto font-serif select-none scrollbar-none"
      style={{
        background: 'linear-gradient(to bottom, #1f1208 0%, #120904 50%, #080402 100%)',
      }}
    >
      {/* Top Banner */}
      <div className="p-2.5 bg-[#1a0f07] border-b border-[#3d2414] flex items-center justify-between z-20 shadow-md sticky top-0">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
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
          // 1. Pushou Thanks Stage
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
          // 2. Jade Dancer Deep Bow
          <div className="relative w-full max-w-sm rounded-3xl bg-[#14231b] border-2 border-emerald-500/80 p-6 flex flex-col items-center justify-center text-center shadow-2xl space-y-4 animate-fade-in my-auto">
            <div className="relative w-36 h-44 flex items-center justify-center">
              <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(52,211,153,0.9)] animate-pulse">
                <path
                  d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-emerald-400">大汉玉舞人 · 敛衽作揖</span>
              <h3 className="text-sm font-black text-[#ffe89c] tracking-widest">
                “多谢你，唤醒了两千年的汉家歌舞。”
              </h3>
            </div>
          </div>
        )}

        {step === 'postcard_view' && (
          // 3. Postcard with Dabaotai Sunset Backdrop & Side-by-Side Buttons (Point 11 & Point 13)
          <div className="w-full max-w-sm flex flex-col items-center space-y-3 animate-fade-in my-auto">
            {/* Postcard Container */}
            <div
              ref={postcardCardRef}
              className="relative w-full rounded-3xl bg-gradient-to-b from-[#24150b] via-[#1a0f07] to-[#0d0703] border-2 border-amber-500/90 p-4 shadow-2xl space-y-3"
            >
              {/* Sunset Landscape Card Section (Point 13) */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-amber-600/70 shadow-lg">
                <img
                  src={ASSETS.museumSunset}
                  alt="大葆台现代实景落日"
                  className="w-full h-full object-cover filter brightness-105 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-3 text-center">
                  <span className="text-[8.5px] font-serif font-black text-[#ffe89c] bg-black/75 px-3 py-1 rounded-full border border-amber-500/60 shadow">
                    现代实景 · 大葆台落日千载汉韵
                  </span>
                </div>
              </div>

              {/* 7 Stage Progression Node Track */}
              <div className="p-2.5 rounded-2xl bg-[#140b06] border border-[#3d2414] space-y-2">
                <div className="flex items-center justify-between text-[9px] font-mono border-b border-[#2b190e] pb-1">
                  <span className="text-[#ffe89c] font-black flex items-center gap-1">
                    <Compass className="w-3 h-3 text-amber-400" />
                    <span>时空见证轨迹图 (1-7章)</span>
                  </span>
                  <span className="text-emerald-400 font-bold">100% 全通关</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {SEVEN_STAGES.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-1 rounded-xl bg-[#211209] border border-amber-800/60 text-center flex flex-col items-center"
                    >
                      <span className="text-[7.5px] font-mono text-amber-400">0{idx + 1}</span>
                      <span className="text-[9px] font-serif font-bold text-[#ffe89c]">{s.name}</span>
                    </div>
                  ))}
                  <div className="p-1 rounded-xl bg-emerald-950/80 border border-emerald-600 text-center flex flex-col items-center justify-center">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span className="text-[8px] font-mono text-emerald-300">圆满</span>
                  </div>
                </div>
              </div>

              {/* Bottom Seal */}
              <div className="flex items-center justify-between p-2 rounded-2xl bg-[#14231b] border border-emerald-600/70">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]">
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
                      我有玉舞人 · 通照汉古今
                    </span>
                    <span className="text-[7.5px] text-[#88b598] font-mono">
                      大葆台西汉墓博物馆 · 认证纪念
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Side-by-Side Dual Buttons: "下载明信片" and "重新体验旅程" (Point 11) */}
            <div className="w-full grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={handleDownloadPostcard}
                disabled={isDownloading}
                className="py-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 text-black font-serif font-black rounded-2xl text-xs shadow-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-amber-300"
              >
                <Download className="w-4 h-4 text-black" />
                <span>{downloadSuccess ? '已下载保存！' : isDownloading ? '正在生成…' : '下载明信片'}</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  onRestart();
                }}
                className="py-3 bg-[#24150b] hover:bg-[#382112] text-[#ffe89c] font-serif font-black rounded-2xl text-xs shadow-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-amber-600"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>重新体验旅程</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pushou Thanks Dialogue */}
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
