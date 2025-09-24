import { Box, Card, CardContent, CardHeader, Chip, ChipProps, Typography } from "@mui/material";
import { Album } from "../_data/types";


const albumTypes = [
    {
        album_type: "Live album",
        color: "primary"
    },
    {
        album_type: "Boxed set",
        color: "secondary"
    },
    {
        album_type: "Collaboration",
        color: "success"
    },
    {
        album_type: "EP",
        color: "warning"
    },
    {
        album_type: "Single",
        color: "error"
    },
    {
        album_type: "Split video",
        color: "info"
    },
    {
        album_type: "Compilation",
        color: "primary"
    },
    {
        album_type: "Demo",
        color: "secondary"
    },
    {
        album_type: "Split",
        color: "success"
    },
    {
        album_type: "Full-length",
        color: "warning"
    },
    {
        album_type: "Video",
        color: "error"
    }
]

export default function AlbumCard({ album }: { album: Album }) {
    const albumType = albumTypes.find((type) => type.album_type === album.type);
    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title={album.album_name} />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Chip label={albumType?.album_type} color={albumType?.color as ChipProps['color']} />
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography>{album.band_id}</Typography>
                </Box>
                <Typography>{album.year}</Typography>
                <Typography>{album.reviews}</Typography>
            </CardContent>
        </Card>
    )
}