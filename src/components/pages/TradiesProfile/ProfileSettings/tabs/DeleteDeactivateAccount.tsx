import { Button } from "@/components/ui/button";
import { Typography } from "@/components/core/Typography";

export function DeleteDeactivateAccount() {
  return (
    <div className="grid gap-8 mob:gap-4 border border-[#DC3545] rounded-[12px] p-6 mob:p-3">
      <Typography variant="32px/700/43.71px" className="text-[#DC3545]  mob:text-[20px]">
      Delete/Deactivate Account
      </Typography>
      <Typography variant="16px/400/21.86px" className="text-black-3 mob:text-[14px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo,
        suscipit eget elit porttitor, volutpat consequat turpis. In interdum
        mauris et urna maximus, sed tincidunt nulla porta.
      </Typography>
      <div className="flex items-center gap-5 mob:flex-col">
        <Button className="mob:w-full" variant="destructive">Delete My Account</Button>
        <Button className="mob:w-full" variant="outlineDestructive">Deactivate My Account</Button>
      </div>
    </div>
  );
}
