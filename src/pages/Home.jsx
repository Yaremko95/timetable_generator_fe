import React, { useState } from "react";
import AuthHoc from "../components/auth/withAuth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import TimetableLoad from "../components/form/TimetableLoad";

function Home(props) {
  const [form, showForm] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => showForm(true)}
      >
        Create New Timetable
      </Button>
      {form && <TimetableLoad />}
    </div>
  );
}

export default AuthHoc(Home);
