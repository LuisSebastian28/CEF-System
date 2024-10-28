import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';

export const useLogin = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    dispatch(startLoginWithEmailPassword({ email, password }));
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from);
  };

  return {
    status,
    errorMessage,
    handleLogin,
  };
};
