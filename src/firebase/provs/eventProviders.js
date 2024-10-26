// eventProviders.js
import { doc, getDocs, collection, addDoc, updateDoc, query, orderBy, Timestamp, deleteDoc } from 'firebase/firestore';
import { FirebaseDB } from '../firebaseConfig';


export const addEventToFirestore = async (eventData) => {
    try {
        const docRef = await addDoc(collection(FirebaseDB, "events"), {
            ...eventData,
            start: Timestamp.fromDate(new Date(eventData.start)),
            end: Timestamp.fromDate(new Date(eventData.end)),
        });
        return { ok: true, event: { id: docRef.id, ...eventData } };
    } catch (error) {
        console.error("Error adding event: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

export const getEventsFromFirestore = async () => {
    try {
        const eventsRef = collection(FirebaseDB, "events");
        const q = query(eventsRef, orderBy("start", "asc"));
        const querySnapshot = await getDocs(q);

        const events = [];
        querySnapshot.forEach((doc) => {
            const event = doc.data();
            events.push({
                id: doc.id,
                ...event,
                start: event.start.toDate(), // Convertir Timestamp a Date
                end: event.end.toDate(),     // Convertir Timestamp a Date
            });
        });

        return { ok: true, events };
    } catch (error) {
        console.error("Error fetching events: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

// Función para actualizar un evento en Firestore

export const updateEventInFirestore = async (eventData) => {
    try {
        // Referencia al documento del evento específico
        const eventDocRef = doc(FirebaseDB, 'events', eventData.id);

        // Convertir las fechas a Timestamp de Firestore
        const updatedEvent = {
            ...eventData,
            start: Timestamp.fromDate(new Date(eventData.start)),
            end: Timestamp.fromDate(new Date(eventData.end))
        };

        // Actualizar el documento en Firestore con los nuevos datos
        await updateDoc(eventDocRef, updatedEvent);

        return { ok: true };
    } catch (error) {
        console.error("Error updating event:", error);
        return { ok: false, errorMessage: error.message };
    }
};

export const deleteEventFromFirestore = async (eventId) => {
    try {
      await deleteDoc(doc(FirebaseDB, 'events', eventId));
      return { ok: true };
    } catch (error) {
      console.error("Error deleting event:", error);
      return { ok: false, errorMessage: error.message };
    }
  };