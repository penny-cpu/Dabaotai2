import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, Play, Shield, ArrowRight, Video } from 'lucide-react';
import { GlitchCorruptionOverlay } from './GlitchCorruptionOverlay';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { RightTopActions } from './RightTopActions';
import { SemiCircleWheel, WheelWeaponItem } from './SemiCircleWheel';
import { HallTransitionPage } from './HallTransitionPage';
import { ASSETS } from '../data/museumData';

interface Stage1WeaponProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const WEAPONS_DATA: WheelWeaponItem[] = [
  { id: 'w_ba_leng_zhuo', name: '错金银八棱棁', isCorrect: true, desc: '铜铸八棱，饰错金银，无尖无刃，可藏于袖中作为王侯护身之物。' },
  { id: 'w_tie_ji', name: '铁戟', isCorrect: true, desc: '铁铸横刃长柄，出土于一号墓前室，汉代军队阵前格斗利器。' },
  { id: 'w_qing_tong_mao', name: '青铜长矛', isCorrect: false, desc: '先秦至秦汉长刺兵，非大葆台王陵特有武舞仪仗。' },
  { id: 'w_huan_shou_dao', name: '环首铁刀', isCorrect: false, desc: '西汉骑兵佩刀，非武舞大仪核心礼器。' },
  { id: 'w_tie_qiao', name: '铁锹', isCorrect: false, desc: '近现代掘土工具，非汉代冷兵器。' },
  { id: 'w_da_kan_dao', name: '大砍刀', isCorrect: false, desc: '民间近世阔刃大砍刀，时代与汉代形制不符。' },
  { id: 'w_bi_shou', name: '青铜匕首', isCorrect: false, desc: '近身短刺暗器，非武舞大仪之仗。' },
];

const DIALOGUES_STAGE1_INTRO: DialogueLine[] = [
  {
    speaker: 'player',
    speakerName: '广阳王刘建',
    text: '我是广阳王刘建。战鼓已鸣，今日与将士同赴疆场。此行不是为一己荣辱，只为守护大汉山河与百姓安宁。将士们——擂鼓，出征！',
  },
];

const DIALOGUES_STAGE1_VIDEO_AFTER: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '不对……这支武舞不对。武舞本该有干、戚，舞出军威与礼制。可他们手中什么都没有。那些武器一定就在附近。',
  },
  {
    speaker: 'pushou',
    speakerName: '鎏金铜铺首',
    text: '来者何人，扰我清净？原来是小玉舞人。你是在找那两件与武舞有关的兵器吗？',
  },
];

const DIALOGUES_STAGE1_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '对，就是它们。棁是袖中护身之物，戟是阵前兵器。原来武舞的力量并没有消失，它只是被收进了墓室。',
  },
];

