import React, { useState } from "react";
import { Typography } from "@/components/core/Typography";
import { Switch } from "@/components/ui/switch";

const privacySettings = [
  "Privacy Setting 1",
  "Privacy Setting 2",
  "Privacy Setting 3",
];

const Privacy = () => {
  const [settings, setSettings] = useState(privacySettings.map(() => true));

  const toggleSetting = (index: number) => {
    setSettings((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <div className="max-w-[741px] p-6 border border-gray-200 rounded-xl w-full">
      <Typography variant="24px/800/32.78px" className="text-black">
        Privacy
      </Typography>
      <div className="grid gap-4 mt-4">
        {privacySettings.map((label, index) => (
          <div key={index} className="flex justify-between items-center">
            <Typography variant="16px/700/21.86px" className="text-black-3">
              {label}
            </Typography>{" "}
            <Switch
              checked={settings[index]}
              onCheckedChange={() => toggleSetting(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;
