"use client";

import { WhisperTranscript } from "@/components/whisper/whisper-transcript";
import { Transcriber } from "@/hooks/use-transcriber";
import { WhisperAudioProcess } from "@/components/whisper/whisper-audio-process";

export interface Props {
  feedItem: any;
  transcriber: Transcriber;
}

export function FeedItemTranscribe({ feedItem, transcriber }: Props) {
  return (
    <>
      <WhisperAudioProcess
        transcriber={transcriber}
        audioUrl={feedItem.enclosure.url}
      />
      <WhisperTranscript
        transcriber={transcriber}
        transcribedData={transcriber.output}
      />
    </>
  );
}
