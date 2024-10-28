import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from './firebase/firebaseConfig';  // Asegúrate de importar correctamente FirebaseAuth
import { login, logout } from './store/auth/authSlice';  // Importa tus acciones de autenticación
import { getUserFromFirestore } from './firebase/provs/userProviders';  // Función para obtener más datos del usuario
import { CefRouter } from './routes/CefRouter';
import { useCheckOut } from './hooks/useCheckOut';


export const CEFApp = () => {
  const { isLoading } = useCheckOut();  // Usa el hook para verificar la autenticación

  if (isLoading) {
    return <div>Loading...</div>;  // Muestra un indicador de carga mientras verifica la autenticación
  }

  return <CefRouter />;
};

export default CEFApp;
