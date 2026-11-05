// src/pages/AdminPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Inquiry {
  id: number;
  user_id: number;
  title: string;
  content: string;
  status: string;
  created_at: string;
}

interface User {
  id: number;
  email: string;
  nickname: string;
  role: string;
  created_at: string;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'users'>('inquiries');
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      alert('접근 권한이 없습니다. 관리자 계정으로 로그인해 주세요.');
      navigate('/');
      return;
    }

    fetchInquiries(token);
    fetchUsers(token);
  }, [navigate]);

  const fetchInquiries = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:3000/inquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(response.data);
    } catch (error) {
      console.error('문의 내역을 불러오는데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('유저 목록을 불러오는데 실패했습니다.', error);
    }
  };

  const handleUpdateStatus = async (id: number) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      await axios.patch(`http://localhost:3000/inquiries/${id}/status`, 
        { status: 'COMPLETED' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setInquiries(inquiries.map(inq => 
        inq.id === id ? { ...inq, status: 'COMPLETED' } : inq
      ));
      alert('답변 완료 처리되었습니다.');
    } catch (error) {
      console.error('상태 업데이트에 실패했습니다.', error);
      alert('상태 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 💡 유저 권한(승급/강등) 변경 함수
  const handleUpdateRole = async (id: number, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const actionText = currentRole === 'admin' ? '일반 유저로 강등' : '관리자로 승급';
    
    const isConfirmed = window.confirm(`정말로 이 유저를 ${actionText} 처리하시겠습니까?`);
    if (!isConfirmed) return;

    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      await axios.patch(`http://localhost:3000/users/${id}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUsers(users.map(user => 
        user.id === id ? { ...user, role: newRole } : user
      ));
      alert(`성공적으로 ${actionText} 되었습니다.`);
    } catch (error) {
      console.error('권한 변경에 실패했습니다.', error);
      alert('권한 변경 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteUser = async (id: number, role: string) => {
    if (role === 'admin') {
      alert('관리자 계정은 삭제할 수 없습니다.');
      return;
    }
    
    const isConfirmed = window.confirm('정말로 이 유저를 강제 탈퇴 처리하시겠습니까?');
    if (!isConfirmed) return;

    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(users.filter(user => user.id !== id));
      alert('유저가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('유저 삭제에 실패했습니다.', error);
      alert('유저 삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center font-bold text-gray-400">권한 및 데이터 확인 중...</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full fade-in pb-10">
      <div className="bg-white w-full rounded-[32px] overflow-hidden shadow-sm flex flex-col p-10 border border-gray-100">
        
        <div className="border-b border-gray-100 pb-6 mb-6">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">관리자 대시보드</h2>
          <p className="text-gray-500 font-bold mt-2">Goalytics 플랫폼의 데이터와 유저 문의를 관리합니다.</p>
        </div>

        <div className="flex gap-6 border-b border-gray-100 mb-8 pb-4">
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`text-xl font-black transition-colors ${
              activeTab === 'inquiries' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            📥 유저 문의함
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`text-xl font-black transition-colors ${
              activeTab === 'users' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            👥 회원 관리
          </button>
        </div>

        {activeTab === 'inquiries' && (
          <div>
            {inquiries.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                <span className="text-gray-400 font-bold">아직 접수된 문의가 없습니다.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                            inquiry.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {inquiry.status === 'COMPLETED' ? '답변완료' : '대기중'}
                          </span>
                          <span className="text-sm font-bold text-gray-400">유저 ID: {inquiry.user_id}</span>
                          <span className="text-sm font-bold text-gray-400">
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900">{inquiry.title}</h4>
                      </div>
                      {inquiry.status === 'WAITING' && (
                        <button 
                          onClick={() => handleUpdateStatus(inquiry.id)}
                          className="bg-[#141b26] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition"
                        >
                          답변 완료 처리
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 bg-white p-4 rounded-xl border border-gray-100 whitespace-pre-wrap">
                      {inquiry.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            {users.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                <span className="text-gray-400 font-bold">가입된 유저가 없습니다.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role === 'admin' ? '관리자' : '일반 유저'}
                        </span>
                        <span className="text-sm font-bold text-gray-400">ID: {user.id}</span>
                        <span className="text-sm font-bold text-gray-400">
                          가입일: {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-end gap-3 mt-1">
                        <span className="text-lg font-black text-gray-900">{user.nickname}</span>
                        <span className="text-sm font-bold text-gray-500 mb-[2px]">{user.email}</span>
                      </div>
                    </div>
                    
                    {/* 💡 승급/강등 및 삭제 버튼 영역 */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdateRole(user.id, user.role)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition border ${
                          user.role === 'admin' 
                            ? 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-500 hover:text-white' 
                            : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-500 hover:text-white'
                        }`}
                      >
                        {user.role === 'admin' ? '일반 유저 강등' : '관리자 승급'}
                      </button>

                      {user.role !== 'admin' && (
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.role)}
                          className="bg-red-50 text-red-500 border border-red-100 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition"
                        >
                          강제 탈퇴
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}