import { cn } from "@/lib/utils";
import { StatisticProps } from "./Statistic";
import { Typography } from "@/components/core/Typography";

export function StatisticCard({
  title,
  value,
  black,
  percentage,
  time,
  expanded,
}: StatisticProps["data"][number]) {
  return (
    <div
      className={cn(
        "border border-[#0000001A] rounded-[12px] p-6 flex justify-between items-end bg-white-2",
        black && "bg-black-1",
        expanded && "col-span-2"
      )}
    >
      <div className="grid gap-2">
        <Typography
          variant="14px/400/21px"
          className={cn("text-black-4", black && "text-white-1")}
        >
          {title}
        </Typography>
        <Typography
          variant="32px/700/43.71px"
          className={cn("text-black-2", black && "text-white-2")}
        >
          {value}
        </Typography>
      </div>
      <div>
        <Typography
          variant="14px/400/21px"
          className={cn("text-black-4 text-end", black && "text-white-3")}
        >
          {time}
        </Typography>
        <Typography variant="18px/700/24.59px" className="text-[#20C198]">
          {percentage}
        </Typography>
      </div>
    </div>
  );
}
