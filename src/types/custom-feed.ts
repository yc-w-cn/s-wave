export type CustomFeed = {
  copyright?: string;
  generator?: string;
  itunes: {
    categoriesWithSubs?: {
      name?: string;
      subs?: unknown;
    }[];
    subtitle?: string;
  };
  language?: string;
  pubDate?: string;
};
