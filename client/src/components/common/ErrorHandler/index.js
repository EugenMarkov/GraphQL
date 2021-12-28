import { Typography } from "@mui/material";
import useStyles from "./useStyles";

const ErrorHandler = ({ error }) => {
  const classes = useStyles();

  const errorText = `Error: ${error ? error : "Something went wrong"}.`;

  return (
    <div className={classes.error_wrap}>
      {error && (
        <Typography color="error" className={classes.error_text}>
          {errorText}
        </Typography>
      )}
    </div>
  );
};

export default ErrorHandler;
