export interface Props {
  code?: number;
  message?: string;
}
export function ErrorContent({ code = 404, message = "页面找不到了" }: Props) {
  return (
    <div className="flex bg-white px-40 py-20 gap-5 items-center rounded-lg shadow">
      <h3 className="text-pink-500 text-3xl">{code}</h3>
      <div className="w-[2px] h-[20px] bg-slate-200"></div>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
