import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import { Label } from "../_data/types";
import Link from "next/link";

export default function LabelCard({ label }: { label: Label }) {
    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title={label.name || 'Unknown'} />
            <CardMedia component="img" image={label.logo_url || 'Unknown'} alt={label.name || 'Unknown'} />
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="body2">Specialization: {label.specialization || 'Unknown'}</Typography>
                    <Typography variant="body2">Status: {label.status || 'Unknown'}</Typography>
                    <Typography variant="body2">Country: {label.country || 'Unknown'}</Typography>
                    <Typography variant="body2">Website: <Link href={label.website_url}>{label.website_url}</Link></Typography>
                    <Typography variant="body2">Online Shopping: {label.online_shopping || 'Unknown'}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Link href={`/metal/labels/${label.label_id}`}>
                    <Button variant="contained" color="primary">View Label</Button>
                </Link>
            </CardActions>
        </Card>
    )
}