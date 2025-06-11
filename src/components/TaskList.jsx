import React from "react";
import TaskCard from "./TaskCard";
import "./TaskList.css";

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available. Click "New Task" to add one.</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
