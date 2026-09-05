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
    text: '这不是普通墓室，而是汉代高等级墓葬制度——黄肠题凑。“黄肠”指黄心柏木；“题凑”指木枋端头朝向墓室中心。木枋层层围合，像一座木质堡垒守护棺椁。',
  },
];

const DIALOGUES_STAGE6_AFTER_VIDEO: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这些动作像在报数。把它们连起来，也许就是黄肠题凑留下的数字。',
  },
];

const DIALOGUES_STAGE6_SUCCESS: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '大葆台一号墓共使用 15880 根规格统一的柏木条。木枋层层咬合，最终形成高约 3 米的围护木墙。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我想起来了。这样的墓制并非人人可用，它属于极高等级的王陵礼制。原来我沉睡的地方，本身就是一整套汉代生死秩序。',
  },
];

export const Stage6Huangchang: React.FC<Stage6HuangchangProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<
    | 'guide'
    | 'intro_dialogue'
    | 'video_preshow'
    | 'dialogue_preshow'
    | 'interactive'
    | 'success_dialogue'
    | 'bamboo_slip'
  >('guide');
  const [inputDigits, setInputDigits] = useState<string[]>([]);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
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
      setPhase('success_dialogue');
      setDialogueIdx(0);
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('木枋数目不合天子礼制规范，请核对汉代一号墓柏木总数（15880）……');
    }
  };

  return (
    <div className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806]">
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
                setPhase('intro_dialogue');
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

      {/* STEP 1: PAGE 20 前置对白 */}
      {phase === 'intro_dialogue' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第六章 · 黄肠题凑密码" />
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2.5">
            <div className="w-18 h-18 rounded-full bg-[#2E1A11]/80 border-0 relative flex items-center justify-center shadow-[0_0_25px_rgba(214,168,75,0.4)] animate-pulse">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#C8943D]" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#C8943D]" />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#C8943D]" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#C8943D]" />
              <Sparkles className="w-9 h-9 text-[#F1D98D]" />
            </div>
            <div className="text-center space-y-0.5">
              <span className="text-[9.5px] font-mono text-[#C8943D]">大汉天子恩赐 · 题凑礼制</span>
              <h3 className="text-sm font-black text-[#F1D98D]">柏木成城 · 守护王陵</h3>
            </div>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE6_INTRO}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('video_preshow');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 2: PAGE 21 黄肠题凑视频 (统一戈舞全屏无边框页面规格，底图80%遮罩) */}
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
          onSkip={() => {
            setPhase('dialogue_preshow');
          }}
          onComplete={() => {
            setPhase('dialogue_preshow');
          }}
        />
      )}

      {/* STEP 3: PAGE 21 玉舞人报数线索对白 */}
      {phase === 'dialogue_preshow' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第六章 · 黄肠题凑密码" />
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#2E1A11] border-0 relative flex items-center justify-center shadow-[0_0_20px_rgba(214,168,75,0.4)]">
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#C8943D]" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#C8943D]" />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#C8943D]" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#C8943D]" />
              <Sparkles className="w-7 h-7 text-[#F1D98D]" />
            </div>
            <div className="text-center text-[10.5px] text-[#A89078]">
              黄肠题凑木墙威严矗立，输入由舞姿报出的柏木总根数
            </div>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE6_AFTER_VIDEO}
              currentIndex={0}
              onNext={() => {
                setPhase('interactive');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 4: PAGE 22 交互：木牍计数输入五位密码「15880」 */}
      {phase === 'interactive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="木牍计数 · 黄肠题凑" />
          </div>

          {/* 5-Digit Display Slots (上方显示汉代古文字与现代对照) */}
          <div className="flex items-center justify-center gap-2 py-1">
            {[0, 1, 2, 3, 4].map((slotIdx) => {
              const digit = inputDigits[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`w-11 h-14 rounded-lg border-0 relative flex flex-col items-center justify-center transition-all ${
                    digit
                      ? 'bg-[#3D2319] text-[#F1D98D] shadow-[0_0_12px_rgba(214,168,75,0.35)] scale-105'
                      : 'bg-[#180E09]/90 text-[#8C6D46]'
                  }`}
                >
                  {digit ? (
                    <>
                      <span className="text-xl font-serif font-black text-[#F1D98D] leading-none">
                        {ANCIENT_NUM_MAP[digit]}
                      </span>
                      <span className="text-[10px] font-mono text-[#D6A84B] opacity-80 mt-0.5">
                        {digit}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-serif text-[#8C6D46] opacity-40">·</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 木牍计数键盘 (参考图3：上为木牍古文字数字，下为对应现代数字) */}
          <div className="flex flex-col items-center w-full max-w-xs mx-auto my-auto space-y-2">
            {/* 木牍数字条按键：前排 1-5 */}
            <div className="grid grid-cols-5 gap-1.5 w-full">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleDigitPress(num)}
                  className="relative py-2.5 px-1 rounded-lg bg-[#28150D] hover:bg-[#3D2115] border-0 text-[#F1D98D] flex flex-col items-center justify-center shadow active:scale-95 transition-all"
                >
                  <span className="text-base font-serif font-black text-[#F1D98D] leading-tight">
                    {ANCIENT_NUM_MAP[num.toString()]}
                  </span>
                  <span className="text-[10.5px] font-mono text-[#A89078] leading-tight mt-0.5">
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
                  className="relative py-2.5 px-1 rounded-lg bg-[#28150D] hover:bg-[#3D2115] border-0 text-[#F1D98D] flex flex-col items-center justify-center shadow active:scale-95 transition-all"
                >
                  <span className="text-base font-serif font-black text-[#F1D98D] leading-tight">
                    {ANCIENT_NUM_MAP[num.toString()]}
                  </span>
                  <span className="text-[10.5px] font-mono text-[#A89078] leading-tight mt-0.5">
                    {num}
                  </span>
                </button>
              ))}
            </div>

            {/* 辅助操作栏：退格与计数状态 */}
            <div className="flex items-center justify-between w-full px-1">
              <button
                onClick={handleDeleteDigit}
                className="px-3 py-1.5 rounded-lg bg-[#1E110A] hover:bg-[#2E1A11] border-0 text-[#E6D3AA] font-serif text-xs flex items-center gap-1 active:scale-95 transition-all"
              >
                <Delete className="w-3.5 h-3.5 text-[#D6A84B]" />
                <span>木牍退格</span>
              </button>
              <button
                onClick={() => setInputDigits([])}
                className="px-2.5 py-1.5 text-[11px] font-serif text-[#9E8268] hover:text-[#E6D3AA] transition-colors"
              >
                清空重录
              </button>
              <span className="text-[10px] font-mono text-[#C8943D]">
                已录入 {inputDigits.length}/5 位
              </span>
            </div>
          </div>

          {/* Standardized Confirm Button */}
          <div className="w-full z-10 pt-0.5 max-w-xs mx-auto">
            <HanPlaqueButton
              onClick={handleConfirmCode}
              disabled={inputDigits.length !== 5}
              size="md"
              className="w-full"
              leftIcon={<CheckCircle2 className="w-4 h-4 text-[#D6A84B]" />}
            >
              确认木牍密码 · 开启黄肠题凑守护
            </HanPlaqueButton>
          </div>

          <div className="relative z-40 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '黄肠题凑所耗费的柏木枋数量极为庞大，密码即为其确凿的出土总根数。',
                '五位数字中，前两位为一万五千余根，后三位为八百八十根。',
                '正确密码为「15880」——大葆台汉墓黄肠题凑正由一万五千八百八十根柏木层层垒砌而成。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* STEP 5: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative my-auto flex flex-col items-center justify-center">
            <MuseumAccessionRecord
              memoryIndex={6}
              title="黄肠题凑"
              subtitle="大葆台一号汉墓地宫核心结构 · 柏木题凑木椁"
              accessionCode="DBT-M1-06"
              material="黄心柏木 / 榫卯层叠咬合"
              excavationSite="大葆台一号汉墓中央地宫"
              era="西汉 · 广阳顷王墓 (约公元前45年)"
              category="天子之制 · 诸侯王陵"
            />
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE6_SUCCESS}
              currentIndex={dialogueIdx}
              onNext={() => {
                if (dialogueIdx < DIALOGUES_STAGE6_SUCCESS.length - 1) {
                  setDialogueIdx((prev) => prev + 1);
                } else {
                  soundFX.playStoneDrum();
                  setPhase('bamboo_slip');
                }
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 6: 记忆恢复·竹简收集 (黑漆漆墓室，黄肠题凑轮廓，金芒流转后淡出，留下极简 MEMORY 06) */}
      {phase === 'bamboo_slip' && (
        <BambooSlipCollector
          stageNumber={6}
          customBgType="timber_palace"
          onProceed={() => {
            onUnlockFragment();
            onNextPage();
          }}
        />
      )}
    </div>
  );
};
