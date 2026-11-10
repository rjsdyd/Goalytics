import { create } from 'zustand';
import api from '../api/axios';

interface AuthState {
  isAuthenticated: boolean;
  nickname: string | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('access_token'),
  nickname: localStorage.getItem('nickname'),

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    const { access_token, nickname } = response.data;
    
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('nickname', nickname);
    
    set({ isAuthenticated: true, nickname });
  },

  register: async (data) => {
    await api.post('/auth/register', data);
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('nickname');
    set({ isAuthenticated: false, nickname: null });
  },
}));