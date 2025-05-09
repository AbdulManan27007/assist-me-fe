import { Listing } from "./Listing";
import { Listings } from "./Listings";
import { NotificationsList } from "./NotificationsList";
import EarningsOverview from "./EarningOverview";


export function NotificationsAndListings() {
  return (
    <div className="px-[120px] pt-12 mob:px-6 mob:py-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr,_1.87fr] gap-16 mob:grid-cols-1">
        <Listings />
        <Listing/>
        <EarningsOverview />

        {/* <NotificationsList /> */}

      </div>
    </div>
  );
}
