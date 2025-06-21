import React, { useEffect, useState } from "react";
import "./MoodCalendar.css";
import DayPop from "../components/DayPopup"; 
const moodEmojis = {
    happy: "😊",
  sad: "😢",
  neutral: "😐",
  excited: "🤩",
  angry: "😠",
  undefined: "❓",

};
function MoodCalendar(){
    const [moodData, setMoodData] = useState({}); 
    const [selectDay, setSelectDay] = useState(null); 

    const tody = new Data(); 
    const year = today.getFullYear();
    const month = today.getMonth(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    fetch(`/api/moods?month=${month + 1}&year=${year}`)
      .then((res) => res.json())
      .then((data) => setMoodData(data))
      .catch((err) => console.error("Mood fetch error:", err));
  }, [month, year]);
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const dateKey = date.toISOString().split("T")[0];
    return {
      day: i + 1,
      mood: moodData[dateKey],
    };
  });
  return (
    <div className="mood-calendar">
      <h2>{today.toLocaleString("default", { month: "long" })} {year}</h2>
      <div className="calendar-grid">
        {days.map(({ day, mood }) => (
          <div
            key={day}
            className="calendar-day"
            onClick={() => handleDayClick(day)}
          >
            <span className="day-number">{day}</span>
            <span className="day-emoji">{moodEmojis[mood] || moodEmojis.undefined}</span>
          </div>
        ))}
      </div>

      {selectedDay && (
        <DayPop
          day={selectedDay}
          mood={moodData[new Date(year, month, selectedDay).toISOString().split("T")[0]]}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );


}
export default MoodCalendar;

