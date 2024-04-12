import { PodcastPage } from "@/components/podcast/podcast-page";

export interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  return <PodcastPage pageId={params.id} />;
}
