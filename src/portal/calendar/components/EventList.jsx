// src/portal/components/EventList.jsx
import React from 'react';
import moment from 'moment';

export const EventList = ({ events, uid, onEdit, onDelete }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold mb-2">Event List</h2>
    <ul className="list-disc pl-5">
      {events.length === 0 ? (
        <li>No events added</li>
      ) : (
        events.map((event) => (
          <li key={event.id} className="mb-2">
            <strong>{event.title}</strong> - {moment(event.start).format('MMMM Do YYYY, h:mm A')} to {moment(event.end).format('h:mm A')}
            {event.userId === uid && (
              <div className="flex space-x-2 mt-2">
                <button onClick={() => onEdit(event)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
                <button onClick={() => onDelete(event.id, event.userId)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  </div>
);
