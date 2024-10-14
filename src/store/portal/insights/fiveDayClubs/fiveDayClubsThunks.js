// store/portal/fivedayclubs/fivedayclubsThunks.js

import { getFivedayclubsFromFirestore, getAttendeesForFivedayclub, getUserFromReference } from "../../../../firebase/providers";
import {
    fetchFivedayclubsStart,
    fetchFivedayclubsSuccess,
    fetchFivedayclubsFailure,
} from "./fiveDayClubsSlice";

// Thunk para obtener los 5-Day Clubs junto con los datos del Missionary y asistentes
export const startFetchFivedayclubs = () => {
    return async (dispatch) => {
        dispatch(fetchFivedayclubsStart());

        try {
            const result = await getFivedayclubsFromFirestore();
            if (result.ok) {
                const clubs = result.fivedayclubs;

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
                        const attendeesResult = await getAttendeesForFivedayclub(club.id);
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

                dispatch(fetchFivedayclubsSuccess(clubsWithDetails));
            } else {
                dispatch(fetchFivedayclubsFailure(result.errorMessage));
            }
        } catch (error) {
            dispatch(fetchFivedayclubsFailure(error.message));
        }
    };
};
