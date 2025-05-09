"use client";
import { Task } from "./Task";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { ListingsStats } from "../Profile/ListingsStats";
import { Calendar } from "@/components/ui/calendar-custom-tradies";
import { Divider } from "@/components/core/Divider";
import { Typography } from "@/components/core/Typography";
import { LocationIcon, ApartmentIcon, RealEstateAgentIcon } from "@/icons";

// Mock data for testing
const mockUserData = {
  name: "Jane",
  city: "New York",
  type: "Apartment",
  status: "Active",
  messages: [{}, {}, {}], // Simulating 3 messages
  role: "Household", // Or "Tradie" depending on the test case
};

const mockHouseholdData = {
  listings: [
    {
      completed: false,
      tasks: [{ name: "Task 1", description: "Task 1 description" }],
    },
    {
      completed: true,
      tasks: [{ name: "Task 2", description: "Task 2 description" }],
    },
  ],
};

const mockTradieData = {
  categoriesHired: ["Plumbing", "Electrical"],
};

export function Welcome() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Using mock data instead of useGlobalContext
  const userData = mockUserData;
  const householdData = mockHouseholdData;
  const tradieData = mockTradieData;

  if (
    !userData ||
    (userData?.role === "Tradie" && !tradieData) ||
    (userData?.role === "Household" && !householdData)
  )
    return null;

  const { name, city, type, status, messages } = userData;

  return (
    <>
      <div className="bg-black-1  text-center py-[32px]">
        <Typography variant="32px/700/43.71px" className="text-white-1 ">
          Welcome back, <span className="text-accent">{name}</span>
        </Typography>
      </div>
      <div className="max-w-[1200px] mx-auto grid gap-8 py-12  mob:py-8 mob:px-6">
        <div className="flex justify-between gap-6 mob:grid mob:justify-start ">
          <div className="flex gap-3">
            <Typography variant="24px/800/32.78px" className="text-black-2">
              Upcoming Jobs
            </Typography>
            <p className="bg-[#FF712533] rounded-[8px]  px-3 content-center ">
              <Typography variant="16px/700/21.86px" className="text-[#FF7125]">
                3
              </Typography>
            </p>
          </div>
          <Typography variant="16px/600/21.86px" className="text-[#FF7125]">
            Update Availability
          </Typography>
        </div>
        <div className="grid grid-cols-12 justify-between gap-16 mob:grid-cols-1  ">
          <div className="grid grid-cols-[1.5fr,_1fr] col-span-8 mob:grid-cols-1 mob:col-span-full rounded-[12px] overflow-hidden border border-[#00000033]">
            {/* Left Side - Calendar */}
            {/* <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full h-full p-0"
            /> */}

            {/* Right Side - Tasks */}
            <div className="bg-[#FFFFFF0D] p-6 border-l border-[#00000033] grid gap-6 content-start w-full">
              <div className="grid gap-3">
                {householdData?.listings
                  ?.map(({ tasks }) => tasks)
                  .flat()
                  ?.map((task, index) => (
                    <div key={index}>
                      <Task {...task} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
