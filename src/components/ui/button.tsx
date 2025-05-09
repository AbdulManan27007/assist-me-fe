import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  `
    inline-flex
    items-center
    gap-2
    justify-center
    whitespace-nowrap
    rounded-[32px]
    text-[16px]
    font-bold
    leading-[21.86px]
    transition-all

    ring-none
    outline-none
  `,
  {
    variants: {
      variant: {
        default: `
          bg-[linear-gradient(0deg,_rgba(0,_0,_0,_0),_rgba(0,_0,_0,_0)),_linear-gradient(0deg,_#FF7125,_#FF7125)]
          text-accent-foreground
          hover:bg-accent/90
          hover:bg-[linear-gradient(0deg,_rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_linear-gradient(0deg,_#FF7125,_#FF7125)]
        `,
        destructive: `
          bg-destructive
          text-white-1
          hover:bg-destructive/90
        `,
        outline: `
          border
          text-black-1
          bg-transparent
          border-black-1
          hover:bg-black-1/10
        `,
        outlineDestructive: `
          bg-transparent
          border
          border-destructive
          text-destructive
        `,
        gray: `
          bg-white-2
        `,
        secondary: `
          bg-black-1
          text-white-1
          hover:opacity-80
        `,
        ghost: `
          hover:opacity-80
          p-0
          h-fit
        `,
        link: `
          text-black-1
          underline-offset-4
          hover:underline
        `,
        outlineWhite: `
        border
        text-white-1
        bg-transparent
        border-white-1
        hover:bg-white-1/10
      `,
      outlineColored: `
      border
      text-white-1
      bg-transparent
      border-[#FF7125]
      hover:bg-white-1/10
    `,
      },
      size: {
        default: "h-12 px-6 py-3",
        icon: "h-12 w-12",
        ghost: "h-fit p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  unRead?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, unRead = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          unRead &&
            `
            relative
            after:absolute
            after:top-[-1px]
            after:right-[-1px]
            after:w-[calc(10px+3px*2)]
            after:aspect-square
            after:bg-red-500
            after:rounded-full
            after:border-[3px]
          after:border-white
            `,

          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
