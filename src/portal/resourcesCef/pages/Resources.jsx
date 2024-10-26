// src/portal/pages/Resources.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResources } from '../../../store/portal/resourcesCef/resourcesThunks';
import { SearchBar } from '../components/SearchBar';
import { ResourceCategory } from '../components/ResourceCategory';

export const Resources = () => {
    const dispatch = useDispatch();
    const { files, loading, error } = useSelector((state) => state.resources);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pdfFiles = filteredFiles.filter((file) => file.mimeType.includes('pdf'));
    const videoFiles = filteredFiles.filter((file) => file.mimeType.includes('video'));
    const audioFiles = filteredFiles.filter((file) => file.mimeType.includes('audio'));

    return (
        <div className="flex flex-col h-screen bg-white">
            <header className="bg-blue-600 text-white py-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-2">Resources Hub</h1>
                    <p className="text-lg font-light">Discover and manage your resources efficiently</p>
                </div>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <div className="flex-grow p-10">
                {filteredFiles.length === 0 ? (
                    <p className="text-center text-gray-500 text-xl">No matching resources found.</p>
                ) : (
                    <>
                        <ResourceCategory title="PDFs" files={pdfFiles} type="pdf" />
                        <ResourceCategory title="Videos" files={videoFiles} type="video" />
                        <ResourceCategory title="Audios" files={audioFiles} type="audio" />
                    </>
                )}
            </div>
        </div>
    );
};
