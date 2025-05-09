"use client";
import { BackButton } from "@/components/core/BackButton";
import { Typography } from "@/components/core/Typography";
import { Button } from "@/components/ui/button";
import { MOCK_LISTINGS } from "@/globalContext/globalContext";
import { CalendarIcon, HourGlassIcon, VisibilityIcon } from "@/icons";
import { daysAgo, formatDate } from "@/lib/utils";
import Image from "next/image";

export function BeforeApplying() {
  const listing = MOCK_LISTINGS[0];
  return (
    <div className="p-12 mob:py-8 mob:px-6">
      <div className="max-w-[584px] mx-auto">
        <div className="grid gap-4 mob:gap-8">
          <div className="grid gap-4 mob:gap-6">
            <div className="flex items-center gap-3 justify-between">
              <BackButton />
              <div className="flex items-center gap-6 mob:hidden">
                <Button variant="ghost" size="ghost">
                  <VisibilityIcon />
                  <Typography variant="16px/700/21.86px">
                    Add To Watchlist
                  </Typography>
                </Button>
                <Button>
                  <Typography variant="16px/700/21.86px">
                    Apply for listing
                  </Typography>
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <Typography variant="32px/700/43.71px">
                {listing.title}
              </Typography>

              <div className="flex items-center gap-3 justify-between mob:justify-start">
                <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                  <Typography variant="14px/400/21px" className="text-black-5">
                    {listing.category}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Typography
                    variant="14px/500/19.12px"
                    className="text-black-5"
                  >
                    {listing.location}
                  </Typography>
                  <div className="h-1 w-1 rounded-full bg-black-5" />
                  <Typography
                    variant="14px/500/19.12px"
                    className="text-black-5"
                  >
                    {daysAgo(listing.start_date)} days ago
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-6 desk:hidden">
            <Button>
              <Typography variant="16px/700/21.86px">
                Apply for listing
              </Typography>
            </Button>
            <Button variant="ghost" size="ghost">
              <VisibilityIcon />
              <Typography variant="16px/700/21.86px">
                Add To Watchlist
              </Typography>
            </Button>
          </div>
          <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8">
            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Description
              </Typography>

              <Typography variant="16px/400/24px" className="text-black-5">
                {listing?.description}
              </Typography>
            </div>

            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Tasks
              </Typography>

              <div className="grid gap-2">
                {listing?.tasks?.map((task, index) => (
                  <Typography
                    key={index}
                    variant="16px/400/24px"
                    className="text-black-4"
                  >
                    {task.title}
                  </Typography>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Uploaded media
              </Typography>

              <div className="flex gap-2">
                {listing?.images?.map((image, index) => (
                  <Image
                    priority
                    key={index}
                    src={image}
                    alt={`uploaded media ${index}`}
                    width={80}
                    height={80}
                    className="rounded-[12px]"
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Timing
              </Typography>

              <div className="flex gap-6">
                <div className="flex items-center gap-1.5">
                  <HourGlassIcon />

                  <Typography
                    variant="16px/700/21.86px"
                    className="text-black-4"
                  >
                    {`Ends in ${listing?.duration}`}
                  </Typography>
                </div>

                <div className="flex items-center gap-1.5">
                  <CalendarIcon />

                  <Typography
                    variant="16px/700/21.86px"
                    className="text-black-4"
                  >
                    {formatDate(listing?.start_date, "short")} -{" "}
                    {formatDate(listing?.end_date, "short")}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Pricing
              </Typography>

              <div className="flex flex-1 items-end gap-2">
                <Typography variant="24px/800/32.78px">
                  A$ {listing?.price}
                </Typography>

                <Typography variant="16px/400/21.86px" className="text-black-5">
                  {listing?.priceType}
                </Typography>
              </div>
            </div>

            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Contact Details
              </Typography>

              <Typography variant="16px/400/21.86px" className="text-black-5">
                {listing?.email}
              </Typography>

              <Typography variant="16px/400/21.86px" className="text-black-5">
                {listing?.phone}
              </Typography>
            </div>

            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Keywords
              </Typography>

              <div className="flex gap-2">
                {listing?.keywords?.map((keyword, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-white-2 rounded-full w-fit"
                  >
                    <Typography
                      variant="16px/400/21.86px"
                      className="text-black-5"
                    >
                      {keyword}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
