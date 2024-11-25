// components/UploadModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { uploadResource } from '../../../store/portal/resourcesCef/resourcesThunks';

const UploadModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const uploadProgress = useSelector((state) => state.resources.uploadProgress);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (file) {
            try {
                setIsUploading(true); // Marcar el inicio de la carga
                await dispatch(uploadResource(file)); // Esperar que termine el thunk
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Failed',
                    text: 'There was an error uploading the resource. Please try again.',
                    confirmButtonColor: '#d33',
                });
                setIsUploading(false); // Finalizar la carga si hay error
            }
        }
    };

    // Monitorea el progreso de la carga
    useEffect(() => {
        if (uploadProgress === 100 && isUploading) {
            Swal.fire({
                icon: 'success',
                title: 'File Uploaded',
                text: 'The resource has been uploaded successfully!',
                confirmButtonColor: '#3085d6',
            });
            setFile(null); // Limpiar el archivo seleccionado
            setIsUploading(false); // Resetear estado de carga
            onClose(); // Cerrar el modal
        }
    }, [uploadProgress, isUploading, onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Upload New Resource</h2>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="mb-4 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer 
                               hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />

                {uploadProgress > 0 && (
                    <div className="mb-6"> {/* Contenedor separado para barra de progreso */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2 text-center">{Math.round(uploadProgress)}% uploaded</p>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleUpload}
                        className={`bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition ${
                            isUploading && 'opacity-50 cursor-not-allowed'
                        }`}
                        disabled={!file || isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                    
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-sm underline text-center w-full"
                        disabled={isUploading} // Deshabilitar cancelar si está cargando
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
