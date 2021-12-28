import { createTheme } from "@mui/material/styles";
import { enUS } from "@mui/material/locale";

const theme = createTheme(
  {
    breakpoints: {
      keys: ["xs", "sm", "md", "lg", "xl"],
      values: {
        xs: 0,
        sm: 600,
        md: 1000,
        lg: 1280,
        xl: 1440,
      },
    },
    palette: {
      primary: {
        main: "#393737",
        light: "#C5C7DE",
        decor: "#6875F5",
      },
    },
    spacing: 5,
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      h3: {
        fontSize: "22 !important",
        lineHeight: "24px",
        fontWeight: 700,
        letterSpacing: "0.5px",
      },
    },

    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: 16,
            color: "#4B5563",
          },
          body1: {
            lineHeight: "24px",
          },
          body2: {
            color: "#C5C7DE",
            lineHeight: "18px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            height: 42,
            lineHeight: "20px",
            textTransform: "none",
            borderRadius: 5,
            fontWeight: 500,
            fontSize: 18,
            minWidth: 40,
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "transparent",
            },
          },
          contained: {
            color: "#FFFFFF",
            boxShadow: "none",
            background: "#6875F5",
            "&:hover": {
              color: "#FFFFFF",
              boxShadow: "none",
              background: "#5850EC",
            },
            "&.Mui-disabled": {
              color: "#6875F5",
              boxShadow: "none",
              background: "#B4C6FC",
              cursor: "not-allowed",
              pointerEvents: "auto",
            },
          },
          containedSecondary: {
            background: "#362F78",
          },
          sizeLarge: {
            height: 52,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            background: "#F6F7FF",
            borderRadius: 5,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: 14,
            lineHeight: "20px",
            margin: "7px 0 0 0",
            position: "relative",
          },
        },
      },
    },
  },
  enUS
);

export default theme;
