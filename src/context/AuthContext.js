import React, { createContext, useState, useContext, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // This defines the useAuth hook
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State for storing the authenticated user
  const [user, setUser] = useState(() => {
    // Hydrate user state from local storage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Update localStorage
    } else {
      localStorage.removeItem('user'); // Clear localStorage on logout
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch('https://seal-app-buzkz.ondigitalocean.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data); // Log the server response

      if (response.ok) {
        // Combine user data and token from the response
        const userWithToken = { ...data.user, token: data.token };
        setUser(userWithToken); // Set the user state
      } else {
        throw new Error(data.msg); // Handle server errors
      }
    } catch (error) {
      console.error('Login failed:', error); // Log any error
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await fetch('https://seal-app-buzkz.ondigitalocean.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log('Register Response:', data);

      if (response.ok) {
        // Combine user data and token from the response
        const userWithToken = { ...data.user, token: data.token };
        setUser(userWithToken); // Set the user state
      } else {
        throw new Error(data.msg); // Handle server errors
      }
    } catch (error) {
      console.error('Registration failed:', error); // Log any error
    }
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext for other components
export default AuthContext;
