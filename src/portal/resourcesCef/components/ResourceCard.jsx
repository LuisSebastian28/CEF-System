import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteFirebaseResource } from '../../../store/portal/resourcesCef/resourcesThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCloud, faHardDrive } from '@fortawesome/free-solid-svg-icons';
import { useResources } from '../hooks/useResources';

export const ResourceCard = ({ file, type, source }) => {
    const dispatch = useDispatch();
    const { hasAccess } = useResources();

    const isGoogleDoc = file.mimeType === 'application/vnd.google-apps.document';
    const downloadUrl = file.url || (isGoogleDoc ? file.webViewLink : file.webContentLink);

    // URLs públicas para imágenes por tipo de archivo
    const defaultImages = {
        pdf: 'https://cdn-icons-png.flaticon.com/512/337/337946.png', // Icono PDF
        image: 'https://cdn-icons-png.flaticon.com/512/337/337940.png', // Icono Imagen
        video: 'https://cdn-icons-png.flaticon.com/512/337/337953.png', // Icono Video
        document: 'https://cdn-icons-png.flaticon.com/512/337/337958.png', // Icono Documento
        spreadsheet: 'https://cdn-icons-png.flaticon.com/512/337/337948.png', // Icono Hoja de Cálculo
        default: 'https://cdn-icons-png.flaticon.com/512/338/338846.png', // Icono genérico
    };

    // Selección de imagen por tipo de archivo
    const mimeTypeMapping = {
        'application/pdf': 'pdf',
        'image/': 'image',
        'video/': 'video',
        'application/vnd.google-apps.document': 'document',
        'application/vnd.google-apps.spreadsheet': 'spreadsheet',
    };

    const fileType =
        Object.keys(mimeTypeMapping).find((key) => file.mimeType.startsWith(key)) || 'default';

    const thumbnail = file.thumbnailLink || defaultImages[fileType];

    const handleDelete = () => {
        if (source === 'drive') {
            Swal.fire({
                icon: 'error',
                title: 'Unable to Delete',
                text: 'You do not have access to delete files from Google Drive.',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete the file: ${file.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteFirebaseResource(file.name));
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col justify-between">
            <div>
                <img
                    src={thumbnail}
                    alt={file.name}
                    className="w-full h-40 object-contain bg-gray-100 rounded-md mb-3"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">{file.name}</h2>
            </div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-gray-500 text-sm">
                    {source === 'drive' ? (
                        <FontAwesomeIcon icon={faHardDrive} className="text-blue-500 mr-1" />
                    ) : (
                        <FontAwesomeIcon icon={faCloud} className="text-green-500 mr-1" />
                    )}
                    {source === 'drive' ? 'Google Drive' : 'Firebase'}
                </span>
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
                {hasAccess && (
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                )}
            </div>
        </div>
    );
};
