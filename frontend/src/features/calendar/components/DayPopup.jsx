import React from "react";
import "./DayPop.css";

function DayPop({ day, mood, onClose }) {
  return (
    <div className="day-pop-overlay" onClick={onClose}>
      <div className="day-pop" onClick={(e) => e.stopPropagation()}>
        <h3>Day {day}</h3>
        <p>Mood: {mood || "Unknown"}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default DayPop;
