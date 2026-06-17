/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Play, BookOpen, Clock, HelpCircle, CheckCircle, Ticket, HeartHandshake, ShieldCheck } from 'lucide-react';
import localDB from '../services/localDB';
import { courses } from '../data/courses';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourseIds: string[];
}

interface Lecture {
  id: string;
  title: string;
  duration: string;
  summary: string;
  offlineReady: boolean;
}

const courseLecturesMap: Record<string, Lecture[]> = {
  'embassy-comprehensive': [
    { id: 'ec-1', title: 'جلسه ۱: اصول آغازین مصاحبه با افسر ویزا و مدارک هویتی مالی تایید شده', duration: '۴۵ دقیقه', summary: 'در این جلسه به تفاوت چیدمان مدارک مالی جهت جلب نظر آنی افسر سفارتی و روش تایید حساب‌های بانکی بومی پرداختیم.', offlineReady: true },
    { id: 'ec-2', title: 'جلسه ۲: پاسخ متقاعد کننده به سوال کلی «چرا ایالات متحده را انتخاب کردید؟»', duration: '۵۵ دقیقه', summary: 'آموزش گام به گام شبیه‌ساز مکالمه‌ای و استفاده از تکنیک بومی‌سازی جهت پاسخ روان به سوالات کلی سفارت.', offlineReady: true },
    { id: 'ec-3', title: 'جلسه ۳: واژگان کلیدی تخصص تحصیلی و توجیه پس از بازگشت (Social Ties)', duration: '۵۰ دقیقه', summary: 'چگونه علایق اجتماعی و مالی خود را در ایران تشریح کنیم تا ویزای دانشجویی F1 ریجکت نشود.', offlineReady: true }
  ],
  'medical-usmle': [
    { id: 'us-1', title: 'جلسه ۱: مقدمه‌ای بر ساختار جامع استپ ۱ و ۲ آزمون USMLE ویژه ایران', duration: '۶۰ دقیقه', summary: 'تحلیل دقیق فرمت آزمون بورد تخصصی آمریکا و سازمان‌های اعتبارسنجی خارجی مدارک کادر درمان.', offlineReady: true },
    { id: 'us-2', title: 'جلسه ۲: اصول بیوشیمی بالینی و فارماکولوژی پرتکرار در سوالات هاسپیتال‌ها', duration: '۷۵ دقیقه', summary: 'تحلیل آفلاین نمونه سوالات تئوری فشرده همراه با رفرنس‌های به روز با رویکرد پاسخ بداهه.', offlineReady: true }
  ],
  'academic-funding': [
    { id: 'af-1', title: 'جلسه ۱: اصول مکاتبه طلایی با دانشگاه‌های گرید A و یافتن فاند باز پژوهشی', duration: '۴۰ دقیقه', summary: 'چگونه اساتید صاحب فاند را شناسایی کرده و ایمیلی ارسال کنیم که در میان صدها درخواست دیده شود.', offlineReady: true },
    { id: 'af-2', title: 'جلسه ۲: راهنمای ساختار S.O.P انحصاری و نوشتن رزومه ترکینگ ATS', duration: '۵۰ دقیقه', summary: 'آموزش نگارش بند به بند انگیزه‌نامه، نگارش درست اهداف تحصیلی و بهینه‌سازی فرمت رزومه.', offlineReady: true }
  ],
  'tech-career': [
    { id: 'tc-1', title: 'جلسه ۱: شبیه‌سازی لوپ مصاحبه‌های رفتاری و تکنیکال فناوری در آمریکا', duration: '۵۵ دقیقه', summary: 'نحوه پاسخ به سوالات رفتاری طبق اصول STAR و آمادگی شبیه‌ساز آفلاین سوالات الگوریتمی.', offlineReady: true }
  ]
};

