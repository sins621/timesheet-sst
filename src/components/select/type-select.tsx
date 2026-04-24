import { TicketType } from "@/lib/types/entities";
import TypeButton from "../buttons/type-button";

type TypeSelectProps = {
  onClick: (ticketType: TicketType) => void;
};

export default function TypeSelect(props: TypeSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <TypeButton
        title="Stationary"
        description="A ticket that has stayed in the same status for the day"
        onClick={() => props.onClick(TicketType.stationary)}
      />
      <TypeButton
        title="Transitioned"
        description="A ticket that has moved from one status to another"
        onClick={() => props.onClick(TicketType.transitioned)}
      />
    </div>
  );
}
