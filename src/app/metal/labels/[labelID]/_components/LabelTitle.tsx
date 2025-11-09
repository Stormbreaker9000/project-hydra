import { Box, Typography } from "@mui/material";
import { Label } from "../../_data/types";

export default function LabelTitle({ label }: { label: Label }) {
  return (
    <Box className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-8xl font-black text-transparent">
      {label.name}
    </Box>
  );
}
