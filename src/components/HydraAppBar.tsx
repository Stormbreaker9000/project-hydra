import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import HydraLogo from "../../public/orange-hydra-trans.png";
import Image from "next/image";

export default function HydraAppBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image src={HydraLogo} alt="Hydra Logo" width={32} height={32} />
            <Typography variant="h6">Project Hydra</Typography>
            <Box sx={{ flexGrow: 1 }} >
                <Button variant="text" color="secondary" size="small">Get Started</Button>
                <Button variant="text" color="secondary" size="small">Get Started2</Button>
            </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="text" color="secondary" size="small">Sign In</Button>
            <Button variant="contained" color="primary" size="small">Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}