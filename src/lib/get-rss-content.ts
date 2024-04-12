import Parser from "rss-parser";
import { easyCorsProxy } from "@/lib";
import { CustomFeed, CustomItem } from "@/types";

export async function getRssContent(feedUrl: string) {
  const parser = new Parser<CustomFeed, CustomItem>();
  const feed = await parser.parseURL(easyCorsProxy(feedUrl));
  return feed;
}
