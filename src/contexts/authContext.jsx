import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Corrigido aqui

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role); // Corrigido aqui
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};