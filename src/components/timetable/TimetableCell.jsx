import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAvailableSlots, setError } from "../../store/actions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { createUseStyles } from "react-jss";
import { HiSearch } from "react-icons/hi";
import { VscEdit } from "react-icons/vsc";
import colors from "../../clors";
const TimetableCell = React.forwardRef((props, ref) => {
  const { cell, cl } = props;
  const useStyles = createUseStyles({
    container: {
      fontSize: "0.6rem",
      position: "absolute",
      border: "1px solid #ffffff",
      backgroundColor:
        colors[Math.floor(Math.random() * Math.floor(colors.length))],
      width: cell.width - 1,
      height: cell.height * cl.duration - cl.duration - 1,
      zIndex: "100",
      color: "whitesmoke",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      //alignItems: "center",
      ...props.style,
      // "&:hover": {
      "&:hover::after": {
        position: "absolute",
        zIndex: "500",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        //background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
        content: '""',
        // backgroundColor: "rgba(255,255,255, 0.4)",
        //},
      },
    },
  });
  const classes = useStyles();

  const state = useSelector((state) => ({
    classes: state.classes,
    filled: state.filled,
  }));
  const [isHovering, setISHovering] = useState(false);
  const handleMouseHover = () => {
    setISHovering(!isHovering);
  };

  return (
    <>
      <div
        onClick={props.onClick}
        ref={ref}
        style={{ ...props.style }}
        className={classes.container}
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
      >
        {/*<span> {cl.id}</span>*/}
        <span>
          {" "}
          <b>
            {cl.subject} {cl.id}
          </b>
        </span>
        <span>
          {" "}
          Teacher: <i>{cl.teacher.name + " " + cl.teacher.surname}</i>
        </span>
        <span>
          Groups: <i>{cl.groups.map((el) => el.title).join(", ")}</i>
        </span>
        {/*<span>{cl.classrooms.map((el) => el.id).join(", ")}</span>*/}
        <span>Duration: {cl.duration + "hrs"}</span>
        {isHovering && (
          <>
            <span
              style={{
                fontSize: "0.7rem",
                position: "absolute",
                bottom: "2px",
                right: "2px",
                color: "white",
                zIndex: "600",
              }}
            >
              Click to see available time
              {/*Search for available time <HiSearch />*/}
            </span>

            <VscEdit
              style={{
                fontSize: "0.7rem",
                position: "absolute",
                bottom: "2px",
                left: "2px",
                color: "white",
                zIndex: "600",
                cursor: "pointer",
              }}
            />
          </>
        )}
      </div>
    </>
  );
});

export default TimetableCell;
