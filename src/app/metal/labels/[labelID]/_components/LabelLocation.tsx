import { Label } from "../../_data/types";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function LabelLocation({ label }: { label: Label }) {
    return (
        <Card>
            <CardHeader title="Location" />
            <CardContent>
                <Typography variant="body1">{`Country: ${label.country}`}</Typography>
                <Typography variant="body1">{`Location: ${label.location}`}</Typography>
            </CardContent>
        </Card>
    )
}