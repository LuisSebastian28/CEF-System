import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PortalRoutes } from '../portal/routes/PortalRoutes'
import { useCheckOut } from '../hooks/useCheckOut'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const CefRouter = () => {
  const { status, isLoading } = useCheckOut();
  const location = useLocation(); // Para guardar la ubicación actual

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-50">
    <p className="text-2xl font-semibold text-gray-500">Loading ...</p>
</div>; // Mostrar un indicador de carga mientras se verifica la autenticación
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<PortalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      {/* Si el usuario no está autenticado, redirigir al login */}
      <Route path='/*' element={<Navigate to='/auth/login' state={{ from: location }} />} />
    </Routes>
  )
}
