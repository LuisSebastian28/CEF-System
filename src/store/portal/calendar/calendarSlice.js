// src/store/portal/events/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  status: 'idle', // 'loading', 'succeeded', 'failed'
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    eventsLoading(state) {
      state.status = 'loading';
    },
    eventsReceived(state, action) {
      state.status = 'succeeded';
      state.events = action.payload;
    },
    eventsFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    eventAdded(state, action) {
      state.events.push(action.payload);
    },
    eventUpdated(state, action) {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    eventDeleted(state, action) {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const {
  eventsLoading,
  eventsReceived,
  eventsFailed,
  eventAdded,
  eventUpdated,
  eventDeleted,
} = eventSlice.actions;

export default eventSlice;
