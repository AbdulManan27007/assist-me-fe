import React from "react";
import { Typography } from "@/components/core/Typography";
import { Button } from "../../ui/button";
import Link from "next/link";
const pastProjects = [
  { title: "Listing Title 1", price: "A$50", name: "Jane Doe", card: "Card 1234" },
  { title: "Listing Title 2", price: "A$75", name: "John Smith", card: "Card 5678" },
  { title: "Listing Title 3", price: "A$60", name: "Alice Brown", card: "Card 9101" },
];

const EarningsOverview = () => {
  return (
    <div className=" ">
      {/* <Typography variant="24px/800/32.78px">Earnings Overview</Typography> */}
      {/* <div className="flex flex-row justify-between py-[24px]">
        <div>
          <Typography variant="14px/400/21px">Total earnings to date</Typography>
          <Typography variant="24px/800/32.78px">A$300</Typography>
        </div>
        <div>
          <Typography variant="14px/400/21px">Upcoming Payments</Typography>
          <Typography variant="24px/800/32.78px">A$100</Typography>
        </div>
      </div> */}
      <Typography variant="24px/800/32.78px">Past Projects</Typography>
      <div className="grid gap-4 border border-[#0000001A] rounded-[12px] mt-6">
        {pastProjects.map((project, index) => (
          <div key={index} className="flex flex-col p-[24px_16px_24px_16px]  border-[#0000001A]">
            <div className="flex flex-row justify-between">
              <Typography variant="16px/700/21.86px">{project.title}</Typography>
              <Typography variant="16px/700/21.86px">{project.price}</Typography>
            </div>
            <div className="flex flex-row justify-between space-y-[54px]">
              <div className="space-y-1">
                <Typography variant="14px/400/21px">{project.name}</Typography>
                <Typography variant="14px/400/21px">{project.card}</Typography>
              </div>
              <Link href="/review-submission">
              <Button className="rounded-[4px]">Give a Rating</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsOverview;
