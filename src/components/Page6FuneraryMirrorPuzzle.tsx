import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, HelpCircle, ArrowDown, X } from 'lucide-react';

interface Page6FuneraryMirrorPuzzleProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const HINTS = [
  {
    level: 1,
    title: '第一级线索 (形态与寓意)',
    text: '“这个纹路，像天上的什么？它翻卷回旋，连绵不绝，无处不在。汉代人相信，那是通往天界的路径。”',
  },
  {
    level: 2,
    title: '第二级线索 (材质与功能)',
    text: '“它在大葆台出土。它不是玉，不是陶——它是铜铸的。它能照。”',
  },
  {
    level: 3,
    title: '第三级线索 (核心特征)',
    text: '“它背上没有铭文，只有翻卷回旋的云气纹。两千年了，云还在飘。”',
  },
];

const MIRROR_OPTIONS = [
  {
    id: 'xingyun_mirror',
    name: '星云纹铜镜',
    feature: '青铜铸造 / 背无铭文 / 满布回旋云气纹',
    isCorrect: true,
  },
  {
    id: 'zhaoming_mirror',
    name: '昭明连弧镜',
    feature: '刻有“内清质以昭明”铭文 / 连弧纹',
    isCorrect: false,
  },
  {
    id: 'sihui_mirror',
    name: '四虺纹铜镜',
    feature: '背刻四只蟠虺纹 / 细密方折几何纹',
    isCorrect: false,
  },
  {
    id: 'riguang_mirror',
    name: '日光博局镜',
    feature: '规矩TLV博局纹 / “见日之光”铭文',
    isCorrect: false,
  },
];

