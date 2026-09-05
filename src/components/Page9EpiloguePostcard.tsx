import React, { useState, useRef, useEffect } from 'react';
import { UserInteractionTrackPoint } from '../types';
import { soundFX } from '../utils/soundEngine';
import { ASSETS } from '../data/museumData';
import { Sparkles, RotateCcw, Download, CheckCircle2, Sunset, RefreshCw } from 'lucide-react';
import { HanPlaqueButton } from './HanPlaqueButton';

interface Page9EpiloguePostcardProps {
  onRestartHome: () => void;
  trackPoints: UserInteractionTrackPoint[];
}

export const Page9EpiloguePostcard: React.FC<Page9EpiloguePostcardProps> = ({
  onRestartHome,
  trackPoints,
}) => {
  const [isAssembled, setIsAssembled] = useState<boolean>(false);
  const [showPostcardModal, setShowPostcardModal] = useState<boolean>(false);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [showSunsetExit, setShowSunsetExit] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Assemble Jade Dancer
  useEffect(() => {
    soundFX.playBronzeChime();
    const timer = setTimeout(() => {
      setIsAssembled(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Draw Personal Long-Sleeve Archaeological Memory Postcard
  useEffect(() => {
    if (!showPostcardModal) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 320;
    const height = 440;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient: from Sand to Earth to Celestial Night Sky
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#2c1d12');
    bgGrad.addColorStop(0.35, '#3a1d1d');
    bgGrad.addColorStop(0.7, '#1a130f');
    bgGrad.addColorStop(1, '#070b16');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Han Double Border
    ctx.strokeStyle = '#d2b48c';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);
    ctx.strokeStyle = '#ffe89c';
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Title
    ctx.fillStyle = '#e6d5b8';
    ctx.font = 'bold 18px "Songti SC", "Noto Serif SC", serif';
    ctx.textAlign = 'center';
    ctx.fillText('大葆台记忆长卷', width / 2, 40);

    ctx.fillStyle = '#ffe89c';
    ctx.font = '10px sans-serif';
    ctx.fillText('汉代生命观数字舞蹈 · 个人探索明信片', width / 2, 58);

    // Draw Smooth Long-Sleeve S-Curve Exploration Path
    ctx.beginPath();
    ctx.moveTo(35, 90);
    ctx.bezierCurveTo(270, 140, 20, 240, 270, 330);
    ctx.strokeStyle = '#ffe89c';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Celadon Jade Glow Path
    ctx.beginPath();
    ctx.moveTo(32, 90);
    ctx.bezierCurveTo(267, 140, 23, 240, 267, 330);
    ctx.strokeStyle = 'rgba(136, 181, 152, 0.5)';
    ctx.lineWidth = 7;
    ctx.stroke();

    // 7 Chapter Nodes
    const nodes = [
      { x: 35, y: 90, name: '戈影' },
      { x: 170, y: 125, name: '宴乐' },
      { x: 250, y: 170, name: '浮游' },
      { x: 130, y: 210, name: '百戏' },
      { x: 55, y: 255, name: '袖舞' },
      { x: 160, y: 295, name: '木阵' },
      { x: 270, y: 330, name: '魂归' },
    ];

    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff7d6';
      ctx.fill();
      ctx.strokeStyle = '#88b598';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#e8f8ec';
      ctx.font = '9px sans-serif';
      ctx.fillText(node.name, node.x, node.y - 8);
    });

    // Central Bowing Jade Dancer Stamp
    ctx.beginPath();
    ctx.arc(width / 2, 220, 28, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(36, 26, 19, 0.9)';
    ctx.fill();
    ctx.strokeStyle = '#d2b48c';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffe89c';
    ctx.font = 'bold 12px serif';
    ctx.fillText('大葆台', width / 2, 217);
    ctx.font = '9px serif';
    ctx.fillText('揖礼致谢', width / 2, 230);

    // Footer Info
    ctx.fillStyle = '#a3805d';
    ctx.font = '8px monospace';
    ctx.fillText(`探索日期: ${new Date().toLocaleDateString()} · 章节解锁: 7/7`, width / 2, 385);
    ctx.fillStyle = '#d2b48c';
    ctx.font = '10px serif';
    ctx.fillText('北京大葆台西汉墓遗址博物馆 监制', width / 2, 405);
  }, [showPostcardModal, trackPoints]);

  const handleSavePostcard = () => {
    soundFX.playStoneDrum();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2200);
  };

  const handleTriggerSunset = () => {
    soundFX.playWindLeaves();
    setShowSunsetExit(true);
  };

  return (
    <div className="relative w-full h-full bg-[#140e0a] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Header Bar */}
      <div className="p-2.5 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ffe89c] animate-spin" />
          <div>
            <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
              EPILOGUE · COMPLETE RESTORATION
            </span>
            <h2 className="text-xs sm:text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              终章 · 汉代揖礼与明信片
            </h2>
          </div>
        </div>

        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#2e4d36] text-[#cdeacd] border border-[#88b598]">
          七片合一 100%
        </span>
      </div>

      {/* Main Assembly Stage */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-none">
        {/* Assembled Jade Dancer Visual Centerpiece */}
        <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#1c130d] border-2 border-[#5c4033] flex flex-col items-center justify-center overflow-hidden shadow-2xl p-3">
          <div className="absolute inset-0 bg-radial-gradient from-[#88b598]/20 via-transparent to-transparent animate-pulse" />

          {/* Central Complete Jade Dancer with Bowing Gesture */}
          <div className="relative w-28 h-36 flex items-center justify-center">
            <svg
              viewBox="0 0 100 120"
              className={`w-full h-full filter drop-shadow-[0_0_16px_rgba(255,232,156,0.9)] transition-all duration-1000 ${
                isAssembled ? 'scale-105 opacity-100' : 'scale-75 opacity-40'
              }`}
            >
              <defs>
                <linearGradient id="fullJadeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#cdeacd" />
                  <stop offset="100%" stopColor="#7aa88a" />
                </linearGradient>
              </defs>

              <path
                d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                fill="none"
                stroke="url(#fullJadeGrad2)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="14" r="8" fill="#ffffff" />
              <circle cx="50" cy="14" r="13" fill="none" stroke="#ffe89c" strokeWidth="1.2" className="animate-spin" />
            </svg>
          </div>

          <div className="mt-1.5 text-center">
            <span className="text-[11px] font-black text-[#ffe89c] tracking-widest flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#88b598]" />
              玉舞人已完整归一 · 汉代揖礼致谢
            </span>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="bg-[#241a13]/95 border-2 border-[#3d2b1f] p-3 rounded-2xl shadow-xl text-xs space-y-1.5 backdrop-blur-md">
          <p className="text-[#c2a385] text-[10px] leading-relaxed">
            1974年大葆台汉墓被发现，2025年完成全面文物保护修复。显微仪器拂去两千年的尘土——是为了让今天的我们能记住你。
          </p>
          <div className="bg-[#1a120b] p-2.5 rounded-xl border border-[#3d2b1f] text-[10px] text-[#e8f8ec] italic leading-relaxed">
            玉舞人（温柔揖礼）：“谢谢你，让我从一件冰冷的随葬品，变成了一段鲜活被记住的记忆。”
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <HanPlaqueButton
            onClick={() => {
              soundFX.playStoneDrum();
              setShowPostcardModal(true);
            }}
            size="md"
            className="w-full"
            leftIcon={<Sparkles className="w-4 h-4 text-[#D6A84B]" />}
          >
            查看【个人记忆长卷明信片】(支持翻转)
          </HanPlaqueButton>

          <HanPlaqueButton
            onClick={handleTriggerSunset}
            size="sm"
            className="w-full"
            leftIcon={<Sunset className="w-4 h-4 text-[#D6A84B]" />}
          >
            走出大葆台 · 眺望现代晚霞与归途
          </HanPlaqueButton>
        </div>
      </div>

      {/* Postcard Modal with Flip Card Capability (Requirement 11) */}
      {showPostcardModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 animate-fade-in">
          <div className="bg-[#241a13] border-2 border-[#5c4033] rounded-3xl p-3 max-w-xs w-full shadow-2xl flex flex-col items-center space-y-2.5 relative">
            {/* Card Flip Container */}
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="cursor-pointer group relative w-full flex justify-center"
            >
              {!isCardFlipped ? (
                <div className="relative">
                  <canvas ref={canvasRef} className="rounded-2xl shadow-2xl border border-[#3d2b1f]" />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-[#ffe89c] text-[8px] px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>点击翻转背面</span>
                  </div>
                </div>
              ) : (
                <div className="w-[320px] h-[440px] rounded-2xl bg-[#291a12] border-2 border-[#ffe89c] p-4 flex flex-col justify-between text-[#d2b48c] shadow-2xl">
                  <div className="text-center border-b border-[#3d2b1f] pb-2">
                    <h4 className="text-sm font-black text-[#ffe89c] font-serif">大葆台致探索者寄语</h4>
                    <span className="text-[9px] text-[#a3805d] font-mono">POSTCARD FROM 2000 YEARS AGO</span>
                  </div>

                  <p className="text-[11px] text-[#e6d5b8] font-serif leading-relaxed text-justify px-2">
                    “汉家陵阙，幽燕长歌。广阳王的盛宴虽已散场，但大汉的余韵，仍在黄肠木的年轮中静静流淌。愿这段数字舞蹈旅程，让你触摸到了一个真实而生动的汉代。”
                  </p>

                  <div className="bg-[#1a100a] p-2.5 rounded-xl border border-[#3d2b1f] text-center">
                    <span className="text-[10px] text-[#88b598] font-serif font-black">
                      ✦ 北京大葆台西汉墓遗址博物馆 ✦
                    </span>
                  </div>

                  <div className="text-center text-[9px] text-[#a3805d] font-mono">
                    点击任意处翻回正面
                  </div>
                </div>
              )}
            </div>

            {/* Modal Controls */}
            <div className="flex items-center gap-2 w-full">
              <HanPlaqueButton
                onClick={handleSavePostcard}
                size="sm"
                className="flex-1"
                leftIcon={<Download className="w-3.5 h-3.5 text-[#D6A84B]" />}
              >
                {savedSuccess ? '已保存至相册 ✓' : '保存明信片'}
              </HanPlaqueButton>

              <button
                onClick={() => setShowPostcardModal(false)}
                className="py-2 px-3 bg-[#1a120b] text-[#c2a385] hover:text-[#ffe89c] rounded-xl border border-[#3d2b1f] text-xs font-serif active:scale-95"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Sunset Museum Transition Modal (Requirement 11) */}
      {showSunsetExit && (
        <div className="fixed inset-0 z-50 bg-[#120b07] flex flex-col justify-between animate-fade-in p-4">
          <div className="relative w-full h-[65%] rounded-3xl overflow-hidden border-2 border-[#5c4033] shadow-2xl">
            <img
              src={ASSETS.museumSunset}
              alt="北京大葆台博物馆晚霞外景"
              className="w-full h-full object-cover filter brightness-[1.05]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-transparent to-black/30" />

            <div className="absolute bottom-4 inset-x-4 text-center">
              <span className="text-[10px] text-amber-300 font-mono tracking-widest bg-black/60 px-3 py-1 rounded-full border border-amber-500/30">
                黄昏晚霞 · 现代北京大葆台博物馆
              </span>
              <h3 className="text-base font-black text-white mt-1 font-serif title-drop-shadow">
                两千年的重逢 · 归于今日的宁静
              </h3>
            </div>
          </div>

          <div className="p-2 text-center space-y-2">
            <p className="text-[11px] text-[#c2a385] font-serif leading-relaxed">
              穿过两千年的时光隧道，从幽深的王陵地下重新回到阳光温暖的现代大葆台。
            </p>
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setShowSunsetExit(false);
                onRestartHome();
              }}
              size="md"
              className="w-full"
              leftIcon={<RotateCcw className="w-4 h-4 text-[#D6A84B]" />}
            >
              首尾循环 · 重新开始探索旅程
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* Bottom Footer Restart Button */}
      <div className="p-2.5 bg-[#241a13] border-t border-[#3d2b1f] z-10">
        <HanPlaqueButton
          onClick={() => {
            soundFX.playStoneDrum();
            onRestartHome();
          }}
          size="sm"
          className="w-full"
          leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#D6A84B]" />}
        >
          重新探索大葆台 (回到首页风吹沙)
        </HanPlaqueButton>
      </div>
    </div>
  );
};
