/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SectionKey, JadeFragmentId, UserInteractionTrackPoint } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { Page1HomeSand } from './components/Page1HomeSand';
import { Page2WeaponPuzzle } from './components/Page2WeaponPuzzle';
import { Page3PendantPuzzle } from './components/Page3PendantPuzzle';
import { Page4FloatingGallery } from './components/Page4FloatingGallery';
import { Page5BaixiPuzzle } from './components/Page5BaixiPuzzle';
import { Page6FuneraryMirrorPuzzle } from './components/Page6FuneraryMirrorPuzzle';
import { Page7HuangchangWoodPuzzle } from './components/Page7HuangchangWoodPuzzle';
import { Page8AscensionStarPuzzle } from './components/Page8AscensionStarPuzzle';
import { Page9EpiloguePostcard } from './components/Page9EpiloguePostcard';
import { JadeProgressSilhouette } from './components/JadeProgressSilhouette';
import { JadeDancerCompanion } from './components/JadeDancerCompanion';
import { SevenChapterMapModal } from './components/SevenChapterMapModal';
import { ChapterTransitionOverlay } from './components/ChapterTransitionOverlay';
import { soundFX } from './utils/soundEngine';

const SECTION_TITLES: Record<SectionKey, string> = {
  home: '风吹沙开 · 考古唤醒',
  weapon: '第一章 · 戈影 (武舞之器与朱干玉戚)',
  pendant: '第二章 · 宴乐 (长乐宴乐与翘袖折腰)',
  gallery: '第三章 · 浮游 (五列汉代随葬文物博览)',
  baixi: '第四章 · 百戏 (烛光壁画与跳丸算术)',
  funerary: '第五章 · 袖舞 (送灵长袖与星云铜镜)',
  huangchang: '第六章 · 木阵 (黄肠题凑 15880 考工)',
  ascension: '第七章 · 魂归 (星空极光与北斗星路)',
  epilogue: '终章 · 汉代揖礼与个人探索记忆长卷',
  conclusion: '结语 · 岁月静淌',
  postcard: '明信片 · 双面长卷',
  sunset: '晚霞 · 现代大葆台',
};

const SECTION_ORDER: SectionKey[] = [
  'home',
  'weapon',
  'pendant',
  'gallery',
  'baixi',
  'funerary',
  'huangchang',
  'ascension',
  'epilogue',
];

