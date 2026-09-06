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
import warriorBrickImg from '../assets/images/han_warrior_brick_1788598169002.jpg';

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
  const [phase, setPhase] = useState<
    'page03_battlefield' | 'page04_anomaly' | 'page05_wheel' | 'page06_restored' | 'bamboo_slip' | 'transition'
  >('page03_battlefield');

  const [selectedWeaponIds, setSelectedWeaponIds] = useState<string[]>([]);
  const [errorTip, setErrorTip] = useState<string>('');
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitSignData | null>(null);

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
      setErrorTip('请在转盘上旋转并点选两件武器填入干戚槽位！');
      return;
    }

    const hasGan = selectedWeaponIds.includes('w_ba_leng_gun');
    const hasQi = selectedWeaponIds.includes('w_tie_ji');

    if (hasGan && hasQi) {
      soundFX.playMemoryRestore();
      soundFX.playBronzeChime();
      setErrorTip('');
      onUnlockFragment();
      setPhase('page06_restored');
    } else {
      soundFX.playGlitchStatic();
      setErrorTip('选配之物与汉代武舞“干戚”形制不符，再转动转盘推敲一番……');
    }
  };

  const selectedWeapons = selectedWeaponIds
    .map((id) => AVAILABLE_WEAPONS.find((w) => w.id === id))
    .filter(Boolean) as WheelWeaponItem[];

  const DIALOGUES_PAGE04: DialogueLine[] = [
    {
      speaker: 'dancer',
      speakerName: '玉舞人',
      text: '等一等……这里的舞姿不对。画像砖上的武舞者左右手均大开，手中空空如也。武舞必执干戚，左干右戚，方能展汉家之威。',
    },
  ];

  const DIALOGUES_PAGE06: DialogueLine[] = [
    {
      speaker: 'dancer',
      speakerName: '玉舞人',
      text: '它们来了……舞者的手中，终于有了干戚。错金银八棱棍为干，铁戟为戚，武舞的刚劲雄浑终于重新在大汉天地间复苏。',
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#110907] text-[#E6D3AA] font-serif overflow-hidden select-none flex flex-col justify-between">
      {/* =========================================================================
          PAGE 03: 戈舞出征视频 (全屏无边框页面，底图80%遮罩，壁画粗粝砂石质感)
          ========================================================================= */}
      {phase === 'page03_battlefield' && (
        <ChapterVideoPageView
          chapterNumber="01"
          englishTitle="DANCE OF WAR"
          chineseTitle="戈 舞 出 征"
          subtitle="广阳王出征祈福 · 干戚武舞"
          videoSrc={STAGE_VIDEOS.stage1_weapon.url}
          videoAssetPathHint="public/assets/videos/wu_dance.mp4"
          // 🚨【PAGE 03: 戈舞视频播放页背景底图 - 80% 遮罩 (可直接替换)】🚨
          bgImage={STAGE1_BACKGROUNDS.page1_video}
          palette="weapon"
          completeButtonText="完成观看 · 察看武舞残损"
          onSkip={() => setPhase('page04_anomaly')}
          onComplete={() => setPhase('page04_anomaly')}
        />
      )}

      {/* =========================================================================
          PAGE 04: 舞姿残损 · 居中破损画像砖背景底图 + 左右各3件悬浮文物剪影
          ========================================================================= */}
      {phase === 'page04_anomaly' && (
        <div className="relative w-full h-full flex flex-col justify-between animate-fade-in p-3 pb-2 overflow-hidden bg-[#110907]">
          <MuseumTombBackdrop palette="weapon" pattern="brick" spotlight={true} intensity="subtle" />

          {/* Top Museum Bar */}
          <HanMuseumTopBar />

          {/* Header Title */}
          <div className="relative z-10 pt-0.5 pb-0.5 text-center">
            <span className="text-[9px] text-[#A89078] font-mono tracking-[0.25em] uppercase block">
              POSTURE CORRUPTED
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#F1D98D] tracking-[0.3em] font-serif pl-[0.3em]">
              舞姿残损 · 寻觅干戚
            </h2>
          </div>

          {/* 
            =====================================================================
            【居中破损画像砖底图 + 屏幕左右两旁悬浮真实文物图片(左3右3，虚线剪影，可上下滑动)】：
            排版调整：整体适度上提，消除顶部空旷感，合理分配上下纵向节奏，
            底部保留安全间距（mb-auto 与 pb-3），确保绝不触碰下方对白框上边界。
            =====================================================================
          */}
          <div className="relative z-10 flex-1 flex items-center justify-between px-1.5 w-full mt-1 sm:mt-2 mb-auto pb-3">
            {/* Left 3 Floating Artifacts (for '干' - 护身) */}
            <div className="flex flex-col items-center justify-center w-20 z-20">
              <button
                onClick={() => {
                  soundFX.playSandScratch();
                  setLeftIndex((prev) => (prev > 0 ? prev - 1 : LEFT_CANDIDATES.length - 1));
                }}
                className="text-[#C8943D]/70 hover:text-[#F1D98D] p-1 active:scale-90 transition-transform"
                title="向上滑动"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center space-y-1.5 py-1">
                {LEFT_CANDIDATES.map((cand, idx) => {
                  const isCentered = idx === leftIndex;
                  return (
                    <div
                      key={cand.id}
                      onClick={() => {
                        soundFX.playBronzeChime();
                        setLeftIndex(idx);
                      }}
                      className={`relative w-16 h-14 rounded-md border-0 flex flex-col items-center justify-center p-1 transition-all duration-300 cursor-pointer ${
                        isCentered
                          ? 'opacity-100 scale-105 bg-[#2A160E]/80 shadow-[0_0_12px_rgba(200,148,61,0.3)]'
                          : 'opacity-40 scale-90 bg-black/40'
                      }`}
                    >
                      <img
                        src={cand.imageUrl}
                        alt={cand.name}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-8 object-contain filter drop-shadow"
                      />
                      <span className="text-[8px] font-serif tracking-wider text-[#E6D3AA] mt-0.5 truncate w-full text-center">
                        {cand.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  soundFX.playSandScratch();
                  setLeftIndex((prev) => (prev < LEFT_CANDIDATES.length - 1 ? prev + 1 : 0));
                }}
                className="text-[#C8943D]/70 hover:text-[#F1D98D] p-1 active:scale-90 transition-transform"
                title="向下滑动"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className="text-[8px] font-mono text-[#D6A84B] mt-0.5">「干」槽位</span>
            </div>

            {/* Center Background: 破损画像砖上漆画武舞人物剪影，舞人的左右手均摊开 */}
            <div className="relative flex-1 flex items-center justify-center h-56 mx-1 z-10">
              <div className="relative w-44 h-56 rounded-md overflow-hidden shadow-2xl border-0">
                <img
                  src={warriorBrickImg}
                  alt="汉代武舞人物画像砖"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95 contrast-125 filter"
                />
                <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
                {/* Visual indicator lines pointing from open hands towards left and right artifact slots */}
                <div className="absolute top-[42%] left-1 w-6 border-t border-dashed border-[#F1D98D]/60 animate-pulse pointer-events-none" />
                <div className="absolute top-[42%] right-1 w-6 border-t border-dashed border-[#F1D98D]/60 animate-pulse pointer-events-none" />
              </div>
            </div>

            {/* Right 3 Floating Artifacts (for '戚' - 破阵) */}
            <div className="flex flex-col items-center justify-center w-20 z-20">
              <button
                onClick={() => {
                  soundFX.playSandScratch();
                  setRightIndex((prev) => (prev > 0 ? prev - 1 : RIGHT_CANDIDATES.length - 1));
                }}
                className="text-[#C8943D]/70 hover:text-[#F1D98D] p-1 active:scale-90 transition-transform"
                title="向上滑动"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center space-y-1.5 py-1">
                {RIGHT_CANDIDATES.map((cand, idx) => {
                  const isCentered = idx === rightIndex;
                  return (
                    <div
                      key={cand.id}
                      onClick={() => {
                        soundFX.playBronzeChime();
                        setRightIndex(idx);
                      }}
                      className={`relative w-16 h-14 rounded-md border-0 flex flex-col items-center justify-center p-1 transition-all duration-300 cursor-pointer ${
                        isCentered
                          ? 'opacity-100 scale-105 bg-[#2A160E]/80 shadow-[0_0_12px_rgba(200,148,61,0.3)]'
                          : 'opacity-40 scale-90 bg-black/40'
                      }`}
                    >
                      <img
                        src={cand.imageUrl}
                        alt={cand.name}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-8 object-contain filter drop-shadow"
                      />
                      <span className="text-[8px] font-serif tracking-wider text-[#E6D3AA] mt-0.5 truncate w-full text-center">
                        {cand.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  soundFX.playSandScratch();
                  setRightIndex((prev) => (prev < RIGHT_CANDIDATES.length - 1 ? prev + 1 : 0));
                }}
                className="text-[#C8943D]/70 hover:text-[#F1D98D] p-1 active:scale-90 transition-transform"
                title="向下滑动"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className="text-[8px] font-mono text-[#D6A84B] mt-0.5">「戚」槽位</span>
            </div>
          </div>

          {/* Bottom Dialogue Box (固定于底部，拥有防触碰安全间距) */}
          <div className="relative z-30 w-full shrink-0 mb-1">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_PAGE04}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('page05_wheel');
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

          {/* Top Selected Slots (尺寸适配手机屏幕，无边框) */}
          <div className="relative z-10 flex items-center justify-center gap-2 px-1">
            {/* Slot 1: 【干】 */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`w-full h-15 rounded-md transition-all flex items-center justify-center p-1 text-center ${
                  selectedWeapons[0]
                    ? 'bg-gradient-to-b from-[#3D2015]/95 to-[#1C0F0A]/95 shadow-[0_0_12px_rgba(214,168,75,0.4)]'
                    : 'bg-[#1A0E09]/70'
                }`}
              >
                {selectedWeapons[0] ? (
                  <div className="flex items-center gap-1.5 w-full px-1">
                    <div className="w-8 h-11 flex items-center justify-center shrink-0">
                      <img
                        src={selectedWeapons[0].imageUrl}
                        alt={selectedWeapons[0].name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-10 object-contain filter drop-shadow animate-pulse"
                      />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden flex-1">
                      <span className="text-[8px] font-mono text-[#D6A84B]">【干】已装配</span>
                      <span className="text-[10px] font-serif font-black text-[#F1D98D] truncate">
                        {selectedWeapons[0].name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-[#8C6D46]">
                    <span className="text-[11px] font-bold text-[#C8943D]">【干】槽位</span>
                    <span className="text-[7.5px] text-[#A89078]">转台点选文物图片</span>
                  </div>
                )}
              </div>
            </div>

            {/* Slot 2: 【戚】 */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`w-full h-15 rounded-md transition-all flex items-center justify-center p-1 text-center ${
                  selectedWeapons[1]
                    ? 'bg-gradient-to-b from-[#3D2015]/95 to-[#1C0F0A]/95 shadow-[0_0_12px_rgba(214,168,75,0.4)]'
                    : 'bg-[#1A0E09]/70'
                }`}
              >
                {selectedWeapons[1] ? (
                  <div className="flex items-center gap-1.5 w-full px-1">
                    <div className="w-8 h-11 flex items-center justify-center shrink-0">
                      <img
                        src={selectedWeapons[1].imageUrl}
                        alt={selectedWeapons[1].name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-10 object-contain filter drop-shadow animate-pulse"
                      />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden flex-1">
                      <span className="text-[8px] font-mono text-[#D6A84B]">【戚】已装配</span>
                      <span className="text-[10px] font-serif font-black text-[#F1D98D] truncate">
                        {selectedWeapons[1].name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-[#8C6D46]">
                    <span className="text-[11px] font-bold text-[#C8943D]">【戚】槽位</span>
                    <span className="text-[7.5px] text-[#A89078]">转台点选文物图片</span>
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
                '汉代出征武舞需持一“干”（护身礼杖/盾）与一“戚”（克敌利刃）。',
                '大葆台一号墓出土之错金银八棱棍通体饰金银卷云纹，为干；铁铸长戟横刃锐利，为戚。',
                '拨动转台旋转，点选两件文物装配填入槽位，即可复原干戚之威。',
              ]}
              errorTip={errorTip}
              onClearError={() => setErrorTip('')}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 06: 正确反馈 (记忆归位 + 错金银八棱棍 & 铁戟 展签展示，无边框版)
          ========================================================================= */}
      {phase === 'page06_restored' && (
        <div className="relative w-full h-full flex flex-col justify-between animate-fade-in p-3 pb-2 overflow-hidden bg-[#110907]">
          <MuseumTombBackdrop palette="weapon" pattern="cloud" spotlight={true} intensity="subtle" />

          {/* Top Museum Header */}
          <HanMuseumTopBar />

          {/* Title: 记忆归位 */}
          <div className="relative z-10 pt-1 pb-0.5 text-center">
            <span className="text-[9px] text-[#A89078] font-mono tracking-[0.25em] uppercase block">
              CHAPTER 01 RESTORED
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#F1D98D] tracking-[0.3em] font-serif pl-[0.3em]">
              第一章 · 武舞记忆归位
            </h2>
          </div>

          {/* Center Standardized Museum Accession Record */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-2 px-2">
            <MuseumAccessionRecord
              memoryIndex={1}
              title="干戚武舞"
              subtitle="大葆台一号汉墓出土 · 错金银八棱棍与铁戟"
              accessionCode="DBT-M1-01"
              material="青铜与铁 / 错金银卷云纹"
              excavationSite="大葆台一号西汉王墓"
              era="西汉 · 广阳国时期"
              category="大汉礼乐 · 武舞仪礼"
            />

            {/* Artifact Floating Showcase (无边框，四角无横线) */}
            <div className="flex items-center justify-center gap-3 mt-1">
              <button
                onClick={() => {
                  soundFX.playBronzeChime();
                  setSelectedExhibit({
                    title: '错金银八棱铜棍',
                    pinyin: 'CUO JIN YIN BA LENG GUN',
                    relicNumber: 'DBT-M1-01A',
                    era: '西汉 (约公元前70年)',
                    excavation: '北京大葆台一号汉墓',
                    material: '青铜铸造 · 通体错金银',
                    dimensions: '长约 58 cm · 径 2.4 cm',
                    description: '大葆台一号汉墓出土之错金银八棱棍，截面呈八角八棱，通体错金银云气禽兽纹，极其华贵，在西汉诸侯王武舞仪轨中作为“干”（护身仪卫）之尊贵重器。',
                    significance: '此器为北京地区汉代金属镶嵌工艺巅峰之作，见证广阳王爵非凡礼仪规格。',
                    imageUrl: WEAPON_IMAGES.w_ba_leng_gun,
                  });
                }}
                className="px-3 py-1.5 bg-[#1F1610] hover:bg-[#2A1B14] rounded-sm border-0 text-[10px] text-[#E6D3AA] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E703B]" />
                <span>「八棱棍」展签 ➔</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playBronzeChime();
                  setSelectedExhibit({
                    title: '西汉实战铁戟',
                    pinyin: 'XI HAN TIE JI',
                    relicNumber: 'DBT-M1-01B',
                    era: '西汉 (广阳顷王时期)',
                    excavation: '北京大葆台一号汉墓前室',
                    material: '锻铁淬火 · 柲装仪仗',
                    dimensions: '长约 72 cm',
                    description: '出土于大葆台一号汉墓前室，长柄横刃利器，代表汉军阵前克敌破阵之军威，在天子与王侯武舞礼典中演变为“戚”（扬威破敌之舞器）。',
                    significance: '大汉开疆拓土与武德充沛之象征，干戚并用，寓意止戈为武。',
                    imageUrl: WEAPON_IMAGES.w_tie_ji,
                  });
                }}
                className="px-3 py-1.5 bg-[#1F1610] hover:bg-[#2A1B14] rounded-sm border-0 text-[10px] text-[#E6D3AA] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#466B5E]" />
                <span>「铁戟」展签 ➔</span>
              </button>
            </div>
          </div>

          {/* Bottom Dialogue Box */}
          <div className="relative z-30 w-full">
            <UnifiedDialogueBox
              dialogues={DIALOGUES_PAGE06}
              currentIndex={0}
              onNext={() => {
                soundFX.playStoneDrum();
                setPhase('bamboo_slip');
              }}
            />
          </div>

          {/* Museum Exhibit Curatorial Sign Modal */}
          {selectedExhibit && (
            <MuseumExhibitSign
              data={selectedExhibit}
              onClose={() => setSelectedExhibit(null)}
            />
          )}
        </div>
      )}

      {/* =========================================================================
          PAGE 07: 记忆恢复 · 竹简收集 (第一章 错金银八棱棍与铁戟)
          ========================================================================= */}
      {phase === 'bamboo_slip' && (
        <div className="fixed inset-0 z-50 bg-[#0B0806]/95 backdrop-blur-md flex flex-col items-center justify-center p-2 animate-fade-in select-none font-serif">
          <BambooSlipCollector
            stageNumber={1}
            customBgType="default"
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
