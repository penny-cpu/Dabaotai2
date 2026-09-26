import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/soundEngine';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Compass,
  Download,
  RefreshCw,
  Building2,
  Heart,
  Play,
  Scroll,
} from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar, HanCloudTitle } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { StarweaversAtlas } from './StarweaversAtlas';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import { CHAPTER_BACKGROUNDS } from '../config/assetRegistry';
import { BambooSlipCollector } from './BambooSlipCollector';
import { ChapterVideoPageView } from './ChapterVideoPageView';
import { STAGE_VIDEOS } from '../data/videoAssets';

interface Stage7AscensionProps {
  onUnlockFragment: () => void;
  onRestart: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_STAGE7_INTRO: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '汉人深信灵魂不灭，死后将升入星宿仙境，遨游九天。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我们入墓非为遗忘，而是继续起舞陪伴。请连缀星宿指引归途。',
  },
];

const DIALOGUES_STAGE7_SUCCESS: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '北斗指东，七大记忆碎片重光！汉室乐舞与永恒星辰交相辉映。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '随我穿越千载时空，回到今天的现代展厅吧！',
  },
];

const DIALOGUES_MODERN_HALL: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这是现代展厅？考古学者拂去尘土，将破碎的我们修复陈列于此……',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '考古唤醒了沉睡两千年的我，而你走过七章，重新点亮了大汉文脉。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我将留守展厅守护大汉记忆。谢谢你，陪我找回所有记忆卡片！',
  },
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '两千年文脉重光。以此明信片，致敬每一位华夏文脉守护者。',
  },
];

// 七大章节记忆竹简信息列表
export const CHAPTER_SLIPS_MEMORIES = [
  { stage: 1, num: '壹', title: '戈舞出征', relic: '错金银铜柱', theme: '武舞干戚', desc: '刚劲雄浑' },
  { stage: 2, num: '贰', title: '广阳宴乐', relic: '西汉钮钟', theme: '编钟雅乐', desc: '金石齐鸣' },
  { stage: 3, num: '叁', title: '翘袖折腰', relic: '白玉舞人', theme: '罗衣回雪', desc: '翩跹轻盈' },
  { stage: 4, num: '肆', title: '百戏跳丸', relic: '百戏陶俑', theme: '跳丸弄剑', desc: '市井欢腾' },
  { stage: 5, num: '伍', title: '朱墨云气', relic: '彩绘陶壶', theme: '送葬仙境', desc: '朱墨翻卷' },
  { stage: 6, num: '陆', title: '黄肠题凑', relic: '柏木题凑', theme: '以木为宫', desc: '万枋垒筑' },
  { stage: 7, num: '柒', title: '璀璨星汉', relic: '星宿天象', theme: '乘龙登遐', desc: '北斗指东' },
];

