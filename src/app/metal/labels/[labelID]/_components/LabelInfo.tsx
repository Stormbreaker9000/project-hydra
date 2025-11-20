"use client";

import { Box, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import { Label } from "../../_data/types";
import { styled } from "@mui/material/styles";

const TranslucentBox = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: 16,
  borderRadius: 8,
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
});

export default function LabelInfo({ label }: { label: Label }) {
  return (
    <TranslucentBox sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      <Stack spacing={1} sx={{ flexBasis: "50%", flexGrow: 0 }}>
        <Typography variant="body1">{`Specialization: ${label.specialization}`}</Typography>
        <Typography variant="body1">{`Status: ${label.status}`}</Typography>
        <Typography variant="body1">{`Website: ${label.website_url}`}</Typography>
        <Typography variant="body1">{`Parent Company: ${label.parent_company}`}</Typography>
      </Stack>
      <Stack spacing={1} sx={{ flexBasis: "50%", flexGrow: 0 }}>
        <Typography variant="body1">{`Sub Label: ${label.sub_label}`}</Typography>
        <Typography variant="body1">{`Founded Date: ${new Date(label.founded_date).toLocaleDateString()}`}</Typography>
        <Typography variant="body1">{`Online Shopping: ${label.online_shopping}`}</Typography>
        <Typography variant="body1">{`Email: ${label.email}`}</Typography>
      </Stack>
    </TranslucentBox>
  );
}
