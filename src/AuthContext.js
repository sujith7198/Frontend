// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true); 
  };

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const clearAuthToken = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthToken, getAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
