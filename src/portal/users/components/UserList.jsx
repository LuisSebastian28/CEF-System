// src/portal/components/UserList.js
import React from 'react';

export const UserList = ({ users, onEdit, onDelete }) => {
    return (
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
                        <td colSpan="5" className="text-center py-4 text-gray-500">No users found</td>
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
                                    onClick={() => onEdit(user)}
                                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)}
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
    );
};
