import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateClub } from '../../../store/portal/clubs/clubsThunks';
import { startFetchUsers } from '../../../store/portal/users/userThunks'; // Para obtener los usuarios
import { doc } from 'firebase/firestore'; // Importar la función doc
import { FirebaseDB } from '../../../firebase/firebaseConfig';


export const FiveDayClubForm = () => {
  const dispatch = useDispatch();
  
  // Estado para almacenar el formulario y los errores
  const [formData, setFormData] = useState({
    club: '',
    date: '',
    time: '',
    hostess: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    comments: '',
    missionary: '', // Aquí almacenamos el ID del usuario seleccionado
    helper: '', // Inicialmente una cadena vacía para los ayudantes
    eventType: 'fivedayclub', // Se agrega eventType con valor predeterminado
    offering: '00.00'
  });


  const [errors, setErrors] = useState({});
  const { users, status: usersStatus } = useSelector(state => state.users); // Obtener usuarios del estado

  useEffect(() => {
    // Obtener los usuarios solo si no están cargados aún
    if (usersStatus === 'idle') {
      dispatch(startFetchUsers());
    }
  }, [usersStatus, dispatch]);

  // Manejar el cambio de los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };



  // Manejar el cambio de selección del misionero
  const handleMissionaryChange = (e) => {
    setFormData({
      ...formData,
      missionary: e.target.value, // Guardar el ID del misionero seleccionado
    });
  };


  // Función para verificar campos vacíos
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.club) newErrors.club = 'Club name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.hostess) newErrors.hostess = 'Hostess name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip) newErrors.zip = 'Zip code is required';
    if (!formData.missionary) newErrors.missionary = 'Missionary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const missionaryRef = doc(FirebaseDB, `users/${formData.missionary}`); // Crear referencia al documento del misionero

      const formWithReference = {
        ...formData,
        missionary: missionaryRef, // Guardar la referencia de Firestore
      };

      dispatch(startCreateClub(formWithReference));
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">5 Day Club</h3>
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
        
        <div className="col-span-1">
          <label htmlFor="club" className="block">Club</label>
          <input 
            type="text" 
            id="club" 
            className={`w-full p-2 border rounded ${errors.club ? 'border-red-500' : ''}`} 
            placeholder="Enter club name" 
            onChange={handleChange} 
            value={formData.club} 
          />
          {errors.club && <p className="text-red-500">{errors.club}</p>}
        </div>

        {/* Campo para seleccionar el misionero */}
        <div className="col-span-1">
          <label htmlFor="missionary" className="block">Select Missionary</label>
          <select
            id="missionary"
            className={`w-full p-2 border rounded ${errors.missionary ? 'border-red-500' : ''}`}
            onChange={handleMissionaryChange}
            value={formData.missionary}
          >
            <option value="">Select a missionary</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          {errors.missionary && <p className="text-red-500">{errors.missionary}</p>}
        </div>

         {/* Campo helper (Ayudantes) */}
        <div className="col-span-3">
          <label htmlFor="helper" className="block">Helper</label>
          <input 
            type="text" 
            id="helper" 
            className="w-full p-2 border rounded" 
            placeholder="Enter helper (comma separated if you need more than one)" 
            onChange={handleChange} 
            value={formData.helper} 
          />
        </div>

        {/* Campo Offering */}
        <div className="col-span-3">
          <label htmlFor="offering" className="block">Offering</label>
          <input 
            type="text" 
            id="offering" 
            className="w-full p-2 border rounded" 
            placeholder="Enter offering amount" 
            onChange={handleChange} 
            value={formData.offering} 
          />
        </div>
        
        {/* Campo Date */}
        <div className="col-span-1">
          <label htmlFor="date" className="block">Date</label>
          <input 
            type="date" 
            id="date" 
            className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.date} 
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        {/* Campo Time */}
        <div className="col-span-1">
          <label htmlFor="time" className="block">Time</label>
          <input 
            type="time" 
            id="time" 
            className={`w-full p-2 border rounded ${errors.time ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.time} 
          />
          {errors.time && <p className="text-red-500">{errors.time}</p>}
        </div>

        {/* Campo Hostess */}
        <div className="col-span-1">
          <label htmlFor="hostess" className="block">Hostess</label>
          <input 
            type="text" 
            id="hostess" 
            className={`w-full p-2 border rounded ${errors.hostess ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.hostess} 
            placeholder="Enter hostess name" 
          />
          {errors.hostess && <p className="text-red-500">{errors.hostess}</p>}
        </div>

        {/* Campo Phone */}
        <div className="col-span-1">
          <label htmlFor="phone" className="block">Phone</label>
          <input 
            type="text" 
            id="phone" 
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.phone} 
            placeholder="Enter phone number" 
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        {/* Campo Address */}
        <div className="col-span-3">
          <label htmlFor="address" className="block">Address</label>
          <input 
            type="text" 
            id="address" 
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.address} 
            placeholder="Enter address" 
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>

        {/* Campo City */}
        <div className="col-span-1">
          <label htmlFor="city" className="block">City</label>
          <input 
            type="text" 
            id="city" 
            className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.city} 
            placeholder="Enter city" 
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}
        </div>

        {/* Campo State */}
        <div className="col-span-1">
          <label htmlFor="state" className="block">State</label>
          <input 
            type="text" 
            id="state" 
            className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.state} 
            placeholder="Enter state" 
          />
          {errors.state && <p className="text-red-500">{errors.state}</p>}
        </div>

        {/* Campo Zip */}
        <div className="col-span-1">
          <label htmlFor="zip" className="block">Zip</label>
          <input 
            type="text" 
            id="zip" 
            className={`w-full p-2 border rounded ${errors.zip ? 'border-red-500' : ''}`} 
            onChange={handleChange} 
            value={formData.zip} 
            placeholder="Enter zip code" 
          />
          {errors.zip && <p className="text-red-500">{errors.zip}</p>}
        </div>

       

        {/* Campo Additional Comments */}
        <div className="col-span-3">
          <label htmlFor="additionalComments" className="block">Additional Comments</label>
          <textarea 
            id="additionalComments" 
            className="w-full p-2 border rounded" 
            onChange={handleChange} 
            value={formData.additionalComments} 
            placeholder="Enter additional comments"
          ></textarea>
        </div>

        <div className="col-span-3 text-right">
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};
