/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpenCheck, CheckCircle2, GraduationCap, MessageCircle, Play, Route, ShieldCheck, Sparkles, Stethoscope, Target } from 'lucide-react';

interface HeroProps {
  onOpenConsulting: () => void;
}

const paths = [
  { icon: GraduationCap, title: 'فاند', text: 'CV، SOP، ایمیل استاد' },
  { icon: Stethoscope, title: 'پزشکی', text: 'USMLE، NCLEX، کلینیکال' },
  { icon: MessageCircle, title: 'سفارت', text: 'مصاحبه، زبان، اعتماد' },
];

const flow = [
  { step: '01', title: 'تشخیص مسیر', text: '۳ دقیقه تعیین سطح' },
  { step: '02', title: 'برنامه کوتاه', text: 'بدون متن‌های طولانی' },
  { step: '03', title: 'شروع کلاس', text: 'داشبورد و پیگیری' },
];

export default function Hero({ onOpenConsulting }: HeroProps) {
  const [activePath, setActivePath] = useState(0);

  const ActiveIcon = useMemo(() => paths[activePath]?.icon ?? GraduationCap, [activePath]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="apple-visual-orb absolute left-[8%] top-24 size-64 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="apple-visual-orb absolute right-[12%] top-40 size-72 rounded-full bg-orange-100/60 blur-3xl [animation-delay:1.2s]" />
      </div>

      <div className="apple-full-container grid min-h-[calc(100vh-112px)] items-center gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-start py-10 lg:py-16"
        >
          <span className="apple-eyebrow">
            <Sparkles size={15} className="text-[#0071e3]" />
            از سردرگمی تا مسیر روشن آمریکا
          </span>

          <h1 className="apple-title mt-7 max-w-4xl text-[clamp(3.2rem,7.2vw,8.8rem)]">
            مسیرت را کوتاه کن.
            <br />
            <span className="apple-gradient-text">دقیق شروع کن.</span>
          </h1>

          <p className="apple-copy mt-6 max-w-2xl text-base lg:text-xl">
            تعیین مسیر، دوره مناسب، تمرین مصاحبه و داشبورد کلاس؛ همه در یک تجربه ساده و تصویری.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button onClick={onOpenConsulting} className="apple-button-primary h-12 px-6 text-sm">
              مشاوره رایگان
              <ArrowLeft size={17} />
            </button>
            <a href="#courses-section" className="apple-button-secondary h-12 px-6 text-sm">
              دیدن دوره‌ها
            </a>
          </div>

          <div className="mt-9 grid w-full max-w-2xl grid-cols-3 gap-2.5">
            {flow.map((item) => (
              <div key={item.step} className="apple-card rounded-[24px] p-3 lg:p-4">
                <span className="text-[10px] font-black text-[#0071e3]">{item.step}</span>
                <p className="mt-2 text-sm font-black tracking-[-0.03em] text-[#1d1d1f]">{item.title}</p>
                <p className="mt-1 text-[11px] font-bold text-[#6e6e73]">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative pb-10 lg:pb-0"
        >
          <div className="apple-card apple-card-hover relative overflow-hidden rounded-[38px] p-3 lg:min-h-[700px] lg:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(0,113,227,0.22),transparent_30%),radial-gradient(circle_at_74%_34%,rgba(255,149,0,0.14),transparent_28%),linear-gradient(135deg,#ffffff_0%,#f5f5f7_48%,#eaf3ff_100%)]" />
            <div className="relative grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#1d1d1f] p-5 text-white lg:min-h-[664px] lg:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
                <div className="absolute -left-10 top-16 size-60 rounded-full bg-blue-500/30 blur-3xl" />
                <div className="absolute -right-14 bottom-2 size-72 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-white/60">TOAMERICA OS</p>
                    <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] lg:text-5xl">Route Board</h2>
                  </div>
                  <button className="grid size-12 place-items-center rounded-full bg-white/12 text-white backdrop-blur-xl transition-transform duration-500 hover:scale-105" aria-label="نمایش ویدیو">
                    <Play size={19} fill="currentColor" />
                  </button>
                </div>

                <div className="relative mt-12 grid gap-3 lg:mt-20">
                  {paths.map((path, index) => {
                    const Icon = path.icon;
                    const isActive = activePath === index;
                    return (
                      <button
                        key={path.title}
                        onClick={() => setActivePath(index)}
                        className={`flex items-center gap-3 rounded-[26px] border p-4 text-right transition-all duration-500 ${isActive ? 'border-white/24 bg-white/18 shadow-2xl shadow-black/20' : 'border-white/10 bg-white/7 hover:bg-white/12'}`}
                      >
                        <span className={`grid size-12 place-items-center rounded-2xl ${isActive ? 'bg-white text-[#1d1d1f]' : 'bg-white/10 text-white'}`}>
                          <Icon size={20} />
                        </span>
                        <span>
                          <span className="block text-base font-black tracking-[-0.03em]">{path.title}</span>
                          <span className="mt-1 block text-xs font-bold text-white/58">{path.text}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative mt-9 rounded-[28px] bg-white p-4 text-[#1d1d1f] lg:absolute lg:bottom-7 lg:left-7 lg:right-7 lg:mt-0">
                  <div className="flex items-center gap-3">
                    <span className="apple-icon-tile">
                      <ActiveIcon size={19} />
                    </span>
                    <div>
                      <p className="text-sm font-black">پیشنهاد امروز</p>
                      <p className="mt-1 text-xs font-bold text-[#6e6e73]">اول تعیین سطح؛ بعد انتخاب دوره.</p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <motion.div
                      key={activePath}
                      initial={{ width: '18%' }}
                      animate={{ width: `${48 + activePath * 18}%` }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-[#0071e3]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="apple-card rounded-[30px] p-5">
                  <div className="flex items-center gap-3">
                    <span className="apple-icon-tile"><Route size={20} /></span>
                    <div>
                      <p className="text-sm font-black text-[#1d1d1f]">مسیر دید کاربر</p>
                      <p className="mt-1 text-xs font-bold text-[#6e6e73]">اول مسیر، بعد دوره.</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {['انتخاب هدف', 'پیشنهاد دوره', 'شروع کلاس'].map((label, index) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="grid size-7 place-items-center rounded-full bg-[#f5f5f7] text-[11px] font-black text-[#0071e3]">{index + 1}</span>
                        <span className="text-sm font-black text-[#1d1d1f]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[180px] overflow-hidden rounded-[30px] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
                  <div className="absolute left-[-20%] top-[-35%] size-48 rounded-full bg-blue-100 blur-2xl" />
                  <div className="relative">
                    <BookOpenCheck className="text-[#0071e3]" size={26} />
                    <p className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#1d1d1f]">۴ مسیر</p>
                    <p className="mt-2 text-xs font-bold leading-6 text-[#6e6e73]">تحصیلی، پزشکی، کاری، سفارت؛ بدون شلوغی و انتخاب‌های اضافه.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[28px] bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
                    <Target size={20} className="text-[#0071e3]" />
                    <p className="mt-4 text-2xl font-black text-[#1d1d1f]">۹۰٪</p>
                    <p className="mt-1 text-[11px] font-bold text-[#6e6e73]">تمرکز روی اقدام</p>
                  </div>
                  <div className="rounded-[28px] bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
                    <ShieldCheck size={20} className="text-emerald-600" />
                    <p className="mt-4 text-2xl font-black text-[#1d1d1f]">امن</p>
                    <p className="mt-1 text-[11px] font-bold text-[#6e6e73]">بدون تغییر بک‌اند</p>
                  </div>
                </div>

                <div className="rounded-[28px] bg-[#1d1d1f] p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-black text-white/72">
                    <CheckCircle2 size={16} />
                    نسخه جدید UI
                  </div>
                  <p className="mt-3 text-sm font-black leading-7">کم‌متن، بصری، تمام‌صفحه؛ برای تصمیم سریع کاربر.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
