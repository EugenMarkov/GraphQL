import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink } from "@apollo/client";
import { cache } from "./graphql/cache";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";

import theme from "./theme";
import "./index.css";

const link = createHttpLink({
  uri: "http://localhost:5000",
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: cache,
  link,
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
