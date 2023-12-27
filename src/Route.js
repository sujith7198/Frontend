// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ element }) {
  const auth = useAuth();
  console.log(auth); 
   console.log(auth.isAuthenticated)
  return auth.isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;
