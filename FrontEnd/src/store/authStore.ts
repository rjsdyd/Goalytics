// src/store/authStore.ts

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
  // 초기 상태는 로컬 스토리지에 토큰이 있는지 여부로 결정
  isAuthenticated: !!localStorage.getItem('access_token'),
  nickname: localStorage.getItem('nickname'),

  login: async (data) => {
    // 백엔드 로그인 API 호출
    const response = await api.post('/auth/login', data);
    const { access_token, nickname } = response.data;
    
    // 로컬 스토리지에 토큰과 닉네임 저장
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('nickname', nickname);
    
    // Zustand 전역 상태 업데이트
    set({ isAuthenticated: true, nickname });
  },

  register: async (data) => {
    // 백엔드 회원가입 API 호출
    await api.post('/auth/register', data);
  },

  logout: () => {
    // 로그아웃 시 스토리지 데이터 삭제 및 상태 초기화
    localStorage.removeItem('access_token');
    localStorage.removeItem('nickname');
    set({ isAuthenticated: false, nickname: null });
  },
}));