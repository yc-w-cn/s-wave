"use client";

import "@/app/globals.css";
import { NavBar } from "@/components/nav/nav-bar";
import { Search } from "@/components/search/search";
import { SubscribeButton } from "@/components/subscribe/subscribe-button";
import { Logo } from "@/components/logo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";
import { Provider } from "use-pouchdb";
import PouchDB from "pouchdb-browser";
import { cn } from "@/utils";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);
const db = new PouchDB("local");

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <Provider pouchdb={db}>
      <main className="flex h-screen flex-col items-center justify-between p-16 overflow-hidden">
        <div className="flex flex-col flex-grow border shadow-lg bg-[#f3f5f8] w-full rounded-xl overflow-hidden">
          <header className="flex justify-between bg-white py-3 px-5 items-center">
            <div className="flex">
              <Logo />
              <Search />
            </div>
            <div className="flex items-center gap-2">
              <SubscribeButton />
              <a
                href="https://github.com/yc-w-cn/s-wave"
                target="_blank"
                className={cn(
                  "flex items-center px-2 gap-1 rounded-lg text-sm py-[6.8px] my-3",
                  "opacity-80 hover:opacity-100",
                  "transition-all duration-300",
                  "hover:bg-gray-100"
                )}
              >
                <GitHubLogoIcon fontSize={16} />
              </a>
            </div>
          </header>
          <div className="flex flex-grow justify-start overflow-hidden">
            <NavBar />
            <div className="flex justify-center items-center flex-grow overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </main>
    </Provider>
  );
}
