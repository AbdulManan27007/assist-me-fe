import { Typography } from "./Typography";
import { toTitleCase } from "@/lib/toTitleCase";

export function InfoCard({ data }: { data: Object }) {
  return (
    <div className="border border-[#0000001A] rounded-[12px] p-6 grid grid-cols-2 justify-between">
      {Object.entries(data).map(([key, value], index) => (
        <Typography
          key={index}
          variant={index % 2 === 0 ? "14px/600/19.12px" : "14px/400/21px"}
          className={index % 2 === 0 ? "text-black-5 " : "text-black-3 text-end"}
        >
          {index % 2 === 0 ? toTitleCase(key) : String(value)}
        </Typography>
      ))}
    </div>
  );
}
