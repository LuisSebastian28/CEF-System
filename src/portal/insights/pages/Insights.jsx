// components/Insights.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchFivedayclubs } from '../../../store/portal/insights/fiveDayClubs/fiveDayClubsThunks';
import { AttendeesModal } from '../components/AttendessModal'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

export const Insights = () => {
    const dispatch = useDispatch();

    // Selecciona los fivedayclubs y el estado de carga desde el store
    const { fivedayclubs, status, error } = useSelector((state) => state.fivedayclubs);

    // Estados para manejar el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dummyAttendees, setDummyAttendees] = useState([]);
    const [selectedClubName, setSelectedClubName] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(startFetchFivedayclubs());
        }
    }, [status, dispatch]);

    // Función para abrir el modal con datos ficticios
    const openModalWithDummyData = (clubName, clubAttendees) => {
        const dummyData = [];
        setDummyAttendees(clubAttendees);
        setSelectedClubName(clubName);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setDummyAttendees([]);
        setSelectedClubName('');
    };

    

    return (
        <div className="p-8 white min-h-screen">
            <h2 className="text-3xl font-bold mb-4">Insights</h2>

            {/* Filtros de Categoría y Búsqueda */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-black text-white rounded">All</button>
                    <button className="px-4 py-2 bg-gray-200 text-black rounded">5-Day Clubs</button>
                    <button className="px-4 py-2 bg-gray-200 text-black rounded">Good News Camps</button>
                    <button className="px-4 py-2 bg-gray-200 text-black rounded">Teacher Training Classes</button>
                </div>
                <div className="flex space-x-2 items-center">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="p-2 border rounded w-64"
                    />
                    <select className="p-2 border rounded">
                        <option>All Locations</option>
                        <option>New York, NY</option>
                        <option>Los Angeles, CA</option>
                        <option>Chicago, IL</option>
                        <option>Miami, FL</option>
                        <option>Seattle, WA</option>
                        <option>Boston, MA</option>
                    </select>
                </div>
            </div>

            {/* Manejo de Estados de Carga y Errores */}
            {status === 'loading' && <p>Cargando 5-Day Clubs...</p>}
            {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

            {/* Tabla de Eventos */}
            {status === 'succeeded' && (
                <table className="min-w-full bg-white rounded shadow-md">
                    <thead>
                        <tr>
                            <th className="text-left p-4">Date</th>
                            <th className="text-left p-4">Hostess</th>
                            <th className="text-left p-4">Teacher</th>
                            <th className="text-left p-4">Location</th>
                            <th className="text-left p-4">Address</th>
                            <th className="text-left p-4">Helper</th>
                            <th className="text-left p-4">Attendees</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fivedayclubs.map((club) => (
                            <tr key={club.id} className="border-t">
                                <td className="p-4">
                                    {club.date instanceof Object && club.date.toDate
                                        ? club.date.toDate().toLocaleDateString()
                                        : club.date}
                                </td>
                                <td className="p-4">{club.hostess}</td>
                                <td className="p-4">
                                    {club.missionaryData && !club.missionaryData.error
                                        ? club.missionaryData.firstName
                                        : 'No disponible'}
                                </td>
                                <td className="p-4">{club.city}</td>
                                <td className="p-4">{club.address}</td>
                                <td className="p-4">{club.helper}</td>
                                <td className="p-4">{club.totalAttendees} asistentes</td>
                                <td className="p-4">
                                    <button
                                        className="px-3 py-1 bg-gray-200 rounded mr-2"
                                        onClick={() => openModalWithDummyData(club.hostess,club.attendees)}
                                    >
                                        View Attendees
                                    </button>
                                    <button className="px-3 py-1 bg-gray-200 rounded">Edit</button>
                                </td>
                            </tr>
                        ))}
                        {/* Si no hay clubs, muestra un mensaje */}
                        {fivedayclubs.length === 0 && (
                            <tr>
                                <td colSpan="8" className="p-4 text-center">No hay 5-Day Clubs disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Componente Modal para Asistentes */}
            <AttendeesModal
                isOpen={isModalOpen}
                onClose={closeModal}
                attendees={dummyAttendees}
                clubName={selectedClubName}
            />
        </div>
    );
};
