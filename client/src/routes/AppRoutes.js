import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "../cache";

import LoginPage from "../pages/LoginPage";
import PrivateLayout from "../layouts/PrivateLayout";

const RequireAuth = ({ children, auth }) => {
  const location = useLocation();
  return auth ? children : <Navigate to="/signin" state={{ from: location }} />;
};

const Redirect = ({ auth }) => {
  return auth ? <Navigate to="/admin/content" /> : <Navigate to="/signin" />;
};

const AppRoutes = () => {
  const { token } = useReactiveVar(isAuthenticated);

  return (
    <Routes>
      <Route path="admin" element={<Redirect auth={token} />} />
      <Route path="admin/*" element={<RequireAuth auth={token} children={<PrivateLayout />} />} />
      <Route path="signin" element={<LoginPage />} />
      <Route path="*" element={<Redirect auth={token} />} />
    </Routes>
  );
};

export default AppRoutes;
