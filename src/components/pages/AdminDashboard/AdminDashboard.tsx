"use client";
import { useState } from "react";
import { AdminTab } from "./AdminTab";
import { Statistics } from "./Statistics";
import { Typography } from "@/components/core/Typography";
import { AccountIcon, BusinessIcon, SupportIcon } from "@/icons";
import { NotificationsList } from "../Dashboard/NotificationsList";
import { Timeframe, timeframeOptions } from "@/components/core/Timeframe";

const adminTabs = [
  {
    title: "Manage Users",
    href: "/user-management",
    icon: <AccountIcon className="mob:w-16 mob:h-16" />,
  },
  {
    title: "Manage Listings",
    href: "/ad-management",
    icon: <BusinessIcon className="mob:w-16 mob:h-16" />,
  },
  {
    title: "Support Tickets",
    href: "/support-tickets",
    icon: <SupportIcon className="mob:w-16 mob:h-16" />,
  },
];

export function AdminDashboard() {
  const [timeframe, setTimeframe] = useState(timeframeOptions[0]);

  return (
    <div className="p-12 mob:px-6 mob:py-8">
      <div className="max-w-[1200px] mx-auto grid gap-12">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <Typography variant="24px/800/32.78px">Dashboard</Typography>
            <Timeframe timeframe={timeframe} setTimeframe={setTimeframe} />
          </div>
          <div className="grid grid-cols-3 gap-4 mob:grid-cols-1">
            {adminTabs.map((tab) => (
              <AdminTab key={tab.title} {...tab} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12 content-start mob:grid-cols-1">
          <NotificationsList
            viewAllButton
            grayBgForQuantity
            title="Ticket Updates"
          />
          <Statistics />
        </div>
      </div>
    </div>
  );
}