export default function Dashboard({ isOpen, onClose, enrolledCourseIds }: DashboardProps) {
  const [selectedCourseId, setSelectedCourseId] = useState(enrolledCourseIds[0] || '');
  const [activeLectureId, setActiveLectureId] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketText, setTicketText] = useState('');
  const [ticketSuccess, setTicketSaved] = useState(false);

  if (!isOpen) return null;

  // Fetch enrolled detail courses
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  
  // Set default selection if empty
  if (selectedCourseId === '' && enrolledCourses.length > 0) {
    setSelectedCourseId(enrolledCourses[0].id);
  }

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const lectures = selectedCourseId ? courseLecturesMap[selectedCourseId] || [] : [];
  const activeLecture = lectures.find(l => l.id === activeLectureId);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketText) return;

    localDB.addLog(
      'auth',
      `تیکت پشتیبانی با عنوان "${ticketSubject}" به طور آفلاین/آنلاین ثبت گردید و به پنل اساتید توآمریکا ارجاع شد.`
    );
    setTicketSaved(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketText('');
      setTicketSaved(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm" dir="rtl">
      <div 
        className="w-full max-w-4xl h-[90vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 text-right relative overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Dashboard panel */}
        <div className="flex items-center justify-between border-b border-zinc-805 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-black text-zinc-100 font-sans">پنل کلاسی و آرشیو محتواهای آفلاین شما</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-zinc-950/40 rounded-xl border border-zinc-850">
            <ShieldCheck className="w-12 h-12 text-zinc-600 mb-4 animate-bounce" />
            <h4 className="text-zinc-200 font-bold text-sm">شما هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید</h4>
            <p className="text-zinc-500 text-xs mt-2 max-w-sm leading-relaxed">
              با رفتن به صفحه هوم‌پیج و بررسی دوره‌ها، یک دوره را رزرو کرده و دسترسی سریع کلاسی خود را به طور کامل فعال سازید.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-6">
            
            {/* Right sidebar - Enrolled courses toggler & Lectures tracker list */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 border-l border-zinc-850/60 pl-0 md:pl-6 overflow-y-auto">
              
              {/* Select course tab dropdown */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold">انتخاب کلاس فعال</span>
                <select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    setActiveLectureId('');
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200 select-none outline-none font-bold cursor-pointer"
                >
                  {enrolledCourses.map(c => (
                    <option key={c.id} value={c.id} className="font-semibold">{c.title}</option>
                  ))}
                </select>
              </div>

              {/* Lectures List list */}
              <div className="flex-1 space-y-2 mt-2">
                <span className="text-[10px] text-zinc-500 font-bold block">سرفصل‌ها و جلسات کلاسی ({lectures.length} جلسه)</span>
                
                {lectures.map((lecture, idx) => (
                  <button
                    key={lecture.id}
                    onClick={() => setActiveLectureId(lecture.id)}
                    className={`w-full text-right p-3 rounded-xl border text-xs font-semibold leading-relaxed transition-all flex items-start gap-2.5 transition-colors cursor-pointer ${
                      activeLectureId === lecture.id
                        ? 'bg-amber-950/20 border-amber-900/40 text-amber-400'
                        : 'bg-zinc-950/40 border-zinc-850 hover:bg-zinc-950/90 text-zinc-300'
                    }`}
                  >
                    <span className="w-5 h-5 rounded bg-zinc-900 text-[10px] text-zinc-400/80 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col text-right">
                      <span className="font-bold">{lecture.title}</span>
                      <span className="text-[10px] text-zinc-500 font-mono mt-1 font-semibold">{lecture.duration} • آماده آفلاین</span>
                    </div>
                  </button>
                ))}
              </div>

            </div>

            {/* Left Main pane - Lecture content streamer OR Support ticket system */}
            <div className="flex-1 bg-zinc-950/30 border border-zinc-850 rounded-xl p-4 overflow-y-auto flex flex-col justify-between">
              
              {activeLecture ? (
                /* Lecture Details streamer simulation */
                <div className="space-y-4">
                  <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex items-center justify-between col-span-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-950/20 text-emerald-400 flex items-center justify-center">
                        <Play className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-xs font-bold text-zinc-200">وضعیت محتوای کلاسی:</span>
                        <span className="text-[10px] text-emerald-400 font-semibold">کامل کش شده و ۱۰۰٪ آماده آفلاین</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-zinc-900 text-zinc-400 px-3 py-1 rounded-full border border-zinc-800">
                      فایل ویدیویی HD
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-100">{activeLecture.title}</h4>
                    <p className="text-xs text-zinc-550 font-mono mt-0.5">طول زمان ویدیو: {activeLecture.duration}</p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-semibold bg-zinc-950/40 p-4 rounded-xl border border-zinc-900">
                    {activeLecture.summary}
                  </p>

                  <div className="border border-zinc-850 rounded-xl p-4">
                    <h5 className="text-xs font-bold text-zinc-200 mb-2">تکلیف این جلسه (تمرین آفلاین):</h5>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                      متن کوتاهی درباره توجیه‌ مالی و دانشگاهی هدف خود در آمریکا بنویسید و نمونه تلفظ صوتی پاسخ به سوالات فکت سفارت را همراه با اپلیکیشن صوتی بومی تمرین کنید.
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-bold transition-all border border-zinc-700 text-center cursor-pointer">
                        دانلود فایل صوتی تمرین تلفظ لهجه
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* Support system ticketer section (When no lecture selected) */
                <div className="space-y-4">
                  <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-4 flex items-center gap-3">
                    <HeartHandshake className="w-6 h-6 text-amber-500 shrink-0" />
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-black text-zinc-200">میز پشتیبانی و منتورینگ اساتید توآمریکا</span>
                      <span className="text-[10px] text-zinc-500 font-bold mt-0.5">هر گونه سوال تحصیلی، معادل‌سازی یا مصاحبه را بپرسید؛ در سریع‌ترین زمان پاسخگو هستیم.</span>
                    </div>
                  </div>

                  {/* Ticket Form */}
                  <form onSubmit={handleSubmitTicket} className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold block">موضوع یا سرفصل سوال</label>
                      <input
                        type="text"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="مثال: سوال درباره مدارک فکت دانشگاه شیکاگو"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-700 select-none outline-none font-medium"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold block">متن سوال شما بطور تفصیلی</label>
                      <textarea
                        rows={4}
                        value={ticketText}
                        onChange={(e) => setTicketText(e.target.value)}
                        placeholder="سوال کامل خود را در این بخش مرقوم بفرمایید..."
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-700 select-none outline-none font-medium resize-none leading-relaxed"
                        required
                      />
                    </div>

                    {ticketSuccess && (
                      <p className="text-emerald-400 text-[11px] font-semibold bg-emerald-950/30 border border-emerald-900/30 p-2.5 rounded-lg text-center leading-relaxed">
                        تیکت شما با موفقیت ثبت شد و به صورت لوکال به صف پیام‌های خروجی رفت.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={ticketSuccess}
                      className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>ثبت و ارسال تیکت کلاسی به منتور</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Secure system note */}
              <div className="mt-4 pt-3 border-t border-zinc-900 text-[10px] text-zinc-650 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                <span>تمام لاگ‌های تعاملات تحصیلی در دیتابیس بومی ذخیره و رمزنگاری می‌شوند.</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
