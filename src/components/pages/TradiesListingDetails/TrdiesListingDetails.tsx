"use client";
import Image from "next/image";
import Link from "next/link";
import Skeleton from 'react-loading-skeleton';
import { Button } from "@/components/ui/button";
import 'react-loading-skeleton/dist/skeleton.css';
import { daysAgo, formatDate } from "@/lib/utils";
import { BackButton } from "@/components/core/BackButton";
import { Typography } from "@/components/core/Typography";
import { CalendarIcon, HourGlassIcon, VisibilityIcon } from "@/icons";
import { useGetOneListingQuery } from "@/store/household/singleListing";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ListingDetail() {
  const router = useRouter(); // For navigation
  const pathname = usePathname(); // Get current path
  const searchParams = useSearchParams(); // Get query parameters

  const id = pathname.split("/").pop(); // Extract ID from URL

  const {
    data: listing,
    isLoading: isListingLoading,
    isError: isListingError,
  } = useGetOneListingQuery(id as string);

  if (!id) {
    return <p>Invalid ID</p>;
  }
    if (isListingLoading) {
      return (
        <div className="w-[584px] mx-auto grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6 ">
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
                <Skeleton key={index} width={80} height={80} className="rounded-[12px]" />
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
    if (isListingError) return <p>Error fetching tasks</p>;

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
                  <Link href={`/tradies-apply-for-listing/${id}`}>
                    <Typography variant="16px/700/21.86px">
                      Apply for listing
                    </Typography>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <Typography variant="32px/700/43.71px">
                {listing?.title}
              </Typography>

              <div className="flex items-center gap-3 justify-start mob:justify-start">
                <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                  <Typography variant="14px/400/21px" className="text-black-5">
                    {listing?.category}
                  </Typography>
                </div>
                {/* <div className="flex items-center gap-2"> */}
                <Typography variant="14px/500/19.12px" className="text-black-5">
                  {listing?.location}
                </Typography>
            
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
            <Typography variant="16px/400/24px" className="text-black-5">
              {listing?.description}
            </Typography>
            <Section title="Timing">
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
            </Section>
            <Section title="Tasks">
              <div className="grid gap-2">
                {listing?.tasks?.map((task: any, index: any) => (
                  <Typography
                    key={index}
                    variant="16px/400/24px"
                    className="text-black-4"
                  >
                    {task.title}
                  </Typography>
                ))}
              </div>
            </Section>

            <Section title="Uploaded media">
              <div className="flex gap-2">
                {listing?.images?.map((image: any, index: any) => (
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
            </Section>

            <Section title="Pricing">
              <div className="flex flex-1 items-end gap-2">
                <Typography variant="24px/800/32.78px">
                  A$ {listing?.price}
                </Typography>
                <Typography variant="16px/400/21.86px" className="text-black-5">
                  {listing?.priceType}
                </Typography>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="grid gap-3">
      <Typography variant="18px/700/24.59px" className="text-black-4">
        {title}
      </Typography>
      {children}
    </div>
  );
}
