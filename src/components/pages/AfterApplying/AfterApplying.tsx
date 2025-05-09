"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { daysAgo, formatDate } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";
import { Typography } from "@/components/core/Typography";
import { BackButton } from "@/components/core/BackButton";
import { MOCK_LISTINGS } from "@/globalContext/globalContext";
import { CalendarIcon, HourGlassIcon, StarIcon } from "@/icons";
import { Task } from "../Dashboard/Task";

export function AfterApplying() {
  const listing = MOCK_LISTINGS[0];

  const experienceRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (experienceRef.current) {
      const height = experienceRef.current.scrollHeight;
      experienceRef.current.style.setProperty(
        "--truncate-height",
        `${Math.min(72, height)}px`
      );
      experienceRef.current.style.setProperty(
        "--truncate-height-expanded",
        `${height}px`
      );
    }
  }, [listing.hiredTradie.tradieExperience]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-12 mob:py-8 mob:px-6">
      <div className="max-w-[1200px] mx-auto grid gap-8 ">
        <div className="grid gap-4">
          <BackButton />
          <Typography variant="32px/700/43.71px">{listing?.title}</Typography>
          <div className="flex gap-2 items-center justify-between mob:justify-start">
            <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
              <Typography variant="14px/400/21px" className="text-black-5">
                {listing?.category}
              </Typography>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Typography variant="16px/600/21.86px" className="text-black-5">
                  {listing?.location}
                </Typography>

                <div className="h-1 w-1 rounded-full bg-black-5" />

                <Typography variant="16px/600/21.86px" className="text-black-5">
                  {daysAgo(listing?.start_date) === 1
                    ? "Today"
                    : `${daysAgo(listing?.start_date)} days ago`}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-16 grid-cols-2 mob:grid-cols-1 mob:gap-12">
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
          <div className="grid gap-12 h-fit">
            <div className="grid gap-6">
              <div className="flex items-center justify-between mob:grid mob:gap-4">
                <Typography variant="24px/800/32.78px">
                  Your Application
                </Typography>
                <Button variant="outline">Edit Application</Button>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-6">
                <Image
                  src={listing.hiredTradie.avatar || ""}
                  alt={listing.hiredTradie.name || "avatar"}
                  width={72}
                  height={72}
                  className="rounded-full"
                />
                <div className="grid gap-2">
                  <div className="flex items-center gap-3">
                    <Typography variant="24px/800/32.78px">
                      {listing?.hiredTradie.name}
                    </Typography>
                    <Typography variant="14px/500/19.12px">
                      @{listing?.hiredTradie.tag}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2 border border-[#0000001A] rounded-full py-1.5 px-3 w-fit">
                    <Typography
                      variant="14px/400/21px"
                      className="text-black-5"
                    >
                      {listing?.category} {listing.hiredTradie.role}
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
                        {listing.hiredTradie.tradieReviews?.length
                          ? (
                              listing.hiredTradie.tradieReviews.reduce(
                                (acc, review) => acc + review.rating,
                                0
                              ) / listing.hiredTradie.tradieReviews.length
                            ).toFixed(1)
                          : "N/A"}
                      </Typography>
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-2 opacity-60"
                      >
                        ({listing.hiredTradie.tradieReviews?.length || 0})
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div
                  ref={experienceRef}
                  className={`truncate transition-all ${
                    isExpanded ? "truncate--expanded" : "truncate--line-clamped"
                  }`}
                >
                  <Typography variant="16px/400/24px" className="text-black-5">
                    {listing.hiredTradie.tradieExperience}
                  </Typography>
                </div>
                <Typography
                  variant="16px/700/21.86px"
                  className="text-accent cursor-pointer"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </Typography>
              </div>
              <div className="grid gap-3 justify-start">
                {listing.tasks.map((task, index) => (
                  <Task
                    key={index}
                    {...task}
                    whiteBg
                    withoutDot
                    withoutEditIcon
                    className="w-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
