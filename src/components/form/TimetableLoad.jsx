import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "50%",
    },
  },
}));
function TimetableLoad(props) {
  const classes = useStyles();
  const [credentials, setCredentials] = React.useState({});
  const [state, setState] = React.useState({
    Sun: false,
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
  });
  const submitData = (e) => {
    e.preventDefault();
    const weekDays = [];

    Object.keys(state).forEach((day, i) => {
      if (state[day]) {
        weekDays.push(i);
      }
    });
    setCredentials({
      ...credentials,
      weekDays,
    });
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" component="h6">
        Timetable
      </Typography>
      <TextField
        required
        id="standard-required"
        label="Title"
        variant="standard"
        value={credentials["title"]}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            ["title"]: e.currentTarget.value,
          })
        }
      />
      <TextField
        required
        id="standard-required"
        label="Total hours"
        variant="standard"
        value={credentials["total_hours"]}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            ["total_hours"]: e.currentTarget.value,
          })
        }
      />
      <TextField
        required
        id="standard-required"
        label="Total days"
        variant="standard"
        value={credentials["total_days"]}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            ["total_days"]: e.currentTarget.value,
          })
        }
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Sun}
              onChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.checked,
                })
              }
              name="Sun"
            />
          }
          label="Sun"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Mon}
              onChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.checked,
                })
              }
              name="Mon"
            />
          }
          label="Mon"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Tue}
              onChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.checked,
                })
              }
              name="Tue"
            />
          }
          label="Tue"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Wed}
              onChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.checked,
                })
              }
              name="Wed"
            />
          }
          label="Wed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Thu}
              onChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.checked,
                })
              }
              name="Thu"
            />
          }
          label="Thu"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Fri}
              onChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.checked,
                })
              }
              name="Fri"
            />
          }
          label="Fri"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Sat}
              onChange={(event) =>
                setState({
                  ...state,
                  [event.target.name]: event.target.checked,
                })
              }
              name="Sat"
            />
          }
          label="Sat"
        />
      </FormGroup>
      {/*<Typography variant="h6" component="h6">*/}
      {/*  Classrooms*/}
      {/*</Typography>*/}
      {/*  <TextField*/}
      {/*      required*/}
      {/*      id="standard-required"*/}
      {/*      label="classroom"*/}
      {/*      variant="standard"*/}
      {/*      value={credentials["total_days"]}*/}
      {/*      onChange={(e) =>*/}
      {/*          setCredentials({*/}
      {/*              ...credentials,*/}
      {/*              ["total_days"]: e.currentTarget.value,*/}
      {/*          })*/}
      {/*      }*/}
      {/*  />*/}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ width: "10%" }}
        onClick={submitData}
      >
        Submit
      </Button>
    </form>
  );
}

export default TimetableLoad;
