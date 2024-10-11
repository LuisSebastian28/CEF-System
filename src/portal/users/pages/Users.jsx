// portal/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchUsers, startAddUser, startUpdateUser, startDeleteUser } from '../../../store/portal/users/userThunks'; // Asegúrate de que la ruta es correcta
import { Modal } from 'react-responsive-modal';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-responsive-modal/styles.css';

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

    const roleMap = {
        2: 'Director',
        3: 'Staff',
        4: 'Missionary',
        5: 'IT Department',
        // Agrega más roles aquí si es necesario
    };

    // Abrir y cerrar modal
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

    // Manejar el cambio en el campo de rol
    const handleRoleChange = (e) => {
        const selectedRole = parseInt(e.target.value, 10); // Convertir a entero
        const roleDesc = roleMap[selectedRole] || '';
        setNewUser({ ...newUser, role: selectedRole, roleDesc });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(newUser);

        if (editingUserId) {
            dispatch(startUpdateUser(editingUserId, newUser));
        } else {
            dispatch(startAddUser(newUser));
        }
        onCloseModal();
    };

    // Abre el modal con la información del usuario a editar
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

    // Eliminar usuario
    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(startDeleteUser(userId));
        }
    };

    // Obtener usuarios al montar el componente
    useEffect(() => {
        dispatch(startFetchUsers());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 relative">
            <h1 className="text-4xl font-bold mb-10 text-black">Users</h1>
            <div className="w-full bg-white shadow-lg p-8 rounded-lg overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Existing Users</h2>
                <p className="mb-6 text-gray-500">List of all registered users.</p>
                {status === 'loading' && <p>Loading users...</p>}
                {status === 'failed' && <p className="text-red-500">{error}</p>}
                {status === 'succeeded' && (
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="py-2">Name</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">County</th>
                                <th className="py-2">Role</th>
                                <th className="py-2">Actions</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="border-b">
                                        <td className="py-2">{user.firstName} {user.lastName}</td>
                                        <td className="py-2">{user.email}</td>
                                        <td className="py-2">{user.county}</td>
                                        <td className="py-2">{user.roleDesc}</td>
                                        <td className="py-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Botón flotante */}
            <button
                onClick={onOpenModal}
                className="fixed bottom-6 right-6 bg-dark-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-dark-blue-700 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faUserPlus} className="h-6 w-6 text-white" />
            </button>

            {/* Modal con el formulario */}
            <Modal open={open} onClose={onCloseModal} center>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">
                        {editingUserId ? "Edit User" : "Add New User"}
                    </h2>
                    <p className="mb-4 text-gray-600">
                        Enter the details of the {editingUserId ? "user" : "new user"} below.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                value={newUser.firstName}
                                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                required
                                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                value={newUser.lastName}
                                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                required
                                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                required
                                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">County</label>
                            <input
                                type="text"
                                value={newUser.county}
                                onChange={(e) => setNewUser({ ...newUser, county: e.target.value })}
                                required
                                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Role</label>
                            <select
                                value={newUser.role}
                                onChange={handleRoleChange}
                                required
                                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a role</option>
                                <option value={2}>Director</option>
                                <option value={3}>Staff</option>
                                <option value={4}>Missionary</option>
                                <option value={5}>IT Department</option>
                                {/* Añade más roles aquí si es necesario */}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full font-bold mt-4"
                        >
                            {editingUserId ? "Update User" : "Add User"}
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
