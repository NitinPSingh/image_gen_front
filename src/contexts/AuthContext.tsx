import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, refreshToken } from '../api/auth';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { jwtDecode } from "jwt-decode";


interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  
  const isTokenExpired = (token: string) => {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('aizen_user') || 'null');

    if (savedUser && !isTokenExpired(savedUser.access)) {
      setUser(savedUser);
    } else if (savedUser && isTokenExpired(savedUser.access)) {
      
      refreshTokenHandler(savedUser);
    }

    setLoading(false);
  }, []);


  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('aizen_user') || 'null');
  
    const checkToken = async () => {
        console.log("check")
      if (savedUser && isTokenExpired(savedUser.access)) {
        console.log("yes")
        await refreshTokenHandler(savedUser);
      }
    };
  
    checkToken(); 
    const interval = setInterval(checkToken,  5* 60 * 1000);
  
    return () => clearInterval(interval);
  }, [setUser, refreshToken])

  
  const refreshTokenHandler = async (savedUser: any) => {
    try {
      const rs = await refreshToken();
      const { access } = rs;
      const updatedUser = { ...savedUser, access };
      localStorage.setItem('aizen_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Token refresh failed', error);
      await logoutHandler(); 
    }
  };

  
  const loginHandler = async (username: string, password: string) => {
    const data = await login(username, password);
    setUser(data);
    localStorage.setItem('aizen_user', JSON.stringify(data)); 
    navigate('/');
  };

  
  const logoutHandler = async () => {
    await logout();
    localStorage.removeItem('aizen_user');
    setUser(null);
    navigate('/auth');
  };

  
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res: AxiosResponse) => res,
      async (err: AxiosError) => {
        const originalConfig = err.config;

        if (err.response?.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            await refreshTokenHandler(user);
            return axios(originalConfig);
          } catch (_error) {
            await logoutHandler();
            return Promise.reject(_error);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, login: loginHandler, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
