'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/user';
import {
  setToken, setUser, clearAuth, getToken,
  setOnboardingStatus, setTokenCookie, clearTokenCookie
} from '@/utils/storage';
import apiClient from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.get('/auth/me');
        setUserState(response.data.data);
      } catch {
        clearAuth();
        clearTokenCookie();
        setUserState(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function login(data: LoginRequest) {
    const response = await apiClient.post('/auth/login', data);
    const { token, user } = response.data.data;
    setToken(token);
    setTokenCookie(token);
    setUser(user);
    setOnboardingStatus(user.isOnboarded);
    setUserState(user);
  }

  async function register(data: RegisterRequest) {
    const response = await apiClient.post('/auth/register', data);
    const { token, user } = response.data.data;
    setToken(token);
    setTokenCookie(token);
    setUser(user);
    setOnboardingStatus(user.isOnboarded);
    setUserState(user);
  }

  function logout() {
    clearAuth();
    clearTokenCookie();
    setUserState(null);
    window.location.href = '/login';
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#318741] border-t-transparent" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}