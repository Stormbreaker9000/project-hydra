'use client';

import { AutoAwesome, CheckCircleRounded } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Chip, Container, Divider, Grid, Typography } from '@mui/material';
import * as React from 'react';

const tiers = [
    {
      title: 'Free',
      price: '0',
      description: [
        '10 users included',
        '2 GB of storage',
        'Help center access',
        'Email support',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
      buttonColor: 'primary',
    },
    {
      title: 'Professional',
      subheader: 'Recommended',
      price: '15',
      description: [
        '20 users included',
        '10 GB of storage',
        'Help center access',
        'Priority email support',
        'Dedicated team',
        'Best deals',
      ],
      buttonText: 'Start now',
      buttonVariant: 'contained',
      buttonColor: 'secondary',
    },
    {
      title: 'Enterprise',
      price: '30',
      description: [
        '50 users included',
        '30 GB of storage',
        'Help center access',
        'Phone & email support',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'outlined',
      buttonColor: 'primary',
    },
  ];

export default function Pricing() {
    return (
        <Container
            id="pricing"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                >
                    Pricing
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary' }}
                >
                    Find metal that sounds similar to the metal you listen to now. but you have to pay for it.
                </Typography>
            </Box>
            <Grid
                container
                spacing={3}
                sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
            >
                {tiers.map((tier) => (
                    <Grid size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }} key={tier.title}>
                        <Card
                            sx={[
                                {
                                    p: 2, 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                },
                                tier.title === 'Professional' &&
                                    ((theme) => ({
                                        border: 'none',
                                        background: 'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                                        boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                                        ...theme.applyStyles('dark', {
                                            background: 'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                                            boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                                        }),
                                    })),
                            ]}
                        >
                            <CardContent>
                                <Box
                                    sx={[
                                        {
                                            mb: 1,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 2,
                                        },
                                        tier.title === 'Professional' 
                                            ? { color: 'grey.100' }
                                            : { color: '' },
                                    ]}
                                >
                                    <Typography component="h3" variant="h6">
                                        {tier.title}
                                    </Typography>
                                    {tier.title === 'Professional' && (
                                        <Chip icon={<AutoAwesome />} label={tier.subheader} />
                                    )}
                                </Box>
                                <Box
                                    sx={[
                                        {
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                        tier.title === 'Professional'
                                            ? { color: 'grey.50' }
                                            : { color: null },
                                    ]}
                                >
                                    <Typography component="h3" variant="h2">
                                        ${tier.price}
                                    </Typography>
                                    <Typography component="h3" variant="h6">
                                        &nbsp; per month
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                                {tier.description.map((line) => (
                                    <Box
                                        key={line}
                                        sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center'}}
                                    >
                                        <CheckCircleRounded 
                                            sx={[
                                                {
                                                    width: 20,
                                                },
                                                tier.title === 'Professional'
                                                    ? { color: 'primary.light' }
                                                    : { color: 'primary.main' },
                                            ]}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            component="span" 
                                            sx={[
                                                tier.title === 'Professional'
                                                    ? { color: 'grey.50' }
                                                    : { color: null },
                                            ]}
                                        >
                                            {line}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                                    color={tier.buttonColor as 'primary' | 'secondary'}
                                >
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}