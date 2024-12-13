import {
  startFetchAttendees,
  startAddAttendee,
  startEditAttendee,
  startDeleteAttendee
} from './attendeesThunks';

import {
  fetchAttendeesStart,
  fetchAttendeesSuccess,
  fetchAttendeesFailure,
  deleteAttendeeStart,
  deleteAttendeeFailure
} from './attendeesSlice';

import { 
  getAttendeesForClub, 
  addAttendeeToFirestore, 
  editAttendeeInFirestore, 
  deleteAttendeeFromFirestore 
} from '../../../firebase/provs/attendeeProviders';

// Mock de las funciones de Firebase
jest.mock('../../../firebase/provs/attendeeProviders', () => ({
  getAttendeesForClub: jest.fn(),
  addAttendeeToFirestore: jest.fn(),
  editAttendeeInFirestore: jest.fn(),
  deleteAttendeeFromFirestore: jest.fn(),
}));

describe('Attendees Thunks', () => {
  const dispatch = jest.fn();
  const clubId = 'club123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test para startFetchAttendees
  it('should fetch attendees successfully', async () => {
    const attendees = [{ id: 'attendee1', name: 'John Doe' }];
    getAttendeesForClub.mockResolvedValueOnce({ ok: true, attendees, totalAttendees: 1 });

    await startFetchAttendees(clubId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchAttendeesStart());
    expect(dispatch).toHaveBeenCalledWith(fetchAttendeesSuccess({ attendees, totalAttendees: 1 }));
  });

  it('should handle failure when fetching attendees', async () => {
    const errorMessage = 'Failed to fetch attendees';
    getAttendeesForClub.mockResolvedValueOnce({ ok: false, errorMessage });

    await startFetchAttendees(clubId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchAttendeesStart());
    expect(dispatch).toHaveBeenCalledWith(fetchAttendeesFailure(errorMessage));
  });

  it('should handle unexpected errors when fetching attendees', async () => {
    const errorMessage = 'Unexpected error';
    getAttendeesForClub.mockRejectedValueOnce(new Error(errorMessage));

    await startFetchAttendees(clubId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchAttendeesStart());
    expect(dispatch).toHaveBeenCalledWith(fetchAttendeesFailure(errorMessage));
  });

  // Test para startAddAttendee
  it('should add an attendee successfully', async () => {
    const attendeeData = { name: 'Jane Doe' };
    addAttendeeToFirestore.mockResolvedValueOnce({ ok: true });

    const result = await startAddAttendee(clubId, attendeeData)(dispatch);

    expect(result).toEqual({ ok: true });
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function)); // startFetchAttendees
  });

  it('should handle failure when adding an attendee', async () => {
    const attendeeData = { name: 'Jane Doe' };
    const errorMessage = 'Failed to add attendee';
    addAttendeeToFirestore.mockResolvedValueOnce({ ok: false, errorMessage });

    const result = await startAddAttendee(clubId, attendeeData)(dispatch);

    expect(result).toEqual({ ok: false, errorMessage });
  });

  it('should handle unexpected errors when adding an attendee', async () => {
    const attendeeData = { name: 'Jane Doe' };
    const errorMessage = 'Unexpected error';
    addAttendeeToFirestore.mockRejectedValueOnce(new Error(errorMessage));

    const result = await startAddAttendee(clubId, attendeeData)(dispatch);

    expect(result).toEqual({ ok: false, errorMessage });
  });

  // Test para startEditAttendee
  it('should edit an attendee successfully', async () => {
    const attendeeId = 'attendee1';
    const attendeeData = { name: 'John Smith' };
    editAttendeeInFirestore.mockResolvedValueOnce({ ok: true });

    const result = await startEditAttendee(clubId, attendeeId, attendeeData)(dispatch);

    expect(result).toEqual({ ok: true });
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function)); // startFetchAttendees
  });

  it('should handle failure when editing an attendee', async () => {
    const attendeeId = 'attendee1';
    const attendeeData = { name: 'John Smith' };
    const errorMessage = 'Failed to edit attendee';
    editAttendeeInFirestore.mockResolvedValueOnce({ ok: false, errorMessage });

    const result = await startEditAttendee(clubId, attendeeId, attendeeData)(dispatch);

    expect(result).toEqual({ ok: false, errorMessage });
  });

  it('should handle unexpected errors when editing an attendee', async () => {
    const attendeeId = 'attendee1';
    const attendeeData = { name: 'John Smith' };
    const errorMessage = 'Unexpected error';
    editAttendeeInFirestore.mockRejectedValueOnce(new Error(errorMessage));

    const result = await startEditAttendee(clubId, attendeeId, attendeeData)(dispatch);

    expect(result).toEqual({ ok: false, errorMessage });
  });

  // Test para startDeleteAttendee
  it('should delete an attendee successfully', async () => {
    const attendeeId = 'attendee1';
    deleteAttendeeFromFirestore.mockResolvedValueOnce({ ok: true });

    const result = await startDeleteAttendee(clubId, attendeeId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteAttendeeStart());
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function)); // startFetchAttendees
    expect(result).toEqual({ ok: true });
  });

  it('should handle failure when deleting an attendee', async () => {
    const attendeeId = 'attendee1';
    const errorMessage = 'Failed to delete attendee';
    deleteAttendeeFromFirestore.mockResolvedValueOnce({ ok: false, errorMessage });

    const result = await startDeleteAttendee(clubId, attendeeId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteAttendeeStart());
    expect(dispatch).toHaveBeenCalledWith(deleteAttendeeFailure(errorMessage));
    expect(result).toEqual({ ok: false, errorMessage });
  });

  it('should handle unexpected errors when deleting an attendee', async () => {
    const attendeeId = 'attendee1';
    const errorMessage = 'Unexpected error';
    deleteAttendeeFromFirestore.mockRejectedValueOnce(new Error(errorMessage));

    const result = await startDeleteAttendee(clubId, attendeeId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteAttendeeStart());
    expect(dispatch).toHaveBeenCalledWith(deleteAttendeeFailure(errorMessage));
    expect(result).toEqual({ ok: false, errorMessage });
  });
});
