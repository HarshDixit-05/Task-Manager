import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]); // Store tasks

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]); // Add unique id
  };

  return (
    <div>
      <TaskForm onAddTask={addTask} /> {/* Pass addTask function */}
      <TaskList tasks={tasks} /> {/* Pass tasks to TaskList */}
    </div>
  );
};

export default TaskBoard;
