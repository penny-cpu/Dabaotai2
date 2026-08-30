import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, ArrowRight, Play, Eye, BookOpen, Layers } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { RightTopActions } from './RightTopActions';
import { HallTransitionPage } from './HallTransitionPage';

interface Stage2BanquetProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

interface JadeCandidate {
  id: string;
  name: string;
  material: string;
  shape: string;
  motif: string;
  isCorrect: boolean;
  desc: string;
}

const JADE_CANDIDATES: JadeCandidate[] = [
  {
    id: 'jade_01_dragon_beast',
    name: '龙凤纹神兽白玉佩',
    material: '白玉质，温润纯净',
    shape: '整体近圆形，镂空回旋',
    motif: '透雕龙凤游丝，内有一只有角有翼的神兽',
    isCorrect: true,
    desc: '大葆台王后墓核心组玉佩，雕工极尽精巧，龙凤与翼兽腾跃回环。',
  },
  {
    id: 'jade_02_plain_huang',
    name: '素面青玉璜',
    material: '青玉质，深绿带斑',
    shape: '弧形半璧状',
    motif: '素面无纹，两端穿孔',
    isCorrect: false,
    desc: '常见礼玉璜，非王后墓主佩饰核心。',
  },
  {
    id: 'jade_03_zhuque_bi',
    name: '朱雀纹青玉璧',
    material: '青白玉质',
    shape: '正圆有孔',
    motif: '单体朱雀展翅刻线',
    isCorrect: false,
    desc: '祭天礼玉，非随身佩戴之组玉佩。',
  },
  {
    id: 'jade_04_cuo_jin_pei',
    name: '错金兽面玉勒',
    material: '黄玉质',
    shape: '圆柱形管状',
    motif: '错金兽面云纹',
    isCorrect: false,
    desc: '串饰管状佩件，非近圆形镂空主佩。',
  },
];

const DIALOGUES_STAGE2_KING: DialogueLine[] = [
  {
    speaker: 'player',
    speakerName: '广阳王刘建',
    text: '欢迎来到广阳。这里商旅往来、田野丰饶，朝堂、市井与钟鼓共同构成一日生活。祭祀、朝会与宴飨，都离不开礼与乐。文舞敬天地，武舞卫疆土。既然来了，就赴一场广阳宴乐吧。',
  },
];

const DIALOGUES_STAGE2_AFTER_VIDEO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我的玉佩！我碰不到它……它来自王后墓，和我非常熟悉。帮我找出它。',
  },
];

const DIALOGUES_STAGE2_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '找到了。原来我不是一个人。我与这些玉器都来自王后墓，也曾属于同一套佩玉记忆。',
  },
];

