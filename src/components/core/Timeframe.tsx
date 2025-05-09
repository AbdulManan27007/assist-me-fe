import { Typography } from "./Typography";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

interface Props {
  timeframe: string;
  timeframeOptions?: string[];
  setTimeframe: (timeframe: string) => void;
}

export const timeframeOptions = ["30d", "60d", "90d"];

export function Timeframe({ timeframe, setTimeframe }: Props) {
  return (
    <div className="flex items-center gap-3 h-fit">
      <Typography variant="14px/500/19.12px" className="text-black-3">
        Timeframe
      </Typography>

      <Select onValueChange={setTimeframe} defaultValue={timeframe}>
        <SelectTrigger className="bg-transparent border-none outline-none py-0 pl-0 pr-[24px] min-h-fit h-fit w-fit [&>svg]:right-0">
          <Typography variant="16px/700/21.86px" className="text-black-5">
            {timeframe}
          </Typography>
        </SelectTrigger>
        <SelectContent>
          {timeframeOptions.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
