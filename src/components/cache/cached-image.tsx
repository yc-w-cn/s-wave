import { corsProxy, easyCorsProxy } from "@/lib";
import { generateHash } from "@/utils";
import dayjs from "dayjs";
import localforage from "localforage";
import { useEffect, useState } from "react";

export function CachedImage({
  src,
  alt,
  ...imgProps
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [cachedSrc, setCachedSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      if (src) {
        const hashedSrc = await generateHash(src);
        const dateString = dayjs().format("YYYYMMDD");
        const cacheKey = `IMAGE_CACHE_${hashedSrc}_${dateString}`;
        const cachedResult = await localforage.getItem(cacheKey);

        if (cachedResult) {
          setCachedSrc(cachedResult as string);
        } else {
          try {
            const proxiedUrl = easyCorsProxy(src);
            const response = await fetch(proxiedUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
              const base64Data = reader.result as string;
              setCachedSrc(base64Data);
              await localforage.setItem(cacheKey, base64Data);
            };
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        }
      }
    };

    init();

    return () => {
      // Cleanup function, clear any side effects if needed
    };
  }, [src]);
  return <img src={cachedSrc || src} alt={alt} {...imgProps} />;
}
