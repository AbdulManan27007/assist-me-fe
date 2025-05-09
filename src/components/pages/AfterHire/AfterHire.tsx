"use client";
import Link from "next/link";
import Image from "next/image";
import Badge from "../../ui/Badge";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, StarIcon } from "@/icons";
import { daysAgo, formatDate } from "@/lib/utils";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@/components/core/Typography";
import { BackButton } from "@/components/core/BackButton";
import { IUser, MOCK_TRADIES } from "@/globalContext/globalContext";
import { useGetOneListingQuery } from "@/store/household/singleListing";
import { useGetTradieListingProfileQuery } from "@/store/household/TradieListingProfile";
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";

export function AfterHire() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const bidId = searchParams.get("bidId");
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const {
    data: listingData,
    isLoading: listingLoading,
    isError: listingError,
  } = useGetOneListingQuery(id as string);

  const {
    data: tradieProfile,
    isLoading: tradieLoading,
    isError: tradieError,
  } = useGetTradieListingProfileQuery(bidId as string);

  const isLoading = listingLoading || tradieLoading;
  const isError = listingError || tradieError;

  useEffect(() => {
    const experienceElements = document.querySelectorAll(".tradie-experience");
    experienceElements.forEach((el) => {
      const element = el as HTMLDivElement;
      const height = element.scrollHeight;
      element.style.setProperty(
        "--truncate-height",
        `${Math.min(72, height)}px`
      );
      element.style.setProperty("--truncate-height-expanded", `${height}px`);
    });
  }, [tradieProfile]);

  // Toggle expanded state for read more/less
  const toggleExpanded = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Determine badge text and color based on listing status
  const badgeText =
    listingData?.status === "completed" || listingData?.completed
      ? "Expired"
      : "Open for bidding";
  const badgeColor =
    listingData?.status === "completed" || listingData?.completed
      ? "red"
      : "green";

  // Loading state
  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          color="inherit"
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#FF7125",
            },
          }}
        />
      </Box>
    );

  if (isError) return <p>Error fetching tasks</p>;

  return (
    <div className="p-12 mob:p-6">
      <div className="max-w-[1200px] mx-auto grid gap-8">
        <BackButton/>
        <div className="grid gap-16 grid-cols-2 mob:grid-cols-1">
          {/* Listing Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="w-fit">
                <Badge color={badgeColor}>{badgeText}</Badge>
              </p>
              <Typography variant="24px/800/32.78px">
                {listingData?.title}
              </Typography>
            </div>{" "}
            <div className="flex gap-2 items-center">
              <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                <Typography variant="14px/400/21px" className="text-black-5">
                  {listingData?.category}
                </Typography>
              </div>
              <div className="h-1 w-1 rounded-full bg-black-5" />
              <div className="flex items-center gap-2">
                <Typography variant="16px/600/21.86px" className="text-black-5">
                  {listingData?.location}
                </Typography>
                <div className="h-1 w-1 rounded-full bg-black-5" />
                <Typography variant="16px/600/21.86px" className="text-black-5">
                  {daysAgo(listingData?.start_date) === 1
                    ? "Today"
                    : `${daysAgo(listingData?.start_date)} days ago`}
                </Typography>
              </div>
            </div>
            <div className="grid grid-cols-2 w-[1200px] mob:max-w-[1200px] mob:w-full gap-[64px] mob:flex flex-col">
              <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8">
                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Description
                  </Typography>
                  <Typography variant="16px/400/24px" className="text-black-5">
                    {listingData?.description}
                  </Typography>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Time/Date
                  </Typography>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon />
                      <Typography
                        variant="16px/700/21.86px"
                        className="text-black-4"
                      >
                        {formatDate(listingData?.start_date, "short")} -{" "}
                        {formatDate(listingData?.end_date, "short")}
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Tasks
                  </Typography>
                  <div className="grid gap-2">
                    {listingData?.tasks?.map(
                      (task: { title: string }, index: number) => (
                        <Typography
                          key={index}
                          variant="16px/400/24px"
                          className="text-black-4"
                        >
                          {task.title}
                        </Typography>
                      )
                    )}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Uploaded media
                  </Typography>
                  <div className="flex gap-2 mob:flex-wrap mob:flex">
                    {listingData?.images?.map(
                      (image: string, index: number) => (
                        <Image
                          key={index}
                          priority
                          src={image}
                          alt={`uploaded media ${index}`}
                          width={80}
                          height={80}
                          className="rounded-[12px]"
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Pricing
                  </Typography>
                  <div className="flex items-end gap-2">
                    <Typography variant="24px/800/32.78px">
                      A$ {listingData?.price}
                    </Typography>
                    <Typography
                      variant="16px/400/21.86px"
                      className="text-black-5"
                    >
                      {listingData?.priceType}
                    </Typography>
                  </div>
                </div>
              </div>
              {/* Hiring Tradie */}
              <div className="grid h-fit gap-6">
                <Typography variant="24px/800/32.78px">
                  Hiring Tradie
                </Typography>
                {tradieProfile && (
                  <div
                    key={tradieProfile.id}
                    className="flex flex-row justify-between mob:flex-wrap mob:gap-4"
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-6">
                        <div className=" w-[56px] h-[56px]">
                      <Image
                        src={
                          tradieProfile.user?.picture || "/default-avatar.png"
                        }
                        alt={tradieProfile.user?.name || "Tradie Avatar"}
                        width={72}
                        height={72}
                        className="rounded-full size-full"
                      />

                        </div>
                      <div className="grid ">
                        <div className="flex flex-row gap-3 items-center">
                          <Typography variant="18px/600/24.59px">
                            {tradieProfile.user?.name || "Unknown Tradie"}
                          </Typography>
                          <Typography variant="14px/500/19.12px">
                            @{tradieProfile.user?.tag || "Unknown"}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-1 w-fit">
                          <StarIcon />
                          <Typography
                            variant="14px/700/19.12px"
                            className="text-black-2"
                          >
                            {tradieProfile.tradieDashboard?.rating || "N/A"}
                          </Typography>
                          <Typography
                            variant="14px/400/21px"
                            className="text-black-2 opacity-60"
                          >
                            ({tradieProfile.tradieDashboard?.total_jobs || 0})
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Link href="/tradie-chat">
                      <Button variant={"secondary"}>Message</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
