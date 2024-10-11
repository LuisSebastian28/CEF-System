import React from 'react';

export const OptionCard = ({ title, description, onClick }) => (
  <div 
    onClick={onClick} 
    className="border p-4 rounded-lg cursor-pointer text-center shadow-md hover:shadow-lg"
  >
    <h3 className="font-bold text-lg">{title}</h3>
    <p>{description}</p>
  </div>
);

