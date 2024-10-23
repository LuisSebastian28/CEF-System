import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/auth/authSlice'
import { FirebaseAuth, FirebaseDB } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';

export const useCheckOut = () => {
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el loading
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) {
                dispatch(logout());
                setIsLoading(false); // Deja de estar cargando cuando no hay usuario
                return;
            }

            const { uid, email, displayName, photoURL } = user;

            const docRef = doc(FirebaseDB, 'users', uid);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();

            dispatch(login({
                uid, email, displayName, photoURL
            }));

            setIsLoading(false); // Deja de estar cargando después de la verificación
        });
    }, [dispatch]);

    return {
        status,
        isLoading // Devuelve también el estado de loading
    }
}
