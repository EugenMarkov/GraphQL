import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Box from "@mui/material/Box";
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
import PersonOutlineOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import useStyles from "../useStyles";

/**
 * @desc function for create sign up form
 * @returns {JSX.Element}
 */
const SignUpForm = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setValues] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = event => setValues({ ...user, [event.target.name]: event.target.value });

  const handleShowPassword = () => setShowPassword(prev => !prev);

  const USER_SIGN_UP = gql`
    mutation signUp($email: String!, $name: String!, $password: String!) {
      signUp(email: $email, name: $name, password: $password) {
        status
        error
      }
    }
  `;

  const [signUp, { loading }] = useMutation(USER_SIGN_UP);

  const submit = () => {
    signUp({ variables: { email: user.email, name: user.name, password: user.password } })
      .then(
        ({
          data: {
            signUp: { status, error },
          },
        }) => {
          status === "success" && navigate("/signin");
          error && setErrorMessage(error);
        }
      )
      .catch(err => {
        setErrorMessage(err.message);
      });
  };

  return (
    <section className={`${classes.section} container`}>
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
            <PersonOutlineOutlineIcon />
            <Typography>Name</Typography>
          </Stack>
          <TextValidator
            variant="outlined"
            name="name"
            value={user.name}
            onChange={handleChange}
            className={classes.textField}
            inputProps={{
              maxLength: 50,
              className: classes.textInput,
            }}
            validators={["required"]}
            errorMessages={["This field is required"]}
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

          <Box sx={{ display: "flex" }}>
            <Link to="/signin" className={classes.link}>
              Login
            </Link>
          </Box>

          <div className={classes.submit_block}>
            {loading ? (
              <Preloader className={classes.preloader} />
            ) : (
              <Button variant="contained" size="large" className={classes.submit_btn} type="submit">
                Sign up
              </Button>
            )}
          </div>
        </ValidatorForm>
        <ErrorHandler error={errorMessage} />
      </Paper>
    </section>
  );
};

export default SignUpForm;
