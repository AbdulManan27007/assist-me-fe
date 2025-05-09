"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { thumbClassName?: string }
>(({ className, thumbClassName, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      `
        peer
        inline-flex
        h-[31px]
        w-[51px]
        shrink-0
        cursor-pointer
        items-center
        rounded-full
        border-2
        border-transparent
        transition-colors
        
        outline-none
        ring-none

        disabled:cursor-not-allowed
        disabled:opacity-50
        
        data-[state=checked]:bg-accent
        data-[state=unchecked]:bg-white-3
      `,

      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        `
        pointer-events-none
        block
        h-[27px]
        w-[34px]
        rounded-full
        bg-white-1
        shadow-[0px_3px_7px_0px_#0000001F]

        ring-none
        transition-transform
        data-[state=checked]:translate-x-[13px]
        data-[state=unchecked]:translate-x-[0px]
        `,
        thumbClassName
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
