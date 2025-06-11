import React, { useState } from "react";
import TaskGanttChart from "./TaskGanttChart";
import "./Reports.css";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell } from "recharts";

  // Define color scale based on workload
const getColor = (count) => {
    if (count > 5) return "#ff4d4d"; // Red (Overloaded)
    if (count >= 3) return "#ffc107"; // Yellow (Balanced)
    return "#28a745"; // Green (Underloaded)
  };
// Custom Legend Component
const CustomLegend = () => (
  <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "15px", height: "15px", backgroundColor: "#91cf60", marginRight: "5px" }}></div>
      <span>Low (1-2 tasks)</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "15px", height: "15px", backgroundColor: "#fc8d59", marginRight: "5px" }}></div>
      <span>Medium (3-4 tasks)</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "15px", height: "15px", backgroundColor: "#d73027", marginRight: "5px" }}></div>
      <span>High (5+ tasks)</span>
    </div>
  </div>
);


const Reports = ({ tasks }) => {
  const [viewType, setViewType] = useState("gantt");

  const workloadData = tasks.reduce((acc, task) => {
    if (!task.assignee) return acc;
    const user = acc.find((item) => item.assignee === task.assignee);
    if (user) {
      user.taskCount += 1;
    } else {
      acc.push({ assignee: task.assignee, taskCount: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="reports-page">
      <h1>
        Task Reports{" "}
      </h1>
        <p className="summary-section">
          <span>Total Tasks: {tasks.length}</span>
        </p>
      <div className="view-toggle">
        <button className={`view-toggle-btn ${viewType === "gantt" ? "active" : "inactive"}`}
          onClick={() => setViewType("gantt")}>Gantt Chart</button>
        <button className={`view-toggle-btn ${viewType === "summary" ? "active" : "inactive"}`}
          onClick={() => setViewType("summary")}>Workload Heatmap</button>
      </div>

      {viewType === "gantt" && (
        <div className="report-card">
          {/* <h2>Task Gantt Chart</h2> */}
          <TaskGanttChart tasks={tasks} />
        </div>
      )}

      {viewType === "summary" && (
        <div className="report-card">
          <div className="summary-section">
       <div>
            {/* <h2>Workload Heatmap</h2> */}
            <CustomLegend />
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis type="category" dataKey="assignee" name="Team Member" />
                <YAxis type="number" dataKey="taskCount" name="Tasks Assigned" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Workload" data={workloadData} fill="#8884d8">
                  {workloadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.taskCount)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
