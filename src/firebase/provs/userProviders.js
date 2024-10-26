// userProviders.js
import { doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { FirebaseDB } from '../firebaseConfig';

export const addUserToFirestore = async (user) => {
    try {
        // Usamos el `uid` del usuario como ID del documento en Firestore
        await setDoc(doc(FirebaseDB, 'users', user.uid), user);

        return { ok: true };
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
        return { ok: false, errorMessage: error.message };
    }
};

export const getUserFromFirestore = async (uid) => {
    const docRef = doc(FirebaseDB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap)
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

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
