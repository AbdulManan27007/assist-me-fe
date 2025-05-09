"use client";
import { useState } from "react";
import { Typography } from "@/components/core/Typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingHistory from "./Tabs/BillingHistory";
import BillingInfo from "./Tabs/BillingInfo";
import Balances from "./Tabs/Balances";
import PaymentMethods from "./Tabs/PaymentMethods";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function TradiesPayment() {
  const tabs = [
    { name: "Billing History", component: <BillingHistory /> },
    { name: "Billing Info", component: <BillingInfo /> },
    { name: "Balances", component: <Balances /> },
    { name: "Payment Methods", component: <PaymentMethods /> },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  return (
    <div className="max-w-[986px] w-full mx-auto p-4 sm:p-6 md:p-8">
      <Typography
        variant="24px/800/32.78px"
        className="text-black-2 mb-4 md:mb-6"
      >
        Billing and Payment
      </Typography>

      {/* Dropdown for mobile screens */}
      <div className="block md:hidden">
        <Select value={selectedTab} onValueChange={setSelectedTab}>
          <SelectTrigger className="w-full border-gray-300">
            <SelectValue placeholder="Select a tab" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto">
          {tabs.map((tab) => (
              <SelectItem key={tab.name} value={tab.name}>
                {tab.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs for larger screens */}
      <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="grid gap-4 md:gap-6">
        <TabsList className="hidden md:flex flex-wrap border-b border-gray-200 gap-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.name}
              value={tab.name}
              className="px-3 py-2 text-sm md:text-base text-gray-600 hover:text-black border-b-2 border-transparent data-[state=active]:border-black"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.name} value={tab.name} className="pt-4">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
