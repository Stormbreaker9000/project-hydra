'use client';
import * as React from 'react';
// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-charts/themeAugmentation';
// import type {} from '@mui/x-data-grid-pro/themeAugmentation';
// import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './_components/AppNavBar';
import Header from './_components/Header';
import MainGrid from './_components/MainGrid';
import SideMenu from './_components/SideMenu';

// import {
//   chartsCustomizations,
//   dataGridCustomizations,
//   datePickersCustomizations,
//   treeViewCustomizations,
// } from './theme/customizations';

// const xThemeComponents = {
//   ...chartsCustomizations,
//   ...dataGridCustomizations,
//   ...datePickersCustomizations,
//   ...treeViewCustomizations,
// };

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (

      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 10 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>

  );
}