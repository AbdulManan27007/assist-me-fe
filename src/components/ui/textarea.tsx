import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "../core/Typography";

export type TextareaVariant = "default" | "dark" | "orange";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  smallLabel?: string;
  full?: boolean;
}

const styleBy: Record<TextareaVariant, string> = {
  default: "bg-white border-gray-200 placeholder:text-gray-400 text-gray-900 shadow-sm focus-visible:ring-2 focus-visible:ring-[#FF7125] focus-visible:border-transparent",
  dark: "bg-gray-800 border-gray-700 placeholder:text-gray-400 text-white focus-visible:ring-2 focus-visible:ring-[#FF7125] focus-visible:border-transparent",
  orange: "bg-accent border-transparent placeholder:text-white/70 text-white focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:border-transparent",
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", smallLabel, full, ...props }, ref) => {
    return (
      <label className={cn("relative block w-full transition-all duration-200", full && "w-full", className)}>
        <textarea
          className={cn(
            `
            flex
            min-h-14
            h-[245px]
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
            resize-vertical
            `,
            styleBy[variant],
            !!smallLabel && "pt-7",
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
      </label>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };