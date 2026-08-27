import React, { useState, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Check, Info } from 'lucide-react';

export interface WheelItem {
  id: string;
  name: string;
  pinyin?: string;
  isCorrect?: boolean;
  category?: string;
  iconSvg: React.ReactNode;
  hint: string;
}

interface SemiCircleWheelProps {
  items: WheelItem[];
  selectedIds: string[];
  maxSelect?: number;
  onToggleSelect: (item: WheelItem) => void;
  title: string;
  promptText: string;
}

export const SemiCircleWheel: React.FC<SemiCircleWheelProps> = ({
  items,
  selectedIds,
  maxSelect = 1,
  onToggleSelect,
  title,
  promptText,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [activePreviewItem, setActivePreviewItem] = useState<WheelItem | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const totalItems = items.length;
  const angleStep = 360 / totalItems;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    setRotationAngle((prev) => prev + deltaX * 0.4);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setRotationAngle((prev) => prev + deltaX * 0.4);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const rotateLeft = () => {
    soundFX.playStoneDrum();
    setRotationAngle((prev) => prev - angleStep);
  };

  const rotateRight = () => {
    soundFX.playStoneDrum();
    setRotationAngle((prev) => prev + angleStep);
  };

  const radius = 135; // Radius of wheel circle in px

  return (
    <div className="relative w-full flex flex-col items-center select-none pt-2 pb-1">
      {/* Title & Guidance Header */}
      <div className="w-full flex items-center justify-between px-3 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-[#d2b48c] rounded-full" />
          <span className="text-xs font-serif font-black text-[#e6d5b8] tracking-wider">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#ffe89c] bg-[#3d2b1f] px-2 py-0.5 rounded-full border border-[#5c4033]">
          已选: {selectedIds.length} / {maxSelect}
        </span>
      </div>

      <p className="text-[10px] text-[#c2a385] text-center font-serif px-4 mb-1 italic">
        {promptText}
      </p>

      {/* Semi-Circular Rotary Wheel Container (Only Top Half Visible) */}
      <div
        ref={containerRef}
        className="relative w-full h-[145px] overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Decorative Rim & Surveying Graduations */}
        <div className="absolute top-2 w-[290px] h-[290px] rounded-full border-2 border-dashed border-[#d2b48c]/40 pointer-events-none" />
        <div className="absolute top-4 w-[270px] h-[270px] rounded-full border border-[#5c4033] pointer-events-none bg-gradient-to-b from-[#241a13]/80 to-[#140e0a]" />

        {/* Center Hub Indicator */}
        <div className="absolute top-0 w-24 h-12 rounded-b-full bg-[#3d2b1f] border-b-2 border-x-2 border-[#d2b48c] flex items-center justify-center shadow-lg z-20 pointer-events-none">
          <span className="text-[9px] text-[#ffe89c] font-serif tracking-widest uppercase">
            左右滑动轮盘
          </span>
        </div>

        {/* The Full Rotating Disc */}
        <div
          className="absolute w-[280px] h-[280px] rounded-full transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            transform: `translateY(130px) rotate(${rotationAngle}deg)`,
            transformOrigin: 'center center',
          }}
        >
          {items.map((item, index) => {
            const itemAngleDeg = index * angleStep;
            const itemAngleRad = (itemAngleDeg * Math.PI) / 180;
            const x = Math.cos(itemAngleRad) * radius;
            const y = Math.sin(itemAngleRad) * radius;

            const isSelected = selectedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playStoneDrum();
                  setActivePreviewItem(item);
                  onToggleSelect(item);
                }}
                className="absolute flex flex-col items-center justify-center cursor-pointer group"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${-rotationAngle}deg)`,
                  width: '54px',
                  height: '54px',
                }}
              >
                {/* Item Disc Button */}
                <div
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center p-1 border-2 transition-all duration-200 shadow-md ${
                    isSelected
                      ? 'bg-[#ffe89c] text-[#1a120b] border-[#e6d5b8] scale-110 ring-4 ring-[#ffe89c]/40 font-bold'
                      : 'bg-[#291e16] text-[#e6d5b8] border-[#5c4033] hover:border-[#d2b48c] hover:scale-105'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {item.iconSvg}
                  </div>
                  <span className="text-[8px] font-serif leading-tight text-center tracking-tighter truncate w-full px-0.5">
                    {item.name}
                  </span>

                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2e7d32] text-white rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Left/Right Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            rotateLeft();
          }}
          className="absolute left-2 top-10 z-30 p-1.5 rounded-full bg-[#241a13]/90 border border-[#5c4033] text-[#d2b48c] hover:text-[#ffe89c] text-xs shadow-md"
          title="向左旋转"
        >
          ◀
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            rotateRight();
          }}
          className="absolute right-2 top-10 z-30 p-1.5 rounded-full bg-[#241a13]/90 border border-[#5c4033] text-[#d2b48c] hover:text-[#ffe89c] text-xs shadow-md"
          title="向右旋转"
        >
          ▶
        </button>
      </div>

      {/* Selected Item Short Hint Card */}
      {activePreviewItem && (
        <div className="mt-1 px-3 py-1 bg-[#241a13] border border-[#3d2b1f] rounded-xl text-[10px] text-[#c2a385] flex items-center gap-1.5 max-w-[90%] font-serif">
          <Info className="w-3 h-3 text-[#d2b48c] shrink-0" />
          <span className="truncate">
            <strong className="text-[#ffe89c]">{activePreviewItem.name}:</strong> {activePreviewItem.hint}
          </span>
        </div>
      )}
    </div>
  );
};
