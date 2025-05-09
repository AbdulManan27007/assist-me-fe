"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AccountActivity from "./tabs/AccountActivity";
import Notifications from "./tabs/Notifications";
import IdentityVerification from "./tabs/IdentityVerification";
import Privacy from "./tabs/Privacy";
import { Typography } from "@/components/core/Typography";
import Footer from "@/components/pages/HomePage/Footer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function Settings() {
  const [selectedTab, setSelectedTab] = useState("account");

  return (
    <>
      <div className="desk:p-12 mob:px-6 mob:py-8">
        <div className="max-w-[1200px] mx-auto">
          <Typography variant="24px/800/32.78px" className="text-black mb-6">
            Settings
          </Typography>

          {/* Mobile Dropdown */}
          <div className="desk:hidden mb-4">
            <Select
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="notifications">Notifications</SelectItem>
                <SelectItem value="identity-verification">
                  Identity Verification
                </SelectItem>
                <SelectItem value="privacy">Privacy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Tabs */}
          <Tabs
            defaultValue="account"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="grid grid-cols-[1fr,2fr] gap-12 mob:grid-cols-1"
          >
            <TabsList className="desk:flex flex-col space-y-2 pr-6 mob:hidden border-0">
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="account"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="notifications"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="identity-verification"
              >
                Identity Verification
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="privacy"
              >
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Content Area */}
            <div className="grid gap-6">
              {selectedTab === "account" && <AccountActivity />}
              {selectedTab === "notifications" && <Notifications />}
              {selectedTab === "identity-verification" && (
                <IdentityVerification />
              )}
              {selectedTab === "privacy" && <Privacy />}
            </div>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
