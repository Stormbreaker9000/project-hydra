import { Box, Typography } from "@mui/material";

import { Container } from "@mui/material"

export default function Loading() {
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
                    marginTop: 12,
                    marginBottom: 12,
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h1">Loading...</Typography>
                </Box>
            </Container>
        </Box>
    );
}