export const Stage2Banquet: React.FC<Stage2BanquetProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<
    | 'king_welcome'
    | 'banquet_video'
    | 'dialogue_preshow'
    | 'interactive'
    | 'success_dialogue'
    | 'knowledge_flipbook'
    | 'shooting_star'
    | 'transition'
  >('king_welcome');
  const [selectedJadeId, setSelectedJadeId] = useState<string | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);
  const [revealedSlips, setRevealedSlips] = useState<number>(1); // 1: top slip shown, 2: both top and bottom slips shown

  useEffect(() => {
    soundFX.playBronzeChime();
  }, []);

  const handleSelectJade = (id: string) => {
    soundFX.playStoneDrum();
    setSelectedJadeId(id);
  };

  const handleConfirmJade = () => {
    if (!selectedJadeId) return;
    const item = JADE_CANDIDATES.find((j) => j.id === selectedJadeId);
    if (item?.isCorrect) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('success_dialogue');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……这件玉器形制似乎并非王后随身核心组玉佩，请推敲纹样特征。');
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
    }
  };

  const handleAdvanceBambooSlip = () => {
    if (revealedSlips === 1) {
      soundFX.playSandScratch();
      setRevealedSlips(2);
    } else {
      // Finished both slips -> trigger Shooting Star Effect across starry night
      soundFX.playBronzeChime();
      setPhase('shooting_star');
      setTimeout(() => {
        setPhase('transition');
      }, 2200);
    }
  };

  return (
    <div
      className={`relative w-full h-full text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
        isSuccess ? 'bg-[#1c150c]' : 'bg-[#0f0b07]'
      }`}
    >
      {/* Top Bar */}
      <div className="p-2.5 bg-[#1f140c] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-[#a3805d] font-mono">
            CHAPTER 02 · 宴飨 · 组玉佩
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第二章｜宴乐 · 组玉佩
          </h2>
        </div>
      </div>

      {/* STEP 1: PAGE 09 广阳王致意对白 */}
      {phase === 'king_welcome' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-amber-950/80 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.6)] animate-pulse">
              <Sparkles className="w-12 h-12 text-amber-300" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-400">大汉广阳国 · 钟鸣鼎食</span>
              <h3 className="text-base font-black text-[#ffe89c]">文舞敬天 · 广阳盛宴</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE2_KING}
            currentIndex={0}
            onNext={() => {
              soundFX.playStoneDrum();
              setPhase('banquet_video');
            }}
          />
        </div>
      )}

      {/* STEP 2: PAGE 10 宴乐视频 */}
      {phase === 'banquet_video' && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-2">
            <span className="text-[9px] font-mono text-amber-300 tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500">
              DANCE VIDEO · 宴乐与组玉佩
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              观看宴乐 · 裙裾舒展，玉佩相鸣
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center">
            <div className="w-40 h-48 rounded-2xl bg-amber-950/50 border border-amber-500/60 flex flex-col items-center justify-center p-3 text-center space-y-2">
              <Sparkles className="w-10 h-10 text-amber-300 animate-pulse" />
              <span className="text-xs font-black text-amber-200">
                大汉宴飨 · 佩鸣舞起
              </span>
              <p className="text-[10px] text-amber-100/80 leading-relaxed">
                “舞者缓步徐行，身上组玉佩轻击作响，节律铿锵如琴瑟。”
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
          </div>

          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setPhase('dialogue_preshow');
            }}
            className="w-full max-w-xs py-3 bg-amber-600 hover:bg-amber-500 text-black font-black rounded-2xl text-xs shadow-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>完成观看 · 寻觅王后组玉佩</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: PAGE 10 玉舞人发现玉佩对白 */}
      {phase === 'dialogue_preshow' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-amber-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <Layers className="w-10 h-10 text-amber-400" />
            </div>
            <div className="text-center text-[11px] text-[#c2a385]">
              展柜灯光聚焦，四件出土汉代玉器正散发着幽幽古光
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE2_AFTER_VIDEO}
            currentIndex={0}
            onNext={() => {
              setPhase('interactive');
            }}
          />
        </div>
      )}

      {/* STEP 4: PAGE 11 交互：四选一玉佩 (清晰放置于玉舞人对话框上方，绝不遮挡) */}
      {phase === 'interactive' && (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-start space-y-2 p-3 animate-fade-in pb-36 sm:pb-40">
          {/* Top Title Prompt */}
          <div className="text-center py-0.5">
            <span className="text-[10px] font-black text-[#ffe89c] bg-[#24170e] px-3 py-1 rounded-full border border-amber-600/70 shadow-sm">
              从四件汉玉中选出王后墓「镂空龙凤纹神兽白玉佩」
            </span>
          </div>

          {/* 4 Jade Cards 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2 my-auto">
            {JADE_CANDIDATES.map((jade) => {
              const isSelected = selectedJadeId === jade.id;
              return (
                <div
                  key={jade.id}
                  onClick={() => handleSelectJade(jade.id)}
                  className={`p-2 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-1 shadow-md ${
                    isSelected
                      ? 'bg-[#2e1d13] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-102 ring-2 ring-amber-500/40'
                      : 'bg-[#150e09]/90 border-[#3d2b1f] hover:border-amber-600/70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black text-[#ffe89c]">
                      {jade.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="space-y-0.5 text-[8px] text-[#c2a385]">
                    <p>❖ {jade.material}</p>
                    <p>❖ {jade.shape}</p>
                    <p className="line-clamp-1">❖ {jade.motif}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standardized Confirm Button - firmly placed ABOVE UnifiedDialogueBox */}
          <div className="w-full z-10 pt-0.5 mb-1">
            <button
              onClick={handleConfirmJade}
              disabled={!selectedJadeId}
              className={`w-full py-2.5 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 ${
                selectedJadeId
                  ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 text-black border-amber-400 active:scale-98 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#1a120b] text-[#554030] border-[#291b12] cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>确认选择 · 找回王后组玉佩</span>
            </button>
          </div>

          {/* Interactive Mode: Jade Dancer with companion 3-level progressive hints */}
          <UnifiedDialogueBox
            isInteractiveMode={true}
            hints={[
              '王后墓出土的组玉佩核心在于形制高贵，图案兼备龙与凤之祥瑞神兽。',
              '该玉佩质地为温润白玉，器身采用镂空透雕技法雕琢龙凤纠结、神兽回首。',
              '正确选项为「镂空龙凤纹神兽白玉佩」，是王后墓中规格最高的佩玉精粹。',
            ]}
            errorTip={errorTip}
            onClearError={() => setErrorTip('')}
          />
        </div>
      )}

      {/* STEP 5: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-pulse">
              <Sparkles className="w-10 h-10 text-emerald-300" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                新记忆已收录 · 记忆卡 02
              </span>
              <h3 className="text-base font-black text-[#ffe89c] mt-2">
                卡片 02「王后组玉佩」已点亮
              </h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE2_SUCCESS}
            currentIndex={0}
            onNext={() => {
              setPhase('knowledge_flipbook');
            }}
          />
        </div>
      )}

      {/* STEP 6: 汉代竹简／典籍折页名词解释（上下双联折页，依序点开） */}
      {phase === 'knowledge_flipbook' && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 animate-fade-in select-none font-serif">
          {/* Bamboo Slip / Han Folding Scroll Book Container */}
          <div
            className="relative w-full max-w-xs min-h-[420px] bg-gradient-to-b from-[#2a1a10] via-[#1e120a] to-[#120a05] border-2 border-amber-600/80 rounded-3xl p-4 shadow-[0_0_40px_rgba(245,158,11,0.35)] flex flex-col justify-between text-center transition-all duration-500"
            style={{
              backgroundImage: 'radial-gradient(#3d2b1f 1px, transparent 0)',
              backgroundSize: '12px 12px',
            }}
          >
            {/* Top Slip Header */}
            <div className="flex items-center justify-between border-b border-[#5c4033] pb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="font-bold font-serif">汉代竹简典籍 · 礼乐释义</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#17100b] text-amber-300 border border-amber-700">
                已展开 {revealedSlips} / 2
              </span>
            </div>

            {/* Vertical Stack: Two Bamboo Slips (上下两联) */}
            <div className="my-auto py-2 space-y-3 text-left">
              {/* Slip 1: 【名词解释 · 宴乐】 */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#24150b] to-[#140b05] border-2 border-amber-600/70 p-3 shadow-md space-y-1.5 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#4d3221] pb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <h4 className="text-xs font-black text-[#ffe89c]">
                      【名词解释 · 宴乐】
                    </h4>
                  </div>
                  <span className="text-[8px] font-mono text-amber-400/70">卷上 · 礼制</span>
                </div>
                <p className="text-[11px] text-[#f2e6d0] leading-relaxed">
                  宴乐是汉代宫廷与诸侯王贵族宴饮中的综合性礼乐活动。
                </p>
                <p className="text-[9.5px] text-[#c2a385] leading-relaxed">
                  它不仅融汇了钟磬和鸣、长袖乐舞与宾主礼仪，更在欢聚中确立了汉家天下的礼制秩序与等级仪范。
                </p>
              </div>

              {/* Slip 2: 【名词解释 · 组玉佩】 (Revealed on 2nd tap) */}
              {revealedSlips >= 2 ? (
                <div className="relative rounded-2xl bg-gradient-to-br from-[#1d2719] to-[#0f170e] border-2 border-emerald-500/70 p-3 shadow-md space-y-1.5 animate-slide-up">
                  <div className="flex items-center justify-between border-b border-[#2d4734] pb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <h4 className="text-xs font-black text-[#ffe89c]">
                        【名词解释 · 组玉佩】
                      </h4>
                    </div>
                    <span className="text-[8px] font-mono text-emerald-400/70">卷下 · 佩饰</span>
                  </div>
                  <p className="text-[11px] text-[#f2e6d0] leading-relaxed">
                    组玉佩是由珩、璜、璧、佩、舞人等多件珍贵玉器以丝绦串联而成的礼制佩饰。
                  </p>
                  <p className="text-[9.5px] text-[#c2a385] leading-relaxed">
                    汉代王侯行步徐行，玉件互相撞击发出的清脆韵律，既用以节制行止，亦寄托了君子如玉的高尚德行。
                  </p>
                </div>
              ) : (
                /* Unrevealed Placeholder showing folded bamboo roll */
                <div
                  onClick={handleAdvanceBambooSlip}
                  className="rounded-2xl border-2 border-dashed border-[#5c4033] bg-[#140c07]/60 p-3.5 flex items-center justify-center gap-2 text-center cursor-pointer hover:border-amber-500 transition-all active:scale-98 group"
                >
                  <Layers className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-serif text-amber-400/90 group-hover:text-amber-200">
                    点击翻开下一折 · 组玉佩释义
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Advancement Button */}
            <button
              onClick={handleAdvanceBambooSlip}
              className="w-full py-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 text-black font-serif font-black rounded-2xl text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>{revealedSlips === 1 ? '展开下一折 · 组玉佩 ➔' : '合上典籍 · 化作星辰 ➔'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6.5: 流星划过夜空动画特效 (Point 6 Ending) */}
      {phase === 'shooting_star' && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 animate-fade-in overflow-hidden">
          {/* Starry Night Sky with Shooting Stars */}
          <div className="absolute inset-0 bg-radial from-[#121c24] via-black to-black">
            {/* Stars */}
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: `${Math.random() * 2.5 + 1}px`,
                  height: `${Math.random() * 2.5 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animationDuration: `${Math.random() * 3 + 1}s`,
                }}
              />
            ))}

            {/* Grand Golden Shooting Star Streak */}
            <div
              className="absolute w-72 h-[3px] bg-gradient-to-r from-transparent via-amber-300 to-white shadow-[0_0_20px_#ffe89c] transform -rotate-45"
              style={{
                top: '20%',
                left: '-10%',
                animation: 'shooting-star 1.8s ease-out forwards',
              }}
            />
          </div>

          <div className="relative z-10 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-950/70 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.8)] animate-pulse">
              <Sparkles className="w-8 h-8 text-amber-300" />
            </div>
            <h3 className="text-base font-black text-[#ffe89c] tracking-widest font-serif">
              星汉灿烂 · 灵玉归位
            </h3>
            <p className="text-xs text-[#c2a385] font-serif">
              古籍合拢，流星划破长空，引领你步入更深处的文物展柜……
            </p>
          </div>
        </div>
      )}

      {/* STEP 7: 前往重点文物展柜过场 */}
      {phase === 'transition' && (
        <HallTransitionPage
          targetHallName="下一站：重点文物展柜"
          subtitle="玉器自述与纵深记忆空间探索"
          themeColor="jade"
          onContinue={() => {
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
