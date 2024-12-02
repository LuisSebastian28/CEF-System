import { useSelector } from 'react-redux';

export const useResources = () => {
    const { roleDesc } = useSelector((state) => state.auth);
    const allowedRoles = ['IT Department', 'Director', 'Assistant-Director'];
    const hasAccess = allowedRoles.includes(roleDesc);

    return {
        hasAccess,
    };
};
