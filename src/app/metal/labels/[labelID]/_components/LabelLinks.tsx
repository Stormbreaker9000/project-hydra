import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { LabelLink } from "../../_data/types";
import Chrome from "../../../../../../public/Chrome.svg";
import Image from "next/image";
import Link from "next/link";

export default function LabelLinks({ links }: { links: LabelLink[] }) {
  return (
    <Box sx={{ width: "100%", marginTop: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {links.map((link) => (
          <Grid key={link.id}>
            <ButtonBase href={link.link_url} target="_blank">
              <Paper
                variant="outlined"
                sx={{
                  padding: 2,
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image src={Chrome} alt="Chrome" width={24} height={24} />
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {link.link_name}
                </Typography>
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
