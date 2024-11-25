import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
    startFetchUsers,
    startAddUser,
    startUpdateUser,
    startDeleteUser
} from '../../../store/portal/users/userThunks';

export const useUsers = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);
    const { roleDesc } = useSelector((state) => state.auth);
    const allowedRoles = ['IT Department', 'Director', 'Assistant-Director'];
    const hasAccess = allowedRoles.includes(roleDesc);

    const [open, setOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        county: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        roleDesc: ''
    });

    useEffect(() => {
        dispatch(startFetchUsers());
    }, [dispatch]);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setOpen(false);
        resetForm();
    };

    const resetForm = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUserId) {
                await dispatch(startUpdateUser(editingUserId, newUser));
                Swal.fire({
                    title: 'User Updated',
                    text: 'The user information has been updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                await dispatch(startAddUser(newUser));
                Swal.fire({
                    title: 'User Added',
                    text: 'The new user has been added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            onCloseModal();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'There was a problem processing your request.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
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

    const handleDelete = async (userId) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        });

        if (confirmation.isConfirmed) {
            try {
                await dispatch(startDeleteUser(userId));
                Swal.fire({
                    title: 'Deleted',
                    text: 'The user has been removed successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'There was a problem deleting the user.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return {
        users,
        status,
        error,
        hasAccess,
        open,
        newUser,
        setNewUser,
        isEditing: !!editingUserId,
        onOpenModal,
        onCloseModal,
        handleSubmit,
        handleEdit,
        handleDelete
    };
};
