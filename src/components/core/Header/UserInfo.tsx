"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Toast from "@/components/ui/toast";
import { Divider } from "../Divider";
import { Typography } from "../Typography";
import { Button } from "@/components/ui/button";
import {
  IUser,
  useGlobalContext,
  UserRole,
} from "@/globalContext/globalContext";
import { useGetUserQuery } from "@/store/users/userdataApi";
import { CircularProgress } from "@mui/material";

export function UserInfo() {
  const { user, changeRole, setUser } = useGlobalContext();
  const [localUser, setLocalUser] = useState<IUser | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("/profile-avatar.png");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const userId = user?.id || "";
  const router = useRouter();

  const { data: userData } = useGetUserQuery(userId, { skip: !userId });

  useEffect(() => {
    const persistedUserData = localStorage.getItem("global-store");
    const parsedUser = persistedUserData ? JSON.parse(persistedUserData) : null;
    if (parsedUser?.state?.user) {
      const storedUser = parsedUser.state.user;
      setLocalUser(storedUser);
      if (!user) setUser(storedUser);
    } else {
      setLocalUser(null);
      setUser(null);
    }
  }, [user, setUser]);

  function getCookieValue(name: string): string | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  function generateLetterAvatar(
    letter: string,
    bgColor = "#512DA8",
    textColor = "#FFFFFF"
  ) {
    const svg = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}" />
        <text x="50%" y="50%" font-size="50" fill="${textColor}" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif">${letter}</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  useEffect(() => {
    const email = getCookieValue("email") || "";
    const firstLetter = email ? email.charAt(0).toUpperCase() : "?";

    if (userData?.picture) {
      setIsImageLoading(true);
      const img = new Image();
      img.src = userData.picture;
      img.onload = () => {
        setImageSrc(userData.picture);
        setIsImageLoading(false);
      };
      img.onerror = () => {
        setImageSrc(generateLetterAvatar(firstLetter)); // fallback to letter avatar
        setIsImageLoading(false);
      };
    } else {
      setImageSrc(generateLetterAvatar(firstLetter));
      setIsImageLoading(false);
    }
  }, [userData?.picture]);

  const logoutHandler = () => {
    ["accessToken", "email", "id", "is_verified"].forEach((cookie) => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    localStorage.clear();
    setUser(null);
    router.push("/");
  };

  const profilePath =
    localUser?.role === UserRole.Tradie ? "/tradies-profile" : "/profile";

  const links = [
    { label: "My Profile", href: profilePath },
    { label: "Settings", href: `${profilePath}/settings` },
    { label: "Support", href: "/contact-support" },
    // { label: "Payment", href: "/tradies-payment" },
  ];

  return (
    <div className="border-2 border-white-2 rounded-full sm:h-12 sm:w-12 overflow-hidden w-[40px] h-[40px]">
      <Popover>
        <PopoverTrigger>
          {/* <img
            src={
              userData?.picture ? userData?.picture :
              "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            }
            onError={(e) => {
              e.currentTarget.src =
                "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp";
            }}
            alt="user avatar"
            className="w-[44px] h-[44px] object-center"
          /> */}
          {isImageLoading ? (
            <CircularProgress
              size={24}
              className="flex items-center"
              style={{ color: "#FF7125" }}
            />
          ) : (
            <img
              src={imageSrc}
              alt="user avatar"
              className="w-[44px] h-[44px] object-cover"
            />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-[300px]" align="end">
          <div className="grid gap-8">
            {links.map(({ label, href }) => (
              <Link key={label} href={href}>
                <Typography variant="18px/700/24.59px" className="text-black-1">
                  {label}
                </Typography>
              </Link>
            ))}
            {/* <Button
              onClick={() => changeRole(localUser?.role === UserRole.Tradie ? UserRole.Household : UserRole.Tradie)}
              className="w-full"
              variant="secondary"
            >
              {localUser?.role === UserRole.Tradie ? "Switch to Household" : "Switch to Tradie"}
            </Button> */}
            <Divider />
            <Typography
              variant="18px/700/24.59px"
              className="text-black-1 cursor-pointer"
              onClick={logoutHandler}
            >
              Log out
            </Typography>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
