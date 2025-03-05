import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/users/register', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post('/api/users/login', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
