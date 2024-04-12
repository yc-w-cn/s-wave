import { Transcriber } from "@/hooks/use-transcriber";
import { Badge } from "@/components/ui/badge";

export interface Props {
  transcriber: Transcriber;
}

export function WhisperSettingBadges({ transcriber }: Props) {
  return (
    <>
      <Badge variant="secondary">{transcriber.subtask}</Badge>
      <Badge variant="secondary">{transcriber.model}</Badge>
      {transcriber.multilingual && (
        <Badge variant="secondary">multilingual</Badge>
      )}
      <Badge variant="secondary">{transcriber.language}</Badge>
      {transcriber.quantized && <Badge variant="secondary">quantized</Badge>}
    </>
  );
}
