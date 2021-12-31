import { InMemoryCache, makeVar } from "@apollo/client";
import Cookies from "js-cookie";

export const isAuthenticated = makeVar({
  token: !!Cookies.get("ROUTES_AUTH_TOKEN"),
  email: Cookies.get("USER_EMAIL") || null,
  role: Cookies.get("USER_ROLE") || null,
});

export const staffVar = makeVar({
  content: [],
  totalCount: 0,
  currentPage: 1,
  size: 10,
  email: "",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read() {
            return isAuthenticated();
          },
        },
        staff: {
          read() {
            return staffVar();
          },
        },
      },
    },
  },
});
