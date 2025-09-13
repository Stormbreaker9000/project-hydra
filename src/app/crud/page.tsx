'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import DashboardLayout from './_components/DashboardLayout';
import EmployeeList from './_components/EmployeeList';
import NotificationsProvider from './_hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './_hooks/useDialogs/DialogsProvider';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './_theme/customizations';

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function CrudDashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <DashboardLayout>
            <EmployeeList />
          </DashboardLayout>
        </DialogsProvider>
      </NotificationsProvider>
    </>
  );
}