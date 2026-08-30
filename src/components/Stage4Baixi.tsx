import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, Play, ArrowRight, Dices } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { RightTopActions } from './RightTopActions';
import { HallTransitionPage } from './HallTransitionPage';

interface Stage4BaixiProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_STAGE4_PAIYOU: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '俳优',
    text: '看我这七颗丸球！我一天能抛“五千四百”回。可“五千四百”和“五千又四百”，到底是不是同一个数？算错了，我今晚的赏钱可没了！',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '百戏看似热闹，也有规则和技巧。你先看清他的说法，再替他算一算。',
  },
];

const DIALOGUES_STAGE4_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '对，两个说法都是五千四百。宴乐重礼，百戏娱民；热闹之中，也有严谨的秩序。我又想起了广阳宴席上的笑声。',
  },
];

export const Stage4Baixi: React.FC<Stage4BaixiProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<'video_preshow' | 'dialogue_paiyou' | 'interactive' | 'success_dialogue' | 'transition'>('video_preshow');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleSelectOption = (opt: 'A' | 'B') => {
    soundFX.playStoneDrum();
    setSelectedOption(opt);
  };

  const handleConfirmOption = () => {
    if (!selectedOption) return;
    if (selectedOption === 'B') {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('success_dialogue');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……古汉语中“又”用于连接整数与零头，表示“加”，故五千又四百即为五千四百。');
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
    }
  };

  return (
    <div
      className={`relative w-full h-full text-[#ffd1b3] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
        isSuccess ? 'bg-[#210e0e]' : 'bg-[#140606]'
      }`}
      style={{
        backgroundImage: 'radial-gradient(#301111 1px, transparent 0)',
        backgroundSize: '16px 16px',
      }}
    >
      {/* Top Bar */}
      <div className="p-2.5 bg-[#260e0e] border-b border-red-900 flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-red-400 font-mono">
            CHAPTER 04 · 百戏 · 跳丸
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第四章｜百戏 · 跳丸
          </h2>
        </div>
      </div>

      {/* STEP 1: PAGE 14 百戏视频 */}
      {phase === 'video_preshow' && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-2">
            <span className="text-[9px] font-mono text-red-300 tracking-widest bg-red-950/80 px-3 py-1 rounded-full border border-red-500">
              DANCE & BAIXI VIDEO · 汉代百戏
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              观看汉代百戏 · 跳丸、角抵与杂耍乐舞
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-red-600 shadow-2xl bg-[#1c0808] flex items-center justify-center">
            {/* 7 Juggling Balls bouncing animation */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="absolute w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] border border-amber-300 animate-bounce"
                  style={{
                    left: `${50 + 35 * Math.cos((i * 2 * Math.PI) / 7)}%`,
                    top: `${50 + 35 * Math.sin((i * 2 * Math.PI) / 7)}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
              <div className="text-center text-xs font-serif font-black text-amber-200">
                俳优腾掷七丸
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 inset-x-4 text-center">
              <p className="text-[11px] text-[#ffdfd0] leading-relaxed">
                “宴乐之外，还有百戏。俳优一人腾掷七彩丸球，上下翻飞如流星连缀。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setPhase('dialogue_paiyou');
              setDialogueIdx(0);
            }}
            className="w-full max-w-xs py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl text-xs shadow-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>完成观看 · 听俳优出题</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: PAGE 15 俳优出场对白 */}
      {phase === 'dialogue_paiyou' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-red-950 border-2 border-red-500 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse">
              <Dices className="w-10 h-10 text-red-300" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-red-300">广阳市民乐舞 · 跳丸弄球</span>
              <h3 className="text-base font-black text-[#ffe89c]">百戏娱民 · 热闹欢腾</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE4_PAIYOU}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < DIALOGUES_STAGE4_PAIYOU.length - 1) {
                setDialogueIdx((prev) => prev + 1);
              } else {
                setPhase('interactive');
              }
            }}
          />
        </div>
      )}

      {/* STEP 3: PAGE 16 交互：跳丸数字谜题（Point 9: 左右滑动手势指示标已去掉） */}
      {phase === 'interactive' && (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-start space-y-2 p-3 animate-fade-in pb-36">
          {/* Top 7 Rainbow Bouncing Balls */}
          <div className="relative w-full h-28 rounded-2xl bg-[#260e0e] border border-red-900/80 flex items-center justify-center overflow-hidden p-2 shadow-inner">
            <div className="flex items-center gap-2.5">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 border border-amber-200 flex items-center justify-center font-mono text-[9px] font-black text-black shadow-md animate-bounce"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  丸{i + 1}
                </div>
              ))}
            </div>
            <div className="absolute bottom-1 text-[8.5px] text-[#ffb0a0] font-mono">
              小字提示：“又”在古代汉语言中表示“加” (如：五千又四百 = 5000 + 400)
            </div>
          </div>

          {/* Question Text */}
          <div className="p-3 rounded-2xl bg-[#1c0a0a] border border-red-800 text-center space-y-1 my-auto shadow">
            <span className="text-[9px] font-mono text-amber-300">俳优的算术困惑：</span>
            <p className="text-xs sm:text-sm font-black text-[#ffe89c]">
              “五千四百” 与 “五千又四百” 到底是不是同一个数？
            </p>
          </div>

          {/* 2 Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSelectOption('A')}
              className={`p-4 rounded-2xl border-2 font-serif font-black text-xs transition-all shadow-md flex flex-col items-center justify-center gap-1 ${
                selectedOption === 'A'
                  ? 'bg-red-950 border-amber-400 text-amber-200 ring-2 ring-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#1f0b0b] border-red-900 text-red-200 hover:border-red-600'
              }`}
            >
              <span className="text-[10px] font-mono text-red-400">选项 A</span>
              <span>两个数不同</span>
            </button>

            <button
              onClick={() => handleSelectOption('B')}
              className={`p-4 rounded-2xl border-2 font-serif font-black text-xs transition-all shadow-md flex flex-col items-center justify-center gap-1 ${
                selectedOption === 'B'
                  ? 'bg-red-950 border-amber-400 text-amber-200 ring-2 ring-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#1f0b0b] border-red-900 text-red-200 hover:border-red-600'
              }`}
            >
              <span className="text-[10px] font-mono text-emerald-400">选项 B (正解)</span>
              <span>两个数相同</span>
            </button>
          </div>

          {/* Standardized Confirm Button */}
          <div className="w-full z-10 pt-1">
            <button
              onClick={handleConfirmOption}
              disabled={!selectedOption}
              className={`w-full py-3 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 ${
                selectedOption
                  ? 'bg-gradient-to-r from-red-800 via-red-700 to-amber-800 hover:brightness-110 text-white border-amber-400 active:scale-98 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#1a0808] text-[#5c3030] border-[#2d1212] cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#ffe89c]" />
              <span>确认答案 · 助俳优领取赏钱</span>
            </button>
          </div>

          {/* Interactive Mode: Jade dancer with 3-level progressive hints */}
          <UnifiedDialogueBox
            isInteractiveMode={true}
            hints={[
              '汉代语言习惯中，常用‘又’字连接千、百与零头数额。',
              '‘五千又四百’中的‘又’相当于现代汉语中的‘加’或‘零’，并非指两个不同的数字。',
              '正确答案为「两个数相同」——五千四百与五千又四百在汉代均代表同一数值 5400。',
            ]}
            errorTip={errorTip}
            onClearError={() => setErrorTip('')}
          />
        </div>
      )}

      {/* STEP 4: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-pulse">
              <Sparkles className="w-10 h-10 text-emerald-300" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                新记忆已收录 · 记忆卡 04
              </span>
              <h3 className="text-base font-black text-[#ffe89c] mt-2">
                卡片 04「百戏娱民」已点亮
              </h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE4_SUCCESS}
            currentIndex={0}
            onNext={() => {
              setPhase('transition');
            }}
          />
        </div>
      )}

      {/* STEP 5: 过场 PAGE｜盛宴散场 · 前往长乐展厅交互区域 */}
      {phase === 'transition' && (
        <HallTransitionPage
          targetHallName="前往：长乐展厅交互区域"
          subtitle="钟鼓声渐远，盛宴终有散场。公元前 45 年，广阳顷王刘建薨逝……"
          themeColor="silver"
          onContinue={() => {
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
