// src/portal/layout/PortalLayout.js
import React, { useState } from 'react';
import { SideBar } from '../../ui/components/SideBar';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const PortalLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Botón hamburguesa para pantallas pequeñas */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden absolute top-4 left-4 text-2xl z-20"
            >
                <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Sidebar como caja con ancho fijo o desplegable en mobile */}
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Contenido principal como caja flexible */}
            <div className="flex-grow overflow-y-auto bg-white">
                <Outlet /> {/* Renderiza el contenido de cada ruta aquí */}
            </div>
        </div>
    );
};
