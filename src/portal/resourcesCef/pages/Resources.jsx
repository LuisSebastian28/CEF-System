import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources } from '../../../store/portal/resourcesCef/resourcesThunks';
import { SearchBar } from '../components/SearchBar';
import { ResourceCard } from '../components/ResourceCard';

export const Resources = () => {
    const dispatch = useDispatch();
    const { files, loading, error } = useSelector((state) => state.resources);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all'); // Filtro seleccionado

    useEffect(() => {
        dispatch(fetchResources());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-semibold text-gray-500">Loading resources...</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500 text-xl">{error}</p>;
    }

    // Filtrar archivos por nombre de búsqueda
    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrar archivos según la categoría seleccionada
    const getFilteredFilesByCategory = () => {
        if (selectedFilter === 'all') return filteredFiles;

        if (selectedFilter === 'documents') {
            // Agregar mimeTypes de archivos de Google Workspace
            const documentMimeTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'text/plain',
                'application/rtf',
                'application/vnd.oasis.opendocument.text',
                'application/vnd.google-apps.document',   // Google Docs
                'application/vnd.google-apps.spreadsheet', // Google Sheets
                'application/vnd.google-apps.presentation' // Google Slides
            ];
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
        <div className="flex h-screen bg-white">
            {/* Contenido principal */}
            <div className="flex-grow">
                <header className="bg-blue-600 text-white py-8 shadow-lg mb-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2">Resources Hub</h1>
                        <p className="text-lg font-light">Discover and manage your resources efficiently</p>
                    </div>
                    <div className="max-w-md mx-auto mt-4">
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {displayedFiles.length === 0 ? (
                        <p className="text-center text-gray-500 text-xl">No matching resources found.</p>
                    ) : (
                        displayedFiles.map((file, index) => (
                            <ResourceCard key={index} file={file} type={file.mimeType.split('/')[0]} />
                        ))
                    )}
                </div>
            </div>

            {/* Barra lateral de filtros */}
            <div className="w-60 bg-gray-100 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-700 mb-6">Filter Resources</h2>
                <div className="space-y-4">
                    <button
                        onClick={() => setSelectedFilter('all')}
                        className={`w-full text-left px-4 py-2 rounded-lg ${selectedFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                    >
                        All Files
                    </button>
                    <button
                        onClick={() => setSelectedFilter('documents')}
                        className={`w-full text-left px-4 py-2 rounded-lg ${selectedFilter === 'documents' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                    >
                        Documents
                    </button>
                    <button
                        onClick={() => setSelectedFilter('video')}
                        className={`w-full text-left px-4 py-2 rounded-lg ${selectedFilter === 'video' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => setSelectedFilter('audio')}
                        className={`w-full text-left px-4 py-2 rounded-lg ${selectedFilter === 'audio' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                    >
                        Audios
                    </button>
                </div>
            </div>
        </div>
    );
};
