import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/soundEngine';
import { ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { DialogueLine } from '../types';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { WheelWeaponItem } from './SemiCircleWheel';
import { ArtifactTurntable } from './ArtifactTurntable';
import { STAGE_VIDEOS } from '../data/videoAssets';
import { VideoPlayerPlaceholder } from './VideoPlayerPlaceholder';
import { MuseumTombBackdrop } from './MuseumTombBackdrop';
import { MuseumAccessionRecord } from './MuseumAccessionRecord';
import { MuseumExhibitSign, ExhibitSignData } from './MuseumExhibitSign';
import { WEAPON_IMAGES } from '../data/weaponImages';
import { BambooSlipCollector } from './BambooSlipCollector';
import { ChapterVideoPageView } from './ChapterVideoPageView';
import { CHAPTER_PAGE_BACKGROUNDS } from '../config/assetRegistry';
import { useSmoothPhaseTransition } from '../utils/useSmoothPhaseTransition';
import warriorBrickImg from '../assets/images/han_warrior_brick_1788598169002.jpg';

// =========================================================================
// 🚨【图2/图3页面中心武舞舞者图片配置位置 (方便一键查找与替换)】🚨
// 提示：您可以直接替换下面的图片导入路径，或者将新图片命名为 stage1_wu_dancer_statue.jpg 放入 assets/images
// =========================================================================
import stage1WuDancerImg from '../assets/images/stage1_wu_dancer_statue.jpg';

// =========================================================================
// 🚨【第一章各页面背景底图路径配置中心 (方便一键查找与替换)】🚨
// =========================================================================
const STAGE1_BACKGROUNDS = CHAPTER_PAGE_BACKGROUNDS.stage1;

interface Stage1WeaponProps {
  onUnlockFragment: () => void;
  onNextPage: () => void;
  isUnlocked: boolean;
}

export const AVAILABLE_WEAPONS: WheelWeaponItem[] = [
  {
    id: 'w_ba_leng_gun',
    name: '错金银八棱棍',
    desc: '大葆台汉墓出土，铜铸八棱，通体错金银卷云纹，为汉代王侯护身与武舞所持之“干”礼器。',
    isCorrect: true,
    category: '干 (护身)',
    imageUrl: WEAPON_IMAGES.w_ba_leng_gun,
  },
  {
    id: 'w_tie_ji',
    name: '铁戟',
    desc: '出土于大葆台一号汉墓前室，铁铸长柄横刃利器，代表汉军阵前克敌破阵之威，为武舞中之“戚”。',
    isCorrect: true,
    category: '戚 (破阵)',
    imageUrl: WEAPON_IMAGES.w_tie_ji,
  },
  {
    id: 'w_huan_shou_dao',
    name: '环首铁刀',
    desc: '汉代实战佩刀，虽为利刃，但非大葆台祭天祈福武舞特备的核心仪仗。',
    isCorrect: false,
    category: '佩刀',
    imageUrl: WEAPON_IMAGES.w_huan_shou_dao,
  },
  {
    id: 'w_qing_tong_mao',
    name: '青铜长矛',
    desc: '先秦至秦汉刺兵，形制古朴，但未见于大葆台武舞干戚仪仗记录。',
    isCorrect: false,
    category: '刺兵',
    imageUrl: WEAPON_IMAGES.w_qing_tong_mao,
  },
  {
    id: 'w_zhu_qi_nu',
    name: '朱漆强弩',
    desc: '大葆台出土之精密远射强弩，用于守御与射远，非近身持舞之器。',
    isCorrect: false,
    category: '远射',
    imageUrl: WEAPON_IMAGES.w_zhu_qi_nu,
  },
];

// Left column items for Page 04 (for '干' slot)
const LEFT_CANDIDATES = [
  {
    id: 'left_0',
    name: '错金银八棱棍',
    isCorrect: true,
    role: '干',
    imageUrl: WEAPON_IMAGES.w_ba_leng_gun,
  },
  {
    id: 'left_1',
    name: '汉代组玉仪仗',
    isCorrect: false,
    role: '佩',
    imageUrl: WEAPON_IMAGES.w_huan_shou_dao,
  },
  {
    id: 'left_2',
    name: '漆画仪杖',
    isCorrect: false,
    role: '杖',
    imageUrl: WEAPON_IMAGES.w_zhu_qi_nu,
  },
];

// Right column items for Page 04 (for '戚' slot)
const RIGHT_CANDIDATES = [
  {
    id: 'right_0',
    name: '西汉铁戟',
    isCorrect: true,
    role: '戚',
    imageUrl: WEAPON_IMAGES.w_tie_ji,
  },
  {
    id: 'right_1',
    name: '青铜长矛',
    isCorrect: false,
    role: '矛',
    imageUrl: WEAPON_IMAGES.w_qing_tong_mao,
  },
  {
    id: 'right_2',
    name: '朱漆强弩',
    isCorrect: false,
    role: '弩',
    imageUrl: WEAPON_IMAGES.w_zhu_qi_nu,
  },
];

export const Stage1Weapon: React.FC<Stage1WeaponProps> = ({
  onUnlockFragment,
  onNextPage,
}) => {
  // 每一子页面转场统一控制在 0.5 秒左右（240ms 柔和淡出 -> 瞬时切换 -> 260ms 柔和淡入）
  const { phase, setPhase, transitionStyle } = useSmoothPhaseTransition<
    'guide' | 'video' | 'page04_anomaly' | 'page05_wheel' | 'page06_restored' | 'bamboo_slip' | 'transition'
  >('guide');

  const [selectedWeaponIds, setSelectedWeaponIds] = useState<string[]>([]);
  const [errorTip, setErrorTip] = useState<string>('');
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitSignData | null>(null);
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);

  // Scroll indices for Page 04
  const [leftIndex, setLeftIndex] = useState<number>(0);
  const [rightIndex, setRightIndex] = useState<number>(0);

  useEffect(() => {
    soundFX.playStoneDrum();
  }, []);

  const handleToggleWeapon = (item: WheelWeaponItem) => {
    setErrorTip('');
    if (selectedWeaponIds.includes(item.id)) {
      setSelectedWeaponIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      if (selectedWeaponIds.length >= 2) {
        setSelectedWeaponIds([selectedWeaponIds[1], item.id]);
      } else {
        setSelectedWeaponIds((prev) => [...prev, item.id]);
      }
    }
  };

  const handleConfirmWeapons = () => {
    if (selectedWeaponIds.length < 2) {
      setErrorTip('请转动转盘，选两件武器填入槽位。');
      return;
    }

    const hasGan = selectedWeaponIds.includes('w_ba_leng_gun');
    const hasQi = selectedWeaponIds.includes('w_tie_ji');

    if (hasGan && hasQi) {
      soundFX.playMemoryRestore();
      soundFX.playBronzeChime();
      setErrorTip('');
      onUnlockFragment();
      setPhase('bamboo_slip');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('与武舞“干戚”形制不符，请再推敲。');
    }
  };

  const selectedWeapons = selectedWeaponIds
    .map((id) => AVAILABLE_WEAPONS.find((w) => w.id === id))
    .filter(Boolean) as WheelWeaponItem[];

  // 🚨【前序页面玉舞人对话框内容完整并入本页】
  const DIALOGUES_PAGE04: DialogueLine[] = [
    {
      speaker: 'dancer',
      speakerName: '玉舞人',
      text: '你自温润美玉中苏醒，两千年汉代记忆在此封存。你是谁，从何而来，又属于谁？',
    },
    {
      speaker: 'dancer',
      speakerName: '玉舞人',
      text: '此乃大葆台汉家武舞。舞姿残损，双手空悬！汉家武舞必执“干戚”，方显雄威。',
    },
  ];

  const DIALOGUES_PAGE06: DialogueLine[] = [
    {
      speaker: 'dancer',
      speakerName: '玉舞人',
      text: '八棱棍为干，铁戟为戚。干戚归位，武舞雄风重现大汉！',
    },
  ];

  return (
    <div
      className="relative w-full h-full bg-[#110907] text-[#E6D3AA] font-serif overflow-hidden select-none flex flex-col justify-between"
      style={transitionStyle}
    >
      {/* =========================================================================
          STEP 0: 引导页 - 戈舞出征 (与图1设计完全对齐：单纯标题与背景底图)
          ========================================================================= */}
      {phase === 'guide' && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-3 pb-4 animate-fade-in overflow-hidden">
          {/* 引导页背景底图 - 80% 遮罩与汉代壁画粗粝砂石纹 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={STAGE1_BACKGROUNDS.page0_guide}
              alt="汉代武舞汉画"
              className="w-full h-full object-cover filter brightness-[0.55] contrast-110 saturate-90 scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-[#0B0806]/80" />
            <div className="han-mural-texture opacity-75" />
          </div>

          <HanMuseumTopBar />

          {/* 标题 & 小字 */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-3 px-4 max-w-sm mx-auto">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#F1D98D] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              戈舞出征
            </h2>
            <p className="text-xs sm:text-sm font-serif text-[#E6D3AA] tracking-[0.2em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              武舞干戚 · 汉家威仪
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84B] to-transparent" />
          </div>

          {/* 底部按钮 */}
          <div className="relative z-10 w-full max-w-xs mx-auto space-y-2 pb-2">
            <HanPlaqueButton
              onClick={() => {
                soundFX.playStoneDrum();
                setPhase('video');
              }}
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
            >
              观摩干戚武舞 · 感悟汉威
            </HanPlaqueButton>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 1: 武舞视频页面 (恢复原样：全幅舞蹈视频展示，80%遮罩背景底图，右上角跳过，底部完成按钮)
          ========================================================================= */}
      {phase === 'video' && (
        <ChapterVideoPageView
          chapterNumber="01"
          englishTitle="DANCE OF WAR"
          chineseTitle="戈 舞 出 征"
          subtitle="广阳王出征祈福 · 干戚武舞"
          videoSrc={STAGE_VIDEOS.stage1_weapon.url}
          videoAssetPathHint="public/assets/videos/wu_dance.mp4"
          // 🚨【PAGE 1: 武舞视频播放页背景底图 - 80% 遮罩】🚨
          bgImage={STAGE1_BACKGROUNDS.page1_video}
          palette="weapon"
          completeButtonText="完成观看 · 步入武舞演场"
          onSkip={() => {
            soundFX.playStoneDrum();
            setPhase('page04_anomaly');
          }}
          onComplete={() => {
            soundFX.playStoneDrum();
            setPhase('page04_anomaly');
          }}
        />
      )}

      {/* =========================================================================
          PAGE 04: 舞姿残损 · 舞者图片放大到整个页面，其余不变 (左右虚线框、顶栏与底部玉舞人对话框)
          ========================================================================= */}
      {phase === 'page04_anomaly' && (
        <div className="relative w-full h-full animate-fade-in overflow-hidden bg-[#110907]">
          <MuseumTombBackdrop palette="weapon" pattern="brick" spotlight={true} intensity="subtle" />

          {/* 
            =====================================================================
            🚨【图4 舞者图片放大到整个页面】：舞者雕像大图居中充满整个手机屏幕，
            其余不变（左右虚线武器框、顶部标题栏、底部玉舞人对话框均保持不变）
            =====================================================================
          */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <img
              src={stage1WuDancerImg}
              alt="大葆台武舞女俑展陈雕像"
              className="w-full h-full object-cover sm:object-contain object-center scale-105 sm:scale-110 filter drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] contrast-[1.08] brightness-[0.92]"
            />
            {/* 暗黑红棕渐变与聚光暗角，确保左右两虚线框及文字对话框极其清晰 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#110907]/65 via-[#110907]/20 to-[#110907]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,168,75,0.08)_0%,transparent_75%)] pointer-events-none" />
          </div>

          {/* 左右两侧的虚线武器框保持不变，浮于大图两侧 */}
          <div className="absolute inset-0 z-10 flex items-center justify-between px-3 sm:px-6 pointer-events-none select-none">
            {/* Left Dashed Weapon Outline (「干」槽位 · 虚线轮廓 + 问号) */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-16 sm:w-20 h-44 sm:h-52 rounded-xl border-2 border-dashed border-[#D6A84B]/50 bg-gradient-to-b from-[#2A160E]/60 via-transparent to-[#1C0F0A]/60 flex flex-col items-center justify-center p-2 shadow-[0_0_20px_rgba(214,168,75,0.15)] backdrop-blur-[1px]">
                {/* Dashed Weapon Rod / Shield Silhouette Path */}
                <svg viewBox="0 0 40 100" className="w-10 h-28 opacity-40 text-[#D6A84B]">
                  <rect x="16" y="6" width="8" height="88" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="20" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="20" cy="90" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
                {/* Glowing Question Mark inside Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-[#F1D98D] animate-pulse drop-shadow-[0_0_10px_rgba(241,217,141,0.7)]">
                    ?
                  </span>
                </div>
                <div className="absolute bottom-2 px-1.5 py-0.5 rounded-full bg-[#180C07]/90 border border-[#D6A84B]/40 text-[8px] font-mono text-[#F1D98D]">
                  「干」空位
                </div>
              </div>
            </div>

            {/* Right Dashed Weapon Outline (「戚」槽位 · 虚线轮廓 + 问号) */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-16 sm:w-20 h-44 sm:h-52 rounded-xl border-2 border-dashed border-[#D6A84B]/50 bg-gradient-to-b from-[#2A160E]/60 via-transparent to-[#1C0F0A]/60 flex flex-col items-center justify-center p-2 shadow-[0_0_20px_rgba(214,168,75,0.15)] backdrop-blur-[1px]">
                {/* Dashed Weapon Halberd Silhouette Path */}
                <svg viewBox="0 0 40 100" className="w-10 h-28 opacity-40 text-[#D6A84B]">
                  <rect x="18" y="10" width="4" height="84" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" />
                  {/* Horizontal Cross Blade */}
                  <path d="M8 26 L32 24 C30 20, 24 16, 20 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
                  <path d="M10 26 L12 36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
                {/* Glowing Question Mark inside Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-[#F1D98D] animate-pulse drop-shadow-[0_0_10px_rgba(241,217,141,0.7)]">
                    ?
                  </span>
                </div>
                <div className="absolute bottom-2 px-1.5 py-0.5 rounded-full bg-[#180C07]/90 border border-[#D6A84B]/40 text-[8px] font-mono text-[#F1D98D]">
                  「戚」空位
                </div>
              </div>
            </div>
          </div>

          {/* Top Museum Bar & Header Title */}
          <div className="relative z-20 p-3 pt-2">
            <HanMuseumTopBar />
            <div className="pt-1 pb-1 text-center">
              <span className="text-[9px] text-[#A89078] font-mono tracking-[0.25em] uppercase block">
                POSTURE CORRUPTED
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#F1D98D] tracking-[0.3em] font-serif pl-[0.3em]">
                舞姿残损 · 寻觅干戚
              </h2>
            </div>
          </div>

          {/* Bottom Dialogue Box: 🚨【图4玉舞人聊天框保持在页面最下方】🚨 */}
          <div className="absolute inset-x-0 bottom-0 z-30">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_PAGE04}
              currentIndex={dialogueIdx}
              onNext={() => {
                if (dialogueIdx < DIALOGUES_PAGE04.length - 1) {
                  soundFX.playStoneDrum();
                  setDialogueIdx(dialogueIdx + 1);
                } else {
                  soundFX.playStoneDrum();
                  setPhase('page05_wheel');
                }
              }}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 05: 文物转台选配武舞 (圆形旋转转台，暗金纹路，选中文物上升打光，确认按键在提示框之上)
          ========================================================================= */}
      {phase === 'page05_wheel' && (
        <div className="relative w-full h-full flex flex-col justify-between animate-fade-in p-2.5 pb-2 overflow-hidden bg-[#110907]">
          <MuseumTombBackdrop palette="weapon" pattern="cloud" spotlight={true} intensity="subtle" />

          {/* Top Museum Header */}
          <HanMuseumTopBar />

          {/* Title */}
          <div className="relative z-10 pt-0.5 pb-0.5 text-center">
            <span className="text-[9px] text-[#A89078] font-mono tracking-[0.25em] uppercase block">
              ARTIFACT TURNTABLE
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#F1D98D] tracking-[0.3em] font-serif pl-[0.3em]">
              转盘选配武舞
            </h2>
          </div>

          {/* Top Selected Slots (紧凑卡位，让转盘最大化充满手机屏幕) */}
          <div className="relative z-10 flex items-center justify-center gap-2 px-1 mb-0.5">
            {/* Slot 1: 【干】 */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`w-full h-12 sm:h-13 rounded-md transition-all flex items-center justify-center p-1 text-center ${
                  selectedWeapons[0]
                    ? 'bg-gradient-to-b from-[#3D2015]/95 to-[#1C0F0A]/95 shadow-[0_0_12px_rgba(214,168,75,0.4)] border border-[#D6A84B]/40'
                    : 'bg-[#1A0E09]/70 border border-[#3A2216]/50'
                }`}
              >
                {selectedWeapons[0] ? (
                  <div className="flex items-center gap-1.5 w-full px-1">
                    <div className="w-7 h-10 flex items-center justify-center shrink-0">
                      <img
                        src={selectedWeapons[0].imageUrl}
                        alt={selectedWeapons[0].name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-9 object-contain filter drop-shadow animate-pulse"
                      />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden flex-1">
                      <span className="text-[7.5px] font-mono text-[#D6A84B]">【干】已装配</span>
                      <span className="text-[9.5px] font-serif font-black text-[#F1D98D] truncate">
                        {selectedWeapons[0].name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-[#8C6D46]">
                    <span className="text-[10px] font-bold text-[#C8943D]">【干】槽位</span>
                    <span className="text-[7px] text-[#A89078]">转台点选武器</span>
                  </div>
                )}
              </div>
            </div>

            {/* Slot 2: 【戚】 */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`w-full h-12 sm:h-13 rounded-md transition-all flex items-center justify-center p-1 text-center ${
                  selectedWeapons[1]
                    ? 'bg-gradient-to-b from-[#3D2015]/95 to-[#1C0F0A]/95 shadow-[0_0_12px_rgba(214,168,75,0.4)] border border-[#D6A84B]/40'
                    : 'bg-[#1A0E09]/70 border border-[#3A2216]/50'
                }`}
              >
                {selectedWeapons[1] ? (
                  <div className="flex items-center gap-1.5 w-full px-1">
                    <div className="w-7 h-10 flex items-center justify-center shrink-0">
                      <img
                        src={selectedWeapons[1].imageUrl}
                        alt={selectedWeapons[1].name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-9 object-contain filter drop-shadow animate-pulse"
                      />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden flex-1">
                      <span className="text-[7.5px] font-mono text-[#D6A84B]">【戚】已装配</span>
                      <span className="text-[9.5px] font-serif font-black text-[#F1D98D] truncate">
                        {selectedWeapons[1].name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-[#8C6D46]">
                    <span className="text-[10px] font-bold text-[#C8943D]">【戚】槽位</span>
                    <span className="text-[7px] text-[#A89078]">转台点选武器</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 
            =====================================================================
            【博物馆圆形旋转“文物转台”】:
            - 转台在所有道具图片的下一图层
            - 圆环中央是上一页武舞人物缩小版图片
            - 5件真实文物去背景
            - 暗金纹路不显眼，绕中心旋转出极细金迹
            - 在一条线上露2/3，点选上升起露全貌，左上角微光打亮
            - 确认按键置于提示框之上，绝不被遮挡
            ===================================================================== 
          */}
          <div className="relative z-10 my-auto w-full flex flex-col items-center">
            <ArtifactTurntable
              items={AVAILABLE_WEAPONS}
              selectedIds={selectedWeaponIds}
              maxSelect={2}
              onToggleSelect={handleToggleWeapon}
              onConfirm={handleConfirmWeapons}
              canConfirm={selectedWeaponIds.length >= 2}
            />
          </div>

          {/* Bottom Dialogue Box with Hints & Errors: 确认按键在上方，绝不遮挡 */}
          <div className="relative z-20 w-full shrink-0">
            <UnifiedDialogueBox
              isInteractiveMode={true}
              hints={[
                '武舞当持一“干”（护身）与一“戚”（破阵）。',
                '错金银八棱棍为干，铁戟横刃为戚。',
                '转动转盘，选出八棱棍与铁戟填入槽位。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 07: 记忆恢复 · 竹简收集 (第一章 错金银八棱棍与铁戟，融合玉舞人对白框)
          ========================================================================= */}
      {phase === 'bamboo_slip' && (
        <div className="absolute inset-0 z-50 bg-[#0B0806]/95 backdrop-blur-md flex flex-col items-center justify-center p-2 animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={1}
            customBgType="default"
            dialogues={DIALOGUES_PAGE06}
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
