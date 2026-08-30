/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('prologue_flow');
  const [unlockedFragments, setUnlockedFragments] = useState<JadeFragmentId[]>([]);
  const [trackPoints, setTrackPoints] = useState<UserInteractionTrackPoint[]>([]);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

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
    }
  };

  const triggerSectionChange = (targetKey: SectionKey) => {
    soundFX.playStoneDrum();
    setActiveSection(targetKey);
  };

  const handleNextSection = (currentKey: SectionKey) => {
    const currIdx = SECTION_ORDER.indexOf(currentKey);
    const nextKey = currIdx < SECTION_ORDER.length - 1 ? SECTION_ORDER[currIdx + 1] : 'prologue_flow';
    triggerSectionChange(nextKey);
  };

  const renderActivePage = () => {
    switch (activeSection) {
      case 'prologue_flow':
        return (
          <PrologueFlow
            onStartChapter1={() => setActiveSection('weapon')}
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
            onComplete={() => setActiveSection('gallery')}
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
              setActiveSection('prologue_flow');
            }}
            isUnlocked={unlockedFragments.includes('frag_head_halo')}
          />
        );
      default:
        return (
          <PrologueFlow
            onStartChapter1={() => setActiveSection('weapon')}
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
        className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0d0906]"
      >
        {/* Top Right Circular Actions: 地图目录 & 记忆碎片 */}
        {activeSection !== 'prologue_flow' && (
          <RightTopActions
            currentChapterKey={activeSection}
            unlockedCount={unlockedFragments.length}
            totalChapters={7}
            unlockedCardIds={unlockedFragments}
            onOpenMapModal={() => setShowMapModal(true)}
          />
        )}

        {/* Dynamic Game Page / Scene Stage */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {renderActivePage()}
        </div>

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
