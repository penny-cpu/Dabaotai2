import React, { useState } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, RotateCcw, AlertTriangle, Play } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';

interface Stage1WeaponProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const WEAPONS_DATA = [
  { id: 'w_ba_leng_zhuo', name: '错金银八棱铜棁', isCorrect: true, desc: '大葆台汉墓出土仪仗兵器，八棱端头镶嵌金银丝，武舞必备。' },
  { id: 'w_han_sword', name: '汉代铁剑', isCorrect: true, desc: '大葆台汉墓佩剑，剑身修长凌厉，汉代士人与武舞重器。' },
  { id: 'w_tang_dao', name: '唐代横刀', isCorrect: false, desc: '隋唐时期直刃单手刀，非汉代形制。' },
  { id: 'w_qing_spear', name: '清代红缨枪', isCorrect: false, desc: '明清民间与行军长枪，非汉代器物。' },
  { id: 'w_song_axe', name: '宋代开山大斧', isCorrect: false, desc: '宋代重步兵长柄斧，时代不符。' },
  { id: 'w_shang_ge', name: '商代青铜戈', isCorrect: false, desc: '商周时期直内戈，非西汉时期形制。' },
  { id: 'w_ming_blunderbuss', name: '明代三眼铳', isCorrect: false, desc: '明代火器，非汉代冷兵器。' },
  { id: 'w_bronze_dagger', name: '春秋青铜短剑', isCorrect: false, desc: '春秋战国双翼短剑，非西汉广阳王兵器。' },
];

const DIALOGUES_1: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我记得战鼓，却想不起舞者握着什么。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '怪谈把不属于这里的兵器混了进来。看展柜，不要猜。',
  },
];

