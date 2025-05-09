import {
  createElement,
  HTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type Generic = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

interface Props extends Generic {
  variant?:
    | "10px/500/12.71px"
    | "12px/400/16px"
    | "12px/500/16px"
    | "13px/500/18px"
    | "14px/400/19.12px"
    | "14px/500/19.12px"
    | "14px/600/19.12px"
    | "14px/700/19.12px"
    | "14px/400/21px"
    | "14px/400/20px"
    | "14px/600/20px"
    | "15px/500/22px"
    | "16px/400/21.86px"
    | "16px/400/24px"
    | "16px/500/24px"
    | "16px/600/21.86px"
    | "16px/700/21.86px"
    | "17px/500/26.59px"
    | "18px/400/27px"
    | "18px/400/28px"
    | "18px/500/24.59px"
    | "18px/600/24.59px"
    | "18px/700/24.59px"
    | "20px/400/30px"
    | "20px/600/28px"
    | "20px/700/28px"
    | "24px/400/32.78px"
    | "24px/700/32px"
    | "24px/800/32.78px"
    | "28px/700/36px"
    | "29px/700/21.78px"
    | "32px/300/41.6px"
    | "32px/500/24.71px"
    | "32px/700/43.71px"
    | "36px/700/44px"
    | "40px/700/48px"
    | "48px/300/57.6px"
    | "56px/700/64px"
    | "64px/800/72px";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";
}

const styleBy: Record<Required<Props>["variant"], ClassValue> = {
  "10px/500/12.71px": "text-[10px] leading-[12.71px] font-medium",
  "12px/400/16px": "text-[12px] leading-[16px] font-normal",
  "12px/500/16px": "text-[12px] leading-[16px] font-medium",
  "13px/500/18px": "text-[13px] leading-[18px] font-medium",
  "14px/400/19.12px": "text-[14px] leading-[19.12px] font-normal",
  "14px/500/19.12px": "text-[14px] leading-[19.12px] font-medium",
  "14px/600/19.12px": "text-[14px] leading-[19.12px] font-semibold",
  "14px/700/19.12px": "text-[14px] leading-[19.12px] font-extrabold",
  "14px/400/21px": "text-[14px] leading-[21px] font-regular",
  "14px/400/20px": "text-[14px] leading-[20px] font-normal",
  "14px/600/20px": "text-[14px] leading-[20px] font-semibold",
  "15px/500/22px": "text-[15px] leading-[22px] font-medium",
  "16px/400/21.86px": "text-[16px] leading-[21.86px] font-regular",
  "16px/400/24px": "text-[16px] leading-[24px] font-regular",
  "16px/500/24px": "text-[16px] leading-[24px] font-medium",
  "16px/600/21.86px": "text-[16px] leading-[21.86px] font-semibold",
  "16px/700/21.86px": "text-[16px] leading-[21.86px] font-bold",
  "17px/500/26.59px": "text-[17px] leading-[26.59px] font-medium",
  "18px/400/27px": "text-[18px] leading-[27px] font-regular tracking-[-0.01em]",
  "18px/400/28px": "text-[18px] leading-[28px] font-normal",
  "18px/500/24.59px": "text-[18px] leading-[24.59px] font-medium",
  "18px/600/24.59px": "text-[18px] leading-[24.59px] font-semibold",
  "18px/700/24.59px":
    "text-[18px] leading-[24.59px] font-extrabold tracking-[-0.01em]",
  "20px/400/30px": "text-[20px] leading-[30px] font-normal",
  "20px/600/28px": "text-[20px] leading-[28px] font-semibold",
  "20px/700/28px": "text-[20px] leading-[28px] font-extrabold",
  "24px/400/32.78px": "text-[24px] leading-[32.78px] font-normal tracking-[-0.01em]",
  "24px/700/32px": "text-[24px] leading-[32px] font-bold",
  "24px/800/32.78px":
    "text-[24px] leading-[32.78px] font-extrabold tracking-[-0.01em]",
  "28px/700/36px": "text-[28px] leading-[36px] font-bold",
  "29px/700/21.78px":
    "text-[29px] leading-[21.78px] font-bold tracking-[-0.01em]",
  "32px/300/41.6px": "text-[32px] leading-[41.6px] font-light",
  "32px/500/24.71px": "text-[32px] leading-[24.71px] font-medium",
  "32px/700/43.71px": "text-[32px] leading-[43.71px] font-bold",
  "36px/700/44px": "text-[36px] leading-[44px] font-bold",
  "40px/700/48px": "text-[40px] leading-[48px] font-bold",
  "48px/300/57.6px":
    "text-[48px] leading-[57.6px] font-light tracking-[-0.01em]",
  "56px/700/64px": "text-[56px] leading-[64px] font-bold",
  "64px/800/72px": "text-[64px] leading-[72px] font-extrabold",
};

export function Typography({ as = "p", variant, className, ...props }: Props) {
  return createElement(as, {
    className: cn(
      variant && styleBy[variant],
      className,
      "font whitespace-pre-line"
    ),
    ...props,
  });
}
