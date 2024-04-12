import Parser from "rss-parser";
import { corsProxy } from "@/lib";
import { CustomFeed, CustomItem } from "@/types";

export async function getRssContent(feedUrl: string) {
  const parser = new Parser<CustomFeed, CustomItem>();
  const feed = await parser.parseURL(corsProxy(feedUrl));
  return feed;
}
