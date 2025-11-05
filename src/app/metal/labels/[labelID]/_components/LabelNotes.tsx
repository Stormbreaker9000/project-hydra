import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { LabelNote } from "../../_data/types";

export default function LabelNotes({ notes }: { notes: LabelNote[] }) {
    return (
        <Card>
            <CardHeader title="Notes" />
            <CardContent>
                <Stack spacing={1}>
                    {notes.map((note) => (
                        <Typography key={note.id} variant="body1">{`${note.note_title} - ${note.note_text}`}</Typography>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}