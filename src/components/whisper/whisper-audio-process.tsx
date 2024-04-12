"use client";

import React, { useMemo, useState } from "react";
import axios from "axios";
import { WhisperTranscribeButton } from "./whisper-transcribe-button";
import { Transcriber } from "@/hooks/use-transcriber";
import Progress from "../ui/progress";
import { AudioSource } from "@/enums/audio-source";
import { getWhisperConfig } from "@/config/whisper";
import { easyCorsProxy } from "@/lib/cors-proxy";
import { WhisperSettingBadges } from "./whisper-setting-badges";
import localforage from "localforage";
import { generateHash } from "@/utils/hash";

export interface Props {
  transcriber: Transcriber;
  audioUrl: string;
}

export function WhisperAudioProcess(props: Props) {
  const { transcriber, audioUrl } = props;
  const { SAMPLING_RATE } = useMemo(() => getWhisperConfig(), []);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [audioData, setAudioData] = useState<
    | {
        buffer: AudioBuffer;
        url: string;
        source: AudioSource;
        mimeType: string;
      }
    | undefined
  >(undefined);
  const [requestAbortController, setRequestAbortController] = useState<
    AbortController | undefined
  >(undefined);

  const isAudioLoading = progress !== undefined;

  const setAudioFromDownload = async (data: ArrayBuffer, mimeType: string) => {
    const audioCTX = new AudioContext({
      sampleRate: SAMPLING_RATE,
    });
    const blobUrl = URL.createObjectURL(new Blob([data], { type: "audio/*" }));
    const decoded = await audioCTX.decodeAudioData(data);
    setAudioData({
      buffer: decoded,
      url: blobUrl,
      source: AudioSource.URL,
      mimeType: mimeType,
    });
  };

  const downloadAudioFromUrl = async (
    requestAbortController: AbortController
  ) => {
    if (audioUrl) {
      try {
        setAudioData(undefined);
        setProgress(0);
        const urlKey = await generateHash(audioUrl);
        const cacheKey = `AUDIO_CACHE_${urlKey}`;
        const cachedResult = await localforage.getItem<{
          data: ArrayBuffer;
          mimeType: string;
        }>(cacheKey);
        const proxyAudioUrl = easyCorsProxy(audioUrl);
        if (cachedResult) {
          const { data, mimeType } = cachedResult;
          console.log(`audio loaded  from cache: ${cacheKey}`);
          await setAudioFromDownload(data, mimeType);
        } else {
          const { data, headers } = (await axios.get(proxyAudioUrl, {
            signal: requestAbortController.signal,
            responseType: "arraybuffer",
            onDownloadProgress(progressEvent) {
              setProgress(progressEvent.progress || 0);
            },
          })) as {
            data: ArrayBuffer;
            headers: { "content-type": string };
          };

          let mimeType = headers["content-type"];
          if (!mimeType || mimeType === "audio/wave") {
            mimeType = "audio/wav";
          }
          await localforage.setItem(cacheKey, { audioUrl, data, mimeType });
          await setAudioFromDownload(data, mimeType);
        }
      } catch (error) {
        console.log("Request failed or aborted", error);
      } finally {
        setProgress(undefined);
      }
    }
  };

  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex gap-2 flex-wrap">
        <WhisperTranscribeButton
          onClick={async () => {
            const requestAbortController = new AbortController();
            setRequestAbortController(requestAbortController);
            await downloadAudioFromUrl(requestAbortController);
            if (audioData) {
              transcriber.start(audioData.buffer);
            }
          }}
          isAudioLoading={isAudioLoading}
          isModelLoading={transcriber.isModelLoading}
          isTranscribing={transcriber.isBusy}
        />
        <WhisperSettingBadges transcriber={transcriber} />
      </div>
      {isAudioLoading && (
        <div className="flex my-3 gap-2">
          <Progress text={"正在下载音频..."} percentage={progress * 100} />
          <button
            className="flex-none bg-gray-100 text-gray-500 text-xs rounded-xl px-2 py-1"
            onClick={() => {
              requestAbortController?.abort();
              setRequestAbortController(undefined);
            }}
          >
            取消
          </button>
        </div>
      )}
      {audioData && transcriber.progressItems.length > 0 && (
        <div className="relative z-10 p-4 w-full">
          <label className="text-sm text-gray-500">
            正在加载模型文件... (只运行一次)
          </label>
          {transcriber.progressItems.map((data) => (
            <div key={data.file}>
              <Progress text={data.file} percentage={data.progress} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
