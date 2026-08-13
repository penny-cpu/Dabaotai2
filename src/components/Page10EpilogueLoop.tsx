import React, { useState, useEffect, useRef } from 'react';
import { ASSET_REGISTRY } from '../data/assetRegistry';
import { soundFX } from '../utils/soundEngine';
import { RotateCcw, Wind, Sparkles, ChevronDown } from 'lucide-react';

interface Page10EpilogueLoopProps {
  onRestartHome: () => void;
}

const EPILOGUE_TEXTS = [
  "从礼乐飨宴的欢歌，到黄肠题凑的肃穆；",
  "从祭祀建筑的恢宏，到神仙幻想的浪漫。",
  "广阳王刘建的一生与身后，正是汉代文明的一幅微缩画卷。",
  "黄肠题凑、金缕玉衣、礼乐器具、驷马高车，共同构建起完备的礼制体系；",
  "祥禽瑞兽与羽人驭龙，则诠释着汉代关于生命与天地的想象。",
  "大葆台西汉墓，这座深埋地下两千多年的王陵，不仅是打开汉代丧葬文化的一把钥匙，也是我们穿越时空、与一个伟大时代对话的桥梁。",
  "汉家陵阙，幽燕长歌。广阳王的盛宴虽已散场，但大汉的余韵，仍在黄肠木的年轮中静静流淌。",
  "感谢你的参观。愿这段旅程，让你用乐舞，触摸到了一个真实而生动的汉代。"
];

export const Page10EpilogueLoop: React.FC<Page10EpilogueLoopProps> = ({ onRestartHome }) => {
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const listEndRef = useRef<HTMLDivElement>(null);

  const isAllRevealed = visibleCount >= EPILOGUE_TEXTS.length;

  // Auto-scroll to bottom whenever a new paragraph or ending title is revealed
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount]);

  // Optional auto-timer to periodically append next text box if user doesn't click
  useEffect(() => {
    if (isAllRevealed) return;

    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < EPILOGUE_TEXTS.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [isAllRevealed]);

  const handleNextText = () => {
    soundFX.playStoneDrum();
    if (visibleCount < EPILOGUE_TEXTS.length) {
      setVisibleCount((prev) => prev + 1);
    }
  };

  return (
    <div
      onClick={!isAllRevealed ? handleNextText : undefined}
      className="relative w-full h-full bg-[#17100b] text-[#d2b48c] flex flex-col justify-between overflow-hidden select-none font-serif cursor-pointer"
    >
      {/* Top Header */}
      <div className="p-3 bg-[#241a13]/90 border-b border-[#3d2b1f] backdrop-blur-md z-30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-[#d2b48c] animate-pulse" />
          <span className="text-xs font-black text-[#e6d5b8] tracking-wider">
            第十页 · 沉浸结语 (归于平静 · 首尾循环)
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3d2b1f] text-[#d2b48c] border border-[#5c4033]">
          {visibleCount}/{EPILOGUE_TEXTS.length} 段
        </span>
      </div>

      {/* Main Container with Stacked Paragraph Cards */}
      <div className="flex-1 relative overflow-y-auto px-4 py-3 flex flex-col items-center scrollbar-none">
        {/* Background Sand Texture */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none sticky top-0"
          style={{
            backgroundImage: 'radial-gradient(#c2a385 1px, transparent 0)',
            backgroundSize: '10px 10px',
          }}
        />

        {/* Upward Camera Return Breadcrumb */}
        <div className="z-10 text-[9px] font-mono text-[#a3805d] tracking-widest bg-black/50 px-3 py-1 rounded-full border border-[#3d2b1f] mb-3 shrink-0 text-center">
          梓宫 ➔ 便房 ➔ 黄肠题凑 ➔ 墓坑 ➔ 土层 ➔ 北京北方乡野
        </div>

        {/* Stacked Text Boxes List */}
        <div className="w-full max-w-sm space-y-3 z-20 pb-4">
          {EPILOGUE_TEXTS.slice(0, visibleCount).map((text, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#241a13]/90 border border-[#3d2b1f] backdrop-blur-md shadow-xl text-xs font-black text-[#e6d5b8] font-serif leading-relaxed tracking-wide text-center animate-fade-in transition-all duration-500 hover:border-[#5c4033]"
            >
              <div className="text-[9px] text-[#a3805d] font-mono mb-1 text-left border-b border-[#3d2b1f]/50 pb-0.5">
                卷轴刻字 · 0{idx + 1}
              </div>
              <p className="title-drop-shadow">“{text}”</p>
            </div>
          ))}

          {/* Interactive Tap Prompt if not all revealed */}
          {!isAllRevealed && (
            <div className="py-2 flex flex-col items-center justify-center gap-1 text-[10px] text-[#a3805d] font-mono animate-bounce opacity-80">
              <span className="flex items-center gap-1 bg-[#241a13] px-3 py-1 rounded-full border border-[#3d2b1f]">
                <ChevronDown className="w-3.3 h-3.3 text-[#d2b48c]" />
                点击屏幕揭示下一段刻字 ({visibleCount}/{EPILOGUE_TEXTS.length})
              </span>
            </div>
          )}

          {/* Revealed "大葆台" Circular Seal Frame at the Bottom */}
          {isAllRevealed && (
            <div className="pt-4 pb-2 space-y-3 text-center animate-fade-in z-30">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#3d2b1f] border-2 border-[#d2b48c] flex items-center justify-center shadow-2xl ring-4 ring-[#3d2b1f]/50">
                <span className="text-2xl font-black text-[#e6d5b8] font-serif tracking-widest title-drop-shadow">
                  大葆台
                </span>
              </div>
              <p className="text-xs text-[#ffe89c] font-black tracking-wider">
                风吹沙土露真容 · 故事如首尾循环
              </p>

              {/* Restart Exploration Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playStoneDrum();
                  onRestartHome();
                }}
                className="mt-2 px-6 py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center gap-2 mx-auto active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-[#d2b48c]" />
                重新探索大葆台 (再次向地下挖掘)
              </button>
            </div>
          )}

          {/* Scroll Anchor */}
          <div ref={listEndRef} />
        </div>
      </div>
    </div>
  );
};
