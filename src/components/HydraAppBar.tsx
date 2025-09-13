'use client'

import { alpha, AppBar, Box, Button, Container, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import HydraLogo from "../../public/orange-hydra-trans.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backgroundColor: theme.vars ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)` : alpha(theme.palette.background.default, 0.4),
  backdropFilter: "blur(10px)",
  boxShadow: (theme.vars ||theme).shadows[1],
  padding: "8px 12px",
  border: `1px solid`,
  borderColor: (theme.vars || theme).palette.divider,
}));

const MenuItems = [
  {
    title: "Bands",
  },
  {
    title: "Labels",
  },
  {
    title: "Albums",
  },
]

export default function HydraAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" enableColorOnDark sx={{ boxShadow: 0, bgcolor: "transparent", backgroundImage: "none", mt: 'calc(var(--template-frame-height, 0px) + 28px)' }}>
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Image src={HydraLogo} alt="Hydra Logo" width={32} height={32} />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Project Hydra</Typography>
              <Box sx={{ flexGrow: 1 }} >
                  <Button variant="text" color="secondary" size="small" component={Link} href="/marketing">Marketing</Button>
                  <Button variant="text" color="secondary" size="small" component={Link} href="/dashboard">Dashboard</Button>
                  <Button variant="text" color="secondary" size="small" component={Link} href="/checkout">Checkout</Button>
                  <Button variant="text" color="secondary" size="small" component={Link} href="/blog">Blog</Button>
                  <Button
                    variant="text"
                    color="secondary"
                    size="small"
                    onClick={handleClick}
                  >
                    Metal
                  </Button>
                  <Menu 
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    {MenuItems.map((item) => (
                      <MenuItem key={item.title} component={Link} href={'/metal'}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Menu>
              </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button variant="text" color="secondary" size="small" component={Link} href="/signin">Sign In</Button>
              <Button variant="text" color="secondary" size="small" component={Link} href="/signin-side">Sign In 2</Button>
              <Button variant="contained" color="primary" size="small" component={Link} href="/signup">Sign Up</Button>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}