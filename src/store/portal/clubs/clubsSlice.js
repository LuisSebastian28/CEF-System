// store/portal/clubs/clubsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clubs: [], // Ahora contiene todos los tipos de clubes
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const clubsSlice = createSlice({
    name: 'clubs',
    initialState,
    reducers: {
        fetchClubsStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchClubsSuccess(state, action) {
            state.status = 'succeeded';
            state.clubs = action.payload;
            state.error = null;
        },
        fetchClubsFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        createClubStart(state) {
            state.status = "loading";
            state.error = null;
        },
        createClubSuccess(state, action) {
            state.status = "succeeded";
            state.clubs.push(action.payload); // Añadir el club creado al estado
        },
        createClubFailure(state, action) {
            state.status = "failed";
            state.error = action.payload;
        },
        // fetchClubsSuccess(state, action) {
        //     state.status = 'succeeded';
        //     state.clubs = action.payload;
        // },
        deleteClub(state, action) {
            state.clubs = state.clubs.filter(club => club.id !== action.payload);
        },
        // store/portal/clubs/clubsSlice.js

        updateClubStart(state) {
            state.status = "loading";
            state.error = null;
        },
        updateClubSuccess(state, action) {
            const { clubId, updatedData } = action.payload;
            const existingClub = state.clubs.find(club => club.id === clubId);
            if (existingClub) {
                Object.assign(existingClub, updatedData); // Actualizar los datos del club
            }
            state.status = "succeeded";
        },
        updateClubFailure(state, action) {
            state.status = "failed";
            state.error = action.payload;
        },

    },
});

export const {
    fetchClubsStart,
    fetchClubsSuccess,
    fetchClubsFailure,

    createClubStart,
    createClubSuccess,
    createClubFailure,

    updateClubStart,
    updateClubSuccess,
    updateClubFailure,

    deleteClub
} = clubsSlice.actions;

export default clubsSlice;
