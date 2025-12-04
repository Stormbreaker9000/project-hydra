import { Box, Button, Container, Divider, Typography } from "@mui/material";
import HydraLogoWords from "../../public/orange-hydra-words-trans.png";
import Image from "next/image";
import BackgroundGradient from "@/components/BackgroundGradient";
import ReactRiberTest from "@/components/ReactRiberTest";
import MapBoxTest from "@/components/MapBoxTest";

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Image src={HydraLogoWords} alt="Hydra Logo" width={500} height={500} />
        <Typography variant="h2">Just some stuff for me to play with</Typography>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Box>
      <Typography
        variant="h1"
        className="flex flex-col items-center justify-center text-8xl font-bold"
      >
        Tailwind CSS Test!
      </Typography>
      <ReactRiberTest />
      <MapBoxTest />
    </Box>
  );
}
