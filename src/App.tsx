import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import CronGenerator from "@/pages/CronGenerator";
import RegexGenerator from "@/pages/RegexGenerator";
import Layout from "@/components/Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cron" element={<CronGenerator />} />
          <Route path="/regex" element={<RegexGenerator />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </Router>
  );
}
