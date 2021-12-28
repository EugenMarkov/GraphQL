import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  main_section: {
    display: "flex",
  },
  aside: {
    width: 226,
    minHeight: "100vh",
    background: "#F3F4F6",
    padding: "16px 20px 36px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  main: {
    width: "calc(100% - 226px)",
    padding: "26px 37px",
    background: "#FFFFFF",
  },
}));

export default useStyles;
