/**
 * Get RSS Feed
 * - Helps you discover and extract RSS feeds from Apple Podcasts, Google Podcasts, SoundCloud, and blog / websites.
 * @see {@link https://www.getrssfeed.com/}
 */

import axios from "axios";
import * as cheerio from "cheerio";
import { easyCorsProxy } from "./cors-proxy";
import queryString from "query-string";

/**
 * Get RSS Feed
 * - Helps you discover and extract RSS feeds from Apple Podcasts, Google Podcasts, SoundCloud, and blog / websites.
 */
export async function getRssFeed(url: string) {
  const res = await axios.post(
    easyCorsProxy("https://www.getrssfeed.com/"),
    queryString.stringify({
      url,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return parseResult(res.data);
}

export function parseResult(html: string) {
  const $ = cheerio.load(html);
  const result = $("#result-container > a").attr("href");
  return result;
}
