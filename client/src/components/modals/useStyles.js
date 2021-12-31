import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    boxShadow: theme.shadows[5],
    minWidth: 300,
    "&:focus": {
      outline: "none",
    },
  },
  modal_wrap: {
    padding: "40px 25px 25px 25px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: 500,
    minWidth: 260,
    margin: "0 auto",
    boxSizing: "border-box",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
    [theme.breakpoints.down("xs")]: {
      width: 300,
      padding: "40px 15px 15px 15px",
    },
  },
  modal_text: {
    fontSize: "18px !important",
    lineHeight: "21px",
    overflow: "hidden",
    marginBottom: "16px !important",
  },
  modal_buttons: {
    marginTop: 50,
    display: "flex",
    justifyContent: "space-between",
  },
  modal_btn: {
    height: 49,
    width: 100,
  },
  modal_close_btn: {
    position: "absolute !important",
    top: 0,
    right: 0,
    height: 40,
    width: 40,
    color: "#6875F5 !important",
  },
  modal_success_icon: {
    height: 30,
    width: 30,
    margin: "0 auto 10px",
    color: theme.palette.success.main,
  },
  modal_error_icon: {
    height: 30,
    width: 30,
    margin: "0 auto 10px",
    color: theme.palette.error.main,
  },
  modal_number_input: {
    width: 100,
    margin: "0 auto !important",
  },
  modal_autocomplete: {
    paddingLeft: "14px !important",
    cursor: "pointer",
  },
  modal_autocomplete_input: {
    width: "200px !important",
    marginBottom: 50,
  },
}));

export default useStyles;
