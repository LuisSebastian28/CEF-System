import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clubComparisonData: [],        // Comparación entre clubes por año
    totalAttendees: 0,             // Total de asistentes entre años
    currentYearClubsByMonth: [],   // Clubes por mes del año actual
    previousYearClubsByMonth: [],  // Clubes por mes del año anterior
    currentYearAttendeesByMonth: [], // Asistentes por mes del año actual
    previousYearAttendeesByMonth: [], // Asistentes por mes del año anterior
    status: 'idle',                // 'idle' | 'loading' | 'succeeded' | 'failed'
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
            state.clubComparisonData = action.payload.clubComparisonData;
            state.totalAttendees = action.payload.totalAttendees;
            state.currentYearClubsByMonth = action.payload.currentYearClubsByMonth;
            state.previousYearClubsByMonth = action.payload.previousYearClubsByMonth;
            state.currentYearAttendeesByMonth = action.payload.currentYearAttendeesByMonth;
            state.previousYearAttendeesByMonth = action.payload.previousYearAttendeesByMonth;
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
