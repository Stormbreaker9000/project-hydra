import { Box, Container, Typography } from "@mui/material";

import { neon } from '@neondatabase/serverless';

async function getData() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT * FROM bands LIMIT 10`;
  // console.log('response', response);
  return response;
}

interface Band {
    band_id: number;
    name: string;
    url: string;
    country: string;
    genre: string;
    status: string;
    photo_url: string | null;
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
                    height: "100vh",
                    width: "100%",
                }}
            >
                <Typography variant="h1">Metal</Typography>
                <>{data.map((band) => (
                    <Typography variant="h2">{band.name}</Typography>
                ))}</>
            </Container>
        </Box>
    )
}