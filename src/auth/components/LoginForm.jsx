import React, { useState, useMemo } from 'react';
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const { status, errorMessage, handleLogin } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/" className="text-blue-500 text-sm hover:text-blue-700">Forgot your password?</a>
      </div>
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
  );
};
