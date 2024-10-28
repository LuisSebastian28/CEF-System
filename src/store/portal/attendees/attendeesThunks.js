// attendeesThunks.js
import {  getAttendeesForClub,
  addAttendeeToFirestore,
  editAttendeeInFirestore,
  deleteAttendeeFromFirestore,} from '../../../firebase/provs/attendeeProviders';
import {   fetchAttendeesStart,
  fetchAttendeesSuccess,
  fetchAttendeesFailure,
  deleteAttendeeStart,
  deleteAttendeeFailure } from './attendeesSlice';

export const startFetchAttendees = (clubId) => async (dispatch) => {
  dispatch(fetchAttendeesStart());

  try {
    const result = await getAttendeesForClub(clubId);
    if (result.ok) {
      dispatch(fetchAttendeesSuccess({
        attendees: result.attendees,
        totalAttendees: result.totalAttendees,
      }));
    } else {
      dispatch(fetchAttendeesFailure(result.errorMessage));
    }
  } catch (error) {
    dispatch(fetchAttendeesFailure(error.message));
  }
};

export const startAddAttendee = (clubId, attendeeData) => async (dispatch) => {
  try {
    const result = await addAttendeeToFirestore(clubId, attendeeData);
    if (result.ok) {
      dispatch(startFetchAttendees(clubId));
      return { ok: true };
    } else {
      return { ok: false, errorMessage: result.errorMessage };
    }
  } catch (error) {
    console.error("Error adding attendee:", error);
    return { ok: false, errorMessage: error.message };
  }
};

// Nuevo thunk para editar un asistente
export const startEditAttendee = (clubId, attendeeId, attendeeData) => async (dispatch) => {
  try {
    const result = await editAttendeeInFirestore(clubId, attendeeId, attendeeData);
    if (result.ok) {
      dispatch(startFetchAttendees(clubId));
      return { ok: true };
    } else {
      return { ok: false, errorMessage: result.errorMessage };
    }
  } catch (error) {
    console.error("Error editing attendee:", error);
    return { ok: false, errorMessage: error.message };
  }
};

export const startDeleteAttendee = (clubId, attendeeId) => async (dispatch) => {
  dispatch(deleteAttendeeStart());
  try {
    const result = await deleteAttendeeFromFirestore(clubId, attendeeId);
    if (result.ok) {
      dispatch(startFetchAttendees(clubId));
      return { ok: true };
    } else {
      dispatch(deleteAttendeeFailure(result.errorMessage));
      return { ok: false, errorMessage: result.errorMessage };
    }
  } catch (error) {
    console.error("Error deleting attendee:", error);
    dispatch(deleteAttendeeFailure(error.message));
    return { ok: false, errorMessage: error.message };
  }
};