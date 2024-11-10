import { 
    startCreateClub, 
    startFetchClubs, 
    startDeleteClub, 
    startUpdateClub, 
    startAddAttendee 
} from './clubsThunks';
import { 
    createClubStart, createClubSuccess, createClubFailure,
    fetchClubsStart, fetchClubsSuccess, fetchClubsFailure,
    deleteClub,
    updateClubStart, updateClubSuccess, updateClubFailure 
} from './clubsSlice';
import { 
    addClubToFirestore, getClubsFromFirestore, 
    deleteClubFromFirestore, updateClubInFirestore 
} from '../../../firebase/provs/clubProviders';
import { addAttendeeToFirestore } from '../../../firebase/provs/attendeeProviders';

jest.mock('../../../firebase/provs/clubProviders', () => ({
    addClubToFirestore: jest.fn(),
    getClubsFromFirestore: jest.fn(),
    deleteClubFromFirestore: jest.fn(),
    updateClubInFirestore: jest.fn(),
}));

jest.mock('../../../firebase/provs/attendeeProviders', () => ({
    addAttendeeToFirestore: jest.fn(),
}));

describe('Club Thunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test for startCreateClub
    it('should create a club successfully', async () => {
        const newClub = { name: 'Club A', location: 'Location A' };
        addClubToFirestore.mockResolvedValueOnce({ ok: true, club: { ...newClub, id: 'club123' } });

        await startCreateClub(newClub)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(createClubStart());
        expect(dispatch).toHaveBeenCalledWith(createClubSuccess({ ...newClub, id: 'club123' }));
    });

    it('should handle failure when creating a club', async () => {
        const errorMessage = 'Failed to create club';
        addClubToFirestore.mockResolvedValueOnce({ ok: false, errorMessage });

        await startCreateClub({ name: 'Club A' })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(createClubStart());
        expect(dispatch).toHaveBeenCalledWith(createClubFailure(errorMessage));
    });

    // // Test for startFetchClubs
    // it('should fetch clubs successfully', async () => {
    //     const clubs = [{ id: 'club1', name: 'Club A' }, { id: 'club2', name: 'Club B' }];
    //     getClubsFromFirestore.mockResolvedValueOnce({ ok: true, clubs });

    //     await startFetchClubs()(dispatch);

    //     expect(dispatch).toHaveBeenCalledWith(fetchClubsStart());
    //     expect(dispatch).toHaveBeenCalledWith(fetchClubsSuccess(clubs));
    // });

    it('should handle failure when fetching clubs', async () => {
        const errorMessage = 'Failed to fetch clubs';
        getClubsFromFirestore.mockResolvedValueOnce({ ok: false, errorMessage });

        await startFetchClubs()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(fetchClubsStart());
        expect(dispatch).toHaveBeenCalledWith(fetchClubsFailure(errorMessage));
    });

    // Test for startDeleteClub
    it('should delete a club successfully', async () => {
        deleteClubFromFirestore.mockResolvedValueOnce({ ok: true });

        await startDeleteClub('club123')(dispatch);

        expect(dispatch).toHaveBeenCalledWith(deleteClub('club123'));
    });

    it('should handle failure when deleting a club', async () => {
        console.error = jest.fn();
        const errorMessage = 'Failed to delete club';
        deleteClubFromFirestore.mockRejectedValueOnce(new Error(errorMessage));

        await startDeleteClub('club123')(dispatch);

        expect(console.error).toHaveBeenCalledWith('Error deleting club:', new Error(errorMessage));
    });

    // Test for startUpdateClub
    it('should update a club successfully', async () => {
        const clubId = 'club123';
        const updatedData = { name: 'Updated Club' };
        updateClubInFirestore.mockResolvedValueOnce({ ok: true });

        await startUpdateClub(clubId, updatedData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(updateClubStart());
        expect(dispatch).toHaveBeenCalledWith(updateClubSuccess({ clubId, updatedData }));
    });

    it('should handle failure when updating a club', async () => {
        const clubId = 'club123';
        const updatedData = { name: 'Updated Club' };
        const errorMessage = 'Failed to update club';
        updateClubInFirestore.mockResolvedValueOnce({ ok: false, errorMessage });

        await startUpdateClub(clubId, updatedData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(updateClubStart());
        expect(dispatch).toHaveBeenCalledWith(updateClubFailure(errorMessage));
    });

    // // Test for startAddAttendee
    // it('should add an attendee successfully', async () => {
    //     const clubId = 'club123';
    //     const attendeeData = { name: 'John Doe' };
    //     addAttendeeToFirestore.mockResolvedValueOnce({ ok: true });

    //     await startAddAttendee(clubId, attendeeData)(dispatch);

    //     expect(dispatch).toHaveBeenCalledWith(startFetchClubs());
    // });

    it('should log an error when adding an attendee fails', async () => {
        console.error = jest.fn();
        const clubId = 'club123';
        const attendeeData = { name: 'John Doe' };
        const errorMessage = 'Failed to add attendee';
        addAttendeeToFirestore.mockResolvedValueOnce({ ok: false, errorMessage });

        await startAddAttendee(clubId, attendeeData)(dispatch);

        expect(console.error).toHaveBeenCalledWith(errorMessage);
    });
});
