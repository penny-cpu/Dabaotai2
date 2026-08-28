import React, { useState } from 'react';
import { SectionKey } from '../types';
import { soundFX } from '../utils/soundEngine';
import { HuangchangProgressBar } from './HuangchangProgressBar';
import {
  Sparkles,
  Shield,
  Gem,
  Eye,
  Activity,
  Wind,
  Hammer,
  Star,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Info,
  X,
  Compass,
} from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeSection: SectionKey;
  onSelectSection: (key: SectionKey) => void;
  onOpenMapModal?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  activeSection,
  onSelectSection,
  onOpenMapModal,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showHuangchangModal, setShowHuangchangModal] = useState(false);

  const sections: { key: SectionKey; name: string; icon: React.ReactNode; desc: string }[] = [
    { key: 'prologue_sand', name: '序章', icon: <Sparkles className="w-3.5 h-3.5" />, desc: '尘沙显现·玉舞人' },
    { key: 'weapon', name: '戈影', icon: <Shield className="w-3.5 h-3.5" />, desc: '第一关·武舞之器' },
    { key: 'banquet', name: '宴乐', icon: <Gem className="w-3.5 h-3.5" />, desc: '第二关·相机取景' },
    { key: 'gallery', name: '浮游', icon: <Eye className="w-3.5 h-3.5" />, desc: '第三关·五列上浮' },
    { key: 'baixi', name: '百戏', icon: <Activity className="w-3.5 h-3.5" />, desc: '第四关·烛光六博' },
    { key: 'funerary', name: '袖舞', icon: <Wind className="w-3.5 h-3.5" />, desc: '第五关·送葬礼仪' },
    { key: 'huangchang', name: '木阵', icon: <Hammer className="w-3.5 h-3.5" />, desc: '第六关·15880木构' },
    { key: 'ascension', name: '星路', icon: <Star className="w-3.5 h-3.5" />, desc: '第七关·四象聚合' },
    { key: 'epilogue_card', name: '终章', icon: <RotateCcw className="w-3.5 h-3.5" />, desc: '终章·见证者纪念卡' },
  ];

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-[#0d0906] text-[#d2b48c] flex flex-col items-center justify-center p-2 sm:p-4 font-serif select-none relative overflow-x-hidden">
      {/* Background Decorative Ambient Radial Grid */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#c2a385 1px, transparent 0)',
          backgroundSize: '10px 10px',
        }}
      />

      {/* Top Header Control Bar for App Metadata & Mode */}
      <header className="w-full max-w-md md:max-w-4xl flex items-center justify-between mb-2.5 px-3.5 py-2 bg-[#1c130d] backdrop-blur-md rounded-2xl border border-[#3d2b1f] shadow-xl z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#291b12] flex items-center justify-center font-serif text-[#ffe89c] font-black text-base border border-[#d2b48c]/40 shadow-inner title-drop-shadow">
            葆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] tracking-[0.25em] uppercase opacity-70 text-[#c2a385] font-mono">
                RULE TALES · DABAOTAI
              </span>
              <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#291b12] text-amber-300 border border-[#5c4033]">
                轻量交互小游戏
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-black text-[#e6d5b8] tracking-widest font-serif title-drop-shadow flex items-center gap-1.5">
              规则怪谈降临大葆台
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Strata Map Button */}
          {onOpenMapModal && (
            <button
              onClick={() => {
                soundFX.playStoneDrum();
                onOpenMapModal();
              }}
              className="p-1.5 bg-[#291b12] hover:bg-[#3d2b1f] text-[#ffe89c] rounded-xl border border-[#5c4033] text-xs transition-colors flex items-center gap-1 shadow-md font-bold"
              title="查看七关时空地脉图"
            >
              <Compass className="w-3.5 h-3.5 text-[#ffe89c]" />
              <span className="hidden sm:inline font-serif text-[11px]">七关地图</span>
            </button>
          )}

          {/* Huangchang Ticou Modal Button */}
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowHuangchangModal(true);
            }}
            className="p-1.5 bg-[#241a13] hover:bg-[#3d2b1f] text-[#e6d5b8] rounded-xl border border-[#5c4033] text-xs transition-colors flex items-center gap-1 shadow-md"
            title="查看汉代黄肠题凑考工"
          >
            <Hammer className="w-3.5 h-3.5 text-[#d2b48c]" />
            <span className="hidden sm:inline font-serif text-[11px]">题凑考工</span>
          </button>

          {/* Mute toggle button */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-xl border transition-all flex items-center gap-1 text-xs ${
              isMuted
                ? 'bg-[#1a120b] text-[#8c7561] border-[#3d2b1f]'
                : 'bg-[#291b12] text-[#d2b48c] border-[#5c4033] hover:bg-[#3d2b1f]'
            }`}
            title={isMuted ? '取消静音' : '音效已开启'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Scale view mode button */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 bg-[#1a120b] hover:bg-[#2c1d12] text-[#d2b48c] rounded-xl border border-[#3d2b1f] text-xs transition-colors flex items-center gap-1"
            title={isFullScreen ? '切换为手机外框' : '无框全屏视图'}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Info Modal button */}
          <button
            onClick={() => setShowInfoModal(true)}
            className="p-1.5 bg-[#1a120b] hover:bg-[#2c1d12] text-[#d2b48c] rounded-xl border border-[#3d2b1f] text-xs transition-colors"
            title="查看关于与规则怪谈指南"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Interactive Phone Frame Canvas */}
      <div
        className={`transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-2xl ${
          isFullScreen
            ? 'w-full max-w-xl h-[88vh] rounded-2xl border-4 border-[#3d2b1f]'
            : 'w-full max-w-[390px] h-[780px] rounded-[42px] border-[8px] sm:border-[10px] border-[#3d2b1f] shadow-[0_0_60px_rgba(0,0,0,0.9)] ring-1 ring-[#d2b48c]/20'
        }`}
        style={{
          backgroundColor: '#18110b',
        }}
      >
        {/* Phone Notch/Speaker Header */}
        {!isFullScreen && (
          <div className="w-full bg-[#120c08] h-6 flex items-center justify-between px-6 border-b border-[#2b1b12] z-40 text-[9px] text-[#a3805d] font-mono shrink-0">
            <span className="font-bold">09:41</span>
            <div className="w-14 h-2.5 bg-[#000] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1c130d] mr-1" />
            </div>
            <span>5G 100%</span>
          </div>
        )}

        {/* Dynamic Screen Content Container */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-[#120c08]">
          {children}
        </div>

        {/* Bottom Navigation Bar inside Phone UI */}
        <nav className="bg-[#18110b]/95 border-t border-[#3d2b1f] py-1.5 px-1 flex items-center gap-1 z-40 relative backdrop-blur-md overflow-x-auto scrollbar-none shrink-0">
          {sections.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  soundFX.playStoneDrum();
                  onSelectSection(item.key);
                }}
                className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all duration-200 shrink-0 min-w-[48px] ${
                  isActive
                    ? 'text-[#ffe89c] bg-[#291b12] border border-[#d2b48c] shadow-md scale-105 font-bold'
                    : 'text-[#8c7561] hover:text-[#d2b48c] hover:bg-[#1a120b]'
                }`}
              >
                <div className={`${isActive ? 'text-[#ffe89c] animate-pulse' : 'text-[#8c7561]'}`}>
                  {item.icon}
                </div>
                <span className="text-[9px] mt-0.5 font-serif tracking-tight">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Info Modal Guide */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c130d] border-2 border-[#5c4033] rounded-3xl max-w-md w-full p-6 text-[#d2b48c] relative shadow-2xl space-y-3">
            <h2 className="text-sm sm:text-base font-black font-serif text-[#ffe89c] flex items-center gap-2 border-b border-[#3d2b1f] pb-2 tracking-wider title-drop-shadow">
              <Sparkles className="w-4 h-4 text-amber-400" />
              规则怪谈降临大葆台 · 游戏规则与玩法
            </h2>

            <div className="space-y-2 text-xs leading-relaxed text-[#c2a385] max-h-[55vh] overflow-y-auto pr-1 font-serif">
              <p>
                <strong className="text-[#ffe89c]">1. 故事背景：</strong>
                未来时空发生怪谈异变，蚀墓虫正在啃噬西汉大葆台博物馆的建筑与人们的记忆。玉舞人跌落七层时空，碎裂为七块记忆残片。
              </p>
              <p>
                <strong className="text-[#ffe89c]">2. 七关解谜机制：</strong>
                【戈影】选对大葆台武舞兵器 ➔ 【宴乐】相机取景对齐宴席 ➔ 【浮游】五列上浮辨识真品 ➔ 【百戏】烛光照壁与六步六博 ➔ 【袖舞】识别汉家送葬礼乐 ➔ 【木阵】输入 15880 考工密码 ➔ 【星路】顺应四象开辟星轨。
              </p>
              <p>
                <strong className="text-[#ffe89c]">3. 终章救赎：</strong>
                集齐 7 块碎片后，玉舞人完全体回归，玉色光华反冲七层空间，生成独一无二的时空见证者纪念卡！
              </p>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-4 w-full py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#ffe89c] font-bold rounded-xl border border-[#d2b48c] text-xs transition-colors shadow-lg"
            >
              了解规则 · 进入冒险
            </button>
          </div>
        </div>
      )}

      {/* Huangchang Ticou Interactive Modal Guide */}
      {showHuangchangModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full relative">
            <button
              onClick={() => setShowHuangchangModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-[#1a120b] text-[#c2a385] hover:text-[#e6d5b8] border border-[#3d2b1f] z-20"
            >
              <X className="w-4 h-4" />
            </button>
            <HuangchangProgressBar
              isLoading={true}
              durationMs={2000}
              title="汉陵考工 · 黄肠题凑逐步搭建演练"
            />
          </div>
        </div>
      )}
    </div>
  );
};
