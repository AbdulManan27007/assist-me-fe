"use client";
import googleIcon from "@/icons/google.svg";
import appleIcon from "@/icons/apple.svg";
import facebookIcon from "@/icons/facebook.svg";
import Image from "next/image";

export function LoginMethods() {
  const handleClick = (platform: string) => {
    if (platform === "google") {
       window.open(`${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/google`, "_self");
    } else {
      alert(`Signup with ${platform} not implemented yet.`);
    }
  };

  const icons = [
    { src: googleIcon, alt: "Google", id: "google" },
    { src: facebookIcon, alt: "Facebook", id: "facebook" },
    { src: appleIcon, alt: "Apple", id: "apple" },
  ];

  return (
    <div className="flex [&>*]:flex-1 gap-4">
      {icons.map((icon) => (
        <button
          key={icon.id}
          onClick={() => handleClick(icon.id)}
          className="border-[1.5px] border-[#0000001A] rounded-full p-3 grid place-items-center"
        >
          <Image priority src={icon.src} alt={icon.alt} width={0} height={0} className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}
