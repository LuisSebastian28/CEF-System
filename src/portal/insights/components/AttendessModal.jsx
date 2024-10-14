import React from 'react';

export const AttendeesModal = ({ isOpen, onClose, attendees, clubName }) => {
    if (!isOpen) return null;

    // Si "attendees" es un objeto, lo convertimos en un array usando Object.values()
    const attendeesArray = attendees ? Object.values(attendees) : [];
    console.log(attendeesArray)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
                {/* Botón de Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    &#10005;
                </button>

                <h2 className="text-2xl font-bold mb-4">Asistentes de {clubName}</h2>

                {/* Lista de Asistentes */}
                {attendeesArray.length > 0 ? (
                    <ul className="space-y-2 max-h-80 overflow-y-auto">
                        {attendeesArray.map((attendee) => (
                            <li key={attendee.id} className="flex items-center space-x-4">
                                {/* Asumiendo que cada asistente tiene un photoURL */}
                                {attendee.photoURL ? (
                                    <img
                                        src={attendee.photoURL}
                                        alt={`${attendee.name}`}
                                        className="w-10 h-10 rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-white text-lg">
                                            {attendee.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold">
                                        {attendee.name}
                                    </p>
                                    <p className="text-sm text-gray-600">{attendee.age}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay asistentes registrados para este club.</p>
                )}

                {/* Botón de Cerrar */}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};
