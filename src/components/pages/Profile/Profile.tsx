"use client";

import { LocationIcon, ArrowDropDownIcon, MemberCalendarIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortingMethod, UserRole } from "@/globalContext/globalContext";
import { OrdersStats } from "./OrdersStats";
import { Button } from "@/components/ui/button";
import { ListingsStats } from "./ListingsStats";
import { Divider } from "@/components/core/Divider";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { ProfileUserCard } from "./ProfileUserCard";
import { Typography } from "@/components/core/Typography";
import { useGlobalContext } from "@/globalContext/globalContext";
import { useGetHouseholdProfileQuery } from "@/store/household/householdprofile";
import { useGetUserQuery } from "@/store/users/userdataApi";
import { Review } from "./Review";

export function Profile() {
  const { user } = useGlobalContext();
  const [sortingMethod, setSortingMethod] = useState(SortingMethod.MOST_RECENT);
  const userId = user?.id || ""; // Ensure userId is always defined (fallback to empty string)

  // Always call the hook, passing an empty string if userId is not available
  const {
    data: userData,
    error,
    isLoading: isUserLoading,
  } = useGetUserQuery(userId, {
    skip: !userId,
  });
  const { data: householdProfile, isLoading } = useGetHouseholdProfileQuery(
    userId ? String(userId) : "", // Convert number to string
    { skip: !userId }
  );

  // console.log("________data",data)

  // if (!user) {
  //   return (
  //     <Typography variant="18px/400/27px">User data is loading...</Typography>
  //   );
  // }

  if (isLoading || !user)
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

  return (
    <div className="p-6 md:p-12 mx-auto w-full">
      <div className="grid gap-8 md:gap-[80px] grid-cols-1 md:grid-cols-[1fr_1.95fr] max-w-[1200px] mx-auto">
        {/* Left Sidebar */}
        <div className="grid gap-6 content-start">
          <ProfileUserCard
            picture={userData?.picture}
            name={userData?.name || "Unknown"}
            tag={userData?.role || "User"}
            reviews={(householdProfile?.reviews ?? []).map((review) => ({
              rating: review.rating,
            }))}
          />
          <OrdersStats
            countP={householdProfile?.pendingTasks ?? 0}
            countC={householdProfile?.completedTasks ?? 0}
          />
          {/* <ListingsStats /> */}
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
                  ? new Date(user?.created_at).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/profile/edit">
              <Button variant="secondary" className="w-full sm:w-auto">
                Edit Profile
              </Button>
            </Link>
            <Link href="/profile/profileSettings">
              <Typography
                variant="16px/700/21.86px"
                className="text-black-1 sm:text-center w-full sm:w-auto rounded-full sm:border-none border p-3 text-center"
              >
                Settings
              </Typography>
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="grid gap-6 ">
          <Typography variant="24px/800/32.78px">Bio</Typography>
          <Typography variant="18px/400/27px" className="text-black-5">
            {userData?.bio || "No bio available."}
          </Typography>

          <Typography variant="24px/800/32.78px">Listing Categories</Typography>
          <div className="flex flex-wrap gap-2">
            {householdProfile?.listings?.map((listing, index) => (
              <Typography
                key={index}
                variant="14px/400/21px"
                className="flex items-center border border-[#0000001A] text-black-5 p-2 text-center rounded-full"
              >
                {listing.category}
              </Typography>
            ))}
          </div>

          {/* Reviews Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <Typography variant="24px/800/32.78px">
              {user.role === "household"
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
            {householdProfile?.reviews?.map((review) => (
              <Review
                key={review.id}
                id={review.id}
                rating={review.rating}
                date={review.created_at}
                description={review.comment}
                reviewer={{
                  avatar: "/images/profile.png",
                  name: "Anonymous",
                  tag: `user${review.tradie_id}`,
                  role: review.author_role as UserRole, // Type assertion
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
