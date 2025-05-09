"use client";
import { z } from "zod";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { daysAgo, formatDate } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/core/Typography";
import { BackButton } from "@/components/core/BackButton";
import { MOCK_LISTINGS } from "@/globalContext/globalContext";
import { FormControl, FormMessage } from "@/components/ui/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { CalendarIcon, CalendarWithDaysIcon, HourGlassIcon } from "@/icons";
import { useRouter } from "next/navigation";

export function ApplyForListing() {
  const listing = MOCK_LISTINGS[0];

  const router = useRouter();

  const FormSchema = z.object({
    tasks: z.array(
      z.object({
        title: z.string(),
        date: z.date(),
      })
    ),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tasks:
        listing?.tasks.map((task) => ({
          title: task?.title,
          date: task?.date ? new Date(task.date) : undefined,
        })) || [],
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    router.push("/after-applying");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-12 mob:py-8 mob:px-6">
          <div className="max-w-[1200px] mx-auto grid gap-8 ">
            <div className="grid gap-4">
              <BackButton />
              <Typography variant="32px/700/43.71px">
                Apply For Listing
              </Typography>
            </div>
            <div className="grid gap-16 grid-cols-2 mob:grid-cols-1 mob:gap-12">
              <div className="border border-[#0000001A] rounded-[12px] p-6 grid gap-8">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1.5 border border-[#0000001A] rounded-full w-fit">
                      <Typography
                        variant="14px/400/21px"
                        className="text-black-5"
                      >
                        {listing?.category}
                      </Typography>
                    </div>

                    <div className="flex items-center gap-2">
                      <Typography
                        variant="16px/600/21.86px"
                        className="text-black-5"
                      >
                        {listing?.location}
                      </Typography>

                      <div className="h-1 w-1 rounded-full bg-black-5" />

                      <Typography
                        variant="16px/600/21.86px"
                        className="text-black-5"
                      >
                        {daysAgo(listing?.start_date) === 1
                          ? "Today"
                          : `${daysAgo(listing?.start_date)} days ago`}
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    variant="24px/800/32.78px"
                    className="text-black-3"
                  >
                    {listing?.title}
                  </Typography>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Description
                  </Typography>

                  <Typography variant="16px/400/24px" className="text-black-5">
                    {listing?.description}
                  </Typography>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Tasks
                  </Typography>

                  <div className="grid gap-2">
                    {listing?.tasks?.map((task, index) => (
                      <Typography
                        key={index}
                        variant="16px/400/24px"
                        className="text-black-4"
                      >
                        {task?.title}
                      </Typography>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Uploaded media
                  </Typography>

                  <div className="flex gap-2">
                    {listing?.images?.map((image, index) => (
                      <Image
                        priority
                        key={index}
                        src={image}
                        alt={`uploaded media ${index}`}
                        width={80}
                        height={80}
                        className="rounded-[12px]"
                      />
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Timing
                  </Typography>

                  <div className="flex gap-6">
                    <div className="flex items-center gap-1.5">
                      <HourGlassIcon />

                      <Typography
                        variant="16px/700/21.86px"
                        className="text-black-4"
                      >
                        {`Ends in ${listing?.duration}`}
                      </Typography>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <CalendarIcon />

                      <Typography
                        variant="16px/700/21.86px"
                        className="text-black-4"
                      >
                        {formatDate(listing?.start_date, "short")} -{" "}
                        {formatDate(listing?.end_date, "short")}
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Pricing
                  </Typography>

                  <div className="flex flex-1 items-end gap-2">
                    <Typography variant="24px/800/32.78px">
                      A$ {listing?.price}
                    </Typography>

                    <Typography
                      variant="16px/400/21.86px"
                      className="text-black-5"
                    >
                      {listing?.priceType}
                    </Typography>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Contact Details
                  </Typography>

                  <Typography
                    variant="16px/400/21.86px"
                    className="text-black-5"
                  >
                    {listing?.email}
                  </Typography>

                  <Typography
                    variant="16px/400/21.86px"
                    className="text-black-5"
                  >
                    {listing?.phone}
                  </Typography>
                </div>

                <div className="grid gap-3">
                  <Typography
                    variant="18px/700/24.59px"
                    className="text-black-4"
                  >
                    Keywords
                  </Typography>

                  <div className="flex gap-2">
                    {listing?.keywords?.map((keyword, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 bg-white-2 rounded-full w-fit"
                      >
                        <Typography
                          variant="16px/400/21.86px"
                          className="text-black-5"
                        >
                          {keyword}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-12 h-fit mob:row-start-1">
                <div className="grid gap-6">
                  <Typography variant="24px/800/32.78px">
                    Your Application
                  </Typography>

                  <FormField
                    control={form.control}
                    name={`description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Write about why you’re perfect for this listing..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-6">
                  <Typography variant="24px/800/32.78px">
                    Schedule Tasks
                  </Typography>
                  <div className="grid gap-3 grid-cols-2 items-center">
                    <Typography variant="14px/700/19.12px" className="pb-1">
                      Listing’s Tasks
                    </Typography>
                    <Typography variant="14px/700/19.12px" className="pb-1">
                      Listing’s Tasks
                    </Typography>
                    {listing?.tasks?.map((task, index) => (
                      <Fragment key={index}>
                        <Typography variant="16px/400/21.86px">
                          {task?.title}
                        </Typography>
                        <FormField
                          control={form.control}
                          name={`tasks.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <div>
                                      <Input
                                        readOnly
                                        placeholder="01.01.24"
                                        icon={<CalendarWithDaysIcon />}
                                        value={format(field.value, "dd.MM.yy")}
                                      />
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      // className={`
                                      // [&_*]:text-black-1
                                      // [&_*]:fill-black-1
                                      //   w-full
                                      // ![&>td:hover]:bg-black-1/10
                                      // [&_*[aria-selected]]:bg-black-1/10
                                      //   [&_*[aria-selected]]:rounded-none
                                      //   [&_*:has([aria-selected].day-range-start)]:rounded-l-[8px]
                                      //   [&_*:has([aria-selected].day-range-end)]:rounded-r-[8px]
                                      //   [&_*:has([aria-selected])]:bg-transparent
                                      // `}
                                      initialFocus
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      mode="single"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Apply for listing</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
