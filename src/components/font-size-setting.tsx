import { AArrowDownIcon, AArrowUpIcon } from "lucide-react";

export interface Props {
  value: number;
  onChange?: (_: number) => void;
}
export function FontSizeSetting({ value, onChange }: Props) {
  return (
    <div className="flex bg-gray-100 p-1 rounded-lg">
      <button
        className="hover:bg-white rounded-lg px-1 hover:shadow"
        onClick={() => onChange?.(value * 1.1)}
      >
        <AArrowUpIcon strokeWidth={1.5} />
      </button>
      <button
        className="hover:bg-white rounded-lg px-1 hover:shadow"
        onClick={() => onChange?.(value * 0.9)}
      >
        <AArrowDownIcon strokeWidth={1.5} />
      </button>
    </div>
  );
}
