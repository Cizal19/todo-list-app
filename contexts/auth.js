import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Perform your authentication logic here, for example:
    // const isAuthenticated = checkIfUserIsAuthenticated();
    // setIsAuthenticated(isAuthenticated);
    // Replace with your own authentication logic

    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform your logout logic here, for example:
    // clearAuthenticationTokens();
    // Replace with your own logout logic

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
