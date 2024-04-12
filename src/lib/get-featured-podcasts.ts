import axios from "axios";
import * as cheerio from "cheerio";
import { corsProxy } from "./cors-proxy";
import { generateHash } from "@/utils";
import localforage from "localforage";
import { combine } from "@/utils/url";

export async function getFeaturedPodcasts() {
  const url = "https://typlog.com/featured/podcasts";
  const proxiedUrl = corsProxy(url);
  const res = await axios.get(proxiedUrl);
  return parseResult(res.data);
}

export async function parseResult(html: string) {
  const $ = cheerio.load(html);
  const result = $("div.item_2Qq2h")
    .map(async function () {
      const link = $(this).find("a").attr("href");
      const feedUrl = combine(link, "feed/audio.xml")
      const id = await generateHash(feedUrl);
      await localforage.setItem(`FEED_URL_${id}`, feedUrl);
      return {
        id,
        link,
        image: $(this).find("img").attr("src"),
        name: $(this).find("h3").text(),
        desc: $(this).find("h4").text(),
        feedUrl,
      };
    })
    .toArray();
  return Promise.all(result);
}
