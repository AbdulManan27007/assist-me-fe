"use client";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/components/ui/button";
import "react-loading-skeleton/dist/skeleton.css";
import { daysAgo, formatDate } from "@/lib/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRef, useEffect, useState } from "react";
import { Typography } from "@/components/core/Typography";
import { BackButton } from "@/components/core/BackButton";
import { CalendarIcon, HourGlassIcon, StarIcon } from "@/icons";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetOneListingQuery } from "@/store/household/singleListing";
import { useGetTradieListingProfileQuery } from "@/store/household/TradieListingProfile";

export default function AfterApplying() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const bidId = searchParams.get("bidId");

  const id = pathname.split("/").pop();
  const [refreshKey, setRefreshKey] = useState(Date.now());

  useEffect(() => {
    setRefreshKey(Date.now());
  }, [pathname, searchParams]);

  if (!id) {
    return <p>Invalid listing ID.</p>;
  }

  const {
    data: listing,
    isLoading: isListingLoading,
    isError: isListingError,
    refetch: refetchListing,
  } = useGetOneListingQuery(id as string, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: bidData,
    isLoading: isbidDataLoading,
    isError: isbidDatasError,
    refetch: refetchBidData,
  } = useGetTradieListingProfileQuery(bidId ?? skipToken, {
    skip: !bidId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (id) {
      refetchListing();
    }
    if (bidId) {
      refetchBidData();
    }
  }, [refreshKey, id, bidId, refetchListing, refetchBidData]);

  const experienceRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (experienceRef.current && listing?.hiredTradie?.tradieExperience) {
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
  }, [listing?.hiredTradie?.tradieExperience]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isListingLoading || isbidDataLoading) {
    return (
      <div className="w-[1200px] mx-auto grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6 ">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton width={100} height={24} />
            <Skeleton width={200} height={32} />
          </div>
          <div className="flex items-center gap-6">
            <Skeleton width={100} height={24} />
            <Skeleton width={24} height={24} />
          </div>
        </div>
        <Skeleton width={100} height={24} />
        <Skeleton width="100%" height={72} />
        <div className="grid gap-3">
          <Skeleton width={120} height={24} />
          <div className="flex gap-2">
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                width={80}
                height={80}
                className="rounded-[12px]"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <Skeleton width={100} height={32} />
          <Skeleton width={150} height={24} />
        </div>
      </div>
    );
  }

  if (isListingError || !listing) {
    return <div className="p-12">Error loading listing details.</div>;
  }

  return (
    <div className="p-12 mob:py-8 mob:px-6">
      <div className="max-w-[1200px] mx-auto grid gap-8 ">
        <div className="grid gap-4">
          <BackButton />
          <Typography variant="32px/700/43.71px">{listing.title}</Typography>
          <div className="flex gap-2 items-center justify-start mob:justify-start">
            <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
              <Typography variant="14px/400/21px" className="text-black-5">
                {listing.category}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Typography variant="16px/600/21.86px" className="text-black-5">
                {listing.location}
              </Typography>
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
                {listing.description}
              </Typography>
            </div>
            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Date/Time
              </Typography>

              <div className="flex gap-6">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon />

                  <Typography
                    variant="16px/700/21.86px"
                    className="text-black-4"
                  >
                    {formatDate(listing.start_date, "short")} -{" "}
                    {formatDate(listing.end_date, "short")}
                  </Typography>
                </div>
              </div>
            </div>

            {listing.tasks && listing.tasks.length > 0 && (
              <div className="grid gap-3">
                <Typography variant="18px/700/24.59px" className="text-black-4">
                  Tasks
                </Typography>

                <div className="grid gap-2">
                  {listing.tasks.map((task: any, index: any) => (
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
            )}

            {listing.images && listing.images.length > 0 && (
              <div className="grid gap-3">
                <Typography variant="18px/700/24.59px" className="text-black-4">
                  Uploaded media
                </Typography>

                <div className="flex gap-2">
                  {listing.images.map((image: any, index: any) => (
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
            )}

            <div className="grid gap-3">
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Pricing
              </Typography>

              <div className="flex flex-1 items-end gap-2">
                <Typography variant="24px/800/32.78px">
                  A$ {listing.price}
                </Typography>

                <Typography variant="16px/400/21.86px" className="text-black-5">
                  {listing.price_type || "Fixed"}
                </Typography>
              </div>
            </div>
          </div>

          {/* Your Application */}
          {bidData && (
            <div className="grid gap-12 h-fit">
              <div className="grid gap-6">
                <div className="flex items-center justify-between mob:grid mob:gap-4">
                  <Typography variant="24px/800/32.78px">
                    Your Application
                  </Typography>
                  <Link
                    href={`/tradies-apply-for-listing/${bidData.listing_id}?bidId=${bidData.id}`}
                  >
                    <Button variant="outline">Edit Application</Button>
                  </Link>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-6">
                  <Image
                    src={bidData.user.picture || "/default-avatar.png"}
                    alt={bidData.user.name || "avatar"}
                    width={72}
                    height={72}
                    className="rounded-full"
                  />
                  <div className="grid gap-1">
                    <Typography variant="14px/500/19.12px">
                      @{bidData.user.tag}
                    </Typography>
                    <Typography variant="24px/800/32.78px">
                      {bidData.user.name}
                    </Typography>
                    <div className="flex items-center">
                      <StarIcon />
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-2"
                      >
                        {bidData.tradieDashboard?.rating || "N/A"}
                      </Typography>
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-2 opacity-60"
                      >
                        ({bidData.tradieDashboard?.total_jobs || 0})
                      </Typography>
                    </div>
                  </div>
                </div>
                {bidData.message && (
                  <div className="grid gap-2">
                    <div
                      ref={experienceRef}
                      className={`truncate transition-all ${
                        isExpanded
                          ? "truncate--expanded"
                          : "truncate--line-clamped"
                      }`}
                    >
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-5"
                      >
                        {bidData.message}
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
