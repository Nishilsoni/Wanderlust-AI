import React from 'react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >

        {/* Sidebar Content */}
        <ul className="p-4">
          <li className="mb-4"><a href="#contact" className="text-white">Chat History</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
