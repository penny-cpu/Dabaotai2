import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, Play, ArrowRight, Delete, ShieldAlert } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { RightTopActions } from './RightTopActions';
import { HallTransitionPage } from './HallTransitionPage';

interface Stage6HuangchangProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_STAGE6_INTRO: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '这不是普通墓室，而是汉代高等级墓葬制度——黄肠题凑。“黄肠”指黄心柏木；“题凑”指木枋端头朝向墓室中心。木枋层层围合，像一座木质堡垒守护棺椁。',
  },
];

const DIALOGUES_STAGE6_AFTER_VIDEO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这些动作像在报数。把它们连起来，也许就是黄肠题凑留下的数字。',
  },
];

const DIALOGUES_STAGE6_SUCCESS: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '大葆台一号墓共使用 15880 根规格统一的柏木条。木枋层层咬合，最终形成高约 3 米的围护木墙。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我想起来了。这样的墓制并非人人可用，它属于极高等级的王陵礼制。原来我沉睡的地方，本身就是一整套汉代生死秩序。',
  },
];

export const Stage6Huangchang: React.FC<Stage6HuangchangProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<'intro_dialogue' | 'video_preshow' | 'dialogue_preshow' | 'interactive' | 'success_dialogue' | 'transition'>('intro_dialogue');
  const [inputDigits, setInputDigits] = useState<string[]>([]);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleDigitPress = (num: number) => {
    soundFX.playStoneDrum();
    if (inputDigits.length < 5) {
      setInputDigits([...inputDigits, num.toString()]);
    }
  };

  const handleDeleteDigit = () => {
    soundFX.playStoneDrum();
    setInputDigits(inputDigits.slice(0, -1));
  };

  const handleConfirmCode = () => {
    const code = inputDigits.join('');
    if (code === '15880') {
      soundFX.playTimberDrop();
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('success_dialogue');
      setDialogueIdx(0);
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……大葆台一号墓黄肠题凑木枋总数为 15880 根，请依次输入 1-5-8-8-0。');
      setInputDigits([]);
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
    }
  };

  return (
    <div
      className={`relative w-full h-full text-[#ffdcb3] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
        isSuccess ? 'bg-[#21150c]' : 'bg-[#0f0905]'
      }`}
      style={{
        backgroundImage: 'radial-gradient(#2a170d 1px, transparent 0)',
        backgroundSize: '16px 16px',
      }}
    >
      {/* Top Bar */}
      <div className="p-2.5 bg-[#26180e] border-b border-amber-900 flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-amber-400 font-mono">
            CHAPTER 06 · 黄肠题凑 · 15880
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第六章｜黄肠题凑 · 15880
          </h2>
        </div>
      </div>

      {/* STEP 1: PAGE 20 墓制阐释对白 */}
      {phase === 'intro_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-amber-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse">
              <ShieldAlert className="w-10 h-10 text-amber-400" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-300">汉代王陵最高规制 · 黄心柏木</span>
              <h3 className="text-base font-black text-[#ffe89c]">层木如垒 · 题凑天工</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE6_INTRO}
            currentIndex={0}
            onNext={() => {
              soundFX.playStoneDrum();
              setPhase('video_preshow');
            }}
          />
        </div>
      )}

      {/* STEP 2: PAGE 21 题凑与动作计数视频 */}
      {phase === 'video_preshow' && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-2">
            <span className="text-[9px] font-mono text-amber-300 tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500">
              DANCE VIDEO · 题凑与报数舞
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              观看木枋咬合与舞人身姿计数
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center">
            <div className="w-44 h-48 rounded-2xl bg-amber-950/50 border border-amber-500/60 flex flex-col items-center justify-center p-3 text-center space-y-2">
              {/* Stacked timber animation */}
              <div className="flex flex-col gap-1 w-28">
                {[1, 2, 3, 4].map((bar) => (
                  <div key={bar} className="h-3 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 rounded shadow" />
                ))}
              </div>
              <span className="text-xs font-black text-amber-200">
                15880 根柏木枋条
              </span>
              <p className="text-[10px] text-amber-100/80 leading-relaxed">
                “舞人手势依次指向：一万、五千、八百、八十、零。”
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setPhase('dialogue_preshow');
            }}
            className="w-full max-w-xs py-3 bg-amber-600 hover:bg-amber-500 text-black font-black rounded-2xl text-xs shadow-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>完成观看 · 破译木枋密码</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: PAGE 21 玉舞人连缀密码对白 */}
      {phase === 'dialogue_preshow' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-amber-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <ShieldAlert className="w-10 h-10 text-amber-300" />
            </div>
            <div className="text-center text-[11px] text-[#c2a385]">
              黄肠题凑木墙威严矗立，输入由舞姿报出的柏木总根数
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE6_AFTER_VIDEO}
            currentIndex={0}
            onNext={() => {
              setPhase('interactive');
            }}
          />
        </div>
      )}

      {/* STEP 4: PAGE 22 交互：输入五位密码「15880」 */}
      {phase === 'interactive' && (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-start space-y-2 p-3 animate-fade-in pb-36">
          {/* 5-Digit Display Slots */}
          <div className="flex items-center justify-center gap-2 py-1">
            {[0, 1, 2, 3, 4].map((slotIdx) => {
              const digit = inputDigits[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-mono font-black shadow-inner transition-all ${
                    digit
                      ? 'bg-amber-950/90 border-amber-400 text-[#ffe89c] shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                      : 'bg-[#150d08] border-[#382314] text-[#553820]'
                  }`}
                >
                  {digit || '-'}
                </div>
              );
            })}
          </div>

          {/* Number Keypad 1-9 & 0 */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto w-full my-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleDigitPress(num)}
                className="py-2.5 rounded-2xl bg-[#24150b] hover:bg-[#3d2414] border border-amber-900/80 text-[#ffe89c] font-mono text-base font-black shadow active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleDeleteDigit}
              className="py-2.5 rounded-2xl bg-[#1a0e07] hover:bg-[#2b160a] border border-red-900 text-red-300 font-mono text-xs font-bold flex items-center justify-center active:scale-95"
            >
              <Delete className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDigitPress(0)}
              className="py-2.5 rounded-2xl bg-[#24150b] hover:bg-[#3d2414] border border-amber-900/80 text-[#ffe89c] font-mono text-base font-black shadow active:scale-95 transition-all"
            >
              0
            </button>
            <div className="flex items-center justify-center text-[8px] font-mono text-amber-500/80">
              5位柏木数
            </div>
          </div>

          {/* Standardized Confirm Button */}
          <div className="w-full z-10 pt-1">
            <button
              onClick={handleConfirmCode}
              disabled={inputDigits.length !== 5}
              className={`w-full py-3 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 ${
                inputDigits.length === 5
                  ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 text-black border-amber-400 active:scale-98 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#1a100a] text-[#553820] border-[#29170e] cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>确认密码 · 开启黄肠题凑守护</span>
            </button>
          </div>

          {/* Interactive Mode: Jade dancer with companion hint & error feedback */}
          {/* Interactive Mode: Jade dancer with 3-level progressive hints */}
          <UnifiedDialogueBox
            isInteractiveMode={true}
            hints={[
              '黄肠题凑所耗费的柏木枋数量极为庞大，密码即为其确凿的出土总根数。',
              '五位数字中，前两位为一万五千余根，后三位为八百八十根。',
              '正确密码为「15880」——大葆台汉墓黄肠题凑正由一万五千八百八十根柏木层层垒砌而成。',
            ]}
            errorTip={errorTip}
            onClearError={() => setErrorTip('')}
          />
        </div>
      )}

      {/* STEP 5: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-pulse">
              <Sparkles className="w-10 h-10 text-emerald-300" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                新记忆已收录 · 记忆卡 06
              </span>
              <h3 className="text-base font-black text-[#ffe89c] mt-2">
                卡片 06「黄肠题凑」已点亮
              </h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE6_SUCCESS}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < DIALOGUES_STAGE6_SUCCESS.length - 1) {
                setDialogueIdx(dialogueIdx + 1);
              } else {
                setPhase('transition');
              }
            }}
          />
        </div>
      )}

      {/* STEP 6: 过场 PAGE｜前往终章 · 星宿升仙 */}
      {phase === 'transition' && (
        <HallTransitionPage
          targetHallName="前往：终章 · 星宿升仙"
          subtitle="灵魂超越地下宫阙，向着浩瀚的二十八宿星汉缓缓升腾……"
          themeColor="silver"
          onContinue={() => {
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
