"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Typography } from "@/components/core/Typography";
import { Button } from "@/components/ui/button";
import { GetUser } from "@/store/type";
import { Divider } from "../core/Divider";
import { LocationIcon, MemberCalendarIcon, StarIcon } from "@/icons";
import { OrdersStats } from "../pages/Profile/OrdersStats";
import { ListingsStats } from "../pages/Profile/ListingsStats";
import Image from "next/image";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GetUser | null;
}

export function UserProfileViewModal({ isOpen, onClose, user }: UserModalProps) {
  const formatJoinDate = (createdAt: Date) => {
    const date = new Date(createdAt);
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 content-start">
          <div className="flex items-center gap-4 p-4 rounded-lg w-fit">
                <Image
                  priority
                  src={user.picture && user.picture.startsWith("http") 
                    ? user.picture : "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"}
                  alt="avatar"
                  width={104}
                  height={104}
                  className="rounded-full w-[104px] h-[104px]"
                />
          
                <div className="grid gap-2">
                  <div className="flex flex-col items-center">
                    <Typography variant="14px/500/19.12px" className="text-black-4">
                      {user.tag}
                    </Typography>
                    <Typography variant="24px/800/32.78px" className="text-black-1">
                      {user.name} 
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2 rounded-full py-1.5 px-3 w-fit">
                      <StarIcon />
                      <Typography variant="14px/400/21px" className="text-black-2">
                        {user.ratings}
                      </Typography>
                    </div>
                </div>
              </div>
          <Divider />
          {user.role === "tradie" && <div className="grid grid-cols-2">
              <div className="grid gap-1">
              <Typography variant="14px/400/21px" className="text-black-5">
                Orders In Progress
              </Typography>
              <Typography variant="24px/800/32.78px" className="text-black-3">
                {user.tradie_pending_jobs || 0}
              </Typography>
            </div>
            <div className="grid gap-1">
            <Typography variant="14px/400/21px" className="text-black-5">
              Completed Orders
            </Typography>
            <Typography variant="24px/800/32.78px" className="text-black-3">
              {user.tradie_completed_jobs || 0}
            </Typography>
          </div>
        </div>
          }

          {user.role === "household" && <div className="grid grid-cols-2">
            <div className="grid gap-1">
              <Typography variant="14px/400/21px" className="text-black-5">
                Orders In Progress
              </Typography>
              <Typography variant="24px/800/32.78px" className="text-black-3">
                {user.household_pending_tasks || 0}
              </Typography>
            </div>
            <div className="grid gap-1">
            <Typography variant="14px/400/21px" className="text-black-5">
              Completed Orders
            </Typography>
            <Typography variant="24px/800/32.78px" className="text-black-3">
              {user.household_completed_tasks || 0}
            </Typography>
          </div>
          </div>
          }
          <Divider />
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <LocationIcon className="fill-black-4" />
              <Typography variant="14px/400/21px" className="text-black-4">
                From {user.address}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <MemberCalendarIcon className="fill-black-4" />
              <Typography variant="14px/400/21px" className="text-black-4">
                Member since {formatJoinDate(user.created_at)}
              </Typography>
            </div>
          </div>
          {/* <Divider />
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/profile/edit">
              <Button variant="secondary" className="w-full sm:w-auto">
                Edit Profile
              </Button>
            </Link>
            <Link href="/profile/profileSettings">
              <Typography
                variant="16px/700/21.86px"
                className="text-black-1 sm:text-center w-full sm:w-auto rounded-full sm:border-none border  p-3 text-center"
              >
                Settings
              </Typography>
            </Link>
          </div> */}
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
