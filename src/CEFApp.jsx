
import { CefRouter } from './routes/CefRouter';
import { useCheckOut } from './hooks/useCheckOut';


export const CEFApp = () => {
  const { isLoading } = useCheckOut();  // Usa el hook para verificar la autenticación

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-50">
      <p className="text-2xl font-semibold text-gray-500">Loading ...</p>
    </div>;  // Muestra un indicador de carga mientras verifica la autenticación
  }

  return <CefRouter />;
};

export default CEFApp;
