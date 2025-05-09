"use client";
import { z } from "zod";
import React from "react";
import Image from "next/image";
import { CalendarIcon } from "@/icons";
import { formatDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Badge from "@/components/ui/Badge";
import Toast from "@/components/ui/toast";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-loading-skeleton/dist/skeleton.css";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { BackButton } from "@/components/core/BackButton";
import CircularProgress from "@mui/material/CircularProgress";
import { usePutEditBidMutation } from "@/store/tradie/editBid";
import { FormControl, FormMessage } from "@/components/ui/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useGlobalContext } from "@/globalContext/globalContext";
import { useBidOnListingMutation } from "@/store/tradie/bidOnListing";
import { useGetOneListingQuery } from "@/store/household/singleListing";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetTradieListingProfileQuery } from "@/store/household/TradieListingProfile";

const FormSchema = z.object({
  tasks: z.array(
    z.object({
      title: z.string(),
      date: z.date(),
    })
  ),
  description: z.string(),
  bid_amount: z.number().min(0, { message: "Price must be a positive number" }),
});

export default function TradiesApplyListing() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getBidId = () => {
    // Check for standard bidId parameter
    const standardBidId = searchParams.get("bidId");
    if (standardBidId) return standardBidId;

    const urlString = window.location.search;
    if (urlString.includes("BidId")) {
      const match = urlString.match(/BidId(\d+)/);
      if (match && match[1]) {
        return match[1];
      }
    }

    for (const [key, value] of searchParams.entries()) {
      if (key === "" && value.startsWith("BidId")) {
        return value.replace("BidId", "");
      }
      if (value.includes("BidId")) {
        const match = value.match(/BidId(\d+)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }

    return null;
  };

  const bidId = getBidId();
  console.log("Extracted bidId:", bidId);

  // Add state for toast messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formInitialized, setFormInitialized] = useState(false);

  const id = pathname.split("/").pop();

  const user = useGlobalContext(({ user }) => user);

  const {
    data: listing,
    isLoading: isListingLoading,
    isError: isListingError,
  } = useGetOneListingQuery(id as string);

  const [
    bidOnListing,
    { isLoading: isBidding, isError: isBidError, isSuccess: isBidSuccess },
  ] = useBidOnListingMutation();

  const [
    editBid,
    {
      isLoading: isEditBidLoading,
      isError: isEditBidError,
      isSuccess: isEditBidSuccess,
    },
  ] = usePutEditBidMutation();

  const {
    data: bidData,
    isLoading: isBidDataLoading,
    isError: isBidDataError,
  } = useGetTradieListingProfileQuery(bidId || "", {
    skip: !bidId,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tasks: [],
      description: "",
      bid_amount: 0,
    },
  });

  useEffect(() => {
    if (bidId) {
      console.log(`Attempting to fetch bid data for bidId: ${bidId}`);
    }

    console.log("Full URL:", window.location.href);
  }, [bidId, searchParams]);

  useEffect(() => {
    if (bidId && bidData && !isBidDataLoading && !formInitialized) {
      const message =
        bidData.message ||
        (bidData.bid && bidData.bid.message) ||
        (bidData.data && bidData.data.message) ||
        "";

      const bidAmount =
        bidData.bid_amount ||
        (bidData.bid && bidData.bid.bid_amount) ||
        (bidData.data && bidData.data.bid_amount) ||
        0;

      form.reset({
        tasks: [],
        description: message,
        bid_amount: Number(bidAmount),
      });

      setFormInitialized(true);
    }
  }, [bidData, isBidDataLoading, form, bidId, formInitialized]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const bidData = {
        user_id: user?.id,
        listing_id: id,
        status: "pending",
        message: data.description,
        bid_amount: data.bid_amount,
      };

      if (bidId) {
        try {
          const response = await editBid({
            bidId,
            ...bidData,
          }).unwrap();
          setSuccessMessage("Application updated successfully");
          console.log("EDIT SUCCESS:", response);

          setTimeout(() => {
            router.replace(`/tradies-after-applying/${id}?bidId=${bidId}`);
          }, 1000);
        } catch (error: any) {
          setErrorMessage(error.message || "Error updating application");
          console.error("Edit Error:", error);
        }
      } else {
        try {
          const response = await bidOnListing(bidData).unwrap();
          setSuccessMessage("Application submitted successfully");
          console.log("CREATE SUCCESS:", response);

          setTimeout(() => {
            router.push(
              `/tradies-after-applying/${id}?bidId=${response[0].id}`
            );
          }, 1000);
        } catch (error: any) {
          setErrorMessage(error.message || "Error submitting application");
          console.error("Create Error:", error);
        }
      }
    } catch (error) {
      console.error("Failed to process application:", error);
      setErrorMessage("Failed to process application");
    }
  };

  const clearToastMessages = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  React.useEffect(() => {
    if (successMessage || errorMessage) {
      clearToastMessages();
    }
  }, [successMessage, errorMessage]);

  if (isListingLoading || (bidId && isBidDataLoading)) {
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

  if (isListingError) return <p>Error fetching listing</p>;
  if (bidId && isBidDataError) return <p>Error fetching bid data</p>;

  if (!listing) {
    return <p>No listing found.</p>;
  }

  const isSubmitting = isBidding || isEditBidLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-12 mob:py-8 mob:px-6">
          <div className="max-w-[1200px] mx-auto grid gap-8 ">
            <div className="grid gap-4">
              <BackButton />
              <Typography variant="32px/700/43.71px">
                {bidId ? "Edit Application" : "Apply For Listing"}
              </Typography>
            </div>
            <div className="grid gap-16 grid-cols-2 mob:grid-cols-1 mob:gap-12">
              <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="w-fit">
                      <Badge color="green">Open for bidding</Badge>
                    </span>
                    <Typography
                      variant="16px/600/21.86px"
                      className="text-black-5"
                    >
                      {listing.location}
                    </Typography>
                  </div>

                  <Typography
                    variant="24px/800/32.78px"
                    className="text-black-3"
                  >
                    {listing.title}
                  </Typography>

                  <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                    <Typography
                      variant="14px/400/21px"
                      className="text-black-5"
                    >
                      {listing.category}
                    </Typography>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Description
                  </Typography>

                  <Typography variant="16px/400/24px" className="text-black-5">
                    {listing.description}
                  </Typography>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
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
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-4"
                    >
                      Tasks
                    </Typography>

                    <div className="grid gap-2">
                      {listing.tasks.map((task: any, index: number) => (
                        <Typography
                          key={index}
                          variant="16px/400/24px"
                          className="text-black-4"
                        >
                          {task?.title}
                        </Typography>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Uploaded media
                  </Typography>

                  <div className="flex gap-2">
                    {listing.images?.map((image: string, index: number) => (
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
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Pricing
                  </Typography>

                  <div className="flex flex-1 items-end gap-2">
                    <Typography variant="24px/800/32.78px">
                      A$ {listing.price}
                    </Typography>

                    <Typography
                      variant="16px/400/21.86px"
                      className="text-black-5"
                    >
                      {listing.price_type || "Fixed"}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Bid on Listing */}
              <div className="grid gap-12 h-fit mob:row-start-1">
                <div className="grid gap-6">
                  <Typography variant="24px/800/32.78px">
                    Your Application
                  </Typography>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Write about why you're perfect for this listing..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-5">
                  <Typography variant="24px/800/32.78px">Bid</Typography>
                </div>
                <FormField
                  control={form.control}
                  name="bid_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="A$ 0.00"
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 justify-end">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : bidId ? (
                      "Update application"
                    ) : (
                      "Apply for listing"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {successMessage && <Toast message={successMessage} type="success" />}
          {errorMessage && <Toast message={errorMessage} type="error" />}
        </div>
      </form>
    </Form>
  );
}
