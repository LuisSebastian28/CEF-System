// components/ResourceCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFirebaseResource } from '../../../store/portal/resourcesCef/resourcesThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const ResourceCard = ({ file, type }) => {
    const dispatch = useDispatch();
    const isGoogleDoc = file.mimeType === 'application/vnd.google-apps.document';
    const downloadUrl = file.url || (isGoogleDoc ? file.webViewLink : file.webContentLink);

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col justify-between">
            <div>
                <img
                    src={file.thumbnailLink || `/default-${type}-thumbnail.png`}
                    alt={file.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">{file.name}</h2>
            </div>

            <div className="flex space-x-1">
                <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow bg-blue-500 text-white py-2 rounded-lg text-center font-medium hover:bg-blue-600 transition-colors"
                >
                    View
                </a>
                <button
                    onClick={() => dispatch(deleteFirebaseResource(file.name))}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};
