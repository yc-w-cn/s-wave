import { ErrorContent } from "@/components/ui/error-content";

export default function NotFound() {
  return <ErrorContent code={404} message="页面找不到了" />;
}
