import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { Sparkles, CheckCircle2, ArrowRight, Dices, Play } from 'lucide-react';
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
// 🚨【第四章各页面背景底图路径配置中心 (方便一键查找与替换)】🚨
// =========================================================================
const STAGE4_BACKGROUNDS = CHAPTER_PAGE_BACKGROUNDS.stage4;

// 🚨【第四章 · 7颗真实质感蹴丸 PNG 资产路径】🚨
// 若您需要替换为自己的高清蹴丸切图，只需修改此处：
export const STAGE4_CUJU_BALL_PNG = CHAPTER_BACKGROUNDS.stage4_cuju_ball;

interface Stage4BaixiProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_STAGE4_PAIYOU: DialogueLine[] = [
  {
    speaker: 'corruptor',
    speakerName: '俳优',
    text: '看我这七颗丸球！我一天能抛“五千四百”回。可“五千四百”和“五千又四百”，到底是不是同一个数？算错了，我今晚的赏钱可没了！',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '百戏看似热闹，也有规则和技巧。你先看清他的说法，再替他算一算。',
  },
];

const DIALOGUES_STAGE4_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '对，两个说法都是五千四百。宴乐重礼，百戏娱民；热闹之中，也有严谨的秩序。我又想起了广阳宴席上的笑声。',
  },
];

