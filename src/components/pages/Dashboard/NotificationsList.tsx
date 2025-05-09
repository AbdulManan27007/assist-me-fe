"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Notification } from "./Notification";
import { Typography } from "@/components/core/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export function NotificationsList({
  title = "Tradie Responses",
  viewAllButton = false,
  grayBgForQuantity = false,
}: {
  title?: string;
  viewAllButton?: boolean;
  grayBgForQuantity?: boolean;
}) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  const user = {
    notifications: [
      { id: 1, title: "New Bid on <Listing Title>", description: "A$50 bid from Jane Doe", date: "2h ago", read: false },
      { id: 2, title: "New Bid on <Listing Title>", description: "A$50 bid from Jane Doe", date: "2h ago", read: false },
      { id: 3, title: "New Bid on <Listing Title>", description: "A$50 bid from Jane Doe", date: "2h ago", read: false },
    ],
  };

  const notifications = user?.notifications || [];
  const unreadNotifications = notifications.filter((notification) => !notification.read);

  return (
    <div className="grid gap-6 content-start max-w-[741px] w-full">
      <div className="flex mob:flex-col mob:items-start mob:gap-3 justify-between items-center mb-4 max-w-[741px] w-full">
        <div className="flex flex-row gap-2">
        <Typography variant="24px/800/32.78px">{title}</Typography>
            <Typography variant="16px/600/21.86px" className="text-accent bg-[#FF712533] rounded-[8px] px-3 flex items-center">
            {unreadNotifications.length}
            </Typography>
            </div>

        <div className="flex space-x-2">
          <button ref={prevRef} className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition">
            <Image src="/images/arrow_back.svg" height={20} width={20} alt="Previous" />
          </button>
          <button ref={nextRef} className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition">
            <Image className="rotate-180" src="/images/arrow_back.svg" height={20} width={20} alt="Next" />
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          320: { slidesPerView: 1 }, // Single slide on small screens
          640: { slidesPerView: 1.5 }, // 1.5 slides on medium screens
          1024: { slidesPerView: 2 }, // 2 slides on larger screens
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && prevRef.current && nextRef.current) {
            const navigation = swiper.params.navigation as any; 
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        className=" max-w-[741px] w-full gap-2"
      >
        {unreadNotifications.map((notification) => (
          <SwiperSlide key={notification.id}>
            <Notification {...notification} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
