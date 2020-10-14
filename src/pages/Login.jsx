import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as MuLink } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { authorize, login, redirect } from "../store/actions";
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MuLink color="inherit" href="#">
        Your Website
      </MuLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [credentials, setCredentials] = React.useState({});
  const state = useSelector((state) => ({
    error: state.error,
    redirectTo: state.redirectTo,
  }));
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login("login", credentials));
  };
  useEffect(() => {
    //alert("s");

    if (state.redirectTo) {
      props.history.push("/");
      dispatch(redirect(false));
    }
  }, [state.redirectTo]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate>
          {state.error && <Alert severity="error">{state.error}!</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials["email"]}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                ["email"]: e.currentTarget.value,
              })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials["password"]}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                ["password"]: e.currentTarget.value,
              })
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuLink href="#" variant="body2">
                Forgot password?
              </MuLink>
            </Grid>
            <Grid item>
              <Link to={"/register"}>
                <MuLink href="#" variant="body2">
                  Don't have an account? Sign Up
                </MuLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
// export default compose(
//   withRouter,
//   connect(
//     (state) => ({ ...state }),
//     (dispatch) => ({
//       login: (param, body) => {
//         dispatch(login(param, body));
//       },
//       setError: (value) => {
//         dispatch(setError(value));
//       },
//     })
//   )
// )(SignIn);
export default withRouter(SignIn);
