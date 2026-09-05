import React from 'react';
import { X } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

export interface ExhibitSignData {
  title: string;
  pinyin?: string;
  relicNumber: string; // e.g. DBT-M1-002
  era: string;         // 西汉 (约公元前70年)
  excavation: string;  // 北京大葆台一号汉墓
  material: string;    // 白玉 / 玛瑙 / 琉璃
  dimensions?: string; // 通长约 58 cm
  description: string;
  significance?: string;
  imageUrl?: string;
}

interface MuseumExhibitSignProps {
  data: ExhibitSignData;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
}

/**
 * MuseumExhibitSign
 * 博物馆展陈信息卡（展签形式）：
 * 克制、高级感、无外边框、纯正博物馆展牌排版
 */
export const MuseumExhibitSign: React.FC<MuseumExhibitSignProps> = ({
  data,
  onClose,
  onConfirm,
  confirmLabel = '收辑入馆 · 继续观览',
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fade-in select-none font-serif">
      {/* 展签卡片容器: 无沉重描边 (无边框)，利用深沉玄黑深棕与微弱环境顶光呈现 */}
      <div className="relative w-full max-w-sm max-h-[90vh] bg-[#120B08] text-[#E6D3AA] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl rounded-none">
        {/* 考古展柜微弱顶光 */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(224,196,144,0.06)_0%,transparent_70%)]" />

        {/* Top Header Bar: 纯文本博物馆展标与关闭按钮 */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2A1B14] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#8F7C6B] uppercase">
              EXHIBIT SIGN · 馆藏展签
            </span>
            <span className="han-seal-stamp px-1.5 py-0.2 text-[8px] font-serif rounded-none">
              大葆台
            </span>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              onClose();
            }}
            className="w-7 h-7 flex items-center justify-center text-[#8F7C6B] hover:text-[#E6D3AA] transition-colors"
            title="关闭展签"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Exhibit Body */}
        <div className="relative z-10 my-4 flex flex-col items-center text-center">
          {/* 文物图像 (若有，悬浮于弱光中，无外框) */}
          {data.imageUrl && (
            <div className="relative w-36 h-36 flex items-center justify-center mb-3">
              <div className="absolute inset-0 bg-radial from-[#A88950]/10 to-transparent pointer-events-none blur-lg" />
              <img
                src={data.imageUrl}
                alt={data.title}
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              />
            </div>
          )}

          {/* 馆藏编号: 朱砂红纯正标号 */}
          <div className="text-[10px] font-mono font-bold tracking-widest text-[#B93A2B] uppercase">
            NO. {data.relicNumber}
          </div>

          {/* 展品名称 */}
          <h2 className="text-2xl font-black text-[#F1D98D] tracking-[0.15em] mt-1 mb-0.5">
            {data.title}
          </h2>

          {data.pinyin && (
            <span className="text-[9px] font-sans tracking-[0.3em] text-[#8F7C6B] uppercase opacity-75">
              {data.pinyin}
            </span>
          )}

          {/* 展签档案细目 (无边框列表，使用水平极淡分隔线) */}
          <div className="w-full mt-4 border-t border-[#23150F] pt-3 flex flex-col gap-1.5 text-left text-[11px]">
            <div className="flex justify-between items-baseline py-0.5">
              <span className="text-[#8F7C6B] font-sans text-[10px]">时代 / ERA</span>
              <span className="text-[#E6D3AA] font-serif">{data.era}</span>
            </div>
            <div className="flex justify-between items-baseline py-0.5">
              <span className="text-[#8F7C6B] font-sans text-[10px]">出土 / SITE</span>
              <span className="text-[#E6D3AA] font-serif">{data.excavation}</span>
            </div>
            <div className="flex justify-between items-baseline py-0.5">
              <span className="text-[#8F7C6B] font-sans text-[10px]">材质 / MATERIAL</span>
              <span className="text-[#E6D3AA] font-serif">{data.material}</span>
            </div>
            {data.dimensions && (
              <div className="flex justify-between items-baseline py-0.5">
                <span className="text-[#8F7C6B] font-sans text-[10px]">规格 / SCALE</span>
                <span className="text-[#E6D3AA] font-mono text-[10px]">{data.dimensions}</span>
              </div>
            )}
          </div>

          {/* 展签解说词 (馆长考工记) */}
          <div className="w-full mt-3.5 pt-3 border-t border-[#23150F] text-left">
            <p className="text-xs leading-relaxed text-[#C8B69B] font-serif text-justify indent-6 opacity-95">
              {data.description}
            </p>
            {data.significance && (
              <p className="text-[10.5px] leading-relaxed text-[#A88950] font-serif text-justify indent-6 mt-2 opacity-90">
                {data.significance}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Confirm Action: 纯正朱砂红确认按钮 */}
        <div className="relative z-10 pt-2 border-t border-[#2A1B14] flex flex-col items-center">
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              if (onConfirm) {
                onConfirm();
              } else {
                onClose();
              }
            }}
            className="w-full py-2.5 rounded-lg bg-[#9E2A1C] hover:bg-[#B93A2B] active:bg-[#781F14] text-[#F8E8C8] font-serif font-bold text-xs tracking-[0.2em] shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{confirmLabel}</span>
          </button>
          <span className="text-[8px] text-[#5C4C42] mt-1 font-mono">
            大葆台西汉墓遗址博物馆 · 数字馆藏档卡
          </span>
        </div>
      </div>
    </div>
  );
};
