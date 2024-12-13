import { fetchEvents, addEvent, updateEvent, deleteEvent } from './calendarThunks'; // Corrige la ruta al archivo correcto
import {
  eventsLoading, eventsReceived, eventsFailed, eventAdded,
  eventUpdated,
  eventDeleted
} from '../calendar/calendarSlice';
import {
  getEventsFromFirestore, addEventToFirestore,
  updateEventInFirestore,
  deleteEventFromFirestore,
} from '../../../firebase/provs/eventProviders';

// Mock de los providers
jest.mock('../../../firebase/provs/eventProviders', () => ({
  getEventsFromFirestore: jest.fn(),
  addEventToFirestore: jest.fn(),
  updateEventInFirestore: jest.fn(),
  deleteEventFromFirestore: jest.fn(),
}));

describe('Events Thunks - fetchEvents', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch eventsReceived with events on successful fetch', async () => {
    const mockEvents = [
      { id: '1', title: 'Event 1', start: new Date('2023-12-01'), end: new Date('2023-12-02') },
      { id: '2', title: 'Event 2', start: new Date('2023-12-05'), end: new Date('2023-12-06') },
    ];

    // Mockear respuesta exitosa
    getEventsFromFirestore.mockResolvedValueOnce({
      ok: true,
      events: mockEvents,
    });

    await fetchEvents()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(eventsLoading());
    expect(dispatch).toHaveBeenCalledWith(eventsReceived([
      { id: '1', title: 'Event 1', start: '2023-12-01T00:00:00.000Z', end: '2023-12-02T00:00:00.000Z' },
      { id: '2', title: 'Event 2', start: '2023-12-05T00:00:00.000Z', end: '2023-12-06T00:00:00.000Z' },
    ]));
  });

  it('should dispatch eventsFailed on fetch error', async () => {
    const mockError = 'Failed to fetch events';

    // Mockear error
    getEventsFromFirestore.mockResolvedValueOnce({
      ok: false,
      errorMessage: mockError,
    });

    await fetchEvents()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(eventsLoading());
    expect(dispatch).toHaveBeenCalledWith(eventsFailed(mockError));
  });

  // Pruebas para addEvent
  describe('addEvent', () => {
    it('should dispatch eventAdded on successful addition', async () => {
      const newEvent = { id: '2', title: 'New Event', start: new Date('2023-12-10'), end: new Date('2023-12-11') };
      addEventToFirestore.mockResolvedValueOnce({ ok: true, event: newEvent });

      await addEvent(newEvent)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(eventAdded(newEvent));
    });

    it('should dispatch eventsFailed on addition error', async () => {
      const mockError = 'Addition failed';
      addEventToFirestore.mockResolvedValueOnce({ ok: false, errorMessage: mockError });

      await addEvent({ title: 'New Event' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(eventsFailed(mockError));
    });
  });

  // Pruebas para updateEvent
  describe('updateEvent', () => {
    it('should dispatch eventUpdated on successful update', async () => {
      const updatedEvent = { id: '1', title: 'Updated Event', start: new Date('2023-12-01'), end: new Date('2023-12-02') };
      updateEventInFirestore.mockResolvedValueOnce({ ok: true });

      await updateEvent(updatedEvent)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(eventUpdated(updatedEvent));
    });

    it('should dispatch eventsFailed on update error', async () => {
      const mockError = 'Update failed';
      updateEventInFirestore.mockResolvedValueOnce({ ok: false, errorMessage: mockError });

      await updateEvent({ id: '1', title: 'Updated Event' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(eventsFailed(mockError));
    });
  });

  // Pruebas para deleteEvent
  describe('deleteEvent', () => {
    it('should dispatch eventDeleted on successful deletion', async () => {
      const eventId = '1';
      deleteEventFromFirestore.mockResolvedValueOnce({ ok: true });

      await deleteEvent(eventId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(eventDeleted(eventId));
    });

    it('should dispatch eventsFailed on deletion error', async () => {
      const mockError = 'Deletion failed';
      deleteEventFromFirestore.mockResolvedValueOnce({ ok: false, errorMessage: mockError });

      await deleteEvent('1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(eventsFailed(mockError));
    });
  });
});
