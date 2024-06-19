// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { Login } from './Pages/Login';
import { Dashboard } from './Pages/Dashboard';
import { Calendar } from './Pages/Calendar';
import { FormsPage } from './Pages/Forms';
import { Sidebar } from './components/Sidebar';
import { Teachers } from './Pages/Teachers';
import { Resources } from './Pages/Resources';

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/calendar"
            element={currentUser ? <Calendar /> : <Navigate to="/login" />}
          />
          <Route
            path="/forms"
            element={currentUser ? <FormsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/teachers"
            element={currentUser ? <Teachers /> : <Navigate to="/login" />}
          />

          <Route path="/resources" element={<Resources />} /> {/* Public route */}
        </Routes>
      </div>
    </div>
  );
};
