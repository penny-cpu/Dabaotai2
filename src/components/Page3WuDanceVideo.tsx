import React, { useState, useEffect, useRef } from 'react';
import { WU_DANCE_VIDEO } from '../data/museumData';
import { soundFX } from '../utils/soundEngine';
import { Play, Pause, RotateCcw, Volume2, ShieldAlert, ArrowDown } from 'lucide-react';

interface Page3Props {
  onNextPage: () => void;
}

export const Page3WuDanceVideo: React.FC<Page3Props> = ({ onNextPage }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sandDropping, setSandDropping] = useState<boolean>(true);
  const animRef = useRef<number | null>(null);

  // Sand collapsing entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSandDropping(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Video progress timer loop simulation
  useEffect(() => {
    if (isPlaying) {
      soundFX.playStoneDrum();
      animRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 20) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    } else {
      if (animRef.current) clearInterval(animRef.current);
    }
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full bg-[#1a120b] text-[#d2b48c] flex flex-col justify-between overflow-hidden font-serif">
      {/* Sand Collapse Transition Effect Overlay */}
      {sandDropping && (
        <div className="absolute inset-0 z-50 bg-[#1a120b] flex flex-col items-center justify-center p-6 text-center animate-out fade-out duration-1000">
          <div className="w-16 h-16 rounded-full border-4 border-t-[#d2b48c] border-[#3d2b1f] animate-spin mb-4" />
          <p className="text-sm font-black text-[#e6d5b8] tracking-widest animate-pulse title-drop-shadow">
            沙石向下塌落... 穿越地层进入暗室...
          </p>
          <span className="text-xs text-[#c2a385] mt-2 font-mono uppercase tracking-widest">-5.5m 黄肠题凑核心室</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="p-3 bg-[#241a13] border-b border-[#3d2b1f] flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#d2b48c]" />
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-70 text-[#c2a385] font-mono">
              PERFORMANCE
            </span>
            <h2 className="text-sm font-black text-[#e6d5b8] tracking-widest title-drop-shadow">
              第三页：汉代【武舞】数字展示
            </h2>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#3d2b1f] text-[#e6d5b8] border border-[#d2b48c]/40 font-serif">
          画像石影音
        </span>
      </div>

      {/* Scrollable Center Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* 16:9 Video Canvas Frame */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#3d2b1f] shadow-2xl bg-[#000] group ring-1 ring-[#d2b48c]/30">
          {/* Animated Video Canvas Simulation */}
          <img
            src={WU_DANCE_VIDEO.posterUrl}
            alt="汉代武舞"
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105 filter brightness-110 contrast-125' : 'filter brightness-75 contrast-100'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Animated Pulse Light overlay during playback */}
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d2b1f]/40 via-transparent to-[#3d2b1f]/20 animate-pulse pointer-events-none" />
          )}

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
            <div className="flex items-center justify-between text-xs text-[#e6d5b8] font-serif bg-[#1a120b]/80 px-3 py-1.5 rounded-xl backdrop-blur-md border border-[#3d2b1f]">
              <span className="flex items-center gap-1.5 font-bold tracking-wider">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#d2b48c] animate-ping' : 'bg-gray-500'}`} />
                {WU_DANCE_VIDEO.title}
              </span>
              <span className="font-mono text-[10px] text-[#c2a385]">{currentTime.toFixed(0)}s / 20s</span>
            </div>

            {/* Play / Pause Big Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-[#3d2b1f]/95 hover:bg-[#5c4033] text-[#e6d5b8] border-2 border-[#d2b48c] flex items-center justify-center shadow-2xl transition-all transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </button>
            </div>

            {/* Timeline Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-[#1a120b] h-2 rounded-full overflow-hidden border border-[#3d2b1f]">
                <div
                  className="bg-[#d2b48c] h-full transition-all duration-300"
                  style={{ width: `${(currentTime / 20) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#c2a385] font-serif">
                <span className="font-bold">兵器：戈、矛、盾、斧、干</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentTime(0);
                      setIsPlaying(true);
                    }}
                    className="hover:text-[#e6d5b8] flex items-center gap-0.5 font-bold"
                  >
                    <RotateCcw className="w-3 h-3 text-[#d2b48c]" /> 重播
                  </button>
                  <Volume2 className="w-3 h-3 text-[#d2b48c]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UI Modal Box Below Video (Han Dynasty Stone Rubbing Texture & Visual) */}
        <div className="relative bg-[#241a13] border-2 border-[#3d2b1f] rounded-2xl p-4 shadow-xl text-[#d2b48c] space-y-3">
          {/* Stone Relic Seal Top Edge */}
          <div className="flex items-center justify-between border-b border-[#3d2b1f] pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#3d2b1f] text-[#e6d5b8] font-serif font-black text-xs flex items-center justify-center rounded-lg border border-[#d2b48c]/40">
                刻
              </div>
              <h3 className="text-sm font-black font-serif text-[#e6d5b8] tracking-wider title-drop-shadow">
                【出征舞蹈】· 画像石铭刻解析
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a120b] text-[#c2a385] border border-[#3d2b1f]">
              HAN RITUAL
            </span>
          </div>

          {/* Required Full Text Box */}
          <div className="text-xs text-[#c2a385] font-serif leading-relaxed space-y-2 bg-[#1a120b] p-3.5 rounded-xl border border-[#3d2b1f] shadow-inner">
            <p className="indent-6 text-justify">
              【出征舞蹈】武舞是中国古代礼乐制度中的重要舞蹈类型，以戈、矛、盾、斧、干等兵器为舞具，通过整齐有力的动作、阵列变化和鼓乐节奏，表现军队训练、征战凯旋以及威武雄壮的精神风貌。武舞不仅具有一定的军事象征意义，也是古代国家礼仪和祭祀活动的重要组成部分，体现了“以舞演武、以乐彰德”的礼乐文化传统。
            </p>
          </div>

          {/* Cultural Note Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-serif text-[#c2a385]">
            <span className="px-2.5 py-1 rounded-lg bg-[#1a120b] border border-[#3d2b1f]">
              ⚔️ 舞具：干戈矛盾
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#1a120b] border border-[#3d2b1f]">
              🥁 鼓乐阵列变化
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#1a120b] border border-[#3d2b1f]">
              🏛️ 礼乐制度：以乐彰德
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Button to Page 4 */}
      <div className="p-3 bg-[#241a13] border-t border-[#3d2b1f] z-10">
        <button
          onClick={onNextPage}
          className="w-full py-3 px-4 bg-[#3d2b1f] hover:bg-[#5c4033] text-[#e6d5b8] font-serif font-black text-xs rounded-2xl border border-[#d2b48c] flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98 tracking-widest"
        >
          <span>滑动进入第四页：古文物发掘 (之字形埋藏)</span>
          <ArrowDown className="w-4 h-4 text-[#d2b48c]" />
        </button>
      </div>
    </div>
  );
};
