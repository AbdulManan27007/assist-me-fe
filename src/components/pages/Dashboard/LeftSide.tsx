import { NotificationsList } from "./NotificationsList";
import EarningsOverview from "./EarningOverview";
import { Listings } from "./Listings";

export function LeftSide() {
  return (
    <div className="flex flex-col gap-16">
             <Listings />
             <EarningsOverview/>


    </div>
  );
}
