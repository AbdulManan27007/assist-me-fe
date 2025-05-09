import { Welcome } from "./Welcome";
import { NotificationsAndListings } from "./NotificationsAndListings";
import { Listing } from "./Listing";

export function TradiesDashboard() {
  return (
    <div>
      <Welcome />
      <NotificationsAndListings />
    </div>
  );
}
