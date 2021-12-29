import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "../cache";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import PrivateLayout from "../layouts/PrivateLayout";

const RequireAuth = ({ auth, children }) => {
  const location = useLocation();
  return auth ? children : <Navigate to="/signin" state={{ from: location }} />;
};

const Redirect = ({ auth, children }) => {
  return auth ? <Navigate to="/admin/content" /> : children;
};

const AppRoutes = () => {
  const { token } = useReactiveVar(isAuthenticated);

  return (
    <Routes>
      <Route path="admin" element={<Redirect auth={token} />} />
      <Route path="admin/*" element={<RequireAuth auth={token} children={<PrivateLayout />} />} />
      <Route path="signin" element={<Redirect auth={token} children={<LoginPage />} />} />
      <Route path="signup" element={<Redirect auth={token} children={<SignUpPage />} />} />
      <Route path="*" element={<Redirect auth={token} children={<Navigate to="/signin" />} />} />
    </Routes>
  );
};

export default AppRoutes;
