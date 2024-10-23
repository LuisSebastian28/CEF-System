import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { usersSlice } from "./portal/users/userSlice";
import { fivedayclubsSlice } from "./portal/insights/fiveDayClubs/fiveDayClubsSlice";
import { clubsSlice } from "./portal/clubs/clubsSlice";
import { dashboardSlice } from "./portal/dashboard/dashboardSlice";
// import { eventSlice } from "./portal/forms/formsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        // events: eventSlice.reducer,
        clubs: clubsSlice.reducer,
        dashboard: dashboardSlice.reducer
    }
})