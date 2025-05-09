import * as React from "react";

import { cn } from "@/lib/utils";
import { LockIcon } from "@/icons";
import { Typography } from "../core/Typography";
import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  variant?: "default" | "dark";
  smallLabel?: string;
  setData?: (data: string[]) => void;
  value?: string[];
}

const InputChips = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      variant = "default",
      smallLabel,
      value = [],
      setData,
      ...props
    },
    ref
  ) => {
    const [chips, setChips] = useState<{ value: string; id: string }[]>(
      value.map((value) => ({ value, id: crypto.randomUUID() }))
    );
    const [inputValue, setInputValue] = useState("");
    const [selectedChip, setSelectedChip] = useState<
      (typeof chips)[number] | undefined
    >(undefined);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault(); // Prevent form submission
        setChips([
          ...chips,
          { value: inputValue.trim(), id: crypto.randomUUID() },
        ]);
        setInputValue("");
      }
      if (e.key === "Backspace" && inputValue.trim() === "") {
        if (selectedChip) {
          setChips(chips.filter((chip) => chip.id !== selectedChip.id));
          setSelectedChip(undefined);
        } else {
          setSelectedChip(chips.at(-1));
        }
      }
    };

    useEffect(() => {
      setData?.(chips.map((chip) => chip.value));
    }, [chips]);

    return (
      <label
        className={cn(
          `
          relative
          w-full
          min-h-14
          rounded-[12px]
          border
          px-6
          py-4
          disabled:cursor-not-allowed
          disabled:pointer-events-none
          font-manrope
          text-[16px]
          leading-[21.86px]
          font-regular          
          `,
          variant === "dark"
            ? "bg-[#FFFFFF0D] placeholder:text-[#FFFFFF99] text-white-1 border-[#FFFFFF26] focus-visible:outline-[#ffffff66]"
            : "bg-[#F8F8F8] placeholder:text-black-5 text-black-1 border-[#0000001A] focus-visible:outline-[#00000033]",
          !!smallLabel && "pt-[calc(16px+8px+19.12px)] min-h-[78px]",
          className
        )}
      >
        <div className="flex flex-wrap ">
          <div className="flex items-center gap-2 flex-wrap">
            {chips.map((chip) => (
              <div
                key={chip.id}
                className={cn(
                  "bg-white-3 rounded-full px-3 py-1.5 mb-2",
                  selectedChip === chip && "outline outline-destructive"
                )}
              >
                {chip.value}
              </div>
            ))}
          </div>
          <input
            type={type}
            className={cn(
              `
              bg-transparent

              ring-none
              outline-none
              w-full
            `,
              variant === "dark"
                ? "placeholder:text-[#FFFFFF99] "
                : "placeholder:text-black-5 ",
              props.disabled && "placeholder:text-black-5/70 text-black-5/70",
              className
            )}
            {...props}
            value={inputValue}
            onChange={(e) => {
              setSelectedChip(undefined);
              setInputValue(e.currentTarget.value);
            }}
            onKeyDown={handleKeyDown}
            ref={ref}
          />
        </div>
        {!!smallLabel && (
          <Typography
            variant="14px/600/19.12px"
            className={cn(
              "text-black-3 absolute left-6 top-4",
              props.disabled && "text-black-5 opacity-70"
            )}
          >
            {smallLabel}
          </Typography>
        )}
        {!!icon && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        {props.disabled && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer">
            <LockIcon className="fill-black-1" />
          </div>
        )}
      </label>
    );
  }
);
InputChips.displayName = "InputChips";

export { InputChips };
