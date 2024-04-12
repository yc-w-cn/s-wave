"use client";

import { getFeaturedPodcasts } from "@/lib/get-featured-podcasts";
import { useEffect, useState } from "react";
import { CachedImage } from "../cache/cached-image";
import Link from "next/link";

export interface Props {
  keyword?: string;
}

export function FeaturedPodcastList({ keyword }: Props) {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    getFeaturedPodcasts().then((items) => {
      if (keyword) {
        const filterItems = items.filter(
          (item) => item.name.includes(keyword) || item.desc.includes(keyword)
        );
        setPodcasts(filterItems);
        if (filterItems.length === 0) {
          setIsEmpty(true);
        }
      } else {
        setPodcasts(items);
      }
    });
  }, [keyword]);
  return (
    <div className="grid grid-cols-6 gap-4">
      {podcasts.map((podcast, index) => (
        <Link
          key={`podcast-${index}`}
          href={`/podcast/${podcast.id}`}
          className="bg-white border p-2 rounded shadow-sm hover:border-pink-500"
        >
          <CachedImage
            src={podcast.image}
            alt={`Image for ${podcast.name}`}
            className="rounded"
          />
          <h3 className="text-sm font-bold my-1">{podcast.name}</h3>
          <h4 className="text-xs text-ellipsis line-clamp-1 text-gray-500">
            {podcast.desc}
          </h4>
        </Link>
      ))}
      {isEmpty && (
        <span className="bg-white border p-2 rounded shadow-sm text-sm flex justify-center items-center text-center text-gray-500 min-h-[176px]">
          没有符合<br />
          条件的结果
        </span>
      )}
    </div>
  );
}
