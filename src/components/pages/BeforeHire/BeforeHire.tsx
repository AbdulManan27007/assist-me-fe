"use client";
import Image from "next/image";
import { Popup } from "./PopUp";
import Badge from "../../ui/Badge";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { daysAgo, formatDate } from "@/lib/utils";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@/components/core/Typography";
import { BackButton } from "@/components/core/BackButton";
import CircularProgress from "@mui/material/CircularProgress";
import { usePutBidStatusMutation } from "@/store/household/BidStatus";
import { useGetOneListingQuery } from "@/store/household/singleListing";
import { CalendarIcon, HourGlassIcon, StarIcon, MoreIcon } from "@/icons";
import { useGetBidsOnListingQuery } from "@/store/household/BidsOnListing";
import { useGetHiredTradiesQuery } from "@/store/household/HiredTradies";
import Link from "next/link";

import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";

export function BeforeHire() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams(); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loadingBidId, setLoadingBidId] = useState<string | null>(null);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const [updateBidStatus, { isLoading: isUpdatingBidStatus }] =
    usePutBidStatusMutation();

  const handleAcceptBid = async (bidId: string, listingId: string) => {
    setLoadingBidId(bidId);
    try {
      await updateBidStatus({ id: bidId, listing_id: listingId }).unwrap();
      router.push(`/payment-integration/${listingId}?bidId=${bidId}`);
    } catch (error) {
      console.error("Failed to update bid status:", error);
    } finally {
      setLoadingBidId(null);
    }
  };

  // Fetch hired tradie data using RTK Query
  const {
    data: hiredTradieData,
    isLoading: isHiredTradieLoading,
    isError: isHiredTradieError,
  } = useGetHiredTradiesQuery(id as string);

  const {
    data: listing,
    isLoading: isListingLoading,
    isError: isListingError,
  } = useGetOneListingQuery(id as string);

  // Fetch bids on listing using RTK Query
  const {
    data: bids,
    isLoading: isBidsLoading,
    isError: isBidsError,
  } = useGetBidsOnListingQuery(id as string);

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
  }, [bids]);

  const toggleExpanded = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const togglePopup = () => setIsPopupVisible((prev) => !prev);

  if (isListingLoading || isBidsLoading || isHiredTradieLoading)
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

  if (isListingError || isBidsError || isHiredTradieError) {
    return <div>Error fetching data.</div>;
  }

  const badgeText =
    listing?.status === "completed" || listing?.completed
      ? "Expired"
      : "Open for bidding";
  const badgeColor =
    listing?.status === "completed" || listing?.completed ? "red" : "green";

  return (
    <div className="p-12 mob:p-6">
      <div className="max-w-[1200px] mx-auto grid gap-8 ">
        <div className="grid gap-4">
          <BackButton />
          <div className="flex justify-between items-baseline mob:flex-col-reverse mob:gap-2">
            <span className="space-y-2">
              <p className="w-fit">
                <Badge color={badgeColor}>{badgeText}</Badge>
              </p>
              <Typography variant="32px/700/43.71px">
                {listing?.title}
              </Typography>
            </span>
            <div className="flex flex-row items-center gap-8 mob:justify-between mob:w-full">
              <Button onClick={togglePopup}>Invite More Tradies</Button>
              <Popup isVisible={isPopupVisible} onClose={togglePopup} />
              <MoreIcon />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
              <Typography variant="14px/400/21px" className="text-black-5">
                {listing?.category}
              </Typography>
            </div>
            <div className="h-1 w-1 rounded-full bg-black-5" />

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
        <div className="grid gap-16 grid-cols-2 mob:grid-cols-1">
          <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8 h-fit desk:sticky desk:top-12">
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
                Time/Date
              </Typography>

              <div className="flex gap-6">
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
                Tasks
              </Typography>

              <div className="grid gap-2">
                {listing?.tasks?.map(
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
              <Typography variant="18px/700/24.59px" className="text-black-4">
                Uploaded media
              </Typography>

              <div className="flex gap-2">
                {listing?.images?.map((image: string, index: number) => (
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
          </div>

          <div className="grid h-fit gap-6">
            {/* Hired Tradies */}
            {hiredTradieData && hiredTradieData.length > 0 && (
              <div className="grid gap-6 mb-6">
                <Typography variant="24px/800/32.78px">
                  Hired Tradie
                </Typography>
                {hiredTradieData.map((tradie: any) => (
                  <div
                    key={tradie.id}
                    className="flex flex-row justify-between mob:flex-wrap mob:gap-4"
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-6">
                      <div className="w-[56px] h-[56px]">
                        <Image
                          src={tradie.user?.picture || "/default-avatar.png"}
                          alt={tradie.user?.name || "Tradie"}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <div className="grid">
                        <div className="flex flex-row gap-3 items-center">
                          <Typography variant="18px/600/24.59px">
                            {tradie.user?.name || "Unknown Tradie"}
                          </Typography>
                          <Typography variant="14px/500/19.12px">
                            @{tradie.user?.tag}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-1 w-fit">
                          <StarIcon />
                          <Typography
                            variant="14px/700/19.12px"
                            className="text-black-2"
                          >
                            {tradie.tradieDashboard?.rating || "N/A"}
                          </Typography>
                          <Typography
                            variant="14px/400/21px"
                            className="text-black-2 opacity-60"
                          >
                            ({tradie.tradieDashboard?.total_jobs || 0})
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Link href="/tradie-chat">
                      <Button variant={"secondary"}>Message</Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Tradie Applications */}
            <div className="grid h-fit">
              <div className="flex items-center gap-3">
                <Typography variant="24px/800/32.78px">
                  Tradie Applications
                </Typography>
                <div className={"bg-white-2 rounded-[8px] px-3 py-[3px]"}>
                  <Typography variant="16px/600/21.86px" className="text-black-5">
                    {bids?.length || 0}
                  </Typography>
                </div>
              </div>

              {bids?.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                  <Typography variant="18px/600/24.59px" className="text-black-4">
                    No Applications
                  </Typography>
                </div>
              ) : (
                bids?.map((bid: any, index: number) => (
                  <div key={index} className="grid gap-6 pt-6 pb-8">
                    <div className="grid grid-cols-[auto_1fr] gap-6">
                      <Image
                        src={bid.user?.picture || "/default-avatar.png"}
                        alt={bid.user?.name || "avatar"}
                        width={72}
                        height={72}
                        className="rounded-full"
                      />
                      <div className="grid gap-2">
                        <div className="flex flex-col ">
                          <Typography variant="14px/500/19.12px">
                            @{bid.user?.tag}
                          </Typography>
                          <Typography variant="18px/600/24.59px">
                            {bid.user?.name}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-2 border border-[#0000001A] rounded-full py-1.5 px-3 w-fit">
                          <div className="flex items-center">
                            <StarIcon />
                            <Typography
                              variant="14px/400/21px"
                              className="text-black-2"
                            >
                              {bid.tradieDashboard?.rating || "N/A"}
                            </Typography>
                            <Typography
                              variant="14px/400/21px"
                              className="text-black-2 opacity-60"
                            >
                              ({bid.tradieDashboard?.total_jobs || 0})
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div
                        className={`tradie-experience truncate transition-all ${
                          expandedIndexes.includes(index)
                            ? "truncate--expanded"
                            : "truncate--line-clamped"
                        }`}
                      >
                        {bid.message && (
                          <Typography
                            variant="16px/400/24px"
                            className="text-black-5"
                          >
                            {bid.message}
                          </Typography>
                        )}
                      </div>
                      <Typography
                        variant="16px/700/21.86px"
                        className="text-accent cursor-pointer"
                        onClick={() => toggleExpanded(index)}
                      >
                        {expandedIndexes.includes(index)
                          ? "Read Less"
                          : "Read More"}
                      </Typography>
                    </div>

                    <div className="flex items-center gap-4 justify-end">
                      <span className="flex flex-col">
                        <Typography
                          variant="16px/400/24px"
                          className="text-black-5"
                        >
                          Bid
                        </Typography>
                        <Typography
                          variant="24px/800/32.78px"
                          className="text-black-2"
                        >
                          A$ {bid.bid_amount}
                        </Typography>
                      </span>
                      <Button
                        disabled={loadingBidId === bid.id}
                        onClick={async (e) => {
                          e.preventDefault();
                          await handleAcceptBid(bid.id, listing.id);
                        }}
                      >
                        {loadingBidId === bid.id ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Accept Bid"
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}