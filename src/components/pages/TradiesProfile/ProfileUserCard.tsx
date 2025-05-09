import React from "react";
import Image from "next/image";
import { StarIcon } from "@/icons";
import { Typography } from "@/components/core/Typography";

interface ProfileUserCardProps {
  picture?: string;
  name?: string;
  tag?: string;
  reviews?: { rating: number }[];
}

export function ProfileUserCard({ picture, name, tag, reviews = [] }: ProfileUserCardProps) {
  console.log("__________reviews", reviews);
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <div className="flex items-center gap-4 p-4  ">
      <Image
        priority
        src={picture || "/images/profile.png"}
        alt="avatar"
        width={104}
        height={104}
        className="rounded-full w-[104px] h-[104px] object-cover"
      />

      <div className="grid gap-2">
        <div className="flex flex-col">
          <Typography variant="14px/500/19.12px" className="text-black-4">
            @{tag ? tag : "tradie"}
          </Typography>
          <Typography variant="24px/800/32.78px" className="text-black-1">
            {name} 
          </Typography>
        </div>
        <div className="flex items-center gap-2 border border-[#0000001A] rounded-full py-1.5 px-3 w-fit">
          {/* <Typography variant="14px/400/21px" className="text-black-5">
            Tradie
          </Typography>
          <Typography variant="14px/400/21px" className="text-black-5">
            •
          </Typography> */}
          <div className="flex items-center gap-2">
            <StarIcon />
            <Typography variant="14px/400/21px" className="text-black-2">
              {averageRating}
            </Typography>
            <Typography
              variant="14px/400/21px"
              className="text-black-2 opacity-60"
            >
              ({reviews.length})
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
