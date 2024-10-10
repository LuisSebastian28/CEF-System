// import { createSlice } from '@reduxjs/toolkit';
// import { addDoc, collection } from 'firebase/firestore';
// import { FirebaseDB } from '../../firebase/firebaseConfig';

// // Estado inicial
// const initialState = {
//   events: [],
//   isSaving: false,
//   errorMessage: null,
// };

// // Slice
// const eventSlice = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//     startSavingEvent: (state) => {
//       state.isSaving = true;
//     },
//     eventAdded: (state, action) => {
//       state.isSaving = false;
//       state.events.push(action.payload);
//     },
//     savingError: (state, action) => {
//       state.isSaving = false;
//       state.errorMessage = action.payload;
//     },
//   },
// });

// export const { startSavingEvent, eventAdded, savingError } = eventSlice.actions;

