"use client";
import { Task } from "./Task";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { ListingsStats } from "../Profile/ListingsStats";
import { Calendar } from "@/components/ui/calendar-custom";
import { Divider } from "@/components/core/Divider";
import { Typography } from "@/components/core/Typography";
import { LocationIcon, ApartmentIcon, RealEstateAgentIcon } from "@/icons";

export function Welcome() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Dummy data
  const userData = {
    name: "John Doe",
    city: "New York",
    type: "Apartment Owner",
    status: "Active",
    role: "Household",
    messages: ["Message 1", "Message 2"],
  };

  const householdData = {
    listings: [
      { completed: false, tasks: [{ title: "Fix leaky faucet" }, { title: "Paint the fence" }] },
      { completed: true, tasks: [{ title: "Install new doorbell" }] },
    ],
  };

  const tradieData = {
    categoriesHired: ["Plumbing", "Painting"],
  };

  if (!userData) return null;

  return (
    <div className="bg-black-1 py-8 px-[120px] mob:py-8 mob:px-6 text-center">
      {/* <div className="max-w-[1200px] mx-auto grid gap-8"> */}
        {/* <div className="flex items-center justify-between gap-6 mob:grid mob:justify-start"> */}
          <Typography variant="32px/700/43.71px" className="text-white-1">
            Welcome back, <span className="text-accent">{userData.name}</span>
          </Typography>
          {/* <div className="flex items-center gap-4">
            <div className="flex gap-3 items-center bg-[#FFFFFF0D] py-3 px-6 rounded-[12px]">
              <Typography variant="32px/700/43.71px" className="text-white-1">
                {userData.messages.length}
              </Typography>
              <Typography variant="16px/600/21.86px" className="text-white-1">
                New Messages
              </Typography>
            </div>
            <div className="flex gap-3 items-center bg-[#FFFFFF0D] py-3 px-6 rounded-[12px]">
              <Typography variant="32px/700/43.71px" className="text-white-1">
                {householdData.listings.filter((listing) => !listing.completed).length}
              </Typography>
              <Typography variant="16px/600/21.86px" className="text-white-1">
                Open Listings
              </Typography>
            </div>
          </div> */}
        {/* </div> */}
        {/* <div className="grid grid-cols-12 justify-between gap-16 mob:grid-cols-1">
          <div className="grid gap-6 col-span-4 content-start mob:col-span-full">
            <UserCard />
            <ListingsStats />
            {tradieData.categoriesHired.length > 0 && (
              <>
                <Divider light />
                <div className="grid gap-1">
                  <Typography variant="14px/400/21px" className="text-white-3">
                    Categories hired
                  </Typography>
                  <Typography variant="18px/700/24.59px" className="text-white-3">
                    {tradieData.categoriesHired.join(", ")}
                  </Typography>
                </div>
              </>
            )}
            <Divider light />
            <div className="grid grid-cols-2 gap-[16px_12px] mob:grid-cols-1">
              <div className="flex items-center gap-2">
                <LocationIcon />
                <Typography variant="14px/400/21px" className="text-white-3">
                  From {userData.city}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <ApartmentIcon />
                <Typography variant="14px/400/21px" className="text-white-3">
                  {userData.type}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <RealEstateAgentIcon />
                <Typography variant="14px/400/21px" className="text-white-3">
                  {userData.status}
                </Typography>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1.33fr,_1fr] col-span-8 mob:grid-cols-1 mob:col-span-full rounded-[12px] overflow-hidden border border-[#FFFFFF26]">
            <Calendar mode="single" selected={date} onSelect={setDate} className="w-full h-full p-0" />
            <div className="bg-[#FFFFFF0D] p-6 border-l border-[#FFFFFF26] grid gap-6 content-start">
              <Typography variant="18px/700/24.59px" className="text-white-1">
                Next Task
              </Typography>
              <div className="grid gap-3">
                {householdData.listings
                  .map(({ tasks }) => tasks)
                  .flat()
                  .map((task, index) => (
                    <Task key={index} {...task} />
                  ))}
              </div>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
}