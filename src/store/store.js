    import { configureStore } from "@reduxjs/toolkit";
    import { authSlice } from "./auth/authSlice";
    import { usersSlice } from "./portal/users/userSlice";
// import { eventSlice } from "./portal/forms/formsSlice";

    export const store = configureStore({
        reducer: {
            auth: authSlice.reducer,    
            users: usersSlice.reducer,
            // events: eventSlice.reducer,

        }
    })