import React from "react";
import Stack from "@mui/material/Stack";
import { SxProps, Typography } from "@mui/material";

type Props = {
  error?: string;
  mt?: number;
  sx?: SxProps;
}
const ErrorBox = ({ sx, error, mt }: Props) => {
  return (
    <Stack sx={{ mt: mt ?? 0, }}>
      <Typography sx={{ ...sx }} variant="caption" color={'error'}>{error}</Typography>
    </Stack>
  )

}

export default ErrorBox;
