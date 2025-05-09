import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "../core/Typography";
import { LockIcon, VisibilityIcon } from "@/icons";

export type InputVariant = "default" | "dark" | "orange";
export type InputIconPosition = "left" | "right";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  variant?: InputVariant;
  iconPosition?: InputIconPosition;
  smallLabel?: string;
  full?: boolean;
}

const styleBy: Record<InputVariant, string> = {
  default: "bg-white border-gray-200 placeholder:text-gray-400 text-gray-900 shadow-sm focus-visible:ring-2 focus-visible:ring-[#FF7125] focus-visible:border-transparent",
  dark: "bg-gray-800 border-gray-700 placeholder:text-gray-400 text-white focus-visible:ring-2 focus-visible:ring-[#FF7125] focus-visible:border-transparent",
  orange: "bg-accent border-transparent placeholder:text-white/70 text-white focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:border-transparent",
};

const iconPositions: Record<InputIconPosition, string> = {
  left: "left-4",
  right: "right-4",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      variant = "default",
      iconPosition = "right",
      smallLabel,
      full,
      ...props
    },
    ref
  ) => {
    const handleTypeToggle = (e: React.MouseEvent) => {
      const input = e.currentTarget.parentElement?.querySelector("input");
      if (input) {
        input.type = input.type === "password" ? "text" : "password";
      }
    };

    return (
      <label className={cn("relative block w-fit transition-all duration-200", full && "w-full", className)}>
        <input
          type={type}
          className={cn(
            `
            flex
            h-14
            min-w-[200px]
            w-full
            rounded-lg
            border
            px-4
            py-3
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            placeholder:font-normal
            focus-visible:outline-none
            focus-visible:ring-2
            disabled:cursor-not-allowed
            disabled:opacity-70
            font-sans
            text-base
            leading-relaxed
            transition-colors
            duration-200
            `,
            styleBy[variant],
            !!smallLabel && "pt-7",
            !!icon && iconPosition === "left" && "pl-10",
            !!icon && iconPosition === "right" && "pr-10",
            type === "password" && iconPosition === "right" && "pr-10",
            props.disabled && "opacity-60",
            full && "w-full",
            className
          )}
          ref={ref}
          {...props}
        />

        {!!smallLabel && (
          <Typography
            variant="14px/600/19.12px"
            className={cn(
              "absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all",
              props.disabled && "text-gray-400"
            )}
          >
            {smallLabel}
          </Typography>
        )}

        {!!icon && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-gray-500",
              iconPositions[iconPosition]
            )}
          >
            {icon}
          </div>
        )}

        {type === "password" && (
          <div
            onClick={handleTypeToggle}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200",
              iconPositions[iconPosition]
            )}
          >
            <VisibilityIcon />
          </div>
        )}

        {props.disabled && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-gray-400",
              iconPositions[iconPosition]
            )}
          >
            <LockIcon className="fill-current" />
          </div>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };