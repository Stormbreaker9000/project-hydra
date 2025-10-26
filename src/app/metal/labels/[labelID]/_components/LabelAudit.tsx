import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Label } from "../../_data/types";

export default function LabelAudit({ label }: { label: Label }) {
    return (
        <Card>
            <CardHeader title="Audit" />
            <CardContent>
                <Typography variant="body1">{`Added By: ${label.added_by}`}</Typography>
                <Typography variant="body1">{`Added On: ${new Date(label.added_on).toLocaleDateString()}`}</Typography>
                <Typography variant="body1">{`Modified By: ${label.modified_by}`}</Typography>
                <Typography variant="body1">{`Modified On: ${new Date(label.modified_on).toLocaleDateString()}`}</Typography>
                <Typography variant="body1">{`Scraped At: ${new Date(label.scraped_at).toLocaleDateString()}`}</Typography>
                <Typography variant="body1">{`Last Updated: ${new Date(label.last_updated).toLocaleDateString()}`}</Typography>
            </CardContent>
        </Card>
    )
}