/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SectionKey, JadeFragmentId, UserInteractionTrackPoint } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { PrologueSand } from './components/PrologueSand';
import { PrologueGlitch } from './components/PrologueGlitch';
import { PrologueGate } from './components/PrologueGate';
import { Stage1Weapon } from './components/Stage1Weapon';
import { Stage2Banquet } from './components/Stage2Banquet';
import { Stage3Gallery } from './components/Stage3Gallery';
import { Stage4Baixi } from './components/Stage4Baixi';
import { Stage5Funerary } from './components/Stage5Funerary';
import { Stage6Huangchang } from './components/Stage6Huangchang';
import { Stage7Ascension } from './components/Stage7Ascension';
import { EpilogueEnding } from './components/EpilogueEnding';
import { JadeProgressSilhouette } from './components/JadeProgressSilhouette';
import { VerticalSevenMapModal } from './components/VerticalSevenMapModal';
import { soundFX } from './utils/soundEngine';

const SECTION_ORDER: SectionKey[] = [
  'prologue_sand',
  'prologue_glitch',
  'prologue_gate',
  'weapon',
  'banquet',
  'gallery',
  'baixi',
  'funerary',
  'huangchang',
  'ascension',
  'epilogue_card',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('prologue_sand');
  const [unlockedFragments, setUnlockedFragments] = useState<JadeFragmentId[]>([]);
  const [trackPoints, setTrackPoints] = useState<UserInteractionTrackPoint[]>([]);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  // Track User Interaction Points for Postcard S-Curve Generation
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
    const nextKey = currIdx < SECTION_ORDER.length - 1 ? SECTION_ORDER[currIdx + 1] : 'prologue_sand';
    triggerSectionChange(nextKey);
  };

  const isPrologue = activeSection === 'prologue_sand' || activeSection === 'prologue_glitch' || activeSection === 'prologue_gate';
  const isEpilogue = activeSection === 'epilogue_card' || activeSection === 'epilogue_dance';

  const renderActivePage = () => {
    switch (activeSection) {
      case 'prologue_sand':
        return (
          <PrologueSand
            onStartGlitch={() => setActiveSection('prologue_glitch')}
            onOpenMap={() => setShowMapModal(true)}
            onTrackAction={(x, y, act) => handleTrackAction(x, y, act)}
          />
        );
      case 'prologue_glitch':
        return (
          <PrologueGlitch
            onComplete={() => setActiveSection('prologue_gate')}
          />
        );
      case 'prologue_gate':
        return (
          <PrologueGate
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
            onGoToEpilogue={() => setActiveSection('epilogue_card')}
            isUnlocked={unlockedFragments.includes('frag_head_halo')}
          />
        );
      case 'epilogue_card':
      case 'epilogue_dance':
        return (
          <EpilogueEnding
            trackPoints={trackPoints}
            onRestart={() => {
              setUnlockedFragments([]);
              setActiveSection('prologue_sand');
            }}
          />
        );
      default:
        return (
          <PrologueSand
            onStartGlitch={() => setActiveSection('prologue_glitch')}
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
        className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0d0906]"
      >
        {/* Top Jade Progress Bar & Map Trigger (Visible throughout chapters 1-7) */}
        {!isPrologue && (
          <JadeProgressSilhouette
            unlockedFragments={unlockedFragments}
            onOpenMap={() => setShowMapModal(true)}
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
