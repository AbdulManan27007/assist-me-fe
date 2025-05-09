"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { IUser, UserRole } from "@/globalContext/globalContext";
import { IoClose, IoSearch } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
interface BannerStep {
  title: string;
  icon: string;
  description: string;
}

interface Category {
  title: string;
  icon: string;
}

const categories = [
  { title: "Nearby Taxi", icon: "/catogory-icons/old.png" },
  { title: "Electrical", icon: "/catogory-icons/electrical.png" },
  { title: "Bathroom", icon: "/catogory-icons/Bathroom.png" },
  { title: "Painter", icon: "/catogory-icons/Painter.png" },
  { title: "Handyman", icon: "/catogory-icons/Handyman.png" },
  { title: "Car Hire", icon: "/catogory-icons/CarHire.png" },
  { title: "Cleaning", icon: "/catogory-icons/Cleaning.png" },
  { title: "Plumbing", icon: "/catogory-icons/Plumbing.png" },
  { title: "AC Service", icon: "/catogory-icons/Ac.png" },
  { title: "Interior", icon: "/catogory-icons/Interior.png" },
  { title: "Gardening", icon: "/catogory-icons/Interior.png" },
  { title: "Furniture", icon: "/catogory-icons/Interior.png" },
  { title: "Roofing", icon: "/catogory-icons/Interior.png" },
  { title: "Pest Control", icon: "/catogory-icons/Interior.png" },
  { title: "Pest Control", icon: "/catogory-icons/Interior.png" },
  { title: "Pest Control", icon: "/catogory-icons/Interior.png" },
  { title: "Pest Control", icon: "/catogory-icons/Interior.png" },
  { title: "Pest Control", icon: "/catogory-icons/Interior.png" },

];

const Banner = () => {
  const router = useRouter(); 

  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter categories based on search term
  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const persistedUserData = localStorage.getItem("global-store");
    const parsedUser = persistedUserData ? JSON.parse(persistedUserData) : null;

    if (parsedUser?.state?.user) {
      const storedUser = parsedUser.state.user;
      setUser(storedUser);
      setUserRole(storedUser.role || null);
    } else {
      setUser(null);
      setUserRole(null);
    }

    setLoading(false);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCategoryClick = (category: string) => {
    console.log(`Selected category: ${category}`);
    router.push(`/category-details?category=${encodeURIComponent(category)}`)
    closeModal();
  };

  return (
    <div className="flex flex-col justify-center lg:flex-row pb-8 sm:pb-12 lg:pb-[104.5px] px-4 sm:px-6 xl:px-0 h-[680px] sm:h-[720px] md:h-[650px] lg:h-[630px] xl:h-screen">
      {/* Content Section */}
      <div className="w-full lg:w-1/2 lg:ml-[102px] order-1 lg:order-2">
        {/* Heading */}
        <div className="pt-6 sm:pt-8 lg:pt-[54.5px] text-center">
          <h3 className="text-3xl sm:text-4xl lg:text-[56px] lg:leading-[67.2px] font-bold text-[#FF7125] leading-tight">
            Assist Me In <span className="font-bold text-white"> Finding</span>
          </h3>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="flex items-center bg-white bg-opacity-45 border border-white border-opacity-30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 gap-2 w-full max-w-[739px] focus-within:ring-2 focus-within:ring-[#FF7125] transition-all duration-300">
            <IoSearch 
              className="h-5 w-5 sm:h-6 sm:w-6 text-[#625B71] flex-shrink-0"
            />

            <input
              type="text"
              placeholder="Search for service..."
              className="flex-grow bg-transparent text-white placeholder-white placeholder-opacity-60 outline-none text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-white opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Clear search"
              >
                <IoClose className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="grid grid-cols-2 mt-8 sm:mt-12 lg:mt-[27px] w-full sm:flex-row gap-3 sm:gap-4">
            <Button variant={"secondary"} className="px-4 sm:px-[89px] py-4 rounded-lg"
              onClick={openModal} 
            >
              Search Service Provider
            </Button>
            <Button className="bg-[#FF7125] text-white px-4 sm:px-[89px] py-4 rounded-lg">
              Generate Ad
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL with Scrollable Cards */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-[746px] w-full mx-4">
            {/* Close Button */}
            <button
              className="absolute -top-3 -right-3 p-2 rounded-full bg-[#FF7125] text-white hover:ring-4 hover:ring-[#b86437] transition-all duration-300"
              onClick={closeModal}
            >
              <IoClose />
            </button>

            {/* Modal Header with Search */}
            <h2 className="text-center text-[#FF7125] font-bold text-[36px] mb-4">
              Select Your Category
            </h2>
            
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 mb-6 mx-auto max-w-md">
              <IoSearch className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search categories..."
                className="flex-grow bg-transparent outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoClose className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="relative">
              
              {/* Scrollable container */}
              <div 
                ref={scrollContainerRef}
                className="flex flex-wrap justify-center overflow-x-auto pb-4 px-2 mx-4 scrollbar-hide"
                style={{ 
                  scrollbarWidth: 'none',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, index) => (
                    <div
                    key={index}
                    onClick={() => handleCategoryClick(cat.title)}
                    className="flex flex-col items-center text-[#868686] text-[14px] border-[1px] border-[#FF7125] justify-center p-3 m-2 rounded-lg cursor-pointer hover:bg-[#FF7125] hover:text-white transition-all min-w-[120px] group"
                  >
                    <img
                      src={cat.icon}
                      alt={cat.title}
                      className="size-[45px] mb-2 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                    />
                    <span className="text-sm font-medium text-center">
                      {cat.title}
                    </span>
                  </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    No categories found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>

            {/* Continue Button */}
            <div className="mt-6 flex justify-center">
              <Button className="bg-[#FF7125] text-white px-[89px] py-4 rounded-lg">
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;