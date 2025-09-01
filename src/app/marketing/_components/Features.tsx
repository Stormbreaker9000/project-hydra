"use client";

import { useState } from "react";
import { Box, Chip, Typography, styled, Container, Button, Card } from "@mui/material";
import { ViewQuiltRounded, EdgesensorHighRounded, DevicesRounded } from "@mui/icons-material";

const items = [
    {
      icon: <ViewQuiltRounded />,
      title: 'Dashboard',
      description:
        'This item could provide a snapshot of the most important metrics or data points related to the product.',
      imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/images/templates/templates-images/dash-light.png")`,
      imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/images/templates/templates-images/dash-dark.png")`,
    },
    {
      icon: <EdgesensorHighRounded />,
      title: 'Mobile integration',
      description:
        'This item could provide information about the mobile app version of the product.',
      imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/images/templates/templates-images/mobile-light.png")`,
      imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/images/templates/templates-images/mobile-dark.png")`,
    },
    {
      icon: <DevicesRounded />,
      title: 'Available on all platforms',
      description:
        'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
      imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/images/templates/templates-images/devices-light.png")`,
      imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/images/templates/templates-images/devices-dark.png")`,
    },
  ];

interface ChipProps {
    selected?: boolean;
}

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
    variants: [
        {
        props: ({ selected }) => !!selected,
        style: {
            background:
            'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
            color: 'hsl(0, 0%, 100%)',
            borderColor: (theme.vars || theme).palette.primary.light,
            '& .MuiChip-label': {
            color: 'hsl(0, 0%, 100%)',
            },
            ...theme.applyStyles('dark', {
            borderColor: (theme.vars || theme).palette.primary.dark,
            }),
        },
        },
    ],
}));

export default function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const handleItemClick = (index: number) => {
        setSelectedItemIndex(index);
    }

    const selectedItem = items[selectedItemIndex];

    return (
        <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
            <Box>
            <Typography
                component="h2"
                variant="h4"
                gutterBottom
                sx={{ color: 'text.primary' }}
            >
                What it do
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
            >
                Provide a brief overview of the key features of the product. For example,
                you could list the number of features, their types or benefits, and
                add-ons.
            </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row-reverse' },
                    gap: 2,
                }}
            >
                <div>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 2,
                            height: '100%',
                        }}
                    >
                        {items.map(({icon, title, description}, index) => (
                            <Box
                                key={index}
                                component={Button}
                                onClick={() => handleItemClick(index)}
                                sx={[
                                    (theme) => ({
                                        p: 2,
                                        height: '100%',
                                        width: '100%',
                                        '&:hover': {
                                            backgroundColor: (theme.vars || theme).palette.action.hover,
                                        },
                                    }),
                                    selectedItemIndex === index && {
                                        backgroundColor: 'action.selected',
                                    },
                                ]}
                            >
                                <Box
                                    sx={[{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'left',
                                            gap: 1,
                                            textAlign: 'left',
                                            textTransform: 'none',
                                            color: 'text.secondary',
                                        },
                                        selectedItemIndex === index && {
                                            color: 'text.primary',
                                        },
                                    ]}
                                >
                                    {icon}
                                    <Typography variant="h6">{title}</Typography>
                                    <Typography variant="body2">{description}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </div>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        width: { xs: '100%', md: '70%' },
                        height: 'var(--items-image-height)',
                    }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                        height: '100%',
                        width: '100%',
                        display: { xs: 'none', sm: 'flex' },
                        pointerEvents: 'none',
                        }}
                    >
                    <Box
                        sx={(theme) => ({
                            m: 'auto',
                            width: 420,
                            height: 500,
                            backgroundSize: 'contain',
                            backgroundImage: 'var(--items-imageLight)',
                            ...theme.applyStyles('dark', {
                            backgroundImage: 'var(--items-imageDark)',
                            }),
                        })}
                        style={
                            items[selectedItemIndex]
                            ? ({
                                '--items-imageLight': items[selectedItemIndex].imageLight,
                                '--items-imageDark': items[selectedItemIndex].imageDark,
                                } as any)
                            : {}
                        }
                        />
                    </Card>
                </Box>
            </Box>
        </Container>
    )
}