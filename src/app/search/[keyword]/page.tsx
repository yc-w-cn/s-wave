import { FeaturedPodcastList } from "@/components/podcast/featured-podcast-list";
import { cn } from "@/utils";
import { useMemo } from "react";

export interface Props {
  params: { keyword: string };
}

export default function Page({ params }: Props) {
  const keyword = useMemo(
    () => decodeURIComponent(params.keyword),
    [params.keyword]
  );
  return (
    <div
      className={cn(
        "overflow-auto h-full p-8 w-full",
        "scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent"
      )}
    >
      <h3 className="font-bold text-lg text-pink-500 mb-3">
        搜索 『{keyword}』 的结果
      </h3>
      <FeaturedPodcastList keyword={keyword} />
    </div>
  );
}
