"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowCalendarIcon } from "@/icons";
import { DayPicker } from "react-day-picker";
import { Typography } from "../core/Typography";
import { buttonVariants } from "@/components/ui/button";
import { IUser, useGlobalContext } from "@/globalContext/globalContext";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  light?: boolean;
  tasks?: IUser["tasks"];
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  light = false,
  tasks,
  ...props
}: CalendarProps) {
  const user = useGlobalContext(({ user }) => user);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1 w-full py-6 px-8",
        month: "space-y-4 flex-1 w-full",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "bg-transparent p-0 w-10 h-10 hover:bg-accent/50 rounded-[12px] border-none"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-[14px] font-regular leading-[21px] flex-1 text-white-3 opacity-50",
          light && "text-black-3"
        ),
        row: "grid grid-flow-col justify-items-center w-full mt-2",
        cell: cn(
          "w-8 text-center text-sm p-0 hover:bg-accent/50 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent focus-within:relative focus-within:z-20 rounded-[12px]",
          light && "text-black-1"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-full px-0 text-center aria-selected:opacity-100 hover:bg-transparent text-white-1 bg-transparent",
          light && "text-black-1"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-accent text-black-1 hover:bg-accent/50",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-white-1 opacity-50 aria-selected:bg-accent/50 aria-selected:text-white-1 aria-selected:opacity-30",
        day_disabled: "text-white-1 opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ArrowCalendarIcon
            direction="left"
            {...props}
            className={cn(light && "fill-black-1")}
          />
        ),
        IconRight: ({ ...props }) => (
          <ArrowCalendarIcon
            {...props}
            className={cn(light && "fill-black-1")}
          />
        ),
        CaptionLabel: ({ displayMonth }) => {
          return (
            <div key={displayMonth.toISOString()}>
              <Typography
                className={cn(
                  "text-white text-center",
                  light && "text-black-1"
                )}
                variant="18px/700/24.59px"
              >
                {displayMonth.toLocaleDateString("en-US", { month: "long" })}
              </Typography>
              <Typography
                className={cn(
                  "text-white text-center",
                  light && "text-black-1"
                )}
                variant="16px/400/21.86px"
              >
                {displayMonth.toLocaleDateString("en-US", { year: "numeric" })}
              </Typography>
            </div>
          );
        },
        DayContent: ({ date, ...props }) => {
          const tasksToday = (tasks ?? user?.tasks ?? []).filter((task) => {
            const taskDate = new Date(task.date);
            return (
              taskDate.getFullYear() === date.getFullYear() &&
              taskDate.getDate() === date.getDate() &&
              taskDate.getMonth() === date.getMonth()
            );
          });
          return (
            <div className="grid gap-0.5">
              <Typography
                key={date.toISOString()}
                variant="16px/400/21.86px"
                className={cn("text-white", light && "text-black-1")}
              >
                {date.toLocaleDateString("en-US", { day: "numeric" })}
              </Typography>
              <div className="flex flex-wrap gap-0.5 justify-center">
                {tasksToday?.map((task, index) => (
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: task.color }}
                    key={index}
                  />
                ))}
              </div>
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
