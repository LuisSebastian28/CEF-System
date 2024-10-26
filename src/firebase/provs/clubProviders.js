// clubProviders.js
import { doc, getDocs, collection, query, orderBy, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FirebaseDB } from '../firebaseConfig';

// Obtener todos los clubs de Firestore
export const getClubsFromFirestore = async () => {
    try {
        const clubsRef = collection(FirebaseDB, "clubs"); // Cambia el nombre de la colección a "clubs"
        const q = query(clubsRef, orderBy("date", "desc")); // Ordenar por fecha descendente
        const querySnapshot = await getDocs(q);
        const clubs = [];
        querySnapshot.forEach((doc) => {
            clubs.push({ id: doc.id, ...doc.data() });
        });
        return { ok: true, clubs };
    } catch (error) {
        console.error("Error fetching clubs: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

// Función para añadir un nuevo club a Firestore
export const addClubToFirestore = async (clubData) => {
    console.log(clubData)
    try {
      const docRef = await addDoc(collection(FirebaseDB, "clubs"), clubData);
      return { ok: true, club: { id: docRef.id, ...clubData } };
    } catch (error) {
      console.error("Error creating club: ", error);
      return { ok: false, errorMessage: error.message };
    }
  };


// Función para eliminar un club de Firestore
export const deleteClubFromFirestore = async (clubId) => {
    try {
      const clubDocRef = doc(FirebaseDB, `clubs/${clubId}`);
      await deleteDoc(clubDocRef);
      return { ok: true };
    } catch (error) {
      console.error("Error deleting club:", error);
      return { ok: false, errorMessage: error.message };
    }
  };

  export const updateClubInFirestore = async (clubId, updatedData) => {
    try {
      // Referencia al documento del club específico
      const clubDocRef = doc(FirebaseDB, "clubs", clubId);
  
      // Actualizar el documento en Firestore con los nuevos datos
      await updateDoc(clubDocRef, updatedData);
  
      return { ok: true };
    } catch (error) {
      console.error("Error updating club:", error);
      return { ok: false, errorMessage: error.message };
    }
  };

//     // Obtener todos los 5-Day Clubs de Firestore
// export const getFivedayclubsFromFirestore = async () => {
//     try {
//         const clubsRef = collection(FirebaseDB, "fivedayclubs");
//         const q = query(clubsRef, orderBy("date", "desc")); // Ordenar por fecha descendente
//         const querySnapshot = await getDocs(q);
//         const fivedayclubs = [];
//         querySnapshot.forEach((doc) => {
//             fivedayclubs.push({ id: doc.id, ...doc.data() });
//         });
//         return { ok: true, fivedayclubs };
//     } catch (error) {
//         console.error("Error fetching 5-Day Clubs: ", error);
//         return { ok: false, errorMessage: error.message };
//     }
// };

