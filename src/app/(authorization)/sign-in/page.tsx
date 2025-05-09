"use client";
import { SignIn } from "@/components/pages/SignIn/SignIn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (document.cookie.includes("accessToken")) {
      setIsAuthenticated(true); 
    }
  }, [router]);

  if (!isAuthenticated) {
    return <SignIn />;
  }
  else{
    router.push("/");
  }
}
