import Image from "next/image";
import { daysAgo } from "@/lib/utils";
import { MoreIcon, StarIcon } from "@/icons";
import { IUser } from "@/globalContext/globalContext";
import { Typography } from "@/components/core/Typography";

export function Review({
  id,
  rating = 0,
  date,
  description,
  reviewer, 
}: IUser["householdsReviews"][number] | IUser["tradieReviews"][number] & {
  reviewer: {
    avatar: string;
    name: string;
    tag: string;
    role: string;
  };  
}) {
  return (
    <div>
      <div className="border border-[#0000001A] rounded-[12px_12px_0px_0px] px-6 py-5 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-start">
              <div className="flex items-center justify-start">
                {Array.from({ length: rating }).map((_, index) => (
                  <StarIcon
                    fill="#FF7125"
                    className="[&:not(:first-child)]:-ml-1"
                    key={index}
                  />
                ))}
              </div>
              <Typography variant="18px/700/24.59px" className="text-accent">
                {rating}
              </Typography>
            </div>
            <Typography variant="14px/400/21px">•</Typography>
            <Typography variant="14px/400/21px">
              {daysAgo(date)} day{daysAgo(date) > 1 && "s"} ago
            </Typography>
          </div>
          <MoreIcon />
        </div>
        <Typography variant="18px/400/27px" className="text-black-2">
          {description}
        </Typography>
      </div>
      <div className="border border-t-0 border-[#0000001A] rounded-[0px_0px_12px_12px] px-6 py-5">
        <div className="flex items-center justify-start gap-3">
          <Image
            priority
            width={48}
            height={48}
            alt={reviewer?.name || "User Avatar"} 
            src={reviewer?.avatar || "/images/profile.png"} 
            className="rounded-full"
          />
          <div className="grid gap-1">
            <div className="flex items-center justify-start gap-3">
              <Typography variant="18px/600/24.59px" className="text-black-2">
                {reviewer?.name || "Unknown"}
              </Typography>
              <Typography variant="14px/500/19.12px" className="text-black-4">
                @{reviewer?.tag || "unknown_user"}
              </Typography>
            </div>
            <Typography variant="14px/500/19.12px" className="text-black-5">
              {reviewer?.role || "Unknown Role"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
