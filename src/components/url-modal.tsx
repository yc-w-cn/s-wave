"use client";

import { getWhisperConfig } from "@/config/whisper";
import { useState } from "react";
import Modal from "./ui/modal";
import { UrlInput } from "./url-input";

export function UrlModal(props: {
  show: boolean;
  onSubmit: (url: string) => void;
  onClose: () => void;
}) {
  const { DEFAULT_AUDIO_URL } = getWhisperConfig();
  const [url, setUrl] = useState(DEFAULT_AUDIO_URL);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const onSubmit = () => {
    props.onSubmit(url);
  };

  return (
    <Modal
      show={props.show}
      title={"From URL"}
      content={
        <>
          {"Enter the URL of the audio file you want to load."}
          <UrlInput onChange={onChange} value={url} />
        </>
      }
      onClose={props.onClose}
      submitText={"Load"}
      onSubmit={onSubmit}
    />
  );
}
