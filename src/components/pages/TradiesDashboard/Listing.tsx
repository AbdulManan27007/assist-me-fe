import Image from "next/image";
import { daysAgo, formatDate } from "@/lib/utils";
import { IUser } from "@/globalContext/globalContext";
import { Typography } from "@/components/core/Typography";
import { CalendarIcon, HourGlassIcon, MoreIcon } from "@/icons";
import Badge from "../../ui/Badge";
// Mock data for the listing
const mockListing = {
  title: "<Listing Title>",
  category: "Accounting",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis. In interdum mauris et urna maximus, sed tincidunt nulla porta. Maecenas congue risus enim. Quisque egestas augue sem, nec egestas leo mattis ut. Phasellus non sem eu massa finibus volutpat. Vestibulum condimentum augue odio, in dapibus erat vehicula ut. Praesent ac massa at urna dignissim iaculis egestas ut felis. Nullam pharetra, lorem non congue fringilla, nisl ex ullamcorper nibh, nec vehicula nulla libero id dui. Pellentesque bibendum pulvinar tempor. Fusce sodales tincidunt ex, non aliquet arcu consectetur posuere. Mauris suscipit auctor tempor. Phasellus a finibus felis, vel porta nibh. Ut laoreet purus sed enim feugiat, non bibendum nunc semper. Cras aliquam velit in tincidunt pulvinar. Morbi vitae dictum nibh. Sed viverra nunc sit amet libero tincidunt euismod.",
  price: 150,
  images: [
    "/images/document.png",
    "/images/document.png",
    "/images/document.png",
  ],
  priceType: "Fixed Price",
  start_date: new Date(),
  end_date: new Date(new Date().setDate(new Date().getDate() + 10)),
  hiredTradie: {
    avatar: "/images/profile.png",
    name: "John Doe",
    tag: "@John Doe",
  },
  location: "Sydney, Australia",
  nextTask: {
    title: "Start Painting",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
  },
};

export function Listing({
  title,
  category,
  description,
  price,
  images,
  priceType,
  start_date,
  end_date,
  hiredTradie,
  location,
  nextTask,
}: Partial<IUser["listings"][number]>) {
  // Using mock data for now
  const listing = mockListing;

  return (
    <div>
      <div className="flex items-center justify-start gap-3 pb-6">
        <Typography variant="24px/800/32.78px">My Bids</Typography>
        <div className="bg-[#FF712533] rounded-[8px] px-3 py-[3px]">
          <Typography variant="16px/600/21.86px" className="text-accent">
            2
          </Typography>
        </div>
      </div>
      <div className="grid gap-4 border border-[#0000001A] rounded-[12px_12px_0_0] p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="w-fit">
              <Badge color="green">Active</Badge>
            </span>
            <Typography variant="24px/800/32.78px">{listing.title}</Typography>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Typography variant="16px/600/21.86px" className="text-black-5">
                {listing.location}
              </Typography>
              <div className="h-1 w-1 rounded-full bg-black-5" />
              <Typography variant="16px/600/21.86px" className="text-black-5">
                {daysAgo(listing.start_date.toISOString())} days ago
              </Typography>
            </div>
            <MoreIcon />
          </div>
        </div>
        <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
          <Typography variant="14px/400/21px" className="text-black-5">
            {listing.category}
          </Typography>
        </div>
        <Typography
          variant="16px/400/24px"
          className="text-black-5 truncate-lines-3"
        >
          {listing.description}
        </Typography>
        <div className="grid gap-3">
          <Typography variant="18px/700/24.59px" className="text-black-4">
            Uploaded media
          </Typography>
          {listing.images && (
            <div className="flex gap-2">
              {listing.images.map((image, index) => (
                <Image
                  priority
                  key={index}
                  src={image}
                  alt={`uploaded media ${index}`}
                  width={80}
                  height={80}
                  className="rounded-[12px]"
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-6">
          {listing.price && listing.priceType && (
            <div className="flex flex-1 items-end gap-2">
              <Typography variant="24px/800/32.78px">
                A$ {listing.price}
              </Typography>
              <Typography variant="16px/400/21.86px" className="text-black-5">
                {listing.priceType}
              </Typography>
            </div>
          )}
          {/* {listing.end_date && (
            <div className="flex items-center gap-1.5">
              <HourGlassIcon />
              <Typography variant="16px/700/21.86px" className="text-black-4">
                {(() => {
                  const daysLeft = daysAgo(listing.end_date.toISOString());
                  if (daysLeft > 6) {
                    const weeks = Math.floor(daysLeft / 7);
                    return `Ends in ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
                  } else {
                    return `Ends in ${daysLeft} ${
                      daysLeft === 1 ? "day" : "days"
                    }`;
                  }
                })()}
              </Typography>
            </div>
          )} */}
          {listing.end_date && (
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <Typography variant="16px/700/21.86px" className="text-black-4">
                {formatDate(listing.start_date.toISOString(), "short")} -{" "}
                {formatDate(listing.end_date.toISOString(), "short")}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {(listing.hiredTradie || listing.nextTask) && (
        <div className="border border-t-0 border-[#0000001A] rounded-[0_0_12px_12px] p-6">
          <div className="grid grid-cols-2 items-start">
            {listing.hiredTradie && (
              <div className="grid gap-3">
                <Typography variant="14px/500/19.12px" className="text-black-5">
                  Client
                </Typography>
                <div className="flex items-center gap-3">
                  <img
                    src={listing.hiredTradie.avatar}
                    alt={listing.hiredTradie.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <Typography
                      variant="14px/500/19.12px"
                      className="text-black-4"
                    >
                      {listing.hiredTradie.tag}
                    </Typography>
                    <Typography
                      variant="18px/600/24.59px"
                      className="text-black-2"
                    >
                      {listing.hiredTradie.name}
                    </Typography>
                  </div>
                </div>
              </div>
            )}
            {/* {listing.nextTask && (
              <div className="grid gap-3">
                <Typography variant="16px/700/21.86px" className="text-black-5">
                  Next Task
                </Typography>
                <div>
                  <Typography
                    variant="18px/600/24.59px"
                    className="text-black-2"
                  >
                    {listing.nextTask.title}
                  </Typography>
                  <Typography
                    variant="14px/500/19.12px"
                    className="text-black-4"
                  >
                    {formatDate(listing.nextTask.date.toISOString(), "shortWithTime")}
                  </Typography>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
