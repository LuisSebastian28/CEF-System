// src/Pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/images/logo2.png';

export const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleLogin(userCredential.user);
      navigate('/dashboard'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark-blue-900 to-dark-blue-700">
      <div className="bg-white p-8 rounded-lg shadow-lg flex gap-4">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-left text-black">Welcome!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email Address"
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
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="************"
              />
              <a href="#" className="text-blue-500 text-sm hover:text-blue-700">Forgot your password?</a>
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                style={{ backgroundColor: '#00004d', color: 'white' }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-b from-dark-blue-900 to-dark-blue-700 rounded-lg p-6">
          <img src={logo} alt="Logo" className="w-100 h-60" />
        </div>
      </div>
    </div>
  );
};
