'use client';

import { createContext, useContext, useState } from 'react';
import { User, LoginRequest, RegisterRequest } from '@/types/user';
import { setToken, setUser, clearAuth, getUser, getToken, setOnboardingStatus } from '@/utils/storage';
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
  const [user, setUserState] = useState<User | null>(() => {
    const token = getToken();
    const savedUser = getUser();
    return token && savedUser ? savedUser : null;
  });
  const [isLoading] = useState(false);

  async function login(data: LoginRequest) {
    const response = await apiClient.post('/auth/login', data);
    const { token, user } = response.data.data;
    setToken(token);
    setUser(user);
    setOnboardingStatus(user.isOnboarded);
    setUserState(user);
  }

  async function register(data: RegisterRequest) {
    const response = await apiClient.post('/auth/register', data);
    const { token, user } = response.data.data;
    setToken(token);
    setUser(user);
    setOnboardingStatus(user.isOnboarded);
    setUserState(user);
  }

  function logout() {
    clearAuth();
    setUserState(null);
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
