"use client";

import { cn, generateHash } from "@/utils";
import { CachedImage } from "../cache/cached-image";
import { useDoc, usePouch } from "use-pouchdb";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Props {
  feedContent: any;
}

export function PodcastCard({ feedContent }: Props) {
  const db = usePouch();
  const { toast } = useToast();
  const [hasDoc, setHasDoc] = useState<boolean | undefined>(undefined);
  const [doc, setDoc]=useState<any>(undefined)
  const [timestamp, setTimestamp] = useState(new Date().getTime());

  useEffect(() => {
    const fetchHasDoc = async () => {
      const _id = feedContent._id || (await generateHash(feedContent.feedUrl));
      db.get(_id)
        .then((item) => {
          setDoc(item)
          setHasDoc(true)
        })
        .catch(() => setHasDoc(false));
    };
    fetchHasDoc();
  }, [feedContent, db, timestamp]);

  return (
    <div
      className={cn(
        "relative bg-white rounded-xl p-5 border overflow-hidden",
        "flex flex-col justify-between items-center gap-5",
        "max-w-[250px]"
      )}
    >
      <CachedImage
        src={feedContent.itunes.image}
        alt="Itunes Image"
        width={200}
        height={200}
        className="flex-none rounded-lg"
      />
      <div className="flex flex-shrink flex-col items-start gap-3">
        <h3 className="text-lg font-bold">{feedContent.title}</h3>
        <p className="text-sm text-gray-700">{feedContent.description}</p>
        <p className=" text-gray-500 text-sm">{feedContent.copyright}</p>
      </div>
      {hasDoc == undefined ||
        (!hasDoc && (
          <button
            className={cn(
              "text-pink-500 bg-pink-100 flex items-center px-4 gap-1 rounded-lg text-md py-1 font-semibold",
              "outline outline-[1px] outline-pink-500",
              "opacity-80 hover:opacity-100",
              "transition-all duration-300"
            )}
            onClick={async () => {
              const _id = feedContent._id || await generateHash(feedContent.feedUrl);
              const doc = {
                _id, // give the document a unique id
                ...feedContent,
              };
              await db.put(doc);
              toast({
                title: "操作完成",
                description: `添加播客到订阅`,
              });
              setTimestamp(new Date().getTime());
            }}
          >
            <span>加入订阅</span>
          </button>
        ))}
      {hasDoc && (
        <button
          className={cn(
            "text-gray-500 flex items-center px-4 gap-1 rounded-lg text-md py-1 font-semibold",
            "outline outline-[1px] outline-gray-500",
            "hover:bg-gray-100 ",
            "transition-all duration-300"
          )}
          onClick={async () => {
            await db.remove(doc);
            toast({
              title: "操作完成",
              description: `已取消订阅`,
            });
            setTimestamp(new Date().getTime());
          }}
        >
          <span>取消订阅</span>
        </button>
      )}
    </div>
  );
}
