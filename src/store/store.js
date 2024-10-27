import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { usersSlice } from "./portal/users/userSlice";
import { clubsSlice } from "./portal/clubs/clubsSlice";
import { dashboardSlice } from "./portal/dashboard/dashboardSlice";
import resourcesSlice from "./portal/resourcesCef/resourcesSlice";
import eventSlice from "./portal/calendar/calendarSlice";
import { attendeesSlice } from "./portal/attendees/attendeesSlice";
// import { eventSlice } from "./portal/forms/formsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        // events: eventSlice.reducer,
        clubs: clubsSlice.reducer,
        dashboard: dashboardSlice.reducer,
        events: eventSlice.reducer,
        resources: resourcesSlice.reducer,
        attendees: attendeesSlice.reducer
    }
})