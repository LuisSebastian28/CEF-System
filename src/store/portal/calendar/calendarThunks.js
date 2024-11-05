// src/store/portal/events/eventsThunks.js
import { addEventToFirestore, getEventsFromFirestore, updateEventInFirestore, deleteEventFromFirestore } from '../../..//firebase/provs/eventProviders';
import { eventsLoading, eventsReceived, eventsFailed, eventAdded, eventUpdated, eventDeleted } from '../calendar/calendarSlice';

// Thunk para cargar eventos
export const fetchEvents = () => async (dispatch) => {
  dispatch(eventsLoading());
  
  const { ok, events, errorMessage } = await getEventsFromFirestore();
  
  if (ok) {
    // Convertir `start` y `end` a cadenas de texto en formato ISO
    const serializedEvents = events.map((event) => ({
      ...event,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    }));
    
    dispatch(eventsReceived(serializedEvents));
  } else {
    dispatch(eventsFailed(errorMessage));
  }
};


// Thunk para añadir un evento
export const addEvent = (eventData) => async (dispatch) => {
  const { ok, event, errorMessage } = await addEventToFirestore(eventData);
  if (ok) {
    dispatch(eventAdded(event));
  } else {
    dispatch(eventsFailed(errorMessage));
  }
};

// Thunk para actualizar un evento
export const updateEvent = (eventData) => async (dispatch) => {
  const { ok, errorMessage } = await updateEventInFirestore(eventData);
  if (ok) {
    dispatch(eventUpdated(eventData));
  } else {
    dispatch(eventsFailed(errorMessage));
  }
};

// Thunk para eliminar un evento
export const deleteEvent = (eventId) => async (dispatch) => {
  const { ok, errorMessage } = await deleteEventFromFirestore(eventId);
  if (ok) {
    dispatch(eventDeleted(eventId));
  } else {
    dispatch(eventsFailed(errorMessage));
  }
};
