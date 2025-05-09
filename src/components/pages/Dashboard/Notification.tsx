"use client";

import { CrossIcon } from "@/icons";
import { Typography } from "../../core/Typography";
import { formatTimeAgo } from "@/lib/utils";
import { IUser, useGlobalContext } from "@/globalContext/globalContext";
import Image from "next/image";
export function Notification({
  id,
  title,
  description,
  date,
}: IUser["notifications"][number]) {
  const readNotification = useGlobalContext(
    ({ readNotification }) => readNotification
  );

  return (
    <div className="grid grid-flow-col justify-between items-center gap-6 p-6 bg-white-2 rounded-[12px] w-full mob:mx-auto max-w-[350px]">
      <div className="grid gap-3">
        <Typography variant="16px/700/21.86px" className="text-black-3">
          {title}
        </Typography>
        <Typography variant="14px/400/21px" className="text-black-3">
          {description}
        </Typography>
      </div>
      <div className="grid h-full content-between">
        <CrossIcon
          onClick={() => readNotification(id)}
          className="cursor-pointer"
        />
        <Typography variant="14px/400/21px" className="text-black-5">
          <Image src="/images/arrow_outward.svg" height={24} width={24} alt="arrow_outward"/>
        </Typography>
        
      </div>
    </div>
  );
}
