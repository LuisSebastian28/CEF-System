import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';

export const useLogin = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  useEffect(() => {
    const handleAuthentication = async () => {
      if (status === 'authenticated') {
        // Mostrar SweetAlert y esperar a que se cierre
        await Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome back!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });

        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else if (status === 'not-authenticated' && errorMessage) {
        // Mostrar SweetAlert de error
        await Swal.fire({
          title: 'Login Failed',
          text: 'Email or Password Incorrect',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    };

    handleAuthentication();
  }, [status, navigate, location, errorMessage]);

  return {
    status,
    errorMessage,
    handleLogin,
  };
};
