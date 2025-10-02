import { neon } from '@neondatabase/serverless';
import AlbumCard from './_components/AlbumCard';
import { Album } from './_data/types';
import { Box, Container, Grid, Typography } from '@mui/material';

async function getData(): Promise<Album[]> {
    const sql = neon(process.env.DATABASE_URL || '');
    const response = await sql`SELECT * FROM albums LIMIT 10`;
    return response as Album[];
}

export default async function Albums() {
    const data = await getData();

    // console.log(data);

    return (
        <Box>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h1">Albums</Typography>
                </Box>
                <Grid container spacing={2}>
                    {data.map((album) => (
                        <Grid key={album.album_id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <AlbumCard album={album} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}