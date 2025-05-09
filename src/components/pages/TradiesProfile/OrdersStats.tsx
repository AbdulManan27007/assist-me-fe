import { Typography } from "@/components/core/Typography";

interface OrdersStatsProps {
  countP: number;
  countC: number;
}

export function OrdersStats({ countP, countC }: OrdersStatsProps) {
  return (
    <div className="grid grid-cols-2 ">
      <div className="grid gap-1">
        <Typography variant="14px/400/21px" className="text-black-5">
        Orders In Progress
        </Typography>
        <Typography variant="24px/800/32.78px" className="text-black-3">
          {countP}
        </Typography>
      </div>
      <div className="grid gap-1">
        <Typography variant="14px/400/21px" className="text-black-5">
        Completed Orders
        </Typography>
        <Typography variant="24px/800/32.78px" className="text-black-3">
          {countC}
        </Typography>
      </div>
    </div>
  );
}