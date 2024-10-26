import { getClubsFromFirestore } from "../../../firebase/provs/clubProviders";
import { getAttendeesForClub } from "../../../firebase/provs/attendeeProviders";
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
                const currentYear = new Date().getFullYear();
                const previousYear = currentYear - 1;

                // Filtrar tanto los Five Day Clubs como Good News Day Camps
                const fiveDayClubs = clubsResult.clubs.filter(club => club.eventType === 'fivedayclub');
                const goodNewsCamps = clubsResult.clubs.filter(club => club.eventType === 'goodnewsdaycamp');

                // Combinar ambos tipos de eventos
                const allEvents = [...fiveDayClubs, ...goodNewsCamps];

                // Separar por año
                const currentYearClubs = allEvents.filter(event => new Date(event.date).getFullYear() === currentYear);
                const previousYearClubs = allEvents.filter(event => new Date(event.date).getFullYear() === previousYear);

                // Obtener asistentes totales por club y agrupar por mes
                const getTotalAttendeesByMonth = async (events) => {
                    const months = Array.from({ length: 12 }, (_, i) => ({
                        month: new Date(0, i).toLocaleString('default', { month: 'short' }),
                        attendees: 0,
                    }));

                    for (const event of events) {
                        const month = new Date(event.date).getMonth(); // Obtener el mes del evento
                        const attendeesResult = await getAttendeesForClub(event.id);
                        if (attendeesResult.ok) {
                            months[month].attendees += attendeesResult.totalAttendees;
                        }
                    }

                    return months;
                };

                // Obtener asistentes y clubes agrupados por mes para cada año
                const currentYearAttendeesByMonth = await getTotalAttendeesByMonth(currentYearClubs);
                const previousYearAttendeesByMonth = await getTotalAttendeesByMonth(previousYearClubs);

                // Calcular asistentes totales por año
                const currentYearAttendees = currentYearAttendeesByMonth.reduce((acc, cur) => acc + cur.attendees, 0);
                const previousYearAttendees = previousYearAttendeesByMonth.reduce((acc, cur) => acc + cur.attendees, 0);

                const clubComparisonData = [
                    { year: previousYear, clubs: previousYearClubs.length, attendees: previousYearAttendees },
                    { year: currentYear, clubs: currentYearClubs.length, attendees: currentYearAttendees },
                ];

                // Agrupar eventos por mes para el gráfico mensual de eventos
                const groupByMonth = (events) => {
                    const months = Array.from({ length: 12 }, (_, i) => ({
                        month: new Date(0, i).toLocaleString('default', { month: 'short' }),
                        clubs: 0
                    }));

                    events.forEach(event => {
                        const month = new Date(event.date).getMonth(); // Obtener el mes del evento
                        months[month].clubs += 1;
                    });

                    return months;
                };

                const currentYearClubsByMonth = groupByMonth(currentYearClubs);
                const previousYearClubsByMonth = groupByMonth(previousYearClubs);

                // Dispatch con los datos de clubes y campamentos
                dispatch(fetchDashboardDataSuccess({
                    clubComparisonData,
                    totalAttendees: currentYearAttendees + previousYearAttendees,
                    currentYearClubsByMonth,
                    previousYearClubsByMonth,
                    currentYearAttendeesByMonth,
                    previousYearAttendeesByMonth
                }));
            } else {
                dispatch(fetchDashboardDataFailure(clubsResult.errorMessage));
            }
        } catch (error) {
            dispatch(fetchDashboardDataFailure(error.message));
        }
    };
};
