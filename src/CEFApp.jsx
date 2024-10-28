
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
