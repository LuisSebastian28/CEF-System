import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './Teachers.css';

// Assuming you have the images stored in the public directory
const teachersData = [
  { name: 'John Doe', subject: 'Math', location: 'Los Angeles, CA', image: 'path/to/john_doe_image.png' },
  { name: 'Jane Appleseed', subject: 'English', location: 'New York, NY', image: 'path/to/jane_appleseed_image.png' },
  { name: 'Michael Ramirez', subject: 'History', location: 'Miami, FL', image: 'path/to/michael_ramirez_image.png' },
  { name: 'Emily Gonzalez', subject: 'Art', location: 'Seattle, WA', image: 'path/to/emily_gonzalez_image.png' },
];

export const Teachers = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-4/5 p-10">
        <h1 className="text-4xl font-bold mb-10">Teachers</h1>
        <div className="grid grid-cols-2 gap-10">
          {teachersData.map((teacher, index) => (
            <div key={index} className="bg-white p-5 rounded shadow flex flex-col items-center">
              <img src={teacher.image} alt={`${teacher.name}'s profile`} className="w-24 h-24 rounded-full mb-5" />
              <div className="initials-circle mb-5">
                <span>{teacher.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">{teacher.name}</h2>
                <p className="text-gray-600">{teacher.subject}</p>
                <p className="text-gray-600">{teacher.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
