import React, { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Film } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface VideoPlayerPlaceholderProps {
  title: string;
  subtitle: string;
  videoSrc?: string;
  posterImage: string;
  description: string;
  videoAssetPathHint?: string;
}

export const VideoPlayerPlaceholder: React.FC<VideoPlayerPlaceholderProps> = ({
  title,
  subtitle,
  videoSrc,
  posterImage,
  description,
  videoAssetPathHint,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    soundFX.playStoneDrum();
    if (!videoRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setHasVideoError(true);
          setIsPlaying(true); // fall back to simulated animated dance
        });
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#140e0a] border-2 border-amber-600/70 overflow-hidden shadow-2xl flex flex-col font-serif select-none">
      {/* Video Viewport Area */}
      <div className="relative w-full aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
        {videoSrc && !hasVideoError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterImage}
            playsInline
            onTimeUpdate={() => {
              if (videoRef.current) {
                const pct = (videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100;
                setProgress(pct);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              setProgress(100);
            }}
            onError={() => setHasVideoError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          // Simulated Han Dance Animated Fallback Canvas with Poster
          <div className="relative w-full h-full">
            <img
              src={posterImage}
              alt={title}
              className={`w-full h-full object-cover filter brightness-90 transition-transform duration-1000 ${
                isPlaying ? 'scale-105 contrast-110' : ''
              }`}
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-400/80 bg-amber-950/40 flex items-center justify-center animate-ping">
                  <Sparkles className="w-8 h-8 text-amber-300" />
                </div>
                <span className="text-[10px] text-amber-200 font-mono mt-2 bg-black/60 px-2 py-0.5 rounded-full border border-amber-600/60">
                  舞姿连动解析中...
                </span>
              </div>
            )}
          </div>
        )}

        {/* Play/Pause Overlay Button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all active:scale-95 z-20"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        {/* Progress Line */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-[#24170d]">
          <div
            className="h-full bg-amber-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Info & Caption Area */}
      <div className="p-3 bg-[#1c130d] space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-[#ffe89c] tracking-wider flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>{title}</span>
          </h4>
          <span className="text-[9px] font-mono text-[#a3805d]">{subtitle}</span>
        </div>

        <p className="text-[10px] text-[#e6d5b8] leading-relaxed">
          {description}
        </p>

        {videoAssetPathHint && (
          <div className="text-[8px] font-mono text-[#8c7561] bg-[#120a06] px-2 py-0.5 rounded border border-[#3d2b1f] truncate">
            资源预留路径: {videoAssetPathHint}
          </div>
        )}
      </div>
    </div>
  );
};
