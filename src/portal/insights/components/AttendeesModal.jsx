import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchAttendees, startAddAttendee, startEditAttendee, startDeleteAttendee } from '../../../store/portal/attendees/attendeesThunks';
import { attendeeConfigurations } from '../helpers/attendeeConfigurations';

export const AttendeesModal = ({ club, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { attendees, totalAttendees, status } = useSelector((state) => state.attendees);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAttendeeId, setCurrentAttendeeId] = useState(null);
    const [formValues, setFormValues] = useState({});
    const config = club ? attendeeConfigurations[club.eventType] : null;

    useEffect(() => {
        if (isOpen && club) {
            dispatch(startFetchAttendees(club.id));
            setIsAdding(false);
            setIsEditing(false);
            setFormValues(config?.initialValues || {});
        }
    }, [dispatch, isOpen, club, config]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const thunk = isEditing
            ? startEditAttendee(club.id, currentAttendeeId, formValues)
            : startAddAttendee(club.id, formValues);

        const result = await dispatch(thunk);
        if (result.ok) {
            alert(`Attendee ${isEditing ? 'updated' : 'added'} successfully!`);
            setIsAdding(false);
            setIsEditing(false);
            setFormValues(config.initialValues);
        } else {
            alert(`Error ${isEditing ? 'updating' : 'adding'} attendee: ${result.errorMessage}`);
        }
    };

    const startEdit = (attendee) => {
        setIsEditing(true);
        setCurrentAttendeeId(attendee.id);
        setFormValues({
            ...config.initialValues,
            ...attendee,
        });
    };

    const handleDelete = async (attendeeId) => {
        if (window.confirm('Are you sure you want to delete this attendee?')) {
            const result = await dispatch(startDeleteAttendee(club.id, attendeeId));
            if (result.ok) {
                alert('Attendee deleted successfully!');
            } else {
                alert(`Error deleting attendee: ${result.errorMessage}`);
            }
        }
    };

    const closeFormModal = () => {
        setIsAdding(false);
        setIsEditing(false);
        setFormValues(config?.initialValues || {});
    };

    const personalInfoFields = config?.fields.filter((field) => !config.attendanceDays?.includes(field));
    const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL'];

    if (!isOpen || !club) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close Modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-3xl font-semibold mb-8 text-center text-gray-900">
                    Attendees for {club.name} ({totalAttendees})
                </h3>

                {/* Lista de asistentes */}
                <div className="space-y-4 mb-8">
                    {status === 'loading' ? (
                        <p className="text-center text-gray-600">Loading attendees...</p>
                    ) : attendees.length > 0 ? (
                        <ul className="space-y-4">
                            {attendees.map((attendee) => (
                                <li key={attendee.id} className="py-4 px-6 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium"><strong>Name:</strong> {attendee.name || attendee.firstName || "N/A"}</p>
                                        {club.eventType !== 'teachertrainingclass' && (
                                            <p><strong>Date:</strong> {attendee.date || "N/A"}</p>
                                        )}
                                        <p><strong>Address:</strong> {attendee.address || "N/A"}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => startEdit(attendee)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-800 transition-colors duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(attendee.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 hover:text-red-800 transition-colors duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600">No attendees found for this club.</p>
                    )}
                </div>

                <div className="flex justify-end mt-8 space-x-4">
                    <button
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={() => setIsAdding(true)}
                    >
                        Add Attendee
                    </button>
                    <button
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                {/* Modal para agregar/editar asistente */}
                {(isAdding || isEditing) && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-60 p-6">
                        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative">
                            <button
                                onClick={closeFormModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                aria-label="Close Form"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
                                {isEditing ? 'Edit Attendee' : 'Add New Attendee'}
                            </h3>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                {/* Sección de Información Personal */}
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h4>
                                    {personalInfoFields.map((field) => (
                                        <div key={field} className="flex flex-col mb-4">
                                            <label className="font-semibold text-gray-700 capitalize mb-2">{field}:</label>
                                            {field === 'child_tshirt_size' ? (
                                                <select
                                                    name={field}
                                                    value={formValues[field] || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                >
                                                    {tshirtSizes.map((size) => (
                                                        <option key={size} value={size}>{size}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field === 'child_birthday' || (field === 'date' && club.eventType !== 'teachertrainingclass') ? 'date' : typeof config.initialValues[field] === 'boolean' ? 'checkbox' : 'text'}
                                                    name={field}
                                                    value={formValues[field] || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Sección de Días de Asistencia si existen */}
                                {config?.attendanceDays && (
                                    <div className="mb-6">
                                        <h4 className="text-xl font-semibold text-gray-700 mb-4">Attendance Days</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {config.attendanceDays.map((day) => (
                                                <div key={day} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name={day}
                                                        checked={formValues[day] || false}
                                                        onChange={handleInputChange}
                                                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-0 mr-2"
                                                    />
                                                    <label className="font-semibold text-gray-700 capitalize">{day}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-6 mt-8">
                                    <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                        {isEditing ? 'Update Attendee' : 'Save Attendee'}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                        onClick={closeFormModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
