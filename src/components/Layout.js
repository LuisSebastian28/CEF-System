import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};
