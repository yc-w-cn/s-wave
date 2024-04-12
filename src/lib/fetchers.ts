import localforage from "localforage";

export const localforageFetcher = async <TResult = any>(
  cacheKey: string | null | undefined
) => {
  if (cacheKey) {
    return localforage.getItem<TResult>(cacheKey);
  }
  return null;
};

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
