
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              MyVPN
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link to="/servers" className="text-gray-600 hover:text-gray-900">Servers</Link>
            <Link to="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
