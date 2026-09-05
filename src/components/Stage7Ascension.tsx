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
} from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar, HanCloudTitle } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { StarweaversAtlas } from './StarweaversAtlas';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import { CHAPTER_BACKGROUNDS } from '../config/assetRegistry';
import { BambooSlipCollector } from './BambooSlipCollector';

interface Stage7AscensionProps {
  onUnlockFragment: () => void;
  onRestart: () => void;
  isUnlocked: boolean;
}

const DIALOGUES_STAGE7_INTRO: DialogueLine[] = [
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '在汉代人的宇宙里，生命并未在墓中终结。他们相信人死后，灵魂会进入更广阔的世界，甚至升入星宿与仙境。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我好像想起来了……我们被放入墓室，不是为了被遗忘，而是为了在另一个世界继续起舞、继续陪伴。可最后这一步，还需要把星辰连起来。',
  },
];

const DIALOGUES_MODERN_HALL: DialogueLine[] = [
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '这里是……两千年后的现代展厅？那些戴着白手套、拿着毛刷与细笔的考古学者，原来是他们拂去地宫的泥土，将破碎的我们一片片拼合、研究、安放在明亮的展柜里……',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '是现代的考古人员，帮我找回了沉睡两千年的记忆；也是你——亲爱的观众，跟随我走过了这七段记忆之路，重新点亮了汉代的戈舞、宴乐、百戏、黄肠题凑与星宿。',
  },
  {
    speaker: 'dancer',
    speakerName: '玉舞人',
    text: '我要继续留在这座现代展厅里，守护大汉的记忆，为每一个来到大葆台的人诉说两千年前的故事。谢谢你，陪我找回这一路的记忆卡片！',
  },
  {
    speaker: 'narrator',
    speakerName: '旁白',
    text: '两千年的光阴流转，大葆台汉墓的记忆在考古与传承中重光。谨以此双面纪念明信片，致敬每一位守护华夏文脉的探索者与同行人。',
  },
];

