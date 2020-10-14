import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  findAvailableSlots,
  generateTimetable,
  getTimetable,
  mutateToAvailableSLot,
  setClassAvailableSpace,
  setError,
  setMessage,
} from "../store/actions";
import AuthHoc from "../auth/withAuth";
import { createUseStyles } from "react-jss";
import TimetableCell from "../components/timetable/TimetableCell";
import gsap, { TimelineLite } from "gsap";
import { Draggable, TweenLite, Power2 } from "gsap/all";
import ReactDOM from "react-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import WeekDays from "../components/WeekDays";
import Hours from "../components/Hours";
gsap.registerPlugin(Draggable);
const useStyles = createUseStyles((theme) => ({
  grid: {
    width: "74px",
    height: "50px",
  },
}));
const setTable = (timetable) => {
  const rows = timetable.total_hours / timetable.total_days;
  console.log("rows", rows);
  const cols = 7;
  const width = 200;
  const height = 40;
  const matrix = Array(rows)
    .fill()
    .map(() => Array(cols).fill());

  matrix.forEach((r, i) => {
    matrix[i].forEach((c, j) => {
      const y = i * height;
      const x = j * width;
      matrix[i][j] = {
        width: width,
        height: height,
        y,
        x,
        time: 8 + i,
        day: j,
      };
    });
  });
  console.log(matrix);
  return matrix;
};
function Timetable(props) {
  const state = useSelector((state) => ({
    timetable: state.timetable,
    classes: state.classes,
    filled: state.filled,
    classrooms: state.classrooms,
    classAvailableSpace: state.classAvailableSpace,
  }));
  const availableSpaceLength = state.classAvailableSpace.length;
  const dispatch = useDispatch();
  const [cells, setCells] = useState([]);
  const [draggableClass, setDraggableClass] = useState(null);

  const targetsList = [];
  const targetRefs = useRef([]);
  const draggableRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    console.log(state.timetable);

    if (state.timetable) {
      setCells(setTable(state.timetable));
    }
  }, [state.timetable]);
  useEffect(() => {
    targetRefs.current = targetRefs.current.slice(0, availableSpaceLength);

    if (draggableRef.current) {
      // const tl = new TimelineLite({ paused: true });
      // tl.staggerFrom(
      //   targetRefs.current,
      //   0.5,
      //   { autoAlpha: 0, opacity: 0 },
      //   0.1
      // ).from(draggableRef.current, 0.5, { autoAlpha: 0, opacity: 0 });
      //
      // tl.play();
      console.log(containerRef.current.getBoundingClientRect());
      let draggableInitialPosition = undefined;
      const draggablePosition = draggableRef.current.getBoundingClientRect();
      console.log("draggableInitialPosition", draggableInitialPosition);
      TweenLite.set(containerRef.current, {
        height:
          12 * 40 * state.classrooms.length + state.classrooms.length * 40,
        width: 1238,
      });
      TweenLite.set(draggableRef.current, {
        width: draggablePosition.width,
        height: draggablePosition.height,
      });
      Draggable.create(draggableRef.current, {
        bounds: containerRef.current,

        edgeResistance: 0.65,
        type: "x,y",
        throwProps: true,
        liveSnap: true,

        snap: {
          x: function (endValue) {
            return Math.round(endValue / 200) * 200;
          },
          y: function (endValue) {
            return Math.round(endValue / 40) * 40;
          },
        },
        onDragStart: function (e) {
          draggableInitialPosition = {
            top: draggablePosition.top,
            left: draggablePosition.left,
          };
        },
        onDragEnd: function (e) {
          const draggableTop = draggableRef.current.getBoundingClientRect().top;
          const draggableLeft = draggableRef.current.getBoundingClientRect()
            .left;
          let target = {};

          if (
            draggableTop - 1 !== draggableInitialPosition.top &&
            draggableLeft - 1 !== draggableInitialPosition.left
          ) {
            targetRefs.current.forEach((el) => {
              //console.log(draggableTop, el.getBoundingClientRect().top);
              if (
                el.getBoundingClientRect().top === draggableTop - 1 &&
                el.getBoundingClientRect().left === draggableLeft - 1
              ) {
                const targetIndex = targetRefs.current.indexOf(el);
                // console.log("targetIndex", targetIndex);
                // console.log(targetsList[targetIndex]);
                target = targetsList[targetIndex];

                //dispatch(setError(null));
                dispatch(
                  mutateToAvailableSLot(
                    state.timetable.id,
                    draggableClass,
                    target
                  )
                );
              } else {
                dispatch(setError("This time is not available!"));
                dispatch(setMessage(null));
                // dispatch(setClassAvailableSpace([]));
              }
            });
          }

          //console.log("p", p, leftP);
        },
      });
    }
  }, [state.classAvailableSpace]);
  //

  const generate = () => {
    dispatch(generateTimetable(`/${state.timetable.id}`));
  };
  const handleCellClick = (classId) => {
    dispatch(findAvailableSlots(state.timetable.id, classId));
    setDraggableClass(classId);
  };
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div>
      {" "}
      <Button variant="contained" color="secondary" onClick={generate}>
        Generate Timetable
      </Button>
      {/*<div>*/}
      {/*  <span>Days: Mon, </span>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <span>Total days: 4</span>*/}
      {/*</div>*/}
      <div
        className={"boundContainer"}
        ref={containerRef}
        style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}
      >
        {state.classrooms &&
          state.classrooms.map((classroom, index) => {
            return (
              <>
                <div
                  style={{
                    position: "relative",
                    marginTop: "40px",
                    // width: "1400px",
                    height: `${
                      (state.timetable.total_hours /
                        state.timetable.total_days) *
                      40
                    }px`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: `${
                        (state.timetable.total_hours /
                          state.timetable.total_days) *
                        40
                      }px`,
                      // display: "flex",
                      // flexDirection: "column",
                      // alignItems: "center",
                      // justifyContent: "center",
                      top: "35%",
                      right: "-16%",
                      marginTop: "8px",
                    }}
                  >
                    <h3
                      style={{
                        writingMode: "vertical-rl",
                        fontSize: "1rem",
                        color: "#7c6c77",
                      }}
                    >
                      Classroom: {classroom.title}
                    </h3>
                  </div>

                  <WeekDays />
                  <Hours
                    hrsDay={
                      state.timetable.total_hours / state.timetable.total_days
                    }
                  />
                  {cells.map((row, i) => {
                    return (
                      <>
                        {/*<div*/}
                        {/*  style={{ width: "200px", display: "inline-block" }}*/}
                        {/*>*/}
                        {/*  <span>Monday</span>*/}
                        {/*</div>{" "}*/}
                        {row.map((cell, j) => {
                          const space = state.filled.find(
                            (slot) =>
                              j === slot.day &&
                              cell.time === slot.h &&
                              slot.classroomId === classroom.id
                          );
                          const cl =
                            space &&
                            state.classes.find((c) => c.id === space.classId);
                          const availableSlotIndex = state.classAvailableSpace
                            .map((arr) => arr[0])
                            .findIndex(
                              (slot) =>
                                j === slot.day &&
                                cell.time === slot.h &&
                                slot.classroomId === classroom.id
                            );
                          let availableSlot = undefined;
                          if (availableSlotIndex !== -1) {
                            availableSlot = state.classAvailableSpace
                              .map((arr) => arr[0])
                              .find(
                                (slot) =>
                                  j === slot.day &&
                                  cell.time === slot.h &&
                                  slot.classroomId === classroom.id
                              );
                            targetsList[availableSlotIndex] = availableSlot;
                          }

                          return (
                            <div
                              ref={(ref) =>
                                availableSlotIndex !== -1
                                  ? (targetRefs.current[
                                      availableSlotIndex
                                    ] = ref)
                                  : (ref = null)
                              }
                              //id={availableSlot !== -1 ? availableSlot.id : ""}
                              style={{
                                // marginTop: "2rem",
                                fontSize: "0.7rem",
                                position: "absolute",
                                border: "1px solid #978792",
                                // borderWidth: "0.1em",
                                // visibility:
                                //   availableSlotIndex !== -1 ? "hidden" : "",
                                // zIndex: "50",
                                width: cell.width - 1,
                                height: cell.height - 1,
                                top: cell.y,
                                left: cell.x,
                                backgroundColor:
                                  availableSlotIndex !== -1
                                    ? "rgba(0,0,0,0.9)"
                                    : "",
                                color: "whitesmoke",
                                //textAlign: "center",
                              }}
                            >
                              {/*{cell.time}*/}
                              {availableSlotIndex !== -1 && (
                                <span
                                  style={{
                                    position: "absolute",
                                    fontSize: "0.7rem",
                                    color: "white",
                                    left: "20%",
                                    top: "30%",
                                    // textAlign: "center",
                                  }}
                                >
                                  Drag the class here
                                  {/*the class here to set the time for{" "}*/}
                                  {/*{weekDays[availableSlot.day] +*/}
                                  {/*  ", " +*/}
                                  {/*  availableSlot.h +*/}
                                  {/*  ":" +*/}
                                  {/*  availableSlot.m}*/}
                                </span>
                              )}

                              {cl && (
                                <TimetableCell
                                  className={
                                    draggableClass === cl.id ? "box" : ""
                                  }
                                  ref={
                                    draggableClass === cl.id
                                      ? draggableRef
                                      : undefined
                                  }
                                  style={{
                                    boxShadow:
                                      draggableClass === cl.id
                                        ? "4px 4px 5px 0px rgba(61,53,59,1)"
                                        : "",
                                    zIndex:
                                      draggableClass === cl.id ? "300" : "100",
                                  }}
                                  cell={cell}
                                  cl={cl}
                                  onClick={() => handleCellClick(cl.id)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default AuthHoc(Timetable);
