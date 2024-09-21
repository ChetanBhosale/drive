// src/components/Dashboard.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content area */}
      <div className="flex-grow bg-gray-100">
        {/* Navbar */}
        <Navbar />
        {/* Content */}
        
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
