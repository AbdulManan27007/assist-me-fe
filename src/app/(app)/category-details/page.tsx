"use client";

import { useSearchParams } from "next/navigation";
import { CategoryDetails } from "@/components/pages/CategoryDetails/CategoryDetails";

export default function CategoryWrapper() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return <CategoryDetails category={category} />;
}
