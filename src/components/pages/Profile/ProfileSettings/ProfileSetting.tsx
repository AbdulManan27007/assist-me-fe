"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AccountActivity } from "./tabs/AccountActivity";
import { ChangePassword } from "./tabs/ChangePassword";
import { DeleteDeactivateAccount } from "./tabs/DeleteDeactivateAccount";
import  Privacy  from "./tabs/Privacy";
import { Typography } from "@/components/core/Typography";
import Footer from "@/components/pages/HomePage/Footer";
import { BackButton } from "@/components/core/BackButton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function ProfileSettings() {
  const [selectedTab, setSelectedTab] = useState("changepassword");

  return (
    <>
      <div className="desk:p-[71px] mob:px-3 mob:py-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Mobile Dropdown */}
          <div className="desk:hidden mb-4 ">
            <Select
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="changepassword">ChangePassword</SelectItem>
                <SelectItem value="privacy">Privacy</SelectItem>
                <SelectItem value="accountActivity">
                Account Activity
                </SelectItem>
                <SelectItem value="deleteDeactivateAccount">Delete/Deactivate Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Tabs */}
          <Tabs
            defaultValue="account"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="grid grid-cols-[1fr,2fr] gap-12 mob:grid-cols-1 p-6"
          >
            <TabsList className="desk:flex flex-col space-y-2 pr-6 mob:hidden border-0">
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="changepassword"
              >
                Change Password
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="privacy"
              >
                Privacy
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="accountActivity"
              >
                Account Activity
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[0px]"
                value="deleteDeactivateAccount"
              >
                Delete/Deactivate Account
              </TabsTrigger>
            </TabsList>

            {/* Content Area */}
            <div className="grid gap-6">
              {selectedTab === "changepassword" && <ChangePassword />}
              {selectedTab === "privacy" && <Privacy />}
              {selectedTab === "accountActivity" && (
                <AccountActivity />
              )}
              {selectedTab === "deleteDeactivateAccount" && <DeleteDeactivateAccount />}
            </div>
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col ">
    <BackButton />
      <Footer />
      </div>
    </>
  );
}
