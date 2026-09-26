/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { SectionKey, JadeFragmentId, UserInteractionTrackPoint } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { PrologueFlow } from './components/PrologueFlow';
import { Stage1Weapon } from './components/Stage1Weapon';
import { Stage2Banquet } from './components/Stage2Banquet';
import { JadeSphereInteractive } from './components/JadeSphereInteractive';
import { Stage3Gallery } from './components/Stage3Gallery';
import { Stage4Baixi } from './components/Stage4Baixi';
import { Stage5Funerary } from './components/Stage5Funerary';
import { Stage6Huangchang } from './components/Stage6Huangchang';
import { Stage7Ascension } from './components/Stage7Ascension';
import { VerticalSevenMapModal } from './components/VerticalSevenMapModal';
import { RightTopActions } from './components/RightTopActions';
import { soundFX } from './utils/soundEngine';
import { Sparkles } from 'lucide-react';
import { JadeReshapeOverlay } from './components/JadeReshapeOverlay';

const SECTION_ORDER: SectionKey[] = [
  'prologue_flow',
  'weapon',
  'banquet',
  'jade_sphere',
  'gallery',
  'baixi',
  'funerary',
  'huangchang',
  'ascension',
];

const FRAGMENT_NAMES: Record<JadeFragmentId, string> = {
  frag_right_sleeve: '右袖 · 戈舞出征',
  frag_chest_pendant: '胸佩 · 宴飨佩鸣',
  frag_left_sleeve: '左袖 · 袖舞从风',
  frag_robe_skirt: '衣摆 · 俳优百戏',
  frag_waist: '腰身 · 送葬礼乐',
  frag_body_core: '主体 · 黄肠题凑',
  frag_head_halo: '首光 · 四象星宿',
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('prologue_flow');
  const [pageOpacity, setPageOpacity] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [unlockedFragments, setUnlockedFragments] = useState<JadeFragmentId[]>([]);
  const [trackPoints, setTrackPoints] = useState<UserInteractionTrackPoint[]>([]);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [justUnlockedFrag, setJustUnlockedFrag] = useState<{ id: JadeFragmentId; name: string } | null>(null);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);
  const [isBambooSlipActive, setIsBambooSlipActive] = useState<boolean>(false);
  const [showReshapeOverlay, setShowReshapeOverlay] = useState<boolean>(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 监听各章节竹简展示页激活状态，确保记忆+1动效仅在此页面出现
  useEffect(() => {
    const handleBambooState = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsBambooSlipActive(!!customEvent.detail);
    };
    window.addEventListener('bamboo_slip_active', handleBambooState);
    return () => {
      window.removeEventListener('bamboo_slip_active', handleBambooState);
    };
  }, []);

  // Track User Interaction Points
  const handleTrackAction = (x: number, y: number, action: 'tap' | 'scratch' | 'photo' | 'drag' | 'solve' = 'tap') => {
    setTrackPoints((prev) => [
      ...prev,
      { x, y, chapter: activeSection, timestamp: Date.now(), action },
    ]);
  };

  const handleUnlockFragment = (id: JadeFragmentId) => {
    if (!unlockedFragments.includes(id)) {
      setUnlockedFragments((prev) => [...prev, id]);

      // 1. 短暂轻微物理震动反馈 (Navigator Vibration API)
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 50, 40]);
        } catch {
          // Ignore
        }
      }

      // 2. 界面短暂微震动视觉反馈
      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 380);

      // 3. 碎片金色辉光闪烁动画与高亮反馈
      setJustUnlockedFrag({ id, name: FRAGMENT_NAMES[id] || '玉佩碎片' });
      soundFX.playFragmentUnlock();

      // 🚨 用户明确要求：第一到第六章删去图1（JadeReshapeOverlay），直接进入竹简页面！
      // 仅在第七章最终全部唤醒时才展示终极重塑玉佩动效
      if (activeSection === 'ascension') {
        setShowReshapeOverlay(true);
      }

      setTimeout(() => {
        setJustUnlockedFrag(null);
      }, 3500);
    }
  };

  // 章节转场：符合人点击与阅读的时间状态，直接平滑淡入淡出，完整保留前后页面内容，所有转场时间控制在0.5秒左右，适当符合人的视觉正常观感
  const triggerSectionChange = (targetKey: SectionKey) => {
    if (targetKey === activeSection || isTransitioning) return;

    setIsBambooSlipActive(false);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setIsTransitioning(true);
    // 1. 轻柔平滑淡出旧页面 (240ms，控制在0.5秒左右，符合人眼正常观感)
    setPageOpacity(0);
    soundFX.fadeVolume(0.1, 0.24);

    transitionTimerRef.current = setTimeout(() => {
      // 2. 在完全透明点瞬时换入新章节，前后页面各自完整，绝不吞页
      setActiveSection(targetKey);
      soundFX.playStoneDrum();
      soundFX.fadeVolume(1.0, 0.26);

      // 3. 衔接平滑淡入新页面 (260ms，总转场时间严格控制在0.5秒左右)
      setPageOpacity(1);

      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 260);
    }, 240);
  };

  const handleNextSection = (currentKey: SectionKey) => {
    const currIdx = SECTION_ORDER.indexOf(currentKey);
    const nextKey = currIdx < SECTION_ORDER.length - 1 ? SECTION_ORDER[currIdx + 1] : 'prologue_flow';
    triggerSectionChange(nextKey);
  };

  // Safe Rollback Mechanism: 快捷撤回上一章并安全回滚未落定的状态与碎片
  const handleRollbackPreviousChapter = () => {
    const chapterToFragmentMap: Partial<Record<SectionKey, JadeFragmentId>> = {
      weapon: 'frag_right_sleeve',
      banquet: 'frag_chest_pendant',
      jade_sphere: 'frag_chest_pendant',
      gallery: 'frag_left_sleeve',
      baixi: 'frag_robe_skirt',
      funerary: 'frag_waist',
      huangchang: 'frag_body_core',
      ascension: 'frag_head_halo',
    };

    const currIdx = SECTION_ORDER.indexOf(activeSection);
    if (currIdx <= 1) {
      // 回到序章
      triggerSectionChange('prologue_flow');
      setUnlockedFragments([]);
      return;
    }

    const prevSection = SECTION_ORDER[currIdx - 1];
    // 回滚当前章节解锁的碎片状态，确保数据一致
    const currentFrag = chapterToFragmentMap[activeSection];
    if (currentFrag) {
      setUnlockedFragments((prev) => prev.filter((id) => id !== currentFrag));
    }

    triggerSectionChange(prevSection);
  };

  const renderPageContent = (key: SectionKey) => {
    switch (key) {
      case 'prologue_flow':
        return (
          <PrologueFlow
            onStartChapter1={() => triggerSectionChange('weapon')}
          />
        );
      case 'weapon':
        return (
          <Stage1Weapon
            onUnlockFragment={() => handleUnlockFragment('frag_right_sleeve')}
            onNextPage={() => handleNextSection('weapon')}
            isUnlocked={unlockedFragments.includes('frag_right_sleeve')}
          />
        );
      case 'banquet':
        return (
          <Stage2Banquet
            onUnlockFragment={() => handleUnlockFragment('frag_chest_pendant')}
            onNextPage={() => handleNextSection('banquet')}
            isUnlocked={unlockedFragments.includes('frag_chest_pendant')}
          />
        );
      case 'jade_sphere':
        return (
          <JadeSphereInteractive
            onComplete={() => triggerSectionChange('gallery')}
          />
        );
      case 'gallery':
        return (
          <Stage3Gallery
            onUnlockFragment={() => handleUnlockFragment('frag_left_sleeve')}
            onNextPage={() => handleNextSection('gallery')}
            isUnlocked={unlockedFragments.includes('frag_left_sleeve')}
          />
        );
      case 'baixi':
        return (
          <Stage4Baixi
            onUnlockFragment={() => handleUnlockFragment('frag_robe_skirt')}
            onNextPage={() => handleNextSection('baixi')}
            isUnlocked={unlockedFragments.includes('frag_robe_skirt')}
          />
        );
      case 'funerary':
        return (
          <Stage5Funerary
            onUnlockFragment={() => handleUnlockFragment('frag_waist')}
            onNextPage={() => handleNextSection('funerary')}
            isUnlocked={unlockedFragments.includes('frag_waist')}
          />
        );
      case 'huangchang':
        return (
          <Stage6Huangchang
            onUnlockFragment={() => handleUnlockFragment('frag_body_core')}
            onNextPage={() => handleNextSection('huangchang')}
            isUnlocked={unlockedFragments.includes('frag_body_core')}
          />
        );
      case 'ascension':
        return (
          <Stage7Ascension
            onUnlockFragment={() => handleUnlockFragment('frag_head_halo')}
            onRestart={() => {
              setUnlockedFragments([]);
              triggerSectionChange('prologue_flow');
            }}
            isUnlocked={unlockedFragments.includes('frag_head_halo')}
          />
        );
      default:
        return (
          <PrologueFlow
            onStartChapter1={() => triggerSectionChange('weapon')}
          />
        );
    }
  };

  return (
    <PhoneFrame
      activeSection={activeSection}
      unlockedFragments={unlockedFragments}
      onSelectSection={triggerSectionChange}
      onOpenMapModal={() => setShowMapModal(true)}
    >
      <div
        onClick={(e) => handleTrackAction(e.clientX, e.clientY, 'tap')}
        className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0d0906] ${
          isScreenShaking ? 'animate-fragment-shake' : ''
        }`}
      >
        {/* Top Right Circular Actions: 地图目录 & 记忆碎片 & 快捷撤回上一章 */}
        {activeSection !== 'prologue_flow' && (
          <RightTopActions
            currentChapterKey={activeSection}
            unlockedCount={unlockedFragments.length}
            totalChapters={7}
            unlockedCardIds={unlockedFragments}
            showPlusOneAnimation={isBambooSlipActive}
            onOpenMapModal={() => setShowMapModal(true)}
            canRollback={activeSection !== 'prologue_flow'}
            onRollbackChapter={handleRollbackPreviousChapter}
          />
        )}

        {/* Newly Unlocked Fragment Golden Glow Feedback Banner (碎片解锁金色辉光闪烁提示) */}
        {justUnlockedFrag && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fade-in flex flex-col items-center">
            <div className="relative px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#2A180E]/95 via-[#3D2514]/95 to-[#2A180E]/95 border-2 border-[#FFE58F] shadow-[0_0_25px_rgba(255,215,0,0.65)] animate-golden-glow flex items-center gap-2 backdrop-blur-md">
              <span className="absolute inset-0 rounded-full border border-[#FFE89C] animate-golden-ring pointer-events-none" />
              <div className="w-5 h-5 rounded-full bg-[#180E09] border border-[#FFE58F] flex items-center justify-center text-[#FFE58F] shadow-[0_0_8px_#FFE58F]">
                <Sparkles className="w-3 h-3 text-[#FFE89C] animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[7.5px] font-mono tracking-widest text-[#F1D98D] uppercase font-bold">
                  FRAGMENT RESTORED · 碎片归位
                </span>
                <span className="text-[11px] font-serif font-black text-[#FFF8DE] tracking-wider">
                  已唤醒【{justUnlockedFrag.name}】
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Game Page / Scene Stage (直接平滑淡入淡出，完整保留前后页面内容，绝不吞页，所有转场时间控制在0.5秒左右，符合人眼正常观感) */}
        <div
          className="flex-1 relative overflow-hidden flex flex-col ease-in-out"
          style={{
            opacity: pageOpacity,
            transition: 'opacity 250ms ease-in-out',
            willChange: 'opacity',
          }}
        >
          {renderPageContent(activeSection)}
        </div>

        {/* Jade Reshape Overlay (粒子飘散并汇聚到主体玉佩重塑动画) */}
        {showReshapeOverlay && justUnlockedFrag && (
          <JadeReshapeOverlay
            unlockedFragments={unlockedFragments}
            recentFragmentId={justUnlockedFrag.id}
            fragmentName={justUnlockedFrag.name}
            onClose={() => setShowReshapeOverlay(false)}
          />
        )}

        {/* Seven Stage Vertical Map Modal */}
        {showMapModal && (
          <VerticalSevenMapModal
            activeSection={activeSection}
            unlockedFragments={unlockedFragments}
            onSelectSection={triggerSectionChange}
            onClose={() => setShowMapModal(false)}
          />
        )}
      </div>
    </PhoneFrame>
  );
}
