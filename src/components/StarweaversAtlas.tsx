import React, { useRef, useEffect, useState, useCallback } from 'react';
import { soundFX } from '../utils/soundEngine';
import { RefreshCw } from 'lucide-react';

interface StarNode {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isLinked: boolean;
  starIndex: number;
  radius: number;
  brightness: number;
  pulsePhase: number;
}

// 自由运动的星空背景微粒子
interface CosmicParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  baseColor: string;
}

interface StarweaversAtlasProps {
  onCompleteBeidou: () => void;
  onErrorTip?: (tip: string) => void;
}

// 缩减为 5 个核心星座
const FIVE_STAR_NAMES = ['天枢', '天璇', '天玑', '天权', '玉衡'];

export const StarweaversAtlas: React.FC<StarweaversAtlasProps> = ({
  onCompleteBeidou,
  onErrorTip,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [phase, setPhase] = useState<'interactive' | 'beidou_success'>('interactive');
  const [selectedStarIds, setSelectedStarIds] = useState<string[]>([]);

  // Animation Refs
  const animFrameIdRef = useRef<number | null>(null);
  const starsRef = useRef<StarNode[]>([]);
  const cosmicParticlesRef = useRef<CosmicParticle[]>([]);

  // Initialize 5 Stars & Free Floating Night Sky Particle Background
  const initStarField = useCallback((width: number, height: number) => {
    // 1. 中间五颗需要连线的星座星象位置 (优美汉代星宿拱形弧度)
    const starCoords = [
      { x: width * 0.22, y: height * 0.36 }, // 0: 天枢
      { x: width * 0.42, y: height * 0.26 }, // 1: 天璇
      { x: width * 0.48, y: height * 0.52 }, // 2: 天玑
      { x: width * 0.28, y: height * 0.58 }, // 3: 天权
      { x: width * 0.72, y: height * 0.68 }, // 4: 玉衡
    ];

    const starList: StarNode[] = FIVE_STAR_NAMES.map((name, idx) => ({
      id: `star_${idx}`,
      name,
      x: starCoords[idx].x,
      y: starCoords[idx].y,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      isLinked: false,
      starIndex: idx,
      radius: 14, // 较大且明亮的五颗主星
      brightness: 1.0,
      pulsePhase: idx * 1.25,
    }));

    starsRef.current = starList;

    // 2. 自由粒子运动的纯黑夜空星辰粒子 (85 颗自由漂浮粒子)
    const particles: CosmicParticle[] = [];
    for (let i = 0; i < 85; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // 自由平滑二维运动速度
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() < 0.2 ? 2.2 : Math.random() < 0.6 ? 1.4 : 0.8,
        alpha: 0.25 + Math.random() * 0.7,
        twinkleSpeed: 0.03 + Math.random() * 0.06,
        baseColor: Math.random() < 0.3 ? '#FFE89E' : Math.random() < 0.6 ? '#E2E8F0' : '#85D0BA',
      });
    }
    cosmicParticlesRef.current = particles;
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 340;
    const height = canvas.parentElement?.clientHeight || 360;
    canvas.width = width;
    canvas.height = height;

    initStarField(width, height);

    let time = 0;

    const render = () => {
      time += 0.035;
      ctx.clearRect(0, 0, width, height);

      // STEP 1: 纯粹深邃的黑色夜空背景
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      bgGrad.addColorStop(0, '#0D080A'); // 极暗夜空
      bgGrad.addColorStop(0.5, '#060305');
      bgGrad.addColorStop(1, '#010002'); // 纯黑虚空
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 幽微金色星云尘雾 (极为内敛的高雅汉风微光)
      ctx.save();
      const nebula = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        20,
        width * 0.5,
        height * 0.45,
        width * 0.6
      );
      nebula.addColorStop(0, 'rgba(214, 168, 75, 0.05)');
      nebula.addColorStop(0.6, 'rgba(121, 185, 161, 0.03)');
      nebula.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // STEP 2: 【做自由粒子运动的黑色夜空星辰背景】
      // 粒子在空间中自主漂浮穿梭，边缘平滑循环环绕
      cosmicParticlesRef.current.forEach((p) => {
        // 更新自由粒子坐标
        p.x += p.vx;
        p.y += p.vy;

        // 边界平滑穿梭
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // 闪烁微光
        const twinkle = Math.sin(time * p.twinkleSpeed * 10 + p.x) * 0.35 + 0.65;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.globalAlpha = p.alpha * twinkle;
        if (p.radius > 1.8) {
          ctx.shadowColor = '#F1D98D';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.restore();
      });

      // 🌟【最后一帧舞姿与星座连线路线重合】：绘制柔和微光的白玉舞人反折腰甩袖连线星轨
      const nodes = starsRef.current;
      if (nodes.length >= 5) {
        ctx.save();
        ctx.strokeStyle = 'rgba(121, 185, 161, 0.38)';
        ctx.lineWidth = 2.2;
        ctx.shadowColor = 'rgba(214, 168, 75, 0.4)';
        ctx.shadowBlur = 10;
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        // 天枢 (0) -> 天璇 (1) 仰袖扬拂
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.quadraticCurveTo((nodes[0].x + nodes[1].x) / 2, nodes[1].y - 14, nodes[1].x, nodes[1].y);
        // 天璇 (1) -> 天玑 (2) 反折纤腰身姿
        ctx.quadraticCurveTo(nodes[1].x + 18, (nodes[1].y + nodes[2].y) / 2, nodes[2].x, nodes[2].y);
        // 天玑 (2) -> 天权 (3) 屈膝曳裾
        ctx.quadraticCurveTo((nodes[2].x + nodes[3].x) / 2 + 6, nodes[3].y + 12, nodes[3].x, nodes[3].y);
        // 天权 (3) -> 玉衡 (4) 凌空长袖拂越星汉
        ctx.quadraticCurveTo(nodes[3].x + 50, nodes[4].y + 22, nodes[4].x, nodes[4].y);
        ctx.stroke();

        // 舞姿头饰与反折腰身姿态微光
        ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(241, 217, 141, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nodes[1].x, nodes[1].y - 14, 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // STEP 3: 已连接星宿之间的金黄能量光线
      if (selectedStarIds.length > 1) {
        ctx.save();
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#FFA500';
        ctx.shadowBlur = 14;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        selectedStarIds.forEach((id, idx) => {
          const star = starsRef.current.find((s) => s.id === id);
          if (!star) return;
          if (idx === 0) {
            ctx.moveTo(star.x, star.y);
          } else {
            ctx.lineTo(star.x, star.y);
          }
        });
        ctx.stroke();
        ctx.restore();
      }

      // STEP 4: 【中间较大的需要连线的五颗星座变成不断闪烁的黄色星点】
      starsRef.current.forEach((star) => {
        const isSelected = selectedStarIds.includes(star.id);

        // 不断闪烁的黄色高亮正弦波动频率 (Yellow Pulsating Core)
        const yellowPulse = Math.sin(time * 4.5 + star.pulsePhase) * 0.35 + 0.65;
        const outerHaloRadius = 16 + yellowPulse * 12;

        ctx.save();

        // 1. 大外层黄色漫射星晕
        ctx.beginPath();
        ctx.arc(star.x, star.y, outerHaloRadius, 0, Math.PI * 2);
        const haloGrad = ctx.createRadialGradient(
          star.x,
          star.y,
          3,
          star.x,
          star.y,
          outerHaloRadius
        );
        haloGrad.addColorStop(0, `rgba(255, 223, 0, ${0.75 * yellowPulse})`);
        haloGrad.addColorStop(0.5, `rgba(255, 170, 0, ${0.35 * yellowPulse})`);
        haloGrad.addColorStop(1, 'rgba(255, 160, 0, 0)');
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // 2. 黄色四芒星辉交叉光芒 (Cross Diamond Sparkle Rays)
        ctx.save();
        ctx.strokeStyle = `rgba(255, 235, 100, ${0.85 * yellowPulse})`;
        ctx.lineWidth = 1.5;
        const rayLen = 14 + yellowPulse * 10;
        ctx.beginPath();
        // 竖向芒线
        ctx.moveTo(star.x, star.y - rayLen);
        ctx.lineTo(star.x, star.y + rayLen);
        // 横向芒线
        ctx.moveTo(star.x - rayLen, star.y);
        ctx.lineTo(star.x + rayLen, star.y);
        ctx.stroke();
        ctx.restore();

        // 3. 璀璨明亮的核心黄色星珠
        ctx.beginPath();
        const coreRadius = isSelected ? 8 : 6.5 + yellowPulse * 2;
        ctx.arc(star.x, star.y, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#FFF385';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 18;
        ctx.fill();

        // 4. 星座名称悬浮标签
        ctx.save();
        ctx.font = isSelected ? 'bold 12px serif' : '11px serif';
        const text = star.name;
        const textW = ctx.measureText(text).width;
        const pillW = textW + 12;
        const pillH = 18;
        const pillX = star.x - pillW / 2;
        const pillY = star.y - 25;

        ctx.fillStyle = isSelected
          ? 'rgba(214, 168, 75, 0.95)'
          : 'rgba(20, 12, 6, 0.85)';
        ctx.strokeStyle = isSelected ? '#FFFFFF' : '#FFD700';
        ctx.lineWidth = isSelected ? 1.5 : 1;

        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#120A07' : '#FFE87A';
        ctx.textAlign = 'center';
        ctx.fillText(text, star.x, star.y - 12);
        ctx.restore();

        // 5. 若已连线，显示连线次序编号徽章 (1 ~ 5)
        if (isSelected) {
          const seqIdx = selectedStarIds.indexOf(star.id) + 1;
          ctx.beginPath();
          ctx.arc(star.x + 13, star.y - 20, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#9B3D2E';
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(seqIdx.toString(), star.x + 13, star.y - 17);
        }

        ctx.restore();
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [selectedStarIds, initStarField]);

  // Handle Canvas Tap on Star Nodes
  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    const hitRadius = 28;
    const clickedStar = starsRef.current.find((st) => {
      const dx = st.x - clickX;
      const dy = st.y - clickY;
      return Math.sqrt(dx * dx + dy * dy) <= hitRadius;
    });

    if (!clickedStar) return;

    soundFX.playStoneDrum();

    // Prevent re-adding or allow undoing
    if (selectedStarIds.includes(clickedStar.id)) {
      setSelectedStarIds((prev) => prev.filter((id) => id !== clickedStar.id));
      return;
    }

    const nextExpectedIndex = selectedStarIds.length;
    if (clickedStar.starIndex !== nextExpectedIndex) {
      soundFX.playGlitchStatic();
      const expectedName = FIVE_STAR_NAMES[nextExpectedIndex];
      if (onErrorTip) {
        onErrorTip(`五星需顺应天象次序连接，下一步应为【${expectedName}】`);
      }
      return;
    }

    // Correct sequential step
    soundFX.playBronzeChime();
    const newSelected = [...selectedStarIds, clickedStar.id];
    setSelectedStarIds(newSelected);

    // 【将需要连接的七个星座缩减为五个】
    if (newSelected.length === 5) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setPhase('beidou_success');
      setTimeout(() => {
        onCompleteBeidou();
      }, 1200);
    }
  };

  const handleReset = () => {
    soundFX.playStoneDrum();
    setSelectedStarIds([]);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/4.2] max-h-[340px] rounded-xl overflow-hidden border-0 shadow-2xl flex flex-col justify-between select-none bg-black"
    >
      {/* Interactive Cosmos Canvas (纯净黑色夜空背景 + 舞姿星轨重合 + 自由粒子运动) */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-pointer z-10"
      />

      {/* 极简重置按键 (无多余文字干扰，仅在已开始连线时在右上角提供便捷重置) */}
      {selectedStarIds.length > 0 && phase !== 'beidou_success' && (
        <div className="relative z-20 p-2 flex justify-end pointer-events-none">
          <button
            onClick={handleReset}
            className="pointer-events-auto px-2 py-0.5 rounded-[4px] bg-black/75 border border-[#D6A84B]/30 text-[8.5px] text-[#C4A98B] hover:text-[#F1D98D] active:scale-95 transition-all flex items-center gap-1"
          >
            <RefreshCw className="w-2.5 h-2.5 text-[#D6A84B]" />
            <span>重置</span>
          </button>
        </div>
      )}
    </div>
  );
};
