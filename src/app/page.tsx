import HydraAppBar from "@/components/HydraAppBar";
import { Box, Button, Container, Typography } from "@mui/material";
import HydraLogoWords from "../../public/orange-hydra-words-trans.png";
import Image from "next/image";
import Hero from "@/components/Hero";
import LogoCollection from "@/components/LogoCollection";

export default function Home() {
  return (
    <div>
      <HydraAppBar />
      <Hero />
      <div>
        <LogoCollection />
      </div>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", justifyContent: "center", height: "100vh", width: "100%" }}>
          <Image src={HydraLogoWords} alt="Hydra Logo" width={500} height={500} />
          <Typography variant="h2">Just some stuff for me to play with</Typography>
          <Button variant="contained" color="primary">Get Started</Button>
        </Box>
      </Container>
    </div>
  );
}
