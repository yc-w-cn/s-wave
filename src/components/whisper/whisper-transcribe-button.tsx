"use client";

import { cn } from "@/utils";
import { Spinner } from "../ui/spinner";
import { PlayIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isModelLoading: boolean;
  isTranscribing: boolean;
  isAudioLoading: boolean;
}

export function WhisperTranscribeButton(props: Props): JSX.Element {
  const {
    isModelLoading,
    isTranscribing,
    isAudioLoading,
    onClick,
    ...buttonProps
  } = props;
  return (
    <button
      className={cn(
        "text-white bg-pink-500 rounded-lg text-xs px-2 py-2 font-medium",
        "flex flex-row items-center justify-center gap-1",
        "hover:bg-pink-600",
        "transition-all duration-300"
      )}
      onClick={(event) => {
        if (onClick && !isTranscribing && !isModelLoading) {
          onClick(event);
        }
      }}
      disabled={isTranscribing}
      {...buttonProps}
    >
      {isAudioLoading ? (
        <Spinner text={"正在加载音频 ..."} />
      ) : isModelLoading ? (
        <Spinner text={"正在加载模型 ..."} />
      ) : isTranscribing ? (
        <Spinner text={"正在听译 ..."} />
      ) : (
        <>
          <PlayIcon strokeWidth={2} size={16} />
          <span>开始 AI 听译</span>
        </>
      )}
    </button>
  );
}
