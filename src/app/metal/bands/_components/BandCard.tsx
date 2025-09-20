import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Band } from "../_data/types";
import Link from "next/link";
import Chip from "@mui/material/Chip";

export default function BandCard({ band }: { band: Band }) {
    const splitTags = band.genre.split('/');

    const statusColor = band.status === 'Active' ? 'green' : 'red';

    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title={band.name} />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                    {splitTags.map((tag) => (
                        <Chip key={tag} label={tag} color="primary" size="small" />
                    ))}
                    <Box sx={{ flexGrow: 1 }} />
                </Box>
                <Typography>{band.country}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, color: statusColor }}>
                    <Typography >{band.status}</Typography>
                </Box>
                <Link href={band.url}>Link</Link>
            </CardContent>
        </Card>
    )
}