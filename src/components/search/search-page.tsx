'use client';

import { FeaturedPodcastList } from "@/components/podcast/featured-podcast-list";
import { ErrorContent } from "@/components/ui/error-content";
import { cn } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function SearchPage() {
  const searchParams = useSearchParams();
  const rawKeyword = searchParams.get("keyword") || "";
  const keyword = useMemo(() => decodeURIComponent(rawKeyword), [rawKeyword]);

  if (!keyword) {
    return <ErrorContent />;
  }

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
