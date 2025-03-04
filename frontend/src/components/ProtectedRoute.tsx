
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hook';

import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;