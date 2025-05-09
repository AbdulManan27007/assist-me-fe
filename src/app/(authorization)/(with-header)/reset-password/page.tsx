import { PasswordReset } from "@/components/pages/PasswordReset/PasswordReset";
import { Suspense } from "react";

export default function PasswordResetPage() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
     <PasswordReset />;
     </Suspense>
    )
}
