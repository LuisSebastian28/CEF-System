import React, { useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateClub } from '../../../store/portal/clubs/clubsThunks';
import { startFetchUsers } from '../../../store/portal/users/userThunks';
import { formFields } from '../helpers/formConfigs';

export const ClubForm = ({ eventType }) => {
  const dispatch = useDispatch();
  const { users, status: usersStatus } = useSelector((state) => state.users);
  const config = formFields[eventType];
  
  const [isSubmitted, setIsSubmitted] = useState(false);  // Nuevo estado

  const {
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
    ...formValidation
  } = useForm(config.initialValues, config.validations);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(startFetchUsers());
    }
  }, [usersStatus, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);  // Cambiar el estado de enviado

    if (isFormValid) {
      dispatch(startCreateClub(formState));
      onResetForm();
      setIsSubmitted(false);  // Reinicia el estado de enviado
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{eventType} Form</h3>
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
        {config.fields.map((field) => (
          <div key={field} className="col-span-1">
            <label htmlFor={field} className="block capitalize">
              {field}
            </label>
            {field === 'missionary' ? (
              <select
                id={field}
                name={field}
                value={formState[field] || ''}
                onChange={onInputChange}
                className={`w-full p-2 border rounded ${
                  isSubmitted && formValidation[`${field}Valid`] ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select missionary</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field === 'date' || field === 'time' ? field : 'text'}
                id={field}
                name={field}
                value={formState[field] || ''}
                onChange={onInputChange}
                className={`w-full p-2 border rounded ${
                  isSubmitted && formValidation[`${field}Valid`] ? 'border-red-500' : ''
                }`}
                placeholder={`Enter ${field}`}
              />
            )}
            {isSubmitted && formValidation[`${field}Valid`] && (
              <p className="text-red-500">{formValidation[`${field}Valid`]}</p>
            )}
          </div>
        ))}
        <div className="col-span-3 text-right">
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
