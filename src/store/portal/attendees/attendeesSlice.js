// attendeesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attendees: [],
  totalAttendees: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {
    fetchAttendeesStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchAttendeesSuccess(state, action) {
      state.status = 'succeeded';
      state.attendees = action.payload.attendees;
      state.totalAttendees = action.payload.totalAttendees;
    },
    fetchAttendeesFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addAttendeeStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    addAttendeeFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    editAttendeeStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    editAttendeeFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteAttendeeStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    deleteAttendeeFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchAttendeesStart,
  fetchAttendeesSuccess,
  fetchAttendeesFailure,
  addAttendeeStart,
  addAttendeeFailure,
  editAttendeeStart,
  editAttendeeFailure,
  deleteAttendeeStart,
  deleteAttendeeFailure,
} = attendeesSlice.actions;

export default attendeesSlice.reducer;
