// store/portal/dashboard/dashboardThunks.js
import { getClubsFromFirestore, getAttendeesForClub } from "../../../firebase/providers";
import {
    fetchDashboardDataStart,
    fetchDashboardDataSuccess,
    fetchDashboardDataFailure,
} from "./dashboardSlice";

export const startFetchDashboardData = () => {
    return async (dispatch) => {
        dispatch(fetchDashboardDataStart());

        try {
            const clubsResult = await getClubsFromFirestore();
            if (clubsResult.ok) {
                const studentsData = clubsResult.clubs.map(club => ({
                    month: club.date ? new Date(club.date).toLocaleString('default', { month: 'short' }) : 'Unknown',
                    students: parseInt(club.offering) || 0 // Simulando 'students' con datos disponibles, aquí se puede ajustar según el contexto
                }));

                const registrationsData = clubsResult.clubs.map(club => ({
                    month: club.date ? new Date(club.date).toLocaleString('default', { month: 'short' }) : 'Unknown',
                    registrations: club.helper ? club.helper.split(',').length : 0 // Simulando 'registrations' con el número de helpers
                }));

                const campaignsData = clubsResult.clubs.map(club => ({
                    name: club.club || 'Unknown', // Usar el campo 'club' para los nombres de campaña
                    participants: club.helper ? club.helper.split(',').length : 0 // Simulando 'participants' con el número de helpers
                }));

                const userStatusData = clubsResult.clubs.map(club => ({
                    name: club.eventType || 'Unknown', // Usar el campo 'eventType' para simular el estado del usuario
                    value: parseInt(club.offering) || 0 // Simulando 'user status' con el valor de 'offering'
                }));

                dispatch(fetchDashboardDataSuccess({
                    students: studentsData,
                    registrations: registrationsData,
                    campaigns: campaignsData,
                    userStatus: userStatusData,
                }));
            } else {
                dispatch(fetchDashboardDataFailure(clubsResult.errorMessage));
            }
        } catch (error) {
            dispatch(fetchDashboardDataFailure(error.message));
        }
    };
};
