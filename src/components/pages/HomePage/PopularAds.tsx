"use client";
import { FreeMode, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

const FeaturedServices = () => {
  const services = [
    {
      title: "Furniture Assembly",
      description:
        "Professional furniture assembly service for all your home needs",
      image: "/images/Furniture_Assembly.jpeg",
    },
    {
      title: "Hang Pictures",
      description:
        "Expert picture hanging service with precise leveling and secure mounting",
      image: "/images/Hang_Pictures.jpeg",
    },
    {
      title: "Mount TV",
      description: "Professional TV mounting service with cable management",
      image: "/images/Mount_TV.jpeg",
    },
    {
      title: "Help Moving",
      description:
        "Reliable moving assistance for a stress-free relocation experience",
      image: "/images/Help_Moving.jpeg",
    },
    {
      title: "Home Staging",
      description:
        "Professional home staging to showcase your property at its best",
      image: "/images/1.jpeg",
    },
    {
      title: "Painting Service",
      description: "Quality painting services for interior and exterior walls",
      image: "/images/2.jpeg",
    },
    {
      title: "Garden Maintenance",
      description:
        "Complete garden care services to keep your outdoor spaces beautiful",
      image: "/images/3.jpeg",
    },
    {
      title: "Handyman Services",
      description: "General handyman services for all your home repair needs",
      image: "/images/4.jpeg",
    },
    {
      title: "Apartment Moving",
      description:
        "Specialized moving services for apartments and small spaces",
      image: "/images/dolly-apartment-move-tile.jpeg",
    },
    {
      title: "Home Cleaning",
      description:
        "Thorough home cleaning services for a spotless living environment",
      image: "/images/Home_Apartment_Cleaning.jpeg",
    },
    {
      title: "Plumbing Help",
      description:
        "Professional plumbing services for repairs and installations",
      image: "/images/Plumbing_Help.jpeg",
    },
    {
      title: "Electrical Help",
      description:
        "Licensed electrical services for safe and reliable electrical work",
      image: "/images/Electrical_Help.jpeg",
    },
    {
      title: "Carpentry Services",
      description: "Custom carpentry and woodworking services for your home",
      image: "/images/5.jpeg",
    },
    {
      title: "Window Cleaning",
      description: "Professional window cleaning for crystal clear views",
      image: "/images/6.jpeg",
    },
    {
      title: "Pest Control",
      description: "Effective pest control services to keep your home bug-free",
      image: "/images/7.jpeg",
    },
    {
      title: "Home Security",
      description: "Home security installation and monitoring services",
      image: "/images/8.jpeg",
    },
    {
      image: "/images/image-01.jpg",
    },
    {
      image: "/images/image-02.jpg",
    },
    {
      image: "/images/image-03.jpg",
    },
    {
      image: "/images/image-04.jpg",
    },
    {
      image: "/images/image-05.jpg",
    },
    {
      image: "/images/image-07.jpg",
    },
    {
      image: "/images/image-06.jpg",
    },
    {
      image: '/images/image-08.jpg',
    },
  ];

  // Configure slider options for continuous movement
  const swiperOptions = {
    modules: [FreeMode, Autoplay],
    slidesPerView: "auto" as const,
    spaceBetween: 16,
    loop: true,
    loopAdditionalSlides: 8,
    grabCursor: true,
    freeMode: {
      enabled: true,
      sticky: false,
    },
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: false, // First row moves left-to-right
    },
    speed: 6000, // Slow, smooth scroll
  };

  return (
    <div className="mt-16 sm:mt-20 mb-16">
      <div className="max-w-[1512px] w-full mx-auto px-4 sm:px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-8 sm:mb-12">
          Featured Services <span className="font-semibold">Providers</span>
        </h2>

        <div className="flex flex-col gap-6">
          {/* First row - moving left to right */}
          <Swiper {...swiperOptions} className="w-full">
            {services.map((service, index) => (
              <SwiperSlide
                key={`row1-${index}`}
                className="!w-[240px] sm:!w-[260px] lg:!w-[280px]"
              >
                <div className="bg-[#F5F7F6] rounded-xl overflow-hidden shadow-md h-full transition-transform hover:scale-[1.02]">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-36 sm:h-40 lg:h-44 object-cover border-[2px] border-[#FF5A05] rounded-xl"
                    />
                  </div>
                  {/* <div className="p-3 sm:p-4 flex flex-col gap-1">
                    <h4 className="font-medium text-[#1E1E1E] text-sm lg:text-base">
                      {service.title}
                    </h4>
                    <p className="text-xs text-[#2b2b2b] line-clamp-2">
                      {service.description}
                    </p>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Second row - moving right to left */}
          <Swiper
            {...swiperOptions}
            autoplay={{
              ...swiperOptions.autoplay,
              reverseDirection: true, // Second row moves right-to-left
            }}
            className="w-full"
          >
            {/* Reverse the services array to create visual variety */}
            {[...services].reverse().map((service, index) => (
              <SwiperSlide
                key={`row2-${index}`}
                className="!w-[240px] sm:!w-[260px] lg:!w-[280px]"
              >
                <div className="bg-[#F5F7F6] rounded-xl overflow-hidden shadow-md h-full transition-transform hover:scale-[1.02]">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-36 sm:h-40 lg:h-44 object-cover border-[2px] border-[#FF5A05] rounded-xl"
                    />
                  </div>
                  {/* <div className="p-3 sm:p-4 flex flex-col gap-1">
                    <h4 className="font-medium text-[#1E1E1E] text-sm lg:text-base">
                      {service.title}
                    </h4>
                    <p className="text-xs text-[#2b2b2b] line-clamp-2">
                      {service.description}
                    </p>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
