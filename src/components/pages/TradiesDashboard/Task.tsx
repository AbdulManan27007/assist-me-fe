import { EditIcon } from "@/icons";
import { cn, formatDate } from "@/lib/utils";
import { IUser } from "@/globalContext/globalContext";
import { Typography } from "@/components/core/Typography";

type test = Partial<IUser["tasks"][number]>;

interface Props extends test {
  whiteBg?: boolean;
  withoutDot?: boolean;
  withoutEditIcon?: boolean;
  className?: string;
}

export function Task({
  color,
  title,
  date,
  whiteBg,
  withoutDot,
  withoutEditIcon,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "grid gap-4 grid-flow-col grid-cols-[auto_1fr_auto] items-center border-[1.5px] border-[#00000033] rounded-[12px] p-4",
        whiteBg && "border-[#0000001A]",
        withoutDot && "grid-cols-[1fr_auto]",
        withoutEditIcon && "grid-cols-[auto_1fr]",
        withoutDot && withoutEditIcon && "grid-cols-[auto]",
        className
      )}
    >
      {!withoutDot && (
        <div
          className={`w-1.5 h-1.5 rounded-full`}
          style={{ background: color }}
        />
      )}
      <div className="grid gap-0.5 w-full">
        <Typography
          variant="14px/700/19.12px"
          className={cn("text-black-3", whiteBg && "text-white-3")}
        >
          {title}
        </Typography>
        <Typography
          variant="16px/400/21.86px"
          className={cn("text-white-3", whiteBg && "text-black-3")}
        >
          {formatDate(date, "shortWithTime")}
        </Typography>
      </div>
      {!withoutEditIcon && (
        <EditIcon className={cn(whiteBg && "fill-black-1")} />
      )}
    </div>
  );
}

// Mock Data
const mockTask = {
  color: "#303940", // Mock color
  title: "Complete Project Report",
  date: new Date().toISOString(),
};

// Example Usage of Task component with mock data
export function TaskExample() {
  return (
    <div className="space-y-4 ">
      <Task
        color={mockTask.color}
        title={mockTask.title}
        date={mockTask.date}
        whiteBg={false}
      />
      <Task
        color="#4CAF50"
        title="Attend Team Meeting"
        date={new Date().toISOString()}
        withoutDot={true}
        withoutEditIcon={true}
      />
    </div>
  );
}
