import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, AlertTriangle, Play, Shield } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { DialogueSystem } from './DialogueSystem';
import { ASSETS } from '../data/museumData';
import { SemiCircleWheel, WheelWeaponItem } from './SemiCircleWheel';

interface Stage1WeaponProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const WEAPONS_DATA: WheelWeaponItem[] = [
  { id: 'w_tie_jian', name: '铁剑', isCorrect: true, desc: '大葆台汉墓佩剑，剑身修长凌厉，汉军将士与武舞必备仪仗。' },
  { id: 'w_ba_leng_yue', name: '错金银八棱钺', isCorrect: true, desc: '大葆台王室重器，端头嵌错金银纹饰，象征西汉诸侯王武舞礼制。' },
  { id: 'w_huan_shou_ren', name: '环首铁刃', isCorrect: false, desc: '西汉普通铁兵残片，非大仪仗武舞核心礼器。' },
  { id: 'w_qing_tong_mao', name: '青铜长矛', isCorrect: false, desc: '先秦至秦汉长刺兵，非大葆台王陵特有武仪标志。' },
  { id: 'w_tie_qiao', name: '铁锹', isCorrect: false, desc: '近现代掘土工具，非汉代冷兵器。' },
  { id: 'w_jian_tou', name: '剑头', isCorrect: false, desc: '断损残锋，形制不全。' },
  { id: 'w_da_kan_dao', name: '大砍刀', isCorrect: false, desc: '民间近世阔刃大砍刀，时代与汉代形制不符。' },
  { id: 'w_bi_shou', name: '匕首', isCorrect: false, desc: '近身短刺暗器，非武舞大仪之仗。' },
];

const DIALOGUES_START: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '【嚼嚼嚼……滋滋滋……这里的兵器记忆正在被我们吃掉……】',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我记得战鼓声，却想不起舞者手中握着什么。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '怪谈把不属于这里的兵器混了进来。在轮盘上滑动，选出两件真正的汉代武舞兵器。',
  },
];

const DIALOGUES_RESTORED: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '蚀墓虫',
    text: '吱吱吱，这里净化了，快退至墓穴深处……！',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '铁剑与错金银八棱钺归位了！第一块右袖碎片已重聚，武舞记忆苏醒！',
  },
];

export const Stage1Weapon: React.FC<Stage1WeaponProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDialogue, setShowDialogue] = useState<boolean>(true);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [activeDialogues, setActiveDialogues] = useState<DialogueLine[]>(DIALOGUES_START);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const [showMemoryVideo, setShowMemoryVideo] = useState<boolean>(false);

  useEffect(() => {
    soundFX.playCrawlerScurry();
  }, []);

  const handleToggleSelect = (item: WheelWeaponItem) => {
    if (selectedIds.includes(item.id)) {
      setSelectedIds(selectedIds.filter((id) => id !== item.id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, item.id]);
      } else {
        setSelectedIds([selectedIds[1], item.id]);
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
      setActiveDialogues(DIALOGUES_RESTORED);
      setDialogueIdx(0);
      setShowDialogue(true);
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
    <div className={`relative w-full h-full text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
      isSuccess ? 'bg-[#1a120b]' : 'bg-[#0f0a07]'
    }`}>
      {/* Glitch Overlay */}
      <GlitchCorruptionOverlay
        isVisible={showCorruption}
        message="器物形制不符 · 选入了非大葆台汉代武舞仪仗兵器"
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
      <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-2.5">
        {/* Upper Weapon Slots Area */}
        <div className={`relative w-full h-40 rounded-2xl border-2 transition-all duration-700 overflow-hidden flex flex-col items-center justify-center p-3 shadow-xl ${
          isSuccess
            ? 'bg-[#291a10] border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
            : 'bg-[#150e09] border-[#3d2b1f]'
        }`}>
          {/* 2 Central Selected Slots */}
          <div className="flex items-center justify-center gap-3 z-10">
            {[0, 1].map((idx) => {
              const weaponId = selectedIds[idx];
              const weapon = WEAPONS_DATA.find((w) => w.id === weaponId);
              return (
                <div
                  key={idx}
                  onClick={() => weapon && handleToggleSelect(weapon)}
                  className={`w-32 h-28 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${
                    weapon
                      ? 'bg-[#24170d] border-[#ffe89c] shadow-[0_0_12px_rgba(255,232,156,0.3)]'
                      : 'bg-[#0f0a07]/80 border-dashed border-[#5c4033]'
                  }`}
                >
                  {weapon ? (
                    <>
                      <div className="text-xs font-black text-[#ffe89c] leading-tight">
                        {weapon.name}
                      </div>
                      <span className="text-[8px] text-emerald-400 font-mono mt-1">
                        已放入槽位 {idx + 1}
                      </span>
                      <span className="text-[8px] text-[#c2a385] mt-1 line-clamp-2 leading-tight">
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

          <div className="mt-2 text-center text-[9px] text-[#a3805d]">
            在下方半圆弧线边框上滑旋，找出两件真正的大葆台武舞兵器
          </div>
        </div>

        {/* Bottom Semi-Circular Wheel Selector (手指接触半圆弧线边框直接顺逆时针旋转) */}
        <div className="w-full">
          <SemiCircleWheel
            items={WEAPONS_DATA}
            selectedIds={selectedIds}
            maxSelect={2}
            onToggleSelect={handleToggleSelect}
          />
        </div>

        {/* Bottom Action Button */}
        <div className="w-full space-y-1 z-10">
          {!isSuccess ? (
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
          ) : (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setShowMemoryVideo(true);
              }}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-serif font-black rounded-2xl border-2 border-emerald-400 text-xs shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>右袖碎片已归位 · 查看武舞记忆视频</span>
            </button>
          )}
        </div>
      </div>

      {/* Memory Video Modal */}
      {showMemoryVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-3">
            <span className="text-[9px] font-mono text-emerald-300 tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
              MEMORY RESTORED · 第一块碎片归位
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              武舞记忆 · 朱干玉戚，以舞大武
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[3/4] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center">
            <img
              src={ASSETS.wuDance}
              alt="汉代武舞"
              className="w-full h-full object-cover filter brightness-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 inset-x-4 text-center">
              <p className="text-[11px] text-[#e8f8ec] leading-relaxed">
                “兵器归位，战鼓声起！玉舞人持错金银八棱钺与铁剑起舞，破败兵器厅恢复往日光华。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowMemoryVideo(false);
              onNextPage();
            }}
            className="w-full max-w-xs py-3 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-black rounded-2xl border-2 border-[#d2b48c] text-xs shadow-2xl flex items-center justify-center gap-1"
          >
            <span>进入第二关 · 宴乐</span>
          </button>
        </div>
      )}

      {/* Story Dialogue System */}
      {showDialogue && (
        <DialogueSystem
          dialogues={activeDialogues}
          currentIndex={dialogueIdx}
          onNext={() => {
            if (dialogueIdx < activeDialogues.length - 1) {
              setDialogueIdx(dialogueIdx + 1);
            } else {
              setShowDialogue(false);
            }
          }}
          restorationLevel={isSuccess ? 1 : 0}
        />
      )}
    </div>
  );
};
