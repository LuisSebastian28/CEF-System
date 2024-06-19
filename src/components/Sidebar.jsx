import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalendarAlt, faFileAlt, faChalkboardTeacher, faBook, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo2.png';


export const Sidebar = () => {
  return (
    <div className="sidebar bg-dark-blue-900 text-white flex flex-col p-5 h-screen">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="logo w-20 h-20 mb-5" />
        <h2 className="mb-10">Hi, User</h2>
      </div>
      <nav className="flex flex-col flex-grow space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span>Dashboard</span>
        </Link>
        <Link to="/calendar" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Calendar</span>
        </Link>
        <Link to="/forms" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded">
          <FontAwesomeIcon icon={faFileAlt} />
          <span>Forms</span>
        </Link>
        <Link to="/teachers" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded">
          <FontAwesomeIcon icon={faChalkboardTeacher} />
          <span>Teachers</span>
        </Link>
        <Link to="/resources" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded">
          <FontAwesomeIcon icon={faBook} />
          <span>Resources</span>
        </Link>
      </nav>
      <div className="flex flex-col space-y-2 mt-auto">
        <Link to="/account" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded">
          <FontAwesomeIcon icon={faUser} />
          <span>Account</span>
        </Link>
        <Link to="/logout" className="flex items-center space-x-2 hover:bg-blue-800 p-2 rounded">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </Link>
      </div>
    </div>

  );
};
