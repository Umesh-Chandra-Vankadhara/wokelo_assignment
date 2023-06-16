import { Box, Stack } from "@mui/material";
import {
  HistoryIcon,
  HomeIcon,
  LogoIcon,
  SettingsIcon,
} from "components/Icons";
import React from "react";
import theme from "theme";

export const Sidebar = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        background: theme.palette.text.primary,
        p: 2,
        width: "100px",
      }}
      gap={2}
    >
      <Box sx={{ mb: 2 }}>
        <LogoIcon />
      </Box>
      <HomeIcon />
      <HistoryIcon />
      <SettingsIcon />
    </Stack>
  );
};
