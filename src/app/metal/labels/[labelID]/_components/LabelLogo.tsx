import { Box } from "@mui/material";
import Image from "next/image";

export default function LabelLogo({ logo_url }: { logo_url: string }) {
  return (
    <Box className="h-full w-full">
      <img src={logo_url} alt="Label Logo" className="h-full w-full object-contain" />
    </Box>
  );
}
