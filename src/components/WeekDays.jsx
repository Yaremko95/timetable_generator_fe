import React from "react";

function WeekDays(props) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div
      style={{
        width: `${7 * 200 + 1}px`,
        position: "absolute",
        top: "-15px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {weekDays.map((day) => (
        <div
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{ marginRight: "10px", fontSize: "11px", color: "#7c6c77" }}
          >
            {day}
          </span>
        </div>
      ))}
    </div>
  );
}

export default WeekDays;