export const Stage7Ascension: React.FC<Stage7AscensionProps> = ({
  onUnlockFragment,
  onRestart,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<
    | 'guide'
    | 'video_dance'
    | 'interactive'
    | 'success_dialogue'
    | 'bamboo_slip'
    | 'modern_hall'
    | 'postcard_end'
  >('guide');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  // 视频淡出状态
  const [isVideoFadingOut, setIsVideoFadingOut] = useState<boolean>(false);

  // Postcard State: 是否翻面 & 竹简开合进度 (0.0=完全卷起成轴, 1.0=完全展开横向明信片)
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [rollProgress, setRollProgress] = useState<number>(1.0);
  const isBambooRolled = rollProgress < 0.15;
  const setIsBambooRolled = (rolled: boolean) => {
    setRollProgress(rolled ? 0 : 1);
  };
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 原生手势拖拽支持 (Pointer Events 适配移动端触屏与鼠标，杜绝Hook版本冲突)
  const dragStartXRef = useRef<number | null>(null);
  const dragStartProgressRef = useRef<number>(1.0);
  const isDraggingRef = useRef<boolean>(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = rollProgress;
    isDraggingRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || dragStartXRef.current === null) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const deltaProgress = deltaX / 240;
    const nextProgress = Math.max(0, Math.min(1, dragStartProgressRef.current + deltaProgress));
    setRollProgress(nextProgress);
  };

  const handlePointerUp = (_e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    dragStartXRef.current = null;
    soundFX.playSandScratch();
    setRollProgress((prev) => {
      if (prev < 0.15) return 0;
      if (prev > 0.85) return 1;
      return prev;
    });
  };

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleVideoCompleteFade = () => {
    soundFX.playStoneDrum();
    setIsVideoFadingOut(true);
    setTimeout(() => {
      setPhase('interactive');
      setIsVideoFadingOut(false);
    }, 800);
  };

  // Draw Dual-Sided High-Res Commemorative Postcard to Canvas for Real Download
  const generatePostcardImage = (side: 'front' | 'back') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 600;
    const height = 840;
    canvas.width = width;
    canvas.height = height;

    if (side === 'front') {
      // 🌟 正面：绘制正统汉代七章记忆竹简册（朱丝编绳贯穿七根竹简木简）
      ctx.fillStyle = '#120A06';
      ctx.fillRect(0, 0, width, height);

      // 顶部典藏标题
      ctx.fillStyle = '#F1D98D';
      ctx.font = 'bold 24px serif';
      ctx.textAlign = 'center';
      ctx.fillText('大 漢 風 華 · 七 章 記 憶 簡 冊', width / 2, 60);

      ctx.fillStyle = '#A89078';
      ctx.font = '13px serif';
      ctx.fillText('北京大葆台西漢墓 · 探索全收錄紀念', width / 2, 88);

      // 绘制 7 根并排竹简
      const slatCount = 7;
      const marginX = 36;
      const availableWidth = width - marginX * 2;
      const slatGap = 8;
      const slatWidth = (availableWidth - (slatCount - 1) * slatGap) / slatCount;
      const slatTop = 115;
      const slatHeight = 635;

      // 贯穿全部竹简的两道朱丝编绳
      const cordY1 = slatTop + 85;
      const cordY2 = slatTop + slatHeight - 95;

      ctx.save();
      ctx.strokeStyle = '#8C2B22';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(marginX - 15, cordY1);
      ctx.lineTo(width - marginX + 15, cordY1);
      ctx.moveTo(marginX - 15, cordY2);
      ctx.lineTo(width - marginX + 15, cordY2);
      ctx.stroke();

      ctx.strokeStyle = '#D6A84B';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(marginX - 15, cordY1);
      ctx.lineTo(width - marginX + 15, cordY1);
      ctx.moveTo(marginX - 15, cordY2);
      ctx.lineTo(width - marginX + 15, cordY2);
      ctx.stroke();
      ctx.restore();

      // 逐根绘制竹简
      CHAPTER_SLIPS_MEMORIES.forEach((chap, idx) => {
        const x = marginX + idx * (slatWidth + slatGap);

        // 竹木简渐变材质
        const slatGrad = ctx.createLinearGradient(x, slatTop, x + slatWidth, slatTop);
        slatGrad.addColorStop(0, '#26150D');
        slatGrad.addColorStop(0.2, '#3E2417');
        slatGrad.addColorStop(0.8, '#321C11');
        slatGrad.addColorStop(1, '#1E0F08');
        ctx.fillStyle = slatGrad;
        ctx.fillRect(x, slatTop, slatWidth, slatHeight);

        // 简边修饰
        ctx.strokeStyle = '#5A3722';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, slatTop, slatWidth, slatHeight);

        // 朱丝编绳结扣
        [cordY1, cordY2].forEach((cy) => {
          ctx.fillStyle = '#A33428';
          ctx.beginPath();
          ctx.arc(x + slatWidth / 2, cy, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#F1D98D';
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // 竖排汉字
        ctx.save();
        ctx.fillStyle = '#F1D98D';
        ctx.font = 'bold 16px serif';
        ctx.textAlign = 'center';
        ctx.fillText(chap.num, x + slatWidth / 2, slatTop + 45);

        // 章节名竖排
        ctx.fillStyle = '#E6D3AA';
        ctx.font = 'bold 13px serif';
        const titleChars = chap.title.split('');
        titleChars.forEach((ch, cIdx) => {
          ctx.fillText(ch, x + slatWidth / 2, slatTop + 125 + cIdx * 24);
        });

        // 文物名竖排
        ctx.fillStyle = '#C8943D';
        ctx.font = '11px serif';
        const relicChars = chap.relic.split('');
        relicChars.forEach((ch, rIdx) => {
          ctx.fillText(ch, x + slatWidth / 2, slatTop + 265 + rIdx * 20);
        });

        // 主题印记竖排
        ctx.fillStyle = '#79B9A1';
        ctx.font = '11px serif';
        const themeChars = chap.theme.split('');
        themeChars.forEach((ch, tIdx) => {
          ctx.fillText(ch, x + slatWidth / 2, slatTop + 415 + tIdx * 20);
        });

        ctx.restore();
      });

      // 底部印章与署名
      ctx.fillStyle = '#8C2B22';
      ctx.fillRect(width - 115, height - 65, 75, 32);
      ctx.fillStyle = '#F1D98D';
      ctx.font = 'bold 13px serif';
      ctx.textAlign = 'center';
      ctx.fillText('大葆台藏', width - 77, height - 44);

      ctx.fillStyle = '#8C6D46';
      ctx.font = '12px serif';
      ctx.textAlign = 'left';
      ctx.fillText('北京大葆台西汉墓遗址博物馆 永久典藏简册', 40, height - 46);
    } else {
      ctx.fillStyle = '#F6F0E6';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#6E432B';
      ctx.lineWidth = 3;
      ctx.strokeRect(18, 18, width - 36, height - 36);

      const zipCodes = ['1', '0', '0', '0', '7', '0'];
      zipCodes.forEach((c, idx) => {
        const bx = 40 + idx * 42;
        const by = 45;
        ctx.strokeStyle = '#8C2B22';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, 32, 38);
        ctx.fillStyle = '#8C2B22';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c, bx + 16, by + 28);
      });

      ctx.strokeStyle = '#6E432B';
      ctx.lineWidth = 2;
      ctx.strokeRect(width - 130, 45, 85, 100);
      ctx.fillStyle = '#8C2B22';
      ctx.font = 'bold 12px serif';
      ctx.textAlign = 'center';
      ctx.fillText('大葆台特种邮票', width - 87, 85);
      ctx.fillText('四神瓦当', width - 87, 108);

      ctx.beginPath();
      ctx.arc(width - 145, 145, 45, 0, Math.PI * 2);
      ctx.strokeStyle = '#8C2B22';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#8C2B22';
      ctx.font = '10px serif';
      ctx.fillText('北京大葆台', width - 145, 138);
      ctx.fillText('记忆传承印', width - 145, 155);

      ctx.beginPath();
      ctx.moveTo(width / 2 + 10, 200);
      ctx.lineTo(width / 2 + 10, 720);
      ctx.strokeStyle = '#A89078';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#26160F';
      ctx.font = 'bold 18px serif';
      ctx.textAlign = 'left';
      ctx.fillText('致未来的同行者：', 45, 230);

      ctx.font = '15px serif';
      const lines = [
        '两千年前，我随广阳王与王后',
        '长眠于黄肠题凑；',
        '两千年后，考古学者拂去尘埃，',
        '你与我并肩穿行于七重记忆。',
        '是考古研究唤醒了沉睡的文明，',
        '也是你的每一次驻足与探索，',
        '让大汉的礼乐风华在今天重光。',
        '我将继续留守在现代展厅里，',
        '等待下一位聆听历史的朋友。',
      ];
      lines.forEach((l, i) => {
        ctx.fillText(l, 45, 280 + i * 36);
      });

      ctx.fillStyle = '#6E432B';
      ctx.font = 'bold 16px serif';
      ctx.textAlign = 'right';
      ctx.fillText('—— 白玉舞人 留念于现代展厅', width / 2 - 20, 660);

      ctx.strokeStyle = '#C4A98B';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(width / 2 + 35, 340 + i * 65);
        ctx.lineTo(width - 45, 340 + i * 65);
        ctx.stroke();
      }

      ctx.fillStyle = '#6E432B';
      ctx.font = '14px serif';
      ctx.textAlign = 'left';
      ctx.fillText('寄往：每一位热爱华夏文脉的探索者', width / 2 + 38, 330);
      ctx.fillText('来自：北京大葆台西汉墓博物馆', width / 2 + 38, 395);
      ctx.fillText('藏品编号：DBT-WEST-HAN-001', width / 2 + 38, 460);

      ctx.fillStyle = '#8C6D46';
      ctx.font = '12px serif';
      ctx.textAlign = 'center';
      ctx.fillText('北京大葆台西汉墓遗址博物馆 监制 · 永久典藏', width / 2, 780);
    }
  };

  const handleDownloadSide = (side: 'front' | 'back') => {
    generatePostcardImage(side);
    const canvas = canvasRef.current;
    if (!canvas) return;

    soundFX.playStoneDrum();
    soundFX.playBronzeChime();

    const link = document.createElement('a');
    link.download = `大葆台西汉墓_终章明信片_${side === 'front' ? '正面' : '背面'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const isModernPalette = phase === 'modern_hall' || phase === 'postcard_end';

  return (
    <div className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none bg-[#0B0806]">
      {/* Background Palette: 星路玄黑＋星金＋玉青 (ascension)；现代章节夕阳暖金 (modern) */}
      <MuseumTombBackdrop
        palette={isModernPalette ? 'modern' : 'ascension'}
        pattern={isModernPalette ? 'cloud' : 'star'}
        spotlight={true}
        intensity="subtle"
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* STEP 0: 引导页 - 汉代墓顶星宿图背景底图 */}
      {phase === 'guide' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-4 animate-fade-in overflow-hidden">
          {/* 背景底图 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={CHAPTER_BACKGROUNDS.stage7_cosmos_guide}
              alt="汉代墓顶星宿图"
              className="w-full h-full object-cover filter brightness-[0.55] contrast-110 saturate-90 scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806] via-[#0B0806]/60 to-[#0B0806]/40" />
          </div>

          <HanMuseumTopBar />

          {/* 标题 & 小字 */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-3 px-4 max-w-sm mx-auto">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              星宿连缀与升仙
            </h2>
            <p className="text-xs sm:text-sm font-serif text-[#E6D3AA] tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              星汉璀璨 · 魂归太虚
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
          </div>

          {/* 底部按钮 */}
          <div className="relative z-10 w-full max-w-xs mx-auto space-y-2 pb-2">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('video_dance');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              步入汉代星汉 · 连缀升仙星轨
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 7: 观看舞姿视频页面 (已合并星汉灿烂前置对白，页面布局与插入资产文件和戈影完全一致)
          在播完这个视频之后，页面与视频整体是以逐渐淡化的形式退下，
          然后视频最后一帧的舞姿就和观星像这一页面的星座连线路线重合
          ========================================================================= */}
      {phase === 'video_dance' && (
        <div
          className={`relative w-full h-full transition-opacity duration-1000 ${
            isVideoFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <ChapterVideoPageView
            chapterNumber="07"
            englishTitle="COSMIC FLIGHT & CELESTIAL STARS"
            chineseTitle="神 仙 幻 想"
            subtitle="天地参合 · 观星引路 · 舞步连缀北斗五星"
            videoSrc={STAGE_VIDEOS.stage7_ascension.url}
            videoAssetPathHint="public/assets/videos/ascension_dance.mp4"
            bgImage={CHAPTER_BACKGROUNDS.stage7_cosmos_guide}
            palette="cosmos"
            completeButtonText="完成观看 · 连线观星"
            dialogues={DIALOGUES_STAGE7_INTRO}
            onSkip={handleVideoCompleteFade}
            onComplete={handleVideoCompleteFade}
          />
        </div>
      )}

      {/* STEP 2: 交互：神仙幻想·观星像 (纯净黑框 + 最后一帧舞姿星轨重合) */}
      {phase === 'interactive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="神仙幻想 · 观星像" />
          </div>

          {/* Starweaver's Atlas Canvas Interactive Container (纯黑夜空框) */}
          <div className="relative my-auto w-full flex flex-col items-center justify-center">
            <div className="relative w-full flex items-center justify-center">
              <StarweaversAtlas
                onCompleteBeidou={() => {
                  soundFX.playMemoryRestore();
                  setIsSuccess(true);
                  onUnlockFragment();
                  setPhase('bamboo_slip');
                }}
                onErrorTip={(tip) => setErrorTip(tip)}
              />
            </div>

            {/* 🌟 用户明确要求：“神仙幻想·观星像点击页面让“再次观看舞姿获取指引”文字紧靠在黑框星象底边正中。” */}
            <div className="relative z-30 w-full flex justify-center -mt-0.5 pt-0.5">
              <button
                onClick={() => {
                  soundFX.playStoneDrum();
                  setPhase('video_dance');
                }}
                className="flex items-center gap-1 text-[11px] font-serif text-[#F1D98D] hover:text-[#FFE87A] active:scale-95 transition-all select-none cursor-pointer py-0 px-2 bg-transparent border-0 outline-none shadow-none"
              >
                <Play className="w-2.5 h-2.5 fill-[#D6A84B] text-[#D6A84B]" />
                <span className="tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  再次观看舞姿获取指引
                </span>
              </button>
            </div>
          </div>

          <div className="relative z-40 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '依序连接星宿：天枢 ➔ 天璇 ➔ 天玑 ➔ 天权 ➔ 玉衡。',
                '可重温舞姿获取指引，按北斗轨迹连线。',
                '连通五星，即可点亮终章记忆卡片！',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* STEP 3: 记忆恢复·竹简收集 (第七章专属星宿流光动画，融合玉舞人对白，说完话后前往现代展厅) */}
      {phase === 'bamboo_slip' && (
        <div className="absolute inset-0 z-50 bg-[#0B0806] flex flex-col items-center justify-center animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={7}
            customBgType="cosmos_stars"
            dialogues={DIALOGUES_STAGE7_SUCCESS}
            onProceed={() => {
              soundFX.playBronzeChime();
              setDialogueIdx(0);
              setPhase('modern_hall');
            }}
          />
        </div>
      )}

      {/* STEP 4: 玉舞人回到现代展厅 (大葆台现代展厅大图背景，无边框设计) */}
      {phase === 'modern_hall' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          {/* 现代展厅背景大图 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={CHAPTER_BACKGROUNDS.modern_hall_exhibition}
              alt="大葆台现代展厅"
              className="w-full h-full object-cover filter brightness-[0.6] contrast-105 saturate-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806] via-[#0B0806]/50 to-[#0B0806]/70" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="北京大葆台西汉墓博物馆 · 现代展厅" />
          </div>

          {/* Modern Museum Exhibition Showcase Scene */}
          <div className="relative z-10 w-full max-w-xs mx-auto aspect-[4/3.8] my-auto rounded-2xl bg-black/60 backdrop-blur-sm border-0 shadow-2xl p-3 flex flex-col items-center justify-between overflow-hidden">
            <div className="flex items-center gap-1 text-[8.5px] font-serif text-[#F1D98D] bg-black/70 px-2.5 py-0.5 rounded-full border-0">
              <Building2 className="w-3 h-3 text-[#D6A84B]" />
              <span>现代展厅 · 恒温恒湿特藏展柜</span>
            </div>

            {/* Real Museum Case Display: 白玉舞人现代展柜摄影 */}
            <div className="relative my-auto flex flex-col items-center justify-center space-y-1.5 w-full">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-[#D6A84B]/40 shadow-[0_0_25px_rgba(121,185,161,0.4)] group">
                <img
                  src={CHAPTER_BACKGROUNDS.modern_hall_jade_dancer}
                  alt="现代展柜中的白玉舞人"
                  className="w-full h-full object-cover filter contrast-110 brightness-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-1 left-2 text-[8px] font-mono text-[#F1D98D] bg-black/70 px-1.5 py-0.2 rounded border border-[#D6A84B]/30">
                  西汉 · 白玉舞人 (特展珍品)
                </span>
              </div>

              <div className="text-center">
                <h4 className="text-xs font-serif font-black text-[#F1D98D]">
                  白玉舞人 · 留守现代展厅
                </h4>
                <p className="text-[8.5px] text-[#E6D3AA]/80">
                  致敬考古工作者与文物保护专家 · 展柜恒温恒湿永久守护
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[8px] text-[#79B9A1] font-mono">
              <Heart className="w-2.5 h-2.5 text-[#E66A55] fill-[#E66A55]" />
              <span>记忆完全复原 · 汉代文脉生生不息</span>
            </div>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_MODERN_HALL}
              currentIndex={dialogueIdx}
              onNext={() => {
                if (dialogueIdx < DIALOGUES_MODERN_HALL.length - 1) {
                  setDialogueIdx(dialogueIdx + 1);
                } else {
                  soundFX.playMemoryRestore();
                  setPhase('postcard_end');
                }
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 5: 最终章明信片双面下载结尾页 (夕阳暖金背景颜色，去除 pb-36，按键去边框四角金线) */}
      {phase === 'postcard_end' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          {/* =========================================================================
              🚨【代码标注位置：终章明信片展示页专属背景底图】
              在此引入大汉风华典藏背景底图，带有暖金夕照、汉代云纹暗涌与典雅金石质感，
              可直接在 src/config/assetRegistry.ts 中的 CHAPTER_BACKGROUNDS.postcard_showcase_backdrop 替换图片
              ========================================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={CHAPTER_BACKGROUNDS.postcard_showcase_backdrop}
              alt="大汉风华纪念明信片背景底图"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.55] contrast-[1.1] scale-105"
            />
            {/* 柔和暗金黑漆双向渐变与中心柔焦径向遮罩，让居中竹简明信片成为视觉焦点 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#110907]/80 via-[#110907]/45 to-[#110907]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(17,9,7,0.85)_100%)]" />
          </div>

          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5 text-center">
            <HanCloudTitle title="大汉风华 · 专属纪念明信片" />
            <p className="text-[8.5px] text-[#C4A98B]">
              点击明信片翻转双面 · 保存您的专属大葆台探索纪念
            </p>
          </div>

          {/* 3D Flip Card Container with Horizontal Facing & framer-motion Roll-up Gestures */}
          <div className="relative w-full max-w-sm mx-auto flex flex-col items-center justify-center my-auto select-none">
            {/* 3D Viewport: 横向明信片面对观众 (325px x 215px) */}
            <div className="relative w-[325px] h-[215px] [perspective:1200px] flex items-center justify-center">
              <div
                className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform flex items-center justify-center ${
                  isCardFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* ================= CARD FRONT: 横向面对观众 · framer-motion手势滑动收卷与展开 ================= */}
                <div
                  className="relative w-full h-full [backface-visibility:hidden] flex items-center justify-center"
                >
                  {rollProgress <= 0.08 ? (
                    /* ------------------ 状态 A: 竹简完全卷起形态 (居中圆柱筒身) ------------------ */
                    <div
                      onClick={() => {
                        soundFX.playSandScratch();
                        setRollProgress(1);
                      }}
                      onPointerDown={(e) => {
                        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                        dragStartXRef.current = e.clientX;
                        dragStartProgressRef.current = 0;
                        isDraggingRef.current = true;
                      }}
                      onPointerMove={(e) => {
                        if (!isDraggingRef.current || dragStartXRef.current === null) return;
                        const deltaX = e.clientX - dragStartXRef.current;
                        if (deltaX > 15) {
                          setRollProgress(Math.min(1, deltaX / 200));
                        }
                      }}
                      onPointerUp={handlePointerUp}
                      className="relative w-[105px] h-[215px] flex flex-col items-center justify-center cursor-pointer group touch-none"
                      title="点击或向右滑动展开完整明信片"
                    >
                      {/* 上轴木 & 鎏金首端 */}
                      <div className="relative w-24 h-3 rounded-full bg-gradient-to-r from-[#120804] via-[#4A2818] to-[#120804] border border-[#6E3D24] shadow-md flex items-center justify-between px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84B] border border-[#6E3D24]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84B] border border-[#6E3D24]" />
                      </div>

                      {/* 卷起的整个明信片竹简圆柱筒身 */}
                      <div className="relative w-20 h-40 rounded-sm shadow-[0_10px_25px_rgba(0,0,0,0.9)] bg-gradient-to-r from-[#0E0604] via-[#3A1F13] to-[#0E0604] border-x border-[#5A351E] flex items-center justify-between px-1 overflow-hidden my-0.5">
                        {/* 卷曲竹简纵向仿真纹理缝隙 */}
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className="w-[2px] h-full bg-black/45 border-r border-[#4A2A19]/25"
                          />
                        ))}

                        {/* 腰部绑系的西汉朱丝绦带 */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r from-[#5B1510] via-[#9E2D22] to-[#5B1510] border-y border-[#D6A84B]/60 flex items-center justify-center shadow-lg">
                          {/* 汉代白玉带钩系扣 */}
                          <div className="w-3.5 h-3.5 rounded-full bg-[#F5EEDC] border-2 border-[#A83226] shadow-md flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#8C2B22] rounded-full" />
                          </div>
                        </div>

                        {/* 朱砂流苏垂穗 */}
                        <div className="absolute top-[56%] left-1/2 -translate-x-1/2 w-1.5 h-10 bg-gradient-to-b from-[#A83226] via-[#8C2B22] to-[#48120D] rounded-b-sm shadow-md" />

                        {/* 简册题签：大葆台 · 汉风简册 */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#26140C]/95 border border-[#D6A84B]/40 px-1 py-1 rounded flex flex-col items-center shadow-md">
                          <span className="text-[7px] font-serif font-black text-[#F1D98D] [writing-mode:vertical-rl] leading-tight tracking-widest">
                            汉风简册
                          </span>
                        </div>
                      </div>

                      {/* 下轴木 & 鎏金首端 */}
                      <div className="relative w-24 h-3 rounded-full bg-gradient-to-r from-[#120804] via-[#4A2818] to-[#120804] border border-[#6E3D24] shadow-md flex items-center justify-between px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84B] border border-[#6E3D24]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84B] border border-[#6E3D24]" />
                      </div>

                      <span className="text-[7.5px] font-serif text-[#D6A84B] mt-1 group-hover:text-[#F1D98D] animate-pulse">
                        [ 点击或向右滑动展开 ]
                      </span>
                    </div>
                  ) : (
                    /* ------------------ 状态 B: 横向面对观众 · 手势滑动展开/收卷 ------------------ */
                    <div
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className="relative w-[325px] h-[215px] flex items-center justify-start cursor-grab active:cursor-grabbing touch-none select-none overflow-visible"
                    >
                      {/* 展开的竹简主体 (根据 rollProgress 动态展开宽度，横向面对观众) */}
                      <div
                        style={{
                          width: `${Math.max(46, Math.min(325, Math.round(rollProgress * 325)))}px`,
                        }}
                        className="h-full rounded-xl bg-[#180C07] border border-[#5A351E]/70 shadow-2xl relative overflow-hidden flex items-stretch transition-[width] duration-75"
                      >
                        {/* 7根章节竹简紧密铺满明信片正面 (竖直排列，文字正向立直 facing viewer) */}
                        <div className="relative w-[323px] h-full flex items-stretch shrink-0">
                          {/* 上下两条贯穿铺满正面的西汉朱丝编绳 */}
                          <div className="absolute inset-x-0 top-5 h-[2px] bg-[#8C2B22] shadow-[0_0_4px_rgba(140,43,34,0.7)] z-20 pointer-events-none" />
                          <div className="absolute inset-x-0 bottom-6 h-[2px] bg-[#8C2B22] shadow-[0_0_4px_rgba(140,43,34,0.7)] z-20 pointer-events-none" />

                          {CHAPTER_SLIPS_MEMORIES.map((slip) => (
                            <div
                              key={slip.stage}
                              className="relative w-[46.1px] h-full border-r border-[#3E2112] last:border-r-0 bg-gradient-to-b from-[#24130A] via-[#381E12] to-[#1F0F07] flex flex-col justify-between py-1.5 px-0.5 shadow-inner select-none shrink-0"
                            >
                              {/* 编联朱丝结扣 */}
                              <div className="absolute top-[17.5px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A83226] border border-[#F1D98D]/70 z-30" />
                              <div className="absolute bottom-[21.5px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A83226] border border-[#F1D98D]/70 z-30" />

                              {/* 顶部章节编号 */}
                              <div className="text-center pt-0.5 z-10">
                                <span className="text-[7.5px] font-serif font-black text-[#F1D98D]">
                                  {slip.num}
                                </span>
                              </div>

                              {/* 中部漆书竖排铭文 (竖直排版，面向观众直读) */}
                              <div className="my-auto flex flex-col items-center justify-center space-y-1 z-10">
                                <span className="text-[8.5px] font-serif font-black text-[#F5EEDC] leading-tight [writing-mode:vertical-rl] tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                  {slip.title}
                                </span>
                                <span className="text-[6.5px] font-serif text-[#C8943D] leading-tight [writing-mode:vertical-rl] pt-0.5">
                                  {slip.relic}
                                </span>
                              </div>

                              {/* 底部主题记忆印记 */}
                              <div className="text-center pb-0.5 z-10">
                                <span className="text-[6px] font-mono text-[#79B9A1] block truncate scale-90">
                                  {slip.theme}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* 简册正面的西汉朱砂印 */}
                        <div className="absolute bottom-1 right-1.5 z-30 flex items-center gap-1 pointer-events-none">
                          <div className="bg-[#8C2B22] text-[#F1D98D] text-[5.5px] font-serif font-black px-1 py-0.2 rounded border border-[#D6A84B]/40 shadow">
                            大葆台印
                          </div>
                        </div>
                      </div>

                      {/* 未完全展开时右侧的卷轴轴木 (跟随展开边缘移动) */}
                      {rollProgress < 0.96 && (
                        <div className="relative -ml-3.5 z-30 w-7 h-[220px] flex flex-col items-center justify-between pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                          {/* 轴端上首 */}
                          <div className="w-5 h-2.5 rounded-full bg-gradient-to-r from-[#1E0E08] via-[#5C321E] to-[#1E0E08] border border-[#D6A84B]/60 flex items-center justify-center">
                            <span className="w-1 h-1 rounded-full bg-[#D6A84B]" />
                          </div>
                          {/* 卷轴筒身 */}
                          <div className="w-4 h-48 rounded-sm bg-gradient-to-r from-[#120804] via-[#4A2616] to-[#0E0604] border-x border-[#6E3D24] relative flex flex-col justify-between py-2 items-center">
                            <div className="w-full h-3 bg-[#8C2B22] border-y border-[#D6A84B]/40" />
                            <span className="text-[5.5px] font-serif text-[#F1D98D] [writing-mode:vertical-rl] scale-75 opacity-80">
                              卷轴
                            </span>
                            <div className="w-full h-3 bg-[#8C2B22] border-y border-[#D6A84B]/40" />
                          </div>
                          {/* 轴端下首 */}
                          <div className="w-5 h-2.5 rounded-full bg-gradient-to-r from-[#1E0E08] via-[#5C321E] to-[#1E0E08] border border-[#D6A84B]/60 flex items-center justify-center">
                            <span className="w-1 h-1 rounded-full bg-[#D6A84B]" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ================= CARD BACK: 明信片背面 (邮戳、地址栏、寄语) ================= */}
                <div
                  className={`absolute inset-0 w-[325px] h-[215px] rounded-xl bg-[#F6F0E6] text-[#26160F] border-0 shadow-2xl p-2.5 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden ${
                    rollProgress <= 0.08 ? 'hidden' : ''
                  }`}
                >
                  {/* 邮编 & 瓦当邮票 */}
                  <div className="flex items-start justify-between pb-1 border-b border-[#6E432B]/20">
                    <div className="flex gap-0.5">
                      {['1', '0', '0', '0', '7', '0'].map((c, i) => (
                        <div
                          key={i}
                          className="w-3 h-3.5 border border-[#8C2B22] text-[#8C2B22] text-[7.5px] font-black flex items-center justify-center bg-white"
                        >
                          {c}
                        </div>
                      ))}
                    </div>

                    <div className="w-8 h-9 border border-dashed border-[#8C2B22] p-0.5 flex flex-col items-center justify-center text-center bg-[#FDF8F0]">
                      <span className="text-[5.5px] font-serif text-[#8C2B22] font-bold leading-tight">
                        大葆台
                      </span>
                      <span className="text-[5px] text-[#6E432B]">四神瓦当</span>
                    </div>
                  </div>

                  {/* 明信片寄语内容 */}
                  <div className="my-auto py-0.5 text-left space-y-0.5">
                    <p className="text-[8px] font-bold text-[#6E432B]">致未来的同行者：</p>
                    <p className="text-[7px] leading-relaxed text-[#3A2116]">
                      两千年前，我随广阳王与王后长眠于黄肠题凑；两千年后，考古学者拂去尘埃，你与我并肩穿行于七重记忆。
                    </p>
                    <p className="text-[7px] leading-relaxed text-[#3A2116]">
                      是考古研究唤醒了沉睡的文明，也是你的每一次驻足，让大汉的礼乐风华在今天重光。
                    </p>
                    <p className="text-[7px] text-right font-bold text-[#8C2B22]">
                      —— 白玉舞人 留念
                    </p>
                  </div>

                  {/* 底部信息与翻转 */}
                  <div className="flex items-center justify-between pt-0.5 border-t border-[#6E432B]/20 text-[6.5px] text-[#6E432B]">
                    <span>北京大葆台西汉墓遗址博物馆 永久典藏</span>
                    <span className="font-mono text-[#8C2B22]">DBT-WEST-HAN-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* framer-motion 手势微调触控滑轨 (支持手指滑动或拖拽精细控制) */}
            <div className="w-[325px] mt-2 flex flex-col items-center gap-1">
              <div className="w-full flex items-center justify-between text-[8px] font-serif text-[#C4A98B]">
                <span className="flex items-center gap-1 text-[#F1D98D]">
                  <Scroll className="w-2.5 h-2.5 text-[#D6A84B]" />
                  手指滑动卡片或拖动滑轨微调收卷
                </span>
                <span className="font-mono text-[#F1D98D] bg-[#1A0F0A] px-1.5 py-0.2 rounded border border-[#D6A84B]/30 shadow-sm">
                  开合度 {Math.round(rollProgress * 100)}%
                </span>
              </div>

              <div className="relative w-full flex items-center gap-2 px-0.5">
                <button
                  onClick={() => {
                    soundFX.playSandScratch();
                    setRollProgress(0);
                  }}
                  className="text-[7.5px] font-serif text-[#A89078] hover:text-[#F1D98D] shrink-0 active:scale-95"
                >
                  卷起
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(rollProgress * 100)}
                  onChange={(e) => {
                    setRollProgress(Number(e.target.value) / 100);
                  }}
                  className="w-full h-1.5 bg-[#2A160E] rounded-lg appearance-none cursor-pointer accent-[#D6A84B] border border-[#5A351E]/50"
                />
                <button
                  onClick={() => {
                    soundFX.playSandScratch();
                    setRollProgress(1);
                  }}
                  className="text-[7.5px] font-serif text-[#A89078] hover:text-[#F1D98D] shrink-0 active:scale-95"
                >
                  展开
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons (去边框，四角金线无多余干扰) */}
          <div className="relative z-20 flex flex-col gap-1.5 pt-1 max-w-xs mx-auto w-full">
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  soundFX.playSandScratch();
                  const next = rollProgress > 0.5 ? 0 : 1;
                  setRollProgress(next);
                  if (isCardFlipped) setIsCardFlipped(false);
                }}
                className="relative py-1.5 px-2 rounded-lg bg-[#2A170F] hover:bg-[#3D2319] border-0 text-[#F1D98D] text-[10px] font-serif font-bold flex items-center justify-center gap-1 shadow transition-all active:scale-95"
              >
                <Scroll className="w-3 h-3 text-[#D6A84B]" />
                <span>{rollProgress > 0.5 ? '卷起简册' : '展开简册'}</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playSandScratch();
                  if (!isCardFlipped && rollProgress < 0.3) {
                    setRollProgress(1);
                  }
                  setIsCardFlipped(!isCardFlipped);
                }}
                className="relative py-1.5 px-2 rounded-lg bg-[#2A170F] hover:bg-[#3D2319] border-0 text-[#F1D98D] text-[10px] font-serif font-bold flex items-center justify-center gap-1 shadow transition-all active:scale-95"
              >
                <RefreshCw className="w-3 h-3 text-[#D6A84B]" />
                <span>{isCardFlipped ? '翻至正面' : '翻至背面'}</span>
              </button>

              <button
                onClick={() => handleDownloadSide(isCardFlipped ? 'back' : 'front')}
                className="relative py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#6E3024] to-[#8C4334] border-0 text-[#F1D98D] text-[10px] font-serif font-bold flex items-center justify-center gap-1 shadow active:scale-95"
              >
                <Download className="w-3 h-3 text-[#F1D98D]" />
                <span>{isCardFlipped ? '下载背面' : '下载正面'}</span>
              </button>
            </div>

            {downloadSuccess && (
              <div className="p-1 rounded-md bg-[#1E2E20] border-0 text-[#79B9A1] text-[8.5px] text-center font-serif flex items-center justify-center gap-1 animate-fade-in relative">
                <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#79B9A1]" />
                <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#79B9A1]" />
                <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#79B9A1]" />
                <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#79B9A1]" />
                <CheckCircle2 className="w-3 h-3 text-[#79B9A1]" />
                <span>明信片已成功生成并保存至本地设备！</span>
              </div>
            )}

            <button
              onClick={() => {
                soundFX.playBronzeChime();
                onRestart();
              }}
              className="relative w-full py-1.5 rounded-lg bg-[#140E0A] hover:bg-[#241710] border-0 text-[#C4A98B] hover:text-[#F1D98D] text-[11px] font-serif flex items-center justify-center gap-1 transition-all"
            >
              <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#C8943D]" />
              <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#C8943D]" />
              <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#C8943D]" />
              <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#C8943D]" />
              <RotateCcw className="w-3 h-3" />
              <span>留守展厅 · 重游大葆台</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
