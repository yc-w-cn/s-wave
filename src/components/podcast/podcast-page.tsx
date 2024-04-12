"use client";

import { useEffect, useState } from "react";
import { PodcastCard } from "./podcast-card";
import { FeedItemCard } from "../feed/feed-item-card";
import { CustomOutput } from "@/types/custom-output";
import { CustomFeed } from "@/types";
import { Item } from "rss-parser";
import useSWR from "swr";
import { localforageFetcher } from "@/lib/fetchers";
import { getRssContent } from "@/lib";
import { cn } from "@/utils";
import { usePouch } from "use-pouchdb";
import { saveFeedItems } from "@/lib/save-feed-items";

export interface Props {
  pageId: string;
}
export function PodcastPage({ pageId }: Props) {
  const db = usePouch();
  const [feedContent, setFeedContent] = useState<CustomOutput & any>();
  const { data: feedUrl } = useSWR(
    `FEED_URL_${pageId}`,
    localforageFetcher<string>
  );

  useEffect(() => {
    if (feedUrl) {
      getRssContent(feedUrl).then((res) => {
        setFeedContent(res);
        saveFeedItems(db, res.items)
      });
    }
  }, [feedUrl, db]);

  if (!feedContent) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex gap-5">
      <div className="flex-none pt-8">
        <PodcastCard feedContent={feedContent} />
      </div>
      <div
        className={cn(
          "flex flex-col gap-5 pb-8 pt-8 pr-6 overflow-auto h-full",
          "scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent"
        )}
      >
        {feedContent.items.map((feedItem: CustomFeed & Item) => (
          <FeedItemCard key={feedItem.guid} feedItem={feedItem} />
        ))}
      </div>
    </div>
  );
}
