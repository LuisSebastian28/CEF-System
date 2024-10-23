import React, { useEffect, useState } from 'react';

export const Resources = () => {
  const [files, setFiles] = useState(null);  // Inicializa files como null
  const [loading, setLoading] = useState(true);  // Estado para saber si está cargando
  const [error, setError] = useState(null);  // Estado para manejar errores

  useEffect(() => {
    const folderId = '1Lqzal8iYTtyeHiV97vXzBGBTBV51aguc'; // ID de la carpeta
    const API_KEY = 'AIzaSyAluLKMMt6FEryHw5H2UzpLk9yPtMGSkGg'; // Aquí va tu API key obtenida de Google Cloud Console

    // Añadir thumbnailLink para obtener las miniaturas
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink)`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.files) {
          setFiles(data.files);
        } else {
          setFiles([]);
        }
        setLoading(false);  // Deja de estar cargando
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
        setError('Failed to fetch files');
        setLoading(false);  // Deja de estar cargando aunque haya error
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-500">Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;  // Muestra mensaje de error
  }

  if (!files || files.length === 0) {
    return <p className="text-center text-gray-500 text-xl">No resources found.</p>;  // Muestra mensaje si no hay archivos
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Cabecera */}
      <header className="bg-blue-600 text-white py-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">Resources Hub</h1>
          <p className="text-lg font-light">Discover and manage your resources efficiently</p>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex-grow p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 p-6 text-center"
            >
              {/* Miniatura */}
              {file.thumbnailLink ? (
                <img 
                  src={file.thumbnailLink} 
                  alt={file.name} 
                  className="w-full h-48 object-cover rounded-t-lg mb-4" 
                />
              ) : (
                <div className="w-full h-48 flex justify-center items-center bg-gray-200 rounded-t-lg mb-4">
                  {file.mimeType.startsWith('audio/') && (
                    <span className="text-6xl">🎵</span>
                  )}
                  {file.mimeType.startsWith('application/pdf') && (
                    <span className="text-6xl">📄</span>
                  )}
                  {file.mimeType.startsWith('video/') && (
                    <span className="text-6xl">🎥</span>
                  )}
                  {/* Ícono genérico para otros archivos */}
                  {!file.mimeType.startsWith('image/') && 
                   !file.mimeType.startsWith('audio/') && 
                   !file.mimeType.startsWith('video/') && (
                    <span className="text-6xl">📁</span>
                  )}
                </div>
              )}

              {/* Información del archivo */}
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{file.name}</h2>
              <p className="text-gray-500 mb-4">{file.mimeType}</p>

              {/* Botón de acción */}
              <a href={file.webContentLink} target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Abrir
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Pie de página */}
      <footer className="bg-blue-600 text-white text-center py-4">
        <p className="text-sm">&copy; 2024 Resources Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};
