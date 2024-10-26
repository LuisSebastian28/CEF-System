// src/portal/components/ContactModal.js
import React from 'react';
import emailjs from 'emailjs-com';

export const ContactModal = ({ isOpen, onClose, selectedTeacher, message, setMessage }) => {

    const handleSendEmail = () => {
        const templateParams = {
            to_name: selectedTeacher.firstName,
            to_email: selectedTeacher.email,
            message,
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
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Contactar a {selectedTeacher.firstName}</h2>
                <p className="text-gray-700 mb-4">Enviar un mensaje a <span className="font-semibold">{selectedTeacher.email}</span></p>
                <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    rows="4" 
                    className="w-full p-2 border rounded-lg mb-4" 
                    placeholder="Escribe tu mensaje aquí..."
                />
                <div className="flex justify-between">
                    <button 
                        onClick={onClose} 
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
    );
};
