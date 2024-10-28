import React from 'react';
import { LogoSection } from '../components/LogoSection';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-dark-blue-900 to-dark-blue-700 px-4">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 w-full max-w-3xl">
        
        {/* Sección del Logo */}
        <LogoSection />
        
        {/* Formulario */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-left text-black">Welcome!</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
