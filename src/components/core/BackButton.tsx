import { ArrowIcon } from "@/icons";
import { Typography } from "@/components/core/Typography";
import { cn } from "@/lib/utils";

export function BackButton({ className }: { className?: string }) {
  return (
    <div
      onClick={() => window.history.back()}
      className={cn("flex items-center gap-1 cursor-pointer w-fit", className)}
    >
      <ArrowIcon />
      <Typography variant="18px/700/24.59px" className="text-black-5">
        Back
      </Typography>
    </div>
  );
}
