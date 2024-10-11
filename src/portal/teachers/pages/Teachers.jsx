import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchUsers } from '../../../store/portal/users/userThunks';



export const Teachers = () => {

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(startFetchUsers());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-4/5 p-10">
        <h1 className="text-4xl font-bold mb-10">Teachers</h1>
        <div className="grid grid-cols-3 gap-10">
          {users.map((user, index) => (
            <div key={index} className="bg-white p-5 rounded shadow flex flex-col items-center max-w-sm w-full">
              <img src={user.photoUrl} alt={`${user.firstName}'s profile`} className="w-24 h-24 rounded-full mb-5" />
              <div className="initials-circle mb-5">
                <span>{user.firstName}</span>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">{user.county}</h2>
                <p className="text-gray-600">{user.roleDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
