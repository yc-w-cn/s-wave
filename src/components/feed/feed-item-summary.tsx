import { cn } from "@/utils";

export interface Props {
  feedItem: any;
  fontSize: number;
}

export function FeedItemSummary({ feedItem, fontSize }: Props) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h3
        className={cn(
          "flex-none font-bold mb-2",
          "text-gray-900 leading-[1.4em]"
        )}
        style={{
          fontSize: fontSize * 1.5,
        }}
      >
        {feedItem.title}
      </h3>
      <div
        className={cn(
          "flex flex-col gap-2 overflow-auto h-full",
          "scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent",
          "text-gray-700 leading-[1.4em]"
        )}
        style={{
          fontSize,
        }}
        dangerouslySetInnerHTML={{
          __html: feedItem.itunes.summary,
        }}
      />
    </div>
  );
}
