import { startFetchDashboardData } from './dashboardThunks';
import {
  fetchDashboardDataStart,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailure,
} from './dashboardSlice';
import { getClubsFromFirestore } from '../../../firebase/provs/clubProviders';
import { getAttendeesForClub } from '../../../firebase/provs/attendeeProviders';

// Mock de los providers
jest.mock('../../../firebase/provs/clubProviders', () => ({
  getClubsFromFirestore: jest.fn(),
}));
jest.mock('../../../firebase/provs/attendeeProviders', () => ({
  getAttendeesForClub: jest.fn(),
}));

describe('Dashboard Thunks - startFetchDashboardData', () => {
  const dispatch = jest.fn();
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchDashboardDataSuccess on successful fetch', async () => {
    const mockClubs = [
      { id: '1', eventType: 'fivedayclub', date: `${currentYear}-06-15` },
      { id: '2', eventType: 'goodnewsdaycamp', date: `${previousYear}-07-20` },
    ];
    const mockAttendees = { ok: true, totalAttendees: 25 };

    // Mockear respuestas de los providers
    getClubsFromFirestore.mockResolvedValueOnce({ ok: true, clubs: mockClubs });
    getAttendeesForClub.mockResolvedValue(mockAttendees);

    await startFetchDashboardData()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchDashboardDataStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchDashboardDataSuccess(expect.objectContaining({
        totalAttendees: 50, // 25 de cada club
        clubComparisonData: [
          { year: previousYear, clubs: 1, attendees: 25 },
          { year: currentYear, clubs: 1, attendees: 25 },
        ],
      }))
    );
  });

  it('should dispatch fetchDashboardDataFailure if getClubsFromFirestore fails', async () => {
    const mockError = 'Failed to fetch clubs';

    // Mockear error en getClubsFromFirestore
    getClubsFromFirestore.mockResolvedValueOnce({ ok: false, errorMessage: mockError });

    await startFetchDashboardData()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchDashboardDataStart());
    expect(dispatch).toHaveBeenCalledWith(fetchDashboardDataFailure(mockError));
  });

  it('should calculate attendees correctly even if getAttendeesForClub fails for some clubs', async () => {
    const mockClubs = [
      { id: '1', eventType: 'fivedayclub', date: `${currentYear}-06-15` },
      { id: '2', eventType: 'goodnewsdaycamp', date: `${previousYear}-07-20` },
    ];
    const mockAttendeesSuccess = { ok: true, totalAttendees: 25 };
    const mockAttendeesFailure = { ok: false };

    // Mockear respuestas de los providers
    getClubsFromFirestore.mockResolvedValueOnce({ ok: true, clubs: mockClubs });
    getAttendeesForClub.mockImplementation((id) => {
      if (id === '1') return Promise.resolve(mockAttendeesSuccess);
      return Promise.resolve(mockAttendeesFailure);
    });

    await startFetchDashboardData()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(fetchDashboardDataStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchDashboardDataSuccess(expect.objectContaining({
        totalAttendees: 25, // Solo el club 1 tiene asistentes
        clubComparisonData: [
          { year: previousYear, clubs: 1, attendees: 0 },
          { year: currentYear, clubs: 1, attendees: 25 },
        ],
      }))
    );
  });
});
