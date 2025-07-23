# Tool Website - Cron & Regex Generator

A clean and practical online tool website that provides two core functions for developers and technical personnel: Cron expression generation and regular expression generation.

## 🌟 Features

### 🏠 Homepage
- Modern Hero section design
- Clear feature introduction and navigation
- Responsive card layout
- Quick access navigation

### ⏰ Cron Expression Generator
- **Visual Configuration Interface**: Set minutes, hours, dates, months, and weekdays through dropdown menus
- **8 Common Templates**: Every minute, every hour, daily, weekly, monthly, etc.
- **Real-time Preview**: Generated cron expressions and execution time descriptions
- **One-click Copy**: Easy to use directly
- **Format Documentation**: Detailed cron expression syntax documentation

### 🔍 Regular Expression Generator
- **10 Common Templates**: Email, phone number, ID card, IP address, URL, etc.
- **Enhanced Phone Number**: Support for Chinese phone number formats with +86 or 86 prefix
- **Custom Building**: Support manual input and editing of regular expressions
- **Real-time Test Validation**: Input test text and validate matching results in real-time
- **Match Result Highlighting**: Clear display of matched content
- **Syntax Reference**: Regular expression syntax reference

## 🚀 Live Demo

- **Production**: [https://cronproject.vercel.app/](https://cronproject.vercel.app/)
- **Local Development**: http://localhost:5174/

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **CSS Framework**: Tailwind CSS 3
- **Routing**: React Router DOM 7
- **State Management**: Zustand 5
- **Icon Library**: Lucide React
- **Notification**: Sonner
- **Deployment**: Vercel

## ☁️ Vercel Deployment

### One-Click Deploy

Click the button below to deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FArthurMohegan%2Fcronproject&project-name=cronproject&repository-name=cronproject)

### Manual Deployment

1. **Fork this repository** to your GitHub account

2. **Login to Vercel**: Visit [vercel.com](https://vercel.com) and login with your GitHub account

3. **Import Project**:
   - Click "New Project"
   - Select your forked cronproject repository
   - Click "Import"

4. **Configure Project**:
   - **Project Name**: cronproject (or custom name)
   - **Framework Preset**: Vite
   - **Root Directory**: ./ (keep default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Deploy**: Click "Deploy" button and wait for deployment to complete

6. **Access Application**: After deployment, Vercel will provide an access link

### Environment Variables

This project is a pure frontend application and requires no environment variables.

### Automatic Deployment

After connecting the GitHub repository, every push to the `main` branch will automatically trigger redeployment.

## 📦 Local Development

### Requirements

- Node.js >= 18.0.0
- npm or pnpm

### Install Dependencies

```bash
# Clone the project
git clone https://github.com/ArthurMohegan/cronproject.git
cd cronproject

# Install dependencies
npm install
# or
pnpm install
```

### Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:5174](http://localhost:5174) to view the application.

### Build for Production

```bash
npm run build
# or
pnpm build
```

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
```

## 📁 Project Structure

```
cronproject/
├── public/                 # Static assets
│   └── favicon.svg
├── src/
│   ├── components/         # Reusable components
│   │   ├── Empty.tsx
│   │   └── Layout.tsx
│   ├── hooks/             # Custom Hooks
│   │   └── useTheme.ts
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Homepage
│   │   ├── CronGenerator.tsx    # Cron Expression Generator
│   │   └── RegexGenerator.tsx   # Regular Expression Generator
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── .gitignore
├── package.json
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎯 Use Cases

### Cron Expression Generator is suitable for:
- Linux/Unix system scheduled task configuration
- Application scheduled task scheduling
- Cloud service scheduled trigger settings
- Database backup plan formulation

### Regular Expression Generator is suitable for:
- Form validation rule writing
- Data cleaning and formatting
- Text search and replace
- API parameter validation

## 🤝 Contributing

Welcome to submit Issues and Pull Requests!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - User interface library
- [Vite](https://vitejs.dev/) - Frontend build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Contact

If you have any questions or suggestions, please contact us through:

- Submit an [Issue](https://github.com/ArthurMohegan/cronproject/issues)
- Send email to: your-email@example.com

---

⭐ If this project helps you, please give it a Star!