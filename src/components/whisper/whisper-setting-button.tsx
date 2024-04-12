"use client";

import { Transcriber } from "@/hooks/use-transcriber";
import { WhisperSettingModal } from "./whisper-setting-modal";
import { useState } from "react";
import { cn } from "@/utils";
import { GearIcon } from "@radix-ui/react-icons";

export function WhisperSettingButton(props: { transcriber: Transcriber }) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = (url: string) => {
    onClose();
  };

  return (
    <>
      <button
        className={cn(
          "flex items-center gap-1 px-2 py-2 rounded-lg",
          "text-gray-500 bg-gray-100/50 hover:bg-gray-100"
        )}
        onClick={onClick}
      >
        <GearIcon />
        <span className="text-sm">模型设置</span>
      </button>
      <WhisperSettingModal
        show={showModal}
        onSubmit={onSubmit}
        onClose={onClose}
        transcriber={props.transcriber}
      />
    </>
  );
}
