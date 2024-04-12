'use client';

import { useState } from "react";
import { Tile } from "./tile";
import { UrlModal } from "./url-modal";

export function UrlTile(props: {
  icon: JSX.Element;
  text: string;
  onUrlUpdate: (url: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = (url: string) => {
    props.onUrlUpdate(url);
    onClose();
  };

  return (
    <>
      <Tile icon={props.icon} text={props.text} onClick={onClick} />
      <UrlModal show={showModal} onSubmit={onSubmit} onClose={onClose} />
    </>
  );
}