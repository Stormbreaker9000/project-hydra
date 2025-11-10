import { Box, Card, CardContent, CardHeader, Grid, Paper, Stack, Typography } from "@mui/material";
import { LabelNote } from "../../_data/types";

export default function LabelNotes({ notes }: { notes: LabelNote[] }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <CardHeader title="Notes" />
        <CardContent>
          <Grid container spacing={2}>
            {notes.map((note) => (
              <Grid key={note.id}>
                <Paper
                  variant="outlined"
                  sx={{
                    padding: 2,
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {note.note_title}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {note.note_text}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
