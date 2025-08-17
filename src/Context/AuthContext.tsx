// /* eslint-disable react-refresh/only-export-components */
 
// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Check if there's a token in local storage
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
    
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setCurrentUser(JSON.parse(storedUser));
//       // Set authorization header for all future requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//     }
    
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       setError('');
//       setLoading(true);
      
//       const response = await axios.post('http://localhost/times_hq_v2/api/login', {
//         email,
//         password
//       });
      
//       if (response.data.status && response.data.token) {
//         const { token, user } = response.data;
//         localStorage.setItem('token', token);
//         localStorage.setItem('role', user.role);
//         localStorage.setItem('user', JSON.stringify(user));
//         setToken(token);
//         setCurrentUser(user);
        
//         // Set authorization header for all future requests
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
//         return { success: true, user };
//       } else {
//         throw new Error(response.data.message || 'Login failed');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || error.message || 'Login failed');
//       return { success: false, error: error.response?.data?.message || error.message || 'Login failed' };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setCurrentUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//   };



//   const value = {
//     currentUser,
//     token,
//     loading,
//     error,
//     login,
//     logout, 
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }; 