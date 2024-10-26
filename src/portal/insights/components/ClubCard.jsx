// src/portal/components/ClubCard.js
import React from 'react';

export const ClubCard = ({ club, onExpand, onEdit, onDelete, onInfo, isExpanded }) => {
    const { id, eventType, date, totalAttendees } = club;
    const eventTypeLabels = {
        goodnewsdaycamp: 'Good News Day Camp',
        fivedayclub: '5-Day Club',
        teachertrainingclass: 'Teacher Training Class',
        goodnewsclub: 'Good News Club',
        releasedtimes: 'Released Times',
    };

    return (
        <div className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center space-x-4">
            <div>
                <span className="text-lg font-semibold">{eventTypeLabels[eventType]}</span>
                <p className="text-sm text-gray-600">{date}</p>
                <p className="text-sm text-gray-600">{totalAttendees} asistentes</p>
            </div>
            <div className="flex items-center space-x-2">
                <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300" onClick={onInfo}>
                    <i className="fas fa-info text-gray-600"></i>
                </button>
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={onEdit}>
                    <i className="fas fa-cog"></i>
                </button>
                <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={() => onDelete(id)}>
                    <i className="fas fa-trash"></i>
                </button>
                <button className="bg-gray-300 p-2 rounded-md hover:bg-gray-400" onClick={() => onExpand(id)}>
                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                </button>
            </div>
        </div>
    );
};
