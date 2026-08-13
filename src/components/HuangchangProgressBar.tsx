import React, { useEffect, useState } from 'react';
import {
  CypressWoodCoreIcon,
  TombPitWithLogIcon,
  SquareEnclosureIcon,
} from './HuangchangIcons';
import { Sparkles, Hammer } from 'lucide-react';

interface HuangchangProgressBarProps {
  isLoading?: boolean;
  progress?: number; // 0 to 100
  onComplete?: () => void;
  autoAnimate?: boolean;
  durationMs?: number;
  title?: string;
  className?: string;
}

export const HuangchangProgressBar: React.FC<HuangchangProgressBarProps> = ({
  isLoading = true,
  progress: externalProgress,
  onComplete,
  autoAnimate = true,
  durationMs = 1200,
  title = '汉陵考工 · 黄肠题凑逐步搭建',
  className = '',
}) => {
  const [internalProgress, setInternalProgress] = useState(0);

  // Auto-animate if external progress is not controlled
  useEffect(() => {
    if (!autoAnimate) return;

    setInternalProgress(0);
    const intervalTime = 30;
    const increment = 100 / (durationMs / intervalTime);

    const timer = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoAnimate, durationMs]);

  const currentProgress = externalProgress !== undefined ? externalProgress : internalProgress;

  // Trigger onComplete when progress reaches 100
  useEffect(() => {
    if (currentProgress >= 100) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentProgress, onComplete]);

  // Determine current construction step (1, 2, or 3)
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex === 1) return currentProgress >= 15;
    if (stepIndex === 2) return currentProgress >= 50;
    if (stepIndex === 3) return currentProgress >= 85;
    return false;
  };

  const steps = [
    {
      id: 1,
      name: '黄色柏木芯',
      desc: '伐采黄心柏木单体',
      icon: (isActive: boolean) => <CypressWoodCoreIcon isActive={isActive} size={52} />,
      threshold: 15,
    },
    {
      id: 2,
      name: '放置于方形墓坑',
      desc: '单侧逐层码砌入位',
      icon: (isActive: boolean) => <TombPitWithLogIcon isActive={isActive} size={52} />,
      threshold: 50,
    },
    {
      id: 3,
      name: '合围成方形',
      desc: '四向严丝合缝题凑',
      icon: (isActive: boolean) => <SquareEnclosureIcon isActive={isActive} size={52} />,
      threshold: 85,
    },
  ];

  if (!isLoading && currentProgress >= 100) {
    return null;
  }

  return (
    <div
      className={`w-full bg-[#241a13]/95 border-2 border-[#3d2b1f] rounded-3xl p-4.5 text-[#d2b48c] shadow-2xl font-serif relative overflow-hidden backdrop-blur-md ring-1 ring-[#d2b48c]/20 ${className}`}
    >
      {/* Background Decorative Han Stone Rubbing Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#c2a385 1px, transparent 0)',
          backgroundSize: '6px 6px',
        }}
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3.5 border-b border-[#3d2b1f] pb-2.5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#3d2b1f] border border-[#d2b48c]/40 flex items-center justify-center text-[#e6d5b8] shadow-inner">
            <Hammer className="w-4 h-4 text-[#d2b48c] animate-bounce" />
          </div>
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase opacity-70 text-[#c2a385] font-mono block">
              ARCHAEOLOGICAL PROGRESS
            </span>
            <h3 className="text-xs font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#1a120b] px-2.5 py-1 rounded-xl border border-[#3d2b1f] text-xs font-mono font-bold text-[#d2b48c]">
          <Sparkles className="w-3 h-3 text-[#d2b48c] animate-spin" />
          <span>{Math.min(100, Math.round(currentProgress))}%</span>
        </div>
      </div>

      {/* 3 Step Icons & Connecting Line */}
      <div className="relative z-10 my-2">
        {/* Background Connecting Line */}
        <div className="absolute top-[28px] left-[15%] right-[15%] h-1 bg-[#1a120b] rounded-full overflow-hidden border border-[#3d2b1f]">
          {/* Active Progress Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#8c7561] via-[#c2a385] to-[#d2b48c] transition-all duration-200 shadow-[0_0_10px_#d2b48c]"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* 3 Icon Nodes Container */}
        <div className="flex items-center justify-between relative z-10 px-2">
          {steps.map((step) => {
            const isActive = getStepStatus(step.id);
            return (
              <div key={step.id} className="flex flex-col items-center group">
                {/* Icon Container */}
                <div
                  className={`p-1 rounded-2xl transition-all duration-300 transform ${
                    isActive
                      ? 'scale-110 shadow-[0_0_20px_rgba(210,180,140,0.4)] ring-2 ring-[#d2b48c]'
                      : 'opacity-60 scale-95'
                  }`}
                >
                  {step.icon(isActive)}
                </div>

                {/* Step Name */}
                <span
                  className={`text-[10px] font-bold mt-1.5 transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#e6d5b8] title-drop-shadow' : 'text-[#8c7561]'
                  }`}
                >
                  0{step.id}. {step.name}
                </span>

                {/* Subtext */}
                <span className="text-[8px] text-[#c2a385] opacity-75 font-serif hidden sm:block mt-0.5">
                  {step.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Stage Explanation Caption */}
      <div className="mt-3.5 bg-[#1a120b] p-2.5 rounded-2xl border border-[#3d2b1f] text-[10px] text-[#c2a385] leading-relaxed relative z-10 shadow-inner flex items-start gap-2">
        <span className="text-xs">🏛️</span>
        <div>
          {currentProgress < 35 && (
            <p>
              <strong className="text-[#e6d5b8]">步骤一（黄心柏木）：</strong>
              精选十厘米见方之黄心柏木，断切整齐，材质坚韧耐腐，为汉代西汉诸侯王陵墓葬核心构件。
            </p>
          )}
          {currentProgress >= 35 && currentProgress < 80 && (
            <p>
              <strong className="text-[#e6d5b8]">步骤二（放置于方形墓坑）：</strong>
              将柏木芯平放于方形墓坑侧壁，头皆向内，由外向内逐层顺向码砌，构成厚重坚实的木墙基底。
            </p>
          )}
          {currentProgress >= 80 && (
            <p>
              <strong className="text-[#e6d5b8]">步骤三（合围成方形）：</strong>
              柏木芯沿着方形墓坑四壁完全合围，形成严丝合缝的方形题凑方阵，守护中央梓宫棺室。
            </p>
          )}
          <span className="block mt-1 text-[9px] text-[#8c7561] font-mono">
            《汉书·霍光传》：以柏木黄心致致，头皆向内，故曰黄肠题凑。
          </span>
        </div>
      </div>
    </div>
  );
};
