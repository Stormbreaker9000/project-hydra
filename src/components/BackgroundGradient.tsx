"use client";

import { Box, Container } from "@mui/material";

export default function BackgroundGradient({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={(theme) => ({
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
            ...theme.applyStyles("dark", {
                backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(48, 100.00%, 16.10%), transparent)",
            })
        })}>
            <Container maxWidth="lg">
                <Box sx={{ width: "100%", height: "100%", pt: 12, pb: 12 }}>
                    {children}
                </Box>
            </Container>
        </Box>
    )
}