const COMPANION_DIALOGUES: Record<SectionKey, string> = {
  home: '我是谁……？我记得我是一块玉。我脑子里有好多画面在打架，你愿意帮我找回遗失的七段记忆吗？',
  weapon: '汉代武舞讲究“朱干玉戚，以舞大武”！武舞者手中空空如也，请找出八角铜棁与铁剑，为他们找回干戚之威。',
  pendant: '这是广阳王后墓随葬的组玉佩……白玉神兽、翘袖折腰，那是我最熟悉的乐舞身姿！',
  gallery: '在这座地下随葬宫殿里，有好多伙伴。左右拖拽空间，去看看我的邻居们吧。',
  baixi: '七颗彩球在空中划出优美弧线。汉代记数中“又”表示“加”，礼乐治国，百戏娱民，计算不可差！',
  funerary: '送葬路上，舞者扬袖翻卷、抱袖回环，她们画出的是通往天界的云气纹。星云铜镜照亮了这条路。',
  huangchang: '一万五千八百八十根黄心柏木，端头朝向中心，构筑起守护帝王陵墓两千年的坚固堡垒。',
  ascension: '天圆地方，星宿有轨。盘为地，鼓为天；一足踏鼓，一足踩盘——天人就在方寸之间交汇了！',
  epilogue: '谢谢你们，擦干净我身上的泥土。这里的历史从未沉睡，这里的记忆已被你们唤醒！',
  conclusion: '广阳王的盛宴虽已散场，但大汉的余韵，仍在黄肠木的年轮中静静流淌。',
  postcard: '这是属于你与大葆台的专属探索长卷，带上这段记忆吧。',
  sunset: '走出地下陵墓，重见温暖的现代落日余晖。',
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [unlockedFragments, setUnlockedFragments] = useState<JadeFragmentId[]>([
    'frag_right_sleeve',
  ]);
  const [trackPoints, setTrackPoints] = useState<UserInteractionTrackPoint[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [targetSection, setTargetSection] = useState<SectionKey | null>(null);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  // Track User Interaction Points for Postcard S-Curve Generation
  const handleTrackAction = (x: number, y: number, action: 'tap' | 'scratch' | 'solve' = 'tap') => {
    setTrackPoints((prev) => [
      ...prev,
      { x, y, chapter: activeSection, timestamp: Date.now(), action },
    ]);
  };

  const handleUnlockFragment = (id: JadeFragmentId) => {
    if (!unlockedFragments.includes(id)) {
      setUnlockedFragments((prev) => [...prev, id]);
    }
  };

  const triggerSectionChange = (targetKey: SectionKey) => {
    if (targetKey === activeSection) return;
    soundFX.playStoneDrum();
    setTargetSection(targetKey);
    setIsTransitioning(true);
  };

  const handleNextSection = (currentKey: SectionKey) => {
    const currIdx = SECTION_ORDER.indexOf(currentKey);
    const nextKey = currIdx < SECTION_ORDER.length - 1 ? SECTION_ORDER[currIdx + 1] : 'home';
    triggerSectionChange(nextKey);
  };

  const handleTransitionComplete = () => {
    if (targetSection) {
      setActiveSection(targetSection);
      setTargetSection(null);
    }
    setIsTransitioning(false);
  };

  const renderActivePage = () => {
    switch (activeSection) {
      case 'home':
        return (
          <Page1HomeSand
            onNextPage={() => handleNextSection('home')}
            onOpenMap={() => setShowMapModal(true)}
            onTrackAction={(x, y, act) => handleTrackAction(x, y, act)}
          />
        );
      case 'weapon':
        return (
          <Page2WeaponPuzzle
            onUnlockFragment={() => handleUnlockFragment('frag_right_sleeve')}
            onNextPage={() => handleNextSection('weapon')}
            isUnlocked={unlockedFragments.includes('frag_right_sleeve')}
          />
        );
      case 'pendant':
        return (
          <Page3PendantPuzzle
            onUnlockFragment={() => handleUnlockFragment('frag_chest_pendant')}
            onNextPage={() => handleNextSection('pendant')}
            isUnlocked={unlockedFragments.includes('frag_chest_pendant')}
          />
        );
      case 'gallery':
        return (
          <Page4FloatingGallery
            onUnlockFragment={() => handleUnlockFragment('frag_left_sleeve')}
            onNextPage={() => handleNextSection('gallery')}
            isUnlocked={unlockedFragments.includes('frag_left_sleeve')}
          />
        );
      case 'baixi':
        return (
          <Page5BaixiPuzzle
            onUnlockFragment={() => handleUnlockFragment('frag_robe_skirt')}
            onNextPage={() => handleNextSection('baixi')}
            isUnlocked={unlockedFragments.includes('frag_robe_skirt')}
          />
        );
      case 'funerary':
        return (
          <Page6FuneraryMirrorPuzzle
            onUnlockFragment={() => handleUnlockFragment('frag_waist')}
            onNextPage={() => handleNextSection('funerary')}
            isUnlocked={unlockedFragments.includes('frag_waist')}
          />
        );
      case 'huangchang':
        return (
          <Page7HuangchangWoodPuzzle
            onUnlockFragment={() => handleUnlockFragment('frag_body_core')}
            onNextPage={() => handleNextSection('huangchang')}
            isUnlocked={unlockedFragments.includes('frag_body_core')}
          />
        );
      case 'ascension':
        return (
          <Page8AscensionStarPuzzle
            onUnlockFragment={() => handleUnlockFragment('frag_head_halo')}
            onNextPage={() => handleNextSection('ascension')}
            isUnlocked={unlockedFragments.includes('frag_head_halo')}
          />
        );
      case 'epilogue':
        return (
          <Page9EpiloguePostcard
            onRestartHome={() => triggerSectionChange('home')}
            trackPoints={trackPoints}
          />
        );
      default:
        return (
          <Page1HomeSand
            onNextPage={() => handleNextSection('home')}
            onOpenMap={() => setShowMapModal(true)}
            onTrackAction={(x, y, act) => handleTrackAction(x, y, act)}
          />
        );
    }
  };

  return (
    <PhoneFrame
      activeSection={activeSection}
      onSelectSection={triggerSectionChange}
      onOpenMapModal={() => setShowMapModal(true)}
    >
      <div
        onClick={(e) => handleTrackAction(e.clientX, e.clientY, 'tap')}
        className="relative w-full h-full flex flex-col justify-between overflow-hidden"
      >
        {/* Top Jade Dancer Silhouette Progress Bar (Visible on all chapters except home) */}
        {activeSection !== 'home' && (
          <JadeProgressSilhouette
            unlockedFragments={unlockedFragments}
            onOpenMap={() => setShowMapModal(true)}
          />
        )}

        {/* Dynamic Chapter Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {renderActivePage()}
        </div>

        {/* Fixed Bottom-Left Jade Dancer Companion */}
        {activeSection !== 'epilogue' && (
          <JadeDancerCompanion
            currentDialogue={COMPANION_DIALOGUES[activeSection]}
            hasNewHint={true}
          />
        )}

        {/* Seven Chapters Vertical 3-Hall Map Directory Modal */}
        {showMapModal && (
          <SevenChapterMapModal
            activeSection={activeSection}
            unlockedFragments={unlockedFragments}
            onSelectSection={triggerSectionChange}
            onClose={() => setShowMapModal(false)}
          />
        )}

        {/* 7-Stage Jade Assembly Chapter Transition Overlay (Requirement 5) */}
        {isTransitioning && targetSection && (
          <ChapterTransitionOverlay
            targetSection={targetSection}
            unlockedFragments={unlockedFragments}
            onComplete={handleTransitionComplete}
            title={SECTION_TITLES[targetSection]}
          />
        )}
      </div>
    </PhoneFrame>
  );
}
