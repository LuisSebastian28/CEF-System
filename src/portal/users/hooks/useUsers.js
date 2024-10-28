import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchUsers, startAddUser, startUpdateUser, startDeleteUser } from '../../../store/portal/users/userThunks';

export const useUsers = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);
    const { roleDesc } = useSelector(state => state.auth); 
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
