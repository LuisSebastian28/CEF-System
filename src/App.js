import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Pages/Login.js'
import { Dashboard } from './Pages/Dashboard.js'
import { Calendar } from './Pages/Calendar.js'
import { FormsPage } from './Pages/Forms.js'
import { Sidebar } from './Sidebar';
import { Teachers } from './Pages/Teachers.js';
import { Resources } from './Pages/Resources.js';


export const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}