import Image from "next/image";
import { StarIcon } from "@/icons";
import { Typography } from "@/components/core/Typography";
import { useGlobalContext } from "@/globalContext/globalContext";
import { toTitleCase } from "@/lib/toTitleCase";

export function UserCard() {
  // Mock data for userData and householdData
  const userData = {
    picture: "/images/plumbing.jpeg", // Mock picture URL
    name: "John Doe",
    username: "johndoe123",
    tag: "johndoe",
    role: "administrator",
  };

  const householdData = {
    reviews: [
      { rating: 5 },
      { rating: 4 },
      { rating: 3 },
      { rating: 5 },
      { rating: 4 },
    ],
  };

  if (!userData || !householdData) return null;
  const { picture, name, username, tag, role } = userData;

  const totalReviews = householdData.reviews?.reduce(
    (acc, review) => acc + review.rating,
    0
  ) || 0;
  
  const averageRating = householdData.reviews?.length
    ? totalReviews / householdData.reviews.length
    : 0;

  return (
    <div className="flex items-start gap-4">
      <Image
        priority
        src={picture || "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"}
        alt="avatar"
        width={72}
        height={72}
        className="rounded-full"
      />
      <div className="grid gap-2">
        <div className="flex items-center gap-3">
          <Typography variant="24px/800/32.78px" className="text-white-1">
            {name || ""} {username || ""}
          </Typography>
          <Typography variant="14px/500/19.12px" className="text-white-1">
            @{tag || ""}
          </Typography>
        </div>
        <div className="flex items-center gap-2 border border-[#FFFFFF1A] rounded-full py-1.5 px-3 w-fit">
          <Typography variant="14px/400/21px" className="text-white-1">
            {toTitleCase(role)}
          </Typography>
          <Typography variant="14px/400/21px" className="text-white-1">
            •
          </Typography>
          <div className="flex items-center">
            <StarIcon />
            <Typography variant="14px/400/21px" className="text-white-1">
              {averageRating.toFixed(1)}
            </Typography>
            <Typography variant="14px/400/21px" className="text-white-1">
              ({householdData.reviews?.length || 0})
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
