"use client";

import { cn } from "@/utils";
import { SubscribeCard } from "./subscribe-card";

export function SubscribePage() {
  return (
    <div className="w-full h-full overflow-auto scrollbar scrollbar-thumb-gray-200 scrollbar-track-transparent">
      <div
        className={cn(
          "flex flex-col flex-grow justify-start gap-5 overflow-auto max-w-[800px]"
        )}
      >
        <SubscribeCard />
      </div>
    </div>
  );
}
