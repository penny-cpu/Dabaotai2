import React, { useState } from 'react';
import { TOMB_LAYERS, ASSETS } from '../data/museumData';
import { soundFX } from '../utils/soundEngine';
import { ArrowDown, Layers, ChevronRight, Eye } from 'lucide-react';

interface Page2Props {
  onNextPage: () => void;
}

export const Page2TombSection: React.FC<Page2Props> = ({ onNextPage }) => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [activeArtifact, setActiveArtifact] = useState<string | null>(null);

  const handleLayerClick = (index: number) => {
    soundFX.playStoneDrum();
    setSelectedLayerIndex(index);
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif">
      {/* Header Bar */}
      <div className="p-3 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#d2b48c]" />
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-70 text-[#c2a385] font-mono">
              SECTION VIEW
            </span>
            <h2 className="text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              第二页：大葆台墓葬土层剖面
            </h2>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-lg bg-[#3d2b1f] text-[#e6d5b8] font-mono border border-[#d2b48c]/40 font-bold">
          -{(TOMB_LAYERS[selectedLayerIndex].depthMeters).toFixed(1)}m
        </span>
      </div>

      {/* Main Interactive Cross-Section Scroll View */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 relative scrollbar-thin scrollbar-thumb-[#3d2b1f]">
        {/* Tomb Diagram Illustration */}
        <div className="relative rounded-2xl overflow-hidden border border-[#3d2b1f] shadow-xl bg-[#241a13]">
          <img
            src={ASSETS.tombSection}
            alt="墓葬土层剖面"
            className="w-full h-44 object-cover filter brightness-[0.9] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 text-xs text-[#e6d5b8] font-serif bg-[#241a13]/90 p-2.5 rounded-xl border border-[#3d2b1f] shadow-lg">
            📍 考古测绘：自上而下历经四重土层，墓室核心为万余根柏木砌筑之“黄肠题凑”。
          </div>
        </div>

        {/* Zig-Zag Strata Journey Interactive Map */}
        <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#d2b48c] before:via-[#c2a385] before:to-[#3d2b1f]">
          {TOMB_LAYERS.map((layer, idx) => {
            const isSelected = selectedLayerIndex === idx;
            const isZigRight = idx % 2 === 1;

            return (
              <div
                key={layer.name}
                onClick={() => handleLayerClick(idx)}
                className={`relative pl-8 transition-all duration-300 cursor-pointer ${
                  isZigRight ? 'translate-x-2' : ''
                }`}
              >
                {/* Layer Dot */}
                <div
                  className={`absolute left-2 top-3 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#d2b48c] border-[#1a120b] scale-125 shadow-[0_0_12px_#d2b48c]'
                      : 'bg-[#3d2b1f] border-[#c2a385]'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a120b]" />
                </div>

                {/* Layer Card */}
                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-[#2c1d12] border-[#d2b48c] shadow-2xl ring-1 ring-[#d2b48c]/50'
                      : 'bg-[#241a13] border-[#3d2b1f] hover:bg-[#2c1d12]'
                  }`}
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: layer.color,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1a120b] text-[#d2b48c] border border-[#3d2b1f]">
                      {layer.depthRange}
                    </span>
                    <span className="text-[10px] text-[#c2a385] flex items-center gap-1 font-serif">
                      <Eye className="w-3 h-3 text-[#d2b48c]" />
                      {layer.soilTexture}
                    </span>
                  </div>

                  <h3 className="text-sm font-black font-serif text-[#e6d5b8] mt-1.5 flex items-center justify-between tracking-wider">
                    {layer.name}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'rotate-90 text-[#d2b48c]' : 'text-[#3d2b1f]'
                      }`}
                    />
                  </h3>

                  <p className="text-[11px] text-[#c2a385] font-serif mt-1.5 line-clamp-2 leading-relaxed">
                    {layer.description}
                  </p>

                  {/* Artifact Fragments found in layer */}
                  <div className="mt-2.5 pt-2 border-t border-[#3d2b1f] flex flex-wrap gap-1.5">
                    {layer.artifactsFound.map((art) => (
                      <button
                        key={art}
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFX.playStoneDrum();
                          setActiveArtifact(art);
                        }}
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-[#1a120b] text-[#d2b48c] border border-[#3d2b1f] hover:border-[#d2b48c] hover:text-[#e6d5b8] transition-colors"
                      >
                        🏷️ {art}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Artifact Quick Modal */}
      {activeArtifact && (
        <div className="absolute inset-x-3 bottom-16 z-30 bg-[#241a13] border-2 border-[#d2b48c] rounded-2xl p-4 shadow-2xl animate-fade-in text-xs text-[#e6d5b8]">
          <div className="flex items-center justify-between mb-1.5 border-b border-[#3d2b1f] pb-1.5">
            <span className="font-black text-[#e6d5b8] font-serif tracking-wider">考古发现：{activeArtifact}</span>
            <button
              onClick={() => setActiveArtifact(null)}
              className="text-[#c2a385] hover:text-[#e6d5b8] px-1 text-sm font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-[#c2a385] leading-relaxed">
            此残片发掘于西汉大葆台墓葬【{TOMB_LAYERS[selectedLayerIndex].name}】。反映出汉代建造王陵时严密的封土与防潮堆叠工序。
          </p>
        </div>
      )}

      {/* Bottom Descend Button to Video Section */}
      <div className="p-3 bg-[#241a13] border-t border-[#3d2b1f] z-10">
        <button
          onClick={onNextPage}
          className="w-full py-3 px-4 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] font-serif font-black text-xs rounded-2xl border border-[#d2b48c] flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98 tracking-widest"
        >
          <span>向下滑落沙石 · 观看汉代【武舞】视频</span>
          <ArrowDown className="w-4 h-4 text-[#d2b48c]" />
        </button>
      </div>
    </div>
  );
};
