import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, ArrowRight, Delete } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar, HanCloudTitle } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { STAGE_VIDEOS } from '../data/videoAssets';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import { MuseumAccessionRecord } from './MuseumAccessionRecord';
import { CHAPTER_BACKGROUNDS, CHAPTER_PAGE_BACKGROUNDS } from '../config/assetRegistry';
import { BambooSlipCollector } from './BambooSlipCollector';
import { ChapterVideoPageView } from './ChapterVideoPageView';
import { useSmoothPhaseTransition } from '../utils/useSmoothPhaseTransition';

// =========================================================================
// 🚨【第六章各页面背景底图路径配置中心 (方便一键查找与替换)】🚨
// =========================================================================
const STAGE6_BACKGROUNDS = CHAPTER_PAGE_BACKGROUNDS.stage6;

interface Stage6HuangchangProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const ANCIENT_NUM_MAP: Record<string, string> = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '亖',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九',
  '0': '〇',
};

const DIALOGUES_STAGE6_INTRO: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '汉家顶级葬制“黄肠题凑”，黄心柏木端头朝内，万枋如木质堡垒守护王陵。',
  },
];

const DIALOGUES_STAGE6_AFTER_VIDEO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '舞姿暗含数序，连起来便是题凑木枋之数。',
  },
];

const DIALOGUES_STAGE6_SUCCESS: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '大葆台一号墓耗用15880根柏木，层层咬合筑成三米木墙。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我记起来了！黄肠题凑乃王陵至尊礼制，也是汉家生死秩序。',
  },
];

