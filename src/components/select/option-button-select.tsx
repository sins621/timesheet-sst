import { OptionItem } from "@/lib/types/common";

type OptionButtonSelectProps = {
  options: OptionItem[];
  onClick: (value: OptionItem["value"]) => void;
};

export default function OptionButtonSelect(props: OptionButtonSelectProps) {
  return (
    <div className="flex flex-col gap-2 justify-items-center">
      {props.options.map((option) => (
        <button
          onClick={() => props.onClick(option.value)}
          key={option.value}
          className="border rounded-lg p-2"
        >
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
