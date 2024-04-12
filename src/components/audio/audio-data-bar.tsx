import { ProgressBar } from "../ui/progress-bar";

export function AudioDataBar(props: { progress: number }) {
  return <ProgressBar progress={`${Math.round(props.progress * 100)}%`} />;
}