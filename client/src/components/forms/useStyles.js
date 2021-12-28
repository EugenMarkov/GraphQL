import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  login_section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  form_wrap: {
    width: 400,
    minHeight: 415,
    boxSizing: "border-box",
    borderRadius: 10,
    padding: "30px 32px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  form_content: {
    width: "100%",
  },
  textField: {
    width: "100%",
    height: 85,
    marginBottom: "12px !important",
    fontSize: 18,
  },
  textInput: {
    fontSize: 18,
    background: "#F6F7FF",
  },
  submit_block: {
    margin: "5px 0 10px 0",
  },
  submit_btn: {
    width: "100%",
    letterSpacing: "2px",
    padding: "14px 30px",
  },
  preloader: {
    height: 52,
    width: 144,
  },
}));

export default useStyles;
