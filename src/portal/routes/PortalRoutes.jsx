// src/portal/routes/PortalRoutes.js
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PortalLayout } from '../layout/portalLayout';
import { Dashboard } from '../dashboard/pages/Dashboard';
import { CalendarPage } from '../calendar/pages/Calendar';
import { Resources } from '../resourcesCef/pages/Resources';
import { Teachers } from '../teachers/pages/Teachers';
import { Users } from '../users/pages/Users';
import { Forms } from '../forms/pages/Forms';
import { Insights } from '../insights/pages/Insights';

export const PortalRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<PortalLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="resources" element={<Resources />} />
                <Route path="teachers" element={<Teachers />} />
                <Route path="users" element={<Users />} />
                <Route path="forms" element={<Forms />} />
                <Route path="insights" element={<Insights />} />
                
                {/* Ruta por defecto redirige a dashboard */}
                <Route path="*" element={<Navigate to="dashboard" />} />
            </Route>
        </Routes>
    );
};
