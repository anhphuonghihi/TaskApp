import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes, publicRoutes } from "../routes";
import AuthLayout from "../layout/AuthLayout";
import AppLayout from "../layout/AppLayout";
const Router = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {accesstoken &&
          authRoutes.map(({ path, Component }) => (
            <Route path={path} key={path} element={<Component />} />
          ))}
      </Route>
      <Route path="/" element={<AuthLayout />}>
        {!accesstoken && publicRoutes.map(({ path, Component }) => (
          <Route path={path} key={path} element={<Component />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;
