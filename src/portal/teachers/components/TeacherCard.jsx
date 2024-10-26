// src/portal/components/TeacherCard.js
import React from 'react';

export const TeacherCard = ({ teacher, onContact }) => (
    <div className="bg-white p-5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <img 
            src={teacher.photoUrl || 'https://via.placeholder.com/100'} 
            alt={`${teacher.firstName}'s profile`} 
            className="w-24 h-24 rounded-full mb-5 object-cover mx-auto"
        />
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{teacher.firstName} {teacher.lastName}</h2>
            <p className="text-gray-600">{teacher.county}</p>
            <p className="text-gray-500">{teacher.roleDesc}</p>
        </div>
        <div className="mt-4 flex justify-center">
            <button 
                onClick={() => onContact(teacher)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Contactar
            </button>
        </div>
    </div>
);
