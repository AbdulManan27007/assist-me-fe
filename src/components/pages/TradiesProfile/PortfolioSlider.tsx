import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography } from "@/components/core/Typography";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export const PortfolioSlider = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  return (
    <div className="w-full max-w-[741px] mob:max-w-[325px] mx-auto  md:px-0">
      {/* Title and Navigation */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="24px/800/32.78px">Portfolio</Typography>
        <div className="flex space-x-2">
          <button
            ref={prevRef}
            className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
            onClick={() => swiperInstance?.slidePrev()}
          >
            <Image src="/images/arrow_back.svg" height={20} width={20} alt="Previous" />
          </button>
          <button
            ref={nextRef}
            className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
            onClick={() => swiperInstance?.slideNext()}
          >
            <Image
              className="rotate-180"
              src="/images/arrow_back.svg"
              height={20}
              width={20}
              alt="Next"
            />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        slidesPerView={1}
        spaceBetween={8}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full" // Ensure the slider takes full width
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className=" rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/profile-slider.png"
                height={260}
                width={260}
                alt={`Portfolio item ${index + 1}`}
                className="rounded-lg w-full  h-auto" // Ensure images take full width
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};