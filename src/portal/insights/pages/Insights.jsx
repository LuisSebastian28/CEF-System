import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteClub, startFetchClubs, startUpdateClub } from '../../../store/portal/clubs/clubsThunks'; // Importa el thunk para actualizar
import { AttendeesModal } from '../components/AttendessModal';
import { EditClubModal } from '../components/EditClubModal'; // Importa el modal de edición


export const Insights = () => {
    const dispatch = useDispatch();


    const handleDeleteClub = (clubId) => {
        if (window.confirm("Are you sure you want to delete this club?")) {
            dispatch(startDeleteClub(clubId)); // Despacha el thunk para eliminar el club
        }
    };

    // Estado del store
    const { clubs, status, error } = useSelector((state) => state.clubs);
    const { newClubAdded } = useSelector((state) => state.clubs);


    // Estados locales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal de edición
    const [dummyAttendees, setDummyAttendees] = useState([]);
    const [selectedClubName, setSelectedClubName] = useState('');
    const [selectedClub, setSelectedClub] = useState(null);
    const [selectedClubId, setSelectedClubId] = useState(''); // Club seleccionado para editar
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('All'); // Filtro de categoría
    const itemsPerPage = 10;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(startFetchClubs()); // Al montar el componente, obtenemos los clubes
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (newClubAdded) {
            alert("A new club has been added! Click 'Refresh' to see the updates.");
        }
    }, [newClubAdded]);


    // Función para manejar el cambio de página
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Aplicar el filtro a los clubes antes de paginar
    const filteredClubs = clubs.filter(club => {
        if (filter === 'All') return true;
        return club.eventType === filter;
    });

    // Calcular la paginación después de aplicar el filtro
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInsights = filteredClubs.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);
    const paginationButtons = Array.from({ length: totalPages }, (_, i) => (
        <button
            key={i + 1}
            className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
            onClick={() => handlePageChange(i + 1)}
        >
            {i + 1}
        </button>
    ));

    // Abrir modal con asistentes ficticios
    const openModalWithDummyData = (clubName, clubAttendees, clubId) => {
        setDummyAttendees(clubAttendees);
        setSelectedClubName(clubName);
        setSelectedClubId(clubId);
        setIsModalOpen(true);
    };

    // Abrir el modal de edición
    const openEditModal = (club) => {
        setSelectedClub(club); // Guardar el club seleccionado
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedClub(null); // Limpiar el club seleccionado
    };

    return (
        <div className="p-8 white min-h-screen">
            <h2 className="text-3xl font-bold mb-4">Insights</h2>

            {newClubAdded && (
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
                    onClick={() => dispatch(startFetchClubs())}
                >
                    Refresh List
                </button>
            )}

            {/* Filtros de Categoría */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 ${filter === 'All' ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
                        onClick={() => {
                            setFilter('All');
                            setCurrentPage(1); // Reiniciar la paginación al cambiar de filtro
                        }}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 ${filter === 'fivedayclub' ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
                        onClick={() => {
                            setFilter('fivedayclub');
                            setCurrentPage(1); // Reiniciar la paginación al cambiar de filtro
                        }}
                    >
                        5-Day Clubs
                    </button>
                    <button
                        className={`px-4 py-2 ${filter === 'goodnewsdaycamp' ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
                        onClick={() => {
                            setFilter('goodnewsdaycamp');
                            setCurrentPage(1); // Reiniciar la paginación al cambiar de filtro
                        }}
                    >
                        Good News Camps
                    </button>
                    <button
                        className={`px-4 py-2 ${filter === 'teachertraining' ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
                        onClick={() => {
                            setFilter('teachertraining');
                            setCurrentPage(1); // Reiniciar la paginación al cambiar de filtro
                        }}
                    >
                        Teacher Training Classes
                    </button>
                </div>
            </div>

            {/* Estados de carga y errores */}
            {status === 'loading' && <p>Cargando clubes...</p>}
            {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

            {/* Tabla de eventos */}
            {status === 'succeeded' && (
                <>
                    <table className="min-w-full bg-white rounded-lg shadow-2xl">
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
                            {currentInsights.map((club) => (
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
                                            onClick={() => openModalWithDummyData(club.hostess, club.attendees, club.id)}
                                        >
                                            Ver Asistentes
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                                            onClick={() => openEditModal(club)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                            onClick={() => handleDeleteClub(club.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {currentInsights.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="p-4 text-center">
                                        No hay clubes disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="flex justify-center space-x-2 mt-4">{paginationButtons}</div>
                </>
            )}

            {/* Modal de Asistentes */}
            <AttendeesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                attendees={dummyAttendees}
                clubName={selectedClubName}
                clubId={selectedClubId} // Aquí pasamos el clubId
            />

            {/* Modal para Editar */}
            {selectedClub && (
                <EditClubModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    club={selectedClub}
                    onSave={(updatedClub) => {
                        dispatch(startUpdateClub(selectedClub.id, updatedClub)); // Despacha el thunk para actualizar
                        closeEditModal();
                    }}
                />
            )}
        </div>
    );
};
