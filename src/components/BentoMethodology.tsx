/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Award, Zap, HelpCircle, HardDrive, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';

export default function BentoMethodology() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 150
      }
    }
  };

  return (
    <section id="methodology-section" className="py-20 bg-zinc-50 border-t border-zinc-150 text-right select-none" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header Title- simple and elegant, no shouting sizes */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest block mb-1.5 font-sans">تکنیک ویژه یادگیری پایدار</span>
          <h2 className="text-xl md:text-[28px] font-black text-zinc-950 tracking-tight leading-tight">
            تکنیک یادگیری بومی مهاجران
          </h2>
          <p className="mt-2 text-xs md:text-[13px] text-zinc-500 font-semibold leading-relaxed">
            علت بازدهی بالای متد آموزشی توآمریکا در تسریع قبولی شما.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          
          {/* Card 1 - Responsive LMS */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-zinc-200 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 lg:col-span-2"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <WifiOff className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 mb-1.5/2">پورتال کلاسی و دسترسی به منابع</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                پورتال کلاسی یکپارچه با دسترسی مستقیم و ۲۴ ساعته به فایل‌های صوتی، متنی و فیلم‌های ضبط‌شده در کلیه دستگاه‌ها.
              </p>
            </div>
            <div className="mt-4 text-[8.5px] text-zinc-400 font-bold">
              * دسترسی دائمی بدون نیاز به اینترنت پرسرعت
            </div>
          </motion.div>

          {/* Card 2 - Simulated Interviews */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-zinc-200 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-zinc-300"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 mb-1.5/2">شبیه‌سازی زنده سفارتی</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                شبیه‌سازی مکرر سناریوهای رایج و آزمون‌های زنده برای آمادگی منطبق با الگوهای ذهنی افسران مصاحبه‌کننده سفارت آمریکا.
              </p>
            </div>
            <div className="mt-4 text-[8.5px] text-zinc-400 font-bold">
              * رفع کامل اضطراب کلامی روز مصاحبه
            </div>
          </motion.div>

          {/* Card 3 - US-matched resumes */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-zinc-200 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-zinc-300"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 mb-1.5/2">رزومه منطبق با استانداردهای آمریکا</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                سندنویسی و فرمت‌بندی استاندارد رزومه و انگیزه‌نامه (SOP) مورد تأیید سیستم‌های غربی جهت جلب نظر اساتید و دانشگاه‌ها.
              </p>
            </div>
            <div className="mt-4 text-[8.5px] text-zinc-400 font-bold">
              * عبور موفق از سیستم غربالگری رزومه ATS
            </div>
          </motion.div>

          {/* Card 4 - Secure local sync */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-zinc-200 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 lg:col-span-2"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 mb-1.5/2">حفاظت تام از حریم خصوصی</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                حفاظت کاملاً رمزشده از انگیزه‌نامه‌ها، طرح‌های تحقیقاتی، رزومه‌ها و اطلاعات ارسالی شما با حفظ کامل حقوق مادی و معنوی پرونده.
              </p>
            </div>
            <div className="mt-4 text-[8.5px] text-zinc-400 font-bold">
              * بالاترین سطح محافظت از اطلاعات تحصیلی و شخصی
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
