import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskCard from "./TaskCard";
import "./Dashboard.css";
import {Link, useNavigate} from 'react-router-dom'

const Dashboard = ({tasks,setTasks}) => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "To Do", "In Progress", "Completed"];

  // Open Task Form
  const handleNewTask = () => {
    setIsTaskFormOpen(true);
  };

  // Close Task Form
  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  // Add Task
  const addTask = (task) => {
    setTasks([...tasks, { id: tasks.length + 1, ...task }]);
    setIsTaskFormOpen(false);
  };

  // Filter Tasks Based on Search & Status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || task.status === activeFilter;
    return matchesSearch && matchesFilter;
  });
console.log("Tasks ind ",tasks);
  return (
    <main className="main-content">
      {/* Header Section */}
      <header className="header">
        <h1>Task Management</h1>
        <div className="header-actions">
          {/* Search Bar */}
          <div className="search-bar">
            <i className="fa-solid fa-search"></i>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* New Task Button */}
          <button className="btn-new-task" onClick={handleNewTask}>
            <i className="fa-solid fa-plus"></i> New Task
          </button>
        </div>
      </header>

      {/* Task Form Modal */}
      {isTaskFormOpen && <TaskForm onClose={closeTaskForm} onAddTask={addTask} />}

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-number">{tasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number">{tasks.filter(task => task.status === "In Progress").length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{tasks.filter(task => task.status === "Completed").length}</p>
        </div>
        <div className="stat-card">
          <h3>Backlogs</h3>
          <p className="stat-number">{tasks.filter(task => new Date(task.deadline) > new Date()).length}</p>
        </div>
      </div>

      {/* Task Filters */}
      <div className="task-filters">
        {filters.map(filter => (
          <button 
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <TaskList tasks={filteredTasks} />
    </main>
  );
};

export default Dashboard;