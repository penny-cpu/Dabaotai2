import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Check, Shield, Sparkles } from 'lucide-react';

export interface WheelWeaponItem {
  id: string;
  name: string;
  isCorrect: boolean;
  category?: string;
  desc?: string;
  label?: string;
  pinyin?: string;
  hint?: string;
  [key: string]: any;
}

export type WheelItem = WheelWeaponItem;

interface SemiCircleWheelProps {
  items: WheelWeaponItem[];
  selectedIds: string[];
  maxSelect?: number;
  onToggleSelect: (item: WheelWeaponItem) => void;
}

export const SemiCircleWheel: React.FC<SemiCircleWheelProps> = ({
  items,
  selectedIds,
  maxSelect = 2,
  onToggleSelect,
}) => {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastTouchAngle, setLastTouchAngle] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const radius = 135; // px from center
  const totalItems = items.length;
  const angleStep = 360 / totalItems;

  const getAngleFromCenter = (clientX: number, clientY: number): number | null => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.bottom; // Center of the full circle is at the bottom center line
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const angle = getAngleFromCenter(clientX, clientY);
    if (angle !== null) {
      setIsDragging(true);
      setLastTouchAngle(angle);
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging || lastTouchAngle === null) return;
    const currentAngle = getAngleFromCenter(clientX, clientY);
    if (currentAngle !== null) {
      let delta = currentAngle - lastTouchAngle;
      // Handle 180 to -180 degree jump
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      if (Math.abs(delta) > 0.3) {
        soundFX.playSandScratch();
        setRotationAngle((prev) => prev + delta);
        setLastTouchAngle(currentAngle);
      }
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setLastTouchAngle(null);
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none pt-1">
      {/* Top Hint Bar */}
      <div className="w-full flex items-center justify-between px-3 mb-1">
        <span className="text-[10px] text-[#e6d5b8] font-serif font-black flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>手指在半圆弧线边框上直接顺/逆时针滑动旋转</span>
        </span>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#2a170d] text-amber-300 border border-amber-800">
          已选 {selectedIds.length}/{maxSelect}
        </span>
      </div>

      {/* Semi-circular dial container (Only top half exposed) */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handlePointerUp}
        className="relative w-full h-[155px] overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing touch-none border-b border-[#3d2b1f]/60"
      >
        {/* Outer Glowing Arc Rim (The line user touches to swipe) */}
        <div className="absolute -bottom-[140px] w-[310px] h-[310px] rounded-full border-4 border-amber-600/70 shadow-[0_0_20px_rgba(217,119,6,0.35)] pointer-events-none" />
        <div className="absolute -bottom-[130px] w-[290px] h-[290px] rounded-full border border-dashed border-[#ffe89c]/40 pointer-events-none bg-gradient-to-t from-[#140e0a] to-[#24170d]/80" />

        {/* Center Hub Indicator at the very bottom */}
        <div className="absolute bottom-0 w-28 h-7 bg-[#29170d] rounded-t-full border-t-2 border-x-2 border-amber-500 flex items-center justify-center pointer-events-none z-20 shadow-md">
          <span className="text-[8px] font-mono text-amber-200 tracking-widest uppercase">
            沿弧线滑旋
          </span>
        </div>

        {/* Rotating Wheel Disc */}
        <div
          className="absolute -bottom-[140px] w-[280px] h-[280px] rounded-full flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transformOrigin: 'center center',
          }}
        >
          {items.map((weapon, idx) => {
            const angleDeg = idx * angleStep;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            const isSelected = selectedIds.includes(weapon.id);

            return (
              <div
                key={weapon.id}
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playStoneDrum();
                  onToggleSelect(weapon);
                }}
                className="absolute flex flex-col items-center justify-center cursor-pointer group"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${-rotationAngle}deg)`,
                  width: '56px',
                  height: '56px',
                }}
              >
                <div
                  className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center p-1.5 border-2 transition-all shadow-md active:scale-95 ${
                    isSelected
                      ? 'bg-amber-600 text-white border-[#ffe89c] scale-110 ring-4 ring-amber-400/40 font-bold shadow-[0_0_12px_#ffe89c]'
                      : 'bg-[#24170d] text-[#e6d5b8] border-[#5c4033] hover:border-amber-500'
                  }`}
                >
                  <span className="text-[10px] font-serif font-black leading-tight text-center truncate w-full">
                    {weapon.name}
                  </span>

                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
