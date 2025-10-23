'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthResponse, User } from '@/types/auth';
import Loading from '@/components/Loading';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
          setToken(storedToken);
        }

        if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && typeof parsedUser === 'object') {
              setUser(parsedUser);
            }
          } catch (parseError) {
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (data: AuthResponse) => {

    setToken(data.access_token);
    setUser(data.user);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch (error) {

      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (error) {
      }
    }
  };

  const isAuthenticated = useMemo(() => !!token, [token]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};