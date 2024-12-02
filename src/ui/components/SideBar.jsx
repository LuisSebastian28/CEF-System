import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faTachometerAlt, faCalendarAlt, faChalkboardTeacher, faBook, faUserFriends, faFolder, faPager, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

export const SideBar = () => {
    const dispatch = useDispatch();
    const { firstName } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);

    const onLogout = () => {
        dispatch(startLogout());
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Sidebar visible solo en pantallas grandes */}
            <div className="hidden lg:flex flex-col bg-dark-blue-900 text-white p-2 h-full">
                <div className='flex flex-col items-center mb-8'>
                    <img src={logo} alt="Logo" className='logo w-20 h-20 mb-3' />
                    <h2 className='text-xl font-semibold'>Hi, {firstName}</h2>
                </div>
                <nav className='flex flex-col space-y-4'>
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
                <div className="mt-auto">
                    <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800 w-full" onClick={onLogout}>
                        <FontAwesomeIcon icon={faSignOut} className='text-lg' />
                        <span className='font-medium'>Logout</span>
                    </button>
                </div>
            </div>

            {/* Botón de menú hamburguesa para pantallas pequeñas */}
            <div className="lg:hidden fixed top-0 left-0 w-full bg-dark-blue-900 text-white p-4 flex justify-between items-center z-20">
                <button onClick={toggleMenu}>
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl" />
                </button>
                <h2 className='text-xl font-semibold'>Hi, {firstName}</h2>
            </div>

            {/* Navbar desplegable en pantallas pequeñas */}
            {menuOpen && (
                <div className="lg:hidden fixed top-0 left-0 w-full h-screen bg-dark-blue-900 text-white z-50 flex flex-col p-4">
                    {/* Botón para cerrar el menú */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className='text-xl font-semibold'>Menu</h2>
                        <button onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
                        </button>
                    </div>

                    {/* Lista de navegación */}
                    <nav className='flex flex-col w-full'>
                        <Link to="dashboard" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faTachometerAlt} className='text-lg' />
                            <span className='font-medium'>Dashboard</span>
                        </Link>
                        <Link to="calendar" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faCalendarAlt} className='text-lg' />
                            <span className='font-medium'>Calendar</span>
                        </Link>
                        <Link to="teachers" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faChalkboardTeacher} className='text-lg' />
                            <span className='font-medium'>Teachers</span>
                        </Link>
                        <Link to="resources" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBook} className='text-lg' />
                            <span className='font-medium'>Resources</span>
                        </Link>
                        <Link to="users" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faUserFriends} className='text-lg' />
                            <span className='font-medium'>Users</span>
                        </Link>
                        <Link to="forms" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faFolder} className='text-lg' />
                            <span className='font-medium'>Forms</span>
                        </Link>
                        <Link to="insights" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faPager} className='text-lg' />
                            <span className='font-medium'>Insights</span>
                        </Link>
                    </nav>

                    {/* Botón de Logout */}
                    <button className="mt-4 flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-800 w-full" onClick={onLogout}>
                        <FontAwesomeIcon icon={faSignOut} className='text-lg' />
                        <span className='font-medium'>Logout</span>
                    </button>
                </div>
            )}
        </>
    );
};
