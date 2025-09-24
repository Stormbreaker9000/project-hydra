import { Box, Container, Grid, Typography } from "@mui/material";

import { neon } from '@neondatabase/serverless';
import { Band } from "./_data/types";
import BandCard from "./_components/BandCard";

async function getData(): Promise<Band[]> {
  const sql = neon(process.env.DATABASE_URL || '');
  const response = await sql`SELECT * FROM bands LIMIT 10`;
  // console.log('response', response);
  return response as Band[];
}

export default async function Metal() {
    const data = await getData();

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
                    <Typography variant="h1">Bands</Typography>
                </Box>
                <Grid container spacing={2}>
                    {data.map((band) => (
                        <Grid key={band.band_id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <BandCard band={band} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}