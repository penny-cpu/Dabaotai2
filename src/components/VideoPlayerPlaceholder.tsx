import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import { soundFX } from '../utils/soundEngine';

interface VideoPlayerPlaceholderProps {
  title: string;
  subtitle?: string;
  videoSrc?: string;
  posterImage?: string;
  description?: string;
  videoAssetPathHint?: string;
  autoPlay?: boolean;
  hideBorder?: boolean;
  hideTitle?: boolean;
}

export const VideoPlayerPlaceholder: React.FC<VideoPlayerPlaceholderProps> = ({
  title,
  subtitle,
  videoSrc,
  posterImage,
  description,
  videoAssetPathHint,
  autoPlay = true,
  hideBorder = false,
  hideTitle = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (autoPlay && videoRef.current && videoSrc) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy might require mute or user interaction
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  }, [autoPlay, videoSrc]);

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
          setIsPlaying(true);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  return (
    <div className="relative w-full flex flex-col items-center font-serif select-none">
      {/* 🚨 只要个标题，写在视频弹窗上方 */}
      {!hideTitle && title && (
        <div className="w-full text-center mb-2.5 px-1">
          <h3 className="text-sm sm:text-base font-serif font-black text-[#F1D98D] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {title}
          </h3>
        </div>
      )}

      {/* 🚨 16:9 视频弹窗主体：无边框，无四角线 */}
      <div className={`relative w-full aspect-[16/9] ${hideBorder ? 'rounded-none shadow-none bg-transparent' : 'rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.85)] bg-black'} border-0 overflow-hidden flex items-center justify-center`}>
        {videoSrc && !hasVideoError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterImage}
            playsInline
            loop
            muted={isMuted}
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
            onError={() => {
              setHasVideoError(true);
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          // Simulated Han Dance Animated Fallback Canvas with Poster
          <div className="relative w-full h-full">
            {posterImage && (
              <img
                src={posterImage}
                alt={title}
                className={`w-full h-full object-cover filter brightness-90 transition-transform duration-1000 ${
                  isPlaying ? 'scale-105 contrast-110' : ''
                }`}
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#D6A84B] bg-[#2E1A11]/70 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-[#F1D98D]" />
              </div>
              <span className="text-[10px] text-[#F1D98D] font-mono mt-2 bg-black/70 px-2.5 py-0.5 rounded-full border border-[#D6A84B]/60">
                大汉乐舞影像
              </span>
            </div>
          </div>
        )}

        {/* Play/Pause Overlay Button */}
        <button
          onClick={togglePlay}
          className={`absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 border-2 border-[#D6A84B] flex items-center justify-center text-[#F1D98D] shadow-[0_0_15px_rgba(214,168,75,0.5)] transition-all active:scale-95 z-20 ${
            isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        {/* Video Controls Bottom Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="text-[#F1D98D] hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={handleRestart}
              className="text-[#A89078] hover:text-[#F1D98D] transition-colors"
              title="重新播放"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleMute}
              className="text-[#A89078] hover:text-[#F1D98D] transition-colors"
              title={isMuted ? '开启声音' : '静音'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[8.5px] font-mono text-[#F1D98D] bg-black/60 px-2 py-0.5 rounded border border-[#D6A84B]/40">
              {isPlaying ? '播放中' : '已暂停'}
            </span>
          </div>
        </div>

        {/* Thin Gold Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-[#2A160E] z-30">
          <div
            className="h-full bg-gradient-to-r from-[#8C6D46] to-[#F1D98D] transition-all duration-200 shadow-[0_0_8px_#F1D98D]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
