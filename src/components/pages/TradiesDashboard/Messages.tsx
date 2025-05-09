import Image from "next/image";
import { Typography } from "@/components/core/Typography";
import { Divider } from "@/components/core/Divider";

interface MessagesProps {
  profileImage: string;
  title: string;
  message: string;
  isLast?: boolean;
}

export function Messages({ profileImage, title, message, isLast = false }: MessagesProps) {
  return (
    <div>
        <div className="flex flex-row gap-3 py-6 px-4">
          <Image src={profileImage} height={48} width={48} alt="Profile" />
          <div>
            <Typography variant="16px/700/21.86px" className="text-black-2">
              {title}
            </Typography>
            <Typography variant="14px/400/21px" className="text-black-4 line-clamp-1">
              {message}
            </Typography>
          </div>
        </div>
        {!isLast && <Divider />}
    </div>
  );
}
