// src/pages/AuthPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email, password });
        alert('로그인 성공!');
        navigate('/');
      } else {
        await register({ email, password, nickname });
        alert('회원가입이 완료되었습니다. 로그인해주세요!');
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || '오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-[32px] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900">
          Goal<span className="text-[#41e307]">ytics</span> {isLogin ? '로그인' : '회원가입'}
        </h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#41e307] focus:border-[#41e307] focus:outline-none transition-colors"
              placeholder="example@goalytics.com"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 mt-1.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#41e307] focus:border-[#41e307] focus:outline-none transition-colors"
                placeholder="닉네임을 입력하세요"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#41e307] focus:border-[#41e307] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-4 text-white bg-[#141b26] rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 font-bold transition shadow-sm"
          >
            {isLogin ? '로그인' : '가입하기'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail('');
              setPassword('');
              setNickname('');
            }}
            className="text-sm font-semibold text-[#141b26] hover:text-[#41e307] transition-colors focus:outline-none"
          >
            {isLogin
              ? '계정이 없으신가요? 회원가입하기'
              : '이미 계정이 있으신가요? 로그인하기'}
          </button>
        </div>
      </div>
    </div>
  );
}