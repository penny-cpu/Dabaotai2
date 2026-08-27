import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, Hammer, CheckCircle2, ArrowDown, ShieldCheck } from 'lucide-react';

interface Page7HuangchangWoodPuzzleProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const STEPS = [
  {
    step: 1,
    title: '第一步：选材备料',
    content: '砍伐大量柏树，剥去树皮，只取黄色的柏木芯。统一加工成 90×10×10 厘米规格完全相同的柏木枋。',
    icon: '🌲',
  },
  {
    step: 2,
    title: '第二步：挖坑铺底',
    content: '向下挖掘出近 5 米深的方形墓坑，在底部铺设一层垫木作为地基，确立墓室边界与棺椁居中位置。',
    icon: '⛏️',
  },
  {
    step: 3,
    title: '第三步：逐层垒砌',
    content: '北壁垒30层每层108根，东西两壁垒30层每层160根，所有木枋端头（“题”）全部朝向墓室中心。',
    icon: '🧱',
  },
  {
    step: 4,
    title: '第四步：形成木墙',
    content: '垒至3米高时四壁合围，木墙厚0.9米、总长超42米，将棺椁层层围护在中心，如同一座木质堡垒。',
    icon: '🏛️',
  },
];

export const Page7HuangchangWoodPuzzle: React.FC<Page7HuangchangWoodPuzzleProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [inputDigits, setInputDigits] = useState<string[]>(['1', '5', '8', '8', '0']);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPasswordSolved, setIsPasswordSolved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDigitChange = (index: number, val: string) => {
    soundFX.playStoneDrum();
    const newDigits = [...inputDigits];
    newDigits[index] = val;
    setInputDigits(newDigits);
  };

  const handleVerifyNumber = () => {
    soundFX.playStoneDrum();
    const joined = inputDigits.join('');
    if (joined === '15880') {
      soundFX.playBronzeChime();
      setIsPasswordSolved(true);
      setFeedback('密码正确！大葆台一号墓“黄肠题凑”，共用 15880 根规格统一的黄心柏木枋紧密咬合建成！');
    } else {
      setFeedback('数量不对哦，提示：数字为 15880（一万五千八百八十根柏木）。');
    }
  };

  const handleNextStep = () => {
    soundFX.playStoneDrum();
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      soundFX.playBronzeChime();
      onUnlockFragment();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#17110c] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Top Header */}
      <div className="p-3 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 06 · TIMBER FORTRESS
          </span>
          <h2 className="text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
            第六章 · 木阵 (黄肠题凑与帝陵考工)
          </h2>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono bg-[#3d2b1f] px-2.5 py-1 rounded-xl border border-[#5c4033] text-[#ffe89c]">
          <Hammer className="w-3.5 h-3.5" />
          <span>考工营建</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-none">
        {/* Intro */}
        <div className="bg-[#241a13]/90 border-2 border-[#3d2b1f] p-3 rounded-2xl shadow-xl text-xs space-y-1.5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1">
            <span className="font-bold text-[#ffe89c]">题凑礼藏 · 顶级帝王葬制</span>
            <span className="text-[9px] font-mono text-[#a3805d]">黄肠题凑 · 梓宫便房</span>
          </div>
          <p className="text-[#c2a385] text-[11px] leading-relaxed">
            “所谓‘黄肠’，指黄心柏木，芳香耐腐；所谓‘题凑’，指所有木枋端头全部朝向墓室中心，层层咬合。”
          </p>
        </div>

        {/* Phase 1: Number Decoding Puzzle */}
        {!isPasswordSolved ? (
          <div className="bg-[#241a13] border-2 border-[#3d2b1f] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="border-b border-[#3d2b1f] pb-1.5">
              <h3 className="text-xs font-black text-[#e6d5b8] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffe89c]" />
                解谜任务：请输入黄肠题凑所用的【柏木枋总数】
              </h3>
              <p className="text-[10px] text-[#a3805d] mt-0.5">
                由一万五千余根完全相同规格的柏木条组成，请输入5位数字：
              </p>
            </div>

            {/* 5-Digit Inputs */}
            <div className="flex items-center justify-center gap-2 py-2">
              {inputDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  className="w-11 h-13 text-center text-xl font-mono font-black rounded-xl bg-[#1a120b] text-[#ffe89c] border-2 border-[#5c4033] focus:border-[#ffe89c] outline-none shadow-inner"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyNumber}
              className="w-full py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-xl border border-[#d2b48c] text-xs shadow-md"
            >
              验证柏木数量 (15880 根)
            </button>
          </div>
        ) : (
          /* Phase 2: Four Steps of Construction Simulation */
          <div className="bg-[#241a13] border-2 border-[#3d2b1f] rounded-2xl p-3.5 shadow-xl space-y-3 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1.5">
              <h3 className="text-xs font-black text-[#e6d5b8] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#88b598]" />
                汉陵考工 · 四步题凑营建 (步骤 {activeStep}/4)
              </h3>
              <span className="text-[10px] text-[#ffe89c] font-mono">15880 根柏木已就位</span>
            </div>

            {/* Step Display Card */}
            <div className="p-3 bg-[#1a120b] rounded-xl border border-[#3d2b1f] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{STEPS[activeStep - 1].icon}</span>
                <span className="text-xs font-black text-[#ffe89c]">
                  {STEPS[activeStep - 1].title}
                </span>
              </div>
              <p className="text-[11px] text-[#c2a385] leading-relaxed">
                {STEPS[activeStep - 1].content}
              </p>
            </div>

            {/* Visual Timber Wall Simulator */}
            <div className="relative w-full h-24 rounded-xl bg-[#120e0b] border border-[#3d2b1f] overflow-hidden flex items-center justify-center p-2">
              <div className="grid grid-cols-12 gap-0.5 w-full h-full opacity-80">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[2px] transition-all duration-300 ${
                      i < activeStep * 12
                        ? 'bg-gradient-to-br from-[#c2a385] to-[#8c6239] border border-[#e6d5b8]/30 shadow-sm'
                        : 'bg-[#241a13] border border-[#3d2b1f]/40 opacity-30'
                    }`}
                  />
                ))}
              </div>
              <span className="absolute text-[9px] font-mono text-[#ffe89c] bg-black/70 px-2 py-0.5 rounded-full">
                柏木咬合进度：{activeStep * 25}%
              </span>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-2 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-xl border border-[#d2b48c] text-xs shadow-md"
            >
              {activeStep < 4 ? `推进下一步营建 (${activeStep + 1}/4)` : '完成营建 · 唤醒身体主体玉片'}
            </button>
          </div>
        )}

        {/* Feedback Display */}
        {feedback && (
          <div className="p-3 rounded-2xl border bg-[#1f2d24] border-[#88b598] text-[#e8f8ec] text-xs leading-relaxed animate-fade-in shadow-xl">
            {feedback}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-3 bg-[#241a13] border-t border-[#3d2b1f] z-10">
        <button
          onClick={() => {
            soundFX.playStoneDrum();
            onNextPage();
          }}
          className={`w-full py-3 px-4 rounded-2xl text-xs font-serif font-black flex items-center justify-center gap-2 border shadow-xl transition-all ${
            isUnlocked
              ? 'bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] border-[#d2b48c] animate-pulse'
              : 'bg-[#241a13] text-[#8c7561] border-[#3d2b1f]'
          }`}
        >
          <span>进入第七章：星路 (四象聚星与七盘一鼓升仙大典)</span>
          <ArrowDown className="w-4 h-4 text-[#d2b48c]" />
        </button>
      </div>
    </div>
  );
};
