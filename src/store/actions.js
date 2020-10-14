import C from "./constants";
import authAxios from "./helpers/index";
import axios from "axios";

export const setUser = (data) => ({
  type: C.SET_USER,
  payload: data,
});
export const setAuthorized = (data) => ({
  type: C.SET_AUTHORIZED,
  payload: data,
});
export const setTeachers = (data) => ({
  type: C.SET_TEACHERS,
  payload: data,
});
export const setGroups = (data) => ({
  type: C.SET_GROUPS,
  payload: data,
});
export const setTimetable = (data) => ({
  type: C.SET_TIMETABLE,
  payload: data,
});
export const setClasses = (data) => ({
  type: C.SET_CLASSES,
  payload: data,
});
export const setClassAvailableSpace = (data) => ({
  type: C.SET_CLASS_AVAILABLE_SPACE,
  payload: data,
});
export const setClassrooms = (data) => ({
  type: C.SET_CLASSROOMS,
  payload: data,
});
export const setFilled = (data) => ({
  type: C.SET_FILLED,
  payload: data,
});
export const redirect = (data) => ({
  type: C.REDIRECT,
  payload: data,
});
export const setLoading = (data) => ({
  type: C.SET_LOADING,
  payload: data,
});
export const setError = (data) => ({
  type: C.SET_ERROR,
  payload: data,
});
export const setMessage = (data) => ({
  type: C.SET_MESSAGE,
  payload: data,
});
export const setToDefault = () => ({
  type: C.SET_TO_DEFAULT,
});

export const authorize = () => async (dispatch) => {
  const res = await authAxios.get(`/users/me`, {
    withCredentials: true,
  });

  if (!res) {
    const secondRes = await axios.get(`/users/me`, {
      withCredentials: true,
    });

    if (secondRes.status !== 200) {
      dispatch(redirect(true));
    } else {
      dispatch(setAuthorized(secondRes.data));
    }
  } else {
    if (res.status !== 200) {
      dispatch(redirect(true));
    } else {
      dispatch(setAuthorized(res.data));
      dispatch(getTimetable(res.data.timetable.id));
    }
  }
};

export const signUp = (param, body) => async (dispatch) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BE_URL_API}users/${param}`,
      // process.env.REACT_APP_BE_URL_API + "users/" + param,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      const error = await res.json();
      dispatch(setError("validation error"));
    } else {
      dispatch(setError(null));
    }
  } catch (e) {
    console.log(e);
  }
};
export const logOut = () => async (dispatch) => {
  try {
    const res = await fetch(process.env.REACT_APP_BE_URL_API + "users/logout", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(res);
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      // dispatch(setError(error.message));
    } else {
      dispatch(setToDefault());
      // dispatch(redirect(true));
      // dispatch(setError(null));
    }
  } catch (e) {
    console.log(e);
  }
};
export const login = (param, body) => async (dispatch) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_BE_URL_API}users/${param}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log(res);
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      dispatch(setError(error.message));
    } else {
      dispatch(redirect(true));
      dispatch(setError(null));
    }
  } catch (e) {
    console.log(e);
  }
};
export const getTimetable = (id) => async (dispatch) => {
  try {
    dispatch(setClassAvailableSpace([]));
    const res = await fetch(
      `${process.env.REACT_APP_BE_URL_API}timetable/${id}`
    );
    if (res.ok) {
      const timetable = await res.json();

      dispatch(setTimetable(timetable));
      dispatch(setFilled(timetable.free));
      dispatch(setClasses(timetable));
      dispatch(setClassrooms(timetable));
      //console.log(timetable);
    }
  } catch (e) {}
};
export const generateTimetable = (id) => async (dispatch) => {
  // console.log("id", id);
  try {
    dispatch(setClassAvailableSpace([]));
    const res = await fetch(
      `${process.env.REACT_APP_BE_URL_API}timetable/generate/${id}`
    );
    if (res.ok) {
      const timetable = await res.json();

      dispatch(setTimetable(timetable));
      dispatch(setFilled(timetable.free));
      dispatch(setClasses(timetable));
      dispatch(setClassrooms(timetable));
      //console.log(timetable);
    }
  } catch (e) {}
};
export const findAvailableSlots = (timetableId, classId) => async (
  dispatch
) => {
  const res = await fetch(
    `${process.env.REACT_APP_BE_URL_API}timetable/findAvailableSpace/${timetableId}/${classId}`
  );

  const data = await res.json();
  console.log(data);
  dispatch(setClassAvailableSpace(data));
  //console.log(data);
};
export const mutateToAvailableSLot = (timetableId, classId, target) => async (
  dispatch,
  getState
) => {
  try {
    if (!target.id) {
      dispatch(setMessage(null));
      dispatch(setError("This time is not available!"));
    } else {
      // alert("hello");
      // dispatch(setMessage("Requesting..."));
      //dispatch(setClassAvailableSpace([]));
      //dispatch(setError(null));
      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const { classAvailableSpace } = getState();
      const body = {
        slots: classAvailableSpace.find((arr) => arr[0].id === target.id),
      };
      console.log(classAvailableSpace, body, target.id);
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL_API}timetable/mutateToAvailable/${timetableId}/${classId}`,

        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const res = await response.json();
      console.log(res);
      if (res.ok) {
        dispatch(setError(null));
        dispatch(
          setMessage(
            `The class has been switched to ${weekDays[target.day]}, ${
              target.h
            }:${target.m}`
          )
        );
      }
      console.log(res);
    }
  } catch (e) {}
};
export const fetchData = (param) => async (dispatch) => {};
