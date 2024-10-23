// store/portal/clubs/clubsThunks.js

import { getClubsFromFirestore, getAttendeesForClub, getUserFromReference, addClubToFirestore, deleteClubFromFirestore, updateClubInFirestore, editAttendeeInFirestore, deleteAttendeeFromFirestore, addAttendeeToFirestore } from "../../../firebase/providers";
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

// Thunk para obtener todos los clubs (fivedayclubs, goodnewscamps, etc.)
export const startFetchClubs = () => {
  return async (dispatch) => {
    dispatch(fetchClubsStart());

    try {
      const result = await getClubsFromFirestore(); // Ahora obtiene todos los clubes
      if (result.ok) {
        const clubs = result.clubs;

        // Extraer todas las referencias únicas de Missionary
        const missionaryRefs = [
          ...new Set(clubs.map((club) => club.missionary).filter((ref) => ref)),
        ];

        // Obtener datos de todos los Missionaries
        const missionariesPromises = missionaryRefs.map((ref) => getUserFromReference(ref));
        const missionariesResults = await Promise.all(missionariesPromises);

        // Crear un mapa de referencia a datos del Missionary
        const missionaryMap = {};
        missionariesResults.forEach((res, index) => {
          const ref = missionaryRefs[index];
          if (res.ok) {
            missionaryMap[ref.path] = res.user;
          } else {
            missionaryMap[ref.path] = { error: res.errorMessage };
          }
        });

        // Obtener asistentes para cada club y anexar datos del Missionary
        const clubsWithDetails = await Promise.all(
          clubs.map(async (club) => {
            // Obtener asistentes
            const attendeesResult = await getAttendeesForClub(club.id);
            // Obtener datos del Missionary
            const missionaryRef = club.missionary;
            let missionaryData = {};
            if (missionaryRef) {
              const missionaryInfo = missionaryMap[missionaryRef.path];
              missionaryData = missionaryInfo || { error: 'Datos del Missionary no disponibles.' };
            }

            return {
              ...club,
              attendees: attendeesResult.attendees,
              totalAttendees: attendeesResult.totalAttendees,
              missionaryData,
            };
          })
        );

        dispatch(fetchClubsSuccess(clubsWithDetails));
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
