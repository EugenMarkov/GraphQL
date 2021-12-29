import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  error_wrap: {
    minHeight: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  error_text: {
    padding: 10,
    textAlign: "center",
    lineHeight: "14px !important",
    fontSize: "12px !important",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px !important",
    }
  },
}));

export default useStyles;
