// src/portal/components/BarChartSection.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const BarChartSection = ({ title, data, dataKey, barColor, name }) => (
    <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-bold mb-5">{title}</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKey} fill={barColor} name={name} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);
