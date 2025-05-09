"use client";
import Link from "next/link";
import Image from "next/image";
import Badge from "../ui/Badge";
import { VisibilityIcon } from "@/icons";
import Skeleton from 'react-loading-skeleton';
import { CalendarIcon, MoreIcon } from "@/icons";
import { daysAgo, formatDate } from "@/lib/utils";
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useRef, useEffect } from "react";
import { IUser } from "@/globalContext/globalContext";
import { Typography } from "@/components/core/Typography";
import { useGetHiredTradiesQuery } from "@/store/household/HiredTradies"; // Import the RTK Query hook

export function Listing({
  id,
  title,
  category,
  description,
  badgeText,
  badgeColor = "green" as "orange" | "blue" | "green" | "red",
  price,
  images = [],
  priceType,
  start_date,
  end_date,
  hiredTradie,
  location,
  nextTask,
  onClick,
}: Partial<IUser["listings"][number]> & {
  badgeText?: string;
  badgeColor?: "orange" | "blue" | "green" | "red";
  onClick?: () => void;
}) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const skipQuery = !id;
  // Fetch hired tradie data using RTK Query
  const {
    data: hiredTradieData,
    isLoading,
    isError,
  } = useGetHiredTradiesQuery(id, { skip: skipQuery }); // Pass the `id` from props

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  if (isLoading) {
    return (
      <div className="grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6">
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
  if (isError) return <p>Error fetching tasks</p>;

  return (
    <div>
      <div className="grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="w-fit">
              <Badge color={badgeColor}>{badgeText}</Badge>
            </span>
            <Typography variant="24px/800/32.78px">{title}</Typography>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Typography variant="16px/600/21.86px" className="text-black-5">
                {location}
              </Typography>
              <div className="h-1 w-1 rounded-full bg-black-5" />
              <Typography variant="16px/600/21.86px" className="text-black-5">
                {start_date ? `${daysAgo(start_date.toString())} days ago` : ""}
              </Typography>
            </div>
            <div className="relative" ref={dropdownRef}>
              <MoreIcon
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}
                className="cursor-pointer"
              />
              {isDropdownVisible && (
                <div className="absolute right-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 cursor-pointer">
                  <div
                    className="flex flex-row justify-between items-center py-1  hover:bg-gray-100 px-2 gap-3"
                    onClick={onClick}
                  >
                    <Typography
                      variant="14px/500/19.12px"
                      className="block   text-sm text-gray-700 "
                    >
                      Detail
                    </Typography>
                    <VisibilityIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {category && (
          <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
            <Typography variant="14px/400/21px" className="text-black-5">
              {category}
            </Typography>
          </div>
        )}
        {description && (
          <Typography
            variant="16px/400/24px"
            className="text-black-5 truncate-lines-3"
          >
            {description}
          </Typography>
        )}
        {Array.isArray(images) && images.length > 0 && (
          <div className="grid gap-3">
            <Typography variant="18px/700/24.59px" className="text-black-4">
              Uploaded media
            </Typography>
            <div className="flex gap-2">
              {images.map((image, index) => (
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

        <div className="flex gap-6">
          {price || priceType ? (
            <div className="flex flex-1 items-end gap-2">
              <Typography variant="24px/800/32.78px">A$ {price}</Typography>
              <Typography variant="16px/400/21.86px" className="text-black-5">
                {priceType}
              </Typography>
            </div>
          ) : null}

          {end_date && start_date && (
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <Typography variant="16px/700/21.86px" className="text-black-4">
                {formatDate(start_date.toString(), "short")} -{" "}
                {formatDate(end_date.toString(), "short")}
              </Typography>
            </div>
          )}
        </div>
      </div>

      {hiredTradieData && hiredTradieData.length > 0 && (
        <div className="border border-t-0 border-[#0000001A] rounded-[0_0_12px_12px] p-6">
          <Typography variant="14px/500/19.12px" className="text-black-4 mb-4">
            Hired Tradies
          </Typography>
          {hiredTradieData.map((tradie: any) => (
            <div key={tradie.id} className="grid grid-cols-2 items-start mb-4">
              <div className="flex items-center gap-3">
                <Link href={`/after-hire/${tradie?.listing_id}?bidId=${tradie?.id}`}>
                  <Image
                    src={tradie.user.picture || "/default-avatar.png"}
                    alt={tradie.user.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full cursor-pointer"
                  />
                </Link>
                <div>
                  <Typography
                    variant="14px/500/19.12px"
                    className="text-black-4"
                  >
                    @{tradie.user.tag}
                  </Typography>
                  <Typography
                    variant="18px/600/24.59px"
                    className="text-black-2"
                  >
                    {tradie.user.name}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
