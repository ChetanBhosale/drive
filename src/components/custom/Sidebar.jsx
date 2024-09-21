// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTasks, FaChartLine, FaDollarSign, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-900  text-white h-screen p-6 shadow-lg flex flex-col justify-between w-60">
      {/* Company Name */}
      <div>
        <h2 className="text-3xl font-extrabold mb-12 text-center text-indigo-500 tracking-wide">DealDrive</h2>

        {/* Menu Links */}
        <ul className="space-y-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive ? 'bg-indigo-500 text-white' : 'hover:bg-gray-800'
                }`
              }
            >
              <FaHome className="w-6 h-6" />
              <span className="text-lg">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/workflow"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive ? 'bg-indigo-500 text-white' : 'hover:bg-gray-800'
                }`
              }
            >
              <FaTasks className="w-6 h-6" />
              <span className="text-lg">Workflow</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/report"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive ? 'bg-indigo-500 text-white' : 'hover:bg-gray-800'
                }`
              }
            >
              <FaChartLine className="w-6 h-6" />
              <span className="text-lg">Report</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg transition ${
                  isActive ? 'bg-indigo-500 text-white' : 'hover:bg-gray-800'
                }`
              }
            >
              <FaDollarSign className="w-6 h-6" />
              <span className="text-lg">Pricing</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <NavLink
          to="/logout"
          className="flex items-center space-x-4 p-3 rounded-lg text-red-500 hover:bg-gray-800 transition"
        >
          <FaSignOutAlt className="w-6 h-6" />
          <span className="text-lg">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