export const Page6FuneraryMirrorPuzzle: React.FC<Page6FuneraryMirrorPuzzleProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedMirror, setSelectedMirror] = useState<string | null>(null);
  const [hintLevel, setHintLevel] = useState<number>(1);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

  const handleSelect = (id: string) => {
    soundFX.playStoneDrum();
    setSelectedMirror(id);
    const opt = MIRROR_OPTIONS.find((m) => m.id === id);

    if (opt?.isCorrect) {
      soundFX.playBronzeChime();
      setFeedback({
        text: '“星云纹铜镜。对，就是它！大葆台一号墓后室出土。别的镜子刻着铭文，只有它背上只有翻卷回旋的云气纹。汉代人把云气刻在铜镜上，是为了让墓主人躺下后，照见通往天上的路径。送葬舞者扬袖翻卷、抱袖回环，用身体画出云气纹，指引亡者升仙！”',
        success: true,
      });
      onUnlockFragment();
    } else {
      setFeedback({
        text: '玉舞人摇头：“再想想。铜铸的，能照见人影，四面铜镜中只有一面背上没有铭文、唯有回卷云气纹。”',
        success: false,
      });
    }
  };

  return (
    <div className="relative w-full h-full bg-[#17130f] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Header */}
      <div className="p-3 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 05 · SLEEVE & MIRROR
          </span>
          <h2 className="text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
            第五章 · 袖舞 (送葬之仪与星云铜镜)
          </h2>
        </div>

        <button
          onClick={() => setShowHintModal(true)}
          className="px-2.5 py-1 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] rounded-xl border border-[#d2b48c]/50 text-xs flex items-center gap-1 font-serif shadow-md"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>线索({hintLevel}/3)</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-none">
        {/* Story Banner */}
        <div className="bg-[#241a13]/90 border-2 border-[#3d2b1f] p-3 rounded-2xl shadow-xl text-xs space-y-1.5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-1">
            <span className="font-bold text-[#ffe89c]">初元四年 (公元前45年) · 广阳王送葬仪典</span>
            <span className="text-[9px] font-mono text-[#a3805d]">黄门鼓吹 · 事死如事生</span>
          </div>
          <p className="text-[#c2a385] text-[11px] leading-relaxed">
            广阳顷王刘建薨逝，送葬队伍启行。舞者长袖画出S形弧线——扬袖向上翻卷，抱袖向下回环，在空中残留一道银白色光痕。
          </p>
          <div className="text-[11px] text-[#e8f8ec] italic bg-[#1a120b] p-2 rounded-xl border border-[#3d2b1f]">
            玉舞人（凝视光痕）：“这个动作……我见过。她们画出的到底是什么纹路？那是一种专门画在随葬品上、指引死者的汉代云气纹样。”
          </div>
        </div>

        {/* Dynamic S-Curve Sleeves Cloud Pattern Animation */}
        <div className="relative w-full h-36 rounded-2xl bg-[#120e0b] border-2 border-[#3d2b1f] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Animated Cloud SVG trails */}
          <svg viewBox="0 0 300 120" className="w-full h-full">
            <path
              d="M30 60 Q80 10, 130 60 T230 60 T300 60"
              fill="none"
              stroke="#88b598"
              strokeWidth="4"
              strokeDasharray="6,6"
              className="animate-pulse opacity-70"
            />
            <path
              d="M20 70 Q90 120, 160 70 T280 70"
              fill="none"
              stroke="#ffe89c"
              strokeWidth="3"
              className="opacity-80"
            />
            <circle cx="150" cy="60" r="28" fill="none" stroke="#d2b48c" strokeWidth="2" strokeDasharray="4,4" className="animate-spin" />
          </svg>

          <span className="absolute bottom-2 text-[9px] font-mono text-[#a3805d] bg-black/60 px-2 py-0.5 rounded-full">
            长袖挥舞轨迹 ➔ 翻卷回旋通天云气
          </span>
        </div>

        {/* Options Selection */}
        <div className="bg-[#241a13] border-2 border-[#3d2b1f] rounded-2xl p-3.5 shadow-xl space-y-2.5">
          <div className="border-b border-[#3d2b1f] pb-1.5">
            <span className="text-xs font-black text-[#e6d5b8] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffe89c]" />
              解谜任务：请从一号墓出土铜镜中找出承载此纹样的文物
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MIRROR_OPTIONS.map((item) => {
              const isSelected = selectedMirror === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? item.isCorrect
                        ? 'bg-[#1f2d24] border-[#88b598] shadow-lg scale-[1.02]'
                        : 'bg-[#2d1b1b] border-[#a34a4a]'
                      : 'bg-[#1a120b] border-[#3d2b1f] hover:border-[#5c4033]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-[#e6d5b8]">{item.name}</span>
                    {isSelected && item.isCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#88b598]" />
                    )}
                  </div>
                  <p className="text-[9px] text-[#a3805d] leading-snug">{item.feature}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Display */}
        {feedback && (
          <div
            className={`p-3 rounded-2xl border text-xs font-serif leading-relaxed animate-fade-in shadow-xl ${
              feedback.success
                ? 'bg-[#1f2d24] border-[#88b598] text-[#e8f8ec]'
                : 'bg-[#2d1b1b] border-[#a34a4a] text-[#f8d7da]'
            }`}
          >
            {feedback.text}
          </div>
        )}
      </div>

      {/* Hints Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#241a13] border-2 border-[#5c4033] rounded-3xl max-w-sm w-full p-5 text-[#d2b48c] space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowHintModal(false)}
              className="absolute top-3 right-3 text-[#a3805d] hover:text-[#e6d5b8]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-sm font-black text-[#e6d5b8] font-serif flex items-center gap-1.5 border-b border-[#3d2b1f] pb-2">
              <HelpCircle className="w-4 h-4 text-[#ffe89c]" />
              送葬云气与铜镜线索
            </h3>

            <div className="space-y-2.5">
              {HINTS.slice(0, hintLevel).map((h) => (
                <div key={h.level} className="p-3 bg-[#1a120b] rounded-xl border border-[#3d2b1f] space-y-1">
                  <div className="text-[10px] font-bold text-[#ffe89c]">{h.title}</div>
                  <p className="text-xs text-[#c2a385] leading-relaxed">{h.text}</p>
                </div>
              ))}
            </div>

            {hintLevel < 3 ? (
              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  setHintLevel(hintLevel + 1);
                }}
                className="w-full py-2 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] rounded-xl border border-[#d2b48c] text-xs font-serif font-bold transition-colors"
              >
                解锁下一级线索 ({hintLevel + 1}/3)
              </button>
            ) : (
              <p className="text-[10px] text-center text-[#a3805d]">已解锁全部线索！</p>
            )}
          </div>
        </div>
      )}

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
          <span>进入第六章：木阵 (黄肠题凑 15880 数量解密与营建)</span>
          <ArrowDown className="w-4 h-4 text-[#d2b48c]" />
        </button>
      </div>
    </div>
  );
};
