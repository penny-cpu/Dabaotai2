import React, { useEffect, useState } from 'react';
import { JadeFragmentId } from '../types';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface JadeReshapeOverlayProps {
  unlockedFragments: JadeFragmentId[];
  recentFragmentId?: JadeFragmentId | null;
  fragmentName?: string;
  onClose: () => void;
}

// 32 Golden & Jade streaming particles converging to the center
const PARTICLES = Array.from({ length: 32 }).map((_, i) => {
  const angle = (i / 32) * Math.PI * 2;
  const distance = 150 + ((i * 37) % 80);
  const dx = Math.round(Math.cos(angle) * distance);
  const dy = Math.round(Math.sin(angle) * distance);
  const delay = (i % 6) * 0.07;
  const size = 3 + (i % 4);
  const color = i % 3 === 0 ? '#FFE58F' : i % 3 === 1 ? '#A7F3D0' : '#FDE68A';
  return { id: i, dx, dy, delay, size, color };
});

export const JadeReshapeOverlay: React.FC<JadeReshapeOverlayProps> = ({
  unlockedFragments,
  recentFragmentId,
  fragmentName = '玉舞人记忆碎片',
  onClose,
}) => {
  const [hasConverged, setHasConverged] = useState(false);

  useEffect(() => {
    soundFX.playFragmentUnlock();

    // Trigger golden shockwave when particles converge
    const convergeTimer = setTimeout(() => {
      setHasConverged(true);
      soundFX.playBronzeChime();
    }, 1300);

    // Auto close after complete celebration
    const closeTimer = setTimeout(() => {
      onClose();
    }, 3200);

    return () => {
      clearTimeout(convergeTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const count = unlockedFragments.length;

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 bg-[#070503]/94 backdrop-blur-md flex flex-col items-center justify-between p-4 py-6 select-none font-serif text-[#E6D3AA] animate-fade-in cursor-pointer overflow-hidden"
    >
      {/* Background Han Tomb Mural Dust Texture */}
      <div className="han-mural-texture opacity-60 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-1 mt-1 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1A1009]/90 border border-[#A88950]/50 text-[#F1D98D] shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FFE58F] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
            JADE RESHAPING · 玉佩重塑
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-black text-[#FFF2CC] tracking-[0.25em] drop-shadow-[0_2px_10px_rgba(255,215,0,0.4)] mt-1">
          【{fragmentName}】归位重构
        </h2>
        <p className="text-[10px] text-[#A89078] tracking-widest">
          流光粒子汇聚 · 唤醒大汉白玉之魂
        </p>
      </div>

      {/* Center Jade Model with Particle Convergence Effect */}
      <div className="relative w-52 h-64 flex items-center justify-center my-auto pointer-events-none">
        {/* Soft Jade Aura Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${
            hasConverged ? 'bg-[#79B9A1]/35 scale-125' : 'bg-[#88b598]/20 scale-100'
          }`}
        />

        {/* Converging Golden Pulse Ring on Impact */}
        {hasConverged && (
          <div className="absolute w-44 h-44 rounded-full border-2 border-[#FFE58F] animate-golden-ring" />
        )}

        {/* 32 Glowing Jade & Gold Particles converging to center */}
        {!hasConverged &&
          PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full animate-particle-gather shadow-[0_0_8px_currentColor]"
              style={
                {
                  '--p-dx': `${p.dx}px`,
                  '--p-dy': `${p.dy}px`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  color: p.color,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}

        {/* 7-Part Han Jade Dancer Assembly SVG Silhouette */}
        <div className={`relative w-40 h-56 ${hasConverged ? 'animate-jade-reshape' : ''}`}>
          <svg
            viewBox="0 0 100 130"
            className="w-full h-full filter drop-shadow-[0_0_16px_rgba(200,240,210,0.85)]"
          >
            {/* Head */}
            <circle
              cx="50"
              cy="18"
              r="8"
              fill={unlockedFragments.includes('frag_head_halo') ? '#f0fdf4' : '#2A1810'}
              stroke="#A7F3D0"
              strokeWidth="1.2"
              className="transition-colors duration-700"
            />

            {/* Neck / Core Pillar */}
            <path
              d="M48 26 L52 26 L52 36 L48 36 Z"
              fill={unlockedFragments.includes('frag_body_core') ? '#e8f8ec' : '#3A2216'}
            />

            {/* Right Sleeve (Stage 1: 戈影) */}
            <path
              d="M48 32 C38 24, 25 22, 18 35 C14 42, 22 52, 32 46 C40 42, 46 36, 48 32 Z"
              fill={unlockedFragments.includes('frag_right_sleeve') ? '#cdeacd' : '#28170F'}
              stroke={recentFragmentId === 'frag_right_sleeve' ? '#FFE58F' : '#A7F3D0'}
              strokeWidth={recentFragmentId === 'frag_right_sleeve' ? '2.5' : '1.5'}
              className="transition-colors duration-700"
            />

            {/* Chest Pendant (Stage 2: 宴乐) */}
            <path
              d="M45 36 C45 36, 50 42, 55 36 C55 45, 45 45, 45 36 Z"
              fill={unlockedFragments.includes('frag_chest_pendant') ? '#ffe89c' : '#28170F'}
              stroke={recentFragmentId === 'frag_chest_pendant' ? '#FFE58F' : '#E6D3AA'}
              strokeWidth={recentFragmentId === 'frag_chest_pendant' ? '2.5' : '1.5'}
              className="transition-colors duration-700"
            />

            {/* Left Sleeve (Stage 3: 浮游) */}
            <path
              d="M52 32 C62 24, 76 22, 84 34 C88 42, 80 52, 70 46 C62 42, 54 36, 52 32 Z"
              fill={unlockedFragments.includes('frag_left_sleeve') ? '#cdeacd' : '#28170F'}
              stroke={recentFragmentId === 'frag_left_sleeve' ? '#FFE58F' : '#A7F3D0'}
              strokeWidth={recentFragmentId === 'frag_left_sleeve' ? '2.5' : '1.5'}
              className="transition-colors duration-700"
            />

            {/* Robe Skirt (Stage 4: 百戏) */}
            <path
              d="M44 58 C38 72, 32 90, 28 115 C42 120, 60 120, 74 115 C70 90, 64 72, 58 58 Z"
              fill={unlockedFragments.includes('frag_robe_skirt') ? '#b8dec0' : '#28170F'}
              stroke={recentFragmentId === 'frag_robe_skirt' ? '#FFE58F' : '#A7F3D0'}
              strokeWidth={recentFragmentId === 'frag_robe_skirt' ? '2.5' : '1.5'}
              className="transition-colors duration-700"
            />

            {/* Waist (Stage 5: 送葬) */}
            <path
              d="M46 48 L56 48 L58 58 L44 58 Z"
              fill={unlockedFragments.includes('frag_waist') ? '#cdeacd' : '#28170F'}
              stroke={recentFragmentId === 'frag_waist' ? '#FFE58F' : '#A7F3D0'}
              strokeWidth={recentFragmentId === 'frag_waist' ? '2.5' : '1.5'}
              className="transition-colors duration-700"
            />

            {/* Body Core (Stage 6: 木阵) */}
            <path
              d="M46 36 L56 36 L56 48 L46 48 Z"
              fill={unlockedFragments.includes('frag_body_core') ? '#e8f8ec' : '#28170F'}
              stroke={recentFragmentId === 'frag_body_core' ? '#FFE58F' : '#A7F3D0'}
              strokeWidth={recentFragmentId === 'frag_body_core' ? '2.5' : '1.5'}
              className="transition-colors duration-700"
            />

            {/* Head Halo / Constellation Crown (Stage 7: 星路) */}
            <circle
              cx="50"
              cy="18"
              r="14"
              fill="none"
              stroke={unlockedFragments.includes('frag_head_halo') ? '#ffe89c' : 'rgba(255,232,156,0.25)'}
              strokeWidth="1.5"
              strokeDasharray="4,3"
              className="animate-spin"
              style={{ animationDuration: '8s' }}
            />
          </svg>
        </div>
      </div>

      {/* Bottom Status Card */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center text-center space-y-2 mb-1 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#180E09]/90 border border-[#A88950]/40 text-[#F1D98D] text-xs font-mono shadow-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#79B9A1]" />
          <span>大葆台玉舞人进度：{count} / 7 碎片已唤醒</span>
        </div>

        <p className="text-[10.5px] text-[#C4A98B] leading-relaxed italic px-2">
          “两千年风霜散落，万千流光粒子汇聚，重塑大汉玉舞之躯。”
        </p>

        <span className="text-[9px] text-[#8F7C6B] font-mono tracking-widest uppercase mt-1">
          TAP ANYWHERE TO CONTINUE · 轻触继续
        </span>
      </div>
    </div>
  );
};
