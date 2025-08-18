// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthContextType {
  currentUser: any;
  token: string | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<{success: boolean, user?: any, error?: string}>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [lastValidation, setLastValidation] = useState<number>(0);

  const validateToken = async (force = false): Promise<boolean> => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return false;

    // Only validate if forced or if more than 5 minutes have passed
    const now = Date.now();
    if (!force && now - lastValidation < 300000) { // 5 minutes
      return !!token;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/validate-token`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      
      if (response.data.valid) {
        setToken(storedToken);
        setCurrentUser(response.data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setLastValidation(now);
        return true;
      }
      return false;
    } catch (err) {
      logout();
      return false;
    }
  };
 

  useEffect(() => {
    const initializeAuth = async () => {
      await validateToken();
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError('');
      setLoading(true);
      
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password
      });
      
      if (response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setCurrentUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        navigate('/admin');
        return { success: true, user };
      } else {
        throw new Error('Login failed - no token received');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin/login');
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    login,
    logout,
    validateToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 