/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ChevronRight, ChevronLeft, Quote, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SpotlightCard from './SpotlightCard';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  destination: string;
  courseName: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'سارا رضایی',
    role: 'رزیدنت ارشد اطفال',
    destination: 'بیمارستان سینای شیکاگو، ایلینوی',
    courseName: 'دوره آمادگی بورد تخصصی USMLE',
    comment: '«پلتفرم آفلاین توآمریکا و منتورینگ فوق تخصصی دکتر رادان فراتر از تصور من بود. تمام مباحث پاتولوژی کلاسی کش می‌شدند و امکان مرور در مسیر بیمارستان عالی بود.»'
  },
  {
    id: 't-2',
    name: 'مهندس امیر حسنی راد',
    role: 'مهندس نرم‌افزار ارشد',
    destination: 'شرکت فناوری در سان فرانسیسکو، کالیفرنیا',
    courseName: 'دوره مهاجرت کاری متخصصین به سیلیکون‌ولی',
    comment: '«به عنوان برنامه نویس همیشه دغدغه مصاحبه رفتاری سفارت و کلمات بومی آمریکا را داشتم. این دوره دیدگاه مرا کاملاً باز کرد و ویزای تخصصی مرا نجات داد.»'
  },
  {
    id: 't-3',
    name: 'نازنین کوثری',
    role: 'دانشجوی دکترای فول‌فاند مکانیک',
    destination: 'دانشگاه استنفورد، کالیفرنیا',
    courseName: 'دوره کدهای SOP و پوزیشن‌یابی آکادمیک',
    comment: '«نوشتن انگیزه‌نامه SOP همیشه یک کابوس است. تمپلیت‌ها و مکاتبات توآمریکا باعث شد سه استاد تراز اول استنفورد به سرعت به رزومه من جواب مثبت دهند.»'
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const items = container.children;
    if (items.length === 0) return;

    let closestIdx = 0;
    let minDiff = Infinity;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    for (let i = 0; i < items.length; i++) {
      const itemRect = items[i].getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const diff = Math.abs(itemCenter - containerCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setIndex(closestIdx);
  };

  const scrollToSlide = (idx: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const items = container.children;
    if (items[idx]) {
      (items[idx] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const handleNext = () => {
    const targetIdx = index >= testimonials.length - 1 ? 0 : index + 1;
    scrollToSlide(targetIdx);
  };

  const handlePrev = () => {
    const targetIdx = index <= 0 ? testimonials.length - 1 : index - 1;
    scrollToSlide(targetIdx);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", damping: 30, stiffness: 120 }}
      className="py-20 bg-zinc-50 border-t border-zinc-150 text-right select-none" 
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest block mb-1.5 font-sans">صدای واقعی دانشجویان ما</span>
          <h2 className="text-xl md:text-[28px] font-black text-zinc-950 tracking-tight leading-tight">
            داستان موفقیت مهاجران توآمریکا
          </h2>
          <p className="mt-2 text-xs md:text-[13px] text-zinc-500 font-semibold leading-relaxed">
            متخصصینی که قبولی آسان را با متد بومی ما تجربه کرده‌اند.
          </p>
        </div>

        {/* Carousel Slider Wrapper with desktop floating side buttons */}
        <div className="relative group/slider w-full">
          
          {/* Left Floating Chevron (Only visible on MD & beyond) */}
          <button
            onClick={handleNext}
            aria-label="بعدی"
            className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-zinc-200/80 bg-white/95 backdrop-blur-md text-zinc-650 hover:text-blue-600 hover:border-blue-200 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center opacity-0 group-hover/slider:opacity-100 duration-200 active:scale-90 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Floating Chevron (Only visible on MD & beyond) */}
          <button
            onClick={handlePrev}
            aria-label="قبلی"
            className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-zinc-200/80 bg-white/95 backdrop-blur-md text-zinc-650 hover:text-blue-600 hover:border-blue-200 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center opacity-0 group-hover/slider:opacity-100 duration-200 active:scale-90 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Native High-Performance Touch Scroll Snap Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-4 px-4 -mx-4 md:px-0 md:mx-0 cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((testimonial) => (
              <SpotlightCard
                key={testimonial.id}
                glowColor="rgba(59, 131, 246, 0.16)"
                className="snap-center shrink-0 w-[84vw] xs:w-[78vw] sm:w-[480px] md:w-[620px] select-none"
              >
                <Quote className="absolute top-5 left-5 w-8 h-8 text-zinc-100 rotate-180 pointer-events-none" />

                {/* Stats rate */}
                <div className="flex items-center gap-1 mb-4 w-full">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500 hover:scale-110 transition-transform duration-200" />
                  ))}
                </div>

                <div className="min-h-20 relative select-text w-full">
                  <p className="text-xs text-zinc-400 leading-relaxed font-semibold mb-6 text-justify line-clamp-2">
                    {testimonial.comment.length > 105 ? `${testimonial.comment.slice(0, 105)}...` : testimonial.comment}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-zinc-100 pt-5 gap-4 w-full">
                  {/* User metadata */}
                  <div className="flex flex-col gap-0.5 text-right font-sans">
                    <span className="text-xs font-bold text-zinc-900">{testimonial.name}</span>
                    <span className="text-[10px] text-zinc-400 font-semibold">{testimonial.role}</span>
                    <div className="flex items-center gap-1 text-[9.5px] text-zinc-400 mt-1 flex-wrap">
                      <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                      <span className="font-semibold">{testimonial.destination}</span>
                    </div>
                  </div>

                  {/* Course label */}
                  <span className="text-[9.5px] bg-zinc-50 font-bold border border-zinc-200 text-zinc-650 px-3 py-1 rounded-full font-sans max-w-full">
                    {testimonial.courseName}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Bullet indicators at bottom of slider */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                aria-label={`اسلاید ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === index ? 'w-5 bg-blue-600' : 'w-1.5 bg-zinc-200'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </motion.section>
  );
}
