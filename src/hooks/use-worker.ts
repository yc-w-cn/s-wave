import { useState } from "react";

export interface MessageEventHandler {
  (event: MessageEvent): void;
}

export function useWorker(messageEventHandler: MessageEventHandler) {
  const [worker, setWorker] = useState<Worker | null>(
    createWorker(messageEventHandler)
  );
  const resetWorker = () => {
    worker?.terminate();
    setWorker(createWorker(messageEventHandler));
  };
  return { worker, setWorker, resetWorker };
}

function createWorker(messageEventHandler: MessageEventHandler): Worker | null {
  if (typeof window === "undefined") return null; // Check if running on the server
  const worker = new Worker(new URL("../worker.js", import.meta.url), {
    type: "module",
  });
  // Listen for messages from the Web Worker
  worker.addEventListener("message", messageEventHandler);
  return worker;
}
