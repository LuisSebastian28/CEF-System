import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';

export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-4/5 p-10">
        <h1 className="text-4xl font-bold mb-10">Dashboard</h1>
        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Total Students</h2>
            <p className="text-gray-600">The total number of students enrolled in our programs.</p>
            <div className="flex items-center mt-5">
              <span className="text-4xl font-bold">1,234</span>
              <FontAwesomeIcon icon={faUser} className="ml-auto" />
            </div>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <p className="text-gray-600">The number of upcoming events and activities.</p>
            <div className="flex items-center mt-5">
              <span className="text-4xl font-bold">12</span>
              <FontAwesomeIcon icon={faCalendarAlt} className="ml-auto" />
            </div>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">New Registrations</h2>
            <p className="text-gray-600">The number of new students registered in the last month.</p>
            <div className="flex items-center mt-5">
              <span className="text-4xl font-bold">87</span>
              <FontAwesomeIcon icon={faFileAlt} className="ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

