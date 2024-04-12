import { FeaturedPodcastList } from "@/components/podcast/featured-podcast-list";
import { cn } from "@/utils";

export default function Page() {
  return (
    <div
      className={cn(
        "overflow-auto h-full p-8 w-full",
        "scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent"
      )}
    >
      <h3 className="font-bold text-lg text-pink-500 mb-3">
        热门推荐
      </h3>
      <FeaturedPodcastList />
    </div>
  );
}
