'use client';

import { Box, Typography, Container, Stack, FormLabel, FormControl, TextField, Checkbox, FormControlLabel, Button, Link, Divider } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import { FacebookIcon, GoogleIcon, SitemarkIcon } from "./_components/CustomIcons";
import ForgotPassword from "./_components/ForgotPassword";

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    boxShadow: 
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 90%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (emailError || passwordError) {
            event.preventDefault();
            return;
        }

        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
    }

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Invalid email address');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 8 characters long');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
        
        
        return isValid;
    };

    return (
        <div>
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.25rem)',
                        }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField 
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField 
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <ForgotPassword open={open} handleClose={handleClickClose} />
                        <Button variant="contained" color="primary" type="submit" onClick={validateInputs}>Sign in</Button>
                        <Link
                            component={Button}
                            type="button"
                            onClick={handleClickOpen}
                            variant="body2"
                            sx={{
                                alignSelf: 'center',
                            }}
                        >
                            Forgot password?
                        </Link>
                        <Divider>or</Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => alert('TODO: Add Google sign in')}
                                startIcon={<GoogleIcon />}
                            >
                                Google
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => alert('TODO: Add Facebook sign in')}
                                startIcon={<FacebookIcon />}
                            >
                                Facebook
                            </Button>
                            <Typography sx={{ textAlign: 'center' }}>
                                Don't have an account? <Link href="/signup">Sign up</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </SignInContainer>
        </div>
    )
}
