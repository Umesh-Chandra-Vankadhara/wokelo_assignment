import React, { useState } from "react";
import { Box, Button, OutlinedInput, Stack, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import companyLogo from "../assets/companyLogo.png";
import axios from "axios";
import { R_COMPANIES_LIST } from "routes/route_constants";
import { useNavigate } from "react-router-dom";

interface State {
  username: string;
  password: string;
}

export const useStyles = makeStyles(() =>
  createStyles({
    inputStyles: {
      minWidth: "400px",
      maxWidth: "800px",
    },
    wishStyles: {
      fontSize: "65px",
      fontWeight: 600,
      wordBreak: "break-word",
      lineHeight: 1,
    },
  })
);

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [state, setState] = useState<State>({ username: "", password: "" });
  const { username, password } = state;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState((prev: State) => {
      if (name === "username") return { ...prev, username: value };
      if (name === "password") return { ...prev, password: value };
      return prev;
    });
  };

  const handleSubmit = async () => {
    const url = "https://wokelo-dev.eastus.cloudapp.azure.com/api/token/";
    try {
      const response = await axios.post(url, {
        username,
        password,
      });
      localStorage.setItem("token", response?.data?.access);
      localStorage.setItem("refresh-token", response?.data?.refresh);
      if (response.data.access && response.data.refresh)
        navigate(R_COMPANIES_LIST);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", position: "relative" }}
      gap={2}
    >
      <img
        src={companyLogo}
        alt="logo"
        style={{ position: "absolute", top: 10, left: 5 }}
      />
      <Stack gap={2} sx={{ position: "absolute", top: 100 }}>
        <Typography className={classes.wishStyles}>
          Hello, <br />
          welcome
        </Typography>
        <Typography>Log in to get started</Typography>
        <Box>
          <Typography gutterBottom>Username</Typography>
          <OutlinedInput
            value={username}
            onChange={handleOnChange}
            type="text"
            name="username"
            placeholder="Enter Username"
            className={classes.inputStyles}
          />
        </Box>
        <Box>
          <Typography gutterBottom>Password</Typography>
          <OutlinedInput
            value={password}
            onChange={handleOnChange}
            type="text"
            name="password"
            placeholder="Enter Password"
            className={classes.inputStyles}
          />
        </Box>
      </Stack>
      <Stack sx={{ justifyContent: "flex-end", width: "max-content" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            username.trim().length === 0 || password.trim().length === 0
          }
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
