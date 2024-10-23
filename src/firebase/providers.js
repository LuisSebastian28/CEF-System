import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';



const googleProvider = new GoogleAuthProvider();

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password)
        console.log(resp.user);
        const {uid, photoURL, displayName} = resp.user

        return{
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }

}


export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        //TODO: actaulizar el displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        })

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }

}

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        // console.log(error)
        return {
            ok: false,
            errorCode,
            errorMessage,
        }

    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}

//AGREGAR USUARIOS Y RECIBIR INFORMACION DE USUARIOS

export const addUserToFirestore = async (user) => {
    try {
        const docRef = await addDoc(collection(FirebaseDB, "users"), user);
        return { ok: true, uid: docRef.id };
    } catch (error) {
        console.error("Error adding user: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

// Obtener usuarios de Firestore
export const getUsersFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(FirebaseDB, "users"));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return { ok: true, users };
    } catch (error) {
        console.error("Error fetching users: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

// Actualizar un usuario en Firestore
export const updateUserInFirestore = async (userId, updatedData) => {
    try {
        const userDoc = doc(FirebaseDB, "users", userId);
        await updateDoc(userDoc, updatedData);
        return { ok: true };
    } catch (error) {
        console.error("Error updating user: ", error);
        return { ok: false, errorMessage: error.message };
    }
};


// Eliminar un usuario de Firestore
export const deleteUserFromFirestore = async (userId) => {
    try {
        const userDoc = doc(FirebaseDB, "users", userId);
        await deleteDoc(userDoc);
        return { ok: true };
    } catch (error) {
        console.error("Error deleting user: ", error);
        return { ok: false, errorMessage: error.message };
    }
};


// Obtener datos de un usuario dado una referencia (path)
export const getUserFromReference = async (userRef) => {
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return { ok: true, user: { id: userDoc.id, ...userDoc.data() } };
        } else {
            return { ok: false, errorMessage: 'Usuario no encontrado.' };
        }
    } catch (error) {
        console.error("Error al obtener el usuario: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

// Obtener todos los 5-Day Clubs de Firestore
export const getFivedayclubsFromFirestore = async () => {
    try {
        const clubsRef = collection(FirebaseDB, "fivedayclubs");
        const q = query(clubsRef, orderBy("date", "desc")); // Ordenar por fecha descendente
        const querySnapshot = await getDocs(q);
        const fivedayclubs = [];
        querySnapshot.forEach((doc) => {
            fivedayclubs.push({ id: doc.id, ...doc.data() });
        });
        return { ok: true, fivedayclubs };
    } catch (error) {
        console.error("Error fetching 5-Day Clubs: ", error);
        return { ok: false, errorMessage: error.message };
    }
};

// Obtener asistentes de un 5-Day Club específico desde Firestore
export const getAttendeesForFivedayclub = async (clubId) => {
    try {
        const attendanceRef = collection(FirebaseDB, `fivedayclubs/${clubId}/attendance`);
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
// (Opcional) Agregar más funciones según tus necesidades
// export const addFivedayclubToFirestore = async (fivedayclub) => { /* ... */ };
// export const updateFivedayclubInFirestore = async (id, data) => { /* ... */ };
// export const deleteFivedayclubFromFirestore = async (id) => { /* ... */ };

// firebase/providers.js

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


// firebase/providers.js

// Obtener asistentes de cualquier club (genérico para cualquier tipo de club)
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

  // Función para agregar un asistente a un club en Firestore
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
  