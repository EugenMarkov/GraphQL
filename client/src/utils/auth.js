import Cookies from "js-cookie";
import { isAuthenticated } from "../cache";

export const setToken = (token, email, role) => {
  isAuthenticated({ token: true, email, role });
  Cookies.set("ROUTES_AUTH_TOKEN", `Bearer ${token}`, {
    expires: 1,
    sameSite: "strict",
    secure: true,
  });
  Cookies.set("USER_ROLE", role, {
    expires: 1,
    sameSite: "strict",
    secure: true,
  });
  Cookies.set("USER_EMAIL", email, {
    expires: 1,
    sameSite: "strict",
    secure: true,
  });
};

export const removeToken = () => {
  isAuthenticated({ token: null, email: null, role: null });
  Cookies.remove("ROUTES_AUTH_TOKEN");
  Cookies.remove("USER_ROLE");
  Cookies.remove("USER_EMAIL");
};
