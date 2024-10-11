import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  console.log(user)
  return user ? <>{children}</> : <Navigate to="/auth" />;
};
