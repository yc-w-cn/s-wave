"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      const searchUrl = `/search/?keyword=${encodeURIComponent(inputValue)}`
      setInputValue("")
      router.push(searchUrl);
    }
  };

  return (
    <div className="relative bg-gray-100 rounded-lg px-2 flex items-center gap-1 w-[250px]">
      <MagnifyingGlassIcon className="text-gray-500" />
      <input
        type="text"
        className="bg-transparent text-sm focus:outline-0"
        placeholder="搜索..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
}
