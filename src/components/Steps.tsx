/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClipboardCheck, BookOpen, Send, Compass } from 'lucide-react';

export default function Steps() {
  const stepItems = [
    {
      num: '۱',
      icon: <ClipboardCheck className="w-5 h-5 text-amber-600" />,
      title: 'ارزیابی پرونده و تعیین سطح تخصصی آنلاین',
      desc: 'با ورود به بخش سنجش آنلاین، شرایط تحصیلی، کادر درمان یا رزومه شغلی شما پایش شده و بهترین رول برنامه‌ریزی پیشنهاد می‌گردد.'
    },
    {
      num: '۲',
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      title: 'شروع دوره و استفاده فعال آفلاین',
      desc: 'بسته‌های کلاسی فشرده را کش کرده و تمرین‌های شبیه‌ساز مصاحبه و گویایی خود را بدون وابستگی دائم به اینترنت پیش ببرید.'
    },
    {
      num: '۳',
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
      title: 'پشتیبانی مستمر و بازخورد وکیل تخصصی',
      desc: 'تیکت‌های پرونده، مدارک مالی و SOPهای نگارشی شما به صورت لوکال آپلود و توسط فارغ‌التحصیلان مجرب استنفورد بازبینی می‌گردد.'
    },
    {
      num: '۴',
      icon: <Send className="w-5 h-5 text-purple-600" />,
      title: 'نام‌نویسی نهایی، مصاحبه و صدور ویزای US',
      desc: 'حضور با اعتماد به نفس خیره‌کننده در اتاق افسر کنسول سفارت، معادل‌سازی نهایی و پرواز مستقیم به سمت برترین ایالت‌های آمریکا.'
    }
  ];

  return (
    <section className="py-20 bg-zinc-50 border-t border-zinc-200/80 text-right transition-all duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TitleBlock */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">مسیر موفقیت تحصیلی و کاری</span>
          <h2 className="text-2xl md:text-3.5xl font-extrabold text-zinc-900 tracking-tight leading-normal">
            نقشه راه ۴ گام طلایی تا اعزام به آمریکا
          </h2>
          <p className="mt-4 text-xs md:text-sm text-zinc-500 leading-relaxed font-semibold">
            پرتابل هوشمند توآمریکا پرونده مهاجرتی شما را از مباحث گرامری و معادل‌سازی تا موفقیت مصاحبه سفارت مدیریت می‌کند
          </p>
        </div>

        {/* Steps Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {stepItems.map((step, idx) => (
            <div key={idx} className="flex flex-col bg-white border border-zinc-200 rounded-2xl p-6 relative hover:border-zinc-300 hover:shadow-md transition-all duration-300 shadow-sm animate-fade-in">
              
              {/* Number bubble badge */}
              <div className="absolute top-4 left-4 w-7 h-7 rounded bg-zinc-50 text-xs font-mono font-bold text-zinc-650 border border-zinc-200 flex items-center justify-center">
                {step.num}
              </div>

              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-200 mb-4 shadow-sm">
                {step.icon}
              </div>

              <h3 className="text-sm font-extrabold text-zinc-900 leading-normal mb-2">{step.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-semibold">{step.desc}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
