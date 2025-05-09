"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MoreIcon, StarIcon, CrossIcon, CalendarIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/core/Typography";
import { Listing } from "../../core/Listing";
import Badge from "../../ui/Badge";
import { cn, daysAgo, formatDate } from "@/lib/utils";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetSingleTradieDataQuery } from "@/store/household/singletradiedata";
import { useGetTotalTasksQuery } from "@/store/household/TotalListingData";
import { useGlobalContext } from "@/globalContext/globalContext";
import { useRouter } from "next/navigation";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  userId: number;
}

export const Popup: React.FC<PopupProps> = ({ isVisible, onClose, userId }) => {
  const router = useRouter();
  if (!isVisible) return null;

  const {
    data: tradieData,
    isLoading: isTradieLoading,
    isError: isTradieError,
  } = useGetSingleTradieDataQuery(userId);

  const user = useGlobalContext(({ user }) => user);
  const {
    data: totalTasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useGetTotalTasksQuery(user?.id, {
    skip: !user,
  });

  console.log("userRole", user?.role);

  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isHovering, setIsHovering] = useState(false);

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

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
  }, [tradieData]);

  if (isTradieLoading || isTasksLoading) {
    return (
      <div>
        <CircularProgress size={24} color="primary" />
      </div>
    );
  }

  if (isTradieError || isTasksError) {
    return <div>Error fetching data</div>;
  }

  const badgeText = tradieData.is_online
    ? "Available now"
    : "Available next week";
  const badgeColor = tradieData.is_online ? "green" : "gray";

  return (
    <div
      className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] p-8 max-w-[1000px] w-full z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <Typography variant="32px/700/43.71px">
            Invite Tradies to Listing
          </Typography>
          <CrossIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <Typography variant="16px/400/24px" className="mb-8">
          You can invite additional tradies to bid on this listing.
        </Typography>

        <div className="flex flex-row justify-between">
          {/* Left Section: Tradie Details */}
          <div className="w-[236px] grid gap-4 border bg-[#F3F3F3] border-[#0000001A] rounded-[12px] p-6">
            <div className="flex flex-col justify-center items-center">
              <Typography
                variant="18px/600/24.59px"
                className="text-black-2 mb-4"
              >
                Tradie
              </Typography>
              {tradieData ? (
                <>
                  <div className="relative flex flex-col items-center justify-center gap-3">
                    <img
                      src={tradieData.picture || "/images/profile.png"}
                      alt={tradieData.name}
                      className="w-[120px] h-[120px] rounded-full"
                    />
                    <Typography
                      variant="18px/600/24.59px"
                      className="text-black-2"
                    >
                      {tradieData.name}
                    </Typography>
                    <div
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={() => handleFavoriteToggle(tradieData.id)}
                    >
                      <Image
                        src={
                          favorites[tradieData.id]
                            ? "/icons/Heart_Fill.svg"
                            : "/icons/Heart.svg"
                        }
                        width={15}
                        height={15}
                        alt="HeartIcon"
                      />
                    </div>
                    <div className="flex items-center">
                      <StarIcon />
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-2"
                      >
                        {tradieData.rating || "N/A"}
                      </Typography>
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-2 opacity-60"
                      >
                        ({tradieData.total_jobs || 0})
                      </Typography>
                    </div>
                    <Typography
                      variant="14px/400/21px"
                      className="text-black-2 opacity-60"
                    >
                      {tradieData.total_jobs} completed jobs
                    </Typography>
                    <Typography
                      variant="16px/400/24px"
                      className="text-black-5 truncate-lines-3 text-center"
                    >
                      {tradieData.about_me}
                    </Typography>
                    <span className="w-fit">
                      <Badge color={badgeColor}>{badgeText}</Badge>
                    </span>
                    <Typography
                      variant="16px/400/21.86px"
                      className="text-black-5 truncate-lines-3 text-center"
                    >
                      <span className="text-[16px] text-black-2 font-bold ">
                        A${tradieData.price}
                      </span>
                      /hour
                    </Typography>
                  </div>
                  <Typography
                    variant="14px/500/19.12px"
                    className="truncate-lines-3 text-center text-[#FF7125] mt-4 cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    View Profile
                  </Typography>
                  {isHovering && (
                    <div className="absolute bg-white p-4 border border-gray-200 rounded-lg shadow-lg z-50">
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>Name:</strong> {tradieData.name}
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>UserName:</strong> {tradieData.username}
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>Phone:</strong> {tradieData.phone}
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>Rating:</strong> {tradieData.rating || "N/A"}
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>Email:</strong> A${tradieData.email}
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>Total Jobs:</strong> {tradieData.total_jobs}
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>About Me:</strong> {tradieData.about_me}
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>Price:</strong> A${tradieData.price}/hour
                      </Typography>
                      <Typography
                        variant="16px/400/24px"
                        className="text-black-2"
                      >
                        <strong>Total Earnings:</strong> A$
                        {tradieData.total_earnings}
                      </Typography>
                    </div>
                  )}
                </>
              ) : (
                <Typography variant="16px/400/24px">
                  Tradie data not found.
                </Typography>
              )}
            </div>
          </div>

          {/* Right Section: Your Listings */}
          <div className="flex-1 ml-8">
            <Typography className="pb-3" variant="24px/800/32.78px">
              Your Listings
            </Typography>
            <div className="max-h-[400px] overflow-y-auto">
              {totalTasksData?.tasks?.length > 0 ? (
                totalTasksData.tasks.map((task: any) => (
                  <Listing
                    key={task.id}
                    onClick={() => router.push(`/before-hire/${task.id}`)}
                    {...task}
                    badgeText={badgeText}
                    badgeColor={badgeColor}
                  />
                ))
              ) : (
                <p className="text-gray-500">No tasks available</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mt-4">Send Invite</Button>
        </div>
      </div>
    </div>
  );
};