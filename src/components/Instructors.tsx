/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { instructors } from '../data/instructors';

export default function Instructors() {

  // Simple avatar generator based on first characters of name (looks extremely clean, modern, and minimal)
  const renderAvatarPlaceholder = (name: string, role: string) => {
    const chars = name.split(' ').map(n => n[0]).join('');
    
    // Choose specific pastel/dark tones matching Apple minimalist grids
    let bgTone = 'from-zinc-100 to-zinc-50 border-zinc-200 text-zinc-800';
    if (name.includes('آرش')) bgTone = 'from-blue-100 to-blue-50 border-blue-200 text-blue-900';
    if (name.includes('نیلوفر')) bgTone = 'from-purple-100 to-purple-50 border-purple-200 text-purple-900';
    if (name.includes('مریم')) bgTone = 'from-emerald-100 to-emerald-50 border-emerald-200 text-emerald-900';
    if (name.includes('علیرضا')) bgTone = 'from-amber-100 to-amber-50 border-amber-200 text-amber-900';

    return (
      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${bgTone} border flex items-center justify-center font-bold text-sm tracking-widest font-sans shrink-0 shadow-sm`}>
        {chars.toUpperCase()}
      </div>
    );
  };

  return (
    <section id="instructors-section" className="py-20 bg-white border-t border-zinc-100 text-right transition-all duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">تلفیق تجربه بالینی، صنعتی و علمی</span>
          <h2 className="text-2xl md:text-3.5xl font-extrabold text-zinc-900 tracking-tight leading-normal">
            تیم مربیان، مشاوران و اساتید کارآزموده توآمریکا
          </h2>
          <p className="mt-4 text-xs md:text-sm text-zinc-500 leading-relaxed font-semibold">
            متخصصینی که خود مایل پرواز را طی کرده و فارغ‌التحصیلان و مهندسین برتر مهاجر در آمریکا هستند
          </p>
        </div>

        {/* Mentors list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructors.map((inst) => (
            <div 
              key={inst.id}
              className="flex flex-col sm:flex-row items-grid items-start gap-4 bg-zinc-50 border border-zinc-200/85 rounded-2xl p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-300 shadow-sm"
            >
              {/* Left aligned avatar mockup */}
              {renderAvatarPlaceholder(inst.name, inst.role)}

              <div className="space-y-2 text-right w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                  <h4 className="text-sm font-extrabold text-zinc-900 leading-normal">{inst.name}</h4>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-white font-bold border border-zinc-200 text-amber-700 px-2 py-0.5 rounded-full shadow-sm">
                    <MapPin className="w-3 h-3 shrink-0 text-amber-600" />
                    <span>{inst.badge}</span>
                  </span>
                </div>

                <p className="text-xs text-zinc-500 font-semibold">{inst.role}</p>
                <p className="text-xs text-zinc-650 leading-relaxed font-medium">{inst.bio}</p>

                <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium pt-2 border-t border-zinc-200/50 mt-2">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-semibold">{inst.experience}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
