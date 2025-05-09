import { MyListings } from "@/components/pages/MyListings/MyListings";

export default async function ListingsPage() {
  // const listings = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // });

  // console.log(listings);
  return <MyListings />;
}
