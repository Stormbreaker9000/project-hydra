import { Box, Container, Grid, Typography } from "@mui/material";
import { Label } from "./_data/types";
import LabelCard from "./_components/LabelCard";
import { neon } from '@neondatabase/serverless';

async function getData(): Promise<Label[]> {
    const sql = neon(process.env.DATABASE_URL || '');
    const response = await sql`SELECT * FROM hydra.labels_comprehensive LIMIT 10`;
    return response as Label[];
}

export default async function Labels() {
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
                    <Typography variant="h1">Labels</Typography>
                </Box>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    {data.map((label) => (
                       <Grid key={label.label_id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <LabelCard label={label} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
