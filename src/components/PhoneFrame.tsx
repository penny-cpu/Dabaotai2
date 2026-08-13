import React, { useState } from 'react';
import { SectionKey } from '../types';
import { soundFX } from '../utils/soundEngine';
import { HuangchangProgressBar } from './HuangchangProgressBar';
import {
  Sparkles,
  Layers,
  Film,
  Compass,
  Flashlight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Info,
  Hammer,
  X,
} from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeSection: SectionKey;
  onSelectSection: (key: SectionKey) => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  activeSection,
  onSelectSection,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showHuangchangModal, setShowHuangchangModal] = useState(false);

  const sections: { key: SectionKey; name: string; icon: React.ReactNode; desc: string }[] = [
    { key: 'home', name: '风吹沙', icon: <Sparkles className="w-4 h-4" />, desc: '考古解密·触屏开沙' },
    { key: 'strata', name: '墓葬剖面', icon: <Layers className="w-4 h-4" />, desc: '之字形降·探地下土层' },
    { key: 'dance', name: '汉代武舞', icon: <Film className="w-4 h-4" />, desc: '汉代礼乐·干戈兵器' },
    { key: 'relics', name: '发掘文物', icon: <Compass className="w-4 h-4" />, desc: '五件遗珍·刨沙即现' },
    { key: 'scroll', name: '照见汉代', icon: <Flashlight className="w-4 h-4" />, desc: '手电照图·市井宴乐' },
    { key: 'huangchang', name: '黄肠题凑', icon: <Hammer className="w-4 h-4" />, desc: '死亡边界·转场节点' },
    { key: 'funerary', name: '送葬舞', icon: <Info className="w-4 h-4" />, desc: '送灵入墓·魂归苍穹' },
    { key: 'immortal', name: '升仙舞', icon: <Sparkles className="w-4 h-4" />, desc: '神仙幻想·飞升星盘' },
    { key: 'pangu', name: '盘鼓舞', icon: <Layers className="w-4 h-4" />, desc: '古今穿越·当代复现' },
    { key: 'epilogue', name: '沉浸结语', icon: <Sparkles className="w-4 h-4" />, desc: '首尾循环·历史重沉' },
  ];

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-[#1a120b] text-[#d2b48c] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 font-serif select-none relative overflow-x-hidden">
      {/* Background Decorative Ambient Radial Grid */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#c2a385 1px, transparent 0)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* Top Header Control Bar for App Metadata & Mode */}
      <header className="w-full max-w-md md:max-w-4xl flex items-center justify-between mb-3 px-3.5 py-2.5 bg-[#241a13] backdrop-blur-md rounded-2xl border border-[#3d2b1f] shadow-xl z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#3d2b1f] flex items-center justify-center font-serif text-[#e6d5b8] font-black text-lg border border-[#d2b48c]/40 shadow-inner title-drop-shadow">
            漢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-70 text-[#c2a385] font-mono">
                DIGITAL ARCHAEOLOGY
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#3d2b1f] text-[#d2b48c] border border-[#5c4033]">
                16:9 手机
              </span>
            </div>
            <h1 className="text-base font-black text-[#e6d5b8] tracking-widest font-serif title-drop-shadow flex items-center gap-1.5">
              大葆台博物馆
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Huangchang Ticou Modal Button */}
          <button
            onClick={() => {
              soundFX.playStoneDrum();
              setShowHuangchangModal(true);
            }}
            className="p-2 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] rounded-xl border border-[#d2b48c]/60 text-xs transition-colors flex items-center gap-1 shadow-md font-bold"
            title="查看汉代黄肠题凑搭建过程"
          >
            <Hammer className="w-4 h-4 text-[#d2b48c]" />
            <span className="hidden sm:inline font-serif">题凑营建</span>
          </button>

          {/* Mute toggle button */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs ${
              isMuted
                ? 'bg-[#1a120b] text-[#8c7561] border-[#3d2b1f]'
                : 'bg-[#3d2b1f] text-[#d2b48c] border-[#d2b48c]/60 hover:bg-[#5c4033]'
            }`}
            title={isMuted ? '取消静音' : '音效已开启'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline font-mono">{isMuted ? 'MUTE' : 'SOUND'}</span>
          </button>

          {/* Scale view mode button */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 bg-[#1a120b] hover:bg-[#2c1d12] text-[#d2b48c] rounded-xl border border-[#3d2b1f] text-xs transition-colors flex items-center gap-1"
            title={isFullScreen ? '切换为手机外框' : '无框全屏视图'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline font-mono">{isFullScreen ? 'NORM' : 'FULL'}</span>
          </button>

          {/* Info Modal button */}
          <button
            onClick={() => setShowInfoModal(true)}
            className="p-2 bg-[#1a120b] hover:bg-[#2c1d12] text-[#d2b48c] rounded-xl border border-[#3d2b1f] text-xs transition-colors"
            title="查看关于与指南"
          >
            <Info className="w-4 h-4" />
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
          backgroundColor: '#2c1d12',
        }}
      >
        {/* Phone Notch/Speaker Header */}
        {!isFullScreen && (
          <div className="w-full bg-[#1a120b] h-7 flex items-center justify-between px-6 border-b border-[#3d2b1f] z-40 text-[10px] text-[#c2a385] font-mono">
            <span className="font-bold">09:41</span>
            <div className="w-16 h-3 bg-[#000] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#1a120b] mr-1" />
            </div>
            <span>5G 100%</span>
          </div>
        )}

        {/* Dynamic Screen Content Container */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-[#1a120b]">
          {children}
        </div>

        {/* Bottom Bamboo Slip Navigation Bar inside Phone UI */}
        <nav className="bg-[#241a13]/95 border-t border-[#3d2b1f] py-1.5 px-1.5 flex items-center gap-1 z-40 relative backdrop-blur-md overflow-x-auto scrollbar-none">
          {sections.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  soundFX.playStoneDrum();
                  onSelectSection(item.key);
                }}
                className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all duration-200 shrink-0 min-w-[54px] ${
                  isActive
                    ? 'text-[#e6d5b8] bg-[#3d2b1f] border border-[#d2b48c] shadow-md scale-105 font-bold'
                    : 'text-[#8c7561] hover:text-[#d2b48c] hover:bg-[#1a120b]'
                }`}
              >
                <div className={`${isActive ? 'text-[#d2b48c] animate-pulse' : 'text-[#8c7561]'}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] mt-0.5 font-serif tracking-tight">
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
          <div className="bg-[#241a13] border-2 border-[#3d2b1f] rounded-3xl max-w-md w-full p-6 text-[#d2b48c] relative shadow-2xl">
            <h2 className="text-xl font-black font-serif text-[#e6d5b8] mb-3 flex items-center gap-2 border-b border-[#3d2b1f] pb-2 tracking-wider title-drop-shadow">
              <span className="w-3 h-3 rounded-full bg-[#d2b48c]" />
              北京大葆台博物馆 · 手机交互指南
            </h2>

            <div className="space-y-3 text-xs leading-relaxed text-[#c2a385] max-h-[60vh] overflow-y-auto pr-1">
              <p>
                <strong className="text-[#e6d5b8]">1. 首页 (风吹沙开)：</strong>
                在全屏细沙上用手指/鼠标按住划动，刨开沙土露出“大葆台”古迹下层与汉隶金石书法标题。
              </p>
              <p>
                <strong className="text-[#e6d5b8]">2. 墓葬剖面：</strong>
                顺着“之字形”考古路线向下挖掘，探索耕作层、夯土层至黄肠题凑王陵墓室。
              </p>
              <p>
                <strong className="text-[#e6d5b8]">3. 武舞视频：</strong>
                沙土下落沉入暗室，播放20秒汉代【武舞】干戈舞，附画像石质感【出征舞蹈】弹窗解说。
              </p>
              <p>
                <strong className="text-[#e6d5b8]">4. 发掘文物：</strong>
                五件汉代国宝埋在之字形土层中，触屏点击即可刨开沙土，弹窗展示高清图、解析及可语音播放。
              </p>
              <p>
                <strong className="text-[#e6d5b8]">5. 照见汉代：</strong>
                点击右下手电筒图标开启光束，拖拽光束照亮汉代市井长卷，探索【广阳王宴乐】与【民间百戏】热点视频。
              </p>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-5 w-full py-2.5 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] font-bold rounded-xl border border-[#d2b48c] text-sm transition-colors shadow-lg"
            >
              了解并进入体验
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
