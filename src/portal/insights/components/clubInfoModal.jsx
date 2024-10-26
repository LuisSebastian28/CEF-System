// src/portal/components/ClubInfoModal.js
import React from 'react';

export const ClubInfoModal = ({ isOpen, onClose, club, eventTypeLabels }) => {
    if (!isOpen || !club) return null;

    const clubInfo = (
        <div className="space-y-2">
            {Object.keys(club).map((key) => (
                <div key={key} className="flex justify-between">
                    <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span>{club[key]}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <i className="fas fa-times"></i>
                </button>
                <h3 className="text-xl font-bold mb-4">{eventTypeLabels[club.eventType]}</h3>
                {clubInfo}
            </div>
        </div>
    );
};
