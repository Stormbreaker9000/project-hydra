import { Box, Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { Label } from "../_data/types";
import Link from "next/link";

export default function LabelCard({ label }: { label: Label }) {
    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title={label.name} />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <Chip label={label.specialization} color="primary" size="small" />
                    <Box sx={{ flexGrow: 1 }} />
                    <Chip label={label.status} color="primary" size="small" />
                </Box>
                <Typography>{label.country}</Typography>
                <Link href={label.website}>Website</Link>
                <Typography>{label.online_shopping}</Typography>
            </CardContent>
        </Card>
    )
}