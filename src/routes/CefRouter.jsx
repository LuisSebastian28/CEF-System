import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PortalRoutes } from '../portal/routes/PortalRoutes'
import { useCheckOut } from '../hooks/useCheckOut'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const CefRouter = () => {

  const { status } = useCheckOut()



  return (
    <>
      <Routes>
        {
          (status === 'authenticated')
            ? <Route path="/*" element={<PortalRoutes />} />
            : <Route path="/auth/*" element={<AuthRoutes />} />
        }

        <Route path='/*' element={<Navigate to='/auth/login' />} />


      </Routes>
    </>
  )
}
