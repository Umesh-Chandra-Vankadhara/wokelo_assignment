/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Box, Typography, SxProps, Button, Stack } from "@mui/material";
import theme from "../theme";
import logo from "../assets/landingLogo.png";
import { R_LOGIN } from "routes/route_constants";
import { useNavigate } from "react-router-dom";

const titleStyles: SxProps = {
  fontSize: "80px",
  textAlign: "center",
  fontWeight: 600,
  lineHeight: 1,
};

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Stack sx={{ height: "50vh", position: "absolute", top: 100 }} gap={2}>
        <Box>
          <Typography
            color={theme.palette.text.primary}
            sx={{ ...titleStyles }}
          >
            Welcome to
          </Typography>
          <Typography
            color={theme.palette.primary.main}
            sx={{ ...titleStyles }}
          >
            Wokelo
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ textAlign: "center", fontSize: "13px", fontWeight: 600 }}
          >
            Wokelo is a generative AI-powered research assistant platform. It
            helps
            <br />
            generate sector analysis and company deep dives in minutes
          </Typography>
        </Box>
      </Stack>
      <Stack
        sx={{ position: "absolute", bottom: 0, height: "50vh" }}
        justifyContent="center"
      >
        <Button
          variant="contained"
          sx={{
            width: "max-content",
            position: "absolute",
            top: -20,
            left: "43%",
            fontWeight: 700,
          }}
          onClick={() => navigate(R_LOGIN)}
        >
          Get Started
        </Button>
        <img
          src={logo}
          alt="image"
          style={{ objectFit: "contain", aspectRatio: "1/1" }}
        />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
