import { Item } from "rss-parser";

export type CustomItem = {
  author?: string;
  "content:encoded"?: string;
  "content:encodedSnippet"?: string;
  itunes?: {
    author?: string;
    duration?: string;
    episodeType?: string;
    explicit?: string;
    image?: string;
    subtitle?: string;
    summary?: string;
  };
};

export type FeedItem = CustomItem & Item;
