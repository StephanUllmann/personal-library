import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

const ProtectedLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  if (!user) return null;
  return <Outlet />;
};

export default ProtectedLayout;
