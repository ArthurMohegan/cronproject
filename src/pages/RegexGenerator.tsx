import { useState, useEffect } from "react";
import { Copy, Code, TestTube, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface RegexTemplate {
  name: string;
  pattern: string;
  description: string;
  example: string;
}

const regexTemplates: RegexTemplate[] = [
  {
    name: "邮箱地址",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    description: "匹配标准邮箱地址格式",
    example: "user@example.com"
  },
  {
    name: "手机号码",
    pattern: "^(\\+?86)?1[3-9]\\d{9}$",
    description: "匹配中国大陆手机号码，支持+86或86前缀",
    example: "+8613812345678"
  },
  {
    name: "身份证号",
    pattern: "^[1-9]\\d{5}(18|19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]$",
    description: "匹配18位身份证号码",
    example: "110101199001011234"
  },
  {
    name: "IP地址",
    pattern: "^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$",
    description: "匹配IPv4地址",
    example: "192.168.1.1"
  },
  {
    name: "URL链接",
    pattern: "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$",
    description: "匹配HTTP/HTTPS URL",
    example: "https://www.example.com"
  },
  {
    name: "中文字符",
    pattern: "^[\\u4e00-\\u9fa5]+$",
    description: "匹配纯中文字符",
    example: "中文测试"
  },
  {
    name: "数字",
    pattern: "^\\d+$",
    description: "匹配纯数字",
    example: "12345"
  },
  {
    name: "字母数字",
    pattern: "^[a-zA-Z0-9]+$",
    description: "匹配字母和数字组合",
    example: "abc123"
  },
  {
    name: "密码强度",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    description: "至少8位，包含大小写字母、数字和特殊字符",
    example: "Password123!"
  },
  {
    name: "日期格式",
    pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
    description: "匹配YYYY-MM-DD格式日期",
    example: "2024-01-15"
  }
];

interface TestResult {
  text: string;
  isMatch: boolean;
  matches?: RegExpMatchArray | null;
}

export default function RegexGenerator() {
  const [selectedPattern, setSelectedPattern] = useState("");
  const [customPattern, setCustomPattern] = useState("");
  const [testText, setTestText] = useState("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isValidRegex, setIsValidRegex] = useState(true);
  const [currentRegex, setCurrentRegex] = useState<RegExp | null>(null);

  const activePattern = customPattern || selectedPattern;

  useEffect(() => {
    if (activePattern) {
      try {
        const regex = new RegExp(activePattern.replace(/\\\\/g, "/"), "g");
        setCurrentRegex(regex);
        setIsValidRegex(true);
        
        if (testText) {
          performTest(testText, regex);
        }
      } catch (error) {
        setIsValidRegex(false);
        setCurrentRegex(null);
        setTestResults([]);
      }
    } else {
      setCurrentRegex(null);
      setTestResults([]);
      setIsValidRegex(true);
    }
  }, [activePattern, testText]);

  const performTest = (text: string, regex: RegExp) => {
    if (!text || !regex) {
      setTestResults([]);
      return;
    }

    const lines = text.split('\n').filter(line => line.trim());
    const results: TestResult[] = lines.map(line => {
      const trimmedLine = line.trim();
      const matches = trimmedLine.match(new RegExp(regex.source, regex.flags));
      return {
        text: trimmedLine,
        isMatch: matches !== null,
        matches
      };
    });
    
    setTestResults(results);
  };

  const loadTemplate = (template: RegexTemplate) => {
    setSelectedPattern(template.pattern);
    setCustomPattern("");
    setTestText(template.example);
    toast.success(`已加载模板：${template.name}`);
  };

  const copyToClipboard = async () => {
    if (!activePattern) {
      toast.error("没有可复制的正则表达式");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(activePattern.replace(/\\\\/g, "/"));
      toast.success("正则表达式已复制到剪贴板");
    } catch (err) {
      toast.error("复制失败，请手动复制");
    }
  };

  const clearAll = () => {
    setSelectedPattern("");
    setCustomPattern("");
    setTestText("");
    setTestResults([]);
    toast.success("已清空所有内容");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Code className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">正则表达式生成器</h1>
          </div>
          <p className="text-lg text-gray-600">
            提供常用正则表达式模板，支持自定义构建和实时测试验证
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧：模板选择 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">常用模板</h2>
              
              <div className="space-y-3">
                {regexTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => loadTemplate(template)}
                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                      selectedPattern === template.pattern
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                    <div className="text-xs text-green-600 mt-1 font-mono">
                      示例: {template.example}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 中间：自定义构建 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">自定义构建</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    正则表达式
                  </label>
                  <div className="relative">
                    <textarea
                      value={customPattern}
                      onChange={(e) => {
                        setCustomPattern(e.target.value);
                        setSelectedPattern("");
                      }}
                      placeholder="输入自定义正则表达式..."
                      className={`w-full px-3 py-2 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 ${
                        !isValidRegex
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-green-500"
                      }`}
                      rows={4}
                    />
                    {activePattern && (
                      <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-green-600 transition-colors"
                        title="复制到剪贴板"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {!isValidRegex && (
                    <p className="text-red-500 text-xs mt-1">正则表达式格式错误</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    当前使用的表达式
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <code className="text-sm font-mono text-gray-800">
                      {activePattern || "未选择"}
                    </code>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    清空
                  </button>
                </div>
              </div>
            </div>

            {/* 正则语法说明 */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">常用语法</h3>
              <div className="space-y-2 text-sm">
                <div><code className="bg-gray-100 px-1 rounded">.</code> - 匹配任意字符</div>
                <div><code className="bg-gray-100 px-1 rounded">*</code> - 匹配0次或多次</div>
                <div><code className="bg-gray-100 px-1 rounded">+</code> - 匹配1次或多次</div>
                <div><code className="bg-gray-100 px-1 rounded">?</code> - 匹配0次或1次</div>
                <div><code className="bg-gray-100 px-1 rounded">\d</code> - 匹配数字</div>
                <div><code className="bg-gray-100 px-1 rounded">\w</code> - 匹配字母数字下划线</div>
                <div><code className="bg-gray-100 px-1 rounded">\s</code> - 匹配空白字符</div>
                <div><code className="bg-gray-100 px-1 rounded">[abc]</code> - 匹配a、b或c</div>
                <div><code className="bg-gray-100 px-1 rounded">[a-z]</code> - 匹配小写字母</div>
                <div><code className="bg-gray-100 px-1 rounded">^</code> - 行首</div>
                <div><code className="bg-gray-100 px-1 rounded">$</code> - 行尾</div>
              </div>
            </div>
          </div>

          {/* 右侧：测试验证 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <TestTube className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">测试验证</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    测试文本 (每行一个)
                  </label>
                  <textarea
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="输入要测试的文本，每行一个...\n例如：\nuser@example.com\ninvalid-email\ntest@domain.org"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={6}
                  />
                </div>

                {testResults.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      测试结果
                    </label>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            result.isMatch
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm text-gray-800">
                              {result.text}
                            </span>
                            {result.isMatch ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          {result.matches && result.matches.length > 0 && (
                            <div className="mt-2 text-xs text-green-700">
                              匹配: {result.matches.join(", ")}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-800">
                        总计: {testResults.length} 个测试，
                        <span className="text-green-600 font-medium">
                          {testResults.filter(r => r.isMatch).length} 个匹配
                        </span>，
                        <span className="text-red-600 font-medium">
                          {testResults.filter(r => !r.isMatch).length} 个不匹配
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activePattern && !currentRegex && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">正则表达式无效，请检查语法</p>
                  </div>
                )}

                {!activePattern && (
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-600 text-sm">请选择模板或输入自定义正则表达式</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}