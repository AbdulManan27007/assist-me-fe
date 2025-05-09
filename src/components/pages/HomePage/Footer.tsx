"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Typography } from "@/components/core/Typography";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  Logo,
  StarIcon,
} from "@/icons";

interface TradieCardProps {
  name: string;
  role: string;
  rating: number;
  reviews?: number;
  imageSrc: string;
  opacity?: number;
  className?: string;
}

const TradieCard: React.FC<TradieCardProps> = ({
  name,
  role,
  rating,
  reviews,
  imageSrc,
  opacity = 100,
  className = "",
}) => (
  <div
    className={`bg-white p-4 rounded-2xl flex items-center gap-3 shadow-custom-soft ${className}`}
    style={{ opacity: opacity / 100 }}
  >
    <Image
      className="rounded-full w-12 h-12 object-cover"
      src={imageSrc}
      width={48}
      height={48}
      alt={`${name}'s profile`}
    />
    <div className="flex-1">
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="w-4 h-4" />
          <span className="text-sm">{rating.toFixed(1)}</span>
          {reviews && (
            <span className="text-sm text-gray-500">({reviews})</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

interface QuickLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.FC;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const quickLinks: QuickLink[] = [
    { label: "About Us", href: "/about-us" },
    { label: "Services", href: "/faq" },
    { label: "Features", href: "/contact-support" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },

  ];

  const hideCTASection =
    pathname === "/tradies-profile/settings" ||
    pathname === "/tradies-profile/profileSettings";

  return (
    <footer className="relative bg-[url('/images/footer-bg.png')] bg-fit bg-cover w-full ">
      {/* Sloped Background */}
     

      {/* Service Form Section */}
      <div className="max-w-[850px] w-full mx-auto mb-20">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-6xl font-bold mb-8 text-center">
            <span className="text-[#FF6B35]">SERVICE</span> THE WAY YOU WANT
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="NAME"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="tel"
                  placeholder="PHONE NUMBER"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="DATE"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="SERVICE DESCRIPTION"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#FF6B35] text-white px-6 py-2 rounded-full flex items-center"
              >
                SUBMIT NOW
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-[1200px] mx-auto pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20">
          {/* Logo and Description */}
          <div className="max-w-sm">
            <Logo fillColorSecondary="#ffffff" className=" h-8 sm:h-16" />
            <Typography
              variant="16px/400/21.86px"
              className="text-[#DDDDDD] max-w-[278px]"
            >
              <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
              <MdOutlineMail size={22} />

                
                <span>AssistMeIn@gmail.com</span>
              </div>
              
              <div className="flex items-start gap-3">
              <BsTelephone size={22}/>
                <span>+0123456789</span>
              </div>
              
              <div className="flex items-start gap-3">
              <SlLocationPin  size={35}/>
                <span>001 Hollywood Model Town Block 13 House 359 Japan</span>
              </div>
            </div>
            </Typography>
          </div>

          {/* Quick Links */}
          <div>
            <Typography
              variant="20px/700/28px"
              className="text-[#FFFFFF] mb-6"
            >
              DISCOVER MORE
            </Typography>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <Typography
                      variant="18px/600/24.59px"
                      className="text-[#E7E8E9] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <Typography
              variant="20px/700/28px"
              className="text-[#FFFFFF] mb-6"
            >
              JOIN OUR NEWSLETTER
            </Typography>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="border border-white-1 rounded-full flex items-center justify-center w-12 h-12 hover:bg-white-1/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#ffffff1a] mt-12 pt-6">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Typography variant="18px/500/24.59px" className="text-white">
              © {currentYear} Unpack. All Rights Reserved.
            </Typography>
            {/* <div className="flex gap-6">
              <Link href="#">
                <Typography
                  variant="14px/400/21px"
                  className="text-[#D3D4D5] hover:text-white transition-colors"
                >
                  terms of service
                </Typography>
              </Link>
              <Link href="#">
                <Typography
                  variant="14px/400/21px"
                  className="text-[#D3D4D5] hover:text-white transition-colors"
                >
                  privacy policy
                </Typography>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
