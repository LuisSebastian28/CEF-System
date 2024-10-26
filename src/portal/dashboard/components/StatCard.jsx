// src/portal/components/StatCard.js
import React from 'react';

export const StatCard = ({ title, value, description }) => (
    <div className="bg-white p-5 rounded shadow">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center mt-5">
            <span className="text-4xl font-bold">{value}</span>
        </div>
    </div>
);
