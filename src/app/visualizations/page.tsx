import { Box, Container, Typography } from "@mui/material";

export default function Visualizations() {
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
                <Typography variant="h1">Visualizations</Typography>
            </Container>
        </Box>
    )
}