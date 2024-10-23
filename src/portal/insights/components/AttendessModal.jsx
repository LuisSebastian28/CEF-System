import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startAddAttendee, startEditAttendee, startDeleteAttendee } from '../../../store/portal/clubs/clubsThunks';

export const AttendeesModal = ({ isOpen, onClose, attendees, clubName, clubId }) => {
    const dispatch = useDispatch();
    
    // Estado para el modal de agregar nuevo asistente
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Estado local para almacenar el nuevo asistente
    const [newAttendee, setNewAttendee] = useState({
        name: '',
        age: '',
        address: '',
        church: ''
    });

    // Estado para editar un asistente
    const [editAttendee, setEditAttendee] = useState(null);

    // Estado para manejar errores
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleAddAttendee = () => {
        if (newAttendee.name && newAttendee.age) {
            dispatch(startAddAttendee(clubId, newAttendee));
            setNewAttendee({ name: '', age: '', address: '', church: '' });
            setIsAddModalOpen(false);
            setError(null);
        } else {
            setError('Nombre y edad son campos requeridos.');
        }
    };

    const handleEditAttendee = (attendee) => {
        setEditAttendee(attendee);
    };

    const handleUpdateAttendee = () => {
        if (editAttendee.name && editAttendee.age) {
            dispatch(startEditAttendee(clubId, editAttendee));
            setEditAttendee(null);
        } else {
            setError('Nombre y edad son campos requeridos.');
        }
    };

    const handleDeleteAttendee = (attendeeId) => {
        dispatch(startDeleteAttendee(clubId, attendeeId));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-screen overflow-hidden">
                {/* Botón de Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    &#10005;
                </button>

                <h2 className="text-2xl font-bold mb-4">Asistentes de {clubName}</h2>

                {/* Botón flotante para añadir nuevo asistente */}
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-lg"
                    >
                        + Añadir Asistente
                    </button>
                </div>

                {/* Lista de asistentes */}
                <div className="overflow-y-auto max-h-96">
                    <table className="table-auto w-full text-left">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr className="border-b">
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Edad</th>
                                <th className="p-4">Dirección</th>
                                <th className="p-4">Iglesia</th>
                                <th className="p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendees.map((attendee) => (
                                <tr key={attendee.id} className="border-t hover:bg-gray-100">
                                    <td className="p-4">
                                        {editAttendee && editAttendee.id === attendee.id ? (
                                            <input
                                                type="text"
                                                value={editAttendee.name}
                                                onChange={(e) => setEditAttendee({ ...editAttendee, name: e.target.value })}
                                            />
                                        ) : (
                                            attendee.name
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editAttendee && editAttendee.id === attendee.id ? (
                                            <input
                                                type="number"
                                                value={editAttendee.age}
                                                onChange={(e) => setEditAttendee({ ...editAttendee, age: e.target.value })}
                                            />
                                        ) : (
                                            attendee.age
                                        )}
                                    </td>
                                    <td className="p-4">{attendee.address}</td>
                                    <td className="p-4">{attendee.church ? 'Sí' : 'No'}</td>
                                    <td className="p-4">
                                        {editAttendee && editAttendee.id === attendee.id ? (
                                            <button
                                                onClick={handleUpdateAttendee}
                                                className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                                            >
                                                Guardar
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditAttendee(attendee)}
                                                className="px-3 py-1 bg-yellow-400 text-white rounded mr-2"
                                            >
                                                Editar
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteAttendee(attendee.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal para añadir asistente */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            >
                                &#10005;
                            </button>
                            <h2 className="text-xl font-bold mb-4">Añadir Nuevo Asistente</h2>
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="p-2 border rounded w-full mb-2"
                                value={newAttendee.name}
                                onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Edad"
                                className="p-2 border rounded w-full mb-2"
                                value={newAttendee.age}
                                onChange={(e) => setNewAttendee({ ...newAttendee, age: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Dirección"
                                className="p-2 border rounded w-full mb-2"
                                value={newAttendee.address}
                                onChange={(e) => setNewAttendee({ ...newAttendee, address: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Iglesia"
                                className="p-2 border rounded w-full mb-4"
                                value={newAttendee.church}
                                onChange={(e) => setNewAttendee({ ...newAttendee, church: e.target.value })}
                            />
                            <button
                                onClick={handleAddAttendee}
                                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Añadir
                            </button>
                        </div>
                    </div>
                )}

                {/* Botón de Cerrar */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
