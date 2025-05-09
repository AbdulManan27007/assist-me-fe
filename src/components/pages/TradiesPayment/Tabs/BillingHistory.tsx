"use client";
import { useState } from "react";
import { Typography } from "@/components/core/Typography";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

const BillingHistory = () => {
  interface BillingEntry {
    id: number;
    date: string;
    client: string;
    service: string;
    fees: string;
    billed: string;
  }
  const mockBillingData: BillingEntry[] = [];

  const [date, setDate] = useState<DateRange | null>(null);

  return (
    <TabsContent value="Billing History">
      {/* Billing History Header */}
      <div className="flex justify-between items-center mt-6 mob ">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 border px-4 py-2 rounded-md border-[#0000001A]">
              <Typography variant="14px/500/19.12px" className="text-black-3">
                {date?.from && date?.to
                  ? `${date.from.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} - ${date.to.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`
                  : "Select Date"}
              </Typography>
              <CalendarIcon className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <Calendar
              mode="range"
              selected={date ?? { from: undefined, to: undefined }}
              onSelect={(newDate) =>
                setDate(newDate || { from: undefined, to: undefined })
              }
            />
          </PopoverContent>
        </Popover>

        <Button
          className="px-4 rounded-md mob:text-sm mob:h-[37px]"
          disabled={!date?.from || !date?.to}
        >
          Download CSV
        </Button>
      </div>

      {/* Billing Table */}
      <div className="mt-6 rounded-md">
        <div className="grid grid-cols-5 bg-gray-100 p-3 text-gray-600 font-semibold ">
          <span>Date</span>
          <span>Client</span>
          <span>Service</span>
          <span>Fees</span>
          <span>Billed</span>
        </div>

        {mockBillingData.length === 0 ? (
          <div className="flex flex-col items-center py-10">
            <img src="/images/No_Data.png" alt="No billing" className="w-40" />
            <Typography className="text-black-3 mt-4">
              No billing yet...
            </Typography>
          </div>
        ) : (
          mockBillingData.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-5 p-3 border-b text-gray-700"
            >
              <span>{entry.date}</span>
              <span>{entry.client}</span>
              <span>{entry.service}</span>
              <span>{entry.fees}</span>
              <span>{entry.billed}</span>
            </div>
          ))
        )}
      </div>
    </TabsContent>
  );
};

export default BillingHistory;
