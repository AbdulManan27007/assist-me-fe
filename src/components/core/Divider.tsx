import { cn } from "@/lib/utils";
import { Typography } from "./Typography";

export function Divider({
  text,
  light = false,
}: {
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "h-[1px] w-full bg-[#0000001A]",
          light && "bg-[#FFFFFF26]"
        )}
      />
      {text && (
        <Typography
          variant="14px/500/19.12px"
          className="text-black-5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white-1 px-8"
        >
          {text}
        </Typography>
      )}
    </div>
  );
}
