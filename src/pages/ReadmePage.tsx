import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { FileText, ExternalLink } from "lucide-react";

export default function ReadmePage() {
  const { language, t } = useLanguage();
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 根据语言选择不同的README文件
        const filename = language === 'zh' ? 'README.md' : 'README_EN.md';
        const response = await fetch(`/${filename}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        
        const content = await response.text();
        setReadmeContent(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load README');
        console.error('Error fetching README:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [language]);

  // 简单的Markdown渲染函数
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // 标题
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mb-4 text-gray-900">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold mb-3 mt-6 text-gray-800">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mb-2 mt-4 text-gray-700">{line.substring(4)}</h3>;
        }
        
        // 代码块
        if (line.startsWith('```')) {
          return <div key={index} className="bg-gray-100 p-4 rounded-lg my-2 font-mono text-sm overflow-x-auto"></div>;
        }
        
        // 列表项
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
        }
        
        // 链接处理
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        if (linkRegex.test(line)) {
          const processedLine = line.replace(linkRegex, (match, text, url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1">${text} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`;
          });
          return <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: processedLine }}></p>;
        }
        
        // 普通段落
        if (line.trim()) {
          return <p key={index} className="mb-2">{line}</p>;
        }
        
        // 空行
        return <br key={index} />;
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">{t('readme.title')}</h1>
          </div>
          
          <p className="text-gray-600 mb-8">{t('readme.desc')}</p>
          
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}
          
          {!loading && !error && readmeContent && (
            <div className="prose prose-lg max-w-none">
              <div className="markdown-content">
                {renderMarkdown(readmeContent)}
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {language === 'zh' ? '查看项目源码' : 'View source code'}
              </p>
              <a
                href="https://github.com/ArthurMohegan/cronproject"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}