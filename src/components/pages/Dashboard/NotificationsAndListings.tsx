import {RightSide} from "./RightSide"
import {LeftSide} from "./LeftSide"

export function NotificationsAndListings() {
  return (
    <div className="py-12 mob:px-6 mob:py-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr,_1.87fr] gap-16 mob:grid-cols-1">
      <LeftSide/>
        <RightSide/>
      </div>
    </div>
  );
}
