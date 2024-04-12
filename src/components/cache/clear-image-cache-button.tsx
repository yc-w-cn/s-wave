'use client';

import { cn } from "@/utils";
import localforage from "localforage";
import { Trash2Icon } from "lucide-react";
import { useToast } from "../ui/use-toast";

export function ClearImageCacheButton() {
  const { toast } = useToast();
  return (
    <button
      className={cn(
        "text-pink-500 bg-pink-100 flex items-center px-2 gap-1 rounded-lg text-sm py-1 my-3",
        "opacity-80 hover:opacity-100",
        "transition-all duration-300"
      )}
      onClick={async () => {
        const allKeys = await localforage.keys();
        const imageCacheKeys = allKeys.filter((key) =>
          key.startsWith("IMAGE_CACHE")
        );
        imageCacheKeys.forEach(async (key) => {
          await localforage.removeItem(key);
        });
        toast({
          title: "操作完成",
          description: `已清理图片缓存 ${imageCacheKeys.length}个`,
        });
      }}
    >
      <Trash2Icon size={16} />
      <span>清理图片缓存</span>
    </button>
  );
}
