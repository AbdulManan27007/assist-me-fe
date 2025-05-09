"use client";
import Image from "next/image";
import { StarIcon } from "@/icons";
import { Typography } from "@/components/core/Typography";
import { useEffect, useState } from "react";

interface ProfileUserCardProps {
  picture?: string;
  name?: string;
  tag?: string;
  reviews?: { rating: number }[];
  fetchUserData?: () => Promise<{
    picture?: string;
    name?: string;
    tag?: string;
    reviews?: { rating: number }[];
  }>;
}

export function ProfileUserCard({
  picture: initialPicture,
  name: initialName,
  tag: initialTag,
  reviews: initialReviews = [],
  fetchUserData
}: ProfileUserCardProps) {
  const [userData, setUserData] = useState({
    picture: initialPicture,
    name: initialName,
    tag: initialTag,
    reviews: initialReviews
  });

  // Function to refresh data
  const refreshData = async () => {
    if (fetchUserData) {
      try {
        const freshData = await fetchUserData();
        setUserData({
          picture: freshData.picture || userData.picture,
          name: freshData.name || userData.name,
          tag: freshData.tag || userData.tag,
          reviews: freshData.reviews || userData.reviews
        });
      } catch (error) {
        console.error("Failed to refresh user data:", error);
      }
    }
  };

  // Auto refresh when component mounts
  useEffect(() => {
    refreshData();
    // You can add a routing event listener here if needed
    // to refresh when navigating to the page from within the app
  }, []);

  const averageRating =
    userData.reviews && userData.reviews.length > 0
      ? (
          userData.reviews.reduce((acc, review) => acc + review.rating, 0) /
          userData.reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg w-fit">
      <Image
        priority
        src={userData.picture || "/images/profile.png"}
        alt="User Avatar"
        width={104}
        height={104}
        className="rounded-full border border-gray-300"
      />

      <div className="grid gap-2">
        <div className="flex flex-col">
          <Typography variant="14px/500/19.12px" className="text-gray-500">
            @{userData.tag}
          </Typography>
          <Typography variant="24px/800/32.78px" className="text-gray-900">
            {userData.name}
          </Typography>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full py-1.5 px-3 w-fit">
          <StarIcon className="text-yellow-500" />
          <Typography variant="14px/400/21px" className="text-gray-800">
            {averageRating}
          </Typography>
          <Typography variant="14px/400/21px" className="text-gray-500 opacity-60">
            ({userData.reviews ? userData.reviews.length : 0})
          </Typography>
        </div>
      </div>
    </div>
  );
}