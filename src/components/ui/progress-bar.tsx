export function ProgressBar(props: { progress: string }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-1 rounded-full transition-all duration-100"
        style={{ width: props.progress }}
      ></div>
    </div>
  );
}
