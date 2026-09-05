import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { HanMuseumTopBar } from './HanLinearDecorations';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import tombDarkBg from '../assets/images/tomb_jade_dancer_dark_1788598149842.jpg';

interface PrologueFlowProps {
  onStartChapter1: () => void;
}

type PrologueStep = 'cover' | 'narration' | 'dancer_awakening';

export const PrologueFlow: React.FC<PrologueFlowProps> = ({ onStartChapter1 }) => {
  const [step, setStep] = useState<PrologueStep>('cover');
  const [isGateOpening, setIsGateOpening] = useState<boolean>(false);

  // Eyelid vertical blink state: 0 = closed, 1 = first opening, 2 = blink close, 3 = fully open, 4 = hidden
  const [eyeStage, setEyeStage] = useState<number>(0);
  const [isEyeAnimationActive, setIsEyeAnimationActive] = useState<boolean>(false);

  // Step 1: Open Gate Animation & transition to narration
  const handleOpenTombGate = () => {
    if (isGateOpening) return;
    setIsGateOpening(true);
    soundFX.playStoneDrum();
    soundFX.playBronzeChime();

    setTimeout(() => {
      setStep('narration');
      setIsGateOpening(false);
    }, 1100);
  };

  // Step 2 -> Step 3: Close eyes and enter awakening
  const handleProceedToAwakening = () => {
    soundFX.playBronzeChime();
    setStep('dancer_awakening');
  };

  // Vertical eye blink effect: blinks ONCE only
  useEffect(() => {
    if (step !== 'dancer_awakening') return;

    setEyeStage(0);
    setIsEyeAnimationActive(true);

    // Initial eye opening (vertical)
    const t1 = setTimeout(() => {
      soundFX.playBronzeChime();
      setEyeStage(1); // vertical slit opens with blur
    }, 400);

    // Blink once: briefly close slightly
    const t2 = setTimeout(() => {
      setEyeStage(2); // blink once
    }, 1600);

    // Reopen fully into crystal clear view
    const t3 = setTimeout(() => {
      soundFX.playMemoryRestore();
      setEyeStage(3); // fully open
    }, 2100);

    // Hide overlay completely
    const t4 = setTimeout(() => {
      setEyeStage(4);
      setIsEyeAnimationActive(false);
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [step]);

  const handleSkipEyeAnimation = () => {
    setEyeStage(4);
    setIsEyeAnimationActive(false);
  };

  return (
    <div className="relative w-full h-full text-[#E6D3AA] font-serif overflow-hidden select-none flex flex-col justify-between bg-[#110907]">
      {/* =========================================================================
          PAGE 01: 封面页 · 大葆台 (红棕深黑色调，墓门开启交互，无边框无角线)
          ========================================================================= */}
      {step === 'cover' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between animate-fade-in p-3 pb-2 overflow-hidden">
          {/* Base Red-Brown Dark Black Backdrop */}
          <MuseumTombBackdrop palette="prologue" pattern="cloud" spotlight={true} intensity="subtle" />

          {/* Top Museum Header */}
          <HanMuseumTopBar />

          {/* Center Main Calligraphy & Title Block */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 my-auto">
            {/* Grand Ancient Calligraphy: 大 葆 台 (字号缩小10%，增加字间距) */}
            <h1 className="text-[33px] sm:text-[40px] font-black text-[#F1D98D] tracking-[0.42em] font-serif pl-[0.42em] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] filter">
              大 葆 台
            </h1>

            {/* Subtitle: 北京大葆台西汉墓遗址博物馆 */}
            <p className="text-xs sm:text-sm text-[#E6D3AA]/95 font-serif tracking-[0.24em] mt-3 pl-[0.24em] drop-shadow">
              北京大葆台西汉墓遗址博物馆
            </p>

            {/* English Translation */}
            <p className="text-[8.5px] text-[#A89078] tracking-[0.3em] uppercase font-sans mt-2 opacity-80 pl-[0.3em]">
              BEIJING DABAOTAI WESTERN HAN TOMB SITE MUSEUM
            </p>

            {/* 
              ===================================================================
              【入墓墓穴门开启交互】：两侧有纹路勾勒出的墓穴门，点击时两侧墓门缓慢分开
              ===================================================================
            */}
            <div className="mt-9 flex items-center justify-center relative">
              {/* Left Tomb Stone Door */}
              <div
                className={`transition-all duration-1000 ease-out flex items-center pointer-events-none select-none ${
                  isGateOpening ? '-translate-x-20 opacity-0' : 'translate-x-0 opacity-100'
                }`}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  className="text-[#C8943D] filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
                >
                  {/* Outer Door Frame with Arch */}
                  <path
                    d="M38 4 L8 4 C5 4 4 6 4 9 L4 40 L38 40"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Archaic Cloud Lines on Door Panel */}
                  <path
                    d="M10 12 C18 10, 22 18, 30 16 C34 14, 36 12, 38 12"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeOpacity="0.75"
                  />
                  <path
                    d="M10 24 C16 22, 24 30, 32 26 C35 24, 37 22, 38 22"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeOpacity="0.75"
                  />
                  {/* Pushou Bronze Ring Stud */}
                  <circle cx="28" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M28 25.5 L28 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>

              {/* Center Trigger: 入 墓 (无边框，四角无横线) */}
              <button
                onClick={handleOpenTombGate}
                disabled={isGateOpening}
                className="relative mx-2 px-6 py-2.5 bg-gradient-to-r from-[#2A160E] via-[#3E2114] to-[#2A160E] text-[#F1D98D] font-serif font-bold text-xs tracking-[0.38em] pl-[0.48em] shadow-[0_0_24px_rgba(200,148,61,0.22)] hover:shadow-[0_0_28px_rgba(200,148,61,0.4)] active:scale-95 transition-all cursor-pointer flex items-center justify-center rounded-sm"
              >
                <span>入 墓</span>
              </button>

              {/* Right Tomb Stone Door */}
              <div
                className={`transition-all duration-1000 ease-out flex items-center pointer-events-none select-none ${
                  isGateOpening ? 'translate-x-20 opacity-0' : 'translate-x-0 opacity-100'
                }`}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  className="text-[#C8943D] filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
                >
                  {/* Outer Door Frame with Arch */}
                  <path
                    d="M6 4 L36 4 C39 4 40 6 40 9 L40 40 L6 40"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Archaic Cloud Lines on Door Panel */}
                  <path
                    d="M34 12 C26 10, 22 18, 14 16 C10 14, 8 12, 6 12"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeOpacity="0.75"
                  />
                  <path
                    d="M34 24 C28 22, 20 30, 12 26 C9 24, 7 22, 6 22"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeOpacity="0.75"
                  />
                  {/* Pushou Bronze Ring Stud */}
                  <circle cx="16" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M16 25.5 L16 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Footer Note */}
          <div className="relative z-10 pb-2 text-center">
            <span className="text-[9px] text-[#8C7662] tracking-widest font-mono">
              ◇ 西汉广阳顷王刘建遗址 沉浸式探秘体验 ◇
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 02: 旁白页 (文字左侧对齐，墓室极暗实景，中央隐约玉舞人局部轮廓)
          ========================================================================= */}
      {step === 'narration' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between animate-fade-in p-4 pb-4 overflow-hidden">
          {/* Background: 墓室深处极暗实景，中央隐约出现玉舞人的局部轮廓 */}
          <div className="absolute inset-0 z-0">
            <img
              src={tombDarkBg}
              alt="墓室深处"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.45] contrast-125"
            />
            {/* Deep dark red-brown vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#110907]/90 via-[#110907]/50 to-[#110907]/95" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
          </div>

          {/* Top Museum Header */}
          <div className="relative z-20">
            <HanMuseumTopBar
              onSkip={handleProceedToAwakening}
              showSkip={true}
              skipLabel="跳过"
            />
          </div>

          {/* Center Narration Text (左侧对齐) */}
          <div className="relative z-20 my-auto px-4 max-w-sm">
            <div className="flex flex-col text-left space-y-3.5">
              <p className="text-base sm:text-lg font-serif text-[#F1D98D] tracking-widest leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                欢迎各位
              </p>
              <p className="text-sm sm:text-base font-serif text-[#E6D3AA] tracking-wider leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                来到我国第一座汉代遗址类博物馆
              </p>
              <p className="text-sm sm:text-base font-serif text-[#E6D3AA] tracking-wider leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                来到这座扎根于西汉广阳王刘建及其王后墓葬的遗址
              </p>
              <div className="pt-2">
                <p className="text-sm sm:text-base font-serif text-[#F1D98D] tracking-widest leading-relaxed drop-shadow">
                  现在
                </p>
                <p className="text-sm sm:text-base font-serif text-[#E6D3AA] tracking-widest leading-relaxed drop-shadow">
                  请闭上双眼
                </p>
                <p className="text-xs sm:text-sm font-serif text-[#C8943D] tracking-[0.25em] leading-relaxed drop-shadow mt-1">
                  时间正缓缓倒流...
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action: 闭上双眼 · 时间倒流 (无边框) */}
          <div className="relative z-20 w-full flex justify-center pb-2">
            <button
              onClick={handleProceedToAwakening}
              className="relative px-8 py-2.5 bg-gradient-to-r from-[#2A160E]/95 via-[#3E2114]/95 to-[#2A160E]/95 text-[#F1D98D] font-serif font-bold text-xs tracking-[0.3em] pl-[0.4em] shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(200,148,61,0.3)] active:scale-95 transition-all cursor-pointer rounded-sm"
            >
              <span>闭上双眼 · 倒流溯源</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 03: 玉舞人苏醒页 (竖向睁眼模糊特效，眨眼一次，玉舞人由下往上被照亮，左侧对齐对话框)
          ========================================================================= */}
      {step === 'dancer_awakening' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between animate-fade-in p-3 pb-2 overflow-hidden">
          {/* Background: 在同一张图的基础上，玉舞人身影变清晰，由下往上被照亮 */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={tombDarkBg}
              alt="墓室玉舞人"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.7] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#110907]/80 via-transparent to-[#110907]/90" />

            {/* 玉青色只存在于玉舞人：从下往上的极其微弱的玉青色聚光 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="w-64 h-80 rounded-full bg-gradient-to-t from-[#79B9A1]/30 via-[#79B9A1]/12 to-transparent blur-3xl animate-pulse"
                style={{ animationDuration: '4s' }}
              />
            </div>

            {/* 微弱尘埃浮动粒子 */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <span className="absolute top-[28%] left-[35%] w-1 h-1 rounded-full bg-[#79B9A1] blur-[0.5px] animate-ping" style={{ animationDuration: '3s' }} />
              <span className="absolute top-[42%] right-[32%] w-1 h-1 rounded-full bg-[#E6D3AA] blur-[0.5px] animate-pulse" style={{ animationDuration: '2.5s' }} />
              <span className="absolute top-[55%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#79B9A1]/80 blur-[0.5px] animate-pulse" style={{ animationDuration: '3.8s' }} />
              <span className="absolute top-[68%] right-[40%] w-1 h-1 rounded-full bg-[#E6D3AA]/70 blur-[0.5px] animate-ping" style={{ animationDuration: '4.2s' }} />
            </div>
          </div>

          {/* 
            =====================================================================
            【第一视角竖向睁眼动画特效】：
            - 竖向睁眼 (Top lid & Bottom lid)
            - 模糊感 (Backdrop blur)
            - 眨眼一次 (Blink once only)
            ===================================================================== 
          */}
          {isEyeAnimationActive && (
            <div
              onClick={handleSkipEyeAnimation}
              className={`absolute inset-0 z-50 overflow-hidden pointer-events-auto cursor-pointer transition-opacity duration-700 ${
                eyeStage === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {/* Blurred Lens Atmosphere */}
              <div
                className="absolute inset-0 transition-all pointer-events-none"
                style={{
                  backdropFilter:
                    eyeStage === 0
                      ? 'blur(22px) brightness(0.12)'
                      : eyeStage === 1
                      ? 'blur(8px) brightness(0.7)'
                      : eyeStage === 2
                      ? 'blur(12px) brightness(0.35)' // blink once
                      : eyeStage === 3
                      ? 'blur(0px) brightness(1)'
                      : 'none',
                  transitionDuration: eyeStage === 2 ? '280ms' : '700ms',
                }}
              />

              {/* Upper Eyelid (竖向向上开启) */}
              <div
                className="absolute top-0 left-0 right-0 bg-[#0A0402] transition-all ease-out"
                style={{
                  height:
                    eyeStage === 0
                      ? '50%'
                      : eyeStage === 1
                      ? '10%'
                      : eyeStage === 2
                      ? '34%' // blink once
                      : '0%',
                  borderBottomLeftRadius: '50% 28px',
                  borderBottomRightRadius: '50% 28px',
                  boxShadow: '0 20px 40px 15px rgba(0,0,0,0.98)',
                  transitionDuration: eyeStage === 2 ? '280ms' : '650ms',
                }}
              />

              {/* Lower Eyelid (竖向向下开启) */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-[#0A0402] transition-all ease-out"
                style={{
                  height:
                    eyeStage === 0
                      ? '50%'
                      : eyeStage === 1
                      ? '10%'
                      : eyeStage === 2
                      ? '34%' // blink once
                      : '0%',
                  borderTopLeftRadius: '50% 28px',
                  borderTopRightRadius: '50% 28px',
                  boxShadow: '0 -20px 40px 15px rgba(0,0,0,0.98)',
                  transitionDuration: eyeStage === 2 ? '280ms' : '650ms',
                }}
              />
            </div>
          )}

          {/* Top Museum Header */}
          <div className="relative z-20">
            <HanMuseumTopBar
              onSkip={onStartChapter1}
              showSkip={true}
              skipLabel="跳过"
            />
          </div>

          {/* Center Stage: Jade Dancer softly revealed from darkness */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 my-auto">
            {/* Visual Jade Dancer Glow */}
            <div className="relative flex items-center justify-center h-48 w-44">
              <svg viewBox="0 0 100 130" className="w-36 h-48 filter drop-shadow-[0_0_24px_rgba(121,185,161,0.6)]">
                <path
                  d="M50 15 C35 30, 20 60, 28 85 C35 110, 65 125, 80 105 C95 85, 85 50, 68 40 C52 30, 40 55, 45 75 C50 95, 70 100, 75 90"
                  fill="none"
                  stroke="#79B9A1"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d="M52 18 C46 25, 54 30, 48 38 C40 48, 28 58, 18 46 C10 36, 22 22, 32 26 C40 30, 46 38, 48 48 C50 62, 42 78, 38 95 C32 112, 50 124, 62 120 C74 116, 68 98, 60 84 C70 78, 86 64, 88 45 C90 26, 70 18, 58 30 C52 36, 60 52, 52 64"
                  fill="none"
                  stroke="#79B9A1"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <circle cx="52" cy="18" r="5" fill="#79B9A1" />
              </svg>
            </div>
          </div>

          {/* 
            =====================================================================
            【玉舞人对话框】：文字要求左侧对齐，内容如下：
            你已进入
            公元前两千年
            你从沉睡的玉舞人身躯中苏醒
            温润的玉封存着两千年前的汉代记忆。
            但你记不清了——你是谁，你从哪里来，你属于谁。
            =====================================================================
          */}
          <div className="relative z-30 w-full mb-1">
            <div className="w-full bg-[#180C09]/95 p-3.5 rounded-md shadow-2xl backdrop-blur-md">
              {/* Speaker Header */}
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#C8943D]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#79B9A1]" />
                <span className="text-xs font-serif font-black text-[#79B9A1] tracking-widest">
                  玉舞人
                </span>
                <span className="text-[9px] font-mono text-[#A89078]">
                  西汉白玉舞人 · 幽宫苏醒
                </span>
              </div>

              {/* Dialogue Content - Left Aligned */}
              <div className="text-left space-y-1 text-xs sm:text-[13px] font-serif text-[#E6D3AA] leading-relaxed tracking-wider drop-shadow">
                <p>你已进入</p>
                <p className="text-[#F1D98D] font-bold">公元前两千年</p>
                <p>你从沉睡的玉舞人身躯中苏醒</p>
                <p>温润的玉封存着两千年前的汉代记忆。</p>
                <p className="text-[#E6D3AA]/85 pt-0.5">
                  但你记不清了——你是谁，你从哪里来，你属于谁。
                </p>
              </div>

              {/* Action Button: 唤醒记忆 · 踏入大汉 (无边框) */}
              <div className="mt-3 pt-2 flex justify-end">
                <button
                  onClick={() => {
                    soundFX.playStoneDrum();
                    soundFX.playBronzeChime();
                    onStartChapter1();
                  }}
                  className="px-4 py-1.5 bg-[#2E170E] hover:bg-[#3E2114] text-[#F1D98D] font-serif font-bold text-xs tracking-widest active:scale-95 transition-all cursor-pointer rounded-sm"
                >
                  <span>唤醒记忆 · 踏入大汉 ➔</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
