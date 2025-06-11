import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css"; // Custom styles

const CalendarView = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const tasksByDate = tasks.reduce((acc, task) => {
    if (task.dueDate) {
      acc[task.dueDate] = acc[task.dueDate]
        ? [...acc[task.dueDate], task]
        : [task];
    }
    return acc;
  }, {});

  // Convert selected date to "YYYY-MM-DD"
  const selectedDateKey = selectedDate.toLocaleDateString("en-CA"); // "YYYY-MM-DD" format

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        showNeighboringMonth={false} // Hide extra dates
        tileContent={({ date }) => {
          const dateKey = date.toLocaleDateString("en-CA"); // Fix date format
          const dayTasks = tasksByDate[dateKey];

          if (dayTasks && dayTasks.length > 0) {
            return (
              <div className="task-badge-container">
                {dayTasks.map((task) => {
                  const taskClass =
                    task.status === "To Do"
                      ? "todo-task"
                      : task.status === "In Progress"
                      ? "inprogress-task"
                      : "completed-task";

                  return (
                    <span
                      key={task.id}
                      className={`task-badge ${taskClass}`}
                    ></span>
                  );
                })}
              </div>
            );
          }
          return null;
        }}
      />

      {/* Display tasks for the selected date */}
      <div className="lists-of-task">
        {tasksByDate[selectedDateKey] && <p>Tasks deadline :</p>}
        <h2 >
          {new Date(selectedDate).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </h2>
        {tasksByDate[selectedDateKey] ? (
          tasksByDate[selectedDateKey].map((task) => (
            <div
          
              key={task.id}
              className={`task-item ${task.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              <strong>{task.title}</strong> - {task.status} ({task.priority})
            </div>
          ))
        ) : (
          <p>No tasks on this day.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
