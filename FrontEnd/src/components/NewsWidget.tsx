import { useState, useEffect } from 'react';

// 백엔드에서 받아올 데이터의 타입(인터페이스) 정의
interface NewsItem {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  summary: string;
  source: string;
  time: string;
  imageUrl: string;
  url: string; // 💡 원문 링크 추가
}

export default function NewsWidget() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3000/football/news');
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('뉴스 데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="lg:col-span-8 w-full bg-white rounded-[32px] p-6 shadow-sm flex flex-col h-full min-h-[300px]">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Latest News & Transfers</h2>
          <p className="text-sm font-semibold text-gray-400 mt-1">글로벌 축구계 실시간 소식</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#41e307]"></div>
        </div>
      ) : newsData.length === 0 ? (
        <div className="flex-1 flex justify-center items-center text-gray-400 font-bold">
          현재 뉴스 데이터를 불러올 수 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 flex-1">
          {newsData.map((news) => (
            // 💡 div를 a 태그로 변경하여 클릭 시 새 탭에서 실제 기사 원문으로 이동하게 만듭니다.
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              key={news.id}
              onMouseEnter={() => setHoveredId(news.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="w-full h-32 rounded-2xl overflow-hidden mb-3 relative bg-gray-100">
                <img
                  src={news.imageUrl}
                  alt="news thumbnail"
                  className={`w-full h-full object-cover transition duration-500 ${
                    hoveredId === news.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm ${news.tagColor}`}>
                    {news.tag}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className={`text-sm font-bold leading-snug mb-2 line-clamp-2 transition ${
                  hoveredId === news.id ? 'text-[#41e307]' : 'text-gray-900'
                }`}>
                  {news.title}
                </h3>
                <p className="text-xs font-medium text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                  {news.summary}
                </p>
                
                <div className="mt-auto flex items-center justify-between text-[11px] font-bold text-gray-400">
                  <span className="truncate max-w-[60%]">{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

    </div>
  );
}