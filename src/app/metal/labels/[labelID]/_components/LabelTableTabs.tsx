"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

interface LabelTableTabsProps {
  tabs: { label: string; component: React.ReactNode }[];
}

export default function LabelTableTabs({ tabs }: LabelTableTabsProps) {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: "100%", minHeight: "400px" }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.main",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      {tabs[value].component}
    </Box>
  );
}