export const Stage1Weapon: React.FC<Stage1WeaponProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);

  const handleSelectWeapon = (id: string) => {
    soundFX.playStoneDrum();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[1], id]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedIds.length !== 2) return;

    const allCorrect = selectedIds.every(
      (id) => WEAPONS_DATA.find((w) => w.id === id)?.isCorrect
    );

    if (allCorrect) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setIsSuccess(true);
      onUnlockFragment();
      setShowMemoryVideo(true);
    } else {
      soundFX.playGlitchStatic();
      soundFX.playInsectEating();
      setShowCorruption(true);
      setTimeout(() => {
        setShowCorruption(false);
      }, 1400);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#120c08] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none">
      {/* Glitch Overlay */}
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="玉舞人：“这件不在我的记忆里。再看一眼展柜。”"
      />

      {/* Top Bar */}
      <div className="p-2.5 bg-[#1e140d] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 1 · WU WEAPON MEMORY
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第一关 · 戈影 (武舞之器)
          </h2>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-mono bg-[#2a1a0f] px-2 py-0.5 rounded-full border border-amber-800 text-amber-300">
          <span>已选 {selectedIds.length}/2</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-3">
        {/* Broken Weapon Hall Shadows Container */}
        <div className="relative w-full h-44 rounded-2xl bg-[#1c130d] border-2 border-[#3d2b1f] overflow-hidden flex flex-col items-center justify-center shadow-xl p-3">
          {/* Faint Martial Dance Shadows */}
          <div className="absolute inset-0 bg-radial-gradient from-amber-600/10 via-transparent to-transparent pointer-events-none" />

          {/* 2 Central Selected Slots */}
          <div className="flex items-center justify-center gap-4 z-10">
            {[0, 1].map((idx) => {
              const weaponId = selectedIds[idx];
              const weapon = WEAPONS_DATA.find((w) => w.id === weaponId);
              return (
                <div
                  key={idx}
                  onClick={() => weaponId && handleSelectWeapon(weaponId)}
                  className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all ${
                    weapon
                      ? 'bg-[#291a10] border-[#ffe89c] shadow-[0_0_12px_rgba(255,232,156,0.3)]'
                      : 'bg-[#140e0a]/80 border-dashed border-[#5c4033]'
                  }`}
                >
                  {weapon ? (
                    <>
                      <div className="text-[11px] font-black text-[#ffe89c] leading-tight">
                        {weapon.name}
                      </div>
                      <span className="text-[8px] text-[#88b598] font-mono mt-1">
                        已放入槽位 {idx + 1}
                      </span>
                      <span className="text-[7px] text-[#a3805d] mt-0.5 line-clamp-2">
                        {weapon.desc}
                      </span>
                    </>
                  ) : (
                    <span className="text-[10px] text-[#6b4c35] font-serif">
                      选择槽位 {idx + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prompt banner */}
          <div className="mt-2 text-center text-[9px] text-[#a3805d]">
            拨动下方半圆转盘，选出两件属于大葆台汉代武舞的真正兵器
          </div>
        </div>

        {/* Semicircle Wheel Weapon Selector (底部半圆转盘) */}
        <div className="relative w-full h-44 overflow-hidden flex flex-col items-center justify-end select-none">
          {/* Wheel Control Buttons */}
          <div className="flex items-center justify-between w-full px-4 mb-1 z-20">
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setRotationAngle((prev) => prev - 45);
              }}
              className="px-2 py-0.5 rounded-full bg-[#241a13] border border-[#5c4033] text-[9px] text-[#ffe89c]"
            >
              ◀ 逆时针拨动
            </button>
            <span className="text-[8px] font-mono text-[#a3805d]">
              左右拨动浏览 8 件兵器
            </span>
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setRotationAngle((prev) => prev + 45);
              }}
              className="px-2 py-0.5 rounded-full bg-[#241a13] border border-[#5c4033] text-[9px] text-[#ffe89c]"
            >
              顺时针拨动 ▶
            </button>
          </div>

          {/* Semicircle Arc Container */}
          <div className="relative w-72 h-72 rounded-full border-4 border-[#3d2b1f] bg-[#140e0a] -mb-36 flex items-center justify-center shadow-inner transition-transform duration-500"
               style={{ transform: `rotate(${rotationAngle}deg)` }}>
            {WEAPONS_DATA.map((weapon, idx) => {
              const angle = (idx * 360) / WEAPONS_DATA.length;
              const isSelected = selectedIds.includes(weapon.id);

              return (
                <div
                  key={weapon.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectWeapon(weapon.id);
                  }}
                  className="absolute cursor-pointer flex flex-col items-center justify-center transition-all"
                  style={{
                    transform: `rotate(${angle}deg) translate(0, -105px) rotate(${-angle - rotationAngle}deg)`,
                  }}
                >
                  <div
                    className={`px-2 py-1 rounded-xl border-2 text-[9px] font-serif font-black shadow-lg transition-all ${
                      isSelected
                        ? 'bg-amber-600 border-[#ffe89c] text-white scale-110 shadow-[0_0_10px_#ffe89c]'
                        : 'bg-[#241a13] border-[#5c4033] text-[#d2b48c] hover:border-amber-500'
                    }`}
                  >
                    {weapon.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full space-y-1.5 z-10">
          <button
            onClick={handleConfirm}
            disabled={selectedIds.length !== 2}
            className={`w-full py-2.5 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 ${
              selectedIds.length === 2
                ? 'bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] border-[#d2b48c] active:scale-98'
                : 'bg-[#1a120b] text-[#554030] border-[#291b12] cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#ffe89c]" />
            <span>确认兵器组合 · 唤醒武舞记忆</span>
          </button>
        </div>
      </div>

      {/* Memory Video Modal (记忆回放) */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in">
          <div className="text-center mt-4">
            <span className="text-[9px] font-mono text-[#88b598] tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY RESTORED · 第一块碎片归位
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2 font-serif">
              武舞记忆 · 朱干玉戚，以舞大武
            </h3>
          </div>

          {/* Animated Dance Visual Centerpiece */}
          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center">
            <img
              src={ASSETS.wuDance}
              alt="汉代武舞"
              className="w-full h-full object-cover filter brightness-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 inset-x-4 text-center">
              <p className="text-[11px] text-[#e8f8ec] font-serif leading-relaxed">
                “兵器归位，战鼓声起！玉舞人与伙伴持错金银八棱铜棁与铁剑起舞，破败兵器厅恢复往日光华。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
              onNextPage();
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-serif font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>进入第二关 · 宴乐</span>
          </button>
        </div>
      )}

      {/* Story Dialogue */}
      {showDialogue && (
        <DialogueSystem
          dialogues={DIALOGUES_1}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < DIALOGUES_1.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={1}
        />
      )}
    </div>
  );
};
