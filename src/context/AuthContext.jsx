// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const AuthContext = createContext();

// Creamos un proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para simular login
  const login = () => setIsAuthenticated(true);

  // Función para simular logout
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
