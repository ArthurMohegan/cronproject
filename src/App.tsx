import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import CronGenerator from "@/pages/CronGenerator";
import RegexGenerator from "@/pages/RegexGenerator";
import ReadmePage from "@/pages/ReadmePage";
import Layout from "@/components/Layout";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cron" element={<CronGenerator />} />
            <Route path="/regex" element={<RegexGenerator />} />
            <Route path="/readme" element={<ReadmePage />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" richColors />
      </Router>
    </LanguageProvider>
  );
}
