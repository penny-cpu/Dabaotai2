import React, { useState } from 'react';
import { SectionKey, JadeFragmentId } from '../types';
import { soundFX } from '../utils/soundEngine';
import { HuangchangProgressBar } from './HuangchangProgressBar';
import { HanPlaqueButton } from './HanPlaqueButton';
import {
  Sparkles,
  Shield,
  Gem,
  Eye,
  Activity,
  Wind,
  Hammer,
  Star,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Info,
  ChevronUp,
  ChevronDown,
  X,
  Home,
} from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeSection: SectionKey;
  unlockedFragments?: JadeFragmentId[];
  onSelectSection: (key: SectionKey) => void;
  onOpenMapModal?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  activeSection,
  unlockedFragments = [],
  onSelectSection,
  onOpenMapModal,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showHuangchangModal, setShowHuangchangModal] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  // 8 Main Exhibition Stages for the dot navigation
  const sections: {
    key: SectionKey;
    shortName: string;
    chapterNum: string;
    fullName: string;
    desc: string;
    fragId?: JadeFragmentId;
  }[] = [
    { key: 'prologue_flow', shortName: '序章', chapterNum: '序', fullName: '大葆台入墓', desc: '幽深汉墓 · 唤醒沉睡两千年的礼制' },
    { key: 'weapon', shortName: '戈舞', chapterNum: '一', fullName: '第一章 · 戈舞出征', desc: '大葆台武舞干戚 · 错金银八棱棍与铁戟', fragId: 'frag_right_sleeve' },
    { key: 'banquet', shortName: '宴乐', chapterNum: '二', fullName: '第二章 · 宴飨佩鸣', desc: '王后组玉佩 · 汉家贵胄钟鸣鼎食', fragId: 'frag_chest_pendant' },
    { key: 'gallery', shortName: '衿舞', chapterNum: '三', fullName: '第三章 · 袖舞从风', desc: '翘袖折腰 · 汉代玉舞人轻盈从风', fragId: 'frag_left_sleeve' },
    { key: 'baixi', shortName: '百戏', chapterNum: '四', fullName: '第四章 · 俳优百戏', desc: '西汉画像石 · 烛光照壁与六博博弈', fragId: 'frag_robe_skirt' },
    { key: 'funerary', shortName: '送葬', chapterNum: '五', fullName: '第五章 · 送葬礼乐', desc: '彩绘云气陶壶 · 汉人羽化升仙之志', fragId: 'frag_waist' },
    { key: 'huangchang', shortName: '木椁', chapterNum: '六', fullName: '第六章 · 黄肠题凑', desc: '天子之制 · 15880根柏木严整题凑', fragId: 'frag_body_core' },
    { key: 'ascension', shortName: '星宿', chapterNum: '七', fullName: '第七章 · 四象星路', desc: '青龙朱雀白虎玄武 · 归入大汉星汉', fragId: 'frag_head_halo' },
  ];

  const currentSectionIndex = sections.findIndex((s) => {
    if (activeSection === 'jade_sphere') return s.key === 'gallery';
    return s.key === activeSection;
  });

  const activeChapter = sections[currentSectionIndex >= 0 ? currentSectionIndex : 0];

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-[#0B0806] text-[#E6D3AA] flex flex-col items-center justify-center p-2 sm:p-4 font-serif select-none relative overflow-x-hidden">
      {/* Background Decorative Han Mural Noise */}
      <div className="fixed inset-0 han-mural-texture pointer-events-none" />

      {/* Top Header Control Bar for App Metadata & Mode */}
      <header className="w-full max-w-md md:max-w-4xl flex items-center justify-between mb-2 px-3.5 py-1.5 bg-[#160D09]/95 backdrop-blur-md rounded-xl border border-[#8E703B]/30 shadow-lg z-30">
        <div className="flex items-center gap-2">
          {/* Top-left "回首页" Button */}
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              onSelectSection('prologue_flow');
            }}
            className="px-2.5 py-1.5 rounded-lg bg-[#1F1610] hover:bg-[#2A1B14] text-[#E6D3AA] border border-[#8E703B]/40 shadow-sm flex items-center gap-1.5 active:scale-95 transition-all group"
            title="回到大葆台首页"
          >
            <Home className="w-3.5 h-3.5 text-[#A88950]" />
            <span className="text-xs font-serif font-medium">展馆首页</span>
          </button>

          <div className="hidden sm:block pl-1">
            <div className="flex items-center gap-2">
              <span className="text-[8px] tracking-[0.25em] uppercase text-[#8F7C6B] font-mono">
                DABAOTAI WESTERN HAN TOMB MUSEUM
              </span>
              <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#0B0806] text-[#A88950] border border-[#2C1D16]">
                数字展陈
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold text-[#E6D3AA] tracking-widest font-serif">
              大葆台西汉墓遗址博物馆 · 沉浸展陈
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Huangchang Ticou Modal Button */}
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowHuangchangModal(true);
            }}
            className="p-1.5 bg-[#1F1610] hover:bg-[#2A1B14] text-[#E6D3AA] rounded-lg border border-[#8E703B]/35 text-xs transition-colors flex items-center gap-1 shadow-sm"
            title="查看汉代黄肠题凑考工"
          >
            <Hammer className="w-3.5 h-3.5 text-[#A88950]" />
            <span className="hidden md:inline font-serif text-[11px]">题凑考工</span>
          </button>

          {/* Mute toggle button */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 text-xs ${
              isMuted
                ? 'bg-[#0B0806] text-[#5C4C42] border-[#2C1D16]'
                : 'bg-[#1F1610] text-[#E6D3AA] border-[#8E703B]/40 hover:bg-[#2A1B14]'
            }`}
            title={isMuted ? '取消静音' : '音效已开启'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#A88950]" />}
          </button>

          {/* Scale view mode button */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 bg-[#1F1610] hover:bg-[#2A1B14] text-[#E6D3AA] rounded-lg border border-[#8E703B]/35 text-xs transition-colors flex items-center gap-1"
            title={isFullScreen ? '切换为手机外框' : '无框全屏视图'}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Info Modal button */}
          <button
            onClick={() => setShowInfoModal(true)}
            className="p-1.5 bg-[#1F1610] hover:bg-[#2A1B14] text-[#E6D3AA] rounded-lg border border-[#8E703B]/35 text-xs transition-colors"
            title="查看展陈主旨与导览"
          >
            <Info className="w-3.5 h-3.5 text-[#A88950]" />
          </button>
        </div>
      </header>

      {/* Main Interactive Phone Frame Canvas (390x844 proportion) */}
      <div
        className={`transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-2xl ${
          isFullScreen
            ? 'w-full max-w-xl h-[88vh] rounded-2xl border-2 border-[#2A1B14]'
            : 'w-full max-w-[390px] h-[780px] rounded-[36px] border-[5px] sm:border-[6px] border-[#2A1B14] shadow-[0_0_50px_rgba(0,0,0,0.95)]'
        }`}
        style={{
          backgroundColor: '#0B0806',
        }}
      >
        {/* Phone Notch/Speaker Header */}
        {!isFullScreen && (
          <div className="w-full bg-[#0B0806] h-5 flex items-center justify-between px-6 border-b border-[#1F1610] z-40 text-[9px] text-[#8F7C6B] font-mono shrink-0">
            <span className="font-bold">09:41</span>
            <div className="w-12 h-2 bg-[#000] rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1F1610] mr-1" />
            </div>
            <span>5G 100%</span>
          </div>
        )}

        {/* Dynamic Screen Content Container */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-[#0B0806]">
          {children}
        </div>

        {/* =========================================================================
            OVERHAULED BOTTOM NAVIGATION:
            ○────●────○────○────○────○────○
            - 缩成小圆点，上方只显示当前章节名称
            - 用户轻触后才展开章节名称
            - 当前章节: 朱砂红 (#B93A2B)
            - 完成章节: 暗金 (#8E703B)
            - 未完成章节: 灰褐 (#5C4C42)
            ========================================================================= */}
        <div className="relative z-40 bg-[#0B0806]/98 border-t border-[#1F1610] shrink-0 select-none">
          {/* Top Info Bar: 只显示当前章节名称，轻触展开 */}
          <div
            onClick={() => {
              soundFX.playStoneDrum();
              setIsNavDrawerOpen(!isNavDrawerOpen);
            }}
            className="w-full pt-1.5 pb-1 px-4 flex items-center justify-between cursor-pointer hover:bg-[#160D09] transition-colors"
          >
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="text-[#B93A2B] font-bold">●</span>
              <span className="font-serif text-[#E6D3AA] tracking-wider">
                {activeChapter.fullName}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[9px] text-[#8F7C6B] font-mono">
              <span>{isNavDrawerOpen ? '收起' : '展厅目录'}</span>
              {isNavDrawerOpen ? (
                <ChevronDown className="w-3 h-3 text-[#A88950]" />
              ) : (
                <ChevronUp className="w-3 h-3 text-[#A88950]" />
              )}
            </div>
          </div>

          {/* Minimalist Connected Dot Line: ○────●────○────○────○────○────○ */}
          <div 
            onClick={() => {
              soundFX.playStoneDrum();
              setIsNavDrawerOpen(!isNavDrawerOpen);
            }}
            className="w-full px-6 py-2 flex items-center justify-between cursor-pointer group"
          >
            {sections.map((item, idx) => {
              const isActive = idx === currentSectionIndex;
              const isCompleted = item.fragId ? unlockedFragments.includes(item.fragId) : (idx < currentSectionIndex);

              return (
                <React.Fragment key={item.key}>
                  {/* Dot Node */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playStoneDrum();
                      onSelectSection(item.key);
                      setIsNavDrawerOpen(false);
                    }}
                    className="relative flex items-center justify-center p-1 cursor-pointer transition-transform hover:scale-125"
                    title={`${item.shortName}: ${item.fullName}`}
                  >
                    {isActive ? (
                      /* 当前章节: 朱砂红 (规范使用 #B93A2B) */
                      <div className="relative flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#B93A2B] shadow-[0_0_6px_rgba(185,58,43,0.7)]" />
                        <span className="absolute -inset-1 rounded-full border border-[#B93A2B]/40 animate-pulse pointer-events-none" />
                      </div>
                    ) : isCompleted ? (
                      /* 完成章节: 暗金 (#8E703B) */
                      <span className="w-2 h-2 rounded-full bg-[#8E703B]" />
                    ) : (
                      /* 未完成章节: 灰褐 (#5C4C42) 极小空心圆 */
                      <span className="w-2 h-2 rounded-full border border-[#5C4C42] bg-[#0B0806]" />
                    )}
                  </div>

                  {/* Hairline Connector Line between dots */}
                  {idx < sections.length - 1 && (
                    <div className="flex-1 h-[1px] bg-[#2A1B14] mx-0.5" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Expanded Drawer on Click: 展陈全景章节名片列表 */}
          {isNavDrawerOpen && (
            <div className="absolute bottom-full left-0 right-0 max-h-[320px] bg-[#0E0806]/98 border-t border-b border-[#2A1B14] shadow-2xl overflow-y-auto p-3 flex flex-col gap-1.5 animate-fade-in backdrop-blur-md">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#1F1610] mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#8F7C6B] uppercase">
                    MUSEUM SECTIONS · 展陈篇章
                  </span>
                  <span className="han-seal-stamp px-1 text-[8px]">大葆台</span>
                </div>
                <button
                  onClick={() => setIsNavDrawerOpen(false)}
                  className="text-[#8F7C6B] hover:text-[#E6D3AA] p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {sections.map((item, idx) => {
                const isActive = idx === currentSectionIndex;
                const isCompleted = item.fragId ? unlockedFragments.includes(item.fragId) : (idx < currentSectionIndex);

                return (
                  <div
                    key={`drawer-${item.key}`}
                    onClick={() => {
                      soundFX.playStoneDrum();
                      onSelectSection(item.key);
                      setIsNavDrawerOpen(false);
                    }}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-[#1F1610] border-l-2 border-[#B93A2B]'
                        : 'hover:bg-[#160D09]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Chapter Numeral */}
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-serif ${
                        isActive
                          ? 'bg-[#B93A2B] text-white font-bold'
                          : isCompleted
                          ? 'bg-[#2A1B14] text-[#A88950]'
                          : 'bg-[#140C08] text-[#5C4C42]'
                      }`}>
                        {item.chapterNum}
                      </span>

                      <div className="flex flex-col text-left">
                        <span className={`text-xs font-serif ${
                          isActive ? 'text-[#F1D98D] font-bold' : 'text-[#E6D3AA]'
                        }`}>
                          {item.fullName}
                        </span>
                        <span className="text-[9px] text-[#8F7C6B] font-sans">
                          {item.desc}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isActive ? (
                        <span className="text-[8.5px] font-mono text-[#B93A2B] font-bold bg-[#B93A2B]/10 px-1.5 py-0.5 rounded">
                          正在观览
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[8.5px] font-mono text-[#A88950] bg-[#A88950]/10 px-1.5 py-0.5 rounded">
                          已通览
                        </span>
                      ) : (
                        <span className="text-[8.5px] font-mono text-[#5C4C42]">
                          待观览
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Info Modal Guide: 博物馆展陈主旨 */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#160D09] border border-[#8E703B]/40 rounded-none max-w-md w-full p-6 text-[#E6D3AA] relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A1B14] pb-3">
              <div className="flex items-center gap-2">
                <span className="han-seal-stamp px-1.5 py-0.5 text-[8.5px] font-serif">
                  展陈释义
                </span>
                <h2 className="text-sm sm:text-base font-bold font-serif text-[#F1D98D] tracking-wider">
                  大葆台西汉墓遗址博物馆 · 数字展陈
                </h2>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-[#8F7C6B] hover:text-[#E6D3AA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#C8B69B] max-h-[55vh] overflow-y-auto pr-1 font-serif text-justify">
              <p className="text-[#E6D3AA] font-bold indent-6">
                “进入一座汉墓，逐件唤醒被封存两千年的礼仪、舞蹈、器物和宇宙观。”
              </p>
              <p className="indent-6">
                北京大葆台西汉墓是一座距今两千余年的诸侯王级大型汉代木椁墓（西汉广阳倾王刘建遗址）。本次数字化展陈旨在以静穆、幽深的考古展陈语言，重构大汉礼乐文明。
              </p>
              <div className="border-t border-[#2A1B14] pt-2 space-y-1.5 text-[11px]">
                <p><strong className="text-[#A88950]">✦ 礼仪武舞：</strong> 辨识大葆台出土错金银八棱棍与铁戟，复原汉家大武舞之仪。</p>
                <p><strong className="text-[#A88950]">✦ 组佩钟鸣：</strong> 汉昭宣时期王后组玉佩，步则佩玉相鸣，以节步武。</p>
                <p><strong className="text-[#A88950]">✦ 轻盈袖舞：</strong> 翘袖折腰，汉代玉舞人从风起舞的生动体态。</p>
                <p><strong className="text-[#A88950]">✦ 乐民百戏：</strong> 汉画像砖雕刻之俳优走索与六博推枰。</p>
                <p><strong className="text-[#A88950]">✦ 送葬礼器：</strong> 汉代彩绘云气陶壶，朱墨绘饰，引渡灵魂。</p>
                <p><strong className="text-[#A88950]">✦ 黄肠题凑：</strong> 西汉帝王皇族至尊葬制，万五千八百余根柏木题凑结构。</p>
                <p><strong className="text-[#A88950]">✦ 苍穹星宿：</strong> 青龙、白虎、朱雀、玄武四象星宿，引渡升入无垠星汉。</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#2A1B14]">
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full py-2.5 rounded bg-[#9E2A1C] hover:bg-[#B93A2B] text-[#F8E8C8] text-xs font-serif font-bold tracking-widest shadow transition-all"
              >
                收辑释义 · 继续观览
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Huangchang Ticou Modal */}
      {showHuangchangModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#160D09] border border-[#8E703B]/40 max-w-sm w-full p-5 text-[#E6D3AA] relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A1B14] pb-2">
              <h3 className="text-sm font-bold font-serif text-[#F1D98D] flex items-center gap-1.5">
                <Hammer className="w-4 h-4 text-[#A88950]" />
                黄肠题凑考工考释
              </h3>
              <button
                onClick={() => setShowHuangchangModal(false)}
                className="text-[#8F7C6B] hover:text-[#E6D3AA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <HuangchangProgressBar
              collectedPieces={unlockedFragments.length * 2200}
              totalPieces={15880}
            />

            <p className="text-[11px] leading-relaxed text-[#C8B69B] font-serif text-justify indent-6">
              《汉书·霍光传》颜师古注：“以柏木黄心致累棺外，故曰黄肠。木头皆内向，故曰题凑。”大葆台一号墓开创了建国以来中国汉代“黄肠题凑”大型地下木结构建筑的最完整考古实证。
            </p>

            <button
              onClick={() => setShowHuangchangModal(false)}
              className="w-full py-2 bg-[#1F1610] hover:bg-[#2A1B14] border border-[#8E703B]/40 text-[#E6D3AA] text-xs font-serif rounded tracking-wider"
            >
              返回展厅
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

