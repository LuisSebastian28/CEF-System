import {
    addEventToFirestore,
    getEventsFromFirestore,
    updateEventInFirestore,
    deleteEventFromFirestore
} from '../../../firebase/providers';
import { setEvents, addNewEvent, updateEvent, deleteEvent, setLoading, setError } from '../../portal/calendar/calendarSlice';

export const startAddingNewEvent = (eventData) => {
    return async (dispatch) => {
        dispatch(setLoading());
        
        const { ok, event, errorMessage } = await addEventToFirestore(eventData);

        if (ok) {
            dispatch(addNewEvent(event));  // Actualizar el estado en Redux con el nuevo evento
        } else {
            dispatch(setError(errorMessage));  // Manejar errores
        }
    };
};