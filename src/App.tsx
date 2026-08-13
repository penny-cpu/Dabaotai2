/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SectionKey } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { Page1HomeSand } from './components/Page1HomeSand';
import { Page2TombSection } from './components/Page2TombSection';
import { Page3WuDanceVideo } from './components/Page3WuDanceVideo';
import { Page4RelicExcavation } from './components/Page4RelicExcavation';
import { Page5FlashlightScroll } from './components/Page5FlashlightScroll';
import { Page6HuangchangBoundary } from './components/Page6HuangchangBoundary';
import { Page7FuneraryDance } from './components/Page7FuneraryDance';
import { Page8ImmortalAscension } from './components/Page8ImmortalAscension';
import { Page9PanguDance } from './components/Page9PanguDance';
import { Page10EpilogueLoop } from './components/Page10EpilogueLoop';
import { HuangchangProgressBar } from './components/HuangchangProgressBar';
import { soundFX } from './utils/soundEngine';

const SECTION_TITLES: Record<SectionKey, string> = {
  home: '风吹沙开 · 考古揭幕',
  strata: '墓葬土层 · 探寻地下黄肠',
  dance: '汉代武舞 · 礼乐兵器演练',
  relics: '古物发掘 · 五件汉陵遗珍',
  scroll: '照见汉代 · 长卷市井探秘',
  huangchang: '黄肠题凑 · 死亡的界限 (世界观转场)',
  funerary: '送葬舞 · 抚慰亡者入土为安',
  immortal: '升仙舞 · 神仙幻想世界 (视觉高潮)',
  pangu: '盘鼓舞 · 古今穿越与重叠共舞',
  epilogue: '沉浸结语 · 历史重沉地下 / 首尾循环',
};

const SECTION_ORDER: SectionKey[] = [
  'home',
  'strata',
  'dance',
  'relics',
  'scroll',
  'huangchang',
  'funerary',
  'immortal',
  'pangu',
  'epilogue',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState<SectionKey | null>(null);

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
        return <Page1HomeSand onNextPage={() => handleNextSection('home')} />;
      case 'strata':
        return <Page2TombSection onNextPage={() => handleNextSection('strata')} />;
      case 'dance':
        return <Page3WuDanceVideo onNextPage={() => handleNextSection('dance')} />;
      case 'relics':
        return <Page4RelicExcavation onNextPage={() => handleNextSection('relics')} />;
      case 'scroll':
        return <Page5FlashlightScroll onNextPage={() => handleNextSection('scroll')} />;
      case 'huangchang':
        return <Page6HuangchangBoundary onNextPage={() => handleNextSection('huangchang')} />;
      case 'funerary':
        return <Page7FuneraryDance onNextPage={() => handleNextSection('funerary')} />;
      case 'immortal':
        return <Page8ImmortalAscension onNextPage={() => handleNextSection('immortal')} />;
      case 'pangu':
        return <Page9PanguDance onNextPage={() => handleNextSection('pangu')} />;
      case 'epilogue':
        return <Page10EpilogueLoop onRestartHome={() => triggerSectionChange('home')} />;
      default:
        return <Page1HomeSand onNextPage={() => handleNextSection('home')} />;
    }
  };

  return (
    <PhoneFrame
      activeSection={activeSection}
      onSelectSection={triggerSectionChange}
    >
      <div className="relative w-full h-full">
        {renderActivePage()}

        {/* Huangchang Ticou Step Construction Loading Transition Overlay */}
        {isTransitioning && targetSection && (
          <div className="absolute inset-0 z-50 bg-[#1a120b]/95 backdrop-blur-md p-4 flex flex-col justify-center items-center animate-fade-in">
            <div className="w-full max-w-sm">
              <HuangchangProgressBar
                isLoading={true}
                durationMs={1100}
                onComplete={handleTransitionComplete}
                title={`考工营建 · 切至【${SECTION_TITLES[targetSection]}】`}
              />
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
