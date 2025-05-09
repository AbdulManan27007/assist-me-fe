"use client";
import Link from "next/link";
import { Divider } from "../Divider";
import { UserInfo } from "./UserInfo";
import Toast from "@/components/ui/toast";
import { Typography } from "../Typography";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProtectedByRole } from "../ProtectedByRole";
import { useRouter } from "next/navigation"; // Import router for navigation
import {
  IUser,
  useGlobalContext,
  UserRole,
} from "@/globalContext/globalContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Logo,
  PlusIcon,
  ChatIcon,
  HearthIcon,
  SearchIcon,
  NotificationIcon,
  VisibilityIcon,
} from "@/icons";

export default function Header() {
  const router = useRouter(); // Initialize router
  const { user, setUser } = useGlobalContext();
  const [localUser, setLocalUser] = useState<IUser | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuModal, setMenuModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const pathName = usePathname();

  const isHomePage = pathName === "/";

  const logoColor = isHomePage
    ? {
        mobile: "#202125",
        desktop: "#ffffff",
      }
    : {
        mobile: "#202125",
        desktop: "#202125",
      };

  const links = [
    {
      name: "Dashboard",
      href:
        localUser?.role === UserRole.Tradie
          ? "/tradies-dashboard"
          : localUser?.role === UserRole.Admin
          ? "/admin-dashboard"
          : "/dashboard",
    },

    localUser?.role === UserRole.Household && {
      name: "My Listings",
      href: "/my-listings",
    },
    localUser?.role === UserRole.Tradie && {
      name: "My Workings",
      href: "/tradies-listing",
    },
    localUser?.role === UserRole.Admin && {
      name: "Support Tickets",
      href: "/support-tickets",
    },
    localUser?.role === UserRole.Admin && {
      name: "Manage Users",
      href: "/user-management",
    },
    localUser?.role === UserRole.Admin && {
      name: "Manage Listings",
      href: "/ad-management",
    },
    localUser?.role === UserRole.Admin && {
      name: "Analytics",
      href: "/analytics",
    },
  ];

  const navbarLinks = [
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "FAQ",
      href: "/faq",
    },
    {
      name: "Contact Us",
      href: "/contact-support",
    },
  ];

  const handleMobileMenu = () => {
    setMenuModal((prev) => !prev);
  };

  const handleServiceProviderClick = (e: any) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (accessToken) {
        router.push("/become-service-provider");
      } else {
        setErrorMessage("Please sign in to become a service provider");
        router.push("/sign-in");
      }
    }
  };

  const handleCreateServiceClick = (e: any) => {
    e.preventDefault();

    router.push("/new-service");
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000); // 3000ms = 3 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        document.body.style.overflow = "";
      } else if (menuModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (menuModal && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [menuModal]);

  useEffect(() => {
    if (isMounted) {
      const persistedUserData = localStorage.getItem("global-store");
      const parsedUser = persistedUserData
        ? JSON.parse(persistedUserData)
        : null;

      if (parsedUser?.state?.user) {
        const storedUser = parsedUser.state.user;
        setLocalUser(storedUser);

        if (!user) {
          setUser(storedUser);
        }
      } else {
        setLocalUser(null);
        setUser(null);
      }

      setLoading(false);
    }
  }, [user, isMounted]);

  if (!isMounted) {
    return (
      <header className="bg-white lg:bg-transparent">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto p-6 [@media(max-width:375px)]:p-4 lg:p-[26px_48px] top-0 z-20 lg:z-0 w-full py-[26px]">
          <div className="flex items-center gap-12 [@media(max-width:390px)]:gap-0">
            <Link href="/">
              <Logo
                className="block lg:hidden w-[76px] sm:w-[92px] h-[36px] sm:h-[44px]"
                fillColorSecondary={logoColor.mobile}
              />
              <Logo
                className="hidden lg:block"
                fillColorSecondary={logoColor.desktop}
              />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white lg:bg-transparent max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto p-6 [@media(max-width:375px)]:p-4 xl:p-[26px_0px] top-0 z-20 lg:z-0 w-full">
        <div className="flex items-center gap-12 [@media(max-width:390px)]:gap-0">
          <Link href="/">
            <Logo
              className="block lg:hidden w-[76px] sm:w-[92px] h-[36px] sm:h-[44px]"
              fillColorSecondary={logoColor.mobile}
            />
            <Logo
              className="hidden lg:block"
              fillColorSecondary={logoColor.desktop}
            />
          </Link>

          {localUser && (
            <div className="flex items-center gap-4">
              {/* For Large Screens */}
              <nav className="hidden lg:block ">
                <ul className="flex items-center justify-between w-full space-x-8 px-6 py-4">
                  {/* {links.map((link) =>
                    link ? (
                      <li key={link.name}>
                        <Link href={link.href}>
                          <Typography
                            variant="16px/600/21.86px"
                            className={
                              isHomePage ? "text-white" : "text-black-3"
                            }
                          >
                            {link.name}
                          </Typography>
                        </Link>
                      </li>
                    ) : null
                  )} */}
                  <div className="flex flex-row items-center gap-4 !ml-[400px]">
                    <li>
                      <Button
                        onClick={handleServiceProviderClick}
                        className="hidden sm:block px-6 py-2 text-[#FF7125] lg:text-white bg-transparent rounded-md"
                      >
                        Become a Service Provider
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={handleCreateServiceClick}
                        className="hidden sm:block px-6 py-2 text-[#FF7125] lg:text-white bg-transparent rounded-md"
                      >
                        Post a Service
                      </Button>
                    </li>
                  </div>
                </ul>
              </nav>

              {/* For Small Screens */}
              <nav
                className={`fixed lg:hidden overflow-hidden z-50 top-20 right-0 h-screen w-screen bg-white p-6 shadow-lg transition-all duration-300 ease-in-out 
              ${menuModal ? "translate-x-0" : "translate-x-full"}
            `}
              >
                <ul className="grid justify-items-center content-center gap-12">
                  {links.map((link) =>
                    link ? (
                      <li key={link.name} onClick={handleMobileMenu}>
                        <Link href={link.href}>
                          <Typography
                            variant="16px/600/21.86px"
                            className="text-black-3"
                          >
                            {link.name}
                          </Typography>
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
                <ProtectedByRole role={[UserRole.Household]}>
                  <Link
                    href="/new-listing"
                    className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2"
                  >
                    <Button>
                      <PlusIcon />
                      New Listing
                    </Button>
                  </Link>
                </ProtectedByRole>
              </nav>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {!localUser && (
            <div className="flex items-center gap-4">
              {/* For Large Screens */}
              <nav className="hidden lg:block">
                <ul className="flex items-center gap-8">
                  {navbarLinks.map((link) =>
                    link ? (
                      <li key={link.name}>
                        <Link href={link.href}>
                          <Typography
                            variant="16px/600/21.86px"
                            className={
                              isHomePage ? "text-white" : "text-black-3"
                            }
                          >
                            {link.name}
                          </Typography>
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </nav>
              {/* For Small Screens */}
              <nav
                className={`fixed lg:hidden overflow-hidden z-50 top-20 right-0 h-screen w-screen bg-white p-6 shadow-lg transition-all duration-300 ease-in-out 
              ${menuModal ? "translate-x-0" : "translate-x-full"}
            `}
              >
                <ul className="grid justify-items-center content-center gap-12">
                  {navbarLinks.map((link) =>
                    link ? (
                      <li key={link.name} onClick={handleMobileMenu}>
                        <Link href={link.href}>
                          <Typography
                            variant="16px/600/21.86px"
                            className="text-black-3"
                          >
                            {link.name}
                          </Typography>
                        </Link>
                      </li>
                    ) : null
                  )}
                  {/* Mobile service provider button - only shown when not logged in */}
                  <button
                    onClick={handleServiceProviderClick}
                    className="flex justify-center"
                  >
                    <Button
                      variant={"outlineColored"}
                      className="block sm:hidden w-full sm:w-auto mr-4 ml-10 text-[#FF7125] lg:text-white"
                    >
                      Become a Service Provider
                    </Button>
                  </button>
                </ul>
              </nav>
              {/* Desktop service provider button - only shown when not logged in */}
              <button onClick={handleServiceProviderClick}>
                <Button className="hidden sm:block w-full sm:w-auto mr-4 ml-10 text-[#FF7125] lg:text-white rounded-md">
                  Become a Service Provider
                </Button>
              </button>
              <Link href="/sign-in">
                <Button
                  variant={isHomePage ? "outlineWhite" : "secondary"}
                  className="w-[20vw] my-2 sm:my-0 h-10 sm:h-12 sm:w-auto sm:rounded-md text-black lg:text-white border-black lg:border-white rounded-md"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-[20vw] h-10 sm:h-12 sm:w-auto rounded-md sm:rounded-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {localUser && (
            <div className="flex items-center gap-3 sm:gap-4">
              <ProtectedByRole role={[UserRole.Tradie, UserRole.Household]}>
                <ProtectedByRole role={[UserRole.Household]}>
                  <Link href="/new-listing" className="hidden lg:block">
                    <Button>
                      <PlusIcon />
                      Post a Listing
                    </Button>
                  </Link>
                  <Link href="/" className="hidden lg:block">
                    <Button
                      variant="gray"
                      size="icon"
                      className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] sm:flex items-center justify-center [@media(max-width:440px)]:hidden"
                    >
                      <SearchIcon fill="black" />
                    </Button>
                  </Link>
                  <Link href={"/favorites"}>
                    <Button
                      variant="gray"
                      size="icon"
                      className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] [@media(max-width:390px)]:hidden flex items-center"
                    >
                      <HearthIcon />
                    </Button>
                  </Link>
                  <Button
                    variant="gray"
                    size="icon"
                    unRead
                    className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px]"
                  >
                    <NotificationIcon />
                  </Button>
                  <Link href="/tradie-chat">
                    <Button
                      variant="gray"
                      size="icon"
                      unRead
                      className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px]"
                    >
                      <ChatIcon />
                    </Button>
                  </Link>
                </ProtectedByRole>
                <ProtectedByRole role={[UserRole.Tradie]}>
                  <Link href="/new-service" className="hidden lg:block">
                    <Button>
                      <PlusIcon />
                      Post a Service
                    </Button>
                  </Link>
                  <Link
                    href="/tradies-find-listings"
                    className="hidden lg:block"
                  >
                    <Button
                      variant="gray"
                      size="icon"
                      className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] [@media(max-width:343px)]:hidden"
                    >
                      <SearchIcon fill="black" />
                    </Button>
                  </Link>
                  <Link href="/watchlist">
                    <Button
                      variant="gray"
                      size="icon"
                      className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] [@media(max-width:343px)]:hidden"
                    >
                      <VisibilityIcon />
                    </Button>
                  </Link>
                  <Button
                    variant="gray"
                    size="icon"
                    unRead
                    className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px]"
                  >
                    <NotificationIcon />
                  </Button>
                  <Link href="/tradie-chat">
                    <Button
                      variant="gray"
                      size="icon"
                      unRead
                      className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px]"
                    >
                      <ChatIcon />
                    </Button>
                  </Link>
                </ProtectedByRole>
              </ProtectedByRole>
              <UserInfo />
            </div>
          )}

          <button
            className="lg:hidden relative h-[14px] w-[21px] cursor-pointer"
            onClick={handleMobileMenu}
          >
            <i
              className={`
              transition-[top_0.5s_0.5s,_transform_0.5s]
              h-0.5 w-full bg-black-3 absolute left-1/2 -translate-x-1/2
              ${menuModal ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-0"}
            `}
            />
            <i
              className={`
              transition-[top_0.5s_0.5s,_transform_0.5s]
              h-0.5 w-full bg-black-3 absolute left-1/2 -translate-x-1/2
              ${menuModal ? "scale-0" : "top-1/2 -translate-y-1/2"}
            `}
            />
            <i
              className={`
              transition-[top_0.5s_0.5s,_transform_0.5s]
              h-0.5 w-full bg-black-3 absolute left-1/2 -translate-x-1/2
              ${menuModal ? "top-1/2 -translate-y-1/2 rotate-45" : "bottom-0"}
            `}
            />
          </button>
        </div>
      </div>

      <div className="block lg:hidden">
        <Divider />
      </div>

      {/* bottom header for small screens */}
      {localUser && localUser?.role !== UserRole.Admin && (
        <div className="flex items-center justify-between px-6 py-8 bg-white lg:hidden [@media(max-width:410px)]:px-4">
          {/* LEFT SIDE */}
          <div className="block lg:hidden">
            <ul className="flex items-center gap-4 sm:gap-8">
              {links.map((link) =>
                link ? (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <Typography
                        variant="16px/600/21.86px"
                        className="text-black-3 [@media(max-width:375px)]:text-sm"
                      >
                        {link.name}
                      </Typography>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          {/* RIGHT SIDE */}
          <div>
            <ProtectedByRole
              role={[UserRole.Tradie, UserRole.Household, UserRole.Admin]}
            >
              <ProtectedByRole role={[UserRole.Household]}>
                <Link href="/new-listing">
                  <Button className="text-sm sm:text-base gap-1 sm:gap-2 px-[6px] h-[39px] [@media(max-width:390px)]:text-xs sm:h-12 sm:px-6 sm:py-3">
                    <PlusIcon className="[@media(max-width:390px)]:w-4 [@media(max-width:390px)]:h-4" />
                    Post a Listing
                  </Button>
                </Link>
              </ProtectedByRole>

              <ProtectedByRole role={[UserRole.Tradie]}>
                <Link href="/new-service">
                  <Button className="text-sm sm:text-base gap-1 sm:gap-2 px-[6px] h-[39px] [@media(max-width:390px)]:text-xs sm:h-12 sm:px-6 sm:py-3">
                    <PlusIcon className="[@media(max-width:410px)]:w-4 [@media(max-width:410px)]:h-4" />
                    Post a Service
                  </Button>
                </Link>
              </ProtectedByRole>
            </ProtectedByRole>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      {successMessage && <Toast message={successMessage} type="success" />}
      {errorMessage && <Toast message={errorMessage} type="error" />}
    </header>
  );
}
