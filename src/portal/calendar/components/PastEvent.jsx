// src/portal/components/PastEventList.jsx
import React from 'react';
import moment from 'moment';

export const PastEventList = ({ events }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold mb-2">Past Events</h2>
    <ul className="list-disc pl-5">
      {events
        .filter(event => moment(event.end).isBefore(moment()))
        .map((event) => (
          <li key={event.id} className="mb-2 text-red-500">
            <strong>{event.title}</strong> - {moment(event.start).format('MMMM Do YYYY, h:mm A')} to {moment(event.end).format('h:mm A')}
          </li>
        ))
      }
    </ul>
  </div>
);