export const Stage4Baixi: React.FC<Stage4BaixiProps> = ({
  onUnlockFragment,
  onNextPage,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<'guide' | 'video_preshow' | 'dialogue_paiyou' | 'interactive' | 'success_dialogue' | 'bamboo_slip'>('guide');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleSelectOption = (opt: 'A' | 'B') => {
    soundFX.playStoneDrum();
    setSelectedOption(opt);
  };

  const handleConfirmOption = () => {
    if (!selectedOption) return;
    if (selectedOption === 'B') {
      soundFX.playBronzeChime();
      soundFX.playMemoryRestore();
      setErrorTip('');
      setIsSuccess(true);
      setPhase('success_dialogue');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('再想想……古汉语中“又”用于连接整数与零头，表示“加”，故五千又四百即为五千四百。');
      setTimeout(() => {
        setErrorTip('');
      }, 4000);
    }
  };

  return (
    <div className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806]">
      {/* 🚨【第四章全局通用背景底图：汉代悱忧空中抛接跳丸壁画，保留底纹样式，全章统一应用，90% 遮罩】🚨 */}
      {/* 代码引用路径：STAGE4_BACKGROUNDS.page0_guide (即 CHAPTER_PAGE_BACKGROUNDS.stage4) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={STAGE4_BACKGROUNDS.page0_guide}
          alt="汉代悱忧抛接跳丸壁画底图"
          className="w-full h-full object-cover filter brightness-75 contrast-105 saturate-80"
        />
        {/* 90% 遮罩效果 (黑曜石色调沉浸遮罩) */}
        <div className="absolute inset-0 bg-[#0B0806]/90 backdrop-blur-[0.5px]" />
      </div>

      {/* Visual Background: 百戏暖赭＋暗金 (保留砂石粗粝古朴质感底纹) */}
      <MuseumTombBackdrop palette="baixi" pattern="brick" spotlight={false} intensity="subtle" />

      {/* STEP 0: 引导页 - 汉代百戏跳丸画像底图 (全章通用底图引用: STAGE4_BACKGROUNDS.page0_guide) */}
      {phase === 'guide' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-4 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          {/* 标题 & 小字 */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-3 px-4 max-w-sm mx-auto">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              百戏与跳丸
            </h2>
            <p className="text-xs sm:text-sm font-serif text-[#E6D3AA] tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              百戏杂陈 · 市井欢歌
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
              rightIcon={<Play className="w-4 h-4 text-[#D6A84B]" />}
            >
              观百戏乐舞 · 探跳丸之谜
            </HanPlaqueButton>

            <button
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('dialogue_paiyou');
                setDialogueIdx(0);
              }}
              className="w-full text-center text-[10px] text-[#A89078] hover:text-[#F1D98D] transition-colors py-1 cursor-pointer"
            >
              跳过影像 · 直接入戏
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: PAGE 14 百戏视频 (80% 遮罩，底图引用: STAGE4_BACKGROUNDS.page1_video) */}
      {phase === 'video_preshow' && (
        <ChapterVideoPageView
          chapterNumber="04"
          englishTitle="BAIXI ACROBATICS"
          chineseTitle="百 戏 娱 民"
          subtitle="弄丸飞剑 · 谐谑欢腾"
          videoSrc={STAGE_VIDEOS.stage4_baixi.url}
          videoAssetPathHint="public/assets/videos/baixi_dance.mp4"
          // 🚨【PAGE 1: 百戏视频播放页背景底图 - 80% 遮罩 (可直接替换)】🚨
          bgImage={STAGE4_BACKGROUNDS.page1_video}
          palette="baixi"
          completeButtonText="完成观看 · 步入算题"
          onSkip={() => {
            setPhase('dialogue_paiyou');
            setDialogueIdx(0);
          }}
          onComplete={() => {
            setPhase('dialogue_paiyou');
            setDialogueIdx(0);
          }}
        />
      )}

      {/* STEP 2: 俳优对白 (底图引用: STAGE4_BACKGROUNDS.page3_dialogue，已去掉中间发光icon，90%遮罩) */}
      {phase === 'dialogue_paiyou' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="百戏与跳丸" />
          </div>

          {/* 纯净居中诗意文字，去掉中间发光icon */}
          <div className="relative my-auto flex flex-col items-center justify-center space-y-2 text-center px-4">
            <span className="text-[11px] font-mono text-[#C8943D] tracking-widest">广阳市民乐舞 · 弄丸飞剑</span>
            <h3 className="text-base sm:text-lg font-serif font-black text-[#F1D98D] tracking-wider drop-shadow-md">
              百戏娱民 · 热闹欢腾
            </h3>
            <p className="text-xs font-serif text-[#C4A98B] max-w-xs leading-relaxed">
              汉代俳优飞腾跳丸，空中盘旋如星。热闹市井欢歌之中，亦暗含古代算数之严谨。
            </p>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE4_PAIYOU}
              currentIndex={dialogueIdx}
              onNext={() => {
                if (dialogueIdx < DIALOGUES_STAGE4_PAIYOU.length - 1) {
                  setDialogueIdx((prev) => prev + 1);
                } else {
                  setPhase('interactive');
                }
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 3: 交互：跳丸数字谜题 (底图引用: STAGE4_BACKGROUNDS.page2_cuju_game，7颗真实质感蹴丸PNG，木牍答案选定朱砂盖【录】) */}
      {phase === 'interactive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="百戏跳丸谜题" />
          </div>

          {/* Top: 汉代算筹与竹简视觉 · 7颗真实质感蹴丸图片 */}
          <div className="relative w-full py-2 px-1 rounded-xl bg-[#1C100A]/90 border-y border-[#4A2612] flex flex-col items-center justify-center overflow-hidden shadow-inner">
            {/* 竹简细竖纹背景 */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_22px,rgba(0,0,0,0.4)_23px)] pointer-events-none opacity-60" />

            {/* 7 颗真实质感蹴丸 + 汉代算筹 */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* 真实质感蹴丸 PNG 图片资产 */}
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center animate-bounce" style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.8s' }}>
                    <img
                      src={STAGE4_CUJU_BALL_PNG}
                      alt={`蹴丸 ${i + 1}`}
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
                    />
                  </div>

                  {/* 汉代算筹标记 (算筹细竹条视觉) */}
                  <div className="flex items-center gap-0.5 h-3">
                    {Array.from({ length: (i % 3) + 1 }).map((_, rIdx) => (
                      <span
                        key={rIdx}
                        className="w-[2px] h-2.5 rounded-full bg-[#C8943D]/80 shadow-[0_0_2px_rgba(200,148,61,0.5)]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-1 text-[7.5px] text-[#A89078] font-serif tracking-wider">
              算筹为纪 · “又”者，古意相加也（五千又四百 即 五千并四百）
            </div>
          </div>

          {/* 题目刻在深褐竹简/木牍式面板 */}
          <div className="relative p-2.5 rounded-xl bg-[#22130C] border-y border-[#522B15] text-center space-y-0.5 my-1 shadow-md overflow-hidden">
            {/* 木牍两端简策丝线 */}
            <div className="absolute top-1 left-3 right-3 h-[1px] bg-[#6F3F22]/50 pointer-events-none" />
            <div className="absolute bottom-1 left-3 right-3 h-[1px] bg-[#6F3F22]/50 pointer-events-none" />

            <span className="text-[8px] font-mono text-[#C8943D] tracking-widest">
              【 俳优木牍题问 】
            </span>
            <p className="text-xs sm:text-sm font-serif font-bold text-[#F1D98D] tracking-wider py-0.5">
              “五千四百” 与 “五千又四百” 到底是不是同一个数？
            </p>
          </div>

          {/* 答案 A/B 则像两块小木牍，选中后朱砂印章盖下：“录” */}
          <div className="grid grid-cols-2 gap-2.5 px-1">
            {/* 木牍选项 A */}
            <button
              onClick={() => handleSelectOption('A')}
              className={`relative p-3 rounded-lg border font-serif transition-all shadow-md flex flex-col items-center justify-center min-h-[64px] overflow-hidden ${
                selectedOption === 'A'
                  ? 'bg-[#2E180F] border-[#8C4F28] text-[#F1D98D]'
                  : 'bg-[#1D100A] border-[#442211] text-[#9A7D65] hover:text-[#E2C392]'
              }`}
            >
              {/* 木牍木纹感 */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_12px,rgba(0,0,0,0.25)_13px)] pointer-events-none opacity-40" />

              <span className="text-[8.5px] font-mono text-[#A88258] relative z-10">木牍 壹</span>
              <span className="text-xs font-bold relative z-10 mt-0.5">两个数不同</span>

              {/* 选中后朱砂印章盖下：“录” */}
              {selectedOption === 'A' && (
                <div className="absolute right-1.5 top-1.5 w-6 h-6 border-2 border-[#D32F2F] bg-[#B71C1C]/90 rounded-[2px] flex items-center justify-center rotate-[-8deg] shadow-lg animate-fade-in z-20">
                  <span className="text-[10px] font-serif font-black text-[#FFEBEE] leading-none">录</span>
                </div>
              )}
            </button>

            {/* 木牍选项 B (正解) */}
            <button
              onClick={() => handleSelectOption('B')}
              className={`relative p-3 rounded-lg border font-serif transition-all shadow-md flex flex-col items-center justify-center min-h-[64px] overflow-hidden ${
                selectedOption === 'B'
                  ? 'bg-[#2E180F] border-[#8C4F28] text-[#F1D98D]'
                  : 'bg-[#1D100A] border-[#442211] text-[#9A7D65] hover:text-[#E2C392]'
              }`}
            >
              {/* 木牍木纹感 */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_12px,rgba(0,0,0,0.25)_13px)] pointer-events-none opacity-40" />

              <span className="text-[8.5px] font-mono text-[#79B9A1] relative z-10">木牍 贰 (正解)</span>
              <span className="text-xs font-bold relative z-10 mt-0.5">两个数相同</span>

              {/* 选中后朱砂印章盖下：“录” */}
              {selectedOption === 'B' && (
                <div className="absolute right-1.5 top-1.5 w-6 h-6 border-2 border-[#D32F2F] bg-[#B71C1C]/90 rounded-[2px] flex items-center justify-center rotate-[-8deg] shadow-lg animate-fade-in z-20">
                  <span className="text-[10px] font-serif font-black text-[#FFEBEE] leading-none">录</span>
                </div>
              )}
            </button>
          </div>

          {/* 确认按钮：取消高亮渐变，使用沉稳汉代漆木平色风格 */}
          <div className="w-full z-10 my-1 max-w-xs mx-auto px-1">
            <button
              onClick={handleConfirmOption}
              disabled={!selectedOption}
              className={`w-full py-2.5 px-4 rounded-lg font-serif font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                selectedOption
                  ? 'bg-[#2A150D] hover:bg-[#381D12] text-[#F1D98D] border border-[#5E361D] cursor-pointer active:scale-98'
                  : 'bg-[#180C07] text-[#6E5544] border border-[#33180D] cursor-not-allowed opacity-60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#D6A84B]" />
              <span>确认答案 · 助俳优领取赏钱</span>
            </button>
          </div>

          <div className="relative z-40 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '汉代百戏以杂技、乐舞为主，兼具滑稽与算学智慧。',
                '古汉语中“又”用于连接整数与零头，表示“加”。',
                '“五千四百”与“五千又四百”代表同一数值，选项 B 为正确答案。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* STEP 4: 成功反馈对白 */}
      {phase === 'success_dialogue' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2">
            <div className="w-20 h-20 rounded-full bg-[#2A1E14] border-0 flex items-center justify-center shadow-[0_0_25px_rgba(214,168,75,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-[#F1D98D]" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-black text-[#F1D98D]">
                算题解开 · 俳优欢欣
              </h3>
              <p className="text-[10px] text-[#E6D3AA]/80 mt-0.5">
                百戏腾跃，技艺通神，汉代市井乐舞竹简正缓缓铺开
              </p>
            </div>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE4_SUCCESS}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('bamboo_slip');
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 5: 记忆恢复 · 竹简收集 (背景为极淡百戏人物剪影，出现后渐消) */}
      {phase === 'bamboo_slip' && (
        <div className="fixed inset-0 z-50 bg-[#0B0806]/95 backdrop-blur-md flex flex-col items-center justify-center p-2 animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={4}
            customBgType="baixi_shadow"
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
