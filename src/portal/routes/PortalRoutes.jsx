import React from 'react'
import { SideBar } from '../../ui/components/SideBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../dashboard/pages/Dashboard'
import { Calendar } from '../calendar/pages/Calendar'
import { Resources } from '../resourcesCef/pages/Resources'
import { Teachers } from '../teachers/pages/Teachers'
import { Users } from '../users/pages/Users'
import { Forms } from '../forms/pages/Forms'
import { Insights } from '../insights/pages/Insights'

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
