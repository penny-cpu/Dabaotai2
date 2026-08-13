import React, { useState } from 'react';
import { RELICS_DATA } from '../data/museumData';
import { Relic } from '../types';
import { soundFX } from '../utils/soundEngine';
import { Compass, Volume2, Sparkles, X, CheckCircle, ArrowDown, Play, Pause } from 'lucide-react';

interface Page4Props {
  onNextPage: () => void;
}

export const Page4RelicExcavation: React.FC<Page4Props> = ({ onNextPage }) => {
  const [relics, setRelics] = useState<Relic[]>(RELICS_DATA);
  const [selectedRelic, setSelectedRelic] = useState<Relic | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [uncoveredCount, setUncoveredCount] = useState<number>(0);

  // Uncover Relic Sand Handler
  const handleUncoverRelic = (relic: Relic) => {
    soundFX.playSandScratch();
    soundFX.playBronzeChime();

    setRelics((prev) =>
      prev.map((r) => (r.id === relic.id ? { ...r, isUncovered: true } : r))
    );

    const updated = { ...relic, isUncovered: true };
    setSelectedRelic(updated);

    const count = relics.filter((r) => r.isUncovered || r.id === relic.id).length;
    setUncoveredCount(count);
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    soundFX.playStoneDrum();
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] text-[#d2b48c] flex flex-col justify-between overflow-hidden select-none font-serif">
      {/* Header Bar */}
      <div className="p-3 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#d2b48c]" />
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-70 text-[#c2a385] font-mono">
              EXCAVATION
            </span>
            <h2 className="text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              第四页：古文物发掘 (之字形排布)
            </h2>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#3d2b1f] text-[#e6d5b8] font-mono border border-[#d2b48c]/40">
          已发掘: {uncoveredCount}/5 件
        </span>
      </div>

      {/* Main Ground View with 5 Buried Relics in Zig-zag Pattern */}
      <div className="flex-1 relative overflow-hidden p-4 bg-gradient-to-b from-[#b58838] via-[#6d3813] to-[#2c0c04]">
        {/* Fine Soil & Sand Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(230,213,184,0.4) 1px, transparent 0)',
            backgroundSize: '6px 6px',
          }}
        />
        {/* Darker Soil Layer Noise */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 0)',
            backgroundSize: '4px 4px',
          }}
        />

        {/* Connecting Zig-zag Path Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#f3d08c]/40" strokeDasharray="4 4" strokeWidth="2">
          <path d="M 22% 18% L 78% 36% L 28% 54% L 72% 72% L 35% 88%" fill="none" />
        </svg>

        {/* 5 Relic Touch Spots in Soil */}
        {relics.map((relic, idx) => {
          return (
            <div
              key={relic.id}
              onClick={() => handleUncoverRelic(relic)}
              style={{
                left: `${relic.xPercent}%`,
                top: `${relic.yPercent}%`,
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Buried Relic Pin Container */}
              <div
                className={`relative p-2.5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center ${
                  relic.isUncovered
                    ? 'bg-[#3d2b1f]/95 border-[#d2b48c] shadow-[0_0_25px_rgba(210,180,140,0.6)] scale-110'
                    : 'bg-[#382112]/95 border-[#6d4323] hover:border-[#d2b48c] hover:scale-105 shadow-2xl backdrop-blur-sm'
                }`}
              >
                {/* Flashing Dot on the Highest Layer for Buried Relics */}
                {!relic.isUncovered && (
                  <div className="absolute -top-2 -right-2 z-40 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#ffe89c] opacity-90" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#e6b800] border-2 border-[#fff] shadow-[0_0_12px_#ffe89c]" />
                  </div>
                )}

                {/* Exposed Relic Partial Teaser or Sand Cover */}
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#5c3c23] relative bg-[#1c0f08]">
                  <img
                    src={relic.imageUrl}
                    alt={relic.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      relic.isUncovered ? 'filter brightness-100 contrast-110' : 'filter brightness-30 blur-[2px]'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Sand Cover Layer */}
                  {!relic.isUncovered && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7d5225]/80 via-[#4d2d11]/90 to-[#2b1405] backdrop-blur-[1px] flex flex-col items-center justify-center text-[10px] text-[#e6d5b8] font-black tracking-widest">
                      <span className="text-[9px] opacity-80">深沙掩盖</span>
                    </div>
                  )}
                </div>

                {/* Relic Tag */}
                <div className="mt-1 text-center">
                  <span className="text-[10px] font-serif font-black text-[#e6d5b8] block whitespace-nowrap title-drop-shadow">
                    0{idx + 1}. {relic.name.split(' ')[0]}
                  </span>
                  <p className="text-[8px] text-[#f0cf9e] font-serif font-bold">
                    {relic.isUncovered ? '已刨开露出 ✓' : relic.exposedPartName}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OVERLAY POPUP MODAL (When Relic is Clicked) */}
      {selectedRelic && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#241a13] border-2 border-[#3d2b1f] rounded-3xl max-w-sm w-full p-4.5 text-[#e6d5b8] relative shadow-2xl space-y-3.5 max-h-[85vh] overflow-y-auto ring-1 ring-[#d2b48c]/30">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedRelic(null);
                setIsPlayingAudio(false);
              }}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-xl bg-[#1a120b] text-[#c2a385] hover:text-[#e6d5b8] border border-[#3d2b1f]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2.5 border-b border-[#3d2b1f] pb-2.5 pr-6">
              <div className="w-7 h-7 bg-[#3d2b1f] text-[#e6d5b8] text-xs font-serif font-black flex items-center justify-center rounded-xl border border-[#d2b48c]/40">
                宝
              </div>
              <div>
                <h3 className="text-sm font-black font-serif text-[#e6d5b8] tracking-wider title-drop-shadow">
                  {selectedRelic.name}
                </h3>
                <p className="text-[10px] text-[#d2b48c] font-mono tracking-widest uppercase">
                  {selectedRelic.era} · {selectedRelic.category}
                </p>
              </div>
            </div>

            {/* Left/Top: Complete Relic Image with Stone Relief Border */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#3d2b1f] shadow-xl bg-[#000] h-40">
              <img
                src={selectedRelic.imageUrl}
                alt={selectedRelic.name}
                className="w-full h-full object-cover filter contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-[#241a13]/90 px-2.5 py-0.5 rounded-lg text-[10px] text-[#e6d5b8] border border-[#3d2b1f] font-serif font-bold">
                完整形态还原
              </div>
            </div>

            {/* Right/Bottom: Description Text Box */}
            <div className="space-y-2 text-xs text-[#c2a385] font-serif">
              <div className="bg-[#1a120b] p-3 rounded-2xl border border-[#3d2b1f] leading-relaxed">
                <p className="text-[#e6d5b8] font-black mb-1 tracking-wider">📜 详细解说：</p>
                <p>{selectedRelic.description}</p>
              </div>

              <div className="bg-[#2c1d12] p-2.5 rounded-xl border border-[#3d2b1f] text-[11px]">
                <p className="text-[#d2b48c] font-black tracking-wider">🏛️ 学术价值：</p>
                <p className="mt-0.5">{selectedRelic.historicalValue}</p>
              </div>
            </div>

            {/* Audio Voiceover Player with Pre-reserved Asset Path */}
            <div className="p-3 bg-[#1a120b] rounded-2xl border border-[#3d2b1f] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#3d2b1f] text-[#e6d5b8] border border-[#d2b48c]/40">
                  <Volume2 className="w-4 h-4 text-[#d2b48c]" />
                </div>
                <div>
                  <span className="text-xs font-black text-[#e6d5b8] font-serif block tracking-wider">
                    文物语音讲解
                  </span>
                  <span className="text-[9px] text-[#c2a385] font-mono block">
                    {selectedRelic.audioPath}
                  </span>
                </div>
              </div>

              <button
                onClick={handleToggleAudio}
                className="px-3 py-1.5 rounded-xl bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] text-xs font-serif font-bold border border-[#d2b48c] flex items-center gap-1 shadow-md transition-all active:scale-95"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#d2b48c]" /> 暂停
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#d2b48c]" /> 播放 ({selectedRelic.audioDuration})
                  </>
                )}
              </button>
            </div>

            {/* Code Reservation Info Badge */}
            <div className="text-[9px] text-[#c2a385] font-mono text-center border-t border-[#3d2b1f] pt-2 opacity-70">
              AUDIO ASSET PRE-RESERVED
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Button */}
      <div className="p-3 bg-[#241a13] border-t border-[#3d2b1f] z-10">
        <button
          onClick={onNextPage}
          className="w-full py-3 px-4 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] font-serif font-black text-xs rounded-2xl border border-[#d2b48c] flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98 tracking-widest"
        >
          <span>滑动进入第五页：照见汉代 (手电筒探秘长卷)</span>
          <ArrowDown className="w-4 h-4 text-[#d2b48c]" />
        </button>
      </div>
    </div>
  );
};
