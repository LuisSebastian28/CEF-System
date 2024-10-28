import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from './firebase/firebaseConfig';  // Asegúrate de importar correctamente FirebaseAuth
import { login, logout } from './store/auth/authSlice';  // Importa tus acciones de autenticación
import { getUserFromFirestore } from './firebase/provs/userProviders';  // Función para obtener más datos del usuario
import { CefRouter } from './routes/CefRouter';

export const CEFApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Verifica si el usuario ya está autenticado cuando la aplicación se monta
    const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
      if (user) {
        // Si el usuario está autenticado, obtenemos su información adicional de Firestore
        const { uid, email } = user;
        const userDoc = await getUserFromFirestore(uid);  // Obtener más datos si tienes una colección de 'users'

        dispatch(login({
          uid,
          email,
          firstName: userDoc?.firstName || '',
          lastName: userDoc?.lastName || '',
          photoURL: userDoc?.photoUrl || '',
          roleDesc: userDoc?.roleDesc || '',
        }));
      } else {
        // Si no está autenticado, disparamos el logout
        dispatch(logout());
      }
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <CefRouter />
  );
};

export default CEFApp;
