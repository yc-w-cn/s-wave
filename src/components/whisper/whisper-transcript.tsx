"use client";

import { useRef, useEffect } from "react";

import { Transcriber, TranscriberData } from "@/hooks/use-transcriber";
import { formatAudioTimestamp } from "@/utils/audio";
import { cn } from "@/utils";

interface Props {
  transcriber: Transcriber;
  transcribedData: TranscriberData | undefined;
}

export function WhisperTranscript({ transcribedData, transcriber }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportTXT = () => {
    let chunks = transcribedData?.chunks ?? [];
    let text = chunks
      .map((chunk) => chunk.text)
      .join("")
      .trim();

    const blob = new Blob([text], { type: "text/plain" });
    saveBlob(blob, "transcript.txt");
  };

  const exportJSON = () => {
    let jsonData = JSON.stringify(transcribedData?.chunks ?? [], null, 2);

    // post-process the JSON to make it more readable
    const regex = /(    "timestamp": )\[\s+(\S+)\s+(\S+)\s+\]/gm;
    jsonData = jsonData.replace(regex, "$1[$2 $3]");

    const blob = new Blob([jsonData], { type: "application/json" });
    saveBlob(blob, "transcript.json");
  };

  // Scroll to the bottom when the component updates
  useEffect(() => {
    if (divRef.current) {
      const diff = Math.abs(
        divRef.current.offsetHeight +
          divRef.current.scrollTop -
          divRef.current.scrollHeight
      );

      if (diff <= 64) {
        // We're close enough to the bottom, so scroll to the bottom
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    }
  });

  return (
    <>
      <div
        ref={divRef}
        className={cn(
          "w-full flex flex-col mt-2 overflow-y-auto relative flex-grow h-full",
          "scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent"
        )}
      >
        {transcribedData?.chunks &&
          transcribedData.chunks.map((chunk, i) => (
            <div
              key={`${i}-${chunk.text}`}
              className="w-full flex flex-row mb-1 rounded-lg px-4 py-2 border text-sm"
            >
              <div className="mr-4">
                {formatAudioTimestamp(chunk.timestamp[0])}
              </div>
              {chunk.text}
            </div>
          ))}
      </div>
      <div className="w-full absolute bottom-0 flex gap-2">
        <button
          onClick={() => transcriber.resetWorker()}
          className={cn(
            "text-pink-500 bg-pink-100 hover:bg-pink-200 focus:ring-4 focus:ring-pink-300",
            "font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center",
            transcribedData && transcribedData.isBusy ? undefined : "hidden"
          )}
        >
          停止操作
        </button>

        <button
          onClick={exportTXT}
          className={cn(
            "text-pink-500 bg-pink-100 hover:bg-pink-200 focus:ring-4 focus:ring-pink-300",
            "font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center",
            transcribedData ? undefined : "hidden"
          )}
        >
          导出为 TXT
        </button>
        <button
          onClick={exportJSON}
          className={cn(
            "text-pink-500 bg-pink-100 hover:bg-pink-200 focus:ring-4 focus:ring-pink-300",
            "font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center",
            transcribedData ? undefined : "hidden"
          )}
        >
          导出为 JSON
        </button>
      </div>
    </>
  );
}
