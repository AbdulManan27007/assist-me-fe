import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Checkbox } from "./checkbox";
import Box from "@mui/material/Box";

export default function RatingWithCheckbox() {
  return (
    <Stack spacing={1}>
      {[5, 4, 3, 2, 1].map((ratingValue, index) => (
        <Stack key={index} direction="row" alignItems="center" spacing={2} className="w-fit">
          <Checkbox color="primary" />
          <Box>
            <Rating
              name={`rating-${index}`}
              value={ratingValue}
              size="large"
              readOnly
              sx={{ color: "#FF7300" }} // Orange star color
            />
          </Box>
        </Stack>
      ))}
    </Stack>
    
  );
}
