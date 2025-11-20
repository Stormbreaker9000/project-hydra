import { Box, Container, Typography } from "@mui/material";

export default function Loading() {
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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h1">Loading...</Typography>
        </Box>
      </Container>
    </Box>
  );
}
