import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CalendarWithDaysIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/globalContext/globalContext";
import { InputChips } from "@/components/ui/input-chips";
import { Typography } from "@/components/core/Typography";
import { useNewListingContext } from "../newListingContext";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar-custom";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  // duration: z.string().min(1),
  // keywords: z.array(z.string()).min(1),
  // tasks: z.array(
  //   z.object({
  //     title: z.string().min(1),
  //   })
  // ),
});

export function ListingDetails() {
  const { listing, nextStep, setListingData } = useNewListingContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: listing?.title || "",
      category: listing?.category || "",
      location: listing?.location || "",
      description: listing?.description || "",
      startDate: listing?.start_date || "",
      endDate: listing?.end_date || "",
      // duration: listing?.duration || '',
      // keywords: listing?.keywords || [],
      // tasks: listing?.tasks || [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setListingData(data);
    nextStep();
  };
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    form.setValue(
      "startDate",
      startDate ? format(startDate, "yyyy-MM-dd") : ""
    );
  }, [startDate]);

  useEffect(() => {
    form.setValue("endDate", endDate ? format(endDate, "yyyy-MM-dd") : "");
  }, [endDate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-12">
        <div className="grid gap-5">
          <Typography variant="24px/800/32.78px">Personal/Business Information</Typography>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    full
                    smallLabel="Title"
                    placeholder="Choose a title for your listing"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger smallLabel="Category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Category).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    smallLabel="Description"
                    placeholder="Write about what you need done in this listing as complete as you can..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger smallLabel="Location">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Sydney", "Melbourne", "Brisbane"].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center">
            <Checkbox className="w-8 h-8 border-[1px]" />
            <Typography variant="16px/600/21.86px" className="text-black-3">
              Remote Listing
            </Typography>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="startDate"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div>
                          <Input
                            readOnly
                            smallLabel="Start Date"
                            placeholder="Select Start Date"
                            icon={<CalendarWithDaysIcon />}
                            value={
                              startDate ? format(startDate, "yyyy-MM-dd") : ""
                            }
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className={`
                          p-3
                          w-[360px]
                          [&_table]:w-full
                          [&_table]:border-collapse
                          [&_table]:space-y-1
                          [&_th]:h-10
                          [&_th]:w-10
                          [&_th]:font-medium
                          [&_th]:text-center
                          [&_th]:text-black-3
                          [&_td]:p-0
                          [&_td]:text-center
                          [&_td]:h-10
                          [&_td]:w-10
                          [&_td]:text-sm
                          [&_td]:font-normal
                          [&_td_button]:w-full
                          [&_td_button]:h-full
                          [&_td_button]:p-0
                          [&_td_button]:font-normal
                          [&_td_button]:text-black-3
                          [&_td_button]:relative
                          [&_td_button_div]:text-black-3
                          [&_td_button_div]:after:hidden
                          [&_td_button_div]:before:hidden
                          [&_td_button:hover]:bg-black-1/10
                          [&_td_button:hover]:rounded-[8px]
                          [&_td_button.rdp-day_selected]:bg-primary
                          [&_td_button.rdp-day_selected]:rounded-[8px]
                          [&_td_button.rdp-day_selected]:text-white
                          [&_.rdp-day_today]:font-semibold
                          [&_.rdp-day_today]:text-black-3
                          [&_.rdp-caption]:flex
                          [&_.rdp-caption]:items-center
                          [&_.rdp-caption]:justify-between
                          [&_.rdp-caption]:p-2
                          [&_.rdp-caption]:text-black-3
                          [&_.rdp-caption_div]:flex
                          [&_.rdp-caption_div]:items-center
                          [&_.rdp-caption_div]:space-x-2
                          [&_.rdp-nav]:flex
                          [&_.rdp-nav]:items-center
                          [&_.rdp-nav]:space-x-1
                          [&_.rdp-nav_button]:h-7
                          [&_.rdp-nav_button]:w-7
                          [&_.rdp-nav_button]:bg-transparent
                          [&_.rdp-nav_button]:rounded-[8px]
                          [&_.rdp-nav_button]:p-0
                          [&_.rdp-nav_button]:opacity-50
                          [&_.rdp-nav_button]:text-black-3
                          [&_.rdp-nav_button:hover]:bg-black-1/10
                          [&_.rdp-nav_button:hover]:opacity-100
                          [&_.rdp-nav_button:hover]:rounded-[8px]
                          [&_.rdp-nav_button_previous]:mr-2
                          [&_.rdp-nav_button_next]:ml-2
                          [&_*]:text-black-3
                          [&_button_div_div.rounded-full]:!hidden
                          [&_button_div_div.w-1\\.5]:!hidden
                          [&_button_div_div.h-1\\.5]:!hidden
                          [&_button.rdp-day_selected]:![&_p]:text-white
                        
                          `}
                          mode="single"
                          selected={startDate || undefined}  // Convert null to undefined
                          onSelect={(date) => setStartDate(date || null)}
                          defaultMonth={startDate || undefined}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div>
                          <Input
                            readOnly
                            smallLabel="End Date"
                            placeholder="Select End Date"
                            icon={<CalendarWithDaysIcon />}
                            value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className={`
                          p-3
                          w-[360px]
                          [&_table]:w-full
                          [&_table]:border-collapse
                          [&_table]:space-y-1
                          [&_th]:h-10
                          [&_th]:w-10
                          [&_th]:font-medium
                          [&_th]:text-center
                          [&_th]:text-black-3
                          [&_td]:p-0
                          [&_td]:text-center
                          [&_td]:h-10
                          [&_td]:w-10
                          [&_td]:text-sm
                          [&_td]:font-normal
                          [&_td_button]:w-full
                          [&_td_button]:h-full
                          [&_td_button]:p-0
                          [&_td_button]:font-normal
                          [&_td_button]:text-black-3
                          [&_td_button]:relative
                          [&_td_button_div]:text-black-3
                          [&_td_button_div]:after:hidden
                          [&_td_button_div]:before:hidden
                          [&_td_button:hover]:bg-black-1/10
                          [&_td_button:hover]:rounded-[8px]
                          [&_td_button.rdp-day_selected]:bg-primary
                          [&_td_button.rdp-day_selected]:rounded-[8px]
                          [&_td_button.rdp-day_selected]:text-white
                          [&_.rdp-day_today]:font-semibold
                          [&_.rdp-day_today]:text-black-3
                          [&_.rdp-caption]:flex
                          [&_.rdp-caption]:items-center
                          [&_.rdp-caption]:justify-between
                          [&_.rdp-caption]:p-2
                          [&_.rdp-caption]:text-black-3
                          [&_.rdp-caption_div]:flex
                          [&_.rdp-caption_div]:items-center
                          [&_.rdp-caption_div]:space-x-2
                          [&_.rdp-nav]:flex
                          [&_.rdp-nav]:items-center
                          [&_.rdp-nav]:space-x-1
                          [&_.rdp-nav_button]:h-7
                          [&_.rdp-nav_button]:w-7
                          [&_.rdp-nav_button]:bg-transparent
                          [&_.rdp-nav_button]:rounded-[8px]
                          [&_.rdp-nav_button]:p-0
                          [&_.rdp-nav_button]:opacity-50
                          [&_.rdp-nav_button]:text-black-3
                          [&_.rdp-nav_button:hover]:bg-black-1/10
                          [&_.rdp-nav_button:hover]:opacity-100
                          [&_.rdp-nav_button:hover]:rounded-[8px]
                          [&_.rdp-nav_button_previous]:mr-2
                          [&_.rdp-nav_button_next]:ml-2
                          [&_*]:text-black-3
                          [&_button_div_div.rounded-full]:!hidden
                          [&_button_div_div.w-1\\.5]:!hidden
                          [&_button_div_div.h-1\\.5]:!hidden
                          [&_button.rdp-day_selected]:![&_p]:text-white
                        
                          `}
                          mode="single"
                          selected={endDate || undefined}  // Convert null to undefined
                          onSelect={(date) => setEndDate(date || null)}
                          defaultMonth={endDate || undefined}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 items-center">
            <Checkbox className="w-8 h-8 border-[1px]" />
            <Typography variant="16px/600/21.86px" className="text-black-3">
              Flexible
            </Typography>
          </div>
        </div>

        <Button type="submit" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
}
