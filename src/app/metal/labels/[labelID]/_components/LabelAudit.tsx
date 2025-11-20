import { Box, Stack, Typography } from "@mui/material";
import { Label } from "../../_data/types";

export default function LabelAudit({ label }: { label: Label }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}>
      <Stack spacing={1} sx={{ flexBasis: "50%", flexGrow: 0, justifyContent: "flex-start" }}>
        <Typography
          variant="body1"
          sx={{ textAlign: "left" }}
        >{`Added By: ${label.added_by}`}</Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "left" }}
        >{`Added On: ${new Date(label.added_on).toLocaleDateString()}`}</Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "left" }}
        >{`Modified By: ${label.modified_by}`}</Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "left" }}
        >{`Modified On: ${new Date(label.modified_on).toLocaleDateString()}`}</Typography>
      </Stack>
      <Stack spacing={1} sx={{ flexBasis: "50%", flexGrow: 0, alignItems: "flex-end" }}>
        <Typography
          variant="body1"
          sx={{ textAlign: "right" }}
        >{`Scraped At: ${new Date(label.scraped_at).toLocaleDateString()}`}</Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "right" }}
        >{`Last Updated: ${new Date(label.last_updated).toLocaleDateString()}`}</Typography>
      </Stack>
    </Box>
  );
}
