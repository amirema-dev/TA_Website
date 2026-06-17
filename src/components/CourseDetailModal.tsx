/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Star, Clock, Users, BookOpen, ChevronRight, 
  Sparkles, CheckCircle2, Play, Pause, RefreshCw, 
  ArrowLeft, Brain, Volume2, UserCheck, ShieldCheck, 
  ChevronLeft 
} from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: Course) => void;
  isEnrolled: boolean;
}

export default function CourseDetailModal({ 
  course, 
  isOpen, 
  onClose, 
  onEnroll, 
  isEnrolled 
}: CourseDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'ai-advisor'>('overview');
  const [isPlayingAdvisor, setIsPlayingAdvisor] = useState(false);
  const [advisorProgress, setAdvisorProgress] = useState(0);
  const [advisorStep, setAdvisorStep] = useState(0);
  
  // Custom generated advisors scripts in Persian based on course content
  const getAdvisorScripts = (courseId: string) => {
    switch (courseId) {
      case 'embassy-comprehensive':
        return [
          {
            title: "گام ۱: مدیریت لحن و استرس روز مصاحبه",
            text: "مکالمه مصاحبه سفارت مثل شطرج سریع و حساب‌شده است. افسر سفارت زمان کوتاهی برای مصاحبه دارد. در این دوره، ما روی سناریوهای واقعی کار‌های تمرینی انجام می‌دهیم تا شما بدون کوچک‌ترین تاخیری، پاسخ‌های متقاعدکننده ارائه کنید.",
            duration: 15
          },
          {
            title: "گام ۲: پاسخ‌های طبیعی و کاملاً بومی",
            text: "یکی از بزرگترین اشتباهات متقاضیان ایرانی، استفاده از جملات کلیشه‌ای حفظ‌شده است. افسران و مصاحبه‌کنندگان بلافاصله متوجه این موضوع شده و روند بررسی را پیچیده می‌کنند. ما پاسخ‌های شما را شخصی‌سازی می‌کنیم تا کلام شما شفاف و طبیعی جلوه کند.",
            duration: 18
          },
          {
            title: "گام ۳: تقویت لهجه و مهارت تعاملی کلام",
            text: "صداقت، تن صدا و نحوه مکاتبه در مراحل کلیدی، موفقیت گران‌بهایی برای شما رقم می‌زند. ما شما را در دوره‌های گفتاری پایش می‌کنیم تا تاییدیه نهایی را پیش از حضور در روز مصاحبه سفارت با بهترین کیفیت ممکن دریافت نمایید.",
            duration: 15
          }
        ];
      case 'medical-usmle':
        return [
          {
            title: "گام ۱: چالش قبولی بورد در تگزاس و شیکاگو",
            text: "معادل‌سازی پزشکان و آزمون USMLE مسیر علمی فوق‌العاده حساسی است. برای مچ شدن در بیمارستان‌های تراز اول آمریکا، نمره‌دهی استپ‌ها و کیفیت کلاس بالینی از عناصر اساسی است. در این دوره تمام مباحث کلیدی پاتولوژی با روش تعاملی و مرورهای طلایی تحلیل می‌گردد.",
            duration: 18
          },
          {
            title: "گام ۲: مرور هوشمند سناریوهای سال‌های گذشته",
            text: "امکان تکرار و مرور گام به گام کیس‌های بالینی اهمیت بسیاری دارد. با پورتال اطلاعاتی منظم ما، شما نمونه سوالات رسمی بالینی سال‌های گذشته را در قالب ساختارهای شبیه‌سازی دریافت و در ذهن خود دسته‌بندی می‌کنید.",
            duration: 20
          },
          {
            title: "گام ۳: منتورینگ زنده برای پزشکان موفق",
            text: "یک پزشک موفق مچ‌شده در سیستم درمانی آمریکا شما را در نگارش معرفی‌نامه عالی و بهینه‌سازی رزومه بالینی هدایت خواهد کرد. مشاورین ما پرونده تحصیلی شما را جهت همسوسازی کامل با فرآیندهای آکادمیک ارزیابی می‌کنند.",
            duration: 16
          }
        ];
      case 'academic-funding':
        return [
          {
            title: "گام ۱: ساخت هویت علمی استاندارد ایالات متحده",
            text: "اساتید دانشگاه‌های برتر با حجم بالایی از ایمیل‌های تکراری روبه‌رو هستند. چرا رزومه شما باید توجه آن‌ها را جلب کند؟ در اولین قدم ما ایمیل‌هایی با تکنیک قلاب‌گذاری بالا طراحی می‌کنیم تا ارتباط مستقیم و موثری ایجاد نماید.",
            duration: 16
          },
          {
            title: "گام ۲: نگارش انگیزه‌نامه جادویی (SOP)",
            text: "انگیزه‌نامه شما باید داستان زندگی علمی و اشتیاق بی‌نظیرتان برای کارهای پژوهشی باشد، نه صرفاً تکرار معدل دانشگاه سابق. ما پاراگراف‌های هدف شما را با کلمات کلیدی موثر علمی و اهداف آزمایشگاهی تلفیق می‌کنیم.",
            duration: 18
          },
          {
            title: "گام ۳: دستیابی به کمک‌هزینه و فند کامل (TA/RA)",
            text: "بسیاری از پوزیشن‌های فانددار به‌طور عمومی اعلام نمی‌شوند و در سرفصل‌های داخلی دانشگاه‌ها هستند. روش کشف پوزیشن‌های خالی فاند در رنکینگ عالی آمریکا را گام‌به‌گام با تمپلیت‌های نوین مرور خواهیم کرد.",
            duration: 15
          }
        ];
      case 'tech-career':
        return [
          {
            title: "گام ۱: گذر از فیلتر اولیه ربات‌های رزومه‌خوان",
            text: "بسیاری از رزومه‌های ارسالی به کارفرمایان آمریکا به دلیل عدم رعایت ساختار استاندارد در فیلتر اولیه رد می‌شوند. ما رزومه حرفه‌ای سیلیکون‌ولی شما را بر پایه الگوهای کاملاً پذیرفته‌شده پیاده‌سازی می‌کنیم.",
            duration: 17
          },
          {
            title: "گام ۲: حل تشریحی و چالش‌های فنی الگوریتمی",
            text: "مسیر استخدامی بر پایه حل سریع و منطقی چالش‌های الگوریتمی است. کارگاه‌های مهندسی و روش تفکر خلاق در حل مسئله را به‌صورت مستمر و گام‌به‌گام در اختیار خواهید داشت تا به آمادگی همه‌جانبه دست یابید.",
            duration: 19
          },
          {
            title: "گام ۳: هدایت مصاحبه‌های رفتاری و پیشنهاد حقوقی",
            text: "قوانین فرهنگ کار گروهی و ارتباط سازنده، بخش مهمی از قبولی شماست. ما شما را در چگونگی مذاکره برای حقوق و مزایای استاندارد همراهی می‌کنیم تا به بهترین توافق‌ها برسید.",
            duration: 15
          }
        ];
      default:
        return [
          {
            title: "گام ۱: معرفی روش کار",
            text: "مشخصات و سرفصل‌های این دوره برای همسوسازی برنامه مهاجرتی شما منطبق بر بهترین متدهای آموزشی طراحی شده است.",
            duration: 12
          }
        ];
    }
  };

  const scripts = course ? getAdvisorScripts(course.id) : [];
  const currentScript = scripts[advisorStep] || { title: '', text: '', duration: 10 };

  useEffect(() => {
    setActiveTab('overview');
    setAdvisorStep(0);
    setAdvisorProgress(0);
    setIsPlayingAdvisor(false);
  }, [course]);

  // Advisor simulation progressive timer
  useEffect(() => {
    let interval: number;
    if (isPlayingAdvisor && isOpen) {
      interval = window.setInterval(() => {
        setAdvisorProgress((prev) => {
          if (prev >= 100) {
            if (advisorStep < scripts.length - 1) {
              setAdvisorStep((s) => s + 1);
              return 0;
            } else {
              setIsPlayingAdvisor(false);
              return 100;
            }
          }
          return prev + (100 / (currentScript.duration * 10)); // updates smoothly every 100ms
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAdvisor, advisorStep, currentScript.duration, isOpen, scripts.length]);

  if (!isOpen || !course) return null;

  const handleStartAdvisor = () => {
    setIsPlayingAdvisor(!isPlayingAdvisor);
  };

  const handleResetAdvisor = () => {
    setAdvisorProgress(0);
    setAdvisorStep(0);
    setIsPlayingAdvisor(true);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, x: '100vw' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100vw' }}
        transition={{ type: "spring", damping: 30, stiffness: 220 }}
        className="fixed inset-0 z-50 bg-white overflow-y-auto select-none flex flex-col font-sans"
        dir="rtl"
      >
        
        {/* Apple-style separate header with back button */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-2 -mr-2 rounded-full hover:bg-zinc-150 text-zinc-800 transition-colors cursor-pointer flex items-center gap-2 font-bold text-xs"
            >
              <ChevronRight className="w-5 h-5 text-zinc-900" />
              <span>بازگشت به آکادمی</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-zinc-500">صفحه اختصاصی بررسی دوره تخصصی</span>
          </div>
        </header>

        {/* Core Layout containing two main columns */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:px-6 flex flex-col lg:flex-row gap-10">
          
          {/* Column 1 - Course Showcase Block */}
          <div className="w-full lg:w-5/12 bg-zinc-50 border border-zinc-200/60 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden h-max">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-[10px] text-zinc-500 font-bold tracking-wide shadow-3xs">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>برنامه آموزشی دپارتمان تخصصی</span>
              </span>

              <h2 className="text-lg md:text-xl font-black text-zinc-900 leading-snug tracking-tight">
                {course.title}
              </h2>

              <p className="text-[11px] md:text-xs text-zinc-400 font-semibold leading-relaxed">
                {course.subtitle}
              </p>

              {/* Course indicators inside clean boxes */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-[11px] text-zinc-650 font-bold bg-white p-3.5 rounded-2xl border border-zinc-150 shadow-3xs">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>مدت زمان دوره: {course.duration}</span>
                </div>
                
                <div className="flex items-center gap-2.5 text-[11px] text-zinc-650 font-bold bg-white p-3.5 rounded-2xl border border-zinc-150 shadow-3xs">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>دانشجویان دوره: +{(course.studentsCount).toLocaleString('fa-IR')} فرد موفق</span>
                </div>

                <div className="flex items-center gap-2.5 text-[11px] text-zinc-650 font-bold bg-white p-3.5 rounded-2xl border border-zinc-150 shadow-3xs">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>امتیاز فارغ‌التحصیلان: {course.rating} از ۵.۰</span>
                </div>
              </div>
            </div>

            {/* Apple styled CTA & Pricing wrapper */}
            <div className="pt-8 border-t border-zinc-200/80 mt-8 relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-zinc-400 line-through font-mono">
                    {formatPrice(course.originalPrice)}
                  </span>
                  <span className="text-sm md:text-base font-black text-blue-600 font-sans tracking-wide">
                    {formatPrice(course.discountedPrice)}
                  </span>
                </div>
                <div className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  تخفیف ویژه ۶۰٪ کلوب نخبگان
                </div>
              </div>

              <button
                onClick={() => onEnroll(course)}
                className={`w-full py-3 rounded-full text-[11px] font-extrabold transition-all duration-300 transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                  isEnrolled
                    ? 'bg-zinc-200 hover:bg-zinc-250 text-zinc-600 border border-zinc-300/80'
                    : 'bg-blue-600 hover:bg-blue-500 text-white hover:-translate-y-0.5'
                }`}
              >
                <span>{isEnrolled ? 'ثبت‌نام شده (ورود به پورتال کلاس)' : 'نام‌نویسی و رزرو نهایی این دوره'}</span>
                <ArrowLeft className="w-4 h-4 shrink-0" />
              </button>
            </div>

          </div>

          {/* Column 2 - Cupertino Interactive Tabs Viewport */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Sleek Segmented Apple-style Tabs selector */}
              <div className="flex bg-zinc-100/80 p-0.5 rounded-full border border-zinc-200/60">
                <button
                  onClick={() => { setActiveTab('overview'); setIsPlayingAdvisor(false); }}
                  className={`flex-1 py-1.5 text-[10px] md:text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-white text-zinc-950 shadow-3xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  معرفی دوره
                </button>
                <button
                  onClick={() => { setActiveTab('syllabus'); setIsPlayingAdvisor(false); }}
                  className={`flex-1 py-1.5 text-[10px] md:text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                    activeTab === 'syllabus'
                      ? 'bg-white text-zinc-950 shadow-3xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  سرفصل‌های طلایی
                </button>
                <button
                  onClick={() => setActiveTab('ai-advisor')}
                  className={`flex-1 py-1.5 text-[10px] md:text-[11px] font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'ai-advisor'
                      ? 'bg-blue-600 text-white shadow-3xs font-extrabold'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5 shrink-0" />
                  <span>مشاور صوتی دوره</span>
                </button>
              </div>

              {/* Tab Outputs */}
              <div className="min-h-96">
                <AnimatePresence mode="wait">
                  
                  {/* Tab 1: Overview */}
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">توجیه علمی و اهداف پرونده</h4>
                        <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-semibold text-justify">
                          {course.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">دستاوردهای ثبت‌نام برای دانشجو</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {course.benefits.map((benefit, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200/50 shadow-3xs text-xs font-semibold text-zinc-850"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-50 text-[10px] md:text-xs text-blue-900 font-semibold leading-relaxed">
                        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                        <span>پشتیبانی همه‌جانبه و پیوسته: این دوره با ارایه فایل‌ها و جزوات استاندارد سفارتی همواره پشتیبانی می‌گردد و مستندات شما به سریع‌ترین شیوه هدایت خواهد شد.</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 2: Syllabus */}
                  {activeTab === 'syllabus' && (
                    <motion.div
                      key="syllabus"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2">چارت تخصصی و محتوایی کلاس</h4>
                      
                      <div className="space-y-3">
                        <div className="p-4 border border-zinc-150 hover:border-zinc-200 rounded-2xl bg-white shadow-3xs flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-700">۱</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-zinc-900">پیش‌نیازها و ساختار اساسی بازار کار آمریکا</span>
                              <span className="text-[10px] text-zinc-400 mt-0.5 font-semibold">۴ درس نظری به همراه تمپلیت رسمی</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono">طول: ۱:۴۵ ساعت</span>
                        </div>

                        <div className="p-4 border border-zinc-150 hover:border-zinc-200 rounded-2xl bg-white shadow-3xs flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600">۲</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-zinc-900">روان‌شناسی مصاحبه و پاسخ‌های متقاعدکننده سفارتی</span>
                              <span className="text-[10px] text-zinc-400 mt-0.5 font-semibold">۱۲ کارگاه تمرینی شبیه‌ساز صوتی</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono">طول: ۸:۳۰ ساعت</span>
                        </div>

                        <div className="p-4 border border-zinc-150 hover:border-zinc-200 rounded-2xl bg-white shadow-3xs flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-700">۳</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-zinc-900">رفع ایراد لهجه و کلوکیشن‌های تخصصی کشور آمریکا</span>
                              <span className="text-[10px] text-zinc-400 mt-0.5 font-semibold">پایش فرکانس هوشمند کلام</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono">طول: ۵:۱۵ ساعت</span>
                        </div>

                        <div className="p-4 border border-zinc-150 hover:border-zinc-200 rounded-2xl bg-white shadow-3xs flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-700">۴</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-zinc-900">پشتیبانی نهایی، مکاتبه تعاملی و تمرین نهایی</span>
                              <span className="text-[10px] text-zinc-400 mt-0.5 font-semibold">جامعه تعاملی و اساتید ناظر</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono">طول: ۴:۰۰ ساعت</span>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* Tab 3: Interactive Dynamic Explainer (AI Advisor) */}
                  {activeTab === 'ai-advisor' && (
                    <motion.div
                      key="ai-advisor"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <h4 className="text-xs font-extrabold text-blue-600 flex items-center gap-1">
                            <Brain className="w-3.5 h-3.5" />
                            توضیح صوتی و مشاور هوشمند صوتی
                          </h4>
                          <span className="text-[9px] text-zinc-500 font-semibold mt-0.5">دریافت راهنمای گام‌به‌گام برای این دوره مهاجرتی</span>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full text-[9px] text-blue-700 font-extrabold">
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>نسخه استودیویی</span>
                        </div>
                      </div>

                      {/* Interactive player card */}
                      <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/50 shadow-inner relative overflow-hidden min-h-64 flex flex-col justify-between">
                        
                        <div className="flex items-center gap-4 border-b border-zinc-200 pb-4 mb-4">
                          <button
                            onClick={handleStartAdvisor}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                              isPlayingAdvisor 
                                ? 'bg-amber-500 text-white animate-pulse' 
                                : 'bg-blue-600 text-white hover:bg-blue-500'
                            }`}
                          >
                            {isPlayingAdvisor ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                          </button>
                          
                          <div className="flex-1">
                            <span className="text-[9.5px] font-bold text-zinc-400 block pb-0.5">بخش بررسی صوتی</span>
                            <span className="text-xs font-black text-zinc-805">{currentScript.title}</span>
                          </div>

                          <div className="hidden sm:flex items-center bg-white border border-zinc-200 rounded-full px-3 py-1 gap-1 text-[9.5px] font-bold text-zinc-500 shrink-0 shadow-3xs">
                            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span>سطح: متوسط</span>
                          </div>
                        </div>

                        {/* Speech content */}
                        <div className="relative min-h-24">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={advisorStep}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.3 }}
                              className="text-xs text-zinc-650 font-semibold leading-relaxed text-justify"
                            >
                              {currentScript.text}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="mt-6 pt-4 border-t border-zinc-150 flex items-center justify-between text-[10px] font-bold text-zinc-500 select-none">
                          <div className="flex items-center gap-1">
                            <button
                              disabled={advisorStep === 0}
                              onClick={() => { setAdvisorStep((prev) => prev - 1); setAdvisorProgress(0); }}
                              className="p-1 rounded-md border border-zinc-200 hover:bg-white disabled:opacity-30 cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <span>گام {advisorStep + 1} از {scripts.length}</span>
                            <button
                              disabled={advisorStep === scripts.length - 1}
                              onClick={() => { setAdvisorStep((prev) => prev + 1); setAdvisorProgress(0); }}
                              className="p-1 rounded-md border border-zinc-200 hover:bg-white disabled:opacity-30 cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* progress bar */}
                          <div className="flex-1 mx-4 bg-zinc-200 h-1 rounded-full overflow-hidden relative">
                            <motion.div 
                              className="bg-blue-600 h-full rounded-full"
                              animate={{ width: `${advisorProgress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>

                          <button 
                            onClick={handleResetAdvisor}
                            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50 px-2.5 py-1 rounded-lg border border-zinc-200 bg-white cursor-pointer shadow-3xs"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>ریست توضیحات</span>
                          </button>
                        </div>

                      </div>

                      {/* Helper questions inside clean tags */}
                      <div className="space-y-2">
                        <span className="text-[9.5px] text-zinc-400 font-extrabold uppercase tracking-wider block">سوالات پرپرسش متقاضیان این دوره:</span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              setActiveTab('ai-advisor');
                              setIsPlayingAdvisor(true);
                              setAdvisorStep(0);
                              setAdvisorProgress(0);
                            }}
                            className="text-[9.5px] font-bold bg-white hover:bg-zinc-50 text-zinc-650 px-3 py-1.5 rounded-full border border-zinc-200 shadow-3xs cursor-pointer hover:border-zinc-350 transition-all active:scale-97"
                          >
                            « شانس فاند گرفتن من چقدر است؟ »
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab('ai-advisor');
                              setIsPlayingAdvisor(true);
                              setAdvisorStep(1);
                              setAdvisorProgress(0);
                            }}
                            className="text-[9.5px] font-bold bg-white hover:bg-zinc-50 text-zinc-650 px-3 py-1.5 rounded-full border border-zinc-200 shadow-3xs cursor-pointer hover:border-zinc-350 transition-all active:scale-97"
                          >
                            « آیا پاسخ‌های من در سفارت طبیعی است؟ »
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab('ai-advisor');
                              setIsPlayingAdvisor(true);
                              setAdvisorStep(2);
                              setAdvisorProgress(0);
                            }}
                            className="text-[9.5px] font-bold bg-white hover:bg-zinc-50 text-zinc-650 px-3 py-1.5 rounded-full border border-zinc-200 shadow-3xs cursor-pointer hover:border-zinc-350 transition-all active:scale-97"
                          >
                            « پروسه مچ کادر درمان چطور شروع می‌شود؟ »
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* Apple minimalist detail disclaimer footer */}
            <div className="text-[10px] text-zinc-400 font-semibold leading-relaxed border-t border-zinc-100 pt-6 mt-6">
              * این دوره‌ها با بالاترین کیفیت آموزشی ارایه شده و دارای ضمانت تطابق کامل با چارت‌های درسی و مراجع رسمی کشور آمریکا است. کلیه الزامات کلاسی در پورتال دانش‌آموز بارگذاری می‌گردد.
            </div>

          </div>

        </main>

      </motion.div>
    </AnimatePresence>
  );
}
