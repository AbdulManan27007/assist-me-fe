import { Welcome } from "./Welcome";
import { NotificationsAndListings } from "./NotificationsAndListings";
import { Listing } from "../../core/Listing";

export function Dashboard() {
  return (
    <div>
      <Welcome />
      <NotificationsAndListings />
    
    </div>
  );
}
