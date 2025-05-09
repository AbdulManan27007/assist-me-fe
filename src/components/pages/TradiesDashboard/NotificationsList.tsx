"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Notification } from "./Notification";
import { Typography } from "@/components/core/Typography";
import { useGlobalContext } from "@/globalContext/globalContext";

// Mock data for notifications
const mockNotifications = [
  { id: 1, title: "Profile Update", description: "Your profile has been updated", date: "2023-10-01", read: false },
  { id: 2, title: "New Message", description: "You have a new message", date: "2023-10-02", read: true },
  { id: 3, title: "New Task", description: "A new task has been assigned", date: "2023-10-03", read: false },
  { id: 4, title: "Payment Successful", description: "Your payment was successful", date: "2023-10-04", read: true },
];

export function NotificationsList({
  title = "New Notifications",
  viewAllButton = false,
  grayBgForQuantity = false,
}: {
  title?: string;
  viewAllButton?: boolean;
  grayBgForQuantity?: boolean;
}) {
  // Using mock data instead of user context for now
  const notifications = mockNotifications; // Replace this with the context when real data is available
  
  const unreadNotifications = notifications?.filter(
    (notification) => !notification.read
  );

  return (
    <div className="grid gap-6 content-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Typography variant="24px/800/32.78px">{title}</Typography>
          <div
            className={cn(
              "bg-[#FF712533] rounded-[8px] px-3 py-[3px]",
              grayBgForQuantity && "bg-white-2"
            )}
          >
            <Typography
              variant="16px/600/21.86px"
              className={cn("text-accent", grayBgForQuantity && "text-black-5")}
            >
              {unreadNotifications?.length}
            </Typography>
          </div>
        </div>
        {viewAllButton && (
          <Link href="/notifications">
            <Typography className="text-accent" variant="16px/700/21.86px">
              View All
            </Typography>
          </Link>
        )}
      </div>
      <div className="grid gap-4">
        {unreadNotifications?.map((notification, index) => (
          <Notification key={index} {...notification} />
        ))}
      </div>
    </div>
  );
}
