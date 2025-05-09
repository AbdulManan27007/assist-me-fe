"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Listing } from "../../core/Listing";
import { Typography } from "@/components/core/Typography";
import { useGlobalContext } from "@/globalContext/globalContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useGetWorkingListsQuery } from "@/store/tradie/myWorkings";

export function TradiesListings() {
  const router = useRouter();
  const user = useGlobalContext(({ user }) => user);

  const { data, isLoading, isError } = useGetWorkingListsQuery(user?.id, {
    skip: !user,
  });

  if (!user) return null;

  const tasks = Array.isArray(data) ? data : [];

  const ongoingTasks = tasks.filter((task) => task.status === "accepted");
  const finishedTasks = tasks.filter((task) => task.status === "completed");

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

  const tabs = [
    {
      name: "Ongoing",
      tasks: ongoingTasks,
      badgeText: "Active",
      badgeColor: "green",
    },
    {
      name: "Finished",
      tasks: finishedTasks,
      badgeText: "Completed",
      badgeColor: "red",
    },
  ];

  return (
    <div className="max-w-[790px] w-full mx-auto grid gap-8 p-12 mob:px-6 mob:py-8">
      <Typography variant="32px/700/43.71px" className="text-black-2">
        Working Listings
      </Typography>

      <Tabs defaultValue={tabs[0]?.name} className="grid gap-6">
        <TabsList className="grid w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.name}>
              <div className="flex items-center gap-1.5 pb-4 text-inherit">
                <Typography variant="16px/700/21.86px" className="text-inherit">
                  {tab.name}
                </Typography>
                <div className="bg-gray-200 rounded-[4px] px-2.5 py-1.5 text-inherit">
                  <Typography
                    variant="14px/600/19.12px"
                    className="text-inherit"
                  >
                    {tab.tasks.length}
                  </Typography>
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>



        {tabs.map((tab) => (
          <TabsContent key={tab.name} value={tab.name}>
            <div className="grid gap-4">
              {tab.tasks.length > 0 ? (
                tab.tasks.map((task: any) => (
                  <Listing
                    key={task.listing_id}
                    onClick={() => router.push(``)}
                    {...task.listing}
                    badgeText={tab.badgeText}
                    badgeColor={tab.badgeColor}
                  />
                ))
              ) : (
                <p className="text-gray-500">
                  No {tab.name.toLowerCase()} tasks
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}