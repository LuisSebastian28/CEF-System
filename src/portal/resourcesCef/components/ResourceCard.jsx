// src/portal/components/ResourceCard.js
import React from 'react';

export const ResourceCard = ({ file, type }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 p-6">
        {type === 'audio' ? (
            <span className="text-6xl">🎵</span>
        ) : (
            <img
                src={file.thumbnailLink || `/default-${type}-thumbnail.png`}
                alt={file.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
        )}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{file.name}</h2>
        <a
            href={file.webContentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
        >
            {type === 'pdf' ? 'View PDF' : type === 'video' ? 'Watch Video' : 'Listen to Audio'}
        </a>
    </div>
);
