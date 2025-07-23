import { useState, useEffect } from "react";
import { Copy, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface CronConfig {
  minute: string;
  hour: string;
  day: string;
  month: string;
  weekday: string;
}

const cronTemplates = [
  { name: "每分钟", cron: "* * * * *", description: "每分钟执行一次" },
  { name: "每小时", cron: "0 * * * *", description: "每小时的第0分钟执行" },
  { name: "每天午夜", cron: "0 0 * * *", description: "每天凌晨0点执行" },
  { name: "每天上午9点", cron: "0 9 * * *", description: "每天上午9点执行" },
  { name: "每周一上午9点", cron: "0 9 * * 1", description: "每周一上午9点执行" },
  { name: "每月1号凌晨", cron: "0 0 1 * *", description: "每月1号凌晨0点执行" },
  { name: "工作日上午9点", cron: "0 9 * * 1-5", description: "周一到周五上午9点执行" },
  { name: "每15分钟", cron: "*/15 * * * *", description: "每15分钟执行一次" },
];

const minuteOptions = [
  { value: "*", label: "每分钟" },
  { value: "0", label: "第0分钟" },
  { value: "*/5", label: "每5分钟" },
  { value: "*/10", label: "每10分钟" },
  { value: "*/15", label: "每15分钟" },
  { value: "*/30", label: "每30分钟" },
];

const hourOptions = [
  { value: "*", label: "每小时" },
  { value: "0", label: "凌晨0点" },
  { value: "9", label: "上午9点" },
  { value: "12", label: "中午12点" },
  { value: "18", label: "下午6点" },
  { value: "*/2", label: "每2小时" },
  { value: "*/6", label: "每6小时" },
];

const dayOptions = [
  { value: "*", label: "每天" },
  { value: "1", label: "每月1号" },
  { value: "15", label: "每月15号" },
  { value: "*/7", label: "每7天" },
];

const monthOptions = [
  { value: "*", label: "每月" },
  { value: "1", label: "1月" },
  { value: "6", label: "6月" },
  { value: "12", label: "12月" },
];

const weekdayOptions = [
  { value: "*", label: "每天" },
  { value: "0", label: "周日" },
  { value: "1", label: "周一" },
  { value: "2", label: "周二" },
  { value: "3", label: "周三" },
  { value: "4", label: "周四" },
  { value: "5", label: "周五" },
  { value: "6", label: "周六" },
  { value: "1-5", label: "工作日" },
  { value: "0,6", label: "周末" },
];

export default function CronGenerator() {
  const [cronConfig, setCronConfig] = useState<CronConfig>({
    minute: "*",
    hour: "*",
    day: "*",
    month: "*",
    weekday: "*",
  });

  const [cronExpression, setCronExpression] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const expression = `${cronConfig.minute} ${cronConfig.hour} ${cronConfig.day} ${cronConfig.month} ${cronConfig.weekday}`;
    setCronExpression(expression);
    setDescription(generateDescription(cronConfig));
  }, [cronConfig]);

  const generateDescription = (config: CronConfig): string => {
    const parts = [];
    
    if (config.minute === "*") {
      parts.push("每分钟");
    } else if (config.minute.startsWith("*/")) {
      parts.push(`每${config.minute.slice(2)}分钟`);
    } else {
      parts.push(`第${config.minute}分钟`);
    }
    
    if (config.hour !== "*") {
      if (config.hour.startsWith("*/")) {
        parts.push(`每${config.hour.slice(2)}小时`);
      } else {
        parts.push(`${config.hour}点`);
      }
    }
    
    if (config.day !== "*") {
      if (config.day.startsWith("*/")) {
        parts.push(`每${config.day.slice(2)}天`);
      } else {
        parts.push(`每月${config.day}号`);
      }
    }
    
    if (config.month !== "*") {
      parts.push(`${config.month}月`);
    }
    
    if (config.weekday !== "*") {
      const weekdayMap: { [key: string]: string } = {
        "0": "周日",
        "1": "周一",
        "2": "周二",
        "3": "周三",
        "4": "周四",
        "5": "周五",
        "6": "周六",
        "1-5": "工作日",
        "0,6": "周末",
      };
      parts.push(weekdayMap[config.weekday] || config.weekday);
    }
    
    return parts.join(" ") + " 执行";
  };

  const handleConfigChange = (field: keyof CronConfig, value: string) => {
    setCronConfig(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cronExpression);
      toast.success("Cron表达式已复制到剪贴板");
    } catch (err) {
      toast.error("复制失败，请手动复制");
    }
  };

  const loadTemplate = (template: typeof cronTemplates[0]) => {
    const parts = template.cron.split(" ");
    setCronConfig({
      minute: parts[0],
      hour: parts[1],
      day: parts[2],
      month: parts[3],
      weekday: parts[4],
    });
    toast.success(`已加载模板：${template.name}`);
  };

  const resetConfig = () => {
    setCronConfig({
      minute: "*",
      hour: "*",
      day: "*",
      month: "*",
      weekday: "*",
    });
    toast.success("已重置配置");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Cron表达式生成器</h1>
          </div>
          <p className="text-lg text-gray-600">
            通过可视化界面轻松生成cron表达式，支持实时预览和常用模板
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：配置区域 */}
          <div className="space-y-6">
            {/* 可视化构建器 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">可视化构建器</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    分钟 (0-59)
                  </label>
                  <select
                    value={cronConfig.minute}
                    onChange={(e) => handleConfigChange("minute", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {minuteOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    小时 (0-23)
                  </label>
                  <select
                    value={cronConfig.hour}
                    onChange={(e) => handleConfigChange("hour", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {hourOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    日期 (1-31)
                  </label>
                  <select
                    value={cronConfig.day}
                    onChange={(e) => handleConfigChange("day", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {dayOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    月份 (1-12)
                  </label>
                  <select
                    value={cronConfig.month}
                    onChange={(e) => handleConfigChange("month", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    星期 (0-6, 0=周日)
                  </label>
                  <select
                    value={cronConfig.weekday}
                    onChange={(e) => handleConfigChange("weekday", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {weekdayOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetConfig}
                  className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  重置
                </button>
              </div>
            </div>

            {/* 常用模板 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">常用模板</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cronTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => loadTemplate(template)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500 font-mono">{template.cron}</div>
                    <div className="text-xs text-gray-400 mt-1">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：预览区域 */}
          <div className="space-y-6">
            {/* 表达式预览 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">表达式预览</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cron表达式
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cronExpression}
                      readOnly
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md font-mono text-lg"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      title="复制到剪贴板"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    执行说明
                  </label>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800">{description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 格式说明 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cron格式说明</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-mono text-sm mb-2">分钟 小时 日期 月份 星期</div>
                  <div className="text-xs text-gray-600">*    *   *   *    *</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>分钟：</strong> 0-59</div>
                  <div><strong>小时：</strong> 0-23</div>
                  <div><strong>日期：</strong> 1-31</div>
                  <div><strong>月份：</strong> 1-12</div>
                  <div><strong>星期：</strong> 0-6 (0=周日)</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>特殊字符：</strong></div>
                  <div><code className="bg-gray-100 px-1 rounded">*</code> - 任意值</div>
                  <div><code className="bg-gray-100 px-1 rounded">,</code> - 列举多个值</div>
                  <div><code className="bg-gray-100 px-1 rounded">-</code> - 范围</div>
                  <div><code className="bg-gray-100 px-1 rounded">/</code> - 间隔</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}