import { Box, Typography, Container } from "@mui/material";

export default function SignIn() {
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
                    Sign In
                </Typography>
            </Container>
        </Box>
    )
}