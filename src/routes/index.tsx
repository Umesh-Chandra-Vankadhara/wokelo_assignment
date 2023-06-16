import React from "react";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "components/reusable/ErrorBoundary";
import LoadingPage from "components/pages/LoadingPage";
import { NoMatch } from "components/pages/NoMatch";
import * as UIRoutes from "routes/route_constants";
import ProtectedRoute from "./ProtectedRoute";

const LandingPage = lazy(() => import("components/LandingPage"));
const Login = lazy(() => import("components/Login"));
const CompaniesList = lazy(() => import("components/CompaniesList"));

export const Navigation = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path={UIRoutes.R_COMPANIES_LIST}
              element={<CompaniesList />}
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path={UIRoutes.R_ROOT} element={<LandingPage />} />
          <Route path={UIRoutes.R_LOGIN} element={<Login />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
