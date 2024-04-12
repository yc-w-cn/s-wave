'use client';

import { useState } from "react";
import AudioRecorder from "./audio/audio-recorder";
import Modal from "./ui/modal";

export function RecordModal(props: {
  show: boolean;
  onSubmit: (data: Blob | undefined) => void;
  onClose: () => void;
}) {
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const onRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const onSubmit = () => {
    props.onSubmit(audioBlob);
    setAudioBlob(undefined);
  };

  const onClose = () => {
    props.onClose();
    setAudioBlob(undefined);
  };

  return (
    <Modal
      show={props.show}
      title={"录音"}
      content={
        <>
          {"通过麦克风录制声音"}
          <AudioRecorder onRecordingComplete={onRecordingComplete} />
        </>
      }
      onClose={onClose}
      submitText={"加载"}
      submitEnabled={audioBlob !== undefined}
      onSubmit={onSubmit}
    />
  );
}