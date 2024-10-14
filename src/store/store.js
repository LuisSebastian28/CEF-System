import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { usersSlice } from "./portal/users/userSlice";
import { fivedayclubsSlice } from "./portal/insights/fiveDayClubs/fiveDayClubsSlice";
// import { eventSlice } from "./portal/forms/formsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        // events: eventSlice.reducer,
        fivedayclubs: fivedayclubsSlice.reducer,

    }
})