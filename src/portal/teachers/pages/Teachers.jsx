// src/portal/pages/Teachers.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchUsers } from '../../../store/portal/users/userThunks';
import { TeachersList } from '../components/TeachersList';
import { ContactModal } from '../components/ContactModal';

export const Teachers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(startFetchUsers());
    }, [dispatch]);

    const handleContactClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setMessage("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="w-full bg-blue-600 text-white py-3 text-center shadow-lg">
                <h1 className="text-5xl font-bold">Teachers</h1>
                <p className="mt-2 text-lg">Contact and manage the teachers in your organization</p>
            </div>

            <TeachersList teachers={users} onContact={handleContactClick} />

            <ContactModal 
                isOpen={showModal}
                onClose={handleCloseModal}
                selectedTeacher={selectedUser}
                message={message}
                setMessage={setMessage}
            />
        </div>
    );
};
