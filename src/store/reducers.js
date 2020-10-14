import C from "./constants";

const initialState = {
  authorized: null,
  redirectTo: null,
  loading: true,
  error: null,
  message: null,
  user: [],
  teachers: [],
  groups: [],
  timetable: null,
  classAvailableSpace: [],
  classes: [],
  classrooms: [],
  filled: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.REDIRECT: {
      return {
        ...state,
        redirectTo: action.payload,
      };
    }
    case C.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case C.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case C.SET_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case C.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case C.SET_AUTHORIZED: {
      return {
        ...state,
        authorized: action.payload,
      };
    }
    case C.SET_TEACHERS: {
      return {
        ...state,
        teachers: action.payload,
      };
    }
    case C.SET_GROUPS: {
      return {
        ...state,
        groups: action.payload,
      };
    }
    case C.SET_TO_DEFAULT: {
      return {
        authorized: null,
        redirectTo: null,
        loading: true,
        error: null,
        message: null,
        user: [],
        teachers: [],
        groups: [],
        timetable: null,
        classAvailableSpace: [],
        classes: [],
        classrooms: [],
        filled: [],
      };
    }

    case C.SET_TIMETABLE: {
      const { payload } = action;

      return {
        ...state,
        timetable: {
          id: payload.id,
          name: payload.name,
          total_hours: payload.total_hours,
          total_days: payload.total_days,
        },
      };
    }
    case C.SET_CLASSES: {
      const { payload } = action;
      const classes = payload.classes.map((cl) => {
        cl.filled = cl.filled.map((e) => ({
          id: e.freeSpace.id,
          freeSpace: e.freeSpace.free_space,
          day: new Date(e.freeSpace.date).getDay(),
          h: new Date(e.freeSpace.date).getHours() - 2,
          m: new Date(e.freeSpace.date).getMinutes(),
        }));
        return {
          ...cl,
          filled: cl.filled,
        };
      });
      return {
        ...state,
        classes: classes,
      };
    }
    case C.SET_FILLED: {
      const { payload } = action;
      let filledMap = new Map();
      let filled = payload
        .filter((slot) => slot.isFree === false)
        .map((slot) => ({
          id: slot.id,
          classroomId: slot.classroomId,
          freeSpace: slot.free_space,
          day: new Date(slot.date).getDay(),
          h: new Date(slot.date).getHours() - 2,
          m: new Date(slot.date).getMinutes(),
          classId: slot.freeSpace.classId,
        }))
        .filter((slot) => {
          const val = filledMap.get(slot.classId);
          if (val) {
            if (slot.h < val.h) {
              filledMap.delete(slot.classId);
              filledMap.set(slot.classId, slot.h);
              return true;
            } else {
              return false;
            }
          }
          filledMap.set(slot.classId, slot.h);
          return true;
        });

      return {
        ...state,
        filled: filled,
      };
    }
    case C.SET_CLASS_AVAILABLE_SPACE: {
      const { payload } = action;
      const slots = [];
      // classroomId: 158
      // date: "Fri Oct 09 2020 08:30:47 GMT+0200 (Central European Summer Time)"
      // freeSpace: null
      // free_space: 15
      // id: 1266
      // isFree: true
      // timetableId: 107
      payload.forEach((arr) => {
        const array = [];
        arr.forEach((slot) => {
          //const slot = arr[0];
          array.push({
            ...slot,
            day: new Date(slot.date).getDay(),
            h: new Date(slot.date).getHours() - 2,
            m: new Date(slot.date).getMinutes(),
          });
        });
        slots.push(array);
      });

      return {
        ...state,
        classAvailableSpace: slots,
      };
    }

    case C.SET_CLASSROOMS: {
      const { payload } = action;

      return {
        ...state,
        classrooms: payload.classrooms,
      };
    }
    default:
      return state;
  }
};
