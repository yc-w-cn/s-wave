"use client";

import { useState } from "react";
import { RecordModal } from "./record-modal";
import { Tile } from "./tile";

export function RecordTile(props: {
  icon: JSX.Element;
  text: string;
  setAudioData: (data: Blob) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = (data: Blob | undefined) => {
    if (data) {
      props.setAudioData(data);
      onClose();
    }
  };

  return (
    <>
      <Tile icon={props.icon} text={props.text} onClick={onClick} />
      <RecordModal show={showModal} onSubmit={onSubmit} onClose={onClose} />
    </>
  );
}
