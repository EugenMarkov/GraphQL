import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  table_section: {
    padding: "10px 0px",

    [theme.breakpoints.down("xs")]: {
      padding: "8px 0px",
    },
  },
  table_title: {
    margin: "16px 0 24px 0 !important",
  },
  table_btn: {
    width: 140,
    height: 36,
    margin: "0 20px",
  },
  tablefield_id: {
    maxWidth: 200,
    fontSize: 16,
  },
  tablefield_email: {
    width: 200,
    fontSize: 16,
  },
  tablefield_role: {
    textAlign: "center",
    fontSize: 16,
  },
  tablefield_title: {
    width: 350,
    fontSize: 16,
  },
  tablefield_description: {
    width: 400,
    fontSize: 16,
  },
  table_filter: {
    display: "flex",
    alignItems: "center",
    minWidth: 200,
  },
  tablefield_type: {
    width: 250,
    fontSize: 16,
  },
  tablefield_size: {
    width: 200,
    fontSize: 16,
  },
}));

export default useStyles;
