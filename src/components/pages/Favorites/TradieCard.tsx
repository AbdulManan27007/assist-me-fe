import { Typography } from "@/components/core/Typography";
import { MOCK_TRADIES } from "@/globalContext/globalContext";
import { LocationIcon, StarIcon } from "@/icons";
import Image from "next/image";

export function TradieCard({
  avatar,
  id,
  name,
  tag,
  role,
  categoriesHired,
  location,
  householdsReviews,
}: (typeof MOCK_TRADIES)[number]) {
  return (
    <div className="py-10 px-6 rounded-[12px] border border-[#0000001A] grid grid-cols-[auto_1fr] gap-6 mob:grid-cols-1 mob:justify-center mob:justify-items-center mob:p-6">
      <Image
        src={avatar}
        alt={name}
        width={72}
        height={72}
        className="rounded-full"
      />
      <div className="flex items-start justify-between mob:grid mob:justify-center mob:justify-items-center mob:gap-4">
        <div className="grid gap-2">
          <div className="flex items-center gap-3 mob:grid mob:justify-items-center mob:gap-0">
            <Typography variant="24px/800/32.78px" className="row-start-2">
              {name}
            </Typography>
            <Typography variant="14px/500/19.12px">@{tag}</Typography>
          </div>
          <div className="flex items-center gap-2 border border-[#0000001A] rounded-full py-1.5 px-3 w-fit mob:border-none mob:p-0">
            <Typography
              variant="14px/400/21px"
              className="text-black-5 mob:hidden"
            >
              {categoriesHired[0].title} {role}
            </Typography>
            <Typography
              variant="14px/400/21px"
              className="text-black-5 mob:hidden"
            >
              •
            </Typography>

            <div className="flex items-center">
              <StarIcon />
              <Typography variant="14px/400/21px" className="text-black-2">
                {householdsReviews.reduce(
                  (acc, review) => acc + review.rating,
                  0
                ) / householdsReviews.length}
              </Typography>
              <Typography
                variant="14px/400/21px"
                className="text-black-2 opacity-60"
              >
                ({householdsReviews.length})
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <LocationIcon className="fill-black-4" />
          <Typography variant="14px/400/21px" className="text-black-4">
            From {location}
          </Typography>
        </div>
      </div>
    </div>
  );
}
