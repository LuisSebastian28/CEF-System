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

        const filterAndCombineEvents = (eventType) => 
          clubsResult.clubs.filter(club => club.eventType === eventType);

        const fiveDayClubs = filterAndCombineEvents('fivedayclub');
        const goodNewsCamps = filterAndCombineEvents('goodnewsdaycamp');
        const allEvents = [...fiveDayClubs, ...goodNewsCamps];

        const filterByYear = (year) => 
          allEvents.filter(event => new Date(event.date).getFullYear() === year);

        const currentYearClubs = filterByYear(currentYear);
        const previousYearClubs = filterByYear(previousYear);

        const getTotalAttendeesByMonth = async (events) => {
          const months = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(0, i).toLocaleString('default', { month: 'short' }),
            attendees: 0,
          }));

          await Promise.all(events.map(async (event) => {
            const month = new Date(event.date).getMonth();
            const attendeesResult = await getAttendeesForClub(event.id);
            if (attendeesResult.ok) {
              months[month].attendees += attendeesResult.totalAttendees;
            }
          }));

          return months;
        };

        const currentYearAttendeesByMonth = await getTotalAttendeesByMonth(currentYearClubs);
        const previousYearAttendeesByMonth = await getTotalAttendeesByMonth(previousYearClubs);

        const calculateTotalAttendees = (attendeesByMonth) =>
          attendeesByMonth.reduce((acc, cur) => acc + cur.attendees, 0);

        const currentYearAttendees = calculateTotalAttendees(currentYearAttendeesByMonth);
        const previousYearAttendees = calculateTotalAttendees(previousYearAttendeesByMonth);

        const clubComparisonData = [
          { year: previousYear, clubs: previousYearClubs.length, attendees: previousYearAttendees },
          { year: currentYear, clubs: currentYearClubs.length, attendees: currentYearAttendees },
        ];

        const groupByMonth = (events) => {
          const months = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(0, i).toLocaleString('default', { month: 'short' }),
            clubs: 0,
          }));
          events.forEach(event => months[new Date(event.date).getMonth()].clubs += 1);
          return months;
        };

        const currentYearClubsByMonth = groupByMonth(currentYearClubs);
        const previousYearClubsByMonth = groupByMonth(previousYearClubs);

        const data = {
          clubComparisonData,
          totalAttendees: currentYearAttendees + previousYearAttendees,
          currentYearClubsByMonth,
          previousYearClubsByMonth,
          currentYearAttendeesByMonth,
          previousYearAttendeesByMonth
        };

        dispatch(fetchDashboardDataSuccess(data));
        localStorage.setItem("dashboardData", JSON.stringify(data));
      } else {
        dispatch(fetchDashboardDataFailure(clubsResult.errorMessage));
      }
    } catch (error) {
      dispatch(fetchDashboardDataFailure(error.message));
    }
  };
};
