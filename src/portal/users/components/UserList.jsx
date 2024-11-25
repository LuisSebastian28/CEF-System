// src/portal/components/UserList.js
import React from 'react';

export const UserList = ({ users, onEdit, onDelete }) => {
    return (
        <div>
            {/* Tabla visible en pantallas medianas y grandes */}
            <div className="hidden md:block overflow-x-auto"> {/* Overflow horizontal para tablas */}
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Email</th>
                            <th className="py-2 px-3">County</th>
                            <th className="py-2 px-3">Role</th>
                            <th className="py-2 px-3">Actions</th>
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
                                    <td className="py-2 px-3">{user.firstName} {user.lastName}</td>
                                    <td className="py-2 px-3">{user.email}</td>
                                    <td className="py-2 px-3">{user.county}</td>
                                    <td className="py-2 px-3">{user.roleDesc}</td>
                                    <td className="py-2 px-3">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id)}
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 text-sm ml-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Cards visibles en pantallas pequeñas */}
            <div className="block md:hidden">
                {users.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No users found</p>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="border p-4 rounded-lg mb-4 bg-white shadow">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">{user.firstName} {user.lastName}</h3>
                                <span className="text-sm text-gray-500">{user.roleDesc}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>County:</strong> {user.county}
                            </p>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
