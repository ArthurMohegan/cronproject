# 工具类网站 - Cron & Regex Generator

一个简洁实用的在线工具网站，为开发者和技术人员提供 Cron 表达式生成和正则表达式生成两个核心功能。

## 🌟 功能特性

### 🏠 首页
- 现代化的 Hero 区域设计
- 清晰的功能介绍和导航
- 响应式卡片布局
- 快速入口导航

### ⏰ Cron 表达式生成器
- **可视化配置界面**：通过下拉菜单设置分钟、小时、日期、月份、星期
- **8个常用模板**：每分钟、每小时、每天、每周、每月等
- **实时预览**：生成的 cron 表达式和执行时间说明
- **一键复制**：便于直接使用
- **格式说明**：详细的 cron 表达式语法文档

### 🔍 正则表达式生成器
- **10个常用模板**：邮箱、手机号、身份证、IP地址、URL等
- **手机号增强**：支持 +86 或 86 前缀的中国手机号格式
- **自定义构建**：支持手动输入和编辑正则表达式
- **实时测试验证**：输入测试文本，实时验证匹配结果
- **匹配结果高亮**：清晰显示匹配的内容
- **语法说明**：正则表达式语法参考

## 🚀 在线体验

- **生产环境**：[https://cronproject.vercel.app/](https://cronproject.vercel.app/)
- **本地开发**：http://localhost:5174/

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **样式框架**：Tailwind CSS 3
- **路由管理**：React Router DOM 7
- **状态管理**：Zustand 5
- **图标库**：Lucide React
- **通知组件**：Sonner
- **部署平台**：Vercel

## 🐳 Docker 部署

### 使用 Docker Hub 镜像（推荐）

直接使用已发布的 Docker 镜像，无需本地构建：

```bash
# 一键运行
docker run -d -p 3000:80 --name cronproject cybchyb/cronproject:latest
```

访问 http://localhost:3000 即可使用应用。

- **Docker Hub**: https://hub.docker.com/r/cybchyb/cronproject
- **镜像地址**: `cybchyb/cronproject:latest`

### 本地构建部署

支持使用 Docker 和 Docker Compose 进行容器化部署：

```bash
# 生产环境部署
docker-compose up -d

# 开发环境部署（支持热重载）
docker-compose --profile dev up -d cronproject-dev
```

详细的 Docker 部署指南请参考：[DOCKER.md](DOCKER.md)

## ☁️ Vercel 部署

### 一键部署

点击下面的按钮，一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FArthurMohegan%2Fcronproject&project-name=cronproject&repository-name=cronproject)

### 手动部署

1. **Fork 本仓库**到你的 GitHub 账户

2. **登录 Vercel**：访问 [vercel.com](https://vercel.com) 并使用 GitHub 账户登录

3. **导入项目**：
   - 点击 "New Project"
   - 选择你 Fork 的 cronproject 仓库
   - 点击 "Import"

4. **配置项目**：
   - **Project Name**: cronproject（或自定义名称）
   - **Framework Preset**: Vite
   - **Root Directory**: ./（保持默认）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **部署**：点击 "Deploy" 按钮，等待部署完成

6. **访问应用**：部署完成后，Vercel 会提供一个访问链接

### 环境变量

本项目为纯前端应用，无需配置环境变量。

### 自动部署

连接 GitHub 仓库后，每次推送到 `main` 分支都会自动触发重新部署。

## 📦 本地开发

### 环境要求

- Node.js >= 18.0.0
- npm 或 pnpm

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/cronproject.git
cd cronproject

# 安装依赖
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

访问 [http://localhost:5174](http://localhost:5174) 查看应用。

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 预览生产版本

```bash
npm run preview
# 或
pnpm preview
```

## 📁 项目结构

```
cronproject/
├── public/                 # 静态资源
│   └── favicon.svg
├── src/
│   ├── components/         # 可复用组件
│   │   ├── Empty.tsx
│   │   └── Layout.tsx
│   ├── hooks/             # 自定义 Hooks
│   │   └── useTheme.ts
│   ├── lib/               # 工具函数
│   │   └── utils.ts
│   ├── pages/             # 页面组件
│   │   ├── Home.tsx       # 首页
│   │   ├── CronGenerator.tsx    # Cron表达式生成器
│   │   └── RegexGenerator.tsx   # 正则表达式生成器
│   ├── App.tsx            # 应用主组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── .gitignore
├── package.json
├── tailwind.config.js     # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 🎯 使用场景

### Cron 表达式生成器适用于：
- Linux/Unix 系统定时任务配置
- 应用程序定时任务调度
- 云服务定时触发器设置
- 数据库备份计划制定

### 正则表达式生成器适用于：
- 表单验证规则编写
- 数据清洗和格式化
- 文本搜索和替换
- API 参数验证

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 图标库
- [Vercel](https://vercel.com/) - 部署平台

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/cronproject/issues)
- 发送邮件至：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！