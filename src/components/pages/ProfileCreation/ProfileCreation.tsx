"use client";
import { Picture } from "./steps/Picture";
import { General } from "./steps/General";
import { Experience } from "./steps/Experience";
import { HowCanHelp } from "./steps/HowCanHelp";
import { VerifyEmail } from "./steps/VerifyEmail";
import { TradieProfile } from "./steps/TradieProfile";
import { Governance } from "@/components/core/Governance";
import { HouseholdsProfile } from "./steps/HouseholdsProfile";
import { useProfileCreationContext } from "./profileCreationContext";
import { UserRole } from "@/globalContext/globalContext";
import { useMemo } from "react";

export function ProfileCreation() {
  const { step, data } = useProfileCreationContext();

  const steps = useMemo(
    () => [
      <General key={0} />,
      <Picture key={1} />,
      <HowCanHelp key={2} />,
      data.role === UserRole.Tradie ? (
        <TradieProfile key={3} />
      ) : (
        <HouseholdsProfile key={4} />
      ),
      data.role === UserRole.Tradie ? (
        <Experience key={5} />
      ) : (
        <VerifyEmail key={6} />
      ),
      data.role === UserRole.Tradie && <VerifyEmail key={7} />,
    ],
    [data.role]
  );

  return (
    <div className="grid justify-center grid-rows-[1fr_auto] justify-items-center items-center h-full flex-1">
      {steps[step]}
      <Governance />
    </div>
  );
}
