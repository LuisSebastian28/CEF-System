import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchUsers } from '../../../store/portal/users/userThunks';
import emailjs from 'emailjs-com';

export const Teachers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(startFetchUsers());
  }, [dispatch]);

  const handleContactClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setMessage("");
  };

  const handleSendEmail = () => {
    if (selectedUser && message) {
      // Configura tu servicio de EmailJS aquí
      const templateParams = {
        to_name: selectedUser.firstName,
        to_email: selectedUser.email,
        message: message
      };

      emailjs.send(
        'service_sjcoiua', // Reemplaza con tu Service ID de EmailJS
        'your_template_id', // Reemplaza con tu Template ID de EmailJS
        templateParams,
        'your_user_id' // Reemplaza con tu User ID de EmailJS
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Correo enviado exitosamente');
      }, (err) => {
        console.log('FAILED...', err);
        alert('Error al enviar el correo');
      });
    }
    handleCloseModal();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Título */}
      <div className="w-full bg-blue-600 text-white py-10 text-center shadow-lg">
        <h1 className="text-5xl font-bold">Teachers</h1>
        <p className="mt-2 text-lg">Contact and manage the teachers in your organization</p>
      </div>

      {/* Tarjetas de profesores */}
      <div className="w-4/5 mx-auto p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {users.map((user, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img 
                src={user.photoUrl || 'https://via.placeholder.com/100'} 
                alt={`${user.firstName}'s profile`} 
                className="w-24 h-24 rounded-full mb-5 object-cover mx-auto"
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-600">{user.county}</p>
                <p className="text-gray-500">{user.roleDesc}</p>
              </div>
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => handleContactClick(user)} 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contactar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de contacto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Contactar a {selectedUser.firstName}</h2>
            <p className="text-gray-700 mb-4">Enviar un mensaje a <span className="font-semibold">{selectedUser.email}</span></p>
            <textarea 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              rows="4" 
              className="w-full p-2 border rounded-lg mb-4" 
              placeholder="Escribe tu mensaje aquí..."
            />
            <div className="flex justify-between">
              <button 
                onClick={handleCloseModal} 
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSendEmail} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enviar correo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
