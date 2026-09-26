import React, { useState, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import { WheelWeaponItem } from './SemiCircleWheel';
import warriorBrickImg from '../assets/images/han_warrior_brick_1788598169002.jpg';

interface ArtifactTurntableProps {
  items: WheelWeaponItem[];
  selectedIds: string[];
  maxSelect?: number;
  onToggleSelect: (item: WheelWeaponItem) => void;
  onConfirm?: () => void;
  canConfirm?: boolean;
}

/**
 * ArtifactTurntable (文物转台)
 * 依据用户设计指令重构：
 * 1. 博物馆圆形旋转“文物转台”，转台在所有道具图片的下一图层。
 * 2. 圆环中央是武舞人物画像砖的缩小版图片。
 * 3. 圆环上是五件真实文物道具（去掉图片背景，只显示真实文物）。
 * 4. 圆环是暗金色纹路，不发光不显眼。
 * 5. 圆环拨动旋转时绕着画面居中的舞者形象转动，不偏离圆心，转动时出现极细金色轨迹。
 * 6. 圆环上的文物装在一条线里，在屏幕上只露出 2/3 图片；当被点选中时，向上升起露出全貌。
 * 7. 画面左斜上打下一缕极其微弱的光线，照在选中文物图片上，呈现精品文物摄影质感。
 * 8. 确认按键置于线索提示框之上，绝不被遮挡；全无边框，四角无横线。
 */
export const ArtifactTurntable: React.FC<ArtifactTurntableProps> = ({
  items,
  selectedIds,
  onToggleSelect,
  onConfirm,
  canConfirm = false,
}) => {
  // Center coordinates and radius (大幅放大转盘以饱满占满手机屏幕)
  const turntableRadius = 132; // px (由原先108放大至132)
  const centerX = 175; // relative center in 350px width
  const centerY = 150; // center in ~300px height

  const [rotationAngle, setRotationAngle] = useState<number>(-90); // start with top item at -90deg
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [lastTouchAngle, setLastTouchAngle] = useState<number | null>(null);
  const [showFineTrail, setShowFineTrail] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const totalItems = items.length;
  const angleStep = 360 / totalItems;

  const getAngleFromCenter = (clientX: number, clientY: number): number | null => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const cX = rect.left + rect.width / 2;
    const cY = rect.top + centerY;
    const dx = clientX - cX;
    const dy = clientY - cY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const angle = getAngleFromCenter(clientX, clientY);
    if (angle !== null) {
      setIsRotating(true);
      setShowFineTrail(true);
      setLastTouchAngle(angle);
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isRotating || lastTouchAngle === null) return;
    const currentAngle = getAngleFromCenter(clientX, clientY);
    if (currentAngle !== null) {
      let delta = currentAngle - lastTouchAngle;
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
    if (isRotating) {
      setIsRotating(false);
      setLastTouchAngle(null);
      setTimeout(() => setShowFineTrail(false), 600);
      // Snap to nearest item alignment
      const offset = (rotationAngle + 90) % angleStep;
      let target = rotationAngle - offset;
      if (offset > angleStep / 2) target += angleStep;
      if (offset < -angleStep / 2) target -= angleStep;
      setRotationAngle(target);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none font-serif">
      {/* Turntable Interactive Stage - 占满手机屏幕宽度 */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handlePointerUp}
        className="relative w-full max-w-[360px] h-[300px] sm:h-[310px] cursor-grab active:cursor-grabbing overflow-visible flex items-center justify-center"
      >
        {/* =========================================================================
            图层 0: 左上角微弱聚光 (打向选中文物，提供精品文物摄影质感)
            ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
          style={{
            background:
              selectedIds.length > 0
                ? 'radial-gradient(ellipse 65% 50% at 20% 15%, rgba(255, 235, 185, 0.18) 0%, rgba(200, 148, 61, 0.05) 50%, transparent 75%)'
                : 'transparent',
          }}
        />

        {/* =========================================================================
            图层 1: 文物转台底层 (大幅扩展直径，占满手机页面，暗金色纹路不发光)
            ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <svg width="350" height="300" viewBox="0 0 350 300" className="overflow-visible">
            {/* Outer turntable rim */}
            <circle
              cx={centerX}
              cy={centerY}
              r={turntableRadius + 26}
              fill="#160C08"
              stroke="#6B4B28"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            {/* Turntable decorative concentric groove */}
            <circle
              cx={centerX}
              cy={centerY}
              r={turntableRadius}
              fill="none"
              stroke="#8C6D46"
              strokeWidth="1"
              strokeDasharray="4 6"
              strokeOpacity="0.35"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={turntableRadius - 18}
              fill="none"
              stroke="#5C3B1E"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />

            {/* 旋转时出现的极细金色轨迹 */}
            {showFineTrail && (
              <circle
                cx={centerX}
                cy={centerY}
                r={turntableRadius}
                fill="none"
                stroke="#D6A84B"
                strokeWidth="0.8"
                strokeOpacity="0.55"
                className="transition-opacity duration-300 animate-pulse"
              />
            )}
          </svg>
        </div>

        {/* =========================================================================
            图层 2: 圆环中央的武舞人物缩小版图片 (居中放大版)
            ========================================================================= */}
        <div
          className="absolute z-10 w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-inner pointer-events-none flex items-center justify-center bg-[#180C08]"
          style={{
            left: `${centerX - 36}px`,
            top: `${centerY - 36}px`,
          }}
        >
          <img
            src={warriorBrickImg}
            alt="武舞画像砖"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-[#8C6D46]/40 pointer-events-none" />
        </div>

        {/* =========================================================================
            图层 3: 五件真实文物道具图片 (按用户要求全部放大一倍，让页面饱满充实！)
            ========================================================================= */}
        {items.map((item, index) => {
          const itemAngle = rotationAngle + index * angleStep;
          const rad = (itemAngle * Math.PI) / 180;
          const isSelected = selectedIds.includes(item.id);

          // Position along the circular turntable line
          const currentRadius = isSelected ? turntableRadius + 8 : turntableRadius - 4;
          const posX = centerX + currentRadius * Math.cos(rad);
          const posY = centerY + currentRadius * Math.sin(rad);

          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playBronzeChime();
                onToggleSelect(item);
              }}
              style={{
                left: `${posX}px`,
                top: `${posY}px`,
                transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.15) translateY(-8px)' : 'scale(1)'}`,
                transition: isRotating ? 'none' : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), left 150ms, top 150ms',
              }}
              className="absolute z-20 flex flex-col items-center cursor-pointer group"
            >
              {/* 精品文物摄影光线落在选中文物上 */}
              {isSelected && (
                <div
                  className="absolute -inset-3 rounded-full pointer-events-none animate-pulse"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 25%, rgba(241, 217, 141, 0.32) 0%, rgba(200, 148, 61, 0.1) 50%, transparent 70%)',
                    filter: 'blur(4px)',
                  }}
                />
              )}

              {/* 文物图片容器：【按指令全部放大一倍，由原先 56x64 翻倍至约 104x112】 */}
              <div
                className={`relative w-24 sm:w-26 flex items-center justify-center overflow-hidden transition-all duration-300 ${
                  isSelected ? 'h-26 sm:h-28' : 'h-22 sm:h-24'
                }`}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className={`max-w-full max-h-full object-contain filter transition-all duration-300 ${
                      isSelected
                        ? 'brightness-110 contrast-110 drop-shadow-[0_6px_16px_rgba(241,217,141,0.6)]'
                        : 'brightness-90 contrast-105 drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)] opacity-95'
                    }`}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#3E2114] text-[#F1D98D] text-sm flex items-center justify-center">
                    {item.name[0]}
                  </div>
                )}
              </div>

              {/* 文物名称标签 (无边框，古风大字清晰标牌) */}
              <div className="mt-0.5 text-center">
                <span
                  className={`text-[10px] sm:text-[10.5px] font-serif tracking-wider px-1.5 py-0.5 rounded-sm transition-colors ${
                    isSelected
                      ? 'text-[#F1D98D] font-black bg-[#2A160E]/95 drop-shadow border border-[#D6A84B]/40'
                      : 'text-[#C8B095] hover:text-[#F1D98D] bg-black/60'
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        =========================================================================
        【确认按键置于提示框之上】：
        绝不被下方的线索提示框遮挡，全无边框，四角无横线
        ========================================================================= 
      */}
      <div className="relative z-30 w-full flex flex-col items-center pt-1 pb-2">
        <button
          onClick={() => {
            if (canConfirm && onConfirm) {
              soundFX.playStoneDrum();
              onConfirm();
            }
          }}
          disabled={!canConfirm}
          className={`w-full max-w-xs py-2.5 px-6 rounded-sm font-serif text-xs tracking-[0.25em] pl-[0.35em] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg ${
            canConfirm
              ? 'bg-gradient-to-r from-[#8C5E28] via-[#C8943D] to-[#8C5E28] text-[#140A07] font-black hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(200,148,61,0.35)]'
              : 'bg-[#1F120C]/80 text-[#6B5542] cursor-not-allowed'
          }`}
        >
          <span>确认汉代武器 · 复原武舞</span>
        </button>
      </div>
    </div>
  );
};
