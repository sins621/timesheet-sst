import { OptionItem } from "@/lib/types/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type LabelledSelectProps = {
  title: string;
  placeholder: string;
  options: OptionItem[];
  value: string;
  onValueChange: (value: OptionItem["value"] | null) => void;
  triggerAriaLabel?: string;
};

export default function LabelledSelect(props: LabelledSelectProps) {
  return (
    <div className="flex flex-col gap-2 justify-items-center">
      <span className="text-center font-semibold">{props.title}</span>
      <Select
        items={props.options}
        value={props.value}
        onValueChange={props.onValueChange}
      >
        <SelectTrigger className="w-full" aria-label={props.triggerAriaLabel}>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {props.options.map((option) => (
            <SelectItem key={option.value} value={option.value} aria-label={`Select Item ${option.label}`}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
