import { FeedItemPage } from "@/components/feed/feed-item-page";

export interface Props {
  params: { guid: string };
}

export default function Page({ params }: Props) {
  return <FeedItemPage guid={params.guid} />;
}
