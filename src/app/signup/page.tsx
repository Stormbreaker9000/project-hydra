import { Box, Container, Typography } from "@mui/material";

export default function SignUp() {
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
                <Typography variant="h1">Sign Up</Typography>
            </Container>
        </Box>
    )
}