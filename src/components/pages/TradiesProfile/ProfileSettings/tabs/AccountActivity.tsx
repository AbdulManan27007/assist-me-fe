"use client";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/core/Typography";

export function AccountActivity() {
  const activities = [
    { name: "Login on Chrome", date: "01.01.2024 09:00:00" },
    { name: "New Listing Posted", date: "01.01.2024 09:00:00" },
    { name: "Login on Chrome", date: "01.01.2024 09:00:00" },
  ];

  return (
    <div className="border border-gray-200 rounded-lg mob:p-3 p-6 shadow-sm bg-white">
      <Typography variant="32px/700/43.71px" className="text-black-3 mb-4">
        Account Activity
      </Typography>
      <div className="grid gap-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="grid grid-cols-3 mob:flex mob:flex-col mob:items-start mob:gap-1"
          >
            <Typography variant="14px/400/21px" className="text-black-3 text-base">
              {activity.name}
            </Typography>
            <Typography variant="14px/400/21px" className="text-black-3 text-sm">
              {activity.date}
            </Typography>
            <Button size="ghost" variant="ghost" className="sm:mt-1 mob:flex ">
              <Typography className="text-black-1 font-semibold text-sm">
                Report Suspicious Activity
              </Typography>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
