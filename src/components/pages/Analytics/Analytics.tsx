"use client";
import { Typography } from "@/components/core/Typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { Statistic } from "./Statistic";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "@/store/users/userApi";
import { format, parseISO } from "date-fns";

export function Analytics() {

  const { data: users, error, isLoading } = useGetUsersQuery();
    // console.log('____from User management-RTK get all users::',users)

  const [timeframe, setTimeframe] = useState("30d");
  const { totalUsers, totalHouseholds, totalTradies, percentageRecentUsers, recentUsersCount, percentageRecentHouseholds7Days, percentageRecentTradies7Days, percentageRecentNewUsers, newUsersCount } = useSelector(
    (state:any) => state.users
  );

  const chartData = [
    {
      date: "01.09",
      users: 0,
    },
    {
      date: "03.09",
      users: 3500,
    },
    {
      date: "07.09",
      users: 6800,
    },
    {
      date: "14.09",
      users: 6900,
    },
    {
      date: "21.09",
      users: 5200,
    },
    {
      date: "27.09",
      users: 7300,
    },
    {
      date: "28.09",
      users: 8700,
    },
    {
      date: "30.09",
      users: 9000,
    },
  ];
  
  // Process users data into chartData format
  
  const processChartData = (users: { created_at: string }[]) => {
    if (!users) return [];
  
    // Group users by creation date
    const userCountsByDate: Record<string, number> = users.reduce((acc, user) => {
      const date = format(parseISO(user.created_at), "dd.MM"); // Format date as "01.09"
      acc[date] = (acc[date] || 0) + 1; // Ensure the count is a number
      return acc;
    }, {} as Record<string, number>);
  
    // Convert object to array with explicit typing
    return Object.entries(userCountsByDate).map(([date, count]) => ({
      date,
      users: count as number,
    }));
  };
  
  // Now, use the processed chart data
  // const chartData: { date: string; users: number }[] = processChartData(
  //   (users ?? []).map(user => ({
  //     created_at: format(user.created_at, "dd.MM"), // Convert to "DD.MM" format
  //   }))
  // );
  

  

  const userStatisticsData = [
    {
      title: "Total",
      time: "7d",
      value: totalUsers,
      percentage: `+${percentageRecentUsers}%`,
      black: true,
    },
    {
      title: "New",
      time: "7d",
      value: newUsersCount,
      percentage: `+${percentageRecentNewUsers}%`
    },
    {
      title: "Households",
      time: "7d",
      value: totalHouseholds,
      percentage: `+${percentageRecentHouseholds7Days}%`
    },
    {
      title: "Tradies",
      time: "7d",
      value: totalTradies,
      percentage: `+${percentageRecentTradies7Days}%`
    },
  ];
  
  const listingStatisticsData = [
    {
      title: "Total",
      time: "30d",
      value: "1000",
      percentage: "+10%",
    },
    {
      title: "New",
      time: "30d",
      value: "1000",
      percentage: "+10%",
      black: true,
    },
    {
      title: "Active",
      time: "7d",
      value: "1000",
      percentage: "+10%",
    },
    {
      title: "Inactive",
      time: "7d",
      value: "1000",
      percentage: "+10%",
    },
  ];
  
  const listingPerformanceStatisticsData = [
    {
      title: "Views",
      time: "30d",
      value: "1000",
      percentage: "+10%",
    },
    {
      title: "Clicks",
      time: "30d",
      value: "1000",
      percentage: "+10%",
      black: true,
    },
    {
      title: "Applications",
      time: "7d",
      value: "1000",
      percentage: "+10%",
    },
    {
      title: "Payments",
      time: "7d",
      value: "1000",
      percentage: "+10%",
    },
  ];
  
  const revenueStatisticsData = [
    {
      title: "Total",
      time: "30d",
      value: "1000",
      percentage: "+10%",
      expanded: true,
    },
    {
      title: "Commissions",
      time: "30d",
      value: "1000",
      percentage: "+10%",
      black: true,
    },
    {
      title: "Fees",
      time: "7d",
      value: "1000",
      percentage: "+10%",
    },
  ];

  return (
    <div className="p-12 mob:py-8 mob:px-6">
      <div className="max-w-[1200px] mx-auto grid gap-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <Typography variant="32px/700/43.71px" className="text-black-1">
              Analytics
            </Typography>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Typography variant="14px/500/19.12px" className="text-black-3">
                  Timeframe
                </Typography>

                <Select onValueChange={setTimeframe} defaultValue={timeframe}>
                  <SelectTrigger className="bg-transparent border-none outline-none py-0 pl-0 pr-[24px] min-h-fit h-fit w-fit [&>svg]:right-0">
                    <Typography
                      variant="16px/700/21.86px"
                      className="text-black-5"
                    >
                      {timeframe}
                    </Typography>
                  </SelectTrigger>
                  <SelectContent>
                    {["30d", "60d", "90d"].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Link href="/generate-report">
              <Button className="mob:hidden">
                <Typography variant="16px/700/21.86px" className="text-white-1">
                  Generate Report
                </Typography>
              </Button>
              </Link>
            </div>
          </div>
          <Link href="/generate-report">
          <Button className="w-fit">
            <Typography variant="16px/700/21.86px" className="text-white-1">
              Generate Report
            </Typography>
          </Button>
          </Link>
        </div>
        <div className="grid gap-6">
          <Statistic
            data={userStatisticsData}
            chartData={chartData}
            timeframe={timeframe}
          />
          <Statistic
            data={listingStatisticsData}
            chartData={chartData}
            timeframe={timeframe}
            title="Listing Statistics"
            subTitle="New Listings"
            color="#DC3545"
          />
          <Statistic
            data={listingPerformanceStatisticsData}
            chartData={chartData}
            timeframe={timeframe}
            title="Listing Performance Statistics"
            subTitle="Listings Clicks"
            color="#303940"
          />
          <Statistic
            data={revenueStatisticsData}
            chartData={chartData}
            timeframe={timeframe}
            title="Revenue Statistics"
            subTitle="Commissions Revenue"
            color="#20C198"
          />
        </div>
      </div>
    </div>
  );
}

