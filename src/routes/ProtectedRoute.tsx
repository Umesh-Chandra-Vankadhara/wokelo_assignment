import React from "react";
import { Outlet } from "react-router-dom";
import { R_LOGIN } from "./route_constants";

const ProtectedRoute = () => {
  const access_token = localStorage.getItem("token");
  const refresh_token = localStorage.getItem("refresh_token");

  const loginUser = () => {
    localStorage.clear();
    window.location.href = R_LOGIN;
  };

  if (!access_token && !refresh_token) {
    loginUser();
    return null;
  }
  return <Outlet />;
};

export default ProtectedRoute;
