/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, Clock, Star, Users, ArrowLeft, ArrowRight, ChevronRight, ChevronLeft, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { courses } from '../data/courses';
import { Course } from '../types';
import SpotlightCard from './SpotlightCard';

interface CoursesProps {
  enrolledCourseIds: string[];
  onEnroll: (course: Course) => void;
  currentUser: any;
  onExploreCourse: (course: Course) => void;
}

export default function Courses({ enrolledCourseIds, onEnroll, currentUser, onExploreCourse }: CoursesProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
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
    setActiveSlideIdx(closestIdx);
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

  const handleNextSlide = () => {
    const targetIdx = activeSlideIdx >= courses.length - 1 ? 0 : activeSlideIdx + 1;
    scrollToSlide(targetIdx);
  };

  const handlePrevSlide = () => {
    const targetIdx = activeSlideIdx <= 0 ? courses.length - 1 : activeSlideIdx - 1;
    scrollToSlide(targetIdx);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  const getGradientClass = (gradient: string) => {
    switch (gradient) {
      case 'gradient-blue':
        return 'from-blue-50/80 to-indigo-50/30 border-blue-100/80';
      case 'gradient-purple':
        return 'from-purple-50/80 to-pink-50/30 border-purple-100/80';
      case 'gradient-emerald':
        return 'from-emerald-50/80 to-teal-50/30 border-emerald-100/80';
      case 'gradient-amber':
        return 'from-amber-50/80 to-orange-50/30 border-amber-100/80';
      default:
        return 'from-zinc-50 to-zinc-100 border-zinc-200';
    }
  };

  return (
    <motion.section 
      id="courses-section" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", damping: 30, stiffness: 125 }}
      className="py-20 bg-white border-t border-zinc-150 text-right select-none" 
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Title Block with premium iOS styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl text-right">
            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest block mb-1.5 font-sans">معماری همه‌جانبه موفقیت</span>
            <h2 className="text-xl md:text-[28px] font-black text-zinc-950 tracking-tight leading-tight">
              دوره‌های تخصصی توآمریکا
            </h2>
            <p className="mt-2 text-xs md:text-[13px] text-zinc-500 font-semibold leading-relaxed">
              سرفصل‌های هدفمند برای تسلط کامل، بدون اتلاف وقت و با کلمات بسیار کوتاه.
            </p>
          </div>
        </div>

        {/* Elegant horizontal sliding track relative wrapper for floating elements */}
        <div className="relative group/slider px-1">
          
          {/* Floating UX Left Arrow Pannel (Only Desktop) */}
          <button
            onClick={handleNextSlide}
            aria-label="بعدی"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-25 w-11 h-11 rounded-full border border-zinc-200/80 bg-white/95 backdrop-blur-md text-zinc-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center opacity-0 group-hover/slider:opacity-100 duration-200 active:scale-90 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Floating UX Right Arrow Pannel (Only Desktop) */}
          <button
            onClick={handlePrevSlide}
            aria-label="قبلی"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-25 w-11 h-11 rounded-full border border-zinc-200/80 bg-white/95 backdrop-blur-md text-zinc-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center opacity-0 group-hover/slider:opacity-100 duration-200 active:scale-90 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Native High-Performance Touch Scroll Snap Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-4 px-4 -mx-4 md:px-0 md:mx-0 cursor-grab active:cursor-grabbing"
          >
            {courses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);

              return (
                <SpotlightCard
                  key={course.id}
                  glowColor="rgba(59, 131, 246, 0.16)"
                  className="snap-center md:snap-start shrink-0 w-[84vw] xs:w-[78vw] sm:w-[420px] md:w-[calc(50%-12px)] flex flex-col group shadow-2xs hover:shadow-sm"
                >
                  
                  {/* Course Image Header with Overlay */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-zinc-200/60 bg-zinc-100 group-hover:border-zinc-300 transition-colors w-full">
                    {/* Course Illustration Cover Image (With fallback or elegant placeholder graphics) */}
                    <img 
                      src={
                        course.id === 'embassy-comprehensive' ? 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80' : // Wash DC US
                        course.id === 'medical-usmle' ? 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' : // Medical/Stethoscope
                        course.id === 'academic-funding' ? 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80' : // Stanford/Graduation
                        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80' // Tech/Code laptop
                      }
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] select-none pointer-events-none"
                    />
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-zinc-900/10" />

                    {/* Tags overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="text-[9px] font-extrabold text-blue-700 tracking-wider bg-white/95 px-2 py-0.5 rounded-full border border-blue-50/80 shadow-xs">
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full border border-zinc-200/80 shadow-3xs">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="text-[9.5px] font-extrabold text-zinc-800">{course.rating}</span>
                      </div>
                    </div>

                    {/* Integrated Text Overlay */}
                    <div className="absolute bottom-3 right-3 left-3 text-right">
                      <h3 className="text-xs md:text-sm font-black text-white leading-snug mb-1 drop-shadow-xs font-sans">
                        {course.title}
                      </h3>
                      <p className="text-[9.5px] text-zinc-200 font-bold leading-normal opacity-90">
                        {course.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Compact Description (shorter and compact) */}
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold mb-3 flex-1 text-justify line-clamp-2">
                    {course.description.length > 105 ? `${course.description.slice(0, 105)}...` : course.description}
                  </p>

                  {/* Course Quick Key Statistics */}
                  <div className="flex items-center justify-between py-2 border-y border-zinc-100 mb-4 text-[9px] text-zinc-400 font-bold w-full">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-350" />
                      <span>{course.duration.split(' + ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-zinc-350" />
                      <span>{course.studentsCount.toLocaleString('fa-IR')} فارغ‌التحصیل</span>
                    </div>
                  </div>

                  {/* Enrollment Button and pricing wrapper */}
                  <div className="flex items-center justify-between mt-auto w-full">
                    {/* Price structure */}
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] text-zinc-400 line-through font-mono">
                        {formatPrice(course.originalPrice)}
                      </span>
                      <span className="text-xs md:text-sm font-black text-zinc-950 tracking-wider">
                        {formatPrice(course.discountedPrice)}
                      </span>
                    </div>

                    {/* Apple Style Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onExploreCourse(course)}
                        title="بررسی کامل دوره"
                        className="px-2.5 py-1.5 rounded-full border border-zinc-200 text-zinc-600 hover:text-zinc-950 text-[10px] font-bold cursor-pointer"
                      >
                        سرفصل‌ها
                      </button>

                      <button
                        onClick={() => onEnroll(course)}
                        className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all duration-200 cursor-pointer ${
                          isEnrolled
                            ? 'bg-zinc-150 text-zinc-500 font-bold shadow-none'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                        }`}
                      >
                        <span>{isEnrolled ? 'ثبت‌نام شده' : 'رزرو دوره'}</span>
                      </button>
                    </div>
                  </div>

                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* Bottom indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {courses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`اسلاید ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeSlideIdx ? 'w-5 bg-blue-600' : 'w-1.5 bg-zinc-200'
              }`}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
}
