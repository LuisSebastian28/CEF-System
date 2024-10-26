import React, { useState, useEffect } from 'react';
import { Calendar as Calendario, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../../../store/portal/calendar/calendarThunks';
import { addHours } from 'date-fns';

const localizer = momentLocalizer(moment);

export const CalendarPage = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);
  const { uid } = useSelector(state => state.auth);

  const initialEventState = {
    title: '',
    description: '',
    location: '',
    category: '',
    start: new Date(),
    end: addHours(new Date(), 1),
    userId: uid,
  };

  const [newEvent, setNewEvent] = useState(initialEventState);
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    if (newEvent.title) {
      dispatch(addEvent(newEvent));
      setNewEvent(initialEventState); // Resetear el estado del evento
      setIsModalOpen(false);
    } else {
      alert('Event title is required');
    }
  };

  const handleStartEditEvent = (event) => {
    if (event.userId === uid) {
      setNewEvent(event);
      setEditEventId(event.id);
      setIsEditing(true);
      setIsModalOpen(true);
    } else {
      alert("You can only edit events you created.");
    }
  };

  const handleSaveEditEvent = () => {
    if (editEventId && newEvent.userId === uid) {
      dispatch(updateEvent({ ...newEvent, id: editEventId }));
      setIsEditing(false);
      setNewEvent(initialEventState); // Resetear el estado del evento
      setIsModalOpen(false);
    } else {
      alert("You can only edit events you created.");
    }
  };

  const handleDeleteEvent = (eventId, eventUserId) => {
    if (eventUserId === uid) {
      dispatch(deleteEvent(eventId));
    } else {
      alert("You can only delete events you created.");
    }
  };

  const handleDoubleClickEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const openAddEventModal = () => {
    setNewEvent(initialEventState); // Resetear el formulario
    setIsEditing(false);
    setSelectedEvent(null); // Limpiar el evento seleccionado
    setIsModalOpen(true);
  };

  const eventPropGetter = (event) => {
    const isUserEvent = event.userId === uid;
    const isEventPast = moment(event.end).isBefore(moment());

    return {
      style: {
        backgroundColor: isEventPast ? '#ffcccc' : isUserEvent ? '#0066ff' : '#999999',
        color: 'white',
      },
    };
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <h1 className="text-center text-3xl font-bold py-4">Calendar Overview</h1>

      <div className="flex-grow p-6 flex space-x-6">
        {/* Sección del Calendario */}
        <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
          <Calendario
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '70vh' }}
            onDoubleClickEvent={handleDoubleClickEvent}
            eventPropGetter={eventPropGetter}
          />
        </div>

        {/* Listas de Eventos */}
        <div className="w-1/3 space-y-6">
          {/* Lista de Eventos Actuales */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Upcoming Events</h2>
            <ul className="space-y-2">
              {events.filter(event => !moment(event.end).isBefore(moment())).map((event) => (
                <li key={event.id} className="flex items-center justify-between p-2 border rounded">
                  <span className="flex-grow font-semibold">{event.title}</span>
                  {event.userId === uid && (
                    <div className="space-x-2">
                      <button onClick={() => handleStartEditEvent(event)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                      <button onClick={() => handleDeleteEvent(event.id, event.userId)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </div>
                  )}
                </li>
              ))}
              {events.length === 0 && <li className="text-gray-500">No events added</li>}
            </ul>
          </div>

          {/* Lista de Eventos Pasados */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Past Events</h2>
            <ul className="space-y-2">
              {events
                .filter(event => moment(event.end).isBefore(moment()))
                .map((event) => (
                  <li key={event.id} className="p-2 bg-red-100 rounded">
                    <strong>{event.title}</strong> - {moment(event.start).format('MMMM Do YYYY, h:mm A')} to {moment(event.end).format('h:mm A')}
                  </li>
                ))}
              {events.filter(event => moment(event.end).isBefore(moment())).length === 0 && (
                <li className="text-gray-500">No past events</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Botón flotante para abrir el modal de agregar evento */}
      <button
        onClick={openAddEventModal}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        + Add Event
      </button>

      {/* Modal para agregar o ver detalles de evento */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 font-bold text-lg"
            >
              &times;
            </button>
            
            {selectedEvent && !isEditing ? (
              <>
                <h2 className="text-2xl font-bold mb-3">{selectedEvent.title}</h2>
                <p><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm A')}</p>
                <p><strong>End:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm A')}</p>
                <p><strong>Description:</strong> {selectedEvent.description || "No description"}</p>
                <p><strong>Location:</strong> {selectedEvent.location || "No location"}</p>
                <p><strong>Category:</strong> {selectedEvent.category || "No category"}</p>
                {selectedEvent.userId === uid && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleStartEditEvent(selectedEvent)}
                      className="bg-yellow-500 text-white p-2 rounded w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { handleDeleteEvent(selectedEvent.id, selectedEvent.userId); setIsModalOpen(false); }}
                      className="bg-red-500 text-white p-2 rounded w-full"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-3">{isEditing ? "Edit Event" : "Add New Event"}</h2>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                />
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                >
                  <option value="">Select Category</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Social">Social</option>
                </select>
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
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveEditEvent}
                        className="bg-green-500 text-white p-2 rounded w-full"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => { setIsEditing(false); setIsModalOpen(false); }}
                        className="bg-gray-500 text-white p-2 rounded w-full"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddEvent}
                      className="bg-blue-500 text-white p-2 rounded w-full"
                    >
                      Add Event
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
