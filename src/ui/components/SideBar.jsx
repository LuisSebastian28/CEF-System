import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalendarAlt, faChalkboardTeacher, faBook, faUser, faUserFriends, faFolder, faPager } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

export const SideBar = () => {
    const dispatch = useDispatch();
    const { displayName } = useSelector(state => state.auth);

    const onLogout = () => {
        console.log('logout');
        dispatch(startLogout());
    };

    return (
        <div className='sidebar fixed top-0 left-0 bg-dark-blue-900 text-white flex flex-col p-5 h-screen'>
            {/* Primera Sección: Logo y Usuario */}
            <div className='flex flex-col items-center mb-8'>
                <img src={logo} alt="Logo" className='logo w-20 h-20 mb-3' />
                <h2 className='text-xl font-semibold'>Hi, {displayName}</h2>
            </div>

            {/* Segunda Sección: Opciones de Navegación */}
            <nav className='flex flex-col flex-grow space-y-4'>
                <Link to="dashboard" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800">
                    <FontAwesomeIcon icon={faTachometerAlt} className='text-lg' />
                    <span className='font-medium'>Dashboard</span>
                </Link>
                <Link to="calendar" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800">
                    <FontAwesomeIcon icon={faCalendarAlt} className='text-lg' />
                    <span className='font-medium'>Calendar</span>
                </Link>
                <Link to="teachers" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className='text-lg' />
                    <span className='font-medium'>Teachers</span>
                </Link>
                <Link to="resources" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800">
                    <FontAwesomeIcon icon={faBook} className='text-lg' />
                    <span className='font-medium'>Resources</span>
                </Link>
                <Link to="users" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800">
                    <FontAwesomeIcon icon={faUserFriends} className='text-lg' />
                    <span className='font-medium'>Users</span>
                </Link>
                <Link to="forms" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800">
                    <FontAwesomeIcon icon={faFolder} className='text-lg' />
                    <span className='font-medium'>Forms</span>
                </Link>
                <Link to="insights" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800">
                    <FontAwesomeIcon icon={faPager} className='text-lg' />
                    <span className='font-medium'>Insights</span>
                </Link>
            </nav>

            {/* Tercera Sección: Botón de Logout */}
            <div className="mt-auto">
                <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800 w-full" onClick={onLogout}>
                    <FontAwesomeIcon icon={faUser} className='text-lg' />
                    <span className='font-medium'>Logout</span>
                </button>
            </div>
        </div>
    );
};
