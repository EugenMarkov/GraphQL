import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { isAuthenticated } from "../../../cache";
import { setToken } from "../../../utils/auth";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Preloader from "../../common/Preloader";
import ErrorHandler from "../../common/ErrorHandler";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import useStyles from "../useStyles";

/**
 * @desc function for create login form
 * @returns {JSX.Element}
 */
const LoginForm = () => {
  const classes = useStyles();
  const { token } = isAuthenticated();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const handleChange = event => setValues({ ...user, [event.target.name]: event.target.value });

  const handleShowPassword = () => setShowPassword(prev => !prev);

  const USER_LOGIN = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        user {
          email
          id
        }
        token
        error
      }
    }
  `;

  const [signIn, { loading, error }] = useMutation(USER_LOGIN);

  error && setErrorMessage(error.messages.join(" "));

  const submit = () => {
    signIn({ variables: { email: user.email, password: user.password } })
      .then(
        ({
          data: {
            signIn: { user, token, error },
          },
        }) => {
          token && setToken(token, user.email, "USER");
          error && setErrorMessage(error);
        }
      )
      .catch(err => {
        console.log(err);
        setErrorMessage("Network or server error");
      });
  };

  return (
    <section className={`${classes.login_section} container`}>
      <Paper className={classes.form_wrap} elevation={0} sx={{ borderRadius: 1 }}>
        <LockOpenIcon sx={{ color: "#6875F5", fontSize: 40 }} />
        <ValidatorForm className={classes.form_content} noValidate={false} autoComplete="off" onSubmit={submit}>
          <Stack direction="row" spacing={2} sx={{ mb: 1, alignItems: "center" }}>
            <MailOutlineIcon />
            <Typography>Email</Typography>
          </Stack>
          <TextValidator
            variant="outlined"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{
              maxLength: 50,
              className: classes.textInput,
            }}
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "email is not valid"]}
          />
          <Stack direction="row" spacing={2} sx={{ mb: 1, alignItems: "center" }}>
            <LockIcon />
            <Typography>Password</Typography>
          </Stack>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            name="password"
            value={user.password}
            onChange={handleChange}
            InputProps={{
              type: showPassword ? "text" : "password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 30,
              className: classes.textInput,
            }}
            validators={["required"]}
            errorMessages={["This field is required"]}
          />

          <div className={classes.submit_block}>
            {loading ? (
              <Preloader className={classes.preloader} />
            ) : (
              <Button variant="contained" size="large" className={classes.submit_btn} type="submit">
                Login
              </Button>
            )}
          </div>
        </ValidatorForm>
        <ErrorHandler error={errorMessage} />
      </Paper>
    </section>
  );
};

export default LoginForm;
