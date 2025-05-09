"use client";
import React, { useState } from "react";
import { Typography } from "@/components/core/Typography";
import { Switch } from "@/components/ui/switch";

const notificationSettings = [
  "New Bid Received",
  "Bid Status Update",
  "Message from Tradie",
  "Unread Message Reminder",
  "Job Scheduled Reminder",
  "Last-Minute Reminder",
  "Payment Processed",
  "Pending Payment Reminder",
  "Rate your Tradie",
  "Add profile details",
  "Faster response improves bids",
  "Review updated guidelines",
  "Feature Update",
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(
    notificationSettings.map(() => ({ email: false, push: false }))
  );

  const toggleNotification = (index: number, type: "email" | "push") => {
    setNotifications((prev) =>
      prev.map((notif, i) =>
        i === index ? { ...notif, [type]: !notif[type] } : notif
      )
    );
  };

  return (
    <div className="max-w-[677px] w-full p-8  ">
      <div className="grid gap-4">
        <div className="flex justify-between gap-4 items-center text-gray-500 font-medium">
          <span></span>
          <div className="flex gap-10 pr-3">
            <Typography variant="14px/400/19.12px" className="text-black-3">
              Email
            </Typography>
            <Typography variant="14px/400/19.12px" className="text-black-3">
              Push
            </Typography>
          </div>
        </div>
        {notificationSettings.map((label, index) => (
          <div
            key={index}
            className="  gap-4 items-center flex justify-between"
          >
            <Typography variant="16px/700/21.86px" className="text-black-3">
              {label}
            </Typography>
            <div className="flex gap-5">
              <Switch
                checked={notifications[index].email}
                onCheckedChange={() => toggleNotification(index, "email")}
              />
              <Switch
                checked={notifications[index].push}
                onCheckedChange={() => toggleNotification(index, "push")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
