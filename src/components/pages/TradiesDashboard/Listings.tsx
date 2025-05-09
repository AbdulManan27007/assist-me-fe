"use client";
import { Listing } from "./Listing";
import { Typography } from "@/components/core/Typography";
import { useGlobalContext, UserRole } from "@/globalContext/globalContext";
import { Messages } from "./Messages";

export function Listings() {
  const messagesData = [
    {
      profileImage: "/images/profile.png",
      title: "Listing Title",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae elit a nisl auctor vulputate mollis",
      isLast: false
    },
    {
      profileImage: "/images/profile.png",
      title: "Listing Title",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae elit a nisl auctor vulputate mollis",
      isLast: false
    },
    {
      profileImage: "/images/profile.png",
      title: "Listing Title",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae elit a nisl auctor vulputate mollis",
      isLast: false
    },
    {
      profileImage: "/images/profile.png",
      title: "Listing Title",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae elit a nisl auctor vulputate mollis",
      isLast: false
    },
    {
      profileImage: "/images/profile.png",
      title: "Listing Title",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae elit a nisl auctor vulputate mollis",
      isLast: true
    }
  ];

  return (
    <div className="grid gap-6 content-start">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <Typography variant="24px/800/32.78px">Messages</Typography>
          <div className="bg-[#FF712533] rounded-[8px] px-3 py-[3px]">
            <Typography variant="16px/600/21.86px" className="text-accent">
              2
            </Typography>
          </div>
        </div>
        <Typography variant="16px/700/21.86px" className="text-[#FF7125]">
          View All
        </Typography>
      </div>
      <div className="grid gap-4 border border-[#0000001A] rounded-[12px] ">
        {messagesData.map((message, index) => (
          <Messages
            key={index}
            profileImage={message.profileImage}
            title={message.title}
            message={message.message}
            isLast={message.isLast}
          />
        ))}
      </div>
    </div>
  );
}
