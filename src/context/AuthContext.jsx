import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Hook personalizado para acceder al contexto
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    // Aquí puedes almacenar el token en localStorage o en el estado
    localStorage.setItem('authToken', token); // Guardar el token en localStorage
    setUser({ token }); // Actualizar el estado del usuario con el token
  };

  const logout = () => {
    // Aquí puedes eliminar el token de localStorage y limpiar el estado
    localStorage.removeItem('authToken'); // Eliminar el token de localStorage
    setUser(null); // Limpiar el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
