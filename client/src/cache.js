import { InMemoryCache, makeVar } from "@apollo/client";
import Cookies from "js-cookie";

export const isAuthenticated = makeVar({
  token: !!Cookies.get("ROUTES_AUTH_TOKEN"),
  email: Cookies.get("USER_EMAIL") || null,
  role: Cookies.get("USER_ROLE") || null,
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
      },
    },
  },
});
