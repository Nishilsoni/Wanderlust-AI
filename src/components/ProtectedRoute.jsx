// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
