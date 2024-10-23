// store/portal/users/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    status: 'idle',
    error: null,
    newClubAdded: false,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Acciones para obtener usuarios
        fetchUsersStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchUsersSuccess(state, action) {
            state.status = 'succeeded';
            state.users = action.payload;
            state.error = null;
        },
        fetchUsersFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },

        // Acciones para agregar usuarios
        addUserStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        addUserSuccess(state, action) {
            state.status = 'succeeded';
            state.users.push(action.payload);
            state.error = null;
        },
        addUserFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },

        // Acciones para actualizar usuarios
        updateUserStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        updateUserSuccess(state, action) {
            state.status = 'succeeded';
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
            state.error = null;
        },
        updateUserFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },

        // Acciones para eliminar usuarios
        deleteUserStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        deleteUserSuccess(state, action) {
            state.status = 'succeeded';
            state.users = state.users.filter((user) => user.id !== action.payload); // Eliminar el usuario
            state.error = null;
        },
        deleteUserFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        createClubSuccess(state, action) {
            state.status = "succeeded";
            state.clubs.push(action.payload);
            state.newClubAdded = true;  // Activamos el flag cuando se añade un nuevo club
        },
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,

    addUserStart,
    addUserSuccess,
    addUserFailure,

    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,

    createClubSuccess
} = usersSlice.actions;

