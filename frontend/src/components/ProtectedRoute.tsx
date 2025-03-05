
import { Navigate } from 'react-router-dom';
// import { useAppSelector } from '../hooks/hook';

import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // const { token } = useAppSelector((state) => state.auth);

  const loadState = () => {
    try {
      const serializedState = localStorage.getItem('authState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };
  const token = loadState()?.token;
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;