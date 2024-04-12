import { cn } from "@/utils";
import { Rss } from "lucide-react";
import Link from "next/link";

export function SubscribeButton() {
  return (
    <Link
      href="/subscribe"
      className={cn(
        "text-pink-500 bg-pink-100 flex items-center px-2 gap-1 rounded-lg text-sm py-1 my-3",
        "opacity-80 hover:opacity-100",
        "transition-all duration-300"
      )}
    >
      <Rss size={16} />
      <span>添加订阅</span>
    </Link>
  );
}
