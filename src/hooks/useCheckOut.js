import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/auth/authSlice';
import { FirebaseAuth, FirebaseDB } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const useCheckOut = () => {
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el loading
    const { status } = useSelector(state => state.auth || { status: 'unauthenticated' }); // Manejo defensivo del estado
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) {
                dispatch(logout());
                setIsLoading(false);
                return;
            }

            const { uid, email, displayName = '', photoURL = '' } = user; // Valores por defecto

            try {
                const docRef = doc(FirebaseDB, 'users', uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    dispatch(login({
                        uid,
                        email,
                        displayName: displayName || userData.displayName || '',
                        photoURL: photoURL || userData.photoURL || '',
                    }));
                } else {
                    console.warn('No user document found');
                    dispatch(logout()); // Desloguea si el usuario no tiene datos en Firestore
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                dispatch(logout());
            }

            setIsLoading(false);
        });

        return () => unsubscribe(); // Limpieza de suscripción
    }, [dispatch]);

    return {
        status,
        isLoading,
    };
};
