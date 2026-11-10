import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (isLoginMode) {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email,
          password,
        });

        localStorage.clear();
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('nickname', response.data.nickname);
        localStorage.setItem('role', response.data.role);

        alert('로그인 성공!');
        window.location.replace('/');
      } else {
        await axios.post('http://localhost:3000/auth/register', {
          email,
          password,
          nickname,
        });

        alert('회원가입이 완료되었습니다. 로그인해 주세요.');
        setIsLoginMode(true);
        setPassword('');
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || '요청 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 w-full max-w-md flex flex-col items-center">
        
        <Link 
          to="/" 
          className="text-3xl font-black mb-2 tracking-tight text-[#141b26] cursor-pointer hover:opacity-80 transition"
        >
          Goal<span className="text-[#41e307]">y</span>tics
        </Link>

        <p className="text-sm text-gray-400 font-bold mb-8">
          {isLoginMode ? '계정에 로그인하여 즐겨찾기를 관리하세요.' : '새로운 계정을 만들어 시작하세요.'}
        </p>

        {errorMessage && (
          <div className="w-full bg-red-50 text-red-500 text-sm font-bold p-3 rounded-xl mb-6 text-center border border-red-100">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {!isLoginMode && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">닉네임</label>
              <input 
                type="text" 
                placeholder="사용하실 닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#41e307] transition font-medium"
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">이메일</label>
            <input 
              type="email" 
              placeholder="example@goalytics.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#41e307] transition font-medium"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-2">
            <label className="text-sm font-bold text-gray-700">비밀번호</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#41e307] transition font-medium"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#141b26] text-white font-bold text-lg py-4 rounded-xl hover:bg-black transition mt-2 shadow-sm"
          >
            {isLoginMode ? '로그인' : '회원가입 완료'}
          </button>
        </form>

        <div 
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setErrorMessage('');
          }}
          className="mt-6 text-sm font-bold text-gray-400 cursor-pointer hover:text-gray-900 transition"
        >
          {isLoginMode ? '계정이 없으신가요? 회원가입하기' : '이미 계정이 있으신가요? 로그인하기'}
        </div>
      </div>
    </div>
  );
}