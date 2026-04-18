import { OptionItem } from "@/lib/types/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type StatusSelectProps = {
  title: string;
  placeholder: string;
  options: OptionItem[];
};

export default function StatusSelect(props: StatusSelectProps) {
  return (
    <div className="flex flex-col gap-2 justify-items-center">
      <span className="text-center font-semibold">{props.title}</span>
      <Select items={props.options}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {props.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
