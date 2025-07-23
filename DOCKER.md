# Docker 部署指南

本项目支持使用 Docker 和 Docker Compose 进行容器化部署，提供了生产环境和开发环境两种配置。

## 🐳 快速开始

### 生产环境部署

```bash
# 使用 Docker Compose 启动生产环境
docker-compose up -d

# 或者直接使用 Docker 构建和运行
docker build -t cronproject .
docker run -d -p 3000:80 --name cronproject-app cronproject
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 开发环境部署

```bash
# 启动开发环境（支持热重载）
docker-compose --profile dev up -d cronproject-dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看开发环境。

## 📁 Docker 文件说明

### 文件结构

```
cronproject/
├── Dockerfile              # 生产环境 Docker 配置
├── Dockerfile.dev          # 开发环境 Docker 配置
├── docker-compose.yml      # Docker Compose 编排文件
├── nginx.conf              # Nginx 配置文件
├── .dockerignore           # Docker 忽略文件
└── DOCKER.md               # 本文档
```

### Dockerfile（生产环境）

- **多阶段构建**：分为构建阶段和生产阶段
- **构建阶段**：使用 Node.js 18 Alpine 镜像构建应用
- **生产阶段**：使用 Nginx Alpine 镜像服务静态文件
- **优化**：只包含生产依赖，镜像体积小

### Dockerfile.dev（开发环境）

- **热重载**：支持代码修改后自动重新加载
- **调试友好**：包含所有开发依赖
- **信号处理**：使用 dumb-init 正确处理容器信号

### nginx.conf

- **SPA 支持**：正确处理 React Router 路由
- **静态资源优化**：启用 gzip 压缩和缓存
- **安全头**：添加基本的安全响应头

## 🚀 常用命令

### 构建镜像

```bash
# 构建生产镜像
docker build -t cronproject:latest .

# 构建开发镜像
docker build -f Dockerfile.dev -t cronproject:dev .
```

### 运行容器

```bash
# 运行生产容器
docker run -d -p 3000:80 --name cronproject-app cronproject:latest

# 运行开发容器（挂载代码目录）
docker run -d -p 5173:5173 -v $(pwd):/app -v /app/node_modules --name cronproject-dev cronproject:dev
```

### Docker Compose 命令

```bash
# 启动所有服务
docker-compose up -d

# 启动开发环境
docker-compose --profile dev up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重新构建并启动
docker-compose up -d --build
```

### 管理命令

```bash
# 查看运行中的容器
docker ps

# 查看容器日志
docker logs cronproject-app

# 进入容器
docker exec -it cronproject-app sh

# 清理未使用的镜像
docker image prune

# 清理所有未使用的资源
docker system prune
```

## 🔧 配置说明

### 端口映射

- **生产环境**：`3000:80` - 将容器的 80 端口映射到主机的 3000 端口
- **开发环境**：`5173:5173` - 将容器的 5173 端口映射到主机的 5173 端口

### 环境变量

```bash
# 在 docker-compose.yml 中设置
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.example.com
```

### 数据持久化

开发环境使用卷挂载来实现代码热重载：

```yaml
volumes:
  - .:/app                    # 挂载当前目录到容器的 /app
  - /app/node_modules         # 匿名卷保护 node_modules
```

## 🛠️ 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 检查端口占用
   netstat -tulpn | grep :3000
   
   # 使用不同端口
   docker run -p 8080:80 cronproject
   ```

2. **权限问题**
   ```bash
   # 确保 Docker 有足够权限
   sudo docker run ...
   
   # 或将用户添加到 docker 组
   sudo usermod -aG docker $USER
   ```

3. **构建失败**
   ```bash
   # 清理构建缓存
   docker builder prune
   
   # 无缓存构建
   docker build --no-cache -t cronproject .
   ```

4. **开发环境热重载不工作**
   ```bash
   # 确保正确挂载代码目录
   docker run -v $(pwd):/app -v /app/node_modules ...
   ```

### 性能优化

1. **使用 .dockerignore**
   - 排除不必要的文件，减少构建上下文
   - 加快构建速度

2. **多阶段构建**
   - 减少最终镜像大小
   - 只包含运行时必需的文件

3. **层缓存优化**
   - 先复制 package.json，再安装依赖
   - 利用 Docker 层缓存机制

## 📊 监控和日志

### 查看应用状态

```bash
# 检查容器健康状态
docker ps
docker stats cronproject-app

# 查看详细信息
docker inspect cronproject-app
```

### 日志管理

```bash
# 查看实时日志
docker logs -f cronproject-app

# 查看最近的日志
docker logs --tail 100 cronproject-app

# 查看特定时间的日志
docker logs --since="2024-01-01T00:00:00" cronproject-app
```

## 🔒 安全建议

1. **使用非 root 用户**
   - 开发镜像已配置使用 node 用户
   - 生产环境使用 nginx 用户

2. **最小化镜像**
   - 使用 Alpine Linux 基础镜像
   - 只安装必要的依赖

3. **安全头配置**
   - nginx.conf 中已配置基本安全头
   - 可根据需要调整 CSP 策略

4. **定期更新**
   ```bash
   # 更新基础镜像
   docker pull node:18-alpine
   docker pull nginx:alpine
   
   # 重新构建镜像
   docker-compose build --no-cache
   ```

---

更多信息请参考：
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Nginx 配置指南](https://nginx.org/en/docs/)