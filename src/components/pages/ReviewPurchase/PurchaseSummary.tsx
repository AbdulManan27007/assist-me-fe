import { ArrowLinkIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/core/Divider";
import { Typography } from "@/components/core/Typography";

interface Props {
  priceType: string;
  price: number;
  fee?: number;
}

export function PurchaseSummary({ priceType, price, fee = 5 }: Props) {
  return (
    <div className="bg-white-2 rounded-[12px] p-6 grid gap-8">
      <Typography variant="24px/800/32.78px">Purchase Summary</Typography>
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Typography variant="16px/700/21.86px" className="text-black-3">
            {priceType}
          </Typography>
          <Typography variant="16px/400/21.86px" className="text-black-3">
            A${price}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="16px/700/21.86px" className="text-black-3">
            Fee
          </Typography>
          <Typography variant="16px/400/21.86px" className="text-black-3">
            A${fee}
          </Typography>
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <Typography variant="18px/700/24.59px" className="text-black-3">
            Total
          </Typography>
          <Typography variant="18px/700/24.59px" className="text-black-3">
            A${fee + Number(price)}
          </Typography>
        </div>
      </div>
      <Button className="justify-self-end">
        <Typography variant="16px/700/21.86px" className="text-white-1">
          Proceed to Payment
        </Typography>
        <ArrowLinkIcon />
      </Button>
    </div>
  );
}
