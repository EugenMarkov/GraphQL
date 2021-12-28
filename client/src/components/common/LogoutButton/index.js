import { useReactiveVar } from "@apollo/client";
import { isAuthenticated } from "../../../cache";
import { removeToken } from "../../../utils/auth";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import useStyles from "./useStyles";

/**
 * @desc function for create logout ui
 * @returns {JSX.Element}
 */
const LogoutButton = () => {
  const classes = useStyles();

  const { email } = useReactiveVar(isAuthenticated);

  const logOut = () => {
    removeToken();
  };

  return (
    <Box>
      <Typography noWrap className={classes.email}>
        {email}
      </Typography>
      <Button
        className={classes.logout_btn}
        variant="text"
        sx={{ height: 56, justifyContent: "flex-start", fontSize: 16, padding: "16px", borderRadius: "8px" }}
        onClick={logOut}
      >
        <LogoutIcon className={classes.btn_icon} />
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;
