import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  error_wrap: {
    minHeight: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  error_text: {
    padding: 10,
    textAlign: "center",
    fontSize: 14,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    }
  },
}));

export default useStyles;