export const Stage7Ascension: React.FC<Stage7AscensionProps> = ({
  onUnlockFragment,
  onRestart,
  isUnlocked,
}) => {
  const [phase, setPhase] = useState<
    | 'guide'
    | 'intro'
    | 'interactive'
    | 'success_dialogue'
    | 'bamboo_slip'
    | 'modern_hall'
    | 'postcard_end'
  >('guide');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);
  const [errorTip, setErrorTip] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(isUnlocked);

  // Postcard State
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

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
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#26160F');
      grad.addColorStop(0.5, '#3A1E14');
      grad.addColorStop(1, '#140A06');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#D6A84B';
      ctx.lineWidth = 4;
      ctx.strokeRect(18, 18, width - 36, height - 36);
      ctx.strokeStyle = '#8C6D46';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(26, 26, width - 52, height - 52);

      ctx.fillStyle = '#F1D98D';
      ctx.font = 'bold 26px serif';
      ctx.textAlign = 'center';
      ctx.fillText('大漢風華 · 記憶重光', width / 2, 80);

      ctx.fillStyle = '#C8943D';
      ctx.font = '14px serif';
      ctx.fillText('北京大葆台西漢墓 · 探索紀念明信片', width / 2, 110);

      ctx.save();
      ctx.strokeStyle = '#79B9A1';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(121,185,161,0.6)';
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.moveTo(300, 240);
      ctx.bezierCurveTo(270, 280, 330, 310, 300, 350);
      ctx.bezierCurveTo(250, 400, 190, 450, 140, 400);
      ctx.bezierCurveTo(90, 350, 140, 290, 200, 310);
      ctx.bezierCurveTo(250, 330, 280, 380, 290, 420);
      ctx.bezierCurveTo(300, 480, 260, 560, 240, 620);
      ctx.bezierCurveTo(210, 700, 300, 750, 360, 740);
      ctx.bezierCurveTo(430, 730, 390, 640, 350, 570);
      ctx.bezierCurveTo(410, 540, 490, 480, 510, 380);
      ctx.bezierCurveTo(530, 280, 420, 240, 360, 290);
      ctx.stroke();

      ctx.fillStyle = '#E6D3AA';
      ctx.beginPath();
      ctx.arc(300, 240, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#F1D98D';
      ctx.font = 'bold 20px serif';
      ctx.textAlign = 'center';
      ctx.fillText('白玉舞人 · 翹袖折腰', width / 2, 720);

      ctx.fillStyle = '#A89078';
      ctx.font = '13px serif';
      ctx.fillText('大葆台一號漢墓出土 · 七重記憶全收錄', width / 2, 750);
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
                setPhase('intro');
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

      {/* STEP 1: 终章开场对白 (去除 pb-36) */}
      {phase === 'intro' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-1 pb-1">
            <HanCloudTitle title="第七章 · 星宿与升仙" />
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2.5">
            <div className="w-18 h-18 rounded-full bg-[#2E1A11]/80 border-0 relative flex items-center justify-center shadow-[0_0_25px_rgba(214,168,75,0.4)] animate-pulse">
              <Compass className="w-9 h-9 text-[#F1D98D]" />
            </div>
            <div className="text-center space-y-0.5">
              <span className="text-[9.5px] font-mono text-[#C8943D]">汉代宇宙观 · 灵魂归宿</span>
              <h3 className="text-sm font-black text-[#F1D98D]">星汉灿烂 · 升入仙宫</h3>
            </div>
          </div>

          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_STAGE7_INTRO}
              currentIndex={dialogueIdx}
              onNext={() => {
                if (dialogueIdx < DIALOGUES_STAGE7_INTRO.length - 1) {
                  setDialogueIdx(dialogueIdx + 1);
                } else {
                  soundFX.playStoneDrum();
                  setPhase('interactive');
                }
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 2: 交互：神仙幻想·观星像 (去除 pb-36，适配屏幕) */}
      {phase === 'interactive' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2.5 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5">
            <HanCloudTitle title="神仙幻想 · 观星像" />
          </div>

          {/* Starweaver's Atlas Canvas Interactive Container */}
          <div className="relative my-auto w-full flex items-center justify-center">
            <StarweaversAtlas
              onCompleteBeidou={() => {
                soundFX.playMemoryRestore();
                setIsSuccess(true);
                onUnlockFragment();
                setPhase('success_dialogue');
              }}
              onErrorTip={(tip) => setErrorTip(tip)}
            />
          </div>

          <div className="relative z-40 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '已在进入时先开启舞蹈视频弹窗；如需回看，可随时点击右上角【再次观看舞姿，获取指引】。',
                '夜空背景为自由运动的星辰粒子，请观察不断闪烁的黄色五大星宿，依序点击连接：【天枢 ➔ 天璇 ➔ 天玑 ➔ 天权 ➔ 玉衡】。',
                '完成五星连缀即可点亮第七枚记忆卡片，引渡大汉乐舞灵魂升入璀璨星汉！',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* STEP 3: 连星成功，七块记忆碎片合体 (无边框无角线) */}
      {phase === 'success_dialogue' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-2 animate-fade-in overflow-hidden">
          <HanMuseumTopBar />

          <div className="relative my-auto flex flex-col items-center justify-center space-y-2.5">
            <div className="w-18 h-18 rounded-full bg-[#1E2E20] border-0 relative flex items-center justify-center shadow-[0_0_25px_rgba(121,185,161,0.8)] animate-pulse">
              <Sparkles className="w-9 h-9 text-[#79B9A1]" />
            </div>
            <div className="text-center">
              <span className="text-[9px] font-mono text-[#79B9A1] bg-[#121E14] px-2.5 py-0.5 rounded-full border-0">
                七大碎片全部点亮 · 记忆重构完成
              </span>
              <h3 className="text-sm font-black text-[#F1D98D] mt-1.5">
                星路贯通 · 时空流转
              </h3>
            </div>
          </div>

          <div className="relative z-30 w-full max-w-xs mx-auto">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playBronzeChime();
                setPhase('bamboo_slip');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              重构记忆 · 收录星宿竹简 ➔
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* STEP 3.5: 记忆恢复·竹简收集 (第七章专属星宿流光动画) */}
      {phase === 'bamboo_slip' && (
        <BambooSlipCollector
          stageNumber={7}
          customBgType="cosmos_stars"
          onProceed={() => {
            soundFX.playBronzeChime();
            setDialogueIdx(0);
            setPhase('modern_hall');
          }}
        />
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

            {/* Glowing Jade Dancer in Center */}
            <div className="relative my-auto flex flex-col items-center justify-center space-y-1">
              <div className="relative w-20 h-20 rounded-full bg-black/50 border-0 flex items-center justify-center shadow-[0_0_30px_rgba(121,185,161,0.6)]">
                <svg viewBox="0 0 100 120" className="w-14 h-14 filter drop-shadow animate-pulse">
                  <path
                    d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                    fill="none"
                    stroke="#79B9A1"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="18" r="5" fill="#E6D3AA" />
                </svg>
              </div>

              <div className="text-center">
                <h4 className="text-xs font-serif font-black text-[#F1D98D]">
                  白玉舞人 · 留守展厅
                </h4>
                <p className="text-[8.5px] text-[#E6D3AA]/80">
                  致敬考古工作者与文物保护专家
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
          <HanMuseumTopBar />

          <div className="relative z-10 pt-0.5 pb-0.5 text-center">
            <HanCloudTitle title="大汉风华 · 专属纪念明信片" />
            <p className="text-[8.5px] text-[#C4A98B]">
              点击明信片翻转双面 · 保存您的专属大葆台探索纪念
            </p>
          </div>

          {/* 3D Flip Card Container */}
          <div
            className="relative w-full max-w-xs mx-auto aspect-[3/3.8] my-auto cursor-pointer select-none [perspective:1200px]"
            onClick={() => {
              soundFX.playSandScratch();
              setIsCardFlipped(!isCardFlipped);
            }}
          >
            <div
              className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
                isCardFlipped ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              {/* ================= CARD FRONT (无边框，无角线) ================= */}
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#2E1A11] via-[#1E110A] to-[#120A07] border-0 shadow-2xl p-3 flex flex-col justify-between [backface-visibility:hidden]">
                {/* Top Border Decor */}
                <div className="flex items-center justify-between pb-1 border-b border-[#D6A84B]/20">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F1D98D]" />
                    <span className="text-[9.5px] font-serif font-bold text-[#F1D98D]">
                      大汉风华 · 记忆重光
                    </span>
                  </div>
                  <span className="text-[7.5px] font-mono text-[#D6A84B] bg-black/60 px-2 py-0.5 rounded-full">
                    正面
                  </span>
                </div>

                {/* Central Emblem */}
                <div className="relative my-auto flex flex-col items-center justify-center space-y-1">
                  <div className="relative w-20 h-20 rounded-full bg-black/70 border-0 flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 100 120" className="w-14 h-14 filter drop-shadow">
                      <path
                        d="M50 15 C45 22, 55 25, 50 32 C42 42, 30 50, 20 40 C12 32, 22 20, 32 24 C40 28, 45 35, 48 42 C50 55, 42 70, 38 85 C32 100, 48 112, 60 110 C72 108, 65 92, 58 80 C68 75, 82 62, 85 45 C88 28, 70 20, 60 30 C55 35, 62 48, 54 58"
                        fill="none"
                        stroke="#79B9A1"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <circle cx="50" cy="18" r="5" fill="#E6D3AA" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xs font-serif font-black text-[#F1D98D] tracking-widest">
                      白玉舞人 · 记忆全收录
                    </h3>
                    <p className="text-[8px] text-[#C4A98B]">
                      大葆台西汉墓 7/7 记忆碎片完满复原
                    </p>
                  </div>
                </div>

                {/* Red Seal & Card Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-[#D6A84B]/20 text-[7.5px] font-serif">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 bg-[#8C2B22] rounded text-[6.5px] text-white flex items-center justify-center font-bold">
                      大葆台
                    </div>
                    <div className="text-left leading-tight text-[#D6A84B]">
                      <p className="font-bold">北京大葆台西汉墓博物馆</p>
                    </div>
                  </div>
                  <span className="text-[7px] font-mono text-[#79B9A1]">
                    [点击翻转背面]
                  </span>
                </div>
              </div>

              {/* ================= CARD BACK (无边框，无角线) ================= */}
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#F6F0E6] text-[#26160F] border-0 shadow-2xl p-3 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                {/* Top Code & Stamp */}
                <div className="flex items-start justify-between pb-1 border-b border-[#6E432B]/20">
                  <div className="flex gap-0.5">
                    {['1', '0', '0', '0', '7', '0'].map((c, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-4 border border-[#8C2B22] text-[#8C2B22] text-[8px] font-black flex items-center justify-center bg-white"
                      >
                        {c}
                      </div>
                    ))}
                  </div>

                  <div className="w-10 h-11 border border-dashed border-[#8C2B22] p-0.5 flex flex-col items-center justify-center text-center bg-[#FDF8F0]">
                    <span className="text-[6px] font-serif text-[#8C2B22] font-bold leading-tight">
                      大葆台
                    </span>
                    <span className="text-[5.5px] text-[#6E432B]">四神瓦当</span>
                  </div>
                </div>

                {/* Postcard Message Body */}
                <div className="my-auto py-0.5 text-left space-y-1">
                  <p className="text-[9px] font-bold text-[#6E432B]">致未来的同行者：</p>
                  <p className="text-[8px] leading-relaxed text-[#3A2116]">
                    两千年前，我随广阳王与王后长眠于黄肠题凑；两千年后，考古学者拂去尘埃，你与我并肩穿行于七重记忆。
                  </p>
                  <p className="text-[8px] leading-relaxed text-[#3A2116]">
                    是考古研究唤醒了沉睡的文明，也是你的每一次驻足，让大汉的礼乐风华在今天重光。
                  </p>
                  <p className="text-[8px] text-right font-bold text-[#8C2B22]">
                    —— 白玉舞人 留念
                  </p>
                </div>

                {/* Postcard Bottom Stamp & Label */}
                <div className="flex items-center justify-between pt-1 border-t border-[#6E432B]/20 text-[7px] text-[#6E432B]">
                  <span>北京大葆台西汉墓遗址博物馆</span>
                  <span className="font-mono text-[#8C2B22]">[点击翻转正面]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons (无边框，无角线) */}
          <div className="relative z-20 flex flex-col gap-1.5 pt-1 max-w-xs mx-auto w-full">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  soundFX.playSandScratch();
                  setIsCardFlipped(!isCardFlipped);
                }}
                className="relative py-1.5 px-2.5 rounded-lg bg-[#2A170F] hover:bg-[#3D2319] border-0 text-[#F1D98D] text-[11px] font-serif font-black flex items-center justify-center gap-1 shadow transition-all active:scale-95"
              >
                <RefreshCw className="w-3 h-3 text-[#D6A84B]" />
                <span>{isCardFlipped ? '翻至正面' : '翻至背面'}</span>
              </button>

              <button
                onClick={() => handleDownloadSide(isCardFlipped ? 'back' : 'front')}
                className="relative py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-[#6E3024] to-[#8C4334] border-0 text-[#F1D98D] text-[11px] font-serif font-black flex items-center justify-center gap-1 shadow active:scale-95"
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
