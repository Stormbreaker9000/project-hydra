import { Label } from "../../_data/types";
import { Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";

export default function LabelLocation({ label }: { label: Label }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title="Location" />
      <CardContent>
        <Paper variant="outlined" sx={{ padding: 2, height: "400px", marginBottom: 2 }}>
          <Typography variant="body1">{`Placeholder for map`}</Typography>
        </Paper>
        <Typography variant="body1">{`Country: ${label.country}`}</Typography>
        <Typography variant="body1">{`Location: ${label.location}`}</Typography>
      </CardContent>
    </Card>
  );
}
