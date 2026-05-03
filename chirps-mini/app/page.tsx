"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Heart, Share2, MoreHorizontal, Sparkles } from "lucide-react";

const CHIRPS = [
  {
    id: 1,
    author: "claudedev",
    content: "Just built this microblogging app with Next.js and Tailwind. The Linear aesthetic is so clean. ✨",
    time: "2h",
    likes: 12,
    replies: 4,
  },
  {
    id: 2,
    author: "monzed_labs",
    content: "Estonian engineering meets elite design. Chirps Mini is looking sharp.",
    time: "5h",
    likes: 45,
    replies: 12,
  },
];

export default function Home() {
  const [content, setContent] = useState("");
  const [chirps, setChirps] = useState(CHIRPS);

  const handlePost = () => {
    if (!content.trim()) return;
    const newChirp = {
      id: Date.now(),
      author: "you",
      content,
      time: "now",
      likes: 0,
      replies: 0,
    };
    setChirps([newChirp, ...chirps]);
    setContent("");
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 min-h-screen">
      <header className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Chirps</h1>
        </div>
        <button className="text-muted hover:text-foreground transition-colors">
          <MoreHorizontal />
        </button>
      </header>

      <div className="bg-white/5 border border-border rounded-2xl p-4 mb-8 focus-within:border-primary/50 transition-colors">
        <textarea
          placeholder="What's happening?"
          className="w-full bg-transparent border-none focus:ring-0 text-lg resize-none h-24 placeholder:text-muted"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between items-center mt-4 border-t border-border pt-4">
          <div className="flex gap-4 text-muted">
            <MessageSquare className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Share2 className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          </div>
          <button
            onClick={handlePost}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            disabled={!content.trim()}
          >
            Post <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {chirps.map((chirp) => (
            <motion.div
              key={chirp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] border border-border rounded-2xl p-6 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-primary">@{chirp.author}</span>
                <span className="text-sm text-muted">{chirp.time}</span>
              </div>
              <p className="text-lg leading-relaxed mb-6">{chirp.content}</p>
              <div className="flex gap-8 text-muted">
                <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{chirp.replies}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{chirp.likes}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                  <Share2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}