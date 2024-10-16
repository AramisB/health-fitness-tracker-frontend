import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch('health-fitness-tracker-9l7o.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        const userWithToken = { ...data.user, token: data.token }; // Combine user data and token
        setUser(userWithToken); // Set the combined user object
        localStorage.setItem('token', data.token); // Save the JWT in local storage
      } else {
        throw new Error(data.msg); // Handle error from server
      }
    } catch (error) {
      console.error('Login failed:', error); // Log error
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('https://health-fitness-tracker-9l7o.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user); // Set the user from response data
        localStorage.setItem('token', data.token); // Save the JWT in local storage
      } else {
        throw new Error(data.msg); // Handle error from server
      }
    } catch (error) {
      console.error('Registration failed:', error); // Log error
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
