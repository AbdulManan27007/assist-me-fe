import { EditIcon } from "@/icons";
import { cn, formatDate } from "@/lib/utils";
import { Typography } from "@/components/core/Typography";

interface Props {
  color?: string;
  title?: string;
  date?: string;
  whiteBg?: boolean;
  withoutDot?: boolean;
  withoutEditIcon?: boolean;
  className?: string;
}

export function Task({
  color = "#FF5733",
  title = "Meeting with Client",
  date = "2025-02-14T10:30:00Z",
  whiteBg,
  withoutDot,
  withoutEditIcon,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "grid gap-4 grid-flow-col grid-cols-[auto_1fr_auto] items-center border-[1.5px] border-[#FFFFFF26] rounded-[12px] p-4 w-fit",
        whiteBg && "border-[#0000001A]",
        withoutDot && "grid-cols-[1fr_auto]",
        withoutEditIcon && "grid-cols-[auto_1fr]",
        withoutDot && withoutEditIcon && "grid-cols-[auto]",
        className
      )}
    >
      {!withoutDot && (
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
        />
      )}
      <div className="grid gap-0.5">
        <Typography
          variant="14px/700/19.12px"
          className={cn("text-white-3", whiteBg && "text-black-3")}
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
      {!withoutEditIcon && <EditIcon className={cn(whiteBg && "fill-black-1")} />}
    </div>
  );
}
