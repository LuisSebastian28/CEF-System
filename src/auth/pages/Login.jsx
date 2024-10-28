import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
    email: '',
    password: ''
};

export const Login = ({ handleLogin }) => {
    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { email, password, onInputChange } = useForm(formData);
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }));
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark-blue-900 to-dark-blue-700 px-4">
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 w-full max-w-3xl">
                
                {/* Logo Section - Aparece arriba en móviles */}
                <div className="flex justify-center items-center bg-gradient-to-b from-dark-blue-900 to-dark-blue-700 rounded-lg p-8 md:p-16 order-first md:order-last">
                    <img src={logo} alt="Logo" className="w-40 md:w-60" />
                </div>
                
                {/* Form Section */}
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-6 text-left text-black">Welcome!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email Address"
                                name="email"
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="************"
                                name="password"
                                onChange={onInputChange}
                            />
                            <a href="/" className="text-blue-500 text-sm hover:text-blue-700">Forgot your password?</a>
                        </div>
                        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                style={{ backgroundColor: '#00004d', color: 'white' }}
                                disabled={isAuthenticating}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
