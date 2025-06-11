import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TaskGanttChart.css';

const TaskGanttChart = ({ tasks }) => {
  // Prepare data for Gantt chart
  const prepareGanttData = () => {
    // Find the earliest start date across all tasks
    const earliestStartDate = Math.min(...tasks.map(task => new Date(task.startDate).getTime()));
    
    return tasks.map(task => {
      const startDate = new Date(task.startDate);
      const dueDate = new Date(task.dueDate);
      // console.log("Status",status);
      // Calculate days since the earliest start date
      const startDays = Math.floor((startDate.getTime() - earliestStartDate) / (1000 * 60 * 60 * 24));
      const duration = Math.floor((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      return {
        name: task.title,
        startDays,
        duration,
        status: task.status,
        priority: task.priority,
        startDate: startDate.toLocaleDateString(),
        dueDate: dueDate.toLocaleDateString()
      };
    });
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const task = payload[0].payload;
      // console.log("taskss",task);
      return (
        <div className="custom-tooltip">
          <p className="task-name">{task.name}</p>
          <p>Start Date: {task.startDate}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p>Duration: {task.duration} days</p>
        </div>
      );
    }
    return null;
  };

  const ganttData = prepareGanttData();
  return (
    <div className="gantt-chart-container">
      <ResponsiveContainer width="100%" height={400} >
        <BarChart
          layout="vertical"
          data={ganttData}
          margin={{ left: 80, right: 20, bottom: 20, top: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            horizontal 
            stroke="#334155" 
          />
          <XAxis 
            type="number" 
            domain={[0, 'dataMax']} 
            tickFormatter={(days) => `Day ${days + 1}`}
            stroke="#94a3b8"
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={150} 
            stroke="#94a3b8"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
          />
          <Bar 
            dataKey="duration" 
            fill="#283953"
            barSize={30}
           
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskGanttChart;