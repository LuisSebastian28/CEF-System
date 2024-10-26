import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated, 'athenticated'
        uid: null,
        email: null,
        firstName: null,
        lastName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            console.log(payload)
            state.status = 'authenticated' // 'checking', 'not-authenticated, 'athenticated'
            state.uid = payload.uid
            state.email = payload.email
            state.firstName = payload.firstName
            state.lastName = payload.lastName
            state.photoURL = payload.photoURL
            state.errorMessage = null
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated' // 'checking', 'not-authenticated, 'athenticated'
            state.uid = null
            state.email = null
            state.firstName = null
            state.lastName = null
            state.photoURL = null
            state.errorMessage = payload?.errorMessage
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;