import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Paper, Stack } from "@mui/material";
import theme from "theme";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack
      justifyContent="space-between"
      component={Paper}
      elevation={1}
      sx={{ p: 2, width: "95vw", borderRadius: "0px" }}
    >
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 400,
          fontStyles: "normal",
          width: "max-content",
        }}
      >
        Back
      </Button>
    </Stack>
  );
};
