import React, { useState, useEffect } from "react";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const { id, title, description, priority, status, subtasks, dueDate, assignee, recurring } = task;

  const progressWidth = subtasks ? (subtasks.completed / subtasks.total) * 100 : 0;

  // Pomodoro Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Start/Stop Timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <div className="task-title">
          <input type="checkbox" id={`task-${id}`} checked={status === "completed"} readOnly />
          <h3>{title}</h3>
        </div>
        <div className="task-actions">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>

      <div className="task-description">{description}</div>

      {subtasks.total !== 0 && (
        <>
          <div className="subtasks">
            <div className="subtasks-progress" style={{ width: `${progressWidth}%` }}></div>
          </div>
          <div className="subtasks-text">Subtasks ({subtasks.completed}/{subtasks.total})</div>
        </>
      )}

      <div className="task-tags">
        <span className={`tag ${priority}`}>{priority}</span>
        <span className={`tag ${status}`}>{status}</span>
        {recurring && <span className="tag recurring">Recurring</span>}
      </div>

      <div className="task-footer">
        <div className="task-date">
          <i className="fa-regular fa-calendar"></i> {dueDate}
        </div>
        <div className="task-assignee">
          <i className="fa-regular fa-user"></i> {assignee}
        </div>
      </div>

      {/* Pomodoro Timer UI */}
      <div className="pomodoro-timer">
        <h4 style={{fontSize:"0.9rem"}}>Pomodoro Timer</h4>
        <p>{formatTime(timeLeft)}</p>
        <button className={`pomodoro-btn ${isRunning ? "stop" : "start"}`} onClick={toggleTimer}>
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>

      <button className="details-btn">Details</button>
    </div>
  );
};

export default TaskCard;
