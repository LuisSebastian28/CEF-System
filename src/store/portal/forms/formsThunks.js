// import { collection, addDoc } from 'firebase/firestore';
// import { FirebaseDB } from '../firebase/firebaseConfig';
// import { startSavingEvent, eventSaved, setErrorMessage } from './eventsSlice';

// export const startSavingEventInFirebase = (eventData) => {
//   return async (dispatch) => {
//     dispatch(startSavingEvent());

//     try {
//       const docRef = await addDoc(collection(FirebaseDB, 'events'), eventData);
//       const savedEvent = { id: docRef.id, ...eventData };
//       dispatch(eventSaved(savedEvent));
//     } catch (error) {
//       console.error('Error adding event: ', error);
//       dispatch(setErrorMessage(error.message));
//     }
//   };
// };
