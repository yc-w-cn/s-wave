import { generateHash } from "@/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Props {
  feedItem: any;
}

export function FeedItemCard({ feedItem }: Props) {
  const [guid, setGuid] = useState<string>("undefined");

  useEffect(() => {
    const initGuid = async () => {
      if (feedItem.guid) {
        setGuid(await generateHash(feedItem.guid));
      }
    };
    initGuid();
  }, [feedItem.guid]);

  return (
    <Link
      href={`/item/?guid=${guid}`}
      className="flex-none bg-white p-5 rounded-xl flex flex-col gap-3 items-start border overflow-hidden hover:border-pink-500"
    >
      <span className="text-sm bg-gray-100 px-2 rounded-lg text-gray-700">
        {dayjs(feedItem.isoDate).format("YYYY-MM-DD")}
      </span>
      <h3 className="font-bold text-md">{feedItem.title}</h3>
      <div className="text-ellipsis line-clamp-3 text-sm text-gray-700 w-full">
        {feedItem.content}
      </div>
      <audio controls src={feedItem.enclosure?.url} className="w-[280px]" />
    </Link>
  );
}
