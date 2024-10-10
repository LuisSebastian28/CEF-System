// store/portal/users/usersThunks.js
import { sendPasswordResetEmail } from "firebase/auth";
import { addUserToFirestore, deleteUserFromFirestore, getUsersFromFirestore, registerUserWithEmailPassword, updateUserInFirestore } from "../../../firebase/providers";
import {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} from "./userSlice";
import { FirebaseAuth } from "../../../firebase/firebaseConfig";


const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
};

// Thunk para agregar un nuevo usuario
export const startAddUser = (user) => {
    return async (dispatch) => {
        dispatch(addUserStart());
        // Genera una contraseña aleatoria
        const password = generatePassword(); 
        try {
            // Crea el usuario en Firebase Authentication
            const { ok, uid, errorMessage } = await registerUserWithEmailPassword({
                email: user.email,
                password,
                displayName: `${user.firstName} ${user.lastName}`,
            });

            if (!ok) throw new Error(errorMessage);

            // Agrega el usuario a Firestore (sin la contraseña)
            const userWithoutPassword = { ...user, uid };
            const result = await addUserToFirestore(userWithoutPassword);

            if (!result.ok) throw new Error(result.errorMessage);

            // Envía el correo de restablecimiento de contraseña
            await sendPasswordResetEmail(FirebaseAuth, user.email);

            dispatch(addUserSuccess({ id: result.uid, ...userWithoutPassword }));
        } catch (error) {
            console.error("Error adding user:", error.message);
            dispatch(addUserFailure(error.message));
        }
    };
};

// Thunk para obtener usuarios existentes
export const startFetchUsers = () => {
    return async (dispatch) => {
        dispatch(fetchUsersStart()); 

        try {
            const result = await getUsersFromFirestore();
            if (result.ok) {
                dispatch(fetchUsersSuccess(result.users));
            } else {
                dispatch(fetchUsersFailure(result.errorMessage));
            }
        } catch (error) {
            dispatch(fetchUsersFailure(error.message));
        }
    };
};

// Thunk para actualizar un usuario
export const startUpdateUser = (userId, updatedData) => {
    return async (dispatch) => {
        dispatch(updateUserStart());

        try {
            const result = await updateUserInFirestore(userId, updatedData);
            if (result.ok) {
                dispatch(updateUserSuccess({ id: userId, ...updatedData }));
            } else {
                dispatch(updateUserFailure(result.errorMessage));
            }
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };
};

// Thunk para eliminar un usuario
export const startDeleteUser = (userId) => {
    return async (dispatch) => {
        dispatch(deleteUserStart());

        try {
            const result = await deleteUserFromFirestore(userId);
            if (result.ok) {
                dispatch(deleteUserSuccess(userId));
            } else {
                dispatch(deleteUserFailure(result.errorMessage));
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };
};
