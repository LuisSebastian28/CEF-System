// src/portal/components/UserFormModal.js
import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export const UserFormModal = ({ open, onClose, onSubmit, user, setUser, isEditing }) => {
    const roleMap = {
        2: 'Director',
        3: 'Staff',
        4: 'Missionary',
        5: 'IT Department',
    };

    const handleRoleChange = (e) => {
        const selectedRole = parseInt(e.target.value, 10);
        const roleDesc = roleMap[selectedRole] || '';
        setUser({ ...user, role: selectedRole, roleDesc });
    };

    return (
        <Modal open={open} onClose={onClose} center>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                    {isEditing ? "Edit User" : "Add New User"}
                </h2>
                <p className="mb-4 text-gray-600">
                    Enter the details of the {isEditing ? "user" : "new user"} below.
                </p>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">First Name</label>
                        <input
                            type="text"
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            required
                            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            required
                            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">County</label>
                        <input
                            type="text"
                            value={user.county}
                            onChange={(e) => setUser({ ...user, county: e.target.value })}
                            required
                            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Role</label>
                        <select
                            value={user.role}
                            onChange={handleRoleChange}
                            required
                            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a role</option>
                            <option value={2}>Director</option>
                            <option value={3}>Staff</option>
                            <option value={4}>Missionary</option>
                            <option value={5}>IT Department</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full font-bold mt-4"
                    >
                        {isEditing ? "Update User" : "Add User"}
                    </button>
                </form>
            </div>
        </Modal>
    );
};
