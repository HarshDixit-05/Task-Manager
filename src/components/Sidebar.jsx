import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: 'fa-house', path :"/" },
    { name: 'My Tasks', icon: 'fa-list-check' ,path:"/MyTasks"},
    { name: 'Calendar', icon: 'fa-calendar' ,path:"/Calendar"},
    { name: 'Recurring Tasks', icon: 'fa-repeat' ,},
    { name: 'Teams', icon: 'fa-users',path:"/Teams" },
    { name: 'Templates', icon: 'fa-file-lines' ,path:"/Templates"},
    { name: 'Reports', icon: 'fa-chart-line',path:"/Reports" },
  ];
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-square-check"></i>
        <h2>Sort</h2>
      </div>
      
      <ul className="nav-items">
        {navItems.map((item) => (
          <li 
            key={item.name}
            className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => {
              setActiveItem(item.name); // Set the active item
              navigate(item.path); // Navigate to the selected route
            }}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span>{item.name}</span>
          </li>
        ))}
        
        <li className="nav-item settings">
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </li>
      </ul>
      
      <div className="user-profile">
        <div className="avatar">AJ</div>
        <div className="user-info">
          <h3>Alex Johnson</h3>
          <p>Product Manager</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;