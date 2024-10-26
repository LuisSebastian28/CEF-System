// attendeeProviders.js
import { doc, getDocs, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FirebaseDB } from '../firebaseConfig';

export const getAttendeesForClub = async (clubId) => {
    try {
        const attendanceRef = collection(FirebaseDB, `clubs/${clubId}/attendance`); // Cambiar la ruta a "clubs"
        const querySnapshot = await getDocs(attendanceRef);
        const attendees = [];
        querySnapshot.forEach((doc) => {
            attendees.push({ id: doc.id, ...doc.data() });
        });

        // Devolver la lista de asistentes y el total de asistentes
        return { ok: true, attendees, totalAttendees: attendees.length };
    } catch (error) {
        console.error("Error fetching attendees: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

export const addAttendeeToFirestore = async (clubId, attendeeData) => {
    console.log(clubId)
    try {
      const attendanceRef = collection(FirebaseDB, `clubs/${clubId}/attendance`); // Referencia a la subcolección de attendance
      const docRef = await addDoc(attendanceRef, attendeeData); // Añadir el nuevo asistente
      return { ok: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding attendee:', error);
      return { ok: false, errorMessage: error.message };
    }
  };

  // Función para editar un asistente en Firestore
export const editAttendeeInFirestore = async (clubId, attendeeId, attendeeData) => {
    try {
      const attendeeDocRef = doc(FirebaseDB, `clubs/${clubId}/attendance/${attendeeId}`); // Referencia al documento del asistente
      await updateDoc(attendeeDocRef, attendeeData); // Actualizar el asistente
      return { ok: true };
    } catch (error) {
      console.error('Error editing attendee:', error);
      return { ok: false, errorMessage: error.message };
    }
  };
  
  // Función para eliminar un asistente de Firestore
export const deleteAttendeeFromFirestore = async (clubId, attendeeId) => {
    try {
      const attendeeDocRef = doc(FirebaseDB, `clubs/${clubId}/attendance/${attendeeId}`); // Referencia al documento del asistente
      await deleteDoc(attendeeDocRef); // Eliminar el asistente
      return { ok: true };
    } catch (error) {
      console.error('Error deleting attendee:', error);
      return { ok: false, errorMessage: error.message };
    }
  };
  



// // Obtener asistentes de un 5-Day Club específico desde Firestore
// export const getAttendeesForFivedayclub = async (clubId) => {
//     try {
//         const attendanceRef = collection(FirebaseDB, `fivedayclubs/${clubId}/attendance`);
//         const querySnapshot = await getDocs(attendanceRef);
//         const attendees = [];
//         querySnapshot.forEach((doc) => {
//             attendees.push({ id: doc.id, ...doc.data() });
//         });

//         // Devolver la lista de asistentes y el total de asistentes
//         return { ok: true, attendees, totalAttendees: attendees.length };
//     } catch (error) {
//         console.error("Error fetching attendees: ", error);
//         return { ok: false, errorMessage: error.message };
//     }
// };