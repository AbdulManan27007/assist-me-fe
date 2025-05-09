"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Typography } from "@/components/core/Typography";
import { Button } from "@/components/ui/button";
import { SingleListing } from "@/store/adminDashboard/listingsApi";
import { Divider } from "../core/Divider";
import { LocationIcon, CalendarIcon } from "@/icons";
import Image from "next/image";

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  ad: SingleListing | null;
}

export function AdViewModal({ isOpen, onClose, ad }: AdModalProps) {

  // category: "Appliances"
  // completed: false
  // description: "status: 'open'"
  // end_date: "2025-01-31T19:00:00.000Z"
  // hired_tradie_id: null
  // household_name: "Umaid "
  // images: (3) ['https://golalo-media-content.s3.us-east-1.amazonaw…701b72c-5625-4eea-99dd-0df2a40f8f3e-Designer.jpeg', 'https://golalo-media-content.s3.us-east-1.amazonaw…candid-image-photography-with-natural__55840.jpeg', 'https://golalo-media-content.s3.us-east-1.amazonaw…d5fc0-3953-4572-94e2-a2aa1a6e368a-hotel-image.png']
  // location: "Brisbane"
  // price: "23.00"
  // price_type: null
  // start_date: "2025-01-29T19:00:00.000Z"
  // status: "open"
  // title: "test 121"
  // tradie_name: null
  // user_id: 113
  const formatDate = (createdAt: Date) => {
    const date = new Date(createdAt);
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
  };

  if (!ad) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Ad Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 content-start">
          <div className="flex flex-col items-center gap-4 p-4 rounded-lg">
            {Array.isArray(ad.images) ? (
              <div className="flex gap-2 overflow-x-auto w-full">
                {ad.images.map((img, index) => (
                  <Image
                    key={index}
                    priority
                    src={img}
                    alt={`ad-image-${index}`}
                    width={104}
                    height={104}
                    className="rounded-lg w-[104px] h-[104px]"
                  />
                ))}
              </div>
            ) : (
              <Image
                priority
                src={ad.images || "https://via.placeholder.com/104"}
                alt="ad-image"
                width={104}
                height={104}
                className="rounded-lg w-[104px] h-[104px]"
              />
            )}

            <Typography variant="24px/800/32.78px" className="text-black-1">
              {ad.title}
            </Typography>
          </div>
          <Divider />

          <Typography variant="14px/400/21px" className="text-black-5">
            {ad.description}
          </Typography>

          <Divider />

          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <LocationIcon className="fill-black-4" />
              <Typography variant="14px/400/21px" className="text-black-4">
                Location: {ad.location}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="fill-black-4" />
              <Typography variant="14px/400/21px" className="text-black-4">
                Posted on {formatDate(new Date(ad.start_date))}
              </Typography>

            </div>
            <Typography variant="16px/700/21.86px" className="text-black-3">
              Price: ${ad.price}
            </Typography>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
      
    // <Dialog open={isOpen} onOpenChange={onClose}>
    //   <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
    //     <DialogHeader>
    //       <DialogTitle>Ad Details</DialogTitle>
    //     </DialogHeader>

    //     <div className="grid gap-6">
    //       {/* Image Section */}
    //       {Array.isArray(ad.images) && ad.images.length > 0 ? (
    //         <div className="grid grid-cols-2 gap-2 p-2">
    //           {ad.images.map((img, index) => (
    //             <div key={index} className="relative w-full h-[120px]">
    //               <Image
    //                 priority
    //                 src={img}
    //                 alt={`ad-image-${index}`}
    //                 layout="fill"
    //                 objectFit="cover"
    //                 className="rounded-lg"
    //               />
    //             </div>
    //           ))}
    //         </div>
    //       ) : (
    //         <div className="relative w-full h-[160px]">
    //           <Image
    //             priority
    //             src="https://via.placeholder.com/300"
    //             alt="ad-placeholder"
    //             layout="fill"
    //             objectFit="cover"
    //             className="rounded-lg"
    //           />
    //         </div>
    //       )}

    //       {/* Ad Title */}
    //       <Typography variant="24px/800/32.78px" className="text-black-1 text-center">
    //         {ad.title}
    //       </Typography>

    //       <Divider />

    //       {/* Description */}
    //       <Typography variant="14px/400/21px" className="text-black-5 text-center">
    //         {ad.description}
    //       </Typography>

    //       <Divider />

    //       {/* Ad Details Grid */}
    //       <div className="grid grid-cols-2 gap-4 p-2">
    //         <div className="flex flex-col items-center">
    //           <LocationIcon className="fill-black-4 w-5 h-5" />
    //           <Typography variant="14px/500/19.12px" className="text-black-4 text-center">
    //             {ad.location}
    //           </Typography>
    //         </div>

    //         <div className="flex flex-col items-center">
    //           <CalendarIcon className="fill-black-4 w-5 h-5" />
    //           <Typography variant="14px/500/19.12px" className="text-black-4 text-center">
    //             {formatDate(ad.start_date)}
    //           </Typography>
    //         </div>

    //         <div className="col-span-2 flex flex-col items-center">
    //           <Typography variant="16px/700/21.86px" className="text-black-3">
    //             Price: ${ad.price}
    //           </Typography>
    //         </div>
    //       </div>

    //       <Divider />

    //       {/* Close Button */}
    //       <div className="flex justify-center">
    //         <Button variant="secondary" onClick={onClose}>
    //           Close
    //         </Button>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>
  );
}
