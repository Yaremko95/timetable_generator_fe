import React, { useEffect, useState } from "react";

function Hours(props) {
  const [hours, setHours] = useState([]);
  useEffect(() => {
    for (let i = 0; i < props.hrsDay; i++) {
      setHours((hours) => {
        const arr = [...hours, { h: i + 8, m: 30 }];
        return arr;
      });
    }
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        height: `${props.hrsDay * 40 + 1}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        left: "-15px",
        marginTop: "8px",
      }}
    >
      {hours.map((hour) => (
        <div
          style={{
            height: `${40}px`,
            writingMode: "vertical-rl",
            fontSize: "11px",
            color: "#7c6c77",
          }}
        >
          {hour.h + ":" + hour.m}
        </div>
      ))}
    </div>
  );
}

export default Hours;