export const Stage1Weapon: React.FC<Stage1WeaponProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [stagePhase, setStagePhase] = useState<'king_intro' | 'watch_video' | 'dialogue_preshow' | 'interactive' | 'success_dialogue' | 'transition'>('king_intro');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [showCorruption, setShowCorruption] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playStoneDrum();
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

  const [errorTip, setErrorTip] = useState<string>('');

  const handleConfirm = () => {
    if (selectedIds.length !== 2) return;

    const allCorrect = selectedIds.every(
      (id) => WEAPONS_DATA.find((w) => w.id === id)?.isCorrect
    );

    if (allCorrect) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setStagePhase('success_dialogue');
      setDialogueIdx(0);
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……这两件似乎并非大葆台汉代武舞的核心仪仗，再仔细推敲一番。');
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
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

      {/* Top Title Bar */}
      <div className="p-2.5 bg-[#1e140d] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 01 · 战场 · 武舞之器
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第一章｜战场 · 武舞之器
          </h2>
        </div>
      </div>

      {/* STEP 1: PAGE 05 广阳王出征誓师 */}
      {stagePhase === 'king_intro' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          {/* King Silhouette & War Drums background */}
          <div className="relative my-auto flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-amber-950/80 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.6)] animate-pulse">
              <Shield className="w-12 h-12 text-amber-300" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-400">大汉广阳国 · 誓师出征</span>
              <h3 className="text-base font-black text-[#ffe89c]">战鼓雷动 · 武舞军威</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE1_INTRO}
            currentIndex={0}
            onNext={() => {
              soundFX.playStoneDrum();
              setStagePhase('watch_video');
            }}
          />
        </div>
      )}

      {/* STEP 2: PAGE 06 舞蹈视频：武舞 */}
      {stagePhase === 'watch_video' && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-2">
            <span className="text-[9px] font-mono text-amber-300 tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500">
              DANCE VIDEO · 武舞
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              观看武舞 · 动作刚劲，空手而舞
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center">
            <img
              src={ASSETS.wuDance}
              alt="汉代武舞"
              className="w-full h-full object-cover filter brightness-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 inset-x-4 text-center space-y-2">
              <p className="text-[11px] text-[#e8f8ec] leading-relaxed">
                “舞者步法沉雄刚健，然而双手空空，缺少了汉代武舞必备的干戚兵器仪仗。”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setStagePhase('dialogue_preshow');
              setDialogueIdx(0);
            }}
            className="w-full max-w-xs py-3 bg-amber-600 hover:bg-amber-500 text-black font-black rounded-2xl text-xs shadow-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>完成观看 · 解锁兵器线索</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: PAGE 06 & 07 玉舞人发现异常 + 鎏金铜铺首出现 */}
      {stagePhase === 'dialogue_preshow' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-[#2e1d13] border-2 border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <Shield className="w-10 h-10 text-amber-400" />
            </div>
            <div className="text-center text-[11px] text-[#c2a385]">
              墓门铜环碰撞作响，鎏金铜铺首正凝视着你
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE1_VIDEO_AFTER}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < DIALOGUES_STAGE1_VIDEO_AFTER.length - 1) {
                setDialogueIdx((prev) => prev + 1);
              } else {
                setStagePhase('interactive');
              }
            }}
          />
        </div>
      )}

      {/* STEP 4: PAGE 08 交互：找回武舞之器 (均匀排布，槽位加长，确认键下移至对话框顶边) */}
      {stagePhase === 'interactive' && (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-3 animate-fade-in pb-36 sm:pb-40">
          {/* Top Instruction Banner */}
          <div className="text-center py-0.5 shrink-0">
            <span className="text-[10px] font-serif text-[#ffe89c] font-bold bg-[#24150b] px-3.5 py-1 rounded-full border border-amber-600/70 shadow inline-flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-amber-400" />
              <span>请在下方轮盘中挑选两件大葆台汉代武舞之器</span>
            </span>
          </div>

          {/* Upper Elongated Selected Slots (加长加宽，布局舒展) */}
          <div className="relative w-full rounded-2xl border-2 bg-[#150e09] border-[#3d2b1f] flex flex-col items-center justify-center p-2.5 shadow-xl shrink-0 my-1">
            <div className="flex items-center justify-between w-full px-1 mb-1 text-[8.5px] font-mono text-[#a3805d]">
              <span>已选配兵器仪仗</span>
              <span className="text-amber-400">（{selectedIds.length}/2 已就位）</span>
            </div>
            <div className="flex items-center justify-center gap-3 z-10 w-full">
              {[0, 1].map((idx) => {
                const weaponId = selectedIds[idx];
                const weapon = WEAPONS_DATA.find((w) => w.id === weaponId);
                return (
                  <div
                    key={idx}
                    onClick={() => weapon && handleToggleSelect(weapon)}
                    className={`flex-1 h-23 sm:h-25 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer shadow-md ${
                      weapon
                        ? 'bg-gradient-to-b from-[#2e1d12] to-[#1a100a] border-[#ffe89c] shadow-[0_0_15px_rgba(255,232,156,0.3)] ring-1 ring-amber-400/40'
                        : 'bg-[#0f0a07]/80 border-dashed border-[#5c4033] hover:border-amber-700/60'
                    }`}
                  >
                    {weapon ? (
                      <>
                        <div className="w-full flex items-center justify-between px-1">
                          <span className="text-[7.5px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-600/60">
                            槽位 {idx + 1}
                          </span>
                          <span className="text-[7.5px] font-mono text-amber-400/80">点击卸下</span>
                        </div>
                        <div className="text-xs sm:text-sm font-black text-[#ffe89c] leading-tight mt-1">
                          {weapon.name}
                        </div>
                        <span className="text-[8px] text-[#d6be9a] mt-1 line-clamp-2 leading-relaxed px-1">
                          {weapon.desc}
                        </span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-1 text-[#6b4c35]">
                        <div className="w-6 h-6 rounded-full border border-dashed border-[#6b4c35] flex items-center justify-center text-[10px]">
                          +
                        </div>
                        <span className="text-[9.5px] font-serif">
                          待选配兵器 {idx + 1}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Semi-Circular Wheel Selector (居中适度排布) */}
          <div className="w-full my-auto shrink-0">
            <SemiCircleWheel
              items={WEAPONS_DATA}
              selectedIds={selectedIds}
              maxSelect={2}
              onToggleSelect={handleToggleSelect}
            />
          </div>

          {/* Confirm Button immediately above dialogue box top edge */}
          <div className="w-full z-10 pt-1 mb-1 shrink-0">
            <button
              onClick={handleConfirm}
              disabled={selectedIds.length !== 2}
              className={`w-full py-2.5 sm:py-3 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 ${
                selectedIds.length === 2
                  ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 text-black border-amber-400 active:scale-98 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#1a120b] text-[#554030] border-[#291b12] cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>确认兵器组合 · 唤醒武舞记忆</span>
            </button>
          </div>

          {/* Interactive Mode: Jade Dancer with 3-level progressive hints */}
          <UnifiedDialogueBox
            isInteractiveMode={true}
            hints={[
              '仔细观察武舞的礼制特征与汉代兵器形制，大葆台王侯出征时重视仪仗之美与护身实战。',
              '此二物一为短柄错金银八棱手持兵器，一为长柄横刃破阵斩敌之重器。',
              '正确组合为「错金银八棱棁」与「铁戟」，两者兼备方显大汉武舞之雄威。',
            ]}
            errorTip={errorTip}
            onClearError={() => setErrorTip('')}
          />
        </div>
      )}

      {/* STEP 5: 成功反馈对白 */}
      {stagePhase === 'success_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-pulse">
              <Sparkles className="w-10 h-10 text-emerald-300" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                新记忆已收录 · 记忆卡 01
              </span>
              <h3 className="text-base font-black text-[#ffe89c] mt-2">
                卡片 01「武舞之器」已点亮
              </h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE1_SUCCESS}
            currentIndex={0}
            onNext={() => {
              setStagePhase('transition');
            }}
          />
        </div>
      )}

      {/* STEP 6: 过场 PAGE｜前往长乐未央展厅 */}
      {stagePhase === 'transition' && (
        <HallTransitionPage
          targetHallName="前方：长乐未央展厅"
          subtitle="刚才的战场消失了……前面传来了钟鼓和乐声。"
          themeColor="gold"
          onContinue={() => {
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
