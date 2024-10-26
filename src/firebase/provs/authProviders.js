// authProviders.js
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid } = resp.user;

        // Buscar el usuario en la colección `users` de Firestore usando su `uid`
        const userDoc = await getDoc(doc(FirebaseDB, 'users', uid));
        if (userDoc.exists()) {
            const { firstName, lastName, photoUrl } = userDoc.data();  // Extraer `firstName` y `lastName` de Firestore

            return {
                ok: true,
                uid,
                photoURL:photoUrl,
                firstName,      // Devolver el `firstName` desde Firestore
                lastName,       // También puedes devolver el `lastName` si lo necesitas
            };
        } else {
            return {
                ok: false,
                errorMessage: 'User data not found in Firestore',
            };
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message };
    }
};

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