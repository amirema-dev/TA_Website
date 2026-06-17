/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { articles } from '../data/articles';

export default function Articles() {

  const getGradientClass = (gradient: string) => {
    switch (gradient) {
      case 'gradient-accent-1':
        return 'from-blue-500/10 to-indigo-500/5 hover:to-indigo-500/10 border-blue-200/60';
      case 'gradient-accent-2':
        return 'from-purple-500/10 to-pink-500/5 hover:to-pink-500/10 border-purple-200/60';
      case 'gradient-accent-3':
        return 'from-emerald-500/10 to-teal-500/5 hover:to-teal-500/10 border-emerald-200/60';
      default:
        return 'from-zinc-100 to-zinc-50 border-zinc-200';
    }
  };

  return (
    <section id="blog-section" className="py-20 bg-zinc-50 border-t border-zinc-200 text-right transition-all duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TitleBlock */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-4">
          <div className="text-right">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">راهنماها و دانش بومی مهاجرت</span>
            <h2 className="text-2xl md:text-3.5xl font-extrabold text-zinc-900 tracking-tight leading-normal">
              دانشنامه و مقالات تخصصی توآمریکا
            </h2>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed font-semibold">
              مقالات تحلیلی، واکاوی بخشنامه‌های سفارتی و چک‌لیست‌های کاربردی موفقیت مهاجرتی
            </p>
          </div>
          <button className="px-5 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-xl transition-all select-none shadow-sm cursor-pointer self-start sm:self-auto pb-2">
            آرشیو کامل مقالات
          </button>
        </div>

        {/* Blog layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <div 
              key={item.id}
              className={`flex flex-col bg-gradient-to-tr ${getGradientClass(item.imageUrl)} border hover:border-zinc-300 p-6 rounded-2xl transition-all duration-300 relative group shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold text-zinc-700 bg-white px-3 py-1 rounded-full border border-zinc-200">
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.readingTime} مطالعه</span>
                </div>
              </div>

              <h3 className="text-md font-extrabold text-zinc-900 leading-normal mb-3 hover:text-amber-700 transition-colors">
                <a href="#">{item.title}</a>
              </h3>

              <p className="text-xs text-zinc-500 leading-relaxed font-semibold mb-6 flex-1">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 mt-auto">
                <span className="text-[10px] font-mono text-zinc-400 tracking-wide font-semibold">{item.date}</span>
                
                <a 
                  href="#"
                  className="flex items-center gap-1 text-[11px] font-bold text-zinc-650 hover:text-zinc-900 group-hover:translate-x-[-4px] transition-transform"
                >
                  <span>بیشتر بخوانید</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
