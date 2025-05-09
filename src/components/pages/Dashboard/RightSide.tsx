"use client"
import { NotificationsList } from "./NotificationsList";
import EarningsOverview from "./EarningOverview";
import { Listing } from "../../core/Listing";
import { Typography } from "@/components/core/Typography";
import { useGetTotalTasksQuery } from "@/store/household/TotalListingData";
import { useGlobalContext } from "@/globalContext/globalContext";
import { useRouter } from "next/navigation";

export function RightSide() {
  const router = useRouter();

  const user = useGlobalContext(({ user }) => user);
  const {
    data: totalTasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useGetTotalTasksQuery(user?.id, {
    skip: !user,
  });

  const badgeText = "Active"; 
  const badgeColor = "green";

  return (
    <div className="flex flex-col gap-16">
      <NotificationsList />
      <div>
        <div className="flex items-center justify-start gap-3 pb-6">
          <Typography variant="24px/800/32.78px">My Listings</Typography>
          <div className="bg-[#FF712533] rounded-[8px] px-3 py-[3px]">
            <Typography variant="16px/600/21.86px" className="text-accent">
              {totalTasksData?.tasks?.length}
            </Typography>
          </div>
        </div>
        <div className="flex-1 ml-8">
          <div className="max-h-[1000px] overflow-y-auto scroll-smooth flex flex-col gap-2">
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
    </div>
  );
}
