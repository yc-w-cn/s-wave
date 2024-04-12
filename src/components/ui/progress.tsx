export default function Progress({
  text,
  percentage,
}: {
  text: string;
  percentage: number;
}) {
  percentage = percentage ?? 0;
  return (
    <div className="mt-0.5 w-full relative text-sm text-white background-bg-cyan-400 bg-gray-200 border-1 border-gray-400 rounded-full text-left overflow-hidden">
      <div
        className="top-0 h-full bg-pink-500 whitespace-nowrap px-4 text-xs py-1"
        style={{ width: `${percentage}%` }}
      >
        {text} ({`${percentage.toFixed(2)}%`})
      </div>
    </div>
  );
}
