// src/components/Navbar.tsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
      </div>
      
    </nav>
  );
};

export default Navbar;
