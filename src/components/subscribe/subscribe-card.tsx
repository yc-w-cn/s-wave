import Image from "next/image";
import rssSvg from "@/assets/rss.svg";
import { useMemo, useState } from "react";
import { getRssFeed } from "@/lib";
import { SAMPLE_PODCAST_URL } from "@/constants";
import { cn, generateHash } from "@/utils";
import localforage from "localforage";
import { isValidUrl } from "@/utils/url";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

export function SubscribeCard() {
  const router = useRouter();
  const [url, setUrl] = useState(SAMPLE_PODCAST_URL);
  const [isLoading, setIsLoading] = useState(false);

  const isPodcast = useMemo(() => {
    if (url.startsWith("https://podcasts.apple.com/")) {
      return true;
    }
    return false;
  }, [url]);

  return (
    <div className="relative mt-8 mx-5 bg-white rounded-xl p-5 border flex justify-between overflow-hidden min-h-[200px]">
      <div className="relative z-1 flex flex-col items-start gap-3">
        <h3 className="text-lg font-bold text-pink-500">添加订阅</h3>
        <div className="flex items-center">
          <span className="border border-pink-300 text-xs h-[32px] rounded-l-lg px-2 text-pink-300 flex items-center">
            {isPodcast ? "PODCAST" : "RSS FEED"}
          </span>
          <input
            className="border rounded-r-lg focus:outline-none px-2 min-w-[450px] placeholder:font-light text-xs h-[32px] bg-white"
            defaultValue={url}
            onChange={(e) => {
              setUrl(e.currentTarget.value);
            }}
            placeholder="输入 RSS 或者 PODCAST 的网址"
          />
        </div>
        <div className="flex gap-2">
          <button
            className={cn(
              "text-pink-100 bg-pink-500 px-5 rounded-lg text-sm py-1 hover:shadow hover:bg-pink-600",
              "flex flex-row items-center justify-center gap-1"
            )}
            onClick={async () => {
              const targetUrl = isPodcast ? await getRssFeed(url) : url || "";
              if (targetUrl && isValidUrl(targetUrl)) {
                const id = await generateHash(targetUrl);
                await localforage.setItem(`FEED_URL_${id}`, targetUrl);
                router.push(`/podcast/${id}`);
              }
            }}
          >
            {isLoading ? (
              <Spinner text={"正在加载 ..."} />
            ) : (
              <span>下一步</span>
            )}
          </button>
        </div>
      </div>
      <Image
        src={rssSvg}
        alt="RSS Image"
        width={200}
        className="absolute right-[-50px] bottom-[-30px] z-0"
      />
    </div>
  );
}
