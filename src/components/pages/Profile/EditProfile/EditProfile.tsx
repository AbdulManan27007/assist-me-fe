"use client";
import { EditProfileForm } from "./EditProfileForm";
import { EditTradieProfile } from "./EditTradieProfile";
import { Typography } from "@/components/core/Typography";
import { EditHouseholdProfile } from "./EditHouseholdProfile";
import { ProtectedByRole } from "@/components/core/ProtectedByRole";
import { UserRole } from "@/globalContext/globalContext";
import { BackButton } from "@/components/core/BackButton";

export function EditProfile() {

  return (
    <div className="desk:p-12 mob:px-6 mob:py-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[auto_1fr] items-start gap-[131px] mob:grid-cols-1 mob:gap-6">
        <BackButton />
        <div className="grid grid-cols-2 gap-6 mob:grid-cols-1">
          <div className="p-8 grid gap-8 border border-[#0000001A] rounded-[12px]">
            <Typography variant="24px/800/32.78px" className="text-black-1">
              User Profile
            </Typography>
            <EditProfileForm />
          </div>
          <ProtectedByRole role={UserRole.Household}>
            <EditHouseholdProfile />
          </ProtectedByRole>
          <ProtectedByRole role={UserRole.Tradie}>
            <EditTradieProfile />
          </ProtectedByRole>
        </div>
      </div>
    </div>
  );
}
