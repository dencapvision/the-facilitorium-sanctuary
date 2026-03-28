"use client";

import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';

export const FacilitatorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'สวัสดีครับ! ผมคือ Facilitator AI ยินดีที่ได้พบคุณที่ The Facilitorium ครับ มีอะไรให้ผมช่วยแนะนำเกี่ยวกับบทเรียนหรือเครื่องมือวิทยากรไหมครับ?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Mock AI Response (In real use, call Google GenAI here)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `ขอบคุณสำหรับคำถามนะครับ! สำหรับเรื่อง "${input}" ผมแนะนำให้ลองดูในส่วนของ "คลังเครื่องมือฟรี (Free Tools)" หรือเริ่มศึกษาจาก "คอร์สวิทยากรพื้นฐาน" ใน Classroom ได้เลยครับ` 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-royal-blue text-gold rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce cursor-pointer group"
        >
          <Sparkles className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-royal-blue/10 animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-royal-blue text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Bot className="text-gold" size={24} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg">Facilitator AI</h4>
                <p className="text-[10px] text-gold/80 italic tracking-wider">PREMIUM ASSISTANT</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sanctuary-cream/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-royal-blue text-white rounded-tr-none' 
                    : 'bg-white text-royal-blue shadow-sm rounded-tl-none border border-royal-blue/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-royal-blue/5 bg-white">
            <div className="flex items-center gap-2 bg-royal-blue/5 p-2 rounded-2xl">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="พิมพ์ข้อความที่นี่..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-royal-blue px-2"
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-royal-blue text-gold rounded-xl hover:bg-royal-blue-light transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
