import { useState, useRef, useCallback } from 'react';

/**
 * 通用平滑页面/阶段转场 Hook：
 * 严格控制在 0.5 秒左右（240ms 柔和淡出 -> 瞬时换页 -> 260ms 柔和淡入），
 * 杜绝吞页、卡顿与多余特效，使每一个章节内外的页面切换统一具备符合人眼观感的电影级平滑过渡。
 */
export function useSmoothPhaseTransition<T extends string>(initialPhase: T) {
  const [phase, setPhaseState] = useState<T>(initialPhase);
  const [phaseOpacity, setPhaseOpacity] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const transitionTo = useCallback((targetPhase: T, onMidTransition?: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsTransitioning(true);

    // 1. 柔和淡出旧页面/旧阶段 (240ms)
    setPhaseOpacity(0);

    timerRef.current = setTimeout(() => {
      // 2. 在完全透明点瞬时切换状态，内容完整呈现，绝不吞页
      setPhaseState(targetPhase);
      if (onMidTransition) {
        onMidTransition();
      }

      // 3. 衔接柔和淡入新页面/新阶段 (260ms，总时间恰好约 0.5 秒)
      setPhaseOpacity(1);

      timerRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 260);
    }, 240);
  }, []);

  return {
    phase,
    setPhase: transitionTo,
    setPhaseImmediate: setPhaseState,
    phaseOpacity,
    isTransitioning,
    transitionStyle: {
      opacity: phaseOpacity,
      transition: 'opacity 250ms ease-in-out',
      willChange: 'opacity' as const,
    },
  };
}
