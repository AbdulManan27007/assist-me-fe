import { Typography } from "@/components/core/Typography";
import { useGlobalContext } from "@/globalContext/globalContext";

interface Props {
  darkText?: boolean;
}

export function ListingsStats({ darkText = false }: Props) {
  const tradieData = useGlobalContext(({ tradieData }) => tradieData);
  if (!tradieData) return null;
  const { listings } = tradieData;

  const data = [
    {
      title: "Posted Listings",
      count: listings?.length || 0,
    },
    {
      title: "Open Listings",
      count: listings?.filter((listing) => !listing.completed).length || 0,
    },
    {
      title: "Completed Listings",
      count: listings?.filter((listing) => listing.completed).length || 0,
    },
  ];

  return (
    <div className="grid grid-cols-3">
      {data.map(({ title, count }, index) => (
        <div className="grid gap-1" key={index}>
          <Typography
            variant="14px/400/21px"
            className={darkText ? "text-black-5" : "text-white-3"}
          >
            {title}
          </Typography>
          <Typography
            variant="24px/800/32.78px"
            className={darkText ? "text-black-3" : "text-white-3"}
          >
            {count}
          </Typography>
        </div>
      ))}
    </div>
  );
}
