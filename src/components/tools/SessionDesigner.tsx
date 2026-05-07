
"use client";

import React, { useState } from 'react';
import { Sparkles, Send, Loader2, BookOpen, Clock, Target, Users } from 'lucide-react';

export const SessionDesigner = () => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('60');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic || !audience) return;
    setLoading(true);
    
    try {
      const prompt = `ช่วยออกแบบโครงสร้างหลักสูตร (Workshop Outline) สำหรับหัวข้อ "${topic}" โดยมีระยะเวลา ${duration} นาที สำหรับกลุ่มผู้ฟังคือ "${audience}". 
      ให้ผลลัพธ์เป็น JSON format ที่มีโครงสร้างดังนี้:
      {
        "title": "ชื่อหัวข้อที่น่าสนใจ",
        "duration": "ระยะเวลาทั้งหมด",
        "target": "กลุ่มเป้าหมาย",
        "outline": [
          { "time": "ช่วงเวลา (เช่น 0-10 min)", "activity": "ชื่อกิจกรรม", "detail": "รายละเอียดสั้นๆ" }
        ]
      }
      ตอบเป็น JSON เท่านั้น ไม่ต้องมีคำนำหรือคำตาม.`;

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (data.response) {
        // Parse the JSON from the AI response
        const cleanJson = data.response.replace(/```json|```/g, '').trim();
        const parsedResult = JSON.parse(cleanJson);
        setResult(parsedResult);
      } else {
        throw new Error(data.error || 'Failed to generate outline');
      }
    } catch (error) {
      console.error('Generation Error:', error);
      // Fallback or error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-royal-blue/5 overflow-hidden shadow-premium">
      <div className="p-8 md:p-12 space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gold/10 rounded-2xl text-gold">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-royal-blue">AI Session Designer</h3>
            <p className="text-sm text-royal-blue/40 uppercase tracking-widest font-black">Draft your workshop in seconds</p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-royal-blue/60 flex items-center gap-2">
                  <BookOpen size={16} /> Workshop Topic
                </label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="เช่น การสื่อสารอย่างเห็นอกเห็นใจ" 
                  className="w-full px-6 py-4 rounded-2xl bg-royal-blue/5 border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-royal-blue/60 flex items-center gap-2">
                  <Clock size={16} /> Duration (Minutes)
                </label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-royal-blue/5 border-2 border-transparent focus:border-gold outline-none transition-all font-medium appearance-none"
                >
                  <option value="30">30 นาที</option>
                  <option value="60">60 นาที</option>
                  <option value="120">120 นาที (2 ชม.)</option>
                  <option value="180">180 นาที (3 ชม.)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-royal-blue/60 flex items-center gap-2">
                <Users size={16} /> Target Audience
              </label>
              <input 
                type="text" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="เช่น ผู้บริหารระดับกลาง, พนักงานใหม่" 
                className="w-full px-6 py-4 rounded-2xl bg-royal-blue/5 border-2 border-transparent focus:border-gold outline-none transition-all font-medium"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading || !topic || !audience}
              className="w-full py-5 bg-royal-blue text-gold font-bold rounded-2xl shadow-xl hover:shadow-royal-blue/20 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              {loading ? 'กำลังออกแบบหลักสูตร...' : 'เริ่มออกแบบหลักสูตรด้วย AI'}
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 rounded-3xl bg-royal-blue/5 border border-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="text-gold/20" size={64} />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-serif font-bold text-royal-blue mb-2">{result.title}</h4>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-royal-blue/60">
                   <span className="flex items-center gap-1"><Clock size={14} /> {result.duration}</span>
                   <span className="flex items-center gap-1"><Target size={14} /> {result.target}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-royal-blue uppercase tracking-widest text-xs">Proposed Session Outline</h5>
              <div className="space-y-4">
                {result.outline.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-royal-blue text-gold text-[10px] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      {idx !== result.outline.length - 1 && (
                        <div className="w-0.5 h-full bg-royal-blue/10 my-1 group-hover:bg-gold/30 transition-colors"></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="text-[10px] font-black text-gold uppercase tracking-widest mb-1">{item.time}</div>
                      <h6 className="font-bold text-royal-blue mb-1">{item.activity}</h6>
                      <p className="text-sm text-royal-blue/50 font-light">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setResult(null)}
                className="flex-1 py-4 border border-royal-blue/10 text-royal-blue font-bold rounded-2xl hover:bg-royal-blue/5 transition-all"
              >
                เริ่มใหม่
              </button>
              <button className="flex-1 py-4 bg-royal-blue text-gold font-bold rounded-2xl shadow-xl hover:shadow-royal-blue/20 transition-all">
                คัดลอกร่างหลักสูตร
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
