import { Box, Button, Container, Typography } from "@mui/material";

export default function GenerativeAI() {
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
                <Typography variant="h1">
                    Gen AI Buzzwords
                </Typography>
            </Container>
        </Box>
    )
}