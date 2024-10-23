// store/portal/dashboard/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: [],
    registrations: [],
    campaigns: [],
    userStatus: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchDashboardDataStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchDashboardDataSuccess(state, action) {
            state.status = 'succeeded';
            state.students = action.payload.students;
            state.registrations = action.payload.registrations;
            state.campaigns = action.payload.campaigns;
            state.userStatus = action.payload.userStatus;
            state.error = null;
        },
        fetchDashboardDataFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    },
});

export const {
    fetchDashboardDataStart,
    fetchDashboardDataSuccess,
    fetchDashboardDataFailure
} = dashboardSlice.actions;

