import nextSvg from "@/assets/audio-next.svg";
import previousSvg from "@/assets/audio-previous.svg";
import playSvg from "@/assets/audio-play.svg";
import pauseSvg from "@/assets/audio-pause.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import { formatAudioTimestamp } from "@/utils";

export interface AudioPlayerProps {
  feedItem: any;
}

export function AudioPlayer({ feedItem }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= totalDuration * 0.1;
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += totalDuration * 0.1;
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(audioRef.current.duration);
    }
  };

  // 处理点击进度条事件
  // TODO: 部分情况下会不准确
  const handleProgressClick = (event: any) => {
    if (audioRef.current) {
      const clickPosition =
        event.clientX - event.target.getBoundingClientRect().left;
      const progressBarWidth = event.target.clientWidth;
      const newTime = (clickPosition / progressBarWidth) * totalDuration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="flex-none flex-grow-0 bg-white p-8 rounded-lg shadow-md w-80">
      <audio
        ref={audioRef}
        src={feedItem.enclosure.url}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className="hidden"
      ></audio>
      <img
        src={feedItem.itunes.image}
        alt={feedItem.title}
        className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-pink-50"
      />
      <h2 className="text-xl font-semibold text-center">{feedItem.title}</h2>
      <p className="text-gray-600 text-sm text-center">@{feedItem.creator}</p>
      <div className="mt-6 flex justify-center items-center">
        <button
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={() => handleBackward()}
        >
          <Image
            src={previousSvg}
            alt="Previous"
            width={25}
            height={25}
            className="m-1"
          />
        </button>
        <button
          className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none mx-4"
          onClick={() => togglePlay()}
        >
          {isPlaying ? (
            <Image
              src={pauseSvg}
              alt="Pause"
              width={35}
              height={35}
              className="m-1"
            />
          ) : (
            <Image
              src={playSvg}
              alt="Pause"
              width={35}
              height={35}
              className="m-1"
            />
          )}
        </button>
        <button
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={() => handleForward()}
        >
          <Image
            src={nextSvg}
            alt="Next"
            width={25}
            height={25}
            className="m-1"
          />
        </button>
      </div>
      <div
        className="mt-6 bg-gray-200 h-2 rounded-full cursor-pointer overflow-hidden"
        onClick={handleProgressClick}
      >
        <div
          className="bg-pink-500 h-2 rounded-full"
          style={{
            width: `${(currentTime / totalDuration) * 100}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{formatAudioTimestamp(currentTime)}</span>
        <span>{formatAudioTimestamp(totalDuration - currentTime)}</span>
      </div>
    </div>
  );
}
