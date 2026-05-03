import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, ArrowRight, Zap, Globe, Shield, MessageSquare, Database, Settings, 
  ChevronRight, LogOut, Plus, CheckCircle2, ExternalLink, MoreHorizontal, 
  TrendingUp, Clock, MessageCircle, Loader2, Send, User, Paperclip, Smile, 
  HelpCircle, RefreshCw, FileText, Trash2
} from 'lucide-react';
import { MOCK_WEBSITES, MOCK_KNOWLEDGE_BASE, PRELOADED_CHATS, AI_RESPONSES, Message, Website, KnowledgePage } from './lib/mock';

// --- COMPONENTS ---

const Landing = () => (
  <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#000212] text-white">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#5e6ad2]/10 blur-[120px] pointer-events-none" />
    <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#5e6ad2] rounded-lg flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">Chirps Mini</span>
      </div>
      <Link to="/dashboard" className="px-5 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
        Try Demo
      </Link>
    </nav>
    <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5e6ad2]/10 border border-[#5e6ad2]/20 text-[#5e6ad2] text-xs font-medium mb-8">
        <Zap size={14} /> <span>Now in Public Beta</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
        AI Customer Support <br /> <span className="text-gray-500">Powered by Your Website</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
        Train a custom AI agent on your website content in seconds. Automate support, qualify leads, and close sales.
      </motion.p>
      <Link to="/dashboard" className="group flex items-center gap-2 px-8 py-4 bg-[#5e6ad2] rounded-full font-semibold hover:bg-[#4c56b0] transition-all hover:scale-105">
        Try Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </main>
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: Globe, label: "Websites", path: "/dashboard" },
    { icon: Database, label: "Knowledge", path: "/dashboard/knowledge" },
    { icon: MessageSquare, label: "Chat", path: "/dashboard/chat" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];
  return (
    <aside className="w-64 border-r border-white/5 flex flex-col shrink-0 bg-[#000212] h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2 mb-6">
        <Bot size={24} className="text-[#5e6ad2]" />
        <span className="font-bold text-xl">Chirps</span>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? "bg-[#5e6ad2]/10 text-[#5e6ad2]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <item.icon size={18} /> {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

const DashboardHome = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [scrapeStep, setScrapeStep] = useState(0);
  const [url, setUrl] = useState("");
  const steps = ["Scraping...", "Processing...", "Building KB...", "Finalizing..."];

  const startScrape = (e: any) => {
    e.preventDefault();
    if (!url) return;
    setIsAdding(true);
    setScrapeStep(1);
    let current = 1;
    const interval = setInterval(() => {
      current++;
      setScrapeStep(current);
      if (current > steps.length) {
        clearInterval(interval);
        setTimeout(() => setIsAdding(false), 1000);
      }
    }, 1500);
  };

  return (
    <div className="p-8 space-y-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[{ l: "Queries", v: "1,245" }, { l: "Response", v: "1.2s" }, { l: "Accuracy", v: "92%" }, { l: "Pages", v: "148" }].map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <p className="text-gray-500 text-sm">{s.l}</p>
            <p className="text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Websites</h2>
        <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-[#5e6ad2] rounded-lg text-sm font-bold">Add New</button>
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Globe className="text-gray-400" />
          <div>
            <p className="font-bold">demo-store.com</p>
            <p className="text-xs text-emerald-400">Indexed • 24 pages</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white"><MoreHorizontal /></button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-[#0b0c14] border border-white/10 p-8 rounded-3xl">
              {scrapeStep === 0 ? (
                <form onSubmit={startScrape} className="space-y-4">
                  <h3 className="text-xl font-bold">Add Website</h3>
                  <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-[#5e6ad2]" />
                  <button className="w-full py-3 bg-[#5e6ad2] rounded-xl font-bold">Start</button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <Loader2 className="animate-spin mx-auto text-[#5e6ad2]" size={40} />
                  <p className="font-bold">{steps[scrapeStep-1] || "Complete!"}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(PRELOADED_CHATS);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const send = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: 'Now' };
    setMessages(p => [...p, msg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const resp = AI_RESPONSES[msg.content.toLowerCase()] || AI_RESPONSES.default;
      setMessages(p => [...p, { id: Date.now().toString(), role: 'assistant', content: resp, timestamp: 'Now' }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] p-8 max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto space-y-4 pr-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-[#5e6ad2] text-white' : 'bg-white/5 text-gray-200'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {typing && <div className="text-gray-500 text-sm italic px-4">AI is thinking...</div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl outline-none" />
        <button className="p-4 bg-[#5e6ad2] rounded-2xl"><Send size={20}/></button>
      </form>
    </div>
  );
};

// --- APP WRAPPER ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/*" element={
          <div className="flex bg-[#000212] min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="chat" element={<Chat />} />
                <Route path="knowledge" element={<div className="p-8 text-white">Knowledge Base Viewer (Demo)</div>} />
                <Route path="settings" element={<div className="p-8 text-white">Settings Page (Demo)</div>} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
