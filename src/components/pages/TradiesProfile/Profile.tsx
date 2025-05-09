"use client";
import {
  LocationIcon,
  ApartmentIcon,
  ArrowDropDownIcon,
  MemberCalendarIcon,
  RealEstateAgentIcon,
} from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { Review } from "./Review";
import { PortfolioSlider } from "./PortfolioSlider";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser, UserRole, SortingMethod, useGlobalContext } from "@/globalContext/globalContext";
import { OrdersStats } from "./OrdersStats";
import { Button } from "@/components/ui/button";
import { ListingsStats } from "./ListingsStats";
import { Divider } from "@/components/core/Divider";
import { ProfileUserCard } from "./ProfileUserCard";
import { Typography } from "@/components/core/Typography";
import { Calendar } from "@/components/ui/calendar-custom-tradies";
import { useGetUserQuery } from "@/store/users/userdataApi";
import { CircularProgress } from "@mui/material";
import { useGetTradieProfileQuery } from "@/store/tradie/tradieProfile";

export function Profile() {
  const { user:data } = useGlobalContext();
  const { data: userData, error, isLoading } = useGetUserQuery(data?.id, {
      skip: !data?.id, 
    });
  const { data: tradieProfile, isLoading : isTradieProfileLoading } = useGetTradieProfileQuery(
  data?.id ? String(data?.id) : "",
  { skip: !data?.id }
);

  const [sortingMethod, setSortingMethod] = useState(SortingMethod.MOST_RECENT);

  const handleSorting = (a: any, b: any) =>
    sortingMethod === SortingMethod.MOST_RECENT
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime();

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CircularProgress color="inherit" style={{ color: "#FF7125" }}/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Typography variant="18px/400/27px" color="#eb4034">Failed to fetch user details.</Typography>;
      </div>
    )
  }

  return (
    <div className="p-6 md:p-12 mx-auto">
      <div className="grid gap-8 md:gap-[80px] grid-cols-1 md:grid-cols-[1fr_1.95fr] max-w-[1200px] mx-auto">
        {/* Left Sidebar */}
        <div className="grid gap-6 content-start">
          <ProfileUserCard
            picture={userData?.picture}
            name={userData?.name || "Unknown"}  
            tag={userData?.role || "User"}      
            reviews={(tradieProfile?.reviews ?? [])
              .filter((review) => review.author_role === "household")
              .map((review) => ({
                rating: review.rating,
              }))}
           />
          <Divider />
          <OrdersStats
            countP={tradieProfile?.pending_jobs ?? 0}
            countC={tradieProfile?.completed_jobs ?? 0}
          />
          <Divider />
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <LocationIcon className="fill-black-4" />
              <Typography variant="14px/400/21px" className="text-black-4">
                From {userData?.address || "Unknown"}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <MemberCalendarIcon className="fill-black-4" />
              <Typography variant="14px/400/21px" className="text-black-4">
              Member since{" "}
                {userData?.created_at
                  ? new Date(data?.created_at).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/tradies-profile/edit">
              <Button variant="secondary" className="w-full sm:w-auto">
                Edit Profile
              </Button>
            </Link>
            <Link href="/tradies-profile/profileSettings">
              <Typography
                variant="16px/700/21.86px"
                className="text-black-1 sm:text-center w-full sm:w-auto rounded-full sm:border-none border  p-3 text-center"
              >
                Settings
              </Typography>
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="grid gap-6 ">
          <Typography variant="24px/800/32.78px">Bio</Typography>
          <Typography
            variant="18px/400/27px"
            className="text-black-5"
          >
            {tradieProfile?.bio || "No bio available."}
          </Typography>

          {/* Skills Section */}
          <Typography variant="24px/800/32.78px">Skills</Typography>
          <div className="flex flex-wrap gap-2">
            {(tradieProfile?.skills ?? []).length > 0 ? (
              (tradieProfile?.skills ?? []).map((skill, index) => (
                <Typography
                  key={index}
                  variant="14px/400/21px"
                  className="border border-[#0000001A] text-black-5 p-2 rounded-full"
                >
                  {skill}
                </Typography>
              ))
            ) : (
              <Typography variant="14px/400/21px" className="text-gray-500 italic">
                No skills added yet
              </Typography>
            )}
          </div>

          {/* Portfolio Slider */}
          <div >
            <PortfolioSlider />
          </div>

          {/* Availability */}
          <div>
            <Typography variant="24px/800/32.78px">Availability</Typography>
            <div className="flex gap-4">
              {/* <Calendar 
              selected={
                tradieProfile?.availability?.start_date && tradieProfile?.availability?.end_date
                  ? {
                      from: new Date(tradieProfile.availability.start_date),
                      to: new Date(tradieProfile.availability.end_date),
                    }
                  : undefined
              }
              /> */}
              <Calendar 
                selected={
                  tradieProfile?.availability?.start_date && tradieProfile?.availability?.end_date
                    ? {
                        from: new Date(tradieProfile.availability.start_date),
                        to: new Date(tradieProfile.availability.end_date),
                      }
                    : undefined
                }
              />


              {/* <div>
                <Typography variant="16px/700/21.86px">Start Date</Typography>
                <Calendar selected={tradieProfile?.start_date ? new Date(tradieProfile.start_date) : undefined} />
              </div> */}
              {/* <div>
                <Typography variant="16px/700/21.86px">End Date</Typography>
                <Calendar selected={tradieProfile?.end_date ? new Date(tradieProfile.end_date) : undefined} />
              </div> */}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <Typography variant="24px/800/32.78px">
              {data.role === UserRole.Tradie
                ? "Household Reviews"
                : "Tradie Reviews"}
            </Typography>
            <div className="flex items-center">
              <Typography variant="14px/500/19.12px" className="mr-3">
                Sort by
              </Typography>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Typography variant="16px/700/21.86px">
                    {sortingMethod}
                  </Typography>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Object.values(SortingMethod).map((method) => (
                    <DropdownMenuItem
                      key={method}
                      onClick={() => setSortingMethod(method)}
                    >
                      {method}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <ArrowDropDownIcon />
            </div>
          </div>

          {/* Review List */}
          <div className="grid gap-4">
            {tradieProfile?.reviews?.map((review) => {
              if (review.author_role === "household") {
                return (
              <Review
              key={review.id}
              id={review.id}
              rating={review.rating}
              date={review.created_at}
              description={review.comment}
              reviewer={{
                avatar: review.household_image || "/images/profile.png",
                name: review.household_name || "Anonymous",
                tag: `user${review.tradie_id}`,
                role: review.author_role as UserRole,
              }}
            />
            )
            }})}
          </div>
        </div>
      </div>
    </div>
  );
}
