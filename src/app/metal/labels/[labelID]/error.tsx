"use client";

import { Box, Button, Container, Typography } from "@mui/material";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h2">Whoops! Something went wrong.</Typography>
          <Typography variant="body1">{error.message}</Typography>
          <Button variant="outlined" color="secondary" onClick={reset}>
            Try again
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
