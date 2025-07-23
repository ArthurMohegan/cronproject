import { Link, useLocation } from "react-router-dom";
import { Clock, Code } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
                <Code className="h-8 w-8" />
                <span>开发工具箱</span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-blue-700 text-white"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
              >
                首页
              </Link>
              <Link
                to="/cron"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActive("/cron")
                    ? "bg-blue-700 text-white"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>Cron生成器</span>
              </Link>
              <Link
                to="/regex"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActive("/regex")
                    ? "bg-blue-700 text-white"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
              >
                <Code className="h-4 w-4" />
                <span>正则生成器</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}