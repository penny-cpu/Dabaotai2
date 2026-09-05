import React from 'react';

interface MuseumAccessionRecordProps {
  memoryIndex: number;
  title: string;
  subtitle?: string;
  accessionCode?: string;
  material?: string;
  excavationSite?: string;
  era?: string;
  category?: string;
  showSeal?: boolean;
}

/**
 * MuseumAccessionRecord
 * 替换掉过往“青色圆形发光框+卡片XX已点亮”，
 * 按照博物馆展陈文物编号牌与入馆记录设计：
 * 
 *         极小星点微尘扩散
 * 
 *              玉 舞 人
 * 
 *          记忆 · 知识 · 收辑
 * 
 *             MEMORY 03
 * 
 *              翘 袖 折 腰
 */
export const MuseumAccessionRecord: React.FC<MuseumAccessionRecordProps> = ({
  memoryIndex,
  title,
  subtitle = '北京大葆台一号汉墓出土文物',
  accessionCode,
  material = '白玉 / 浅浮雕与线刻',
  excavationSite = '大葆台一号汉墓',
  era = '西汉 · 广阳顷王时期',
  category = '汉代乐舞礼乐珍藏',
  showSeal = true,
}) => {
  const code = accessionCode || `DBT-M1-0${memoryIndex}`;

  return (
    <div className="relative w-full max-w-xs mx-auto flex flex-col items-center justify-center text-center select-none font-serif px-2">
      {/* 1. 极小星点微尘扩散 (取代大面积发光圆环) */}
      <div className="relative w-28 h-10 flex items-center justify-center pointer-events-none mb-1">
        {/* 微弱星点群 */}
        <span className="inline-block w-1 h-1 rounded-full bg-[#E6D3AA] opacity-70 animate-ping" />
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A88950] opacity-80 mx-3" />
        <span className="inline-block w-0.5 h-0.5 rounded-full bg-[#E6D3AA] opacity-60 mr-4" />
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B93A2B] opacity-75" />
        <span className="inline-block w-0.5 h-0.5 rounded-full bg-[#A88950] opacity-50 ml-3" />
      </div>

      {/* 2. 玉舞人标头 (纯文本排版) */}
      <div className="flex flex-col items-center">
        <h4 className="text-sm tracking-[0.35em] text-[#E6D3AA] font-light pl-[0.35em] opacity-90">
          玉 舞 人
        </h4>
        
        {/* 3. 记忆 · 知识 · 收辑 */}
        <p className="text-[10px] tracking-[0.25em] text-[#A88950] uppercase mt-1 pl-[0.25em] font-sans font-medium">
          记忆 · 知识 · 收辑
        </p>
      </div>

      {/* 4. MEMORY 编号 (朱砂红重点强调编号) */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="h-[1px] w-6 bg-[#3A271D]" />
        <span className="text-[11px] font-mono tracking-[0.2em] text-[#8F7C6B] uppercase">
          MEMORY 0{memoryIndex}
        </span>
        <span className="h-[1px] w-6 bg-[#3A271D]" />
      </div>

      {/* 文物编号: 规整使用朱砂红 */}
      <div className="mt-1">
        <span className="text-[10px] font-mono font-bold tracking-wider text-[#B93A2B]">
          【馆藏号】 {code}
        </span>
      </div>

      {/* 5. 核心名称 (无边框大字展现) */}
      <div className="mt-2.5">
        <h2 className="text-xl sm:text-2xl font-black text-[#F1D98D] tracking-[0.2em] pl-[0.2em] drop-shadow-sm">
          {title}
        </h2>
        <p className="text-[10px] text-[#A89078] tracking-[0.1em] mt-1 pl-[0.1em]">
          {subtitle}
        </p>
      </div>

      {/* 6. 展陈标牌入馆简表 (仿博物馆极简展签，无厚重外边框) */}
      <div className="w-full mt-4 pt-2.5 pb-2.5 border-t border-b border-[#2A1B14] flex flex-col gap-1 text-[9.5px] text-[#8F7C6B] font-sans">
        <div className="flex justify-between items-center px-3">
          <span className="text-[#A88950]/80">归属时代</span>
          <span className="text-[#E6D3AA]/90 font-serif">{era}</span>
        </div>
        <div className="flex justify-between items-center px-3">
          <span className="text-[#A88950]/80">出土地点</span>
          <span className="text-[#E6D3AA]/90 font-serif">{excavationSite}</span>
        </div>
        <div className="flex justify-between items-center px-3">
          <span className="text-[#A88950]/80">工艺质地</span>
          <span className="text-[#E6D3AA]/90 font-serif">{material}</span>
        </div>
      </div>

      {/* 7. 朱砂红印章与入馆状态 (严控朱砂只在印章/状态出现) */}
      {showSeal && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="han-seal-stamp px-2 py-0.5 text-[8.5px] font-serif rounded-sm tracking-widest font-black">
            大葆台汉墓藏
          </span>
          <span className="text-[9px] font-serif text-[#B93A2B] tracking-wider font-bold">
            ● 已入馆辑录
          </span>
        </div>
      )}
    </div>
  );
};
