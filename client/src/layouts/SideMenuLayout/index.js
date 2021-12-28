import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import useStyles from "./useStyles";

const SideMenuLayout = () => {
  const classes = useStyles();

  return (
    <Box>
      <img className={classes.logo} src="/img/logo.svg" alt="logo" />
      <Outlet />
    </Box>
  );
};

export default SideMenuLayout;
