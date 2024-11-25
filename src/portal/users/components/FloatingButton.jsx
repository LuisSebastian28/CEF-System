// src/portal/components/FloatingButton.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FloatingButton = ({ onClick, icon }) => (
    <button
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-dark-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-dark-blue-700 flex items-center justify-center sm:p-3 md:p-4"
    >
        <FontAwesomeIcon icon={icon} className="h-6 w-6 text-white" />
    </button>
);
