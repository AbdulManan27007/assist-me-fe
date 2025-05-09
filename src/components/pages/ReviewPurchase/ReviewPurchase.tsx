"use client";
import Image from "next/image";
import { Task } from "../Dashboard/Task";
import { daysAgo, formatDate } from "@/lib/utils";
import { PurchaseSummary } from "./PurchaseSummary";
import { Typography } from "@/components/core/Typography";
import { BackButton } from "@/components/core/BackButton";
import { CalendarIcon, HourGlassIcon, StarIcon } from "@/icons";
import { MOCK_LISTINGS, MOCK_USER } from "@/globalContext/globalContext";

export function ReviewPurchase() {
  const listing = MOCK_LISTINGS[0];
  const tradie = MOCK_USER;
  return (
    <div className="p-12 mob:py-8 mob:px-6">
      <div className="max-w-[1200px] w-full mx-auto grid gap-8">
        <div className="grid gap-4">
          <BackButton />
          <Typography variant="32px/700/43.71px" className="text-black-1">
            Review Purchase
          </Typography>
          <Typography
            variant="14px/400/21px"
            className="text-black-5 max-w-[544px]"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo,
            suscipit eget elit porttitor, volutpat consequat turpis. In interdum
            mauris et urna maximus.
          </Typography>
        </div>
        <div className="grid gap-20 grid-cols-2 mob:grid-cols-1 mob:gap-12">
          <div className="grid gap-6 h-fit">
            <Typography variant="24px/800/32.78px">Your Listing</Typography>
            <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                    <Typography
                      variant="14px/400/21px"
                      className="text-black-5"
                    >
                      {listing?.category}
                    </Typography>
                  </div>

                  <div className="flex items-center gap-2">
                    <Typography
                      variant="16px/600/21.86px"
                      className="text-black-5"
                    >
                      {listing?.location}
                    </Typography>

                    <div className="h-1 w-1 rounded-full bg-black-5" />

                    <Typography
                      variant="16px/600/21.86px"
                      className="text-black-5"
                    >
                      {daysAgo(listing?.start_date) === 1
                        ? "Today"
                        : `${daysAgo(listing?.start_date)} days ago`}
                    </Typography>
                  </div>
                </div>

                <Typography variant="24px/800/32.78px" className="text-black-3">
                  {listing?.title}
                </Typography>
              </div>

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

                  <Typography
                    variant="16px/400/21.86px"
                    className="text-black-5"
                  >
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
          <div className="grid gap-6 h-fit">
            <Typography variant="24px/800/32.78px">Hiring Tradie</Typography>
            <div className="grid items-start gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src={tradie.avatar}
                  alt={tradie.name}
                  width={72}
                  height={72}
                  className="rounded-full"
                />
                <div className="flex items-start justify-between">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-3">
                      <Typography variant="24px/800/32.78px">
                        {tradie.name}
                      </Typography>
                      <Typography variant="14px/500/19.12px">
                        @{tradie.tag}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2 border border-[#0000001A] rounded-full py-1.5 px-3 w-fit">
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-5"
                      >
                        {tradie.categoriesHired[0].title} {tradie.role}
                      </Typography>
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-5"
                      >
                        •
                      </Typography>

                      <div className="flex items-center">
                        <StarIcon />
                        <Typography
                          variant="14px/400/21px"
                          className="text-black-2"
                        >
                          {tradie.tradieReviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                          ) / tradie.tradieReviews.length}
                        </Typography>
                        <Typography
                          variant="14px/400/21px"
                          className="text-black-2 opacity-60"
                        >
                          ({tradie.tradieReviews.length})
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Typography variant="16px/400/24px" className="text-black-4">
                  {tradie.tradieExperience}
                </Typography>
                <Typography variant="16px/700/21.86px" className="text-accent">
                  Read more
                </Typography>
              </div>
            </div>
            <div className="grid gap-3">
              {tradie.tasks.map((task) => (
                <Task
                  className="py-2.5 px-5 [&>*]:gap-0"
                  withoutEditIcon
                  withoutDot
                  whiteBg
                  key={task.id}
                  {...task}
                />
              ))}
            </div>
            <div className="mt-6 mob:mt-10">
              <PurchaseSummary
                priceType={listing.priceType}
                price={listing.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
