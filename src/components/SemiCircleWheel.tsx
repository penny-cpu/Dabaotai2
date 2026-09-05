import React, { useState, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Check, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { WEAPON_IMAGES } from '../data/weaponImages';
import { HanPlaqueButton } from './HanPlaqueButton';

export interface WheelWeaponItem {
  id: string;
  name: string;
  isCorrect: boolean;
  category?: string;
  desc?: string;
  label?: string;
  pinyin?: string;
  hint?: string;
  imageUrl?: string;
  [key: string]: any;
}

export type WheelItem = WheelWeaponItem;

interface SemiCircleWheelProps {
  items: WheelWeaponItem[];
  selectedIds: string[];
  maxSelect?: number;
  onToggleSelect: (item: WheelWeaponItem) => void;
  onConfirm?: () => void;
  canConfirm?: boolean;
}

/**
 * SemiCircleWheel
 * 依用户指令改造：
 * 1. 转盘放置在图片底下图层 (z-0)，绝不遮挡任何道具 (道具在 z-20/z-30 图层)。
 * 2. 彻底切掉下半圆环，只保留优雅的上半圆金铜弧轨，将下半圆环位置完全腾出给确认按键。
 * 3. 腾出的下半环空间放置“确认汉代武器·复原武舞”按键 (z-50)，居中置于轮盘下部，绝不被后续弹出的玉舞人提示遮挡。
 * 4. 左右可滑动/旋动，最多显示左、中、右 3 件武器道具。
 */
export const SemiCircleWheel: React.FC<SemiCircleWheelProps> = ({
  items,
  selectedIds,
  onToggleSelect,
  onConfirm,
  canConfirm = false,
}) => {
  // Start with item 0 at top apex (-90deg)
  const [rotationAngle, setRotationAngle] = useState<number>(-90);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastTouchAngle, setLastTouchAngle] = useState<number | null>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Wheel Geometry
  const radius = 114; // px from arc center
  const arcCenterY = 142; // Center point Y
  const totalItems = items.length;
  const angleStep = 360 / totalItems; // 72 deg for 5 items

  // Arc Center is anchored at horizontal 50%, vertical arcCenterY
  const getAngleFromCenter = (clientX: number, clientY: number): number | null => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + arcCenterY;
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
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      if (Math.abs(delta) > 0.4) {
        soundFX.playSandScratch();
        setRotationAngle((prev) => prev + delta);
        setLastTouchAngle(currentAngle);
      }
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setLastTouchAngle(null);
      // Snap to nearest item
      snapToNearest();
    }
  };

  const snapToNearest = () => {
    const offset = (rotationAngle + 90) % angleStep;
    let target = rotationAngle - offset;
    if (offset > angleStep / 2) target += angleStep;
    if (offset < -angleStep / 2) target -= angleStep;
    setRotationAngle(target);
  };

  const handleRotateStep = (direction: 'left' | 'right') => {
    soundFX.playStoneDrum();
    setRotationAngle((prev) => (direction === 'left' ? prev - angleStep : prev + angleStep));
  };

  return (
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
      className="relative w-full h-[218px] select-none touch-none flex flex-col items-center justify-start overflow-visible"
    >
      {/* 
        =======================================================================
        1. 顶部正位刻度指针 (大汉规制金铜斗笠型卡榫)
        ======================================================================= 
      */}
      <div className="absolute top-0.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
        <div className="w-10 h-3.5 rounded-t-full border-t border-x border-[#D6A84B]/60 bg-[#24130B]/90 flex items-start justify-center shadow-[0_0_15px_rgba(214,168,75,0.3)] pt-0.5">
          <div className="w-3 h-1 rounded-t-full bg-[#F1D98D]/80" />
        </div>
      </div>

      {/* 
        =======================================================================
        2. 线型上半圆弧轨 (底图层 z-0，绝不遮挡任何道具；下半圆环彻底切除)
        ======================================================================= 
      */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0 overflow-hidden"
        style={{ top: `${arcCenterY}px`, transform: 'translate(-50%, -100%)' }}
      >
        <svg
          width={radius * 2 + 50}
          height={radius + 18}
          viewBox={`0 0 ${radius * 2 + 50} ${radius + 18}`}
          className="overflow-visible"
        >
          {/* 外环虚线半弧 */}
          <path
            d={`M ${25 - 12} ${radius + 8} A ${radius + 12} ${radius + 12} 0 0 1 ${radius * 2 + 25 + 12} ${radius + 8}`}
            fill="none"
            stroke="#8C653C"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.45"
          />

          {/* 核心上半圆金铜承托弧轨 */}
          <path
            d={`M 25 ${radius + 8} A ${radius} ${radius} 0 0 1 ${radius * 2 + 25} ${radius + 8}`}
            fill="none"
            stroke="#D6A84B"
            strokeWidth="3"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_10px_rgba(214,168,75,0.55)]"
          />

          {/* 内环铜金细弦线 */}
          <path
            d={`M ${25 + 10} ${radius + 8} A ${radius - 10} ${radius - 10} 0 0 1 ${radius * 2 + 25 - 10} ${radius + 8}`}
            fill="none"
            stroke="#A9782B"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* 
        =======================================================================
        3. 道具图片图层 (严格置于上层 z-20，绝不被任何底环遮挡)
        ======================================================================= 
      */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 transition-transform duration-75 ease-out z-20"
        style={{
          top: `${arcCenterY}px`,
          transform: `rotate(${rotationAngle}deg)`,
        }}
      >
        {items.map((weapon, idx) => {
          const itemAngleOnDisc = idx * angleStep;
          const currentAbsoluteAngle = itemAngleOnDisc + rotationAngle;

          // 计算与正上方顶端 (-90度) 的角距离差
          let diffFromTop = ((currentAbsoluteAngle - (-90)) % 360 + 540) % 360 - 180;
          const absDiff = Math.abs(diffFromTop);

          // 仅最靠近上方的 3 个选项可见（角距离 85 度以内）
          const isVisible = absDiff <= 85;
          const isCenter = absDiff <= 36;

          // 角度转换为极坐标坐标
          const angleRad = (itemAngleOnDisc * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          const isSelected = selectedIds.includes(weapon.id);

          if (!isVisible) return null;

          const weaponImgSrc = WEAPON_IMAGES[weapon.id] || weapon.imageUrl || weapon.img;

          return (
            <div
              key={weapon.id}
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playStoneDrum();
                setActiveHoverId(weapon.id);
                onToggleSelect(weapon);
              }}
              onMouseEnter={() => setActiveHoverId(weapon.id)}
              className="absolute flex flex-col items-center justify-center cursor-pointer group"
              style={{
                // 定位在圆弧线上，并抵消转盘旋转以保持竖直直立
                transform: `translate(${x}px, ${y}px) rotate(${-rotationAngle}deg) scale(${
                  isCenter ? 1.05 : 0.85
                })`,
                transformOrigin: 'center center',
                width: '106px',
                height: '130px',
                marginTop: '-65px',
                marginLeft: '-53px',
                opacity: isCenter ? 1 : 0.8,
                zIndex: isCenter ? 35 : 25,
                transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
              }}
            >
              {/* 顶部悬浮铭牌 (名称 + 汉代礼制类别) - 去边框，配暗金四角微线 */}
              <div
                className={`mb-0.5 transition-all duration-200 pointer-events-none whitespace-nowrap flex flex-col items-center ${
                  isCenter || isSelected ? 'scale-100 opacity-100' : 'scale-90 opacity-80'
                }`}
              >
                <div
                  className={`relative px-2 py-0.5 rounded-[5px] border-0 text-[9.5px] font-serif font-bold shadow-md flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-[#8E2F21] text-[#F1D98D] shadow-[0_0_12px_rgba(241,217,141,0.7)]'
                      : isCenter
                      ? 'bg-[#2A160E]/95 text-[#F1D98D]'
                      : 'bg-[#180C07]/85 text-[#D8C29D]'
                  }`}
                >
                  {/* 四角暗金细线 */}
                  <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#C8943D]" />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#C8943D]" />
                  <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#C8943D]" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#C8943D]" />

                  <span>{weapon.name}</span>
                  {isSelected && <Check className="w-2.5 h-2.5 text-[#79B9A1]" />}
                  {weapon.category && (
                    <span className="text-[7.5px] font-mono opacity-80 pl-0.5">
                      {weapon.category}
                    </span>
                  )}
                </div>
              </div>

              {/* 道具高清图：置于最前图层，绝不被任何底环遮挡 */}
              <div className="relative w-20 h-24 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 z-30">
                <img
                  src={weaponImgSrc}
                  alt={weapon.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-contain filter transition-all duration-300 pointer-events-none ${
                    isSelected
                      ? 'drop-shadow-[0_0_16px_rgba(241,217,141,0.95)] brightness-110 scale-105'
                      : isCenter
                      ? 'drop-shadow-[0_6px_14px_rgba(0,0,0,0.9)] drop-shadow-[0_0_10px_rgba(214,168,75,0.6)]'
                      : 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] opacity-90'
                  }`}
                />
              </div>

              {/* 弧轨接触线托 */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-12 bg-[#F1D98D] shadow-[0_0_8px_#F1D98D]'
                      : isCenter
                      ? 'w-8 bg-[#D6A84B] shadow-[0_0_5px_#D6A84B]'
                      : 'w-6 bg-[#8C653C]'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        =======================================================================
        4. 左右旋钮辅助箭头 (无边框，四角暗金细线)
        ======================================================================= 
      */}
      <button
        onClick={() => handleRotateStep('left')}
        className="absolute left-2 top-[92px] -translate-y-1/2 z-40 w-6 h-6 rounded-[5px] border-0 bg-[#1F110A]/90 hover:bg-[#321A0F] flex items-center justify-center text-[#F1D98D] shadow-md active:scale-95 transition-all"
        title="向左转动"
      >
        <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#C8943D]" />
        <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#C8943D]" />
        <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#C8943D]" />
        <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#C8943D]" />
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleRotateStep('right')}
        className="absolute right-2 top-[92px] -translate-y-1/2 z-40 w-6 h-6 rounded-[5px] border-0 bg-[#1F110A]/90 hover:bg-[#321A0F] flex items-center justify-center text-[#F1D98D] shadow-md active:scale-95 transition-all"
        title="向右转动"
      >
        <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#C8943D]" />
        <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#C8943D]" />
        <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#C8943D]" />
        <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#C8943D]" />
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* 
        =======================================================================
        5. 腾出的下半圆环位置：放置“确认汉代武器·复原武舞”按键！
           依用户特别要求：
           “将下半圆环的位置腾出来放‘确认汉代武器·复原武舞’按键，
           这个按键不能被后续可能弹出的玉舞人提示给遮挡。”
           设置最高图层 (z-50)，居中位于下半环开阔区域，与底部提示彻底隔离！
        ======================================================================= 
      */}
      {onConfirm && (
        <div className="absolute bottom-0.5 inset-x-0 flex flex-col items-center justify-center z-50 px-4 pointer-events-auto">
          <HanPlaqueButton
            onClick={onConfirm}
            disabled={!canConfirm}
            size="md"
            className="w-full max-w-[270px] shadow-[0_6px_25px_rgba(0,0,0,0.85)]"
            leftIcon={<CheckCircle2 className="w-4 h-4 text-[#D6A84B]" />}
          >
            确认汉代武器·复原武舞
          </HanPlaqueButton>
        </div>
      )}
    </div>
  );
};
