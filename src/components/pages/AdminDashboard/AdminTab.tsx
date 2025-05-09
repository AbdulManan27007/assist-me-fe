import { Typography } from "@/components/core/Typography";
import Link from "next/link";

interface AdminTabProps {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function AdminTab({ title, href, icon }: AdminTabProps) {
  return (
    <Link
      href={href}
      className="bg-accent rounded-[8px] py-6 px-8 relative h-[137px] hover:opacity-90 transition-opacity mob:h-[80px] grid mob:items-center"
    >
      <Typography
        className="text-white-1  mob:text-[18px] mob:leading-[24.59px]"
        variant="24px/800/32.78px"
      >
        {title}
      </Typography>
      <div className="absolute bottom-[-18px] right-[-18px] mob:bottom-[-26px] mob:right-[-12px] w-[128px] h-[128px] mob:w-[96px] mob:h-[96px] bg-[#FFFFFF4D] rounded-[18.8px] grid place-items-center rotate-[15deg] opacity-70">
        {icon}
      </div>
    </Link>
  );
}
