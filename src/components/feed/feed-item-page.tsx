"use client";

import { AudioPlayer } from "@/components/audio/audio-player";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedItemSummary } from "./feed-item-summary";
import { useState } from "react";
import { FeedItemTranscribe } from "./feed-item-transcribe";
import { useTranscriber } from "@/hooks/use-transcriber";
import { WhisperSettingButton } from "../whisper/whisper-setting-button";
import { FontSizeSetting } from "../font-size-setting";
import { cn } from "@/utils";
import { useDoc } from "use-pouchdb";

export interface Props {
  guid: string;
}

export function FeedItemPage({ guid }: Props) {
  const { doc: feedItem, loading } = useDoc(guid);

  const transcriber = useTranscriber();
  const [fontSize, setFontSize] = useState(14);
  const [currentTab, setCurrentTab] = useState("summary");

  if (loading && feedItem == null) {
    return <></>;
  }

  return (
    <div className="flex justify-start gap-5 px-5 py-8 ring-2 flex-grow h-full overflow-hidden items-start">
      <AudioPlayer feedItem={feedItem} />
      <Tabs
        value={currentTab}
        className="flex flex-col gap-1 items-start flex-grow bg-white p-5 rounded-lg h-full shadow-md"
        onValueChange={setCurrentTab}
      >
        <div className="flex-none flex justify-between w-full items-center">
          <TabsList>
            <TabsTrigger value="summary">介绍</TabsTrigger>
            <TabsTrigger value="transcribe">字幕</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-0">
            <FontSizeSetting value={fontSize} onChange={setFontSize} />
          </TabsContent>
          <TabsContent value="transcribe" className="mt-0">
            <WhisperSettingButton transcriber={transcriber} />
          </TabsContent>
        </div>
        <TabsContent
          value="summary"
          className={cn(
            "w-full h-full flex-grow overflow-hidden",
            currentTab === "summary" ? undefined : "hidden"
          )}
        >
          <FeedItemSummary feedItem={feedItem} fontSize={fontSize} />
        </TabsContent>
        <TabsContent
          value="transcribe"
          className={cn(
            "w-full flex flex-col flex-grow h-full overflow-hidden relative pb-8",
            currentTab === "transcribe" ? undefined : "hidden"
          )}
        >
          <FeedItemTranscribe feedItem={feedItem} transcriber={transcriber} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
