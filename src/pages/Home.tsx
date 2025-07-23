import { Link } from "react-router-dom";
import { Clock, Code, ArrowRight, Zap, Users, Shield, FileText } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.title')} 🛠️
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cron"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Clock className="h-5 w-5" />
                <span>{t('home.cron.title')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/regex"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Code className="h-5 w-5" />
                <span>{t('home.regex.title')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.title')}</h2>
          <p className="text-lg text-gray-600">{t('home.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Cron Generator Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 ml-4">{t('home.cron.title')}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              {t('home.cron.desc')}
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                可视化时间设置界面
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                常用cron表达式模板
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                实时预览和验证
              </li>
            </ul>
            <Link
              to="/cron"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              开始使用 <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {/* Regex Generator Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 ml-4">{t('home.regex.title')}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              {t('home.regex.desc')}
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                常用正则模式库
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                实时测试和验证
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                匹配结果高亮显示
              </li>
            </ul>
            <Link
              to="/regex"
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 transition-colors"
            >
              开始使用 <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">为什么选择我们？</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">高效便捷</h4>
              <p className="text-gray-600">可视化操作界面，无需记忆复杂语法，快速生成准确表达式</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">用户友好</h4>
              <p className="text-gray-600">简洁直观的界面设计，适合各个技术水平的开发者使用</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">可靠准确</h4>
              <p className="text-gray-600">实时验证和预览功能，确保生成的表达式准确无误</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}