import { cn } from "@/utils";
import Link from "next/link";

export interface Props {
  feedContent: any;
}

export function FeedContentCard({ feedContent }: Props) {
  return (
    <Link
      href={`/feed-content/${feedContent.id || "undefined"}`}
      className={cn(
        "relative bg-white rounded-xl p-5 border overflow-hidden",
        "flex flex-col md:flex-row justify-between items-center gap-5",
        "hover:border-pink-500"
      )}
    >
      <img
        src={feedContent.itunes.image}
        alt="Itunes Image"
        width={150}
        height={150}
        className="flex-none rounded-lg"
      />
      <div className="flex flex-shrink flex-col items-start gap-3">
        <h3 className="text-lg font-bold">{feedContent.title}</h3>
        <p className="text-sm text-gray-700">{feedContent.description}</p>
        <p className=" text-gray-500 text-sm">{feedContent.copyright}</p>
      </div>
    </Link>
  );
}
