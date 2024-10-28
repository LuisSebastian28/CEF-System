// components/UploadModal.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadResource } from '../../../store/portal/resourcesCef/resourcesThunks';

const UploadModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const uploadProgress = useSelector((state) => state.resources.uploadProgress);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = () => {
        if (file) dispatch(uploadResource(file));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Upload New Resource</h2>
                <input type="file" onChange={handleFileChange} className="mb-4" />
                
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                        <p className="text-gray-600 text-sm mt-2 text-center">{Math.round(uploadProgress)}% uploaded</p>
                    </div>
                )}
                
                <button
                    onClick={handleUpload}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
                    disabled={!file}
                >
                    Upload
                </button>
                
                <button
                    onClick={onClose}
                    className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline text-center w-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UploadModal;
