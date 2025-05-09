import React from "react";
import VerticalLinearStepper from "@/components/ui/stepper";
import { Typography } from "@/components/core/Typography";
import Image from "next/image";
const steps = [
  {
    label: "Appear on camera",
    description:
      "To show us it's really you, take an automatic selfie or join a video chat.",
  },
  {
    label: "Show us a government-issued photo ID",
    description:
      "We'll check that the country where your ID is from matches the country in your profile.",
  },
  {
    label: "Update your country information",
    description:
      "You'll have 2 options for matching your profile country and ID country.",
  },
  {
    label: "Submit for identity review",
    description:
      "If we can't instantly verify you, we'll start a manual review process.",
  },
];

const IdentityVerification = () => {
  return (
    <div className="max-w-[727px]  p-6 border border-[#0000003B] rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex gap-3">
        <Typography variant="20px/700/28px" className="text-black-2">
          Verified Your Identity
        </Typography>
        <Image src="/images/verify.svg" height={13} width={13} alt="verify" />
      </div>
      <Typography variant="14px/400/19.12px" className="text-[#252E36B8]">
        You've completed an important part of establishing trust in our global
        work marketplace.
      </Typography>

      {/* Stepper */}
      <div className="mt-5">
        <VerticalLinearStepper steps={steps} />
      </div>

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-[#E9E9E985] rounded-lg flex items-center gap-4 ">
        <span className="">
          <Image src="/images/verify-2.svg" height={43} width={43} alt="verify" />
        </span>
        <p className="text-sm text-[#E88B5A] font-semibold">
          We encrypt your data and securely share it with our ID verification
          partner and any government that requires reporting income.
          <a href="#" className="text-[#FF7125] underline ml-1">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default IdentityVerification;
