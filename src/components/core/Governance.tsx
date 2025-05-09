import { Typography } from "./Typography";

export function Governance() {
  return (
    <Typography
      variant="14px/400/21px"
      className="text-black-5 text-center [&>span]:text-black-1 [&>span]:font-semibold pb-6"
    >
      By proceeding, I agree to Golalo's <span>Terms & Conditions</span>,
      <span> Community Guidelines</span>, & <span>Privacy Policy</span>
    </Typography>
  );
}
