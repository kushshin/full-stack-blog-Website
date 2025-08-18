import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('Role'));

  const login = (name) => {
    localStorage.setItem('username', name);
    setUsername(name);
  };

  const Alogin = (name,role) => {
    localStorage.setItem('username', name);
    localStorage.setItem('Role', role);
    setUsername(name);
    setRole(role)
  };

  const logout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };
  const Alogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, role,login, logout,Alogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
