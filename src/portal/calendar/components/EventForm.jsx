// src/portal/components/EventForm.jsx
import React from 'react';
import { addHours } from 'date-fns';
import moment from 'moment';

export const EventForm = ({
  newEvent,
  setNewEvent,
  isEditing,
  onSave,
  onAdd,
  onCancel,
}) => {
  return (
    <div className="mt-4">
      <h2>{isEditing ? "Edit Event" : "Add New Event"}</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        className="border p-2"
      />
      <input
        type="datetime-local"
        value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
        onChange={(e) =>
          setNewEvent({
            ...newEvent,
            start: new Date(e.target.value),
            end: addHours(new Date(e.target.value), 1),
          })
        }
        className="border p-2 ml-2"
      />
      {isEditing ? (
        <>
          <button onClick={onSave} className="bg-green-500 text-white p-2 ml-2">
            Save Changes
          </button>
          <button onClick={onCancel} className="bg-gray-500 text-white p-2 ml-2">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={onAdd} className="bg-blue-500 text-white p-2 ml-2">
          Add Event
        </button>
      )}
    </div>
  );
};
