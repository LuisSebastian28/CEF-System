// portal/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchUsers, startAddUser, startUpdateUser, startDeleteUser } from '../../../store/portal/users/userThunks';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserList } from '../components/UserList';
import { UserFormModal } from '../components/UserFormModal';
import { FloatingButton } from '../components/FloatingButton';

export const Users = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);

    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        county: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        roleDesc: ''
    });
    const [editingUserId, setEditingUserId] = useState(null);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setOpen(false);
        setNewUser({
            county: '',
            email: '',
            firstName: '',
            lastName: '',
            role: '',
            roleDesc: ''
        });
        setEditingUserId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUserId) {
            dispatch(startUpdateUser(editingUserId, newUser));
        } else {
            dispatch(startAddUser(newUser));
        }
        onCloseModal();
    };

    const handleEdit = (user) => {
        setNewUser({
            county: user.county,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            roleDesc: user.roleDesc
        });
        setEditingUserId(user.id);
        onOpenModal();
    };

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(startDeleteUser(userId));
        }
    };

    useEffect(() => {
        dispatch(startFetchUsers());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <div className="w-full bg-blue-600 text-white py-3 text-center shadow-lg">
                <h1 className="text-5xl font-bold">Users</h1>
                <p className="mt-2 text-lg">Add, edit or delete users in your organization</p>
            </div>
            <div className="w-full bg-white shadow-lg p-8 rounded-lg overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Existing Users</h2>
                {status === 'loading' && <p>Loading users...</p>}
                {status === 'failed' && <p className="text-red-500">{error}</p>}
                {status === 'succeeded' && (
                    <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </div>

            {/* Botón flotante para abrir modal de añadir usuario */}
            <FloatingButton onClick={onOpenModal} icon={faUserPlus} />

            {/* Modal para añadir o editar usuario */}
            <UserFormModal
                open={open}
                onClose={onCloseModal}
                onSubmit={handleSubmit}
                user={newUser}
                setUser={setNewUser}
                isEditing={!!editingUserId}
            />
        </div>
    );
};