export const Stage6Huangchang: React.FC<Stage6HuangchangProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  // 每一子页面转场统一控制在 0.5 秒左右（240ms 柔和淡出 -> 瞬时切换 -> 260ms 柔和淡入）
  const { phase, setPhase, transitionStyle } = useSmoothPhaseTransition<
    | 'guide'
    | 'video_preshow'
    | 'interactive'
    | 'success_dialogue'
    | 'bamboo_slip'
  >('guide');
  const [inputDigits, setInputDigits] = useState<string[]>([]);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [isIntroDialogueDone, setIsIntroDialogueDone] = useState<boolean>(false);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleDigitPress = (num: number) => {
    if (inputDigits.length < 5) {
      soundFX.playStoneDrum();
      setInputDigits([...inputDigits, num.toString()]);
    }
  };

  const handleDeleteDigit = () => {
    soundFX.playStoneDrum();
    setInputDigits(inputDigits.slice(0, -1));
  };

  const handleConfirmCode = () => {
    const code = inputDigits.join('');
    if (code === '15880') {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      onUnlockFragment();
      setPhase('bamboo_slip');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('数目有误，题凑柏木总数为15880。');
    }
  };

  return (
    <div
      className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806]"
      style={transitionStyle}
    >
      {/* Visual Background: 黄肠题凑木棕＋玄黑 */}
      <MuseumTombBackdrop palette="huangchang" pattern="timber" spotlight={true} intensity="subtle" />

      {/* STEP 0: 引导页 - 汉代车马画像砖局部背景底图 */}
      {phase === 'guide' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-4 animate-fade-in overflow-hidden">
          {/* 背景底图 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={CHAPTER_BACKGROUNDS.stage6_chariot_guide}
              alt="汉代车马画像砖"
              className="w-full h-full object-cover filter brightness-[0.55] contrast-110 saturate-90 scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806] via-[#0B0806]/60 to-[#0B0806]/40" />
          </div>

          <HanMuseumTopBar />

          {/* 标题 & 小字 */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-3 px-4 max-w-sm mx-auto">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              黄肠题凑与幽宫
            </h2>
            <p className="text-xs sm:text-sm font-serif text-[#E6D3AA] tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              千柏为椁 · 规制森严
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
          </div>

          {/* 底部按钮 */}
          <div className="relative z-10 w-full max-w-xs mx-auto space-y-2 pb-2">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('video_preshow');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              步入黄肠题凑 · 破译木枋密码
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* STEP 2: PAGE 21 黄肠题凑视频 (已合并前置对白，统一戈舞全屏无边框页面规格，底图80%遮罩) */}
      {phase === 'video_preshow' && (
        <ChapterVideoPageView
          chapterNumber="06"
          englishTitle="TIMBER VAULT & HUANGCHANG"
          chineseTitle="黄肠题凑密码"
          subtitle="千柏为椁 · 规制森严 · 木枋层叠守护幽宫"
          videoSrc={STAGE_VIDEOS.stage6_huangchang.url}
          videoAssetPathHint="public/assets/videos/timber_dance.mp4"
          // 🚨【PAGE 1: 题凑视频播放页背景底图 - 80% 遮罩 (可直接替换)】🚨
          bgImage={STAGE6_BACKGROUNDS.page1_video}
          palette="timber"
          completeButtonText="完成观看 · 破译木枋"
          dialogues={DIALOGUES_STAGE6_INTRO}
          onSkip={() => {
            setPhase('interactive');
          }}
          onComplete={() => {
            setPhase('interactive');
          }}
        />
      )}

      {/* STEP 4: PAGE 22 交互：木牍计数输入五位密码「15880」 (已合并木牍五数对白) */}
      {phase === 'interactive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="木牍计数 · 黄肠题凑" />
          </div>

          {/* 5-Digit Display Slots (上方显示汉代古文字与现代对照，紧凑高度) */}
          <div className="flex items-center justify-center gap-1.5 py-0.5 my-0.5">
            {[0, 1, 2, 3, 4].map((slotIdx) => {
              const digit = inputDigits[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`w-10 h-12 rounded-lg border-0 relative flex flex-col items-center justify-center transition-all ${
                    digit
                      ? 'bg-[#3D2319] text-[#F1D98D] shadow-[0_0_10px_rgba(214,168,75,0.35)] scale-102'
                      : 'bg-[#180E09]/90 text-[#8C6D46]'
                  }`}
                >
                  {digit ? (
                    <>
                      <span className="text-base font-serif font-black text-[#F1D98D] leading-none">
                        {ANCIENT_NUM_MAP[digit]}
                      </span>
                      <span className="text-[9px] font-mono text-[#D6A84B] opacity-80 mt-0.5">
                        {digit}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-serif text-[#8C6D46] opacity-40">·</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 木牍计数键盘 (向上平移，按键紧凑适中，腾出底部空间) */}
          <div className="flex flex-col items-center w-full max-w-xs mx-auto my-0.5 space-y-1">
            {/* 木牍数字条按键：前排 1-5 */}
            <div className="grid grid-cols-5 gap-1.5 w-full">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleDigitPress(num)}
                  className="relative py-1.5 px-0.5 rounded-lg bg-[#28150D] hover:bg-[#3D2115] border-0 text-[#F1D98D] flex flex-col items-center justify-center shadow active:scale-95 transition-all"
                >
                  <span className="text-sm font-serif font-black text-[#F1D98D] leading-tight">
                    {ANCIENT_NUM_MAP[num.toString()]}
                  </span>
                  <span className="text-[9.5px] font-mono text-[#A89078] leading-tight mt-0.5">
                    {num}
                  </span>
                </button>
              ))}
            </div>

            {/* 木牍数字条按键：后排 6-0 */}
            <div className="grid grid-cols-5 gap-1.5 w-full">
              {[6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  onClick={() => handleDigitPress(num)}
                  className="relative py-1.5 px-0.5 rounded-lg bg-[#28150D] hover:bg-[#3D2115] border-0 text-[#F1D98D] flex flex-col items-center justify-center shadow active:scale-95 transition-all"
                >
                  <span className="text-sm font-serif font-black text-[#F1D98D] leading-tight">
                    {ANCIENT_NUM_MAP[num.toString()]}
                  </span>
                  <span className="text-[9.5px] font-mono text-[#A89078] leading-tight mt-0.5">
                    {num}
                  </span>
                </button>
              ))}
            </div>

            {/* 辅助操作栏：退格与计数状态 */}
            <div className="flex items-center justify-between w-full px-1 py-0.5">
              <button
                onClick={handleDeleteDigit}
                className="px-2.5 py-1 rounded-md bg-[#1E110A] hover:bg-[#2E1A11] border-0 text-[#E6D3AA] font-serif text-[10.5px] flex items-center gap-1 active:scale-95 transition-all"
              >
                <Delete className="w-3 h-3 text-[#D6A84B]" />
                <span>木牍退格</span>
              </button>
              <button
                onClick={() => setInputDigits([])}
                className="px-2 py-1 text-[10.5px] font-serif text-[#9E8268] hover:text-[#E6D3AA] transition-colors"
              >
                清空重录
              </button>
              <span className="text-[9.5px] font-mono text-[#C8943D]">
                已录入 {inputDigits.length}/5 位
              </span>
            </div>
          </div>

          {/* 确认密码按钮：平移上移，完全暴露在玉舞人对话框上方 */}
          <div className="w-full z-20 py-1 max-w-xs mx-auto px-1 mb-1">
            <HanPlaqueButton
              onClick={handleConfirmCode}
              disabled={inputDigits.length !== 5}
              size="sm"
              className="w-full shadow-lg"
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-[#D6A84B]" />}
            >
              确认木牍密码 · 开启黄肠题凑守护
            </HanPlaqueButton>
          </div>

          <div className="relative z-40 w-full shrink-0">
            {!isIntroDialogueDone ? (
              <UnifiedDialogueBox
                dialogues={DIALOGUES_STAGE6_AFTER_VIDEO}
                currentIndex={0}
                onNext={() => {
                  soundFX.playStoneDrum();
                  setIsIntroDialogueDone(true);
                }}
              />
            ) : (
              <UnifiedDialogueBox
                isInteractiveMode={true}
                hints={[
                  '密码为题凑柏木出土总根数。',
                  '前两位为一万五千余，后三位八百八十。',
                  '正确密码为「15880」根柏木。',
                ]}
                errorTip={errorTip}
                onClearError={() => setErrorTip('')}
              />
            )}
          </div>
        </div>
      )}

      {/* STEP 5: 记忆恢复·竹简收集 (图10已删，玉舞人聊天框合并到此页，说完话后启程下一章) */}
      {phase === 'bamboo_slip' && (
        <div className="absolute inset-0 z-50 bg-[#0B0806] flex flex-col items-center justify-center animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={6}
            customBgType="timber_palace"
            dialogues={DIALOGUES_STAGE6_SUCCESS}
            onProceed={() => {
              onUnlockFragment();
              onNextPage();
            }}
          />
        </div>
      )}
    </div>
  );
};
