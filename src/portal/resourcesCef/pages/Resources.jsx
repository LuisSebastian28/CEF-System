import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources, fetchFirebaseStorageResources } from '../../../store/portal/resourcesCef/resourcesThunks';
import { SearchBar } from '../components/SearchBar';
import { ResourceCard } from '../components/ResourceCard';
import UploadModal from '../components/UploadModal'; // Importa el componente del modal de subida

export const Resources = () => {
    const dispatch = useDispatch();
    const { driveFiles, firebaseFiles, error } = useSelector((state) => state.resources);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [showUploadModal, setShowUploadModal] = useState(false); // Estado para controlar el modal

    useEffect(() => {
        dispatch(fetchResources());
        dispatch(fetchFirebaseStorageResources());
    }, [dispatch]);

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center h-screen bg-gray-50">
    //             <p className="text-2xl font-semibold text-gray-500">Loading resources...</p>
    //         </div>
    //     );
    // }

    if (error) {
        return <p className="text-center text-red-500 text-xl">{error}</p>;
    }

    const allFiles = [
        ...driveFiles.map((file) => ({ ...file, source: 'drive' })), // Agrega 'source: drive' a cada archivo de Google Drive
        ...firebaseFiles.map((file) => ({ ...file, source: 'firebase' })), // Agrega 'source: firebase' a cada archivo de Firebase
    ];
    const filteredFiles = allFiles.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getFilteredFilesByCategory = () => {
        if (selectedFilter === 'all') return filteredFiles;
        const documentMimeTypes = [
            'application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain', 'application/rtf', 'application/vnd.oasis.opendocument.text',
            'application/vnd.google-apps.document', 'application/vnd.google-apps.spreadsheet', 'application/vnd.google-apps.presentation'
        ];

        if (selectedFilter === 'documents') {
            return filteredFiles.filter((file) => documentMimeTypes.includes(file.mimeType));
        }
        if (selectedFilter === 'video') {
            return filteredFiles.filter((file) => file.mimeType.includes('video'));
        }
        if (selectedFilter === 'audio') {
            return filteredFiles.filter((file) => file.mimeType.includes('audio'));
        }
        return filteredFiles;
    };

    const displayedFiles = getFilteredFilesByCategory();

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Barra lateral de filtros */}

            {/* Contenido principal */}
            <div className="flex-grow flex flex-col">
                <header className="bg-blue-600 text-white py-6  shadow-md mb-4 px-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Resources Hub</h1>
                        <p className="text-md font-light">Discover and manage your resources efficiently</p>
                    </div>
                    <div className="max-w-lg mx-auto mt-4">
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedFiles.map((file, index) => (
                            <ResourceCard
                                key={index}
                                file={file}
                                type={file.mimeType.split('/')[0]}
                                source={file.source} // Pasa la fuente como prop
                            />
                        ))}

                    </div>
                </div>
            </div>

            {/* Botón flotante */}
            <button
                onClick={() => setShowUploadModal(true)}
                className="fixed bottom-10 right-10 bg-blue-600 text-white text-4xl rounded-full p-5 shadow-2xl hover:bg-blue-700 focus:outline-none transform transition-transform duration-200 hover:scale-110"
            >
                <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>
            <div className="w-64 bg-white p-4 shadow-lg ">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter Resources</h2>
                <div className="space-y-3">
                    <button
                        onClick={() => setSelectedFilter('all')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        All Files
                    </button>
                    <button
                        onClick={() => setSelectedFilter('documents')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'documents' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Documents
                    </button>
                    <button
                        onClick={() => setSelectedFilter('video')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => setSelectedFilter('audio')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'audio' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        Audios
                    </button>
                </div>
            </div>


            {/* Modal de subida */}
            {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
        </div>
    );
};
