"use client";

import { Box, Button, Container, Link, Stack, styled, TextField, Typography } from "@mui/material";

const StyledBox = styled('div')(({ theme }) => ({
    alignSelf: 'center',
    width: '100%',
    height: 400,
    marginTop: theme.spacing(8),
    borderRadius: (theme.vars || theme).shape.borderRadius,
    outline: '6px solid',
    outlineColor: 'hsla(220, 25%, 80%, 0.2)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.grey[200],
    boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
    backgroundImage: `url('/ford-mustang-gtd-1.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
        height: 700,
    },
    ...theme.applyStyles('dark', {
        boxShadow: '0 0 24px 12px hsla(48, 100%, 25%, 0.2)',
        backgroundImage: `url('/ford-mustang-gtd-1.jpg')`,
        outlineColor: 'hsla(58, 20%, 42%, 0.1)',
        borderColor: (theme.vars || theme).palette.grey[700],
    }),
}));

export default function Hero() {
  return (
    <Box
        id="hero"
        sx={(theme) => ({
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
            ...theme.applyStyles("dark", {
                backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(48, 100.00%, 16.10%), transparent)",
            })
        })}>
        <Container
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }}
        >
            <Stack 
                spacing={2}
                useFlexGap
                sx={{
                    alignItems: 'center',
                    maxWidth: { xs: '100%', sm: '70%' },
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                    }}
                >
                    Make&nbsp;sense&nbsp;of&nbsp;all&nbsp;the&nbsp;
                    <Typography
                        component="span"
                        variant="h1"
                        sx={(theme) => ({
                            fontSize: "inherit",
                            color: "primary.main",
                            ...theme.applyStyles("dark", {
                                color: "secondary.main",
                            })
                        })}
                    >
                        metal
                    </Typography>
                </Typography>
                <Typography
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        width: { xs: "100%", sm: "70%" },
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </Typography>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    useFlexGap
                    sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        sx={{
                            width: { xs: "100%", sm: "300px" },
                        }}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        sx={{
                            minWidth: "fit-content",
                        }}
                    >
                        Subscribe
                    </Button>
                </Stack>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                >
                    By clicking &quot;Subscribe&quot; you agree to our&nbsp;
                    <Link href="#" color="primary">
                        Terms & Conditions
                    </Link>
                    .
                </Typography>
            </Stack>
            <StyledBox />
      </Container>
    </Box>
  );
}