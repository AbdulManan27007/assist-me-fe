"use client"
import Image from "next/image"; // Ensure Image component is imported for avatar
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, StarIcon, CrossIcon} from "@/icons";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component for consistency
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/core/Typography"; // Assuming you have a Typography component for styling
import {
  IUser,
  MOCK_LISTINGS,
  MOCK_TRADIES,
} from "@/globalContext/globalContext";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // Don't render the popup if not visible

  const listing = MOCK_LISTINGS[0]; // Assuming you have listing data
  const tradies = MOCK_TRADIES.slice(0, 3); // Assuming you have tradie data
  const [search, setSearch] = useState("");

  // Filter tradies based on the search input
  const filteredTradies = tradies.filter((tradie) =>
    tradie.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // This useEffect will now work because `tradies` is properly defined in the component
    const experienceElements = document.querySelectorAll(".tradie-experience");
    experienceElements.forEach((el) => {
      const element = el as HTMLDivElement;
      const height = element.scrollHeight;
      element.style.setProperty(
        "--truncate-height",
        `${Math.min(72, height)}px`
      );
      element.style.setProperty("--truncate-height-expanded", `${height}px`);
    });
  }, [tradies]);

  return (
    <div
      className=" fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-[600px] w-full z-50"
        onClick={(e) => e.stopPropagation()} // Prevent the close event from firing when clicking inside the popup
      >
        <div className="flex justify-between items-center mb-2">
          <Typography variant="32px/700/43.71px">
            Invite Tradies to Listing
          </Typography>
          <CrossIcon className="cursor-pointer" onClick={onClose} />
          {/* <Button >Close</Button> */}
        </div>
        <Typography variant="16px/400/24px" className="mb-8">
          You can invite additional tradies to bid on this listing.
        </Typography>
        <div className="w-[300px]">
          <Input
            value={search}
            className="!h-12"
            placeholder="Search tradies..."
            icon={<SearchIcon className="fill-black-1" />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mt-4 overflow-y-scroll">
          {filteredTradies.map((tradie) => (
            <div
              key={tradie.id}
              className="flex flex-row gap-3 mb-6 items-center"
            >
              <div>
                {" "}
                <Checkbox color="primary" />
              </div>
              <Image
                src={tradie.avatar || ""}
                alt={tradie.name || "avatar"}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="grid gap-1">
                <div className="flex flex-row gap-2">
                  <Typography variant="18px/600/24.59px">
                    {tradie.name}
                  </Typography>
                  <Typography variant="14px/500/19.12px">
                    @{tradie.tag}
                  </Typography>
                </div>
                <div className="flex items-center">
                  <StarIcon />
                  <Typography variant="14px/400/21px" className="text-black-2">
                    {tradie.tradieReviews?.length
                      ? (
                          tradie.tradieReviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                          ) / tradie.tradieReviews.length
                        ).toFixed(1)
                      : "N/A"}
                  </Typography>
                  <Typography
                    variant="14px/400/21px"
                    className="text-black-2 opacity-60"
                  >
                    ({tradie.tradieReviews?.length || 0})
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
        <Button
          onClick={() => {
            /* Handle invitation logic */
          }}
          className="mt-4"
        >
          Send Invite
        </Button>
        </div>
      </div>
    </div>
  );
};
