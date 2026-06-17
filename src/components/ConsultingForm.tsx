/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, User, Mail, Compass, Award, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import localDB from '../services/localDB';

export default function ConsultingForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pathway, setPathway] = useState<'study' | 'work' | 'medical' | 'other'>('study');
  const [englishLevel, setEnglishLevel] = useState('مبتدی (A1/A2)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    if (!name || name.trim().length < 3) {
      setErrorMsg('وارد کردن نام کامل الزامی است (حداقل ۳ کاراکتر)');
      setIsSubmitting(false);
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('شماره تلفن همراه نامعتبر است (۱۰ رقم بدون صفر)');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      // Store in offline simulation DB
      localDB.submitConsultation({
        name,
        phone: phoneNumber,
        email: email || 'بدون ایمیل',
        pathway,
        englishLevel
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Auto close success alert after 5 secs
      setTimeout(() => {
        setName('');
        setPhoneNumber('');
        setEmail('');
        setSubmitSuccess(false);
      }, 5000);

    }, 1500);
  };

  return (
    <motion.section 
      id="consulting-section" 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", damping: 30, stiffness: 100 }}
      className="py-20 bg-zinc-50 border-t border-zinc-150 text-right font-sans select-none" 
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Right Column - Presentation Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-4"
          >
            <span className="text-[10px] text-zinc-450 font-extrabold uppercase tracking-wider block">پشتیبانی و هدایت مسیر مهاجرت</span>
            <h2 className="text-lg md:text-xl font-bold text-zinc-900 tracking-tight leading-normal">
              با مشاوران تراز اول آکادمی توآمریکا گفتگو کنید
            </h2>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold">
              پیش از رزرو دوره‌ها، برای ارزیابی اوليه پرونده، هماهنگی بورد درمانی، و فهم الزامات مصاحبه سفارت، اطلاعات خود را وارد نمایید. کارشناسان ما اطلاعات علمی شما را پایش و بررسی خواهند کرد.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-zinc-200 w-full hover:border-zinc-300 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-zinc-800">تحلیل تخصصی پوزیشن هدف</span>
                  <span className="text-[10px] text-zinc-400 mt-1 font-semibold leading-relaxed">بررسی شانس فاند و پذیرش متناسب با معدل و رزومه تحصیلی به همراه پایش خلاء رزومه.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-zinc-200/80 w-full hover:border-zinc-300 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-zinc-800">تعیین سناریوی مناسب سفارت</span>
                  <span className="text-[10px] text-zinc-400 mt-1 font-semibold leading-relaxed">هماهنگی پرونده‌های ریجکت‌شده قبلی و بهینه‌سازی نحوه ابراز انگیزه بازگشت.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[9px] text-zinc-400 flex items-center gap-1.5 font-semibold justify-center sm:justify-start">
              <ShieldAlert className="w-3.5 h-3.5 text-zinc-405" />
              <span>پایگاه اطلاعاتی کاملاً امن لوکال مجهز به رمزنگاری پیشرفته علمی</span>
            </div>
          </motion.div>

          {/* Left Column - Submissions Form with offline queue status indicator */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-xs">
              
              <h3 className="text-xs font-bold text-zinc-900 mb-5 border-b border-zinc-100 pb-2.5">درخواست ارزیابی و مشاوره رایگان</h3>

              {submitSuccess ? (
                /* Success banner with detailed local offline log explanation */
                <div className="text-center py-6 space-y-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-150 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900">درخواست شما ثبت گردید</h4>
                  <p className="text-[10px] text-zinc-400 max-w-sm mx-auto leading-relaxed font-semibold">
                    مشخصات شما با موفقیت ذخیره شد. مشاورین ما به زودی و در کمتر از ۲ ساعت کاری جهت هماهنگی مصاحبه تعیین سطح با شما تماس خواهند گرفت.
                  </p>
                  <p className="text-[9px] text-amber-700 bg-amber-50 border border-amber-200 p-1.5 rounded-lg max-w-sm mx-auto font-mono tracking-wider font-semibold">
                    درخواست شما در سیستم آفلاین ذخیره علمی شد
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 font-bold block">نام و نام خانوادگی <span className="text-rose-600">*</span></label>
                    <div className="relative flex items-center">
                      <span className="absolute right-3.5 text-zinc-400"><User className="w-4 h-4" /></span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: پدرام شمس"
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-300 focus:bg-white rounded-full pr-10 pl-3.5 py-1.5 text-xs text-zinc-800 placeholder-zinc-400 transition-colors outline-none font-semibold text-right"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Phone field */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold block">شماره تلفن همراه <span className="text-rose-600">*</span></label>
                      <div className="relative flex items-center">
                        <span className="absolute right-3.5 text-zinc-400"><Smartphone className="w-4 h-4" /></span>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="مثال: 9123456789"
                          className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-300 focus:bg-white rounded-full pr-10 pl-3.5 py-1.5 text-xs text-zinc-800 placeholder-zinc-400 transition-colors outline-none text-left tracking-wider font-semibold"
                          dir="ltr"
                          required
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-405 font-medium block">نشانی ایمیل <span className="text-zinc-400 text-[8px]">(اختیاری)</span></label>
                      <div className="relative flex items-center">
                        <span className="absolute right-3.5 text-zinc-400"><Mail className="w-4 h-4" /></span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@mail.com"
                          className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-300 focus:bg-white rounded-full pr-10 pl-3.5 py-1.5 text-xs text-zinc-800 placeholder-zinc-400 transition-colors outline-none text-left font-semibold"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pathway field selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold block">مسیر ترجیحی اعزام به آمریکا</label>
                      <select
                        value={pathway}
                        onChange={(e: any) => setPathway(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-300 focus:bg-white rounded-full px-3.5 py-1.5 text-xs text-zinc-700 outline-none font-semibold cursor-pointer appearance-none text-right"
                      >
                        <option value="study" className="font-semibold">تحصیلی و فاند (F1)</option>
                        <option value="work" className="font-semibold">کاری و نخبگی (H1B/O1)</option>
                        <option value="medical" className="font-semibold">کادر درمان و معادل‌سازی (USMLE)</option>
                        <option value="other" className="font-semibold">توریستی و سایر (B1/B2)</option>
                      </select>
                    </div>

                    {/* level selection */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold block">برآورد شما از سطح زبان خودتان</label>
                      <select
                        value={englishLevel}
                        onChange={(e) => setEnglishLevel(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-300 focus:bg-white rounded-full px-3.5 py-1.5 text-xs text-zinc-700 outline-none font-semibold cursor-pointer appearance-none text-right"
                      >
                        <option value="مبتدی (A1/A2)" className="font-semibold">مبتدی (پایه)</option>
                        <option value="متوسط (B1)" className="font-semibold">متوسط (گفتگوی عمومی)</option>
                        <option value="پیشرفته (B2/C1)" className="font-semibold">پیشرفته (کامل)</option>
                      </select>
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-rose-700 text-[10px] font-semibold bg-rose-50 border border-rose-200 p-2 rounded-lg text-center">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 transform active:scale-98 cursor-pointer shadow-xs mt-4"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-1 justify-center">
                        <div className="w-3.5 h-3.5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                        در حال ثبت...
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 shrink-0" />
                        <span>ثبت درخواست ارزیابی رزومه سفارتی</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}
