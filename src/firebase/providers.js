import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';



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