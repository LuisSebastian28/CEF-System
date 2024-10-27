// store/portal/clubs/clubsThunks.js

import { 
  getAttendeesForClub, 
  editAttendeeInFirestore, 
  deleteAttendeeFromFirestore, 
  addAttendeeToFirestore } from "../../../firebase/provs/attendeeProviders";

import {
  addClubToFirestore, 
  deleteClubFromFirestore, 
  updateClubInFirestore, 
  getClubsFromFirestore, 
} from "../../../firebase/provs/clubProviders"

import {
  getUserFromReference, 
} from "../../../firebase/provs/userProviders"

import {
  fetchClubsStart,
  fetchClubsSuccess,
  fetchClubsFailure,
  createClubStart,
  createClubSuccess,
  createClubFailure,
  deleteClub,
  updateClubStart,
  updateClubSuccess,
  updateClubFailure
} from "./clubsSlice";

export const startCreateClub = (clubData) => {
  return async (dispatch) => {
    dispatch(createClubStart());

    try {
      const result = await addClubToFirestore(clubData);
      if (result.ok) {
        dispatch(createClubSuccess(result.club)); // Enviar el club creado al estado
        dispatch(startFetchClubs()); // Refresca la lista de clubes en la app
      } else {
        dispatch(createClubFailure(result.errorMessage));
      }
    } catch (error) {
      dispatch(createClubFailure(error.message));
    }
  };
};

/// Thunk para obtener solo los datos de los clubs
export const startFetchClubs = () => {
  return async (dispatch) => {
    dispatch(fetchClubsStart());

    try {
      // Obtener solo los clubes de Firestore
      const result = await getClubsFromFirestore(); 
      
      if (result.ok) {
        // Traer solo los datos del club sin procesar asistentes o misioneros
        dispatch(fetchClubsSuccess(result.clubs));
      } else {
        dispatch(fetchClubsFailure(result.errorMessage));
      }
    } catch (error) {
      dispatch(fetchClubsFailure(error.message));
    }
  };
};

export const startDeleteClub = (clubId) => {
  return async (dispatch) => {
    try {
      await deleteClubFromFirestore(clubId);
      dispatch(deleteClub(clubId)); // Actualizar el estado en Redux
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };
};

export const startUpdateClub = (clubId, updatedData) => {
  return async (dispatch) => {
    dispatch(updateClubStart());

    try {
      const result = await updateClubInFirestore(clubId, updatedData);
      if (result.ok) {
        dispatch(updateClubSuccess({ clubId, updatedData }));
      } else {
        dispatch(updateClubFailure(result.errorMessage));
      }
    } catch (error) {
      dispatch(updateClubFailure(error.message));
    }
  };
};

// Thunk para agregar un asistente
export const startAddAttendee = (clubId, attendeeData) => {
  return async (dispatch) => {
    try {
      const result = await addAttendeeToFirestore(clubId, attendeeData);
      if (result.ok) {
        dispatch(startFetchClubs()); // Refresca los clubs para ver los cambios
      } else {
        console.error(result.errorMessage);
      }
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };
};

// Thunk para editar un asistente
export const startEditAttendee = (clubId, attendeeData) => {
  return async (dispatch) => {
    try {
      const result = await editAttendeeInFirestore(clubId, attendeeData.id, attendeeData);
      if (result.ok) {
        dispatch(startFetchClubs()); // Refresca los clubs
      } else {
        console.error(result.errorMessage);
      }
    } catch (error) {
      console.error('Error editing attendee:', error);
    }
  };
};

// Thunk para eliminar un asistente
export const startDeleteAttendee = (clubId, attendeeId) => {
  return async (dispatch) => {
    try {
      const result = await deleteAttendeeFromFirestore(clubId, attendeeId);
      if (result.ok) {
        dispatch(startFetchClubs()); // Refresca los clubs
      } else {
        console.error(result.errorMessage);
      }
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };
};
