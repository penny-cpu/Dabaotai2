import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, Play, ArrowRight, Eye, Disc } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { RightTopActions } from './RightTopActions';
import { HallTransitionPage } from './HallTransitionPage';

interface Stage5FuneraryProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

interface RelicMirrorCandidate {
  id: string;
  name: string;
  material: string;
  motif: string;
  isCorrect: boolean;
  desc: string;
}

const MIRROR_CANDIDATES: RelicMirrorCandidate[] = [
  {
    id: 'm_xing_yun_mirror',
    name: '星云纹铜镜',
    material: '青铜铸造 · 镜面光洁照人',
    motif: '镜背通体铸造翻卷回旋之云气纹与星乳',
    isCorrect: true,
    desc: '大葆台汉墓典型随葬铜镜，云气翻卷通向天界，寄托升仙祈愿。',
  },
  {
    id: 'm_gui_feng_bi',
    name: '透雕规矩玉璧',
    material: '白玉质地',
    motif: '博局纹与方折龙凤纹',
    isCorrect: false,
    desc: '礼玉重器，非铜铸照人铜镜。',
  },
  {
    id: 'm_cai_hui_pot',
    name: '彩绘云气陶壶',
    material: '泥质灰陶 · 朱墨彩绘',
    motif: '壶腹彩绘灵动飞禽与云纹',
    isCorrect: false,
    desc: '陶制随葬容器，非铜铸镜器。',
  },
  {
    id: 'm_ming_wen_mirror',
    name: '日光连弧铭文铜镜',
    material: '青铜铸造',
    motif: '铸有“见日之光，天下大明”汉隶铭文',
    isCorrect: false,
    desc: '铭文铜镜，非纯粹翻卷回旋之云气纹。',
  },
];

const DIALOGUES_STAGE5_INTRO: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '汉代重视丧葬礼仪，诸侯王送葬同样离不开礼乐。送葬队伍启行，舞者以长袖相送。生前的礼乐，也被延续到身后。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这应该是广阳王的送葬队伍。',
  },
];

const DIALOGUES_STAGE5_AFTER_VIDEO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这个动作……我见过。她们的长袖在空中画出一道不断回旋的纹样。那不是普通袖痕。它一定刻在某件随葬文物上。',
  },
];

const DIALOGUES_STAGE5_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '对，是星云纹铜镜。舞者用身体画云，工匠把云刻进铜镜。送葬的长袖与镜背的云气，都指向通往天界的想象。',
  },
];

export const Stage5Funerary: React.FC<Stage5FuneraryProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<'intro_dialogue' | 'video_preshow' | 'dialogue_preshow' | 'interactive' | 'success_dialogue' | 'transition'>('intro_dialogue');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [selectedMirrorId, setSelectedMirrorId] = useState<string | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleSelectMirror = (id: string) => {
    soundFX.playStoneDrum();
    setSelectedMirrorId(id);
  };

  const handleConfirmMirror = () => {
    if (!selectedMirrorId) return;
    const item = MIRROR_CANDIDATES.find((m) => m.id === selectedMirrorId);
    if (item?.isCorrect) {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('success_dialogue');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……送葬长袖翻卷如腾云，应寻找镜背铸有翻卷云气与星乳的青铜镜器。');
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
    }
  };

  return (
    <div
      className={`relative w-full h-full text-[#ffdcb3] flex flex-col justify-between overflow-hidden font-serif select-none transition-colors duration-700 ${
        isSuccess ? 'bg-[#1f160e]' : 'bg-[#120a06]'
      }`}
      style={{
        backgroundImage: 'radial-gradient(#26150b 1px, transparent 0)',
        backgroundSize: '16px 16px',
      }}
    >
      {/* Top Bar */}
      <div className="p-2.5 bg-[#24170d] border-b border-[#4d3322] flex items-center justify-between z-10 shadow-md">
        <div>
          <span className="text-[8px] tracking-[0.25em] uppercase text-amber-400 font-mono">
            CHAPTER 05 · 送葬 · 星云镜
          </span>
          <h2 className="text-xs sm:text-sm font-black text-[#ffe89c] tracking-widest title-drop-shadow">
            第五章｜送葬 · 星云纹镜
          </h2>
        </div>
      </div>

      {/* STEP 1: PAGE 17 仪式对白 */}
      {phase === 'intro_dialogue' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-amber-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse">
              <Disc className="w-10 h-10 text-amber-400" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-300">大汉丧葬礼制 · 诸侯王送葬</span>
              <h3 className="text-base font-black text-[#ffe89c]">长袖相送 · 生死相承</h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE5_INTRO}
            currentIndex={dialogueIdx}
            onNext={() => {
              if (dialogueIdx < DIALOGUES_STAGE5_INTRO.length - 1) {
                setDialogueIdx(dialogueIdx + 1);
              } else {
                soundFX.playStoneDrum();
                setPhase('video_preshow');
              }
            }}
          />
        </div>
      )}

      {/* STEP 2: PAGE 18 送葬视频 */}
      {phase === 'video_preshow' && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 animate-fade-in font-serif select-none">
          <div className="text-center mt-2">
            <span className="text-[9px] font-mono text-amber-300 tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500">
              DANCE VIDEO · 送葬长袖舞
            </span>
            <h3 className="text-base font-black text-[#ffe89c] mt-2">
              观看送葬长袖舞 · 长袖在空中画出回旋云纹
            </h3>
          </div>

          <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-[#1c130d] flex items-center justify-center">
            <div className="w-40 h-48 rounded-2xl bg-amber-950/50 border border-amber-500/60 flex flex-col items-center justify-center p-3 text-center space-y-2">
              <Disc className="w-10 h-10 text-amber-300 animate-spin" />
              <span className="text-xs font-black text-amber-200">
                送葬礼乐 · 挥袖成云
              </span>
              <p className="text-[10px] text-amber-100/80 leading-relaxed">
                “舞者回旋挥袖，袖痕如翻卷云气，引导魂灵升入浩瀚星汉。”
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
            <span>完成观看 · 寻觅对应云纹文物</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: PAGE 18 玉舞人发现纹样对白 */}
      {phase === 'dialogue_preshow' && (
        <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in">
          <div className="relative my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-amber-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <Eye className="w-10 h-10 text-amber-300" />
            </div>
            <div className="text-center text-[11px] text-[#c2a385]">
              长乐展厅灯光照亮四件随葬珍宝，寻找与舞袖云纹相映之物
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE5_AFTER_VIDEO}
            currentIndex={0}
            onNext={() => {
              setPhase('interactive');
            }}
          />
        </div>
      )}

      {/* STEP 4: PAGE 19 交互：四选一文物（星云纹铜镜） */}
      {phase === 'interactive' && (
        <div className="flex-1 relative overflow-hidden flex flex-col justify-start space-y-2.5 p-3 animate-fade-in pb-36">
          {/* Top Title Prompt */}
          <div className="text-center py-1">
            <span className="text-[10.5px] font-black text-[#ffe89c] bg-[#26170e] px-3.5 py-1 rounded-full border border-amber-600/70 shadow">
              从四件随葬文物中，选出对应送葬舞袖回旋云气的「星云纹铜镜」
            </span>
          </div>

          {/* 4 Relics 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2.5 my-auto">
            {MIRROR_CANDIDATES.map((item) => {
              const isSelected = selectedMirrorId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectMirror(item.id)}
                  className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-1 shadow-md ${
                    isSelected
                      ? 'bg-[#332014] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-102 ring-2 ring-amber-500/40'
                      : 'bg-[#170e09]/90 border-[#3d2b1f] hover:border-amber-700/70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black text-[#ffe89c]">
                      {item.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="space-y-0.5 text-[8.5px] text-[#c2a385]">
                    <p>❖ {item.material}</p>
                    <p className="line-clamp-2">❖ {item.motif}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standardized Confirm Button */}
          <div className="w-full z-10 pt-1">
            <button
              onClick={handleConfirmMirror}
              disabled={!selectedMirrorId}
              className={`w-full py-3 rounded-2xl font-serif font-black text-xs border-2 shadow-2xl transition-all flex items-center justify-center gap-1.5 ${
                selectedMirrorId
                  ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 hover:brightness-110 text-black border-amber-400 active:scale-98 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#170f0a] text-[#554030] border-[#291b12] cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>确认选择 · 点亮星云铜镜记忆</span>
            </button>
          </div>

          {/* Interactive Mode: Jade dancer with 3-level progressive hints */}
          <UnifiedDialogueBox
            isInteractiveMode={true}
            hints={[
              '汉代铜镜常寄托长乐未央与通天登仙之愿，请辨认带有宇宙星宿流转寓意的随葬明器。',
              '此镜背面纽座外环绕波折纹与连珠星云，纹饰如夜空流云星宿，映照阴阳神灵。',
              '正确选项为「星云纹铜镜」——其镜背星云流转，正契合汉代‘观象察变、天人合一’的礼仪。',
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
                新记忆已收录 · 记忆卡 05
              </span>
              <h3 className="text-base font-black text-[#ffe89c] mt-2">
                卡片 05「送葬长袖」已点亮
              </h3>
            </div>
          </div>

          <UnifiedDialogueBox
            dialogues={DIALOGUES_STAGE5_SUCCESS}
            currentIndex={0}
            onNext={() => {
              setPhase('transition');
            }}
          />
        </div>
      )}

      {/* STEP 6: 过场 PAGE｜前往地宫核心 · 黄肠题凑 */}
      {phase === 'transition' && (
        <HallTransitionPage
          targetHallName="前往：一号墓黄肠题凑现场"
          subtitle="步入地宫深处，万根柏木筑起的地下宫殿正静候开启……"
          themeColor="gold"
          onContinue={() => {
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
