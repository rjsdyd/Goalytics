// src/api/axios.ts

import axios from 'axios';

// 백엔드 서버 주소 설정 (NestJS 기본 포트 3000)
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청(Request) 인터셉터: API를 호출하기 직전에 가로채서 실행됨
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  // 토큰이 존재하면 Authorization 헤더에 Bearer 토큰 추가
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;