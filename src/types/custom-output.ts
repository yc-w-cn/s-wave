import Parser from "rss-parser";
import { CustomFeed } from "./custom-feed";
import { CustomItem } from "./custom-item";

export type CustomOutput = CustomFeed & Parser.Output<CustomItem>;
