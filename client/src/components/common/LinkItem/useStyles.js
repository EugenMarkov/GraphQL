import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  link: {
    height: 56,
    width: 186,
    padding: "16px 12px 16px 16px",
    display: "flex",
    textDecoration: "none",
    color: "#4B5563",
    fontSize: 16,
    lineHeight: "24px",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: 8,
  },
  link__selected: {
    background: "#E5EDFF",
    color: "#5850EC",
  },
}));

export default useStyles;
