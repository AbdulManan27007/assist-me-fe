"use client";

import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/icons";
import { Typography } from "../Typography";
import { ArrowIcon } from "@/icons/ArrowIcon";

export const HeaderAuthorization = () => {
  return (
    <header className="pt-[26px] max-w-[1200px] mx-auto w-full relative">
      <div className="flex flex-col md:flex-row justify-start items-center gap-2">
        <Link
          href="/sign-in"
          className="flex justify-start items-start gap-1 cursor-pointer w-full md:w-[240px] ml-6"
        >
          <ArrowIcon />
          <Typography variant="18px/700/24.59px" className="text-black-5">
            Back to login
          </Typography>
        </Link>
        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-8 md:mt-0">
          <Logo
          />{" "}
        </div>
      </div>
    </header>
  );
};
