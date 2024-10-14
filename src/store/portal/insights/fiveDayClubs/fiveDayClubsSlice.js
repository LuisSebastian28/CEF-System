// store/portal/fivedayclubs/fivedayclubsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fivedayclubs: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const fivedayclubsSlice = createSlice({
    name: 'fivedayclubs',
    initialState,
    reducers: {
        fetchFivedayclubsStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchFivedayclubsSuccess(state, action) {
            state.status = 'succeeded';
            state.fivedayclubs = action.payload;
            state.error = null;
        },
        fetchFivedayclubsFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        // (Opcional) Agrega más acciones si necesitas agregar, actualizar o eliminar fivedayclubs
    },
});

export const {
    fetchFivedayclubsStart,
    fetchFivedayclubsSuccess,
    fetchFivedayclubsFailure,
} = fivedayclubsSlice.actions;

