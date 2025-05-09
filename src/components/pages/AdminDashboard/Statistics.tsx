import { Typography } from "@/components/core/Typography";
import Link from "next/link";
import { StatisticCard } from "../Analytics/StatisticCard";

export function Statistics() {
  return (
    <div className="grid gap-6 content-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Typography variant="24px/800/32.78px">Statistics</Typography>
        </div>
        <Link href="/analytics">
          <Typography className="text-accent" variant="16px/700/21.86px">
            View All
          </Typography>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
        {stats.map((stat) => (
          <StatisticCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}

const stats = [
  {
    title: "Total Users",
    value: "1000",
    time: "7d",
    percentage: "+10%",
  },
  {
    title: "Total Listings",
    value: "1000",
    time: "7d",
    percentage: "+10%",
  },
  {
    title: "Revenue",
    value: "1000",
    time: "7d",
    percentage: "+10%",
  },
  {
    title: "New Users/Ads",
    value: "1000",
    time: "7d",
    percentage: "+10%",
  },
];
