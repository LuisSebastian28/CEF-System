import React from 'react';

export const ResourceCard = ({ file, type }) => {
    const isGoogleDoc = file.mimeType === 'application/vnd.google-apps.document';

    return (
        <div className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 transform hover:-translate-y-1 p-4">
            {type === 'audio' ? (
                <span className="text-4xl">🎵</span>
            ) : (
                <img
                    src={file.thumbnailLink || `/default-${type}-thumbnail.png`}
                    alt={file.name}
                    className="w-full h-36 object-cover rounded-md mb-3"
                />
            )}
            <h2 className="text-lg font-semibold mb-1 text-gray-800 truncate">{file.name}</h2>
            <a
                href={isGoogleDoc ? file.webViewLink : file.webContentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
            >
                {type === 'pdf' ? 'View PDF' :
                 type === 'video' ? 'Watch Video' :
                 type === 'audio' ? 'Listen to Audio' :
                 isGoogleDoc ? 'View Document' : 'View File'}
            </a>
        </div>
    );
};
