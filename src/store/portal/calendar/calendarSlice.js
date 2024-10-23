import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        isLoading: false,
        errorMessage: null
    },
    reducers: {
        setEvents: (state, { payload }) => {
            state.events = payload;
            state.isLoading = false;
        },
        addNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.isLoading = false;
        },
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, { payload }) => {
            state.errorMessage = payload;
            state.isLoading = false;
        }
    }
});

export const { setEvents, addNewEvent, setLoading, setError } = eventSlice.actions;
export default eventSlice;
