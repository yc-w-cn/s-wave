"use client";

import { RssIcon } from "lucide-react";
import { CachedImage } from "../cache/cached-image";
import Link from "next/link";
import { useFind } from "use-pouchdb";
import { cn } from "@/utils";

export function SubscriptionPodcastList() {
  const { docs, loading } = useFind<any>({
    index: {
      fields: ["guid"],
    },
    selector: {
      guid: { $exists: false },
    },
  });

  if (loading && docs.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      {docs.map((doc) => (
        <Link
          key={`podcast-${doc._id}`}
          href={`/podcast/?id=${doc._id}`}
          className="bg-white border p-2 rounded shadow-sm hover:border-pink-500"
        >
          <CachedImage
            src={doc.itunes.image}
            alt={`Image for ${doc.title}`}
            className="rounded"
          />
          <h3 className="text-sm font-bold my-1">{doc.title}</h3>
          <h4 className="text-xs text-ellipsis line-clamp-1 text-gray-500">
            {doc.description}
          </h4>
        </Link>
      ))}
      <Link
        href={`/subscribe`}
        className={cn(
          "bg-white border p-2 rounded shadow-sm hover:border-pink-500 text-pink-500",
          "flex gap-2 flex-col justify-center items-center",
          "min-h-[176px]"
        )}
      >
        <RssIcon />
        <span>添加订阅</span>
      </Link>
    </div>
  );
}
