import React from 'react';
import logo from '../../assets/images/logo2.png'

export const LogoSection = () => (
  <div className="flex justify-center items-center bg-gradient-to-b from-dark-blue-900 to-dark-blue-700 rounded-lg p-8 md:p-16 order-first md:order-last">
    <img src={logo} alt="Logo" className="w-40 md:w-60" />
  </div>
);
