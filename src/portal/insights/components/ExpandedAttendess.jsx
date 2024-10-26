import React from 'react';

export const ExpandedAttendeesList = ({ attendees }) => {
    return (
        <div className="bg-cyan-200 shadow-md rounded-lg p-4 mt-2">
            <h3 className="font-semibold mb-2">Asistentes:</h3>
            <ul className="space-y-1">
                {attendees.map((attendee, index) => (
                    <li key={index} className="text-sm text-gray-700">{attendee.name}</li>
                ))}
            </ul>
        </div>
    );
};
