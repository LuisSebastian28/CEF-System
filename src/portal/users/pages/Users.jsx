import React from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserList } from '../components/UserList';
import { UserFormModal } from '../components/UserFormModal';
import { FloatingButton } from '../components/FloatingButton';
import { Navigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

export const Users = () => {
    const {
        users,
        status,
        error,
        hasAccess,
        open,
        newUser,
        setNewUser,
        isEditing,
        onOpenModal,
        onCloseModal,
        handleSubmit,
        handleEdit,
        handleDelete
    } = useUsers();

    if (!hasAccess) {
        return <Navigate to="/dashboard" />;
    }

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

            <FloatingButton onClick={onOpenModal} icon={faUserPlus} />

            <UserFormModal
                open={open}
                onClose={onCloseModal}
                onSubmit={handleSubmit}
                user={newUser}
                setUser={setNewUser}
                isEditing={isEditing}
            />
        </div>
    );
};
