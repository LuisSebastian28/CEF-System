import React from 'react'
import { SideBar } from '../../ui/components/SideBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Calendar } from '../pages/Calendar'
import { Resources } from '../pages/Resources'
import { Teachers } from '../pages/Teachers'
import { Users } from '../pages/Users'
import { Forms } from '../pages/Forms'
import { Insights } from '../pages/Insights'

export const PortalRoutes = () => {
    return (
        <div className="flex h-screen">
        {/* Sidebar fijo en la pantalla */}
        <SideBar />
        
        {/* Contenedor principal ajustable con flex-grow */}
        <div className="flex-grow p-5 ml-20 md:ml-56">
          <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='calendar' element={<Calendar />} />
            <Route path='resources' element={<Resources />} />
            <Route path='teachers' element={<Teachers />} />
            <Route path='users' element={<Users />} />
            <Route path='forms' element={<Forms />} />
            <Route path='insights' element={<Insights />} />

            <Route path='/*' element={<Navigate to={'dashboard'} />} />
          </Routes>
        </div>
      </div>

    )
}
