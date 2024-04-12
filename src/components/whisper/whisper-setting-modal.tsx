import { LANGUAGES } from "@/constants";
import { Transcriber } from "@/hooks/use-transcriber";
import { cn, titleCase } from "@/utils";
import { Modal } from "@/components/ui/modal";

export function WhisperSettingModal(props: {
  show: boolean;
  onSubmit: (url: string) => void;
  onClose: () => void;
  transcriber: Transcriber;
}) {
  const names = Object.values(LANGUAGES).map(titleCase);

  const models = {
    // Original checkpoints
    "Xenova/whisper-tiny": [41, 152],
    "Xenova/whisper-base": [77, 291],
    "Xenova/whisper-small": [249],
    "Xenova/whisper-medium": [776],

    // Distil Whisper (English-only)
    "distil-whisper/distil-medium.en": [402],
    "distil-whisper/distil-large-v2": [767],
  };
  return (
    <Modal
      show={props.show}
      title={"模型设置"}
      content={
        <>
          <label>选择使用的模型:</label>
          <select
            className={cn(
              "mt-1 mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5",
              "focus:ring-pink-500 focus:border-pink-500 focus-visible:ring-pink-500 outline-none",
              "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
            )}
            defaultValue={props.transcriber.model}
            onChange={(e) => {
              props.transcriber.setModel(e.target.value);
            }}
          >
            {Object.keys(models)
              .filter(
                (key) =>
                  props.transcriber.quantized ||
                  // @ts-ignore
                  models[key].length == 2
              )
              .filter(
                (key) =>
                  !props.transcriber.multilingual ||
                  !key.startsWith("distil-whisper/")
              )
              .map((key) => (
                <option key={key} value={key}>{`${key}${
                  props.transcriber.multilingual ||
                  key.startsWith("distil-whisper/")
                    ? ""
                    : ".en"
                } (${
                  // @ts-ignore
                  models[key][props.transcriber.quantized ? 0 : 1]
                }MB)`}</option>
              ))}
          </select>
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex">
              <input
                id="multilingual"
                type="checkbox"
                checked={props.transcriber.multilingual}
                onChange={(e) => {
                  props.transcriber.setMultilingual(e.target.checked);
                }}
                className="accent-pink-500"
              ></input>
              <label htmlFor={"multilingual"} className="ms-1">
                多语言
              </label>
            </div>
            <div className="flex">
              <input
                id="quantize"
                type="checkbox"
                checked={props.transcriber.quantized}
                onChange={(e) => {
                  props.transcriber.setQuantized(e.target.checked);
                }}
                className="accent-pink-500"
              ></input>
              <label htmlFor={"quantize"} className="ms-1">
                开启量化
              </label>
            </div>
          </div>
          {props.transcriber.multilingual && (
            <>
              <label>选择音频语言</label>
              <select
                className={cn(
                  "mt-1 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5",
                  "focus:ring-pink-500 focus:border-pink-500 outline-none",
                  "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                )}
                defaultValue={props.transcriber.language}
                onChange={(e) => {
                  props.transcriber.setLanguage(e.target.value);
                }}
              >
                {Object.keys(LANGUAGES).map((key, i) => (
                  <option key={key} value={key}>
                    {names[i]}
                  </option>
                ))}
              </select>
              <label>选择执行的任务</label>
              <select
                className={cn(
                  "mt-1 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-white",
                  "focus:ring-pink-500 focus:border-pink-500 outline-none",
                  "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-pink-500 dark:focus:border-pink-500"
                )}
                defaultValue={props.transcriber.subtask}
                onChange={(e) => {
                  props.transcriber.setSubtask(e.target.value);
                }}
              >
                <option value={"transcribe"}>听译</option>
                <option value={"translate"}>翻译 {"->"} 英语</option>
              </select>
            </>
          )}
        </>
      }
      onClose={props.onClose}
      onSubmit={() => {}}
    />
  );
}
