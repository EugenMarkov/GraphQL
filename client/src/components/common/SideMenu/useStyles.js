import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  nav: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 13,
  },
}));

export default useStyles